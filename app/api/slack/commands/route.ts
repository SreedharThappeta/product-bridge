/**
 * Slack Slash Commands Endpoint
 *
 * Handles incoming slash command requests from Slack.
 * Currently supports:
 * - /feedback - Opens the feedback submission modal
 *
 * Request Flow:
 * 1. User types /feedback in Slack
 * 2. Slack sends POST to this endpoint
 * 3. We verify the request signature
 * 4. We call views.open to show the feedback modal
 * 5. Return 200 OK within 3 seconds
 *
 * Documentation:
 * - Slash Commands: https://api.slack.com/interactivity/slash-commands
 * - Request Verification: https://api.slack.com/authentication/verifying-requests-from-slack
 */

import { NextResponse } from "next/server";
import {
  verifySlackRequestMiddleware,
  parseUrlEncodedBody,
  logSecurityEvent,
} from "@/src/slack/security";
import { createSlackClient } from "@/src/slack/client";
import { buildFeedbackModal, FeedbackCategory } from "@/src/slack/modals";
import type { SlashCommandPayload } from "@/src/slack/types";

export const dynamic = "force-dynamic";

// Slack requires response within 3000ms
export const maxDuration = 5;

/**
 * POST /api/slack/commands
 *
 * Receives slash command payloads from Slack.
 * Content-Type: application/x-www-form-urlencoded
 */
export async function POST(request: Request) {
  const startTime = Date.now();

  try {
    // Step 1: Verify the request is from Slack
    const verification = await verifySlackRequestMiddleware(request);

    if (!verification.valid) {
      logSecurityEvent("verification_failed", {
        endpoint: "/api/slack/commands",
        error: verification.error,
      });

      // Return 401 for security failures
      // Don't reveal details about why verification failed
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Step 2: Parse the slash command payload
    const formData = parseUrlEncodedBody(verification.rawBody!);
    const payload = formData as unknown as SlashCommandPayload;

    // Validate required fields
    if (!payload.command || !payload.trigger_id || !payload.team_id || !payload.user_id) {
      console.error("[Slack Commands] Missing required fields in payload");
      return new NextResponse("Bad Request", { status: 400 });
    }

    console.log(
      `[Slack Commands] Received ${payload.command} from user ${payload.user_id.slice(0, 4)}**** in team ${payload.team_id.slice(0, 4)}****`
    );

    // Step 3: Route to the appropriate command handler
    const commandName = payload.command.toLowerCase();

    switch (commandName) {
      case "/feedback":
      case "/feedbacktaker":
        return await handleFeedbackCommand(payload);

      default:
        console.warn(`[Slack Commands] Unknown command: ${commandName}`);
        return new NextResponse(
          JSON.stringify({
            response_type: "ephemeral",
            text: `Unknown command: ${commandName}`,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
    }
  } catch (error) {
    console.error("[Slack Commands] Error processing command:", error);

    // Log processing time even on error
    const duration = Date.now() - startTime;
    console.log(`[Slack Commands] Request failed after ${duration}ms`);

    // Return a user-friendly error message
    return new NextResponse(
      JSON.stringify({
        response_type: "ephemeral",
        text: ":x: Sorry, something went wrong processing your command. Please try again.",
      }),
      {
        status: 200, // Slack expects 200 even for errors
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

/**
 * Handle the /feedback slash command
 *
 * Opens a modal for the user to submit feedback.
 */
async function handleFeedbackCommand(payload: SlashCommandPayload): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    // Parse command text for category shortcut
    // e.g., "/feedback bug" or "/feedback suggestion"
    const commandText = payload.text?.trim().toLowerCase();
    let initialCategory: FeedbackCategory | undefined;

    if (commandText) {
      const validCategories: FeedbackCategory[] = ["bug", "suggestion", "question", "other"];
      if (validCategories.includes(commandText as FeedbackCategory)) {
        initialCategory = commandText as FeedbackCategory;
      }
    }

    // Build the modal with context metadata
    const modal = buildFeedbackModal(
      {
        channelId: payload.channel_id,
        userId: payload.user_id,
        teamId: payload.team_id,
        commandText: payload.text,
      },
      initialCategory
    );

    // Create Slack client for this workspace
    const slack = createSlackClient();

    // Open the modal - must happen within 3 seconds of receiving trigger_id
    const result = await slack.openModal({
      trigger_id: payload.trigger_id,
      view: modal,
    });

    const duration = Date.now() - startTime;

    if (!result.ok) {
      console.error(`[Slack Commands] Failed to open modal: ${result.error} (${duration}ms)`);

      // Check for common errors
      if (result.error === "expired_trigger_id") {
        return new NextResponse(
          JSON.stringify({
            response_type: "ephemeral",
            text: ":warning: Request expired. Please try the command again.",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return new NextResponse(
        JSON.stringify({
          response_type: "ephemeral",
          text: ":x: Couldn't open the feedback form. Please try again.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log(`[Slack Commands] Modal opened successfully (${duration}ms)`);

    logSecurityEvent("verification_success", {
      teamId: payload.team_id,
      userId: payload.user_id,
      endpoint: "/api/slack/commands",
    });

    // Return empty 200 to acknowledge the command
    // The modal is the response, not a message
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[Slack Commands] Error in handleFeedbackCommand (${duration}ms):`, error);

    // Return error message to user
    return new NextResponse(
      JSON.stringify({
        response_type: "ephemeral",
        text: ":x: Failed to open feedback form. Please try again later.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

/**
 * GET /api/slack/commands
 *
 * Health check / info endpoint
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/slack/commands",
    description: "Slack slash commands handler",
    supportedCommands: ["/feedback", "/feedbacktaker"],
    status: "ready",
  });
}
