/**
 * Discord OAuth2 Callback Route
 *
 * GET /api/discord/callback
 *
 * Handles the OAuth2 callback from Discord:
 * 1. Validates the state parameter for CSRF protection
 * 2. Exchanges the authorization code for tokens
 * 3. Fetches user info and guild list
 * 4. Stores the Discord connection in the database
 * 5. Redirects back to the frontend
 *
 * Query Parameters (from Discord):
 * - code: Authorization code to exchange for tokens
 * - state: CSRF state value (must match stored state)
 * - guild_id: Guild ID where bot was added (if bot scope included)
 * - permissions: Permissions granted to the bot
 *
 * Error Query Parameters:
 * - error: Error code (e.g., "access_denied")
 * - error_description: Human-readable error message
 *
 * Environment Variables Required:
 * - DISCORD_CLIENT_ID: OAuth2 application client ID
 * - DISCORD_CLIENT_SECRET: OAuth2 application client secret
 * - DISCORD_REDIRECT_URI: This callback URL
 *
 * @see https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-exchange-example
 */

import { NextResponse } from "next/server";
import {
  exchangeCodeForTokens,
  getCurrentUser,
  getCurrentUserGuilds,
  parseStateCookie,
  validateState,
  buildClearStateCookieHeader,
  logSecurityEvent,
  hasManageGuildPermission,
  type DiscordConnection,
  type DiscordPartialGuild,
} from "@/src/discord";

export const dynamic = "force-dynamic";

/**
 * GET /api/discord/callback
 *
 * OAuth2 callback handler
 */
