# Slack Integration Guide

This document explains how to set up and configure the Slack integration for the Feedback Widget. The integration enables users to submit feedback directly from Slack using slash commands and modals.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Setting Up the Slack App](#setting-up-the-slack-app)
4. [Environment Configuration](#environment-configuration)
5. [API Endpoints](#api-endpoints)
6. [Request Lifecycle](#request-lifecycle)
7. [Security](#security)
8. [Multi-Tenant Support](#multi-tenant-support)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The Slack integration provides:

- **Slash Command (`/feedback`)**: Opens a modal form for users to submit feedback
- **Feedback Modal**: A Block Kit form with category selection, message input, and privacy options
- **Bot Notifications**: Automatically posts new feedback to a configured channel
- **Multi-tenant Support**: Designed to work with multiple Slack workspaces

### Features

| Feature | Description |
|---------|-------------|
| Slash Command | `/feedback` or `/feedbacktaker` opens the feedback form |
| Category Selection | Bug, Suggestion, Question, or Other |
| Rich Text Input | Multiline feedback with 10-3000 character limit |
| Optional Email | For follow-up communication |
| Anonymous Option | Submit without revealing identity |
| Channel Notifications | Bot posts new feedback to a team channel |

---

## Architecture

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Slack     │      │   Your Server    │      │  Feedback       │
│   Workspace │      │   (Next.js)      │      │  System         │
└─────────────┘      └──────────────────┘      └─────────────────┘
       │                     │                        │
       │  1. /feedback       │                        │
       │ ─────────────────>  │                        │
       │                     │                        │
       │  2. views.open      │                        │
       │ <─────────────────  │                        │
       │                     │                        │
       │  3. User fills      │                        │
       │     modal           │                        │
       │                     │                        │
       │  4. Submit          │                        │
       │ ─────────────────>  │                        │
       │                     │  5. Store feedback     │
       │                     │ ─────────────────────> │
       │                     │                        │
       │  6. Confirmation    │                        │
       │ <─────────────────  │                        │
       │                     │                        │
       │  7. chat.postMessage│                        │
       │ <─────────────────  │                        │
       │  (notification)     │                        │
```

### File Structure

```
src/slack/
├── types.ts       # TypeScript types for Slack API
├── security.ts    # Request signature verification
├── client.ts      # Slack Web API client
├── modals.ts      # Block Kit modal builders
├── bot.ts         # Bot message posting service
└── index.ts       # Module exports

app/api/slack/
├── commands/route.ts      # POST /api/slack/commands
└── interactions/route.ts  # POST /api/slack/interactions
```

---

## Setting Up the Slack App

### Step 1: Create a Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Choose **"From scratch"**
4. Enter an app name (e.g., "Feedback Widget")
5. Select your development workspace
6. Click **"Create App"**

### Step 2: Configure Bot User

1. Go to **"OAuth & Permissions"** in the sidebar
2. Scroll to **"Scopes"** → **"Bot Token Scopes"**
3. Add the following scopes:

| Scope | Purpose |
|-------|---------|
| `commands` | Required for slash commands |
| `chat:write` | Post messages to channels |
| `chat:write.public` | Post to channels the bot isn't in |
| `users:read` | Get user information (optional) |

### Step 3: Install to Workspace

1. Go to **"OAuth & Permissions"**
2. Click **"Install to Workspace"**
3. Review and authorize the permissions
4. Copy the **"Bot User OAuth Token"** (starts with `xoxb-`)

### Step 4: Configure Slash Command

1. Go to **"Slash Commands"** in the sidebar
2. Click **"Create New Command"**
3. Configure:

| Setting | Value |
|---------|-------|
| Command | `/feedback` |
| Request URL | `https://your-domain.com/api/slack/commands` |
| Short Description | Submit feedback about our product |
| Usage Hint | `[bug\|suggestion\|question]` |
| Escape channels | Leave unchecked |

4. Click **"Save"**

### Step 5: Configure Interactivity

1. Go to **"Interactivity & Shortcuts"** in the sidebar
2. Toggle **"Interactivity"** to **On**
3. Set **Request URL**: `https://your-domain.com/api/slack/interactions`
4. Click **"Save Changes"**

### Step 6: Get Signing Secret

1. Go to **"Basic Information"** in the sidebar
2. Scroll to **"App Credentials"**
3. Copy the **"Signing Secret"**

---

## Environment Configuration

Add these variables to your `.env` file:

```bash
# Slack Integration
SLACK_SIGNING_SECRET=your_signing_secret_here
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_FEEDBACK_CHANNEL_ID=C0123456789  # Optional
```

### Finding the Channel ID

1. Right-click on the channel in Slack
2. Select **"View channel details"**
3. Scroll to the bottom and copy the **Channel ID**

---

## API Endpoints

### POST `/api/slack/commands`

Handles slash command payloads from Slack.

**Request Format**: `application/x-www-form-urlencoded`

**Headers Required**:
- `X-Slack-Signature`: HMAC signature for verification
- `X-Slack-Request-Timestamp`: Unix timestamp

**Payload Fields**:
```
token=xxx
team_id=T0123456
team_domain=myworkspace
channel_id=C0123456
channel_name=general
user_id=U0123456
user_name=john.doe
command=/feedback
text=bug
trigger_id=123.456.789
response_url=https://hooks.slack.com/commands/...
api_app_id=A0123456
```

**Response**: Empty 200 OK (modal is opened via `views.open`)

---

### POST `/api/slack/interactions`

Handles interactive component payloads (modal submissions, button clicks).

**Request Format**: `application/x-www-form-urlencoded` with `payload` parameter containing JSON

**Payload Types**:

#### view_submission
```json
{
  "type": "view_submission",
  "user": { "id": "U0123456", "name": "john.doe" },
  "team": { "id": "T0123456", "domain": "myworkspace" },
  "view": {
    "callback_id": "feedback_modal_submit",
    "state": {
      "values": {
        "feedback_category_block": {
          "feedback_category_select": {
            "type": "static_select",
            "selected_option": { "value": "bug" }
          }
        }
      }
    }
  }
}
```

**Response Options**:

1. **Close modal** (empty response):
   ```json
   {}
   ```

2. **Update modal**:
   ```json
   {
     "response_action": "update",
     "view": { /* new modal view */ }
   }
   ```

3. **Show errors**:
   ```json
   {
     "response_action": "errors",
     "errors": {
       "feedback_message_block": "Please provide more detail"
     }
   }
   ```

---

## Request Lifecycle

### 1. Slash Command → Modal

```
User: /feedback bug

┌─────────┐    POST /api/slack/commands    ┌─────────┐
│  Slack  │ ─────────────────────────────> │ Server  │
└─────────┘                                └─────────┘
                                                │
                                                ▼
                                          Verify signature
                                          Parse payload
                                          Build modal view
                                                │
                                                ▼
              POST views.open              ┌─────────┐
┌─────────┐ <───────────────────────────── │  Slack  │
│  Slack  │                                │   API   │
└─────────┘                                └─────────┘
     │
     ▼
 Modal opens
```

### 2. Modal Submission → Feedback Storage

```
User submits modal

┌─────────┐   POST /api/slack/interactions  ┌─────────┐
│  Slack  │ ──────────────────────────────> │ Server  │
└─────────┘                                 └─────────┘
                                                 │
                                                 ▼
                                           Verify signature
                                           Parse view_submission
                                           Validate inputs
                                           Store feedback (async)
                                                 │
                                                 ▼
           { response_action: "update" }   ┌─────────┐
┌─────────┐ <───────────────────────────── │ Server  │
│  Slack  │                                └─────────┘
└─────────┘
     │
     ▼
 Confirmation
 modal shown
                                                 │
                                                 ▼
                                        POST chat.postMessage
                                        (notification to channel)
```

---

## Security

### Request Verification

All requests from Slack are verified using HMAC-SHA256 signatures:

1. Extract `X-Slack-Signature` and `X-Slack-Request-Timestamp` headers
2. Check timestamp is within 5 minutes of current time
3. Create basestring: `v0:{timestamp}:{raw_body}`
4. Compute HMAC-SHA256 with signing secret
5. Compare signatures using timing-safe comparison

### Token Security Best Practices

- **Never log tokens**: The bot token is treated as a secret
- **Use environment variables**: Never hardcode tokens
- **Least privilege**: Request only necessary scopes
- **Multi-tenant isolation**: Store tokens per workspace in production

### Security Headers

The Slack endpoints accept these headers:
- `X-Slack-Signature`
- `X-Slack-Request-Timestamp`
- `Content-Type`

### Rate Limiting

The Slack client includes built-in retry logic:
- Detects `429 Too Many Requests` responses
- Respects `Retry-After` header
- Exponential backoff with max 3 retries

---

## Multi-Tenant Support

The integration is designed for multi-workspace installations:

### Data Isolation

- Each workspace has a unique `team_id`
- Feedback is tagged with workspace ID
- Bot tokens are stored per workspace

### Production Setup

For multi-tenant production deployments:

1. **Store workspace data in database**:
   ```typescript
   interface SlackWorkspace {
     teamId: string;
     teamDomain: string;
     botToken: string;  // Encrypted
     feedbackChannelId?: string;
     installedAt: Date;
   }
   ```

2. **Modify `createSlackClientForTeam`** in `src/slack/client.ts`:
   ```typescript
   export async function createSlackClientForTeam(teamId: string) {
     const workspace = await db.slackWorkspaces.findUnique({
       where: { teamId }
     });

     if (!workspace) {
       throw new Error(`Unknown workspace: ${teamId}`);
     }

     return new SlackClient({
       botToken: decrypt(workspace.botToken)
     });
   }
   ```

3. **Implement OAuth flow** for workspace installation (not included in this basic setup)

---

## Troubleshooting

### Common Issues

#### "dispatch_failed" Error

**Cause**: Slack couldn't reach your server

**Solutions**:
- Ensure your server is publicly accessible
- Check the Request URL in Slack app settings
- Verify no firewall is blocking Slack's IPs

#### "expired_trigger_id" Error

**Cause**: Modal wasn't opened within 3 seconds

**Solutions**:
- Optimize your command handler performance
- Check for slow database queries
- Ensure network latency is low

#### "invalid_auth" Error

**Cause**: Bot token is invalid or missing scopes

**Solutions**:
- Verify `SLACK_BOT_TOKEN` in environment
- Re-install the app to workspace
- Check required scopes are added

#### Signature Verification Fails

**Cause**: Request body was modified before verification

**Solutions**:
- Use `request.text()` before any parsing
- Don't use body-parser middleware before verification
- Check `SLACK_SIGNING_SECRET` is correct

### Debug Mode

Enable detailed logging by setting:

```bash
DEBUG=slack:*
```

### Testing Locally

Use [ngrok](https://ngrok.com/) to expose your local server:

```bash
ngrok http 3000
```

Then update your Slack app's Request URLs to use the ngrok URL.

---

## Related Documentation

- [Slack API: Slash Commands](https://api.slack.com/interactivity/slash-commands)
- [Slack API: Modals](https://api.slack.com/surfaces/modals)
- [Slack API: Block Kit](https://api.slack.com/block-kit)
- [Slack API: Verifying Requests](https://api.slack.com/authentication/verifying-requests-from-slack)
- [Slack API: chat.postMessage](https://api.slack.com/methods/chat.postMessage)
- [Slack API: views.open](https://api.slack.com/methods/views.open)
