/**
 * Slack Web API Client
 *
 * A typed client for making authenticated requests to Slack's Web API.
 * Handles token management, rate limiting, retries, and error handling.
 *
 * Documentation:
 * - Web API: https://api.slack.com/web
 * - Rate Limits: https://api.slack.com/docs/rate-limits
 * - chat.postMessage: https://api.slack.com/methods/chat.postMessage
 * - views.open: https://api.slack.com/methods/views.open
 */

import {
  ModalView,
  ViewsOpenResponse,
  ChatPostMessageResponse,
  ChatUpdateResponse,
  SlackAPIResponse,
  Block,
  PlainTextElement,
  MrkdwnElement,
} from "./types";

/** Slack Web API base URL */
const SLACK_API_BASE = "https://slack.com/api";

/** Default timeout for API requests (10 seconds) */
const DEFAULT_TIMEOUT_MS = 10000;

/** Maximum retry attempts for rate-limited requests */
const MAX_RETRIES = 3;

/** Base delay for exponential backoff (milliseconds) */
const BASE_RETRY_DELAY_MS = 1000;

export interface SlackClientConfig {
  /** Bot token (xoxb-...) for this workspace */
  botToken: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Whether to enable retry on rate limits */
  enableRetry?: boolean;
}

export interface PostMessageOptions {
  /** Channel ID to post to */
  channel: string;
  /** Message text (used for notifications/fallback) */
  text?: string;
  /** Block Kit blocks for rich formatting */
  blocks?: Block[];
  /** Thread timestamp to reply in a thread */
  thread_ts?: string;
  /** Also post to channel when replying in thread */
  reply_broadcast?: boolean;
  /** Custom bot username override */
  username?: string;
  /** Custom bot icon emoji */
  icon_emoji?: string;
  /** Custom bot icon URL */
  icon_url?: string;
  /** Enable/disable link unfurling */
  unfurl_links?: boolean;
  /** Enable/disable media unfurling */
  unfurl_media?: boolean;
  /** Parse mode for message text */
  mrkdwn?: boolean;
  /** Post as user (requires chat:write:user scope) */
  as_user?: boolean;
  /** Metadata to attach to the message */
  metadata?: {
    event_type: string;
    event_payload: Record<string, unknown>;
  };
}

export interface UpdateMessageOptions {
  /** Channel containing the message */
  channel: string;
  /** Timestamp of the message to update */
  ts: string;
  /** New message text */
  text?: string;
  /** New Block Kit blocks */
  blocks?: Block[];
  /** Enable/disable link unfurling */
  unfurl_links?: boolean;
  /** Enable/disable media unfurling */
  unfurl_media?: boolean;
  /** Parse mode for message text */
  mrkdwn?: boolean;
}

export interface OpenModalOptions {
  /** Trigger ID from slash command or interaction (valid for 3 seconds) */
  trigger_id: string;
  /** The modal view to open */
  view: ModalView;
}

export interface UpdateModalOptions {
  /** View ID to update */
  view_id?: string;
  /** External ID to update (alternative to view_id) */
  external_id?: string;
  /** Hash from the previous view (for race condition prevention) */
  hash?: string;
  /** The updated modal view */
  view: ModalView;
}

export interface PushModalOptions {
  /** Trigger ID from interaction (valid for 3 seconds) */
  trigger_id: string;
  /** The modal view to push onto the stack */
  view: ModalView;
}

/**
 * Slack Web API Client
 *
 * Provides typed methods for common Slack API operations with
 * built-in error handling and retry logic.
 */
export class SlackClient {
  private readonly botToken: string;
  private readonly timeout: number;
  private readonly enableRetry: boolean;

  constructor(config: SlackClientConfig) {
    if (!config.botToken) {
      throw new Error("SlackClient requires a bot token");
    }

    this.botToken = config.botToken;
    this.timeout = config.timeout ?? DEFAULT_TIMEOUT_MS;
    this.enableRetry = config.enableRetry ?? true;
  }

