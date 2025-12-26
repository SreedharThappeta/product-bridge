/**
 * Discord API Client
 *
 * Provides methods for interacting with the Discord API including:
 * - OAuth2 token exchange and refresh
 * - User information retrieval
 * - Guild (server) listing
 * - Message sending via bot token
 *
 * @see https://discord.com/developers/docs/reference
 */

import {
  DISCORD_API_BASE,
  DISCORD_OAUTH_TOKEN_URL,
  DISCORD_OAUTH_REVOKE_URL,
  type DiscordTokenResponse,
  type DiscordUser,
  type DiscordPartialGuild,
  type DiscordChannel,
  type DiscordCreateMessageRequest,
  type DiscordMessage,
  type DiscordAPIError,
  DiscordChannelType,
} from "./types";

// =============================================================================
// Configuration
// =============================================================================

/**
 * Get Discord OAuth2 configuration from environment
 */
export function getDiscordConfig() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!clientId) {
    throw new Error("DISCORD_CLIENT_ID is not configured");
  }
  if (!clientSecret) {
    throw new Error("DISCORD_CLIENT_SECRET is not configured");
  }
  if (!redirectUri) {
    throw new Error("DISCORD_REDIRECT_URI is not configured");
  }

  return {
    clientId,
    clientSecret,
    redirectUri,
    botToken,
  };
}

// =============================================================================
// OAuth2 Functions
// =============================================================================

/**
 * Exchange an authorization code for access and refresh tokens
 *
 * @param code - The authorization code from Discord callback
 * @returns Token response or error
 *
 * @see https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-exchange-example
 */
export async function exchangeCodeForTokens(
  code: string
): Promise<{ success: true; data: DiscordTokenResponse } | { success: false; error: string }> {
  const config = getDiscordConfig();

  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: config.redirectUri,
  });

  try {
    const response = await fetch(DISCORD_OAUTH_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as DiscordAPIError;
      console.error("[Discord OAuth] Token exchange failed:", {
        status: response.status,
        error: errorData,
      });
      return {
        success: false,
        error: errorData.message || `Token exchange failed with status ${response.status}`,
      };
    }

    const data = await response.json() as DiscordTokenResponse;
    return { success: true, data };
  } catch (error) {
    console.error("[Discord OAuth] Token exchange error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Token exchange failed",
    };
  }
}

/**
 * Refresh an expired access token
 *
 * @param refreshToken - The refresh token from previous token response
 * @returns New token response or error
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<{ success: true; data: DiscordTokenResponse } | { success: false; error: string }> {
  const config = getDiscordConfig();

  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  try {
    const response = await fetch(DISCORD_OAUTH_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as DiscordAPIError;
      console.error("[Discord OAuth] Token refresh failed:", {
        status: response.status,
        error: errorData,
      });
      return {
        success: false,
        error: errorData.message || `Token refresh failed with status ${response.status}`,
      };
    }

    const data = await response.json() as DiscordTokenResponse;
    return { success: true, data };
  } catch (error) {
    console.error("[Discord OAuth] Token refresh error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Token refresh failed",
    };
  }
}

/**
 * Revoke an access or refresh token
 *
 * @param token - The token to revoke
 * @param tokenType - Type of token (access_token or refresh_token)
 * @returns Success status
 */
export async function revokeToken(
  token: string,
  tokenType: "access_token" | "refresh_token" = "access_token"
): Promise<boolean> {
  const config = getDiscordConfig();

  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    token,
    token_type_hint: tokenType,
  });

  try {
    const response = await fetch(DISCORD_OAUTH_REVOKE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    return response.ok;
  } catch (error) {
    console.error("[Discord OAuth] Token revoke error:", error);
    return false;
  }
}

// =============================================================================
// User API Functions (using Bearer token)
// =============================================================================

/**
 * Get the current user's information
 *
 * @param accessToken - OAuth2 access token
 * @returns User object or error
 *
 * @see https://discord.com/developers/docs/resources/user#get-current-user
 */
export async function getCurrentUser(
  accessToken: string
): Promise<{ success: true; data: DiscordUser } | { success: false; error: string }> {
  try {
    const response = await fetch(`${DISCORD_API_BASE}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as DiscordAPIError;
      console.error("[Discord API] Get user failed:", {
        status: response.status,
        error: errorData,
      });
      return {
        success: false,
        error: errorData.message || `Failed to get user with status ${response.status}`,
      };
    }

    const data = await response.json() as DiscordUser;
    return { success: true, data };
  } catch (error) {
    console.error("[Discord API] Get user error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get user",
    };
  }
}

/**
 * Get the current user's guilds (servers)
 *
 * @param accessToken - OAuth2 access token
 * @returns Array of partial guild objects or error
 *
 * @see https://discord.com/developers/docs/resources/user#get-current-user-guilds
 */
export async function getCurrentUserGuilds(
  accessToken: string
): Promise<{ success: true; data: DiscordPartialGuild[] } | { success: false; error: string }> {
  try {
    const response = await fetch(`${DISCORD_API_BASE}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as DiscordAPIError;
      console.error("[Discord API] Get guilds failed:", {
        status: response.status,
        error: errorData,
      });
      return {
        success: false,
        error: errorData.message || `Failed to get guilds with status ${response.status}`,
      };
    }

    const data = await response.json() as DiscordPartialGuild[];
    return { success: true, data };
  } catch (error) {
    console.error("[Discord API] Get guilds error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get guilds",
    };
  }
}

