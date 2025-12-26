/**
 * Slack Bot Message Service
 *
 * Provides high-level functions for the bot to post messages in channels.
 * Handles common messaging patterns like announcements, notifications,
 * and feedback-related messages.
 *
 * Usage:
 * - Call these functions from your API routes or business logic
 * - Messages are posted using the bot token configured in environment
 * - All functions handle errors gracefully and log issues
 *
 * Documentation:
 * - chat.postMessage: https://api.slack.com/methods/chat.postMessage
 * - Message Guidelines: https://api.slack.com/best-practices/message-guidelines
 */

import { createSlackClient, createSlackClientForTeam } from "./client";
import {
  buildFeedbackNotificationBlocks,
  buildFeedbackSummaryBlocks,
  type FeedbackCategory,
} from "./modals";
import type { Block, SectionBlock, ContextBlock, HeaderBlock, DividerBlock } from "./types";

// =============================================================================
// Types
// =============================================================================

export interface BotMessageResult {
  success: boolean;
  messageTs?: string;
  channelId?: string;
  error?: string;
}

export interface FeedbackNotification {
  category: FeedbackCategory;
  message: string;
  userName?: string;
  isAnonymous: boolean;
  submittedAt: string;
}

export interface AnnouncementOptions {
  /** Channel ID to post to */
  channelId: string;
  /** Announcement title */
  title: string;
  /** Main announcement content */
  content: string;
  /** Optional call-to-action button */
  ctaButton?: {
    text: string;
    url: string;
  };
  /** Optional footer text */
  footer?: string;
  /** Workspace ID (for multi-tenant) */
  teamId?: string;
}

export interface ThreadReplyOptions {
  /** Channel ID */
  channelId: string;
  /** Parent message timestamp */
  threadTs: string;
  /** Reply text */
  text: string;
  /** Optional blocks for rich formatting */
  blocks?: Block[];
  /** Also post to channel (not just thread) */
  broadcast?: boolean;
  /** Workspace ID (for multi-tenant) */
  teamId?: string;
}

// =============================================================================
// Bot Service Functions
// =============================================================================

/**
 * Post a feedback notification to a channel
 *
 * Used to notify a team channel when new feedback is received.
 *
 * @param channelId - Channel ID to post to
 * @param feedback - Feedback details
 * @param teamId - Optional workspace ID for multi-tenant setup
 * @returns Result with message timestamp if successful
 */
