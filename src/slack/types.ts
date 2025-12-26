/**
 * Slack API Types and Interfaces
 *
 * These types are based on official Slack API documentation:
 * - Slash Commands: https://api.slack.com/interactivity/slash-commands
 * - Modals: https://api.slack.com/surfaces/modals/using
 * - Interaction Payloads: https://api.slack.com/reference/interaction-payloads
 * - Block Kit: https://api.slack.com/block-kit
 */

// =============================================================================
// Slack Slash Command Payload
// Received when a user triggers a slash command
// =============================================================================

export interface SlashCommandPayload {
  /** Deprecated verification token (use signing secret instead) */
  token: string;
  /** Workspace ID where the command was triggered */
  team_id: string;
  /** Workspace domain name */
  team_domain: string;
  /** Enterprise Grid ID (if applicable) */
  enterprise_id?: string;
  /** Enterprise Grid name (if applicable) */
  enterprise_name?: string;
  /** Channel ID where the command was triggered */
  channel_id: string;
  /** Channel name (without #) */
  channel_name: string;
  /** User ID who triggered the command */
  user_id: string;
  /** Username who triggered the command */
  user_name: string;
  /** The slash command that was typed (e.g., /feedback) */
  command: string;
  /** Text typed after the command */
  text: string;
  /** API app ID */
  api_app_id: string;
  /** Whether this is an Enterprise install */
  is_enterprise_install: string;
  /** URL to send delayed responses (valid for 30 minutes) */
  response_url: string;
  /** Trigger ID for opening modals (valid for 3 seconds) */
  trigger_id: string;
}

// =============================================================================
// Modal View Types
// Used for views.open, views.update, views.push
// =============================================================================

export interface ModalView {
  type: "modal";
  /** Title displayed at the top of the modal (max 24 chars) */
  title: PlainTextElement;
  /** Submit button label (max 24 chars) */
  submit?: PlainTextElement;
  /** Close button label (max 24 chars) */
  close?: PlainTextElement;
  /** Array of Block Kit blocks (max 100 blocks) */
  blocks: Block[];
  /** Unique identifier for view callbacks */
  callback_id?: string;
  /** Private metadata passed through submissions (max 3000 chars) */
  private_metadata?: string;
  /** Clear all existing views when pushing (default: false) */
  clear_on_close?: boolean;
  /** Send view_closed event when dismissed (default: false) */
  notify_on_close?: boolean;
  /** App-defined unique ID for this view (max 255 chars) */
  external_id?: string;
  /** Whether to submit when Enter is pressed (default: false) */
  submit_disabled?: boolean;
}

export interface PlainTextElement {
  type: "plain_text";
  text: string;
  emoji?: boolean;
}

export interface MrkdwnElement {
  type: "mrkdwn";
  text: string;
  verbatim?: boolean;
}

// =============================================================================
// Block Kit Types
// =============================================================================

export type Block =
  | SectionBlock
  | DividerBlock
  | InputBlock
  | ActionsBlock
  | ContextBlock
  | HeaderBlock;

export interface SectionBlock {
  type: "section";
  block_id?: string;
  text?: PlainTextElement | MrkdwnElement;
  fields?: (PlainTextElement | MrkdwnElement)[];
  accessory?: BlockElement;
}

export interface DividerBlock {
  type: "divider";
  block_id?: string;
}

export interface InputBlock {
  type: "input";
  block_id: string;
  label: PlainTextElement;
  element: InputElement;
  hint?: PlainTextElement;
  optional?: boolean;
  dispatch_action?: boolean;
}

export interface ActionsBlock {
  type: "actions";
  block_id?: string;
  elements: BlockElement[];
}

export interface ContextBlock {
  type: "context";
  block_id?: string;
  elements: (PlainTextElement | MrkdwnElement | ImageElement)[];
}

export interface HeaderBlock {
  type: "header";
  block_id?: string;
  text: PlainTextElement;
}

// =============================================================================
// Block Element Types (Interactive Components)
// =============================================================================

export type BlockElement =
  | ButtonElement
  | StaticSelectElement
  | CheckboxElement
  | OverflowElement
  | DatePickerElement;

export type InputElement =
  | PlainTextInputElement
  | StaticSelectElement
  | MultiStaticSelectElement
  | CheckboxElement
  | RadioButtonsElement
  | DatePickerElement;

export interface ButtonElement {
  type: "button";
  action_id: string;
  text: PlainTextElement;
  value?: string;
  url?: string;
  style?: "primary" | "danger";
  confirm?: ConfirmDialogObject;
}

