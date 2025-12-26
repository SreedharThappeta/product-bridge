# Discord OAuth2 + Bot Messaging Integration

This document describes the complete Discord integration for the feedback widget application, including OAuth2 authentication and bot-based channel messaging.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [OAuth2 Flow](#oauth2-flow)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Discord Developer Portal Setup](#discord-developer-portal-setup)
- [Database Schema](#database-schema)
- [Frontend Integration](#frontend-integration)
- [Security Considerations](#security-considerations)
- [Error Handling](#error-handling)
- [Example Payloads](#example-payloads)

---

## Overview

This integration enables:

1. **User Authentication**: Users connect their Discord account via OAuth2
2. **Server Selection**: Users choose which Discord server (guild) to receive notifications
3. **Channel Configuration**: Users select a specific channel for notifications
4. **Bot Messaging**: The application sends messages to configured channels using a bot token

### Key Design Decisions

- **Bot Token for Messaging**: We use the bot token (not user tokens) to send messages. This ensures reliable delivery regardless of user token expiration.
- **OAuth2 for Identity**: OAuth2 is used only to identify the user and list their servers, not for sending messages.
- **Encrypted State**: CSRF state is encrypted and stored in cookies using AES-256-GCM.

---

## Architecture

```
┌─────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend  │────▶│  /api/discord/  │────▶│  Discord API    │
│   (React)   │     │     login       │     │  /oauth2/       │
└─────────────┘     └─────────────────┘     │  authorize      │
                                            └────────┬────────┘
                                                     │
                                                     ▼
┌─────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend  │◀────│  /api/discord/  │◀────│  Discord OAuth  │
│  (success)  │     │    callback     │     │  Callback       │
└─────────────┘     └────────┬────────┘     └─────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Database     │
                    │  (store tokens) │
                    └─────────────────┘

┌─────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Internal   │────▶│  /api/discord/  │────▶│  Discord API    │
│  Services   │     │     notify      │     │  POST /channels │
└─────────────┘     └─────────────────┘     │  /{id}/messages │
                             │              └─────────────────┘
                             │
                    Uses DISCORD_BOT_TOKEN
                    (not user tokens)
```

---

## OAuth2 Flow

### Step-by-Step Flow

1. **User clicks "Connect Discord"**
   - Frontend navigates to `/api/discord/login`

2. **Login route generates state**
   - Creates cryptographically secure random state (32 bytes)
   - Encrypts state with metadata (userId, returnTo) using AES-256-GCM
   - Stores encrypted state in HttpOnly cookie
   - Redirects to Discord's authorization URL

3. **User authorizes on Discord**
   - Discord shows consent screen with requested scopes
   - User clicks "Authorize"
   - If `bot` scope is included, user also adds the bot to a server

4. **Discord redirects to callback**
   - Discord redirects to `/api/discord/callback?code=...&state=...`
   - If bot was added: includes `guild_id` and `permissions` params

5. **Callback validates and exchanges**
   - Validates state matches encrypted cookie (CSRF protection)
   - Exchanges authorization code for tokens via POST to Discord token endpoint
   - Fetches user info via GET `/users/@me`
   - Fetches guilds via GET `/users/@me/guilds`

6. **Store connection and redirect**
   - Stores Discord connection in database
   - Clears state cookie
   - Redirects to frontend with success params

### Sequence Diagram

```
User          Frontend        /login          Discord         /callback        Database
  │               │              │               │                │               │
  │──Click────────▶              │               │                │               │
  │               │──Navigate────▶               │                │               │
  │               │              │──Generate State                │               │
  │               │              │──Set Cookie───│                │               │
  │               │              │──Redirect─────▶                │               │
  │◀──────────────────────────────────────────────                │               │
  │               │              │               │                │               │
  │──Authorize────▶              │               │                │               │
  │               │              │               │──Redirect──────▶               │
  │               │              │               │                │──Validate State
  │               │              │               │                │──Exchange Code─▶
  │               │              │               │◀──Tokens────────               │
  │               │              │               │                │──Fetch User───▶
  │               │              │               │◀──User Data────                │
  │               │              │               │                │──Store─────────▶
  │               │              │               │                │               │
  │               │◀─────────────────────────────────Redirect─────│               │
  │◀──Success Page               │               │                │               │
```

---

## Environment Variables

Add these to your `.env.local` or production environment:

```bash
# Discord OAuth2 Application Credentials
# Get these from https://discord.com/developers/applications
DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here

# OAuth2 Redirect URI (must match Discord Developer Portal exactly)
DISCORD_REDIRECT_URI=https://your-domain.com/api/discord/callback

# Bot Token (from Discord Developer Portal > Bot tab)
DISCORD_BOT_TOKEN=your_bot_token_here

# Optional: Custom encryption key for state (32 bytes hex = 64 chars)
# If not set, derives key from DISCORD_CLIENT_SECRET
# DISCORD_STATE_ENCRYPTION_KEY=your_64_char_hex_key

# For client-side use (if needed)
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_client_id_here
```

### Security Notes

- Never commit `.env` files to version control
- Use different credentials for development/staging/production
- Rotate `DISCORD_CLIENT_SECRET` if compromised
- `DISCORD_BOT_TOKEN` has full bot permissions - protect it carefully

---

## API Routes

### GET `/api/discord/login`

Initiates Discord OAuth2 flow.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `returnTo` | string | No | Path to redirect after OAuth (default: `/`) |
| `guildId` | string | No | Pre-select a guild for bot installation |

**Response:** 302 Redirect to Discord authorization URL

**Example:**
```
GET /api/discord/login?returnTo=/settings/integrations
```

---

### GET `/api/discord/callback`

Handles OAuth2 callback from Discord.

**Query Parameters (from Discord):**
| Parameter | Type | Description |
|-----------|------|-------------|
| `code` | string | Authorization code to exchange |
| `state` | string | CSRF state value |
| `guild_id` | string | Guild where bot was added (if bot scope) |
| `permissions` | string | Permissions granted to bot |
| `error` | string | Error code if authorization failed |
| `error_description` | string | Error description |

**Response:** 302 Redirect to `returnTo` path with status params

**Success Redirect:**
```
/settings?discord=connected&discord_user=username&discord_guild=123456789
```

**Error Redirect:**
```
/settings?discord=error&discord_error=access_denied&discord_error_message=The+user+denied+access
```

---

### POST `/api/discord/notify`

Sends a message to a Discord channel using the bot token.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <your_api_key>  # Your app's auth, not Discord
```

**Request Body:**
```json
{
  "guildId": "123456789012345678",
  "channelId": "987654321098765432",
  "message": "Hello from the feedback widget!",
  "embed": {
    "title": "New Feedback Received",
    "description": "A user submitted feedback",
    "color": 5814783,
    "fields": [
      { "name": "Category", "value": "Bug Report", "inline": true },
      { "name": "Priority", "value": "High", "inline": true }
    ],
    "footer": { "text": "Feedback Widget" },
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "messageId": "1234567890123456789"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Bot lacks permission to send messages in this channel.",
  "errorCode": "missing_permissions"
}
```

**Error Codes:**
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `validation_error` | 400 | Invalid request body |
| `empty_message` | 400 | No content or embed provided |
| `rate_limited` | 429 | Too many requests |
| `unauthorized` | 401 | Invalid authentication |
| `missing_permissions` | 403 | Bot cannot send to channel |
| `unknown_channel` | 404 | Channel not found |
| `discord_api_error` | 500 | Discord API error |

---

### GET `/api/discord/guilds`

Returns guilds the user can configure.

**Response:**
```json
{
  "guilds": [
    {
      "id": "123456789012345678",
      "name": "My Server",
      "icon": "abc123def456",
      "iconUrl": "https://cdn.discordapp.com/icons/123/abc.png",
      "owner": true,
      "canManage": true,
      "hasBot": true,
      "channels": [
        {
          "id": "987654321098765432",
          "name": "general",
          "type": 0,
          "position": 0,
          "parentId": null
        }
      ]
    }
  ]
}
```

### POST `/api/discord/guilds`

Save guild/channel selection.

**Request Body:**
```json
{
  "guildId": "123456789012345678",
  "channelId": "987654321098765432"
}
```

**Response:**
```json
{
  "success": true,
  "channel": {
    "id": "987654321098765432",
    "name": "feedback"
  }
}
```

---

## Discord Developer Portal Setup

### Step 1: Create Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"**
3. Enter a name (e.g., "Feedback Widget")
4. Click **"Create"**

### Step 2: Get Client Credentials

In **General Information**:

1. Copy **Application ID** → `DISCORD_CLIENT_ID`
2. Copy **Client Secret** (click "Reset Secret" if needed) → `DISCORD_CLIENT_SECRET`

### Step 3: Configure OAuth2

In **OAuth2 → General**:

1. Click **"Add Redirect"**
2. Enter your callback URL: `https://your-domain.com/api/discord/callback`
3. Click **"Save Changes"**

> **Important**: The redirect URI must match `DISCORD_REDIRECT_URI` exactly, including protocol and trailing slashes.

### Step 4: Test OAuth2 URL

In **OAuth2 → URL Generator**:

1. Select scopes:
   - ✅ `identify` - Access user info
   - ✅ `guilds` - List user's servers
   - ✅ `bot` - Add bot to server

2. Select bot permissions:
   - ✅ Send Messages
   - ✅ Embed Links
   - ✅ View Channel (Read Messages)

3. Copy the generated URL - it should look like:
   ```
   https://discord.com/oauth2/authorize?client_id=YOUR_ID&permissions=18432&redirect_uri=https%3A%2F%2Fyour-domain.com%2Fapi%2Fdiscord%2Fcallback&response_type=code&scope=identify+guilds+bot
   ```

This URL structure should match what `/api/discord/login` generates (except for the dynamic `state` parameter).

### Step 5: Create Bot

In **Bot**:

1. Click **"Add Bot"** (if not already added)
2. Click **"Reset Token"** to get a new token
3. Copy the token → `DISCORD_BOT_TOKEN`
4. Under **Privileged Gateway Intents**:
   - ✅ Enable **MESSAGE CONTENT INTENT** (if you need to read message content)
   - For just sending messages, this is optional

### Step 6: Bot Permissions Summary

The bot needs these permissions in the target channel:
- **View Channel** (1024)
- **Send Messages** (2048)
- **Embed Links** (16384)

Combined permissions integer: `18432`

---

## Database Schema

### Prisma Schema Example

```prisma
model DiscordConnection {
  id                  String   @id @default(cuid())
  userId              String   @unique  // Your app's user ID

  // Discord User Info
  discordUserId       String   @unique
  discordUsername     String
  discordDiscriminator String
  discordAvatar       String?

  // OAuth2 Tokens
  accessToken         String   // Encrypt in production!
  refreshToken        String   // Encrypt in production!
  expiresAt           DateTime
  scopes              String   // Space-separated scopes

  // Notification Configuration
  guildId             String?
  channelId           String?

  // Metadata
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  // Relations
  user                User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([discordUserId])
  @@index([guildId, channelId])
}
```

### Token Encryption

In production, encrypt sensitive tokens before storage:

```typescript
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.TOKEN_ENCRYPTION_KEY!; // 32 bytes

export function encryptToken(token: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  const encrypted = Buffer.concat([cipher.update(token, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString('base64');
}

export function decryptToken(encryptedToken: string): string {
  const data = Buffer.from(encryptedToken, 'base64');
  const iv = data.subarray(0, 12);
  const authTag = data.subarray(12, 28);
  const encrypted = data.subarray(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}
```

---

## Frontend Integration

### Connect Discord Button

```tsx
// components/ConnectDiscordButton.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ConnectDiscordButton() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const discordStatus = searchParams.get('discord');
    if (discordStatus === 'connected') {
      setStatus('success');
      setMessage(`Connected as ${searchParams.get('discord_user')}`);
    } else if (discordStatus === 'error') {
      setStatus('error');
      setMessage(searchParams.get('discord_error_message') || 'Connection failed');
    }
  }, [searchParams]);

  const handleConnect = () => {
    // Redirect to login route
    window.location.href = '/api/discord/login?returnTo=' + encodeURIComponent(window.location.pathname);
  };

  return (
    <div>
      <button
        onClick={handleConnect}
        className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Connect Discord
      </button>

      {status === 'success' && (
        <p className="mt-2 text-green-600">{message}</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-red-600">{message}</p>
      )}
    </div>
  );
}
```

### Guild/Channel Selector

```tsx
// components/DiscordChannelSelector.tsx
'use client';

import { useState, useEffect } from 'react';

interface Guild {
  id: string;
  name: string;
  iconUrl: string | null;
  hasBot: boolean;
  channels?: { id: string; name: string }[];
}

export function DiscordChannelSelector() {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [selectedGuild, setSelectedGuild] = useState<string>('');
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/discord/guilds')
      .then(res => res.json())
      .then(data => {
        if (data.guilds) {
          setGuilds(data.guilds);
        }
        setLoading(false);
      });
  }, []);

  const selectedGuildData = guilds.find(g => g.id === selectedGuild);

  const handleSave = async () => {
    if (!selectedGuild || !selectedChannel) return;

    setSaving(true);
    const res = await fetch('/api/discord/guilds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guildId: selectedGuild, channelId: selectedChannel }),
    });

    if (res.ok) {
      alert('Channel saved successfully!');
    }
    setSaving(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Server</label>
        <select
          value={selectedGuild}
          onChange={(e) => {
            setSelectedGuild(e.target.value);
            setSelectedChannel('');
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a server...</option>
          {guilds.map(guild => (
            <option key={guild.id} value={guild.id} disabled={!guild.hasBot}>
              {guild.name} {!guild.hasBot && '(Bot not installed)'}
            </option>
          ))}
        </select>
      </div>

      {selectedGuildData?.hasBot && (
        <div>
          <label className="block text-sm font-medium mb-1">Channel</label>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a channel...</option>
            {selectedGuildData.channels?.map(channel => (
              <option key={channel.id} value={channel.id}>
                #{channel.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedGuild && !selectedGuildData?.hasBot && (
        <a
          href={`/api/discord/login?guildId=${selectedGuild}`}
          className="inline-block px-4 py-2 bg-[#5865F2] text-white rounded"
        >
          Add Bot to Server
        </a>
      )}

      {selectedChannel && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      )}
    </div>
  );
}
```

---

## Security Considerations

### CSRF Protection

- State values are 32 bytes of cryptographic randomness
- States are encrypted with AES-256-GCM before cookie storage
- States expire after 10 minutes
- State validation uses timing-safe comparison

### Token Security

- Access/refresh tokens should be encrypted at rest in the database
- Never log tokens in production
- Use HttpOnly cookies for state storage
- Tokens are only used server-side, never exposed to client

### Bot Token Protection

- `DISCORD_BOT_TOKEN` grants full bot permissions
- Store only in environment variables, never in code
- Consider using secrets management (AWS Secrets Manager, HashiCorp Vault)
- Rotate if compromised

### Rate Limiting

- `/api/discord/notify` implements per-channel rate limiting
- 30 requests per minute per channel (configurable)
- Use Redis for distributed rate limiting in production

### Input Validation

- Guild/Channel IDs are validated as Discord snowflakes (17-20 digits)
- Message content is limited to 2000 characters
- URLs in embeds are validated for http/https protocol
- Embed fields are truncated to Discord limits

---

## Error Handling

### Common Discord API Errors

| Code | Meaning | Resolution |
|------|---------|------------|
| 10003 | Unknown channel | Channel was deleted or bot removed |
| 10004 | Unknown guild | Bot was removed from server |
| 50001 | Missing access | Bot cannot see the channel |
| 50013 | Missing permissions | Bot lacks Send Messages permission |
| 50035 | Invalid form body | Malformed message content |
| 40001 | Unauthorized | Invalid or expired token |

### Token Refresh

```typescript
// Refresh tokens before they expire
async function ensureValidToken(connection: DiscordConnection): Promise<string> {
  const expiresAt = new Date(connection.expiresAt);
  const buffer = 5 * 60 * 1000; // 5 minute buffer

  if (expiresAt.getTime() - buffer > Date.now()) {
    return connection.accessToken;
  }

  const result = await refreshAccessToken(connection.refreshToken);
  if (!result.success) {
    throw new Error('Token refresh failed');
  }

  // Update in database
  await updateConnectionTokens(connection.id, result.data);

  return result.data.access_token;
}
```

---

## Example Payloads

### Send Simple Message

```bash
curl -X POST https://your-domain.com/api/discord/notify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "guildId": "123456789012345678",
    "channelId": "987654321098765432",
    "message": "Hello from the API!"
  }'
```

### Send Rich Embed

```bash
curl -X POST https://your-domain.com/api/discord/notify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "guildId": "123456789012345678",
    "channelId": "987654321098765432",
    "embed": {
      "title": "New Feedback Received",
      "description": "A user submitted new feedback through the widget.",
      "color": 5814783,
      "fields": [
        { "name": "Category", "value": "Bug Report", "inline": true },
        { "name": "Priority", "value": "High", "inline": true },
        { "name": "Message", "value": "The login button is not working on mobile devices." }
      ],
      "author": {
        "name": "john@example.com",
        "icon_url": "https://ui-avatars.com/api/?name=John"
      },
      "footer": {
        "text": "Feedback Widget v1.0"
      },
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  }'
```

### Response Examples

**Success:**
```json
{
  "success": true,
  "messageId": "1234567890123456789"
}
```

**Rate Limited:**
```json
{
  "success": false,
  "error": "Rate limited. Try again in 45 seconds.",
  "errorCode": "rate_limited"
}
```

**Permission Error:**
```json
{
  "success": false,
  "error": "Bot lacks permission to send messages in this channel.",
  "errorCode": "missing_permissions"
}
```

---

## URL Mapping Reference

| Purpose | URL |
|---------|-----|
| Frontend Connect Button | → `/api/discord/login` |
| Discord Portal Redirect URI | → `https://your-domain.com/api/discord/callback` |
| Send Notifications | → `POST /api/discord/notify` |
| List Guilds | → `GET /api/discord/guilds` |
| Save Channel Config | → `POST /api/discord/guilds` |

---

## Files Created

```
src/discord/
├── types.ts        # TypeScript types and constants
├── client.ts       # Discord API client functions
├── security.ts     # CSRF state encryption/validation
└── index.ts        # Module exports

app/api/discord/
├── login/route.ts      # OAuth2 initiation
├── callback/route.ts   # OAuth2 callback handler
├── notify/route.ts     # Bot message sending
└── guilds/route.ts     # Guild listing and selection
```

---

## Troubleshooting

### "Invalid OAuth2 redirect_uri"

- Ensure `DISCORD_REDIRECT_URI` exactly matches what's in Discord Developer Portal
- Check for trailing slashes, protocol (http vs https), and port numbers

### "Missing Access" when sending messages

- Verify the bot has been added to the server
- Check the bot has "View Channel" and "Send Messages" permissions
- Ensure the bot can see the specific channel (check channel permission overwrites)

### State validation fails

- Clear browser cookies and try again
- Check server time is synchronized (affects state expiration)
- Ensure `DISCORD_CLIENT_SECRET` hasn't changed

### Token refresh fails

- User may have revoked access - prompt to reconnect
- Refresh token may have expired (Discord refresh tokens last ~30 days of inactivity)
