/**
 * Slack Interactions Endpoint
 *
 * Handles all interactive component payloads from Slack:
 * - view_submission: When a user submits a modal
 * - block_actions: When a user interacts with buttons/selects
 * - view_closed: When a user closes a modal (if notify_on_close is true)
 *
 * Request Flow (for modal submission):
 * 1. User fills out and submits the feedback modal
 * 2. Slack sends view_submission POST to this endpoint
 * 3. We verify the request signature
 * 4. We extract the form values from view.state.values
 * 5. We store/send the feedback to our backend
 * 6. We return a response_action to update/close the modal
 *
 * Documentation:
 * - Handling Interactions: https://api.slack.com/interactivity/handling
 * - View Payloads: https://api.slack.com/reference/interaction-payloads/views
 * - Response Actions: https://api.slack.com/surfaces/modals#response_actions
 */

import { NextResponse } from "next/server";
import {
  verifySlackRequestMiddleware,
  parseInteractionPayload,
  logSecurityEvent,
} from "@/src/slack/security";
import { createSlackClient, sendResponseUrl } from "@/src/slack/client";
import {
  FEEDBACK_MODAL,
  buildConfirmationModal,
  buildFeedbackNotificationBlocks,
  isValidEmail,
  sanitizeInput,
} from "@/src/slack/modals";
import type {
  InteractionPayload,
  ViewSubmissionPayload,
  BlockActionsPayload,
  ViewSubmissionResponse,
  SlackFeedbackSubmission,
  StaticSelectValue,
  PlainTextInputValue,
  CheckboxValue,
} from "@/src/slack/types";
import type { FeedbackCategory } from "@/src/slack/modals";

export const dynamic = "force-dynamic";

// Slack requires response within 3000ms for view submissions
export const maxDuration = 5;

/**
 * POST /api/slack/interactions
 *
 * Receives all interaction payloads from Slack.
 * Content-Type: application/x-www-form-urlencoded
 * Body: payload=<JSON string>
 */
