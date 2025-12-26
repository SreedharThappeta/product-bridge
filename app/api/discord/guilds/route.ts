/**
 * Discord Guilds Route
 *
 * GET /api/discord/guilds
 *
 * Returns the list of Discord guilds (servers) the authenticated user
 * can configure for notifications. This includes guilds where the user
 * has MANAGE_GUILD or ADMINISTRATOR permissions.
 *
 * Response:
 * {
 *   "guilds": [
 *     {
 *       "id": "123456789",
 *       "name": "My Server",
 *       "icon": "abc123",
 *       "iconUrl": "https://cdn.discordapp.com/icons/...",
 *       "owner": true,
 *       "hasBot": true,
 *       "channels": [...]  // If bot is installed and channels are fetchable
 *     }
 *   ]
 * }
 *
 * GET /api/discord/guilds/:guildId/channels
 *
 * Returns text channels for a specific guild where the bot can send messages.
 *
 * Environment Variables Required:
 * - DISCORD_BOT_TOKEN: Bot token for fetching guild channels
 */

import { NextResponse } from "next/server";
import {
  getCurrentUserGuilds,
  refreshAccessToken,
  createDiscordBotClient,
  getDiscordGuildIconUrl,
  hasManageGuildPermission,
  type DiscordPartialGuild,
  type DiscordConnection,
} from "@/src/discord";

export const dynamic = "force-dynamic";

/**
 * Extended guild info returned to the client
 */
interface GuildInfo {
  id: string;
  name: string;
  icon: string | null;
  iconUrl: string | null;
  owner: boolean;
  canManage: boolean;
  hasBot: boolean;
  channels?: ChannelInfo[];
}

/**
 * Channel info returned to the client
 */
interface ChannelInfo {
  id: string;
  name: string;
  type: number;
  position: number;
  parentId: string | null;
}

/**
 * GET /api/discord/guilds
 *
 * List user's Discord guilds they can configure
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    // =============================================================================
    // AUTHENTICATION
    // =============================================================================
    // TODO: Get the authenticated user's Discord connection from your database
    //
    // Example:
    // ```typescript
    // const session = await getSession(request);
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    //
    // const connection = await prisma.discordConnection.findFirst({
    //   where: { userId: session.user.id },
    // });
    //
    // if (!connection) {
    //   return NextResponse.json(
    //     { error: "Discord not connected", needsConnection: true },
    //     { status: 401 }
    //   );
    // }
    // ```

    // For demonstration, we'll simulate a stored connection
    // In production, this would come from your database
    const connection = await getMockConnection();

    if (!connection) {
      return NextResponse.json(
        {
          error: "Discord not connected",
          needsConnection: true,
          loginUrl: "/api/discord/login",
        },
        { status: 401 }
      );
    }

    // Check if token is expired and refresh if needed
    let accessToken = connection.accessToken;
    const tokenExpiresAt = new Date(connection.expiresAt);

    if (tokenExpiresAt <= new Date()) {
      console.log("[Discord Guilds] Access token expired, refreshing...");

      const refreshResult = await refreshAccessToken(connection.refreshToken);
      if (!refreshResult.success) {
        console.error("[Discord Guilds] Token refresh failed:", refreshResult.error);
        return NextResponse.json(
          {
            error: "Discord session expired. Please reconnect.",
            needsConnection: true,
            loginUrl: "/api/discord/login",
          },
          { status: 401 }
        );
      }

      // Update stored tokens
      accessToken = refreshResult.data.access_token;

      // TODO: Update tokens in database
      // await prisma.discordConnection.update({
      //   where: { id: connection.id },
      //   data: {
      //     accessToken: refreshResult.data.access_token,
      //     refreshToken: refreshResult.data.refresh_token,
      //     expiresAt: new Date(Date.now() + refreshResult.data.expires_in * 1000).toISOString(),
      //   },
      // });
    }

    // Fetch guilds from Discord
    const guildsResult = await getCurrentUserGuilds(accessToken);
    if (!guildsResult.success) {
      console.error("[Discord Guilds] Failed to fetch guilds:", guildsResult.error);
      return NextResponse.json(
        { error: guildsResult.error },
        { status: 500 }
      );
    }

    // Filter to guilds user can manage and transform for response
    const bot = createDiscordBotClient();
    const guilds: GuildInfo[] = [];

    for (const guild of guildsResult.data) {
      const canManage = guild.owner || hasManageGuildPermission(guild.permissions);

      if (!canManage) {
        continue; // Skip guilds user can't configure
      }

      const guildInfo: GuildInfo = {
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        iconUrl: getDiscordGuildIconUrl(guild),
        owner: guild.owner,
        canManage,
        hasBot: false,
        channels: undefined,
      };

      // Try to fetch channels (will succeed if bot is in the guild)
      const channelsResult = await bot.getGuildChannels(guild.id);
      if (channelsResult.success) {
        guildInfo.hasBot = true;
        guildInfo.channels = channelsResult.data.map((channel) => ({
          id: channel.id,
          name: channel.name || "Unknown",
          type: channel.type,
          position: channel.position || 0,
          parentId: channel.parent_id || null,
        }));
      }

      guilds.push(guildInfo);
    }

    // Sort: guilds with bot first, then by name
    guilds.sort((a, b) => {
      if (a.hasBot !== b.hasBot) {
        return a.hasBot ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json({ guilds });
  } catch (error) {
    console.error("[Discord Guilds] Unexpected error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Mock function to simulate database lookup
 * Replace this with actual database query
 */
