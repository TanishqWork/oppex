import { useEffect, useId, useRef, useState } from "react";

import {
  BUDGET_RANGES,
  SALESFORCE_PRODUCTS,
  TIMELINES,
} from "../../data/postProject";
import {
  submitProject,
  type ProjectDraft,
  type ProjectField,
} from "../../lib/postProject";
import { ArrowRight, ChevronDown, ShieldCheck } from "../icons";
import PostProjectSuccess from "./PostProjectSuccess";

/* Figma Frame 440 (node 255:1904): 729x734, r18, 1px brand @24%, 32/30 pad. */
const EMPTY: ProjectDraft = {
  product: "",
  budget: "",
  timeline: "",
  title: "",
  description: "",
  email: "",
  phone: "",
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; field?: ProjectField };

/* Shared field chrome — Figma: h50, r8, brand @6%, 12/8 padding. Height is
   set per control, since the description box is taller. */
const FIELD =
  "w-full rounded-lg bg-brand/[0.06] px-3 py-2 text-[13px] text-ink " +
  "placeholder:text-[#7f7f7f] focus:outline-2 focus:outline-offset-2 focus:outline-brand " +
  "disabled:opacity-60 aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-[#c8102e]";

function Label({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[13px] leading-[18px] font-medium text-[#343437]"
    >
      {children}
    </label>
  );
}

/* Native <select> keeps the keyboard and mobile behaviour for free; the
   chevron from the design is layered on top of an appearance-none control. */
function Select({
  id,
  label,
  placeholder,
  options,
  value,
  invalid,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  value: string;
  invalid: boolean;
  disabled: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          aria-invalid={invalid}
          onChange={(e) => onChange(e.target.value)}
          className={`${FIELD} h-[50px] appearance-none pr-10 ${
            value ? "" : "text-[#7f7f7f]"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#636364]" />
      </div>
    </div>
  );
}

export default function PostProjectForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [draft, setDraft] = useState<ProjectDraft>(EMPTY);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const busy = status.kind === "submitting";
  const errorField = status.kind === "error" ? status.field : undefined;

  function set<K extends ProjectField>(key: K, value: ProjectDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    /* Clear the banner as soon as the offending field is touched, so the
       message never contradicts what is on screen. */
    if (status.kind === "error" && status.field === key)
      setStatus({ kind: "idle" });
  }

  const id = (k: string) => `${uid}-${k}`;

  /* Send focus to whatever failed validation. This has to wait for the render
     that clears `submitting`, because every control is still `disabled` at the
     moment the handler runs — and a disabled element cannot take focus. */
  useEffect(() => {
    if (status.kind !== "error" || !status.field) return;
    formRef.current
      ?.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-${status.field}`)}`)
      ?.focus();
  }, [status, uid]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || status.kind === "success") return;

    /* Honeypot: humans never see this field, bots fill everything in.
       Pretend it worked so the bot doesn't retry, but store nothing. */
    const trap = new FormData(e.currentTarget).get("website");
    if (typeof trap === "string" && trap.trim() !== "") {
      setStatus({ kind: "success" });
      return;
    }

    setStatus({ kind: "submitting" });
    const result = await submitProject(draft);

    if (result.ok) {
      setStatus({ kind: "success" });
      return;
    }

    if (result.reason === "invalid") {
      setStatus({ kind: "error", message: result.message, field: result.field });
      return;
    }

    setStatus({
      kind: "error",
      message:
        result.reason === "not-configured"
          ? "This form isn't connected to a collector yet, so nothing was saved. (Check the browser console.)"
          : "We couldn't send that just now. Please try again in a moment.",
    });
  }

  if (status.kind === "success") {
    return <PostProjectSuccess title={draft.title} email={draft.email} />;
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-[729px] flex-col gap-9 rounded-[18px] border border-brand/25 px-4 py-8 sm:px-8 sm:py-[30px]"
    >
      {/* Privacy reassurance — Figma 255:1858 */}
      <p className="flex items-start gap-3.5 rounded-2xl border border-[#97c5ae] bg-[#efffeb] p-2.5 pl-4 text-[12px] leading-[1.23] text-[#009758]">
        <ShieldCheck className="mt-0.5 size-[18px] shrink-0 text-[#10911f]" />
        <span>
          <strong className="font-bold">
            Your company name is never shown publicly.
          </strong>{" "}
          Only partners who pay ₹999 see your contact — max 4, ever.
        </span>
      </p>

      <div className="flex flex-col gap-3">
        <Select
          id={id("product")}
          label="Salesforce product needed"
          placeholder="Select a product"
          options={SALESFORCE_PRODUCTS}
          value={draft.product}
          invalid={errorField === "product"}
          disabled={busy}
          onChange={(v) => set("product", v)}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select
            id={id("budget")}
            label="Budget range"
            placeholder="Select range..."
            options={BUDGET_RANGES}
            value={draft.budget}
            invalid={errorField === "budget"}
            disabled={busy}
            onChange={(v) => set("budget", v)}
          />
          <Select
            id={id("timeline")}
            label="Timeline"
            placeholder="Select timeline"
            options={TIMELINES}
            value={draft.timeline}
            invalid={errorField === "timeline"}
            disabled={busy}
            onChange={(v) => set("timeline", v)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={id("title")}>Project title</Label>
          <input
            id={id("title")}
            type="text"
            value={draft.title}
            disabled={busy}
            aria-invalid={errorField === "title"}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Revenue cloud, sales cloud, CPQ...."
            className={`${FIELD} h-[50px]`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={id("description")}>Description</Label>
          <textarea
            id={id("description")}
            rows={4}
            value={draft.description}
            disabled={busy}
            aria-invalid={errorField === "description"}
            onChange={(e) => set("description", e.target.value)}
            placeholder="What do you need done?"
            className={`${FIELD} h-[106px] resize-y py-4`}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor={id("email")}>Work email</Label>
            <input
              id={id("email")}
              type="email"
              autoComplete="email"
              value={draft.email}
              disabled={busy}
              aria-invalid={errorField === "email"}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@company.com"
              className={`${FIELD} h-[50px]`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={id("phone")}>Phone (for verification call)</Label>
            <input
              id={id("phone")}
              type="tel"
              autoComplete="tel"
              value={draft.phone}
              disabled={busy}
              aria-invalid={errorField === "phone"}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+91"
              className={`${FIELD} h-[50px]`}
            />
          </div>
        </div>
      </div>

      {/* Honeypot — off-screen, not focusable, hidden from screen readers */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={id("website")}>Website (leave blank)</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-[47px] w-full items-center justify-center gap-2 rounded-xl bg-brand font-display text-[17.8px] text-white transition-transform hover:-translate-y-px disabled:translate-y-0 disabled:opacity-70"
        >
          {busy && (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            />
          )}
          {busy ? "Sending…" : "Join to unlock"}
          {!busy && <ArrowRight className="size-[18px]" />}
        </button>

        <p
          role="status"
          aria-live="polite"
          className="text-center text-[13px] text-black/40"
        >
          {status.kind === "error" ? (
            <span className="text-[#c8102e]">{status.message}</span>
          ) : (
            "We'll call to verify within 24 hours · Nothing goes live without your approval"
          )}
        </p>
      </div>
    </form>
  );
}
