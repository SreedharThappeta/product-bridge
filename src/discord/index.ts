/**
 * Discord Integration Module
 *
 * This module provides Discord OAuth2 authentication and bot messaging
 * capabilities for the feedback widget application.
 *
 * Usage:
 * ```typescript
 * import { createDiscordBotClient, exchangeCodeForTokens } from "@/src/discord";
 *
 * // Send a message via bot
 * const bot = createDiscordBotClient();
 * await bot.sendMessage(channelId, "Hello from the bot!");
 *
 * // Exchange OAuth code for tokens
 * const result = await exchangeCodeForTokens(code);
 * ```
 */

// Types
export * from "./types";

// OAuth2 and API client
export {
  getDiscordConfig,
  exchangeCodeForTokens,
  refreshAccessToken,
  revokeToken,
  getCurrentUser,
  getCurrentUserGuilds,
  createDiscordBotClient,
} from "./client";

// Security utilities
export {
  generateState,
  createOAuthState,
  encryptState,
  decryptState,
  validateState,
  buildStateCookieHeader,
  buildClearStateCookieHeader,
  parseStateCookie,
  logSecurityEvent,
  DISCORD_STATE_COOKIE_NAME,
  DISCORD_STATE_COOKIE_MAX_AGE,
} from "./security";
