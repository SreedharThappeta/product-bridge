/**
 * Discord Notify Route
 *
 * POST /api/discord/notify
 *
 * Sends a message to a Discord channel using the bot token.
 * This endpoint is used by internal services to send notifications
 * to configured Discord channels.
 *
 * Request Body:
 * {
 *   "guildId": "123456789",      // Guild ID for validation
 *   "channelId": "987654321",    // Target channel ID
 *   "message": "Hello!",         // Plain text message (max 2000 chars)
 *   "embed": { ... }             // Optional: Rich embed object
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "messageId": "111222333"     // Discord message ID
 * }
 *
 * Error Response:
 * {
 *   "success": false,
 *   "error": "Error message",
 *   "errorCode": "error_code"
 * }
 *
 * Environment Variables Required:
 * - DISCORD_BOT_TOKEN: Bot token for sending messages
 *
 * @see https://discord.com/developers/docs/resources/message#create-message
 */

import { NextResponse } from "next/server";
import {
  createDiscordBotClient,
  type DiscordNotifyRequest,
  type DiscordNotifyResponse,
  type DiscordCreateMessageRequest,
} from "@/src/discord";

export const dynamic = "force-dynamic";

// Rate limiting configuration (simple in-memory implementation)
// In production, use Redis or similar for distributed rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // 30 requests per minute per channel

/**
 * POST /api/discord/notify
 *
 * Send a message to a Discord channel
 */
