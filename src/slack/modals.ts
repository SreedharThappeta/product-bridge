/**
 * Slack Modal Builders for Feedback Widget
 *
 * Creates Block Kit modal views for the feedback workflow.
 * Uses the builder pattern for clean, readable modal construction.
 *
 * Documentation:
 * - Block Kit Builder: https://app.slack.com/block-kit-builder
 * - Modal Reference: https://api.slack.com/surfaces/modals
 * - Input Blocks: https://api.slack.com/reference/block-kit/blocks#input
 */

import type {
  ModalView,
  Block,
  InputBlock,
  SectionBlock,
  DividerBlock,
  ContextBlock,
  PlainTextElement,
  OptionObject,
} from "./types";

// =============================================================================
// Block IDs and Action IDs
// Using consistent IDs makes it easy to extract values from view_submission
// =============================================================================

export const FEEDBACK_MODAL = {
  CALLBACK_ID: "feedback_modal_submit",
  BLOCKS: {
    CATEGORY: "feedback_category_block",
    MESSAGE: "feedback_message_block",
    EMAIL: "feedback_email_block",
    ANONYMOUS: "feedback_anonymous_block",
  },
  ACTIONS: {
    CATEGORY: "feedback_category_select",
    MESSAGE: "feedback_message_input",
    EMAIL: "feedback_email_input",
    ANONYMOUS: "feedback_anonymous_checkbox",
  },
} as const;

export const CONFIRMATION_MODAL = {
  CALLBACK_ID: "feedback_confirmation",
} as const;

// =============================================================================
// Feedback Categories
// =============================================================================

export type FeedbackCategory = "bug" | "suggestion" | "question" | "other";

export const FEEDBACK_CATEGORIES: Record<FeedbackCategory, { label: string; emoji: string }> = {
  bug: { label: "Bug Report", emoji: ":bug:" },
  suggestion: { label: "Suggestion", emoji: ":bulb:" },
  question: { label: "Question", emoji: ":question:" },
  other: { label: "Other", emoji: ":speech_balloon:" },
};

// =============================================================================
// Modal Builders
// =============================================================================

/**
 * Private metadata stored in the modal
 * This gets passed through to the view_submission payload
 */
export interface FeedbackModalMetadata {
  /** Channel where the slash command was triggered */
  channelId: string;
  /** User who triggered the command */
  userId: string;
  /** Workspace ID */
  teamId: string;
  /** Original command text (if any) */
  commandText?: string;
}

/**
 * Build the main feedback form modal
 *
 * @param metadata - Context data to pass through to submission
 * @param initialCategory - Pre-selected category (optional)
 * @returns ModalView ready for views.open
 */
export function buildFeedbackModal(
  metadata: FeedbackModalMetadata,
  initialCategory?: FeedbackCategory
): ModalView {
  const categoryOptions: OptionObject[] = Object.entries(FEEDBACK_CATEGORIES).map(
    ([value, { label, emoji }]) => ({
      text: plainText(`${emoji} ${label}`),
      value,
    })
  );

  const initialOption = initialCategory
    ? {
        text: plainText(
          `${FEEDBACK_CATEGORIES[initialCategory].emoji} ${FEEDBACK_CATEGORIES[initialCategory].label}`
        ),
        value: initialCategory,
      }
    : undefined;

  const blocks: Block[] = [
    // Intro section
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Share your feedback with us!*\nWe value your input and use it to improve our product.",
      },
    } as SectionBlock,

    { type: "divider" } as DividerBlock,

    // Category selection
    {
      type: "input",
      block_id: FEEDBACK_MODAL.BLOCKS.CATEGORY,
      label: plainText("Feedback Type"),
      element: {
        type: "static_select",
        action_id: FEEDBACK_MODAL.ACTIONS.CATEGORY,
        placeholder: plainText("Select a category"),
        options: categoryOptions,
        initial_option: initialOption,
      },
      hint: plainText("Choose the type that best describes your feedback"),
    } as InputBlock,

    // Message input
    {
      type: "input",
      block_id: FEEDBACK_MODAL.BLOCKS.MESSAGE,
      label: plainText("Your Feedback"),
      element: {
        type: "plain_text_input",
        action_id: FEEDBACK_MODAL.ACTIONS.MESSAGE,
        placeholder: plainText("Describe your feedback in detail..."),
        multiline: true,
        min_length: 10,
        max_length: 3000,
      },
      hint: plainText("Be as specific as possible to help us understand"),
    } as InputBlock,

    // Email input (optional)
    {
      type: "input",
      block_id: FEEDBACK_MODAL.BLOCKS.EMAIL,
      label: plainText("Email (Optional)"),
      element: {
        type: "plain_text_input",
        action_id: FEEDBACK_MODAL.ACTIONS.EMAIL,
        placeholder: plainText("your.email@example.com"),
      },
      optional: true,
      hint: plainText("Provide your email if you'd like us to follow up"),
    } as InputBlock,

    // Anonymous checkbox
    {
      type: "input",
      block_id: FEEDBACK_MODAL.BLOCKS.ANONYMOUS,
      label: plainText("Privacy"),
      element: {
        type: "checkboxes",
        action_id: FEEDBACK_MODAL.ACTIONS.ANONYMOUS,
        options: [
          {
            text: plainText("Submit anonymously"),
            value: "anonymous",
            description: plainText("Your name won't be visible to admins"),
          },
        ],
      },
      optional: true,
    } as InputBlock,

    // Footer context
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: ":lock: Your feedback is stored securely and used only to improve our product.",
        },
      ],
    } as ContextBlock,
  ];

  return {
    type: "modal",
    callback_id: FEEDBACK_MODAL.CALLBACK_ID,
    private_metadata: JSON.stringify(metadata),
    title: plainText("Submit Feedback"),
    submit: plainText("Submit"),
    close: plainText("Cancel"),
    blocks,
    notify_on_close: false,
  };
}

