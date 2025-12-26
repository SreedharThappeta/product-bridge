/**
 * Discord Bot Invite Helper
 *
 * GET /api/discord/bot-invite
 *
 * Redirects to the Discord bot authorization page to add the bot to a server.
 * This is a simpler alternative to the full OAuth2 flow for testing.
 */

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/discord/bot-invite
 *
 * Redirects to Discord to add the bot to a server
 */
export async function GET(request: Request): Promise<NextResponse> {
  const clientId = process.env.DISCORD_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "DISCORD_CLIENT_ID not configured" },
      { status: 500 }
    );
  }

  // Check if specific guild is requested
  const url = new URL(request.url);
  const guildId = url.searchParams.get("guild_id");

  // Build simple bot invite URL (no code grant, just bot scope)
  const params = new URLSearchParams({
    client_id: clientId,
    permissions: "19456", // Send Messages (2048) + View Channel (1024) + Embed Links (16384)
    scope: "bot",
  });

  // If guild specified, pre-select it
  if (guildId) {
    params.set("guild_id", guildId);
    params.set("disable_guild_select", "true");
  }

  const inviteUrl = `https://discord.com/api/oauth2/authorize?${params.toString()}`;

  // Return HTML page with auto-redirect and instructions
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Add Discord Bot</title>
  <meta http-equiv="refresh" content="1;url=${inviteUrl}">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      max-width: 600px;
      margin: 100px auto;
      padding: 20px;
      text-align: center;
    }
    .card {
      background: #f3f4f6;
      border-radius: 8px;
      padding: 40px;
    }
    h1 { color: #5865f2; margin-bottom: 20px; }
    a {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background: #5865f2;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
    }
    a:hover { background: #4752c4; }
    .steps {
      margin-top: 30px;
      text-align: left;
      background: white;
      padding: 20px;
      border-radius: 8px;
    }
    .steps li { margin: 10px 0; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🤖 Add Discord Bot</h1>
    <p>Redirecting to Discord to add the bot to your server...</p>
    <a href="${inviteUrl}">Click here if not redirected automatically</a>

    <div class="steps">
      <strong>What happens next:</strong>
      <ol>
        <li>Select a Discord server you manage</li>
        <li>Click "Authorize" to add the bot</li>
        <li>The bot will appear in your server's member list</li>
        <li>You can then test sending messages via the API</li>
      </ol>
    </div>
  </div>
</body>
</html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    }
  );
}
