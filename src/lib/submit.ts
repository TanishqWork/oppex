/*
 * Shared client-side form transport.
 *
 * Both collectors on this site (the waitlist and the project posting form)
 * POST plain JSON to a URL configured through an env var, so swapping
 * providers — or moving to a real API later — is a config change, not a code
 * change. Nothing here holds a secret: these are write-only collectors and
 * the URLs ship in the client bundle.
 */

export type SubmitResult =
  | { ok: true; duplicate?: boolean }
  | { ok: false; reason: "invalid-email" | "not-configured" | "network" };

/* Deliberately permissive — proving an address works is the confirmation
   email's job. This only catches obvious typos before a round trip. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/** Fields every submission carries, whatever the form. */
export function envelope() {
  return {
    submittedAt: new Date().toISOString(),
    userAgent: typeof navigator === "undefined" ? "" : navigator.userAgent,
  };
}

export async function postJson(
  endpoint: string,
  payload: unknown,
): Promise<SubmitResult> {
  /*
   * Apps Script does not answer the CORS preflight that an
   * "application/json" POST triggers. "text/plain" is a CORS-safelisted
   * content type, so the browser skips the preflight and the request goes
   * through; the script JSON.parses the body itself.
   */
  const isAppsScript = endpoint.includes("script.google.com");

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: isAppsScript
        ? { "Content-Type": "text/plain;charset=utf-8" }
        : { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!res.ok) return { ok: false, reason: "network" };

    /* Never let a response-parsing hiccup turn a stored submission into a
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