export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const baseUrl = process.env.BASE_URL as string || `${url.protocol}//${url.host}`;

  // Parse state from cookie
  const cookieHeader = request.headers.get("cookie");
  const storedState = parseStateCookie(cookieHeader);

  // Clear the state cookie regardless of outcome
  const clearCookieHeader = buildClearStateCookieHeader();

  try {
    // Check for OAuth errors from Discord
    const errorCode = url.searchParams.get("error");
    if (errorCode) {
      const errorDescription = url.searchParams.get("error_description") || "Authorization denied";
      console.error("[Discord Callback] OAuth error from Discord:", {
        error: errorCode,
        description: errorDescription,
      });

      logSecurityEvent("oauth_failed", {
        error: `${errorCode}: ${errorDescription}`,
      });

      return createErrorRedirect(baseUrl, storedState?.returnTo, {
        error: errorCode,
        message: errorDescription,
        clearCookie: clearCookieHeader,
      });
    }

    // Get code and state from query params
    const code = url.searchParams.get("code");
    const receivedState = url.searchParams.get("state");
    const guildId = url.searchParams.get("guild_id");
    const permissions = url.searchParams.get("permissions");

    // Validate state for CSRF protection
    const stateValidation = validateState(storedState, receivedState);
    if (!stateValidation.valid) {
      console.error("[Discord Callback] State validation failed:", stateValidation.error);

      logSecurityEvent("state_mismatch", {
        error: stateValidation.error,
        ip: request.headers.get("x-forwarded-for") || undefined,
      });

      return createErrorRedirect(baseUrl, "/", {
        error: "state_invalid",
        message: stateValidation.error,
        clearCookie: clearCookieHeader,
      });
    }

    // Check for authorization code
    if (!code) {
      console.error("[Discord Callback] No authorization code received");

      return createErrorRedirect(baseUrl, storedState?.returnTo, {
        error: "no_code",
        message: "No authorization code received from Discord",
        clearCookie: clearCookieHeader,
      });
    }

    // Exchange code for tokens
    console.log("[Discord Callback] Exchanging code for tokens...");
    const tokenResult = await exchangeCodeForTokens(code);

    if (!tokenResult.success) {
      console.error("[Discord Callback] Token exchange failed:", tokenResult.error);

      logSecurityEvent("oauth_failed", {
        error: tokenResult.error,
      });

      return createErrorRedirect(baseUrl, storedState?.returnTo, {
        error: "token_exchange_failed",
        message: tokenResult.error,
        clearCookie: clearCookieHeader,
      });
    }

    const tokens = tokenResult.data;
    console.log("[Discord Callback] Token exchange successful, fetching user info...");

    // Fetch user information
    const userResult = await getCurrentUser(tokens.access_token);
    if (!userResult.success) {
      console.error("[Discord Callback] Failed to fetch user:", userResult.error);

      return createErrorRedirect(baseUrl, storedState?.returnTo, {
        error: "user_fetch_failed",
        message: userResult.error,
        clearCookie: clearCookieHeader,
      });
    }

    const discordUser = userResult.data;
    console.log("[Discord Callback] User fetched:", {
      id: discordUser.id.slice(0, 4) + "****",
      username: discordUser.username,
    });

    // Fetch user's guilds (servers)
    let guilds: DiscordPartialGuild[] = [];
    if (tokens.scope.includes("guilds")) {
      const guildsResult = await getCurrentUserGuilds(tokens.access_token);
      if (guildsResult.success) {
        // Filter to guilds where user can manage (for configuration)
        guilds = guildsResult.data.filter((guild) =>
          guild.owner || hasManageGuildPermission(guild.permissions)
        );
        console.log(`[Discord Callback] Fetched ${guilds.length} manageable guilds`);
      } else {
        console.warn("[Discord Callback] Failed to fetch guilds:", guildsResult.error);
      }
    }

    // Calculate token expiry
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

    // Build connection object for storage
    const connection: DiscordConnection = {
      userId: storedState?.userId || "anonymous", // Replace with actual user ID
      discordUserId: discordUser.id,
      discordUsername: discordUser.username,
      discordDiscriminator: discordUser.discriminator,
      discordAvatar: discordUser.avatar,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt,
      scopes: tokens.scope,
      guildId: guildId || tokens.guild?.id || undefined,
      // Channel ID would be selected by user in a subsequent step
      channelId: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // =============================================================================
    // DATABASE STORAGE
    // =============================================================================
    // TODO: Store the connection in your database
    //
    // Example with Prisma:
    // ```typescript
    // await prisma.discordConnection.upsert({
    //   where: { discordUserId: connection.discordUserId },
    //   create: connection,
    //   update: {
    //     accessToken: connection.accessToken,
    //     refreshToken: connection.refreshToken,
    //     expiresAt: connection.expiresAt,
    //     scopes: connection.scopes,
    //     guildId: connection.guildId,
    //     updatedAt: connection.updatedAt,
    //   },
    // });
    // ```
    //
    // For now, we'll log the connection data (remove in production!)
    console.log("[Discord Callback] Connection data to store:", {
      discordUserId: connection.discordUserId,
      discordUsername: connection.discordUsername,
      guildId: connection.guildId,
      expiresAt: connection.expiresAt,
      // Never log tokens in production!
      hasAccessToken: !!connection.accessToken,
      hasRefreshToken: !!connection.refreshToken,
    });

    // Log successful OAuth completion
    logSecurityEvent("oauth_completed", {
      userId: storedState?.userId,
      discordUserId: discordUser.id,
    });

    // Build success redirect URL
    const returnTo = storedState?.returnTo || "/";
    const successUrl = new URL(returnTo, baseUrl);

    // Add success indicators to query params
    successUrl.searchParams.set("discord", "connected");
    successUrl.searchParams.set("discord_user", discordUser.username);

    if (guildId) {
      successUrl.searchParams.set("discord_guild", guildId);
    }

    // If bot was added to a guild, include that info
    if (tokens.guild) {
      successUrl.searchParams.set("discord_guild_name", tokens.guild.name);
    }

    // Create redirect response
    const response = NextResponse.redirect(successUrl.toString(), { status: 302 });

    // Clear the state cookie
    response.headers.set("Set-Cookie", clearCookieHeader);

    return response;
  } catch (error) {
    console.error("[Discord Callback] Unexpected error:", error);

    logSecurityEvent("oauth_failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return createErrorRedirect(baseUrl, storedState?.returnTo, {
      error: "internal_error",
      message: "An unexpected error occurred during Discord authorization",
      clearCookie: clearCookieHeader,
    });
  }
}

/**
 * Create an error redirect response
 */
function createErrorRedirect(
  baseUrl: string,
  returnTo: string | undefined,
  options: {
    error: string;
    message: string;
    clearCookie: string;
  }
): NextResponse {
  const errorUrl = new URL(returnTo || "/", baseUrl);
  errorUrl.searchParams.set("discord", "error");
  errorUrl.searchParams.set("discord_error", options.error);
  errorUrl.searchParams.set("discord_error_message", options.message);

  const response = NextResponse.redirect(errorUrl.toString(), { status: 302 });
  response.headers.set("Set-Cookie", options.clearCookie);

  return response;
}
