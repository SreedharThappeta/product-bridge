/**
 * Discord API Types and Interfaces
 *
 * These types are based on official Discord API documentation:
 * - OAuth2: https://discord.com/developers/docs/topics/oauth2
 * - API Reference: https://discord.com/developers/docs/reference
 * - User Resource: https://discord.com/developers/docs/resources/user
 * - Guild Resource: https://discord.com/developers/docs/resources/guild
 * - Message Resource: https://discord.com/developers/docs/resources/message
 */

// =============================================================================
// Discord API Configuration
// =============================================================================

/** Discord API base URL (use v10 for latest stable) */
export const DISCORD_API_BASE = "https://discord.com/api/v10";

/** Discord OAuth2 authorization endpoint */
export const DISCORD_OAUTH_AUTHORIZE_URL = "https://discord.com/oauth2/authorize";

/** Discord OAuth2 token endpoint */
export const DISCORD_OAUTH_TOKEN_URL = "https://discord.com/api/oauth2/token";

/** Discord OAuth2 token revoke endpoint */
export const DISCORD_OAUTH_REVOKE_URL = "https://discord.com/api/oauth2/token/revoke";

// =============================================================================
// OAuth2 Types
// =============================================================================

/**
 * OAuth2 scopes used in this integration
 * @see https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
 */
export type DiscordOAuthScope =
  | "identify"           // Access user info (id, username, avatar, discriminator)
  | "email"              // Access user email
  | "guilds"             // Access list of guilds user is in
  | "guilds.join"        // Allow bot to add user to a guild
  | "guilds.members.read" // Read guild member info
  | "bot"                // For bot authorization (adds bot to guild)
  | "applications.commands"; // For slash commands

/**
 * Default scopes for this integration:
 * - identify: Get user info for linking accounts
 * - guilds: List user's guilds to select where to post
 * - bot: Add bot to the selected guild
 */
export const DEFAULT_OAUTH_SCOPES: DiscordOAuthScope[] = [
  "identify",
  "guilds",
  "bot",
];

/**
 * Bot permissions required for sending messages
 * @see https://discord.com/developers/docs/topics/permissions
 */
export const BOT_PERMISSIONS = {
  VIEW_CHANNEL: 1024,             // 1 << 10
  SEND_MESSAGES: 2048,            // 1 << 11
  EMBED_LINKS: 16384,             // 1 << 14
  ATTACH_FILES: 32768,            // 1 << 15
  READ_MESSAGE_HISTORY: 65536,    // 1 << 16
  MENTION_EVERYONE: 131072,       // 1 << 17
  USE_EXTERNAL_EMOJIS: 262144,    // 1 << 18
} as const;

/**
 * Calculate combined bot permissions integer
 */
export function calculateBotPermissions(
  permissions: (keyof typeof BOT_PERMISSIONS)[]
): string {
  let combined = 0;
  for (const perm of permissions) {
    combined |= BOT_PERMISSIONS[perm];
  }
  return combined.toString();
}

/**
 * Default bot permissions: View Channel, Send Messages, Embed Links
 */
export const DEFAULT_BOT_PERMISSIONS = calculateBotPermissions([
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "EMBED_LINKS",
]);

/**
 * OAuth2 authorization URL parameters
 */
export interface DiscordOAuthParams {
  client_id: string;
  redirect_uri: string;
  response_type: "code";
  scope: string;
  state: string;
  permissions?: string;
  guild_id?: string;
  disable_guild_select?: boolean;
}

/**
 * OAuth2 token exchange request body
 * Content-Type: application/x-www-form-urlencoded
 */
export interface DiscordTokenExchangeRequest {
  client_id: string;
  client_secret: string;
  grant_type: "authorization_code";
  code: string;
  redirect_uri: string;
}

/**
 * OAuth2 token refresh request body
 */
export interface DiscordTokenRefreshRequest {
  client_id: string;
  client_secret: string;
  grant_type: "refresh_token";
  refresh_token: string;
}

/**
 * OAuth2 token response from Discord
 */
export interface DiscordTokenResponse {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  refresh_token: string;
  scope: string;
  /** Guild info if bot scope was included */
  guild?: DiscordGuild;
}

/**
 * Discord API error response
 */
export interface DiscordAPIError {
  code: number;
  message: string;
  errors?: Record<string, unknown>;
}

// =============================================================================
// User Types
// =============================================================================

/**
 * Discord user object
 * @see https://discord.com/developers/docs/resources/user#user-object
 */