  /**
   * Make an authenticated request to the Slack API
   */
  private async request<T extends SlackAPIResponse>(
    method: string,
    body: Record<string, unknown>,
    retryCount = 0
  ): Promise<T> {
    const url = `${SLACK_API_BASE}/${method}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.botToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle rate limiting with retry
      if (response.status === 429 && this.enableRetry && retryCount < MAX_RETRIES) {
        const retryAfter = parseInt(response.headers.get("Retry-After") || "1", 10);
        const delay = Math.max(retryAfter * 1000, BASE_RETRY_DELAY_MS * Math.pow(2, retryCount));

        console.log(`[SlackClient] Rate limited, retrying in ${delay}ms (attempt ${retryCount + 1}/${MAX_RETRIES})`);

        await this.sleep(delay);
        return this.request<T>(method, body, retryCount + 1);
      }

      const data = await response.json() as T;

      // Log non-ok responses for debugging (without sensitive data)
      if (!data.ok) {
        console.error(`[SlackClient] API error on ${method}:`, data.error);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Slack API request to ${method} timed out after ${this.timeout}ms`);
      }

      throw error;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ===========================================================================
  // Message Methods
  // ===========================================================================

  /**
   * Post a message to a channel
   *
   * @see https://api.slack.com/methods/chat.postMessage
   *
   * Required scopes: chat:write
   * Additional scopes for features:
   * - chat:write.public - to post in channels the bot isn't a member of
   * - chat:write.customize - to customize username/icon
   */
  async postMessage(options: PostMessageOptions): Promise<ChatPostMessageResponse> {
    const { channel, text, blocks, ...rest } = options;

    // Slack requires text OR blocks (text is used for notifications when blocks are present)
    if (!text && !blocks) {
      throw new Error("postMessage requires either text or blocks");
    }

    return this.request<ChatPostMessageResponse>("chat.postMessage", {
      channel,
      text: text || this.extractTextFromBlocks(blocks || []),
      blocks,
      ...rest,
    });
  }

  /**
   * Post an ephemeral message (only visible to one user)
   *
   * @see https://api.slack.com/methods/chat.postEphemeral
   *
   * Required scopes: chat:write
   */
  async postEphemeral(options: PostMessageOptions & { user: string }): Promise<ChatPostMessageResponse> {
    const { channel, user, text, blocks, ...rest } = options;

    if (!text && !blocks) {
      throw new Error("postEphemeral requires either text or blocks");
    }

    return this.request<ChatPostMessageResponse>("chat.postEphemeral", {
      channel,
      user,
      text: text || this.extractTextFromBlocks(blocks || []),
      blocks,
      ...rest,
    });
  }

  /**
   * Update an existing message
   *
   * @see https://api.slack.com/methods/chat.update
   *
   * Required scopes: chat:write
   */
  async updateMessage(options: UpdateMessageOptions): Promise<ChatUpdateResponse> {
    const { channel, ts, text, blocks, ...rest } = options;

    if (!text && !blocks) {
      throw new Error("updateMessage requires either text or blocks");
    }

    return this.request<ChatUpdateResponse>("chat.update", {
      channel,
      ts,
      text: text || this.extractTextFromBlocks(blocks || []),
      blocks,
      ...rest,
    });
  }

  /**
   * Delete a message
   *
   * @see https://api.slack.com/methods/chat.delete
   *
   * Required scopes: chat:write
   */
  async deleteMessage(channel: string, ts: string): Promise<SlackAPIResponse> {
    return this.request<SlackAPIResponse>("chat.delete", { channel, ts });
  }

  // ===========================================================================
  // Modal Methods
  // ===========================================================================

  /**
   * Open a modal view
   *
   * @see https://api.slack.com/methods/views.open
   *
   * Required scopes: (none - uses trigger_id from slash command/interaction)
   *
   * Note: trigger_id is only valid for 3 seconds after receiving it!
   */
  async openModal(options: OpenModalOptions): Promise<ViewsOpenResponse> {
    const { trigger_id, view } = options;

    return this.request<ViewsOpenResponse>("views.open", {
      trigger_id,
      view,
    });
  }

  /**
   * Update an existing modal view
   *
   * @see https://api.slack.com/methods/views.update
   *
   * Required scopes: (none - operates on existing view)
   */
  async updateModal(options: UpdateModalOptions): Promise<ViewsOpenResponse> {
    const { view_id, external_id, hash, view } = options;

    if (!view_id && !external_id) {
      throw new Error("updateModal requires either view_id or external_id");
    }

    return this.request<ViewsOpenResponse>("views.update", {
      view_id,
      external_id,
      hash,
      view,
    });
  }

  /**
   * Push a new view onto the modal stack
   *
   * @see https://api.slack.com/methods/views.push
   *
   * Note: Modal stack can hold up to 3 views
   */
  async pushModal(options: PushModalOptions): Promise<ViewsOpenResponse> {
    const { trigger_id, view } = options;

    return this.request<ViewsOpenResponse>("views.push", {
      trigger_id,
      view,
    });
  }

  /**
   * Publish a view to App Home
   *
   * @see https://api.slack.com/methods/views.publish
   *
   * Required scopes: (none - uses user_id)
   */
  async publishHome(userId: string, view: ModalView): Promise<ViewsOpenResponse> {
    // App Home views use type "home" instead of "modal"
    const homeView = { ...view, type: "home" };

    return this.request<ViewsOpenResponse>("views.publish", {
      user_id: userId,
      view: homeView,
    });
  }

  // ===========================================================================
  // User Info Methods
  // ===========================================================================

  /**
   * Get information about a user
   *
   * @see https://api.slack.com/methods/users.info
   *
   * Required scopes: users:read
   */
  async getUserInfo(userId: string): Promise<SlackAPIResponse & { user?: Record<string, unknown> }> {
    return this.request<SlackAPIResponse & { user?: Record<string, unknown> }>("users.info", {
      user: userId,
    });
  }

  // ===========================================================================
  // Utility Methods
  // ===========================================================================

  /**
   * Extract plain text from Block Kit blocks for notification fallback
   *
   * When using blocks, Slack requires a text fallback for notifications
   * and accessibility (screen readers).
   */
  private extractTextFromBlocks(blocks: Block[]): string {
    const texts: string[] = [];

    for (const block of blocks) {
      if (block.type === "section" && block.text) {
        texts.push(this.extractTextFromElement(block.text));
      } else if (block.type === "header" && block.text) {
        texts.push(this.extractTextFromElement(block.text));
      } else if (block.type === "context" && block.elements) {
        for (const element of block.elements) {
          if (element.type === "plain_text" || element.type === "mrkdwn") {
            texts.push(this.extractTextFromElement(element));
          }
        }
      }
    }

    return texts.join(" ") || "New message";
  }

  private extractTextFromElement(element: PlainTextElement | MrkdwnElement): string {
    return element.text;
  }
}

