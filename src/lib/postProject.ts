/*
 * "Post a project" capture — Figma "Oppurtunity ex" / Frame 35 (node 255:921).
 *
 * Same no-backend approach as the waitlist. scripts/sheet-collector.gs files
 * these into a "Projects" tab of the same spreadsheet, keyed off the
 * `source: "post-project"` field below, so the default setup needs no second
 * endpoint: leave VITE_PROJECT_ENDPOINT blank and this falls back to
 * VITE_WAITLIST_ENDPOINT. Set it only to send projects somewhere else
 * entirely — see .env.example.
 */

import { envelope, isValidEmail, postJson, type SubmitResult } from "./submit";

export type ProjectDraft = {
  product: string;
  budget: string;
  timeline: string;
  title: string;
  description: string;
  email: string;
  phone: string;
};

/* Which control to point the user at when validation fails. */
export type ProjectField = keyof ProjectDraft;

export type ProjectSubmitResult =
  | SubmitResult
  | { ok: false; reason: "invalid"; field: ProjectField; message: string };

/* `||`, not `??`: a key present but blank in .env ("VITE_PROJECT_ENDPOINT=")
   arrives as an empty string, and `??` would keep it — leaving the form
   pointing at nothing. Blank must mean "fall back". */
const ENDPOINT = (
  import.meta.env.VITE_PROJECT_ENDPOINT ||
  import.meta.env.VITE_WAITLIST_ENDPOINT ||
  ""
).trim();

/* Indian mobile numbers with an optional +91 / 0 prefix, plus room for other
   country codes — loose on purpose, since the point of the field is that a
   human calls it back. */
const PHONE_RE = /^\+?[\d][\d\s()-]{7,17}$/;

export function validateProject(
  draft: ProjectDraft,
): { field: ProjectField; message: string } | null {
  if (!draft.product)
    return { field: "product", message: "Pick the Salesforce product you need." };
  if (!draft.budget)
    return { field: "budget", message: "Pick a budget range." };
  if (!draft.timeline)
    return { field: "timeline", message: "Pick a timeline." };
  if (draft.title.trim().length < 6)
    return {
      field: "title",
      message: "Give the project a title partners will recognise.",
    };
  if (draft.description.trim().length < 40)
    return {
      field: "description",
      message:
        "Describe the work in a little more detail — vague scopes get rejected at review.",
    };
  if (!isValidEmail(draft.email))
    return { field: "email", message: "That doesn't look like a valid email address." };
  if (!PHONE_RE.test(draft.phone.trim()))
    return {
      field: "phone",
      message: "Add a phone number we can reach you on for the verification call.",
    };
  return null;
}

export async function submitProject(
  draft: ProjectDraft,
): Promise<ProjectSubmitResult> {
  const invalid = validateProject(draft);
  if (invalid) return { ok: false, reason: "invalid", ...invalid };

  if (!ENDPOINT) {
    console.warn(
      "[post-project] Neither VITE_PROJECT_ENDPOINT nor VITE_WAITLIST_ENDPOINT " +
        "is set — the project was NOT stored. See .env.example.",
    );
    return { ok: false, reason: "not-configured" };
  }

  return postJson(ENDPOINT, {
    ...draft,
    email: draft.email.trim().toLowerCase(),
    title: draft.title.trim(),
    description: draft.description.trim(),
    phone: draft.phone.trim(),
    source: "post-project",
    ...envelope(),
  });
}
