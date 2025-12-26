/**
 * Discord Test Endpoint
 *
 * ⚠️  WARNING: THIS IS A TEST-ONLY ENDPOINT - REMOVE BEFORE PRODUCTION ⚠️
 *
 * This endpoint bypasses all authentication and authorization checks
 * to allow direct testing of Discord bot messaging.
 *
 * To use:
 * 1. Set DISCORD_BOT_TOKEN in your .env
 * 2. Set DISCORD_TEST_MODE=true in your .env to enable this endpoint
 * 3. Find your channel ID (right-click channel in Discord with Developer Mode enabled)
 *
 * Example curl:
 * curl -X POST http://localhost:3000/api/discord/test \
 *   -H "Content-Type: application/json" \
 *   -d '{"channelId": "YOUR_CHANNEL_ID", "message": "Hello from test!"}'
 *
 * TO DISABLE: Remove DISCORD_TEST_MODE from .env or set to "false"
 */

import { NextResponse } from "next/server";
import { createDiscordBotClient, type DiscordEmbed } from "@/src/discord";

export const dynamic = "force-dynamic";

interface TestRequest {
  channelId: string;
  message?: string;
  embed?: DiscordEmbed;
}

/**
 * GET /api/discord/test
 *
 * Shows usage instructions and current test mode status
 */
export async function GET(): Promise<NextResponse> {
  const testModeEnabled = process.env.DISCORD_TEST_MODE === "true";
  const hasBotToken = !!process.env.DISCORD_BOT_TOKEN;

  return NextResponse.json({
    endpoint: "/api/discord/test",
    warning: "⚠️ TEST ENDPOINT - REMOVE BEFORE PRODUCTION",
    status: {
      testModeEnabled,
      hasBotToken,
      ready: testModeEnabled && hasBotToken,
    },
    usage: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        channelId: "string (required) - Discord channel ID",
        message: "string (optional) - Plain text message",
        embed: "object (optional) - Rich embed object",
      },
    },
    examples: {
      simple: {
        channelId: "1234567890123456789",
        message: "Hello from the test endpoint!",
      },
      withEmbed: {
        channelId: "1234567890123456789",
        message: "Check out this feedback:",
        embed: {
          title: "New Feedback",
          description: "A test feedback message",
          color: 5814783,
          fields: [
            { name: "Category", value: "Bug", inline: true },
            { name: "Priority", value: "High", inline: true },
          ],
        },
      },
    },
    howToGetChannelId: [
      "1. Open Discord Settings > Advanced > Enable Developer Mode",
      "2. Right-click the channel you want to send to",
      "3. Click 'Copy Channel ID'",
    ],
    toEnable: "Set DISCORD_TEST_MODE=true in your .env file",
  });
}

/**
 * POST /api/discord/test
 *
 * Send a test message to any channel (no auth required)
 */
export async function POST(request: Request): Promise<NextResponse> {
  // Check if test mode is enabled
  if (process.env.DISCORD_TEST_MODE !== "true") {
    return NextResponse.json(
      {
        success: false,
        error: "Test mode is disabled",
        hint: "Set DISCORD_TEST_MODE=true in your .env file to enable this endpoint",
      },
      { status: 403 }
    );
  }

  // Check for bot token
  if (!process.env.DISCORD_BOT_TOKEN) {
    return NextResponse.json(
      {
        success: false,
        error: "DISCORD_BOT_TOKEN is not configured",
        hint: "Add your bot token to the .env file",
      },
      { status: 500 }
    );
  }

  // Parse request
  let body: TestRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON in request body",
      },
      { status: 400 }
    );
  }

  // Validate channel ID
  if (!body.channelId || typeof body.channelId !== "string") {
    return NextResponse.json(
      {
        success: false,
        error: "channelId is required",
        hint: "Right-click a channel in Discord (with Developer Mode enabled) to copy its ID",
      },
      { status: 400 }
    );
  }

  // Validate at least one of message or embed
  if (!body.message && !body.embed) {
    return NextResponse.json(
      {
        success: false,
        error: "Either message or embed is required",
      },
      { status: 400 }
    );
  }

  try {
    const bot = createDiscordBotClient();

    // Build message payload
    const payload: { content?: string; embeds?: DiscordEmbed[] } = {};

    if (body.message) {
      payload.content = body.message;
    }

    if (body.embed) {
      payload.embeds = [body.embed];
    }

    console.log("[Discord Test] Sending test message to channel:", body.channelId);

    const result = await bot.sendMessage(body.channelId, payload);

    if (!result.success) {
      console.error("[Discord Test] Failed:", result.error);
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          code: result.code,
          hints: getErrorHints(result.code),
        },
        { status: 400 }
      );
    }

    console.log("[Discord Test] Message sent successfully:", result.data.id);

    return NextResponse.json({
      success: true,
      messageId: result.data.id,
      channelId: body.channelId,
      timestamp: result.data.timestamp,
    });
  } catch (error) {
    console.error("[Discord Test] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Provide helpful hints for common errors
 */
function getErrorHints(code: number | undefined): string[] {
  switch (code) {
    case 10003:
      return [
        "Channel not found",
        "Make sure you copied the correct channel ID",
        "Ensure the bot has been added to the server containing this channel",
      ];
    case 50001:
      return [
        "Bot cannot access this channel",
        "Check channel permissions - the bot needs 'View Channel' permission",
        "If it's a private channel, add the bot to have access",
      ];
    case 50013:
      return [
        "Bot lacks permission to send messages",
        "Give the bot 'Send Messages' permission in this channel",
        "Check both server roles and channel-specific permission overwrites",
      ];
    default:
      return ["Check that DISCORD_BOT_TOKEN is valid", "Ensure the bot is in the server"];
  }
}