export interface DiscordUser {
  /** User's ID (snowflake) */
  id: string;
  /** User's username (not unique) */
  username: string;
  /** User's Discord tag (4-digit discriminator, "0" for new usernames) */
  discriminator: string;
  /** User's display name (if set) */
  global_name: string | null;
  /** User's avatar hash */
  avatar: string | null;
  /** Whether this is a bot account */
  bot?: boolean;
  /** Whether this is a system user */
  system?: boolean;
  /** Whether MFA is enabled */
  mfa_enabled?: boolean;
  /** User's banner hash */
  banner?: string | null;
  /** User's banner color (hex) */
  accent_color?: number | null;
  /** User's locale */
  locale?: string;
  /** Whether email is verified */
  verified?: boolean;
  /** User's email (requires email scope) */
  email?: string | null;
  /** User's public flags */
  flags?: number;
  /** Type of Nitro subscription */
  premium_type?: number;
  /** User's public flags */
  public_flags?: number;
  /** Avatar decoration data */
  avatar_decoration_data?: {
    asset: string;
    sku_id: string;
  } | null;
}

/**
 * Get the avatar URL for a Discord user
 */
export function getDiscordAvatarUrl(
  user: DiscordUser,
  size: 16 | 32 | 64 | 128 | 256 | 512 | 1024 = 128
): string {
  if (user.avatar) {
    const extension = user.avatar.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=${size}`;
  }
  // Default avatar based on discriminator or user ID
  // For new usernames (discriminator "0"), use user ID modulo 6
  // For legacy usernames, use discriminator modulo 5
  const defaultIndex = user.discriminator === "0"
    ? Number(BigInt(user.id) >> BigInt(22) & BigInt(0x3F)) % 6
    : parseInt(user.discriminator) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
}

// =============================================================================
// Guild Types
// =============================================================================

/**
 * Discord guild (server) object
 * @see https://discord.com/developers/docs/resources/guild#guild-object
 */
export interface DiscordGuild {
  /** Guild ID (snowflake) */
  id: string;
  /** Guild name */
  name: string;
  /** Guild icon hash */
  icon: string | null;
  /** Whether the user is the owner */
  owner?: boolean;
  /** User's permissions in the guild (as string of bitfield) */
  permissions?: string;
  /** Guild features */
  features: string[];
}

/**
 * Partial guild object returned by /users/@me/guilds
 */
export interface DiscordPartialGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

/**
 * Get the icon URL for a Discord guild
 */
export function getDiscordGuildIconUrl(
  guild: DiscordGuild | DiscordPartialGuild,
  size: 16 | 32 | 64 | 128 | 256 | 512 | 1024 = 128
): string | null {
  if (!guild.icon) return null;
  const extension = guild.icon.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${extension}?size=${size}`;
}

/**
 * Check if user has MANAGE_GUILD permission (required to configure integrations)
 * MANAGE_GUILD = 0x00000020 = 32
 * ADMINISTRATOR = 0x00000008 = 8
 */
export function hasManageGuildPermission(permissions: string): boolean {
  // Parse as number - safe for permission values within JS number range
  const perms = parseInt(permissions, 10);
  const MANAGE_GUILD = 32;  // 1 << 5
  const ADMINISTRATOR = 8; // 1 << 3
  return (perms & MANAGE_GUILD) !== 0 || (perms & ADMINISTRATOR) !== 0;
}

// =============================================================================
// Channel Types
// =============================================================================

/**
 * Discord channel object (partial, for channel selection)
 * @see https://discord.com/developers/docs/resources/channel#channel-object
 */
export interface DiscordChannel {
  /** Channel ID (snowflake) */
  id: string;
  /** Channel type */
  type: DiscordChannelType;
  /** Guild ID (if guild channel) */
  guild_id?: string;
  /** Sorting position */
  position?: number;
  /** Channel name */
  name?: string;
  /** Channel topic */
  topic?: string | null;
  /** Whether NSFW */
  nsfw?: boolean;
  /** Parent category ID */
  parent_id?: string | null;
  /** Permission overwrites */
  permission_overwrites?: DiscordPermissionOverwrite[];
}

/**
 * Discord channel types
 */
export enum DiscordChannelType {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_ANNOUNCEMENT = 5,
  ANNOUNCEMENT_THREAD = 10,
  PUBLIC_THREAD = 11,
  PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
  GUILD_DIRECTORY = 14,
  GUILD_FORUM = 15,
  GUILD_MEDIA = 16,
}

/**
 * Permission overwrite object
 */
export interface DiscordPermissionOverwrite {
  id: string;
  type: 0 | 1; // 0 = role, 1 = member
  allow: string;
  deny: string;
}

// =============================================================================
// Message Types
// =============================================================================

/**
 * Create message request body
 * @see https://discord.com/developers/docs/resources/message#create-message
 */
export interface DiscordCreateMessageRequest {
  /** Message content (up to 2000 characters) */
  content?: string;
  /** True if this is a TTS message */
  tts?: boolean;
  /** Embedded rich content (up to 10 embeds) */
  embeds?: DiscordEmbed[];
  /** Allowed mentions configuration */
  allowed_mentions?: DiscordAllowedMentions;
  /** Message reference for replies */
  message_reference?: DiscordMessageReference;
  /** Component objects like buttons (up to 5 action rows) */
  components?: DiscordActionRow[];
  /** IDs of stickers to send */
  sticker_ids?: string[];
  /** Message flags (e.g., SUPPRESS_EMBEDS = 4, SUPPRESS_NOTIFICATIONS = 4096) */
  flags?: number;
}

/**
 * Discord embed object
 * @see https://discord.com/developers/docs/resources/message#embed-object
 */
export interface DiscordEmbed {
  /** Embed title (max 256 chars) */
  title?: string;
  /** Embed type (always "rich" for webhook/bot embeds) */
  type?: "rich" | "image" | "video" | "gifv" | "article" | "link";
  /** Embed description (max 4096 chars) */
  description?: string;
  /** URL of embed title */
  url?: string;
  /** ISO8601 timestamp */
  timestamp?: string;
  /** Color code (decimal) */
  color?: number;
  /** Footer information */
  footer?: {
    text: string;
    icon_url?: string;
  };
  /** Image information */
  image?: {
    url: string;
    height?: number;
    width?: number;
  };
  /** Thumbnail information */
  thumbnail?: {
    url: string;
    height?: number;
    width?: number;
  };
  /** Author information */
  author?: {
    name: string;
    url?: string;
    icon_url?: string;
  };
  /** Embed fields (max 25) */
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
}

/**
 * Allowed mentions configuration
 */
export interface DiscordAllowedMentions {
  /** Array of allowed mention types */
  parse?: ("roles" | "users" | "everyone")[];
  /** Array of role IDs to mention */
  roles?: string[];
  /** Array of user IDs to mention */
  users?: string[];
  /** Whether to mention the replied user */
  replied_user?: boolean;
}

/**
 * Message reference for replies
 */
export interface DiscordMessageReference {
  message_id?: string;
  channel_id?: string;
  guild_id?: string;
  fail_if_not_exists?: boolean;
}

/**
 * Action row component (container for buttons, etc.)
 */
export interface DiscordActionRow {
  type: 1;
  components: DiscordComponent[];
}

/**
 * Discord component types
 */
export type DiscordComponent = DiscordButton | DiscordSelectMenu;

/**
 * Button component
 */
export interface DiscordButton {
  type: 2;
  style: 1 | 2 | 3 | 4 | 5; // Primary, Secondary, Success, Danger, Link
  label?: string;
  emoji?: { id?: string; name?: string; animated?: boolean };
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

/**
 * Select menu component
 */
export interface DiscordSelectMenu {
  type: 3;
  custom_id: string;
  options: {
    label: string;
    value: string;
    description?: string;
    emoji?: { id?: string; name?: string; animated?: boolean };
    default?: boolean;
  }[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

/**
 * Discord message object (response from create message)
 */
export interface DiscordMessage {
  id: string;
  channel_id: string;
  author: DiscordUser;
  content: string;
  timestamp: string;
  edited_timestamp: string | null;
  tts: boolean;
  mention_everyone: boolean;
  mentions: DiscordUser[];
  mention_roles: string[];
  attachments: unknown[];
  embeds: DiscordEmbed[];
  pinned: boolean;
  type: number;
}

// =============================================================================
// Database / Storage Types (App-specific)
// =============================================================================

/**
 * Discord connection stored in database
 * Links a local user to their Discord account
 */
export interface DiscordConnection {
  /** Local user ID */
  userId: string;
  /** Discord user ID */
  discordUserId: string;
  /** Discord username */
  discordUsername: string;
  /** Discord discriminator */
  discordDiscriminator: string;
  /** Discord avatar hash */
  discordAvatar: string | null;
  /** OAuth2 access token */
  accessToken: string;
  /** OAuth2 refresh token */
  refreshToken: string;
  /** Token expiry timestamp (ISO 8601) */
  expiresAt: string;
  /** OAuth2 scopes granted */
  scopes: string;
  /** Selected guild ID for notifications */
  guildId?: string;
  /** Selected channel ID for notifications */
  channelId?: string;
  /** When the connection was created */
  createdAt: string;
  /** When the connection was last updated */
  updatedAt: string;
}

/**
 * Request body for /api/discord/notify
 */
export interface DiscordNotifyRequest {
  /** Target guild ID (for validation) */
  guildId: string;
  /** Target channel ID */
  channelId: string;
  /** Message content (plain text, max 2000 chars) */
  message?: string;
  /** Optional embed for rich content */
  embed?: DiscordEmbed;
}

/**
 * Response from /api/discord/notify
 */
export interface DiscordNotifyResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  errorCode?: string;
}

// =============================================================================
// CSRF State Types
// =============================================================================

/**
 * OAuth2 state payload (stored in cookie or database)
 */
export interface DiscordOAuthState {
  /** Random state value for CSRF protection */
  state: string;
  /** Local user ID initiating the flow */
  userId?: string;
  /** Redirect path after OAuth completes */
  returnTo?: string;
  /** Timestamp when state was created */
  createdAt: number;
  /** Optional: Pre-selected guild ID */
  guildId?: string;
}
