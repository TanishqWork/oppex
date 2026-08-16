import { useState } from "react";

import ctaBg from "../assets/cta-bg.png";
import ctaBgDark from "../assets/cta-bg-dark.png";
import { submitWaitlist, type WaitlistSource } from "../lib/waitlist";
import { CheckCircle } from "./icons";

/* Frame 13 (Pricing) draws this same block on the charcoal shell with its
   own skyline plate, so the tone is a prop rather than a forked component.
   `source` records which page a signup came from, in the sheet. */
type Props = { tone?: "brand" | "dark"; source?: WaitlistSource };

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; duplicate: boolean }
  | { kind: "error"; message: string };

export default function WaitlistCTA({ tone = "brand", source = "landing" }: Props) {
  const dark = tone === "dark";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const busy = status.kind === "submitting";
  const done = status.kind === "success";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || done) return;

    /* Honeypot: humans never see this field, bots fill everything in.
       Pretend it worked so the bot doesn't retry, but store nothing. */
    const trap = new FormData(e.currentTarget).get("company");
    if (typeof trap === "string" && trap.trim() !== "") {
      setStatus({ kind: "success", duplicate: false });
      return;
    }

    setStatus({ kind: "submitting" });
    const result = await submitWaitlist(email, source);

    if (result.ok) {
      setStatus({ kind: "success", duplicate: Boolean(result.duplicate) });
      setEmail("");
      return;
    }

    setStatus({
      kind: "error",
      message:
        result.reason === "invalid-email"
          ? "That doesn't look like a valid email address."
          : "We couldn't save that just now. Please try again in a moment.",
    });
  }

  return (
    <section
      id="get-started"
      className={`relative overflow-hidden pt-[95px] pb-[150px] ${dark ? "bg-ink-soft" : "bg-brand"}`}
    >
      {/* City skyline plate with the wash over it */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[552px]">
        <img
          src={dark ? ctaBgDark : ctaBg}
          alt=""
          className="size-full object-cover object-bottom"
        />
        <div
          className={`absolute inset-0 ${
            dark
              ? "bg-linear-to-b from-ink-soft via-ink-soft/85 to-ink-soft/40"
              : "bg-linear-to-b from-brand via-brand/85 to-brand/40"
          }`}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1272px] px-6">
        <span className="inline-block rounded-md bg-white/10 px-3 py-2 text-[12px] text-blush">
          Launching Soon — Limited Early Access
        </span>

        <h2 className="display mt-9 max-w-[578px] text-[clamp(36px,5vw,66px)] text-white">
          Your first unlock is free. But only on the waitlist.
        </h2>

        <p className="mt-11 max-w-[860px] font-body text-[20px] leading-[1.5] font-light text-white">
          Early partners get 1 free unlock (₹999 value) at launch. Early
          companies get priority placement at the top of the marketplace. Both
          disappear at launch day.
        </p>

        <form className="mt-10 flex flex-wrap items-center gap-4" onSubmit={handleSubmit} noValidate>
          <label htmlFor={`waitlist-email-${source}`} className="sr-only">
            Work email
          </label>
          <input
            id={`waitlist-email-${source}`}
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={busy || done}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status.kind === "error") setStatus({ kind: "idle" });
            }}
            placeholder="Work email"
            aria-invalid={status.kind === "error"}
            className="h-11 w-[262px] rounded-xl border border-white/25 bg-white/5 px-4 font-body text-[16px] font-light text-white placeholder:text-white/50 focus:border-white/60 focus:outline-none disabled:opacity-60"
          />

          {/* Honeypot — off-screen, not focusable, hidden from screen readers */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor={`company-${source}`}>Company (leave blank)</label>
            <input
              id={`company-${source}`}
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={busy || done}
            className="h-11 rounded-xl bg-blush px-6 font-display text-[16px] text-brand transition-transform hover:-translate-y-px disabled:translate-y-0 disabled:opacity-70"
          >
            {busy ? "Adding you…" : done ? "You're on the list" : "Claim early Access"}
          </button>
        </form>

        {/* One live region so a screen reader announces whichever state wins */}
        <p
          role="status"
          aria-live="polite"
          className="mt-6 font-body text-[13px] font-light text-white"
        >
          {status.kind === "success" ? (
            <span className="inline-flex items-center gap-2 text-blush">
              <CheckCircle className="size-4 shrink-0" />
              {status.duplicate
                ? "You're already on the list — we'll be in touch at launch."
                : "You're on the list. We'll email you when early access opens."}
            </span>
          ) : status.kind === "error" ? (
            <span className="text-[#ffd5d5]">{status.message}</span>
          ) : (
            "Takes 10 seconds · No spam, ever · 340+ partners already waiting"
          )}
        </p>
      </div>
    </section>
  );
}