export async function POST(request: Request) {
  const startTime = Date.now();

  try {
    // Step 1: Verify the request is from Slack
    const verification = await verifySlackRequestMiddleware(request);

    if (!verification.valid) {
      logSecurityEvent("verification_failed", {
        endpoint: "/api/slack/interactions",
        error: verification.error,
      });
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Step 2: Parse the interaction payload
    const payload = parseInteractionPayload<InteractionPayload>(verification.rawBody!);

    if (!payload) {
      console.error("[Slack Interactions] Failed to parse payload");
      return new NextResponse("Bad Request", { status: 400 });
    }

    console.log(
      `[Slack Interactions] Received ${payload.type} from user ${payload.user.id.slice(0, 4)}****`
    );

    // Step 3: Route to the appropriate handler
    switch (payload.type) {
      case "view_submission":
        return await handleViewSubmission(payload as ViewSubmissionPayload);

      case "block_actions":
        return await handleBlockActions(payload as BlockActionsPayload);

      case "view_closed":
        // Log but don't do anything for closed views
        console.log("[Slack Interactions] Modal closed by user");
        return new NextResponse(null, { status: 200 });

      default:
        console.warn(`[Slack Interactions] Unknown payload type: ${(payload as InteractionPayload).type}`);
        return new NextResponse(null, { status: 200 });
    }
  } catch (error) {
    console.error("[Slack Interactions] Error processing interaction:", error);

    const duration = Date.now() - startTime;
    console.log(`[Slack Interactions] Request failed after ${duration}ms`);

    // For view submissions, return an error modal update
    // For other interactions, just return 200
    return new NextResponse(null, { status: 200 });
  }
}

/**
 * Handle view_submission payloads (modal form submissions)
 */
async function handleViewSubmission(payload: ViewSubmissionPayload): Promise<NextResponse> {
  const { view, user, team } = payload;
  const callbackId = view.callback_id;

  console.log(`[Slack Interactions] Processing view_submission: ${callbackId}`);

  // Route based on callback_id
  switch (callbackId) {
    case FEEDBACK_MODAL.CALLBACK_ID:
      return await handleFeedbackSubmission(payload);

    default:
      console.warn(`[Slack Interactions] Unknown callback_id: ${callbackId}`);
      return new NextResponse(null, { status: 200 });
  }
}

/**
 * Handle feedback modal submission
 */
async function handleFeedbackSubmission(payload: ViewSubmissionPayload): Promise<NextResponse> {
  const { view, user, team } = payload;
  const values = view.state.values;

  try {
    // Extract form values from the state
    const categoryValue = values[FEEDBACK_MODAL.BLOCKS.CATEGORY]?.[FEEDBACK_MODAL.ACTIONS.CATEGORY] as StaticSelectValue;
    const messageValue = values[FEEDBACK_MODAL.BLOCKS.MESSAGE]?.[FEEDBACK_MODAL.ACTIONS.MESSAGE] as PlainTextInputValue;
    const emailValue = values[FEEDBACK_MODAL.BLOCKS.EMAIL]?.[FEEDBACK_MODAL.ACTIONS.EMAIL] as PlainTextInputValue;
    const anonymousValue = values[FEEDBACK_MODAL.BLOCKS.ANONYMOUS]?.[FEEDBACK_MODAL.ACTIONS.ANONYMOUS] as CheckboxValue;

    // Validate required fields
    const errors: Record<string, string> = {};

    if (!categoryValue?.selected_option) {
      errors[FEEDBACK_MODAL.BLOCKS.CATEGORY] = "Please select a feedback type";
    }

    if (!messageValue?.value || messageValue.value.trim().length < 10) {
      errors[FEEDBACK_MODAL.BLOCKS.MESSAGE] = "Please provide at least 10 characters of feedback";
    }

    // Validate email format if provided
    const email = emailValue?.value?.trim();
    if (email && !isValidEmail(email)) {
      errors[FEEDBACK_MODAL.BLOCKS.EMAIL] = "Please enter a valid email address";
    }

    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      const response: ViewSubmissionResponse = {
        response_action: "errors",
        errors,
      };
      return NextResponse.json(response);
    }

    // Parse metadata from the modal
    let metadata: { channelId?: string; userId?: string; teamId?: string } = {};
    try {
      metadata = JSON.parse(view.private_metadata || "{}");
    } catch {
      console.warn("[Slack Interactions] Failed to parse private_metadata");
    }

    // Prepare the feedback submission
    const category = categoryValue.selected_option!.value as FeedbackCategory;
    const message = sanitizeInput(messageValue.value!);
    const isAnonymous = (anonymousValue?.selected_options?.length || 0) > 0;

    const feedbackSubmission: SlackFeedbackSubmission = {
      teamId: team?.id || metadata.teamId || "unknown",
      userId: user.id,
      userName: isAnonymous ? undefined : user.name,
      channelId: metadata.channelId,
      category,
      message,
      email: email || undefined,
      isAnonymous,
      triggerContext: "modal",
      submittedAt: new Date().toISOString(),
    };

    console.log(
      `[Slack Interactions] Feedback submitted: ${category} | anonymous: ${isAnonymous} | team: ${feedbackSubmission.teamId.slice(0, 4)}****`
    );

    // Store the feedback (async - don't block the response)
    // In production, this would go to your database/feedback system
    storeFeedback(feedbackSubmission).catch((err) => {
      console.error("[Slack Interactions] Failed to store feedback:", err);
    });

    // Post notification to feedback channel (if configured)
    postFeedbackNotification(feedbackSubmission).catch((err) => {
      console.error("[Slack Interactions] Failed to post notification:", err);
    });

    // Return success - update the modal to confirmation screen
    const confirmationModal = buildConfirmationModal(category, isAnonymous);
    const response: ViewSubmissionResponse = {
      response_action: "update",
      view: confirmationModal,
    };

    logSecurityEvent("verification_success", {
      teamId: feedbackSubmission.teamId,
      userId: user.id,
      endpoint: "/api/slack/interactions",
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[Slack Interactions] Error processing feedback submission:", error);

    // Return validation error to show something went wrong
    const response: ViewSubmissionResponse = {
      response_action: "errors",
      errors: {
        [FEEDBACK_MODAL.BLOCKS.MESSAGE]: "An error occurred. Please try again.",
      },
    };
    return NextResponse.json(response);
  }
}

/**
 * Handle block_actions payloads (button clicks, menu selections, etc.)
 */
async function handleBlockActions(payload: BlockActionsPayload): Promise<NextResponse> {
  const { actions, user, trigger_id } = payload;

  // Process each action (usually just one)
  for (const action of actions) {
    console.log(
      `[Slack Interactions] Block action: ${action.action_id} | type: ${action.type}`
    );

    // Add action handlers here as needed
    // For example, handling a "view_details" button or "cancel_feedback" action
  }

  // Acknowledge the action
  return new NextResponse(null, { status: 200 });
}

// =============================================================================
// Business Logic Layer
// =============================================================================

/**
 * Store feedback in the database/backend system
 *
 * This is where you would integrate with your feedback system:
 * - Database write
 * - Third-party service API
 * - Event queue
 */
async function storeFeedback(feedback: SlackFeedbackSubmission): Promise<void> {
  // TODO: Integrate with your actual feedback storage system
  // Examples:
  // - await db.feedback.create({ data: feedback });
  // - await feedbackService.submit(feedback);
  // - await eventQueue.publish("feedback.created", feedback);

  console.log("[Slack Interactions] Storing feedback:", {
    category: feedback.category,
    messagePreview: feedback.message.substring(0, 50) + "...",
    teamId: feedback.teamId.slice(0, 4) + "****",
    isAnonymous: feedback.isAnonymous,
  });

  // Simulate async storage
  await new Promise((resolve) => setTimeout(resolve, 100));
}

/**
 * Post a notification about new feedback to a configured channel
 *
 * This uses the bot to post a message summarizing the feedback.
 */
async function postFeedbackNotification(feedback: SlackFeedbackSubmission): Promise<void> {
  // Check if notifications are enabled
  const feedbackChannelId = process.env.SLACK_FEEDBACK_CHANNEL_ID;

  if (!feedbackChannelId) {
    console.log("[Slack Interactions] No feedback channel configured, skipping notification");
    return;
  }

  try {
    const slack = createSlackClient();

    const blocks = buildFeedbackNotificationBlocks({
      category: feedback.category,
      message: feedback.message,
      userName: feedback.userName,
      isAnonymous: feedback.isAnonymous,
      submittedAt: feedback.submittedAt,
    });

    const result = await slack.postMessage({
      channel: feedbackChannelId,
      text: `New ${feedback.category} feedback received`,
      blocks,
    });

    if (!result.ok) {
      console.error("[Slack Interactions] Failed to post notification:", result.error);
    } else {
      console.log("[Slack Interactions] Notification posted to channel");
    }
  } catch (error) {
    console.error("[Slack Interactions] Error posting notification:", error);
  }
}

/**
 * GET /api/slack/interactions
 *
 * Health check / info endpoint
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/slack/interactions",
    description: "Slack interactions handler",
    supportedTypes: ["view_submission", "block_actions", "view_closed"],
    status: "ready",
  });
}