// =============================================================================
// Bot API Functions (using Bot token)
// =============================================================================

/**
 * Create Discord API client for bot operations
 */
export function createDiscordBotClient() {
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!botToken) {
    throw new Error("DISCORD_BOT_TOKEN is not configured");
  }

  return {
    /**
     * Send a message to a channel
     *
     * @param channelId - Target channel ID
     * @param message - Message content or full message object
     * @returns Created message or error
     *
     * @see https://discord.com/developers/docs/resources/message#create-message
     */
    async sendMessage(
      channelId: string,
      message: string | DiscordCreateMessageRequest
    ): Promise<{ success: true; data: DiscordMessage } | { success: false; error: string; code?: number }> {
      const body: DiscordCreateMessageRequest =
        typeof message === "string" ? { content: message } : message;

      // Validate message content
      if (body.content && body.content.length > 2000) {
        return {
          success: false,
          error: "Message content exceeds 2000 character limit",
          code: 50035, // Invalid form body
        };
      }

      if (!body.content && !body.embeds?.length && !body.sticker_ids?.length) {
        return {
          success: false,
          error: "Message must have content, embeds, or stickers",
          code: 50006, // Cannot send an empty message
        };
      }

      try {
        const response = await fetch(
          `${DISCORD_API_BASE}/channels/${channelId}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bot ${botToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({})) as DiscordAPIError;
          console.error("[Discord Bot] Send message failed:", {
            status: response.status,
            channelId,
            error: errorData,
          });

          // Map common error codes to friendly messages
          const errorMessage = mapDiscordError(response.status, errorData);

          return {
            success: false,
            error: errorMessage,
            code: errorData.code,
          };
        }

        const data = await response.json() as DiscordMessage;
        return { success: true, data };
      } catch (error) {
        console.error("[Discord Bot] Send message error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to send message",
        };
      }
    },

    /**
     * Get guild channels (for channel selection)
     *
     * @param guildId - Guild ID
     * @returns Array of channels or error
     *
     * @see https://discord.com/developers/docs/resources/guild#get-guild-channels
     */
    async getGuildChannels(
      guildId: string
    ): Promise<{ success: true; data: DiscordChannel[] } | { success: false; error: string }> {
      try {
        const response = await fetch(
          `${DISCORD_API_BASE}/guilds/${guildId}/channels`,
          {
            headers: {
              Authorization: `Bot ${botToken}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({})) as DiscordAPIError;
          console.error("[Discord Bot] Get channels failed:", {
            status: response.status,
            guildId,
            error: errorData,
          });
          return {
            success: false,
            error: errorData.message || `Failed to get channels with status ${response.status}`,
          };
        }

        const data = await response.json() as DiscordChannel[];

        // Filter to only text channels that the bot can likely send to
        const textChannels = data.filter(
          (channel) =>
            channel.type === DiscordChannelType.GUILD_TEXT ||
            channel.type === DiscordChannelType.GUILD_ANNOUNCEMENT
        );

        return { success: true, data: textChannels };
      } catch (error) {
        console.error("[Discord Bot] Get channels error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to get channels",
        };
      }
    },

    /**
     * Get a single channel by ID
     *
     * @param channelId - Channel ID
     * @returns Channel object or error
     */
    async getChannel(
      channelId: string
    ): Promise<{ success: true; data: DiscordChannel } | { success: false; error: string }> {
      try {
        const response = await fetch(
          `${DISCORD_API_BASE}/channels/${channelId}`,
          {
            headers: {
              Authorization: `Bot ${botToken}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({})) as DiscordAPIError;
          return {
            success: false,
            error: errorData.message || `Failed to get channel with status ${response.status}`,
          };
        }

        const data = await response.json() as DiscordChannel;
        return { success: true, data };
      } catch (error) {
        console.error("[Discord Bot] Get channel error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to get channel",
        };
      }
    },
  };
}

// =============================================================================
// Error Handling
// =============================================================================

/**
 * Map Discord API errors to user-friendly messages
 */
function mapDiscordError(status: number, error: DiscordAPIError): string {
  // HTTP status-based errors
  if (status === 401) {
    return "Bot authentication failed. Please check DISCORD_BOT_TOKEN.";
  }
  if (status === 403) {
    return "Bot lacks permission to send messages in this channel.";
  }
  if (status === 404) {
    return "Channel not found. The bot may not have access to this channel.";
  }
  if (status === 429) {
    return "Rate limited by Discord. Please try again later.";
  }

  // Discord API error codes
  switch (error.code) {
    case 10003:
      return "Unknown channel. The channel may have been deleted.";
    case 10004:
      return "Unknown guild. The bot may have been removed from this server.";
    case 50001:
      return "Missing access. The bot cannot see this channel.";
    case 50013:
      return "Missing permissions. The bot cannot send messages here.";
    case 50035:
      return "Invalid message content. Please check the message format.";
    case 40001:
      return "Unauthorized. Please reconnect Discord.";
    default:
      return error.message || "An unexpected Discord API error occurred.";
  }
}

// =============================================================================
// Exports
// =============================================================================

export type { DiscordAPIError };
