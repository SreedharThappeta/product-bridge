/**
 * Slack Integration Module
 *
 * This module provides all the functionality needed for Slack integration:
 * - Types for Slack API payloads and responses
 * - Security utilities for request verification
 * - Client for making Slack Web API calls
 * - Modal builders for Block Kit views
 * - Bot service for posting messages
 *
 * Usage:
 *
 * ```typescript
 * // In an API route handler
 * import {
 *   verifySlackRequestMiddleware,
 *   parseUrlEncodedBody,
 *   createSlackClient,
 *   buildFeedbackModal,
 * } from "@/src/slack";
 *
 * export async function POST(request: Request) {
 *   // Verify request is from Slack
 *   const { valid, error, rawBody } = await verifySlackRequestMiddleware(request);
 *   if (!valid) return new Response("Unauthorized", { status: 401 });
 *
 *   // Parse the slash command
 *   const payload = parseUrlEncodedBody(rawBody!);
 *
 *   // Open a modal
 *   const slack = createSlackClient();
 *   await slack.openModal({
 *     trigger_id: payload.trigger_id,
 *     view: buildFeedbackModal({ ... }),
 *   });
 * }
 * ```
 */

// Types
export * from "./types";

// Security utilities
export {
  verifySlackRequest,
  verifySlackRequestMiddleware,
  parseUrlEncodedBody,
  parseInteractionPayload,
  logSecurityEvent,
  type VerificationResult,
} from "./security";

// Slack Web API client
export {
  SlackClient,
  createSlackClient,
  createSlackClientForTeam,
  sendResponseUrl,
  type SlackClientConfig,
  type PostMessageOptions,
  type UpdateMessageOptions,
  type OpenModalOptions,
  type UpdateModalOptions,
  type PushModalOptions,
} from "./client";

// Modal builders
export {
  FEEDBACK_MODAL,
  CONFIRMATION_MODAL,
  FEEDBACK_CATEGORIES,
  buildFeedbackModal,
  buildConfirmationModal,
  buildErrorModal,
  buildFeedbackNotificationBlocks,
  buildFeedbackSummaryBlocks,
  isValidEmail,
  sanitizeInput,
  type FeedbackCategory,
  type FeedbackModalMetadata,
} from "./modals";

// Bot service
export {
  postFeedbackNotification,
  postFeedbackSummary,
  postAnnouncement,
  replyInThread,
  sendDirectMessage,
  sendEphemeralMessage,
  updateMessage,
  deleteMessage,
  type BotMessageResult,
  type FeedbackNotification,
  type AnnouncementOptions,
  type ThreadReplyOptions,
} from "./bot";