// =============================================================================
// Factory Functions
// =============================================================================

/**
 * Create a Slack client for a specific workspace
 *
 * In a multi-tenant setup, you would look up the bot token
 * from your database based on the team_id.
 *
 * @param teamId - The workspace ID to create a client for
 * @returns SlackClient configured for that workspace
 */
export async function createSlackClientForTeam(teamId: string): Promise<SlackClient> {
  // TODO: In production, look up the bot token from your database
  // const workspace = await db.getWorkspace(teamId);
  // if (!workspace) throw new Error(`Unknown workspace: ${teamId}`);
  // return new SlackClient({ botToken: workspace.botToken });

  // For now, use the environment variable (single-tenant)
  const botToken = process.env.SLACK_BOT_TOKEN;

  if (!botToken) {
    throw new Error("SLACK_BOT_TOKEN environment variable is not set");
  }

  return new SlackClient({ botToken });
}

/**
 * Create a Slack client using the default bot token
 *
 * Use this for single-tenant setups or when the team_id is unknown.
 */
export function createSlackClient(): SlackClient {
  const botToken = process.env.SLACK_BOT_TOKEN;

  if (!botToken) {
    throw new Error("SLACK_BOT_TOKEN environment variable is not set");
  }

  return new SlackClient({ botToken });
}

// =============================================================================
// Response URL Helpers
// =============================================================================

/**
 * Send a response to a Slack response_url
 *
 * Response URLs are provided in slash command payloads and can be used
 * to send delayed responses or updates to messages.
 *
 * @see https://api.slack.com/interactivity/handling#message_responses
 */
export async function sendResponseUrl(
  responseUrl: string,
  message: {
    text?: string;
    blocks?: Block[];
    response_type?: "in_channel" | "ephemeral";
    replace_original?: boolean;
    delete_original?: boolean;
  }
): Promise<void> {
  const response = await fetch(responseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...message,
      // If no text and we have blocks, generate fallback text
      text: message.text || (message.blocks ? "Message updated" : undefined),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send response_url: ${response.status} ${errorText}`);
  }
}
