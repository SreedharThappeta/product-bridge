/**
 * Discord OAuth2 Security Utilities
 *
 * Provides CSRF protection for the OAuth2 flow using:
 * - Cryptographically secure random state values
 * - Encrypted cookie storage (or database storage)
 * - Timestamp-based expiration
 *
 * Security considerations:
 * - State values are 32 bytes of cryptographic randomness
 * - States expire after 10 minutes to prevent replay attacks
 * - Cookies are signed/encrypted to prevent tampering
 */

import crypto from "crypto";
import type { DiscordOAuthState } from "./types";

// =============================================================================
// Configuration
// =============================================================================

/** State expiration time in milliseconds (10 minutes) */
const STATE_EXPIRATION_MS = 10 * 60 * 1000;

/** Cookie name for OAuth state */
export const DISCORD_STATE_COOKIE_NAME = "discord_oauth_state";

/** Cookie max age in seconds */
export const DISCORD_STATE_COOKIE_MAX_AGE = 600; // 10 minutes

// =============================================================================
// State Generation
// =============================================================================

/**
 * Generate a cryptographically secure random state value
 *
 * @returns 32-byte hex-encoded random string
 */
export function generateState(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Create a full OAuth state object with metadata
 *
 * @param options - Optional state parameters
 * @returns Complete state object ready for storage
 */
export function createOAuthState(options?: {
  userId?: string;
  returnTo?: string;
  guildId?: string;
}): DiscordOAuthState {
  return {
    state: generateState(),
    userId: options?.userId,
    returnTo: options?.returnTo,
    guildId: options?.guildId,
    createdAt: Date.now(),
  };
}

// =============================================================================
// State Encryption (for cookie storage)
// =============================================================================

/**
 * Get encryption key from environment
 * Falls back to a derived key from DISCORD_CLIENT_SECRET if not set
 */
function getEncryptionKey(): Buffer {
  const key = process.env.DISCORD_STATE_ENCRYPTION_KEY;
  if (key) {
    // Use provided key (should be 32 bytes hex-encoded = 64 chars)
    return Buffer.from(key, "hex");
  }

  // Derive a key from client secret (not ideal but works for simpler setups)
  const secret = process.env.DISCORD_CLIENT_SECRET;
  if (!secret) {
    throw new Error("DISCORD_CLIENT_SECRET is required for state encryption");
  }

  return crypto.createHash("sha256").update(secret).digest();
}

/**
 * Encrypt state object for cookie storage
 *
 * Uses AES-256-GCM for authenticated encryption
 *
 * @param state - State object to encrypt
 * @returns Encrypted string safe for cookie storage
 */
export function encryptState(state: DiscordOAuthState): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // GCM recommended IV size
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const stateJson = JSON.stringify(state);
  const encrypted = Buffer.concat([
    cipher.update(stateJson, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // Combine IV + authTag + encrypted data, encode as base64
  const combined = Buffer.concat([iv, authTag, encrypted]);
  return combined.toString("base64url");
}

/**
 * Decrypt state object from cookie
 *
 * @param encryptedState - Encrypted state string from cookie
 * @returns Decrypted state object or null if invalid/expired
 */
export function decryptState(encryptedState: string): DiscordOAuthState | null {
  try {
    const key = getEncryptionKey();
    const combined = Buffer.from(encryptedState, "base64url");

    // Extract IV (12 bytes), authTag (16 bytes), and encrypted data
    const iv = combined.subarray(0, 12);
    const authTag = combined.subarray(12, 28);
    const encrypted = combined.subarray(28);

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return JSON.parse(decrypted.toString("utf8")) as DiscordOAuthState;
  } catch (error) {
    console.error("[Discord Security] Failed to decrypt state:", error);
    return null;
  }
}

// =============================================================================
// State Validation
// =============================================================================

/**
 * Validate OAuth state from callback
 *
 * Checks:
 * 1. State string matches stored state
 * 2. State has not expired
 *
 * @param storedState - State object from cookie/database
 * @param receivedState - State string from callback URL
 * @returns Validation result with error message if invalid
 */
export function validateState(
  storedState: DiscordOAuthState | null,
  receivedState: string | null
): { valid: true } | { valid: false; error: string } {
  if (!storedState) {
    return { valid: false, error: "No stored state found. Session may have expired." };
  }

  if (!receivedState) {
    return { valid: false, error: "No state received from Discord." };
  }

  // Check state matches
  if (!timingSafeEqual(storedState.state, receivedState)) {
    return { valid: false, error: "State mismatch. Possible CSRF attack." };
  }

  // Check expiration
  const age = Date.now() - storedState.createdAt;
  if (age > STATE_EXPIRATION_MS) {
    return { valid: false, error: "State expired. Please try connecting again." };
  }

  return { valid: true };
}

/**
 * Timing-safe string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  const bufferA = Buffer.from(a, "utf8");
  const bufferB = Buffer.from(b, "utf8");

  return crypto.timingSafeEqual(bufferA, bufferB);
}

// =============================================================================
// Cookie Helpers
// =============================================================================

/**
 * Build Set-Cookie header for state storage
 *
 * @param encryptedState - Encrypted state string
 * @param secure - Whether to set Secure flag (true in production)
 * @returns Cookie header value
 */
export function buildStateCookieHeader(
  encryptedState: string,
  secure: boolean = process.env.NODE_ENV === "production"
): string {
  const parts = [
    `${DISCORD_STATE_COOKIE_NAME}=${encryptedState}`,
    `Max-Age=${DISCORD_STATE_COOKIE_MAX_AGE}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ];

  if (secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

/**
 * Build Set-Cookie header to clear state cookie
 */
export function buildClearStateCookieHeader(): string {
  return `${DISCORD_STATE_COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`;
}

/**
 * Parse state cookie from request headers
 *
 * @param cookieHeader - Cookie header value from request
 * @returns Decrypted state object or null
 */
export function parseStateCookie(cookieHeader: string | null): DiscordOAuthState | null {
  if (!cookieHeader) {
    return null;
  }

  // Parse cookies
  const cookies = cookieHeader.split(";").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  const encryptedState = cookies[DISCORD_STATE_COOKIE_NAME];
  if (!encryptedState) {
    return null;
  }

  return decryptState(encryptedState);
}

// =============================================================================
// Logging
// =============================================================================

/**
 * Log security-relevant events without exposing sensitive data
 */
export function logSecurityEvent(
  event: "oauth_started" | "oauth_completed" | "oauth_failed" | "state_mismatch" | "token_refreshed",
  details: {
    userId?: string;
    discordUserId?: string;
    error?: string;
    ip?: string;
  }
): void {
  const timestamp = new Date().toISOString();
  const safeDetails = {
    ...details,
    // Mask sensitive IDs
    userId: details.userId ? `${details.userId.slice(0, 4)}****` : undefined,
    discordUserId: details.discordUserId ? `${details.discordUserId.slice(0, 4)}****` : undefined,
    // Mask IP (keep first two octets)
    ip: details.ip ? maskIp(details.ip) : undefined,
  };

  console.log(
    `[Discord Security] ${timestamp} | ${event} |`,
    JSON.stringify(safeDetails)
  );
}

/**
 * Mask an IP address for logging
 */
function maskIp(ip: string): string {
  const parts = ip.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.*.*`;
  }
  // IPv6 or other format, just show first part
  return ip.split(":")[0] + ":****";
}
