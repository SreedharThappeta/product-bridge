/**
 * Slack Request Signature Verification
 *
 * Implements Slack's request signing protocol to verify that requests
 * are authentic and haven't been tampered with.
 *
 * Documentation: https://api.slack.com/authentication/verifying-requests-from-slack
 *
 * Security best practices:
 * - Always verify the signature before processing any request
 * - Check timestamp to prevent replay attacks (max 5 minutes drift)
 * - Use timing-safe comparison to prevent timing attacks
 * - Use the raw request body (not parsed JSON) for signature verification
 */

import crypto from "crypto";

/** Maximum allowed time drift in seconds (5 minutes) */
const MAX_TIMESTAMP_DRIFT_SECONDS = 60 * 5;

/** Slack signature version */
const SIGNATURE_VERSION = "v0";

export interface VerificationResult {
  valid: boolean;
  error?: string;
}

/**
 * Verifies that a request is authentically from Slack
 *
 * @param signingSecret - Your app's signing secret from Slack
 * @param signature - The X-Slack-Signature header value
 * @param timestamp - The X-Slack-Request-Timestamp header value
 * @param rawBody - The raw request body as a string (NOT parsed JSON)
 * @returns VerificationResult indicating if the request is valid
 *
 * @example
 * ```typescript
 * const result = verifySlackRequest(
 *   process.env.SLACK_SIGNING_SECRET,
 *   request.headers.get("X-Slack-Signature"),
 *   request.headers.get("X-Slack-Request-Timestamp"),
 *   await request.text()
 * );
 *
 * if (!result.valid) {
 *   return new Response("Unauthorized", { status: 401 });
 * }
 * ```
 */
