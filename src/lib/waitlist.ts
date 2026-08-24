/*
 * Waitlist capture without a backend.
 *
 * The destination is configured once via VITE_WAITLIST_ENDPOINT (see
 * .env.example). Today it points at a Google Apps Script web app that appends
 * a row to a Google Sheet (see scripts/sheet-collector.gs). To move to a real
 * API later, point the env var at it — this already sends ordinary JSON.
 *
 * The fetch itself lives in ./submit, shared with the project posting form.
 */

import { envelope, isValidEmail, postJson, type SubmitResult } from "./submit";

export type WaitlistSource =
  | "landing"
  | "pricing"
  | "explore"
  | "partners"
  | "post-project";

export type { SubmitResult };
export { isValidEmail };

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT;

export async function submitWaitlist(
  rawEmail: string,
  source: WaitlistSource = "landing",
): Promise<SubmitResult> {
  const email = rawEmail.trim().toLowerCase();

  if (!isValidEmail(email)) return { ok: false, reason: "invalid-email" };

  if (!ENDPOINT) {
    console.warn(
      "[waitlist] VITE_WAITLIST_ENDPOINT is not set — the address was NOT stored. " +
        "See .env.example.",
    );
    return { ok: false, reason: "not-configured" };
  }

  return postJson(ENDPOINT, { email, source, ...envelope() });
}