export interface PlainTextInputElement {
  type: "plain_text_input";
  action_id: string;
  placeholder?: PlainTextElement;
  initial_value?: string;
  multiline?: boolean;
  min_length?: number;
  max_length?: number;
  dispatch_action_config?: DispatchActionConfig;
  focus_on_load?: boolean;
}

export interface StaticSelectElement {
  type: "static_select";
  action_id: string;
  placeholder?: PlainTextElement;
  options: OptionObject[];
  initial_option?: OptionObject;
  confirm?: ConfirmDialogObject;
  focus_on_load?: boolean;
}

export interface MultiStaticSelectElement {
  type: "multi_static_select";
  action_id: string;
  placeholder?: PlainTextElement;
  options: OptionObject[];
  initial_options?: OptionObject[];
  max_selected_items?: number;
  confirm?: ConfirmDialogObject;
  focus_on_load?: boolean;
}

export interface CheckboxElement {
  type: "checkboxes";
  action_id: string;
  options: OptionObject[];
  initial_options?: OptionObject[];
  confirm?: ConfirmDialogObject;
  focus_on_load?: boolean;
}

export interface RadioButtonsElement {
  type: "radio_buttons";
  action_id: string;
  options: OptionObject[];
  initial_option?: OptionObject;
  confirm?: ConfirmDialogObject;
  focus_on_load?: boolean;
}

export interface DatePickerElement {
  type: "datepicker";
  action_id: string;
  placeholder?: PlainTextElement;
  initial_date?: string; // Format: YYYY-MM-DD
  confirm?: ConfirmDialogObject;
  focus_on_load?: boolean;
}

export interface OverflowElement {
  type: "overflow";
  action_id: string;
  options: OptionObject[];
  confirm?: ConfirmDialogObject;
}

export interface ImageElement {
  type: "image";
  image_url: string;
  alt_text: string;
}

// =============================================================================
// Composition Objects
// =============================================================================

export interface OptionObject {
  text: PlainTextElement | MrkdwnElement;
  value: string;
  description?: PlainTextElement;
  url?: string;
}

export interface ConfirmDialogObject {
  title: PlainTextElement;
  text: PlainTextElement | MrkdwnElement;
  confirm: PlainTextElement;
  deny: PlainTextElement;
  style?: "primary" | "danger";
}

export interface DispatchActionConfig {
  trigger_actions_on?: ("on_enter_pressed" | "on_character_entered")[];
}

// =============================================================================
// Interaction Payloads
// =============================================================================

export interface BaseInteractionPayload {
  type: string;
  /** User who triggered the interaction */
  user: SlackUser;
  /** API app ID */
  api_app_id: string;
  /** Deprecated verification token */
  token: string;
  /** Workspace information */
  team: SlackTeam | null;
  /** Enterprise information (if applicable) */
  enterprise: SlackEnterprise | null;
  /** Whether this is an Enterprise install */
  is_enterprise_install: boolean;
}

export interface ViewSubmissionPayload extends BaseInteractionPayload {
  type: "view_submission";
  /** Trigger ID for opening new modals */
  trigger_id: string;
  /** The submitted view */
  view: SubmittedView;
  /** URL for delayed responses */
  response_urls: ResponseUrl[];
}

export interface BlockActionsPayload extends BaseInteractionPayload {
  type: "block_actions";
  /** Trigger ID for opening modals */
  trigger_id: string;
  /** Container information (message or view) */
  container: ActionContainer;
  /** Channel where the action occurred (if in a message) */
  channel?: SlackChannel;
  /** Message containing the action (if applicable) */
  message?: SlackMessage;
  /** View containing the action (if in a modal/home) */
  view?: SubmittedView;
  /** Array of actions taken */
  actions: BlockAction[];
  /** Response URL for updating the original message */
  response_url?: string;
}

export interface ViewClosedPayload extends BaseInteractionPayload {
  type: "view_closed";
  /** The closed view */
  view: SubmittedView;
  /** Whether the view was cleared */
  is_cleared: boolean;
}

export type InteractionPayload =
  | ViewSubmissionPayload
  | BlockActionsPayload
  | ViewClosedPayload;

// =============================================================================
// Interaction Payload Sub-Types
// =============================================================================

export interface SlackUser {
  id: string;
  username?: string;
  name?: string;
  team_id?: string;
}

export interface SlackTeam {
  id: string;
  domain: string;
  enterprise_id?: string;
  enterprise_name?: string;
}

export interface SlackEnterprise {
  id: string;
  name: string;
}

export interface SlackChannel {
  id: string;
  name: string;
}

export interface SlackMessage {
  type: "message";
  ts: string;
  text: string;
  user?: string;
  bot_id?: string;
  blocks?: Block[];
}