async function getMockConnection(): Promise<DiscordConnection | null> {
  // In production, fetch from database:
  // return await prisma.discordConnection.findFirst({ where: { userId } });

  // Return null to indicate no connection (user needs to connect)
  return null;
}

/**
 * POST /api/discord/guilds
 *
 * Save guild/channel selection for notifications
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    // =============================================================================
    // AUTHENTICATION
    // =============================================================================
    // TODO: Verify user session
    // const session = await getSession(request);
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Parse request body
    let body: { guildId: string; channelId: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON" },
        { status: 400 }
      );
    }

    const { guildId, channelId } = body;

    // Validate inputs
    if (!guildId || !/^\d{17,20}$/.test(guildId)) {
      return NextResponse.json(
        { error: "Invalid guildId" },
        { status: 400 }
      );
    }

    if (!channelId || !/^\d{17,20}$/.test(channelId)) {
      return NextResponse.json(
        { error: "Invalid channelId" },
        { status: 400 }
      );
    }

    // Verify the bot has access to the channel
    const bot = createDiscordBotClient();
    const channelResult = await bot.getChannel(channelId);

    if (!channelResult.success) {
      return NextResponse.json(
        { error: "Cannot access channel. Make sure the bot has been added to this server." },
        { status: 400 }
      );
    }

    // Verify channel belongs to the specified guild
    if (channelResult.data.guild_id !== guildId) {
      return NextResponse.json(
        { error: "Channel does not belong to the specified guild" },
        { status: 400 }
      );
    }

    // =============================================================================
    // DATABASE UPDATE
    // =============================================================================
    // TODO: Update the Discord connection in your database
    //
    // Example:
    // ```typescript
    // await prisma.discordConnection.update({
    //   where: { userId: session.user.id },
    //   data: {
    //     guildId,
    //     channelId,
    //     updatedAt: new Date().toISOString(),
    //   },
    // });
    // ```

    console.log("[Discord Guilds] Channel selection saved:", {
      guildId: guildId.slice(0, 4) + "****",
      channelId: channelId.slice(0, 4) + "****",
      channelName: channelResult.data.name,
    });

    return NextResponse.json({
      success: true,
      channel: {
        id: channelResult.data.id,
        name: channelResult.data.name,
      },
    });
  } catch (error) {
    console.error("[Discord Guilds] Unexpected error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