/**
 * Build a confirmation modal shown after successful submission
 *
 * @param category - The category of feedback submitted
 * @param isAnonymous - Whether the feedback was anonymous
 * @returns ModalView for views.update response
 */
export function buildConfirmationModal(
  category: FeedbackCategory,
  isAnonymous: boolean
): ModalView {
  const categoryInfo = FEEDBACK_CATEGORIES[category];

  const blocks: Block[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:white_check_mark: *Thank you for your feedback!*`,
      },
    } as SectionBlock,

    { type: "divider" } as DividerBlock,

    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Type:*\n${categoryInfo.emoji} ${categoryInfo.label}`,
        },
        {
          type: "mrkdwn",
          text: `*Submitted:*\n${isAnonymous ? ":ninja: Anonymously" : ":bust_in_silhouette: With your name"}`,
        },
      ],
    } as SectionBlock,

    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "We review all feedback and may reach out if we need more details.",
        },
      ],
    } as ContextBlock,
  ];

  return {
    type: "modal",
    callback_id: CONFIRMATION_MODAL.CALLBACK_ID,
    title: plainText("Feedback Received"),
    close: plainText("Done"),
    blocks,
  };
}

/**
 * Build an error modal for displaying submission errors
 *
 * @param errorMessage - The error message to display
 * @returns ModalView for views.update response
 */
export function buildErrorModal(errorMessage: string): ModalView {
  const blocks: Block[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:x: *Oops! Something went wrong*`,
      },
    } as SectionBlock,

    { type: "divider" } as DividerBlock,

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `We couldn't submit your feedback:\n\n> ${errorMessage}`,
      },
    } as SectionBlock,

    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "Please try again or contact support if the issue persists.",
        },
      ],
    } as ContextBlock,
  ];

  return {
    type: "modal",
    callback_id: "feedback_error",
    title: plainText("Submission Failed"),
    close: plainText("Close"),
    blocks,
  };
}

// =============================================================================
// Message Builders (for channel notifications)
// =============================================================================

/**
 * Build blocks for a new feedback notification message
 *
 * @param feedback - The submitted feedback details
 * @returns Array of blocks for chat.postMessage
 */
export function buildFeedbackNotificationBlocks(feedback: {
  category: FeedbackCategory;
  message: string;
  userName?: string;
  isAnonymous: boolean;
  submittedAt: string;
}): Block[] {
  const categoryInfo = FEEDBACK_CATEGORIES[feedback.category];
  const submitter = feedback.isAnonymous
    ? "Anonymous"
    : feedback.userName || "Unknown User";

  return [
    {
      type: "header",
      text: plainText(`${categoryInfo.emoji} New ${categoryInfo.label}`),
    },

    { type: "divider" },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: feedback.message,
      },
    } as SectionBlock,

    { type: "divider" },

    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Submitted by *${submitter}* | ${formatTimestamp(feedback.submittedAt)}`,
        },
      ],
    } as ContextBlock,
  ];
}

/**
 * Build blocks for a feedback summary/stats message
 *
 * @param stats - Feedback statistics
 * @returns Array of blocks for chat.postMessage
 */
export function buildFeedbackSummaryBlocks(stats: {
  total: number;
  byCategory: Record<FeedbackCategory, number>;
  period: string;
}): Block[] {
  const categoryStats = Object.entries(stats.byCategory)
    .map(([category, count]) => {
      const info = FEEDBACK_CATEGORIES[category as FeedbackCategory];
      return `${info.emoji} ${info.label}: *${count}*`;
    })
    .join("\n");

  return [
    {
      type: "header",
      text: plainText(":bar_chart: Feedback Summary"),
    },

    { type: "divider" },

    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Total Feedback:*\n${stats.total}`,
        },
        {
          type: "mrkdwn",
          text: `*Period:*\n${stats.period}`,
        },
      ],
    } as SectionBlock,

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*By Category:*\n${categoryStats}`,
      },
    } as SectionBlock,
  ];
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Create a plain_text element
 */
function plainText(text: string, emoji = true): PlainTextElement {
  return { type: "plain_text", text, emoji };
}

/**
 * Format an ISO timestamp for display
 */
function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// =============================================================================
// Validation Helpers
// =============================================================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize user input to prevent injection
 */
export function sanitizeInput(input: string): string {
  // Remove any control characters
  return input
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim();
}