export async function postFeedbackNotification(
  channelId: string,
  feedback: FeedbackNotification,
  teamId?: string
): Promise<BotMessageResult> {
  try {
    const slack = teamId
      ? await createSlackClientForTeam(teamId)
      : createSlackClient();

    const blocks = buildFeedbackNotificationBlocks(feedback);

    const result = await slack.postMessage({
      channel: channelId,
      text: `New ${feedback.category} feedback received`,
      blocks,
    });

    if (!result.ok) {
      console.error("[Bot Service] Failed to post feedback notification:", result.error);
      return { success: false, error: result.error };
    }

    console.log(`[Bot Service] Posted feedback notification to ${channelId}`);
    return {
      success: true,
      messageTs: result.ts,
      channelId: result.channel,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Bot Service] Error posting feedback notification:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Post a feedback summary to a channel
 *
 * Used for periodic reports or on-demand statistics.
 *
 * @param channelId - Channel ID to post to
 * @param stats - Feedback statistics
 * @param teamId - Optional workspace ID for multi-tenant setup
 * @returns Result with message timestamp if successful
 */
export async function postFeedbackSummary(
  channelId: string,
  stats: {
    total: number;
    byCategory: Record<FeedbackCategory, number>;
    period: string;
  },
  teamId?: string
): Promise<BotMessageResult> {
  try {
    const slack = teamId
      ? await createSlackClientForTeam(teamId)
      : createSlackClient();

    const blocks = buildFeedbackSummaryBlocks(stats);

    const result = await slack.postMessage({
      channel: channelId,
      text: `Feedback Summary: ${stats.total} items (${stats.period})`,
      blocks,
    });

    if (!result.ok) {
      console.error("[Bot Service] Failed to post feedback summary:", result.error);
      return { success: false, error: result.error };
    }

    console.log(`[Bot Service] Posted feedback summary to ${channelId}`);
    return {
      success: true,
      messageTs: result.ts,
      channelId: result.channel,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Bot Service] Error posting feedback summary:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Post an announcement to a channel
 *
 * Used for broadcasting important updates, release notes, etc.
 *
 * @param options - Announcement configuration
 * @returns Result with message timestamp if successful
 */
export async function postAnnouncement(
  options: AnnouncementOptions
): Promise<BotMessageResult> {
  const { channelId, title, content, ctaButton, footer, teamId } = options;

  try {
    const slack = teamId
      ? await createSlackClientForTeam(teamId)
      : createSlackClient();

    const blocks: Block[] = [
      {
        type: "header",
        text: { type: "plain_text", text: `:mega: ${title}`, emoji: true },
      } as HeaderBlock,

      { type: "divider" } as DividerBlock,

      {
        type: "section",
        text: { type: "mrkdwn", text: content },
      } as SectionBlock,
    ];

    // Add CTA button if provided
    if (ctaButton) {
      blocks.push({
        type: "section",
        text: { type: "mrkdwn", text: " " },
        accessory: {
          type: "button",
          text: { type: "plain_text", text: ctaButton.text, emoji: true },
          url: ctaButton.url,
          action_id: "announcement_cta",
        },
      } as SectionBlock);
    }

    // Add footer if provided
    if (footer) {
      blocks.push({
        type: "context",
        elements: [{ type: "mrkdwn", text: footer }],
      } as ContextBlock);
    }

    const result = await slack.postMessage({
      channel: channelId,
      text: `Announcement: ${title}`,
      blocks,
    });

    if (!result.ok) {
      console.error("[Bot Service] Failed to post announcement:", result.error);
      return { success: false, error: result.error };
    }

    console.log(`[Bot Service] Posted announcement to ${channelId}: ${title}`);
    return {
      success: true,
      messageTs: result.ts,
      channelId: result.channel,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Bot Service] Error posting announcement:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Reply in a thread
 *
 * Used for following up on feedback or adding context to messages.
 *
 * @param options - Thread reply configuration
 * @returns Result with message timestamp if successful
 */
export async function replyInThread(
  options: ThreadReplyOptions
): Promise<BotMessageResult> {
  const { channelId, threadTs, text, blocks, broadcast, teamId } = options;

  try {
    const slack = teamId
      ? await createSlackClientForTeam(teamId)
      : createSlackClient();

    const result = await slack.postMessage({
      channel: channelId,
      text,
      blocks,
      thread_ts: threadTs,
      reply_broadcast: broadcast,
    });

    if (!result.ok) {
      console.error("[Bot Service] Failed to reply in thread:", result.error);
      return { success: false, error: result.error };
    }

    console.log(`[Bot Service] Replied in thread ${threadTs}`);
    return {
      success: true,
      messageTs: result.ts,
      channelId: result.channel,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Bot Service] Error replying in thread:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send a direct message to a user
 *
 * Used for sending private notifications or confirmations.
 * Note: The bot must have the users:read scope and the user must
 * have the bot in their DMs (or you use conversations.open first).
 *
 * @param userId - User ID to DM
 * @param text - Message text
 * @param blocks - Optional blocks for rich formatting
 * @param teamId - Optional workspace ID for multi-tenant setup
 * @returns Result with message timestamp if successful
 */
export async function sendDirectMessage(
  userId: string,
  text: string,
  blocks?: Block[],
  teamId?: string
): Promise<BotMessageResult> {
  try {
    const slack = teamId
      ? await createSlackClientForTeam(teamId)
      : createSlackClient();

    // DM the user by using their user ID as the channel
    // Slack will automatically open a DM conversation
    const result = await slack.postMessage({
      channel: userId,
      text,
      blocks,
    });

    if (!result.ok) {
      console.error("[Bot Service] Failed to send DM:", result.error);
      return { success: false, error: result.error };
    }

    console.log(`[Bot Service] Sent DM to user ${userId.slice(0, 4)}****`);
    return {
      success: true,
      messageTs: result.ts,
      channelId: result.channel,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Bot Service] Error sending DM:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send an ephemeral message (only visible to one user)
 *
 * Useful for showing temporary information or confirmations
 * without cluttering the channel for everyone.
 *
 * @param channelId - Channel ID
 * @param userId - User ID who should see the message
 * @param text - Message text
 * @param blocks - Optional blocks for rich formatting
 * @param teamId - Optional workspace ID for multi-tenant setup
 * @returns Result (ephemeral messages don't have a message timestamp)
 */
export async function sendEphemeralMessage(
  channelId: string,
  userId: string,
  text: string,
  blocks?: Block[],
  teamId?: string
): Promise<BotMessageResult> {
  try {
    const slack = teamId
      ? await createSlackClientForTeam(teamId)
      : createSlackClient();

    const result = await slack.postEphemeral({
      channel: channelId,
      user: userId,
      text,
      blocks,
    });

    if (!result.ok) {
      console.error("[Bot Service] Failed to send ephemeral message:", result.error);
      return { success: false, error: result.error };
    }

    console.log(`[Bot Service] Sent ephemeral message in ${channelId} to ${userId.slice(0, 4)}****`);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Bot Service] Error sending ephemeral message:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Update an existing message
 *
 * Used to update feedback notifications, progress indicators, etc.
 *
 * @param channelId - Channel ID
 * @param messageTs - Timestamp of the message to update
 * @param text - New message text
 * @param blocks - New blocks for rich formatting
 * @param teamId - Optional workspace ID for multi-tenant setup
 * @returns Result indicating success or failure
 */
export async function updateMessage(
  channelId: string,
  messageTs: string,
  text: string,
  blocks?: Block[],
  teamId?: string
): Promise<BotMessageResult> {
  try {
    const slack = teamId
      ? await createSlackClientForTeam(teamId)
      : createSlackClient();

    const result = await slack.updateMessage({
      channel: channelId,
      ts: messageTs,
      text,
      blocks,
    });

    if (!result.ok) {
      console.error("[Bot Service] Failed to update message:", result.error);
      return { success: false, error: result.error };
    }

    console.log(`[Bot Service] Updated message ${messageTs} in ${channelId}`);
    return {
      success: true,
      messageTs: result.ts,
      channelId: result.channel,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Bot Service] Error updating message:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Delete a message
 *
 * Use sparingly - generally prefer updating messages instead.
 *
 * @param channelId - Channel ID
 * @param messageTs - Timestamp of the message to delete
 * @param teamId - Optional workspace ID for multi-tenant setup
 * @returns Result indicating success or failure
 */
export async function deleteMessage(
  channelId: string,
  messageTs: string,
  teamId?: string
): Promise<BotMessageResult> {
  try {
    const slack = teamId
      ? await createSlackClientForTeam(teamId)
      : createSlackClient();

    const result = await slack.deleteMessage(channelId, messageTs);

    if (!result.ok) {
      console.error("[Bot Service] Failed to delete message:", result.error);
      return { success: false, error: result.error };
    }

    console.log(`[Bot Service] Deleted message ${messageTs} in ${channelId}`);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Bot Service] Error deleting message:", errorMessage);
    return { success: false, error: errorMessage };
  }
}