export async function POST(request: Request): Promise<NextResponse<DiscordNotifyResponse>> {
  try {
    // =============================================================================
    // AUTHENTICATION
    // =============================================================================
    // TODO: Implement your authentication logic here
    //
    // Example with API key:
    // ```typescript
    // const apiKey = request.headers.get("x-api-key");
    // if (!apiKey || !isValidApiKey(apiKey)) {
    //   return NextResponse.json(
    //     { success: false, error: "Unauthorized", errorCode: "unauthorized" },
    //     { status: 401 }
    //   );
    // }
    // ```
    //
    // Example with session:
    // ```typescript
    // const session = await getSession(request);
    // if (!session?.user?.id) {
    //   return NextResponse.json(
    //     { success: false, error: "Unauthorized", errorCode: "unauthorized" },
    //     { status: 401 }
    //   );
    // }
    // ```

    // Parse request body
    let body: DiscordNotifyRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
          errorCode: "invalid_json",
        },
        { status: 400 }
      );
    }

    // Validate required fields
    const validationError = validateNotifyRequest(body);
    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          error: validationError,
          errorCode: "validation_error",
        },
        { status: 400 }
      );
    }

    const { guildId, channelId, message, embed } = body;

    // =============================================================================
    // AUTHORIZATION CHECK
    // =============================================================================
    // TODO: Verify the authenticated user has permission to send to this channel
    //
    // Example:
    // ```typescript
    // const connection = await prisma.discordConnection.findFirst({
    //   where: {
    //     userId: session.user.id,
    //     guildId,
    //     channelId,
    //   },
    // });
    //
    // if (!connection) {
    //   return NextResponse.json(
    //     { success: false, error: "Channel not configured", errorCode: "not_configured" },
    //     { status: 403 }
    //   );
    // }
    // ```

    // Simple rate limiting by channel
    const rateLimitResult = checkRateLimit(channelId);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Rate limited. Try again in ${Math.ceil(rateLimitResult.retryAfterMs! / 1000)} seconds.`,
          errorCode: "rate_limited",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateLimitResult.retryAfterMs! / 1000)),
          },
        }
      );
    }

    // Create bot client
    const bot = createDiscordBotClient();

    // Build message payload
    const messagePayload: DiscordCreateMessageRequest = {};

    if (message) {
      messagePayload.content = message;
    }

    if (embed) {
      // Validate and sanitize embed
      messagePayload.embeds = [sanitizeEmbed(embed)];
    }

    // Prevent empty messages
    if (!messagePayload.content && !messagePayload.embeds?.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Message must have content or embed",
          errorCode: "empty_message",
        },
        { status: 400 }
      );
    }

    console.log("[Discord Notify] Sending message to channel:", {
      guildId: guildId.slice(0, 4) + "****",
      channelId: channelId.slice(0, 4) + "****",
      hasContent: !!messagePayload.content,
      hasEmbed: !!messagePayload.embeds?.length,
    });

    // Send message via bot
    const result = await bot.sendMessage(channelId, messagePayload);

    if (!result.success) {
      console.error("[Discord Notify] Failed to send message:", result.error);

      // Map error codes to HTTP status
      const status = mapErrorToStatus(result.code);

      return NextResponse.json(
        {
          success: false,
          error: result.error,
          errorCode: mapErrorCodeToString(result.code),
        },
        { status }
      );
    }

    console.log("[Discord Notify] Message sent successfully:", {
      messageId: result.data.id,
    });

    return NextResponse.json({
      success: true,
      messageId: result.data.id,
    });
  } catch (error) {
    console.error("[Discord Notify] Unexpected error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
        errorCode: "internal_error",
      },
      { status: 500 }
    );
  }
}

/**
 * Validate the notify request body
 */
function validateNotifyRequest(body: DiscordNotifyRequest): string | null {
  if (!body.guildId || typeof body.guildId !== "string") {
    return "guildId is required and must be a string";
  }

  if (!body.channelId || typeof body.channelId !== "string") {
    return "channelId is required and must be a string";
  }

  // Validate snowflake format (Discord IDs are numeric strings)
  if (!/^\d{17,20}$/.test(body.guildId)) {
    return "guildId must be a valid Discord snowflake (17-20 digit number)";
  }

  if (!/^\d{17,20}$/.test(body.channelId)) {
    return "channelId must be a valid Discord snowflake (17-20 digit number)";
  }

  if (body.message !== undefined && typeof body.message !== "string") {
    return "message must be a string";
  }

  if (body.message && body.message.length > 2000) {
    return "message exceeds 2000 character limit";
  }

  if (body.embed !== undefined && typeof body.embed !== "object") {
    return "embed must be an object";
  }

  return null;
}

/**
 * Sanitize embed to prevent abuse
 */
function sanitizeEmbed(embed: DiscordNotifyRequest["embed"]): NonNullable<DiscordNotifyRequest["embed"]> {
  if (!embed) {
    return {};
  }

  return {
    title: embed.title?.slice(0, 256),
    description: embed.description?.slice(0, 4096),
    url: embed.url && isValidUrl(embed.url) ? embed.url : undefined,
    timestamp: embed.timestamp,
    color: embed.color,
    footer: embed.footer
      ? {
          text: embed.footer.text.slice(0, 2048),
          icon_url: embed.footer.icon_url && isValidUrl(embed.footer.icon_url) ? embed.footer.icon_url : undefined,
        }
      : undefined,
    image: embed.image && isValidUrl(embed.image.url)
      ? { url: embed.image.url }
      : undefined,
    thumbnail: embed.thumbnail && isValidUrl(embed.thumbnail.url)
      ? { url: embed.thumbnail.url }
      : undefined,
    author: embed.author
      ? {
          name: embed.author.name.slice(0, 256),
          url: embed.author.url && isValidUrl(embed.author.url) ? embed.author.url : undefined,
          icon_url: embed.author.icon_url && isValidUrl(embed.author.icon_url) ? embed.author.icon_url : undefined,
        }
      : undefined,
    fields: embed.fields?.slice(0, 25).map((field) => ({
      name: field.name.slice(0, 256),
      value: field.value.slice(0, 1024),
      inline: field.inline,
    })),
  };
}

/**
 * Basic URL validation
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Simple in-memory rate limiting
 */
function checkRateLimit(key: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now >= record.resetAt) {
    // Start new window
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: record.resetAt - now };
  }

  record.count++;
  return { allowed: true };
}

/**
 * Map Discord error codes to HTTP status codes
 */
function mapErrorToStatus(code: number | undefined): number {
  switch (code) {
    case 10003: // Unknown channel
    case 10004: // Unknown guild
      return 404;
    case 50001: // Missing access
    case 50013: // Missing permissions
      return 403;
    case 50035: // Invalid form body
    case 50006: // Cannot send empty message
      return 400;
    case 40001: // Unauthorized
      return 401;
    default:
      return 500;
  }
}

/**
 * Map Discord error codes to string identifiers
 */
function mapErrorCodeToString(code: number | undefined): string {
  switch (code) {
    case 10003:
      return "unknown_channel";
    case 10004:
      return "unknown_guild";
    case 50001:
      return "missing_access";
    case 50013:
      return "missing_permissions";
    case 50035:
      return "invalid_form_body";
    case 50006:
      return "empty_message";
    case 40001:
      return "unauthorized";
    default:
      return "discord_api_error";
  }
}

/**
 * GET /api/discord/notify
 *
 * Returns API documentation
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    endpoint: "POST /api/discord/notify",
    description: "Send a message to a Discord channel via bot",
    body: {
      guildId: "string (required) - Discord guild/server ID",
      channelId: "string (required) - Discord channel ID",
      message: "string (optional) - Plain text message content (max 2000 chars)",
      embed: "object (optional) - Rich embed object",
    },
    response: {
      success: "boolean - Whether the message was sent",
      messageId: "string (on success) - Discord message ID",
      error: "string (on failure) - Error message",
      errorCode: "string (on failure) - Error code for programmatic handling",
    },
    rateLimit: {
      window: "60 seconds",
      maxRequests: 30,
      perChannel: true,
    },
  });
}