export interface SubmittedView {
  id: string;
  team_id: string;
  type: "modal" | "home";
  callback_id: string;
  private_metadata: string;
  title: PlainTextElement;
  submit?: PlainTextElement;
  close?: PlainTextElement;
  blocks: Block[];
  state: ViewState;
  hash: string;
  clear_on_close: boolean;
  notify_on_close: boolean;
  root_view_id: string;
  app_id: string;
  external_id?: string;
  app_installed_team_id: string;
  bot_id: string;
}

export interface ViewState {
  values: {
    [blockId: string]: {
      [actionId: string]: ViewStateValue;
    };
  };
}

export type ViewStateValue =
  | PlainTextInputValue
  | StaticSelectValue
  | MultiStaticSelectValue
  | CheckboxValue
  | RadioButtonsValue
  | DatePickerValue;

export interface PlainTextInputValue {
  type: "plain_text_input";
  value: string | null;
}

export interface StaticSelectValue {
  type: "static_select";
  selected_option: OptionObject | null;
}

export interface MultiStaticSelectValue {
  type: "multi_static_select";
  selected_options: OptionObject[];
}

export interface CheckboxValue {
  type: "checkboxes";
  selected_options: OptionObject[];
}

export interface RadioButtonsValue {
  type: "radio_buttons";
  selected_option: OptionObject | null;
}

export interface DatePickerValue {
  type: "datepicker";
  selected_date: string | null;
}

export interface ResponseUrl {
  block_id: string;
  action_id: string;
  channel_id: string;
  response_url: string;
}

export interface ActionContainer {
  type: "message" | "view";
  message_ts?: string;
  channel_id?: string;
  is_ephemeral?: boolean;
  view_id?: string;
}

export interface BlockAction {
  type: string;
  action_id: string;
  block_id: string;
  action_ts: string;
  text?: PlainTextElement;
  value?: string;
  selected_option?: OptionObject;
  selected_options?: OptionObject[];
  selected_date?: string;
}

// =============================================================================
// API Response Types
// =============================================================================

export interface SlackAPIResponse {
  ok: boolean;
  error?: string;
  warning?: string;
  response_metadata?: {
    warnings?: string[];
    next_cursor?: string;
    scopes?: string[];
    acceptedScopes?: string[];
  };
}

export interface ViewsOpenResponse extends SlackAPIResponse {
  view?: SubmittedView;
}

export interface ChatPostMessageResponse extends SlackAPIResponse {
  channel?: string;
  ts?: string;
  message?: SlackMessage;
}

export interface ChatUpdateResponse extends SlackAPIResponse {
  channel?: string;
  ts?: string;
  text?: string;
}

// =============================================================================
// View Submission Response Actions
// =============================================================================

export type ViewSubmissionResponse =
  | ViewSubmissionResponseClear
  | ViewSubmissionResponseUpdate
  | ViewSubmissionResponsePush
  | ViewSubmissionResponseErrors;

export interface ViewSubmissionResponseClear {
  response_action: "clear";
}

export interface ViewSubmissionResponseUpdate {
  response_action: "update";
  view: ModalView;
}

export interface ViewSubmissionResponsePush {
  response_action: "push";
  view: ModalView;
}

export interface ViewSubmissionResponseErrors {
  response_action: "errors";
  errors: {
    [blockId: string]: string;
  };
}

// =============================================================================
// Feedback Domain Types (Integration with Widget)
// =============================================================================

export interface SlackFeedbackSubmission {
  /** Workspace ID for multi-tenant isolation */
  teamId: string;
  /** User who submitted the feedback */
  userId: string;
  /** Username for display purposes */
  userName?: string;
  /** Channel where the command was triggered (if applicable) */
  channelId?: string;
  /** Feedback category */
  category: "bug" | "suggestion" | "question" | "other";
  /** Feedback message content */
  message: string;
  /** Optional email for follow-up */
  email?: string;
  /** Whether the feedback is anonymous */
  isAnonymous: boolean;
  /** Original trigger context */
  triggerContext: "slash_command" | "modal" | "message_action";
  /** Timestamp of submission */
  submittedAt: string;
}

export interface SlackWorkspaceConfig {
  /** Workspace ID */
  teamId: string;
  /** Workspace domain */
  teamDomain: string;
  /** Bot token for this workspace */
  botToken: string;
  /** Channel ID to post feedback notifications */
  feedbackChannelId?: string;
  /** Whether to notify on new feedback */
  notifyOnFeedback: boolean;
  /** Installed at timestamp */
  installedAt: string;
}