export function verifySlackRequest(
  signingSecret: string | undefined,
  signature: string | null,
  timestamp: string | null,
  rawBody: string
): VerificationResult {
  // Validate inputs
  if (!signingSecret) {
    return { valid: false, error: "Missing signing secret configuration" };
  }

  if (!signature) {
    return { valid: false, error: "Missing X-Slack-Signature header" };
  }

  if (!timestamp) {
    return { valid: false, error: "Missing X-Slack-Request-Timestamp header" };
  }

  // Step 1: Check timestamp to prevent replay attacks
  const timestampSeconds = parseInt(timestamp, 10);
  if (isNaN(timestampSeconds)) {
    return { valid: false, error: "Invalid timestamp format" };
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timeDrift = Math.abs(currentTimestamp - timestampSeconds);

  if (timeDrift > MAX_TIMESTAMP_DRIFT_SECONDS) {
    return {
      valid: false,
      error: `Timestamp too old or too far in the future (drift: ${timeDrift}s)`,
    };
  }

  // Step 2: Create the basestring for HMAC
  // Format: v0:timestamp:body
  const basestring = `${SIGNATURE_VERSION}:${timestamp}:${rawBody}`;

  // Step 3: Compute HMAC-SHA256 signature
  const computedSignature = `${SIGNATURE_VERSION}=` +
    crypto
      .createHmac("sha256", signingSecret)
      .update(basestring, "utf8")
      .digest("hex");

  // Step 4: Compare signatures using timing-safe comparison
  // This prevents timing attacks where an attacker could measure
  // how long comparison takes to guess the signature
  const isValid = timingSafeEqual(computedSignature, signature);

  if (!isValid) {
    return { valid: false, error: "Invalid signature" };
  }

  return { valid: true };
}

/**
 * Timing-safe string comparison to prevent timing attacks
 *
 * Standard string comparison (===) can leak information about
 * how many characters match, allowing attackers to guess the
 * correct signature character by character.
 *
 * This function takes constant time regardless of where the
 * strings differ.
 */
function timingSafeEqual(a: string, b: string): boolean {
  // If lengths differ, pad the shorter one
  // (we still need to do the comparison to prevent timing leaks)
  const maxLength = Math.max(a.length, b.length);
  const aPadded = a.padEnd(maxLength, "\0");
  const bPadded = b.padEnd(maxLength, "\0");

  const bufferA = Buffer.from(aPadded, "utf8");
  const bufferB = Buffer.from(bPadded, "utf8");

  // Use Node's crypto.timingSafeEqual for the comparison
  try {
    return crypto.timingSafeEqual(bufferA, bufferB) && a.length === b.length;
  } catch {
    // If buffers have different lengths (shouldn't happen with padding), return false
    return false;
  }
}

/**
 * Middleware helper for Next.js API routes
 *
 * Reads the raw body from a Request and verifies the Slack signature.
 * Returns the parsed body if valid, or null if invalid.
 *
 * @param request - The incoming Next.js Request
 * @returns Object with verification result and parsed body (if valid)
 *
 * @example
 * ```typescript
 * export async function POST(request: NextRequest) {
 *   const { valid, error, body } = await verifySlackRequestMiddleware(request);
 *
 *   if (!valid) {
 *     console.error("[Slack] Request verification failed:", error);
 *     return new Response(error, { status: 401 });
 *   }
 *
 *   // Process the verified request
 *   const payload = parseSlashCommand(body);
 * }
 * ```
 */
export async function verifySlackRequestMiddleware(
  request: Request
): Promise<{
  valid: boolean;
  error?: string;
  rawBody?: string;
}> {
  const signature = request.headers.get("X-Slack-Signature");
  const timestamp = request.headers.get("X-Slack-Request-Timestamp");

  // Read the raw body - important to preserve exact bytes for signature verification
  const rawBody = await request.text();

  const result = verifySlackRequest(
    process.env.SLACK_SIGNING_SECRET,
    signature,
    timestamp,
    rawBody
  );

  if (!result.valid) {
    return { valid: false, error: result.error };
  }

  return { valid: true, rawBody };
}

/**
 * Parse URL-encoded form data (application/x-www-form-urlencoded)
 *
 * Slash commands and some interaction payloads are sent as URL-encoded form data.
 *
 * @param rawBody - The raw request body string
 * @returns Parsed key-value pairs
 */
export function parseUrlEncodedBody(rawBody: string): Record<string, string> {
  const params = new URLSearchParams(rawBody);
  const result: Record<string, string> = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
}

/**
 * Extract and parse the interaction payload from a form-encoded body
 *
 * Interaction payloads (view_submission, block_actions, etc.) are sent as
 * a URL-encoded form with a "payload" parameter containing JSON.
 *
 * @param rawBody - The raw request body string
 * @returns Parsed interaction payload or null if parsing fails
 */
export function parseInteractionPayload<T>(rawBody: string): T | null {
  try {
    const formData = parseUrlEncodedBody(rawBody);
    const payloadString = formData.payload;

    if (!payloadString) {
      return null;
    }

    return JSON.parse(payloadString) as T;
  } catch (error) {
    console.error("[Slack Security] Failed to parse interaction payload:", error);
    return null;
  }
}

/**
 * Log security-relevant events without exposing sensitive data
 *
 * @param event - The type of security event
 * @param details - Non-sensitive details about the event
 */
export function logSecurityEvent(
  event: "verification_failed" | "verification_success" | "token_used" | "rate_limited",
  details: {
    teamId?: string;
    userId?: string;
    endpoint?: string;
    error?: string;
    requestId?: string;
  }
): void {
  const timestamp = new Date().toISOString();
  const safeDetails = {
    ...details,
    // Mask sensitive IDs to first 4 chars
    teamId: details.teamId ? `${details.teamId.slice(0, 4)}****` : undefined,
    userId: details.userId ? `${details.userId.slice(0, 4)}****` : undefined,
  };

  console.log(
    `[Slack Security] ${timestamp} | ${event} |`,
    JSON.stringify(safeDetails)
  );
}
