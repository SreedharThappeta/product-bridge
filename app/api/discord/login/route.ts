/**
 * Discord OAuth2 Login Route
 *
 * GET /api/discord/login
 *
 * Initiates the Discord OAuth2 authorization flow:
 * 1. Generates a cryptographically secure state value for CSRF protection
 * 2. Stores state in an encrypted cookie
 * 3. Redirects user to Discord's authorization page
 *
 * Query Parameters:
 * - returnTo: Optional path to redirect after OAuth completes (default: "/")
 * - guildId: Optional pre-selected guild ID for the bot
 *
 * Environment Variables Required:
 * - DISCORD_CLIENT_ID: OAuth2 application client ID
 * - DISCORD_REDIRECT_URI: OAuth2 callback URL (must match Discord portal)
 *
 * @see https://discord.com/developers/docs/topics/oauth2#authorization-code-grant
 */

import { NextResponse } from "next/server";
import {
  DISCORD_OAUTH_AUTHORIZE_URL,
  DEFAULT_OAUTH_SCOPES,
  DEFAULT_BOT_PERMISSIONS,
  getDiscordConfig,
  createOAuthState,
  encryptState,
  buildStateCookieHeader,
  logSecurityEvent,
} from "@/src/discord";

export const dynamic = "force-dynamic";

/**
 * GET /api/discord/login
 *
 * Redirects user to Discord OAuth2 authorization page
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Get configuration
    const config = getDiscordConfig();

    // Parse query parameters
    const url = new URL(request.url);
    const returnTo = url.searchParams.get("returnTo") || "/";
    const guildId = url.searchParams.get("guildId") || undefined;

    // Validate returnTo to prevent open redirects
    // Only allow relative paths starting with /
    const safeReturnTo = returnTo.startsWith("/") && !returnTo.startsWith("//")
      ? returnTo
      : "/";

    // TODO: In production, you would validate the user session here
    // For now, we'll use a placeholder user ID
    // const session = await getSession(request);
    // if (!session?.user?.id) {
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }
    const userId = undefined; // Replace with actual user ID from session

    // Generate OAuth state for CSRF protection
    const state = createOAuthState({
      userId,
      returnTo: safeReturnTo,
      guildId,
    });

    // Encrypt state for cookie storage
    const encryptedState = encryptState(state);

    // Build Discord authorization URL
    const authParams = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: "code",
      scope: DEFAULT_OAUTH_SCOPES.join(" "),
      state: state.state,
      // Bot-specific parameters
      permissions: DEFAULT_BOT_PERMISSIONS,
    });

    // If guild is pre-selected, include it
    if (guildId) {
      authParams.set("guild_id", guildId);
      authParams.set("disable_guild_select", "true");
    }

    const authorizationUrl = `${DISCORD_OAUTH_AUTHORIZE_URL}?${authParams.toString()}`;

    // Log the OAuth flow initiation
    logSecurityEvent("oauth_started", {
      userId,
      ip: request.headers.get("x-forwarded-for") || undefined,
    });

    // Create redirect response with state cookie
    const response = NextResponse.redirect(authorizationUrl, { status: 302 });

    // Set encrypted state cookie
    response.headers.set("Set-Cookie", buildStateCookieHeader(encryptedState));

    return response;
  } catch (error) {
    console.error("[Discord Login] Error:", error);

    // Redirect to error page or return JSON error
    const errorMessage = error instanceof Error ? error.message : "Failed to start Discord login";

    // In production, redirect to an error page
    // return NextResponse.redirect(new URL(`/error?message=${encodeURIComponent(errorMessage)}`, request.url));

    // For development, return JSON error
    return NextResponse.json(
      {
        error: "oauth_init_failed",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Health check / info endpoint
 */
export async function HEAD(): Promise<NextResponse> {
  return new NextResponse(null, { status: 200 });
}
