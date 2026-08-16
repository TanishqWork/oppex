/*
 * Waitlist capture without a backend.
 *
 * The destination is configured once via VITE_WAITLIST_ENDPOINT (see
 * .env.example), so swapping providers — or moving to your own API later — is
 * a config change, not a code change. Nothing here holds a secret: the URL is
 * a write-only collector and ships in the client bundle.
 *
 * Today it points at a Google Apps Script web app that appends a row to a
 * Google Sheet (see scripts/waitlist-sheet.gs). To move to a real API later,
 * point the env var at it — this already sends ordinary JSON.
 */

export type WaitlistSource = "landing" | "pricing" | "explore" | "partners";

export type SubmitResult =
  | { ok: true; duplicate?: boolean }
  | { ok: false; reason: "invalid-email" | "not-configured" | "network" };

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT;

/* Deliberately permissive — proving an address works is the confirmation
   email's job. This only catches obvious typos before a round trip. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

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

  const payload = {
    email,
    source,
    submittedAt: new Date().toISOString(),
    userAgent: typeof navigator === "undefined" ? "" : navigator.userAgent,
  };

  /*
   * Apps Script does not answer the CORS preflight that an
   * "application/json" POST triggers. "text/plain" is a CORS-safelisted
   * content type, so the browser skips the preflight and the request goes
   * through; the script JSON.parses the body itself.
   */
  const isAppsScript = ENDPOINT.includes("script.google.com");

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: isAppsScript
        ? { "Content-Type": "text/plain;charset=utf-8" }
        : { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!res.ok) return { ok: false, reason: "network" };

    /* Never let a response-parsing hiccup turn a stored signup into a
       visible error — a 2xx means the row was written. */
    try {
      const data = (await res.json()) as { ok?: boolean; duplicate?: boolean };
      if (data && data.ok === false) return { ok: false, reason: "network" };
      return { ok: true, duplicate: Boolean(data?.duplicate) };
    } catch {
      return { ok: true };
    }
  } catch {
    return { ok: false, reason: "network" };
  }
}
