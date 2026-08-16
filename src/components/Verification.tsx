const LAYERS = [
  {
    title: "Company Verified",
    body: "Registration, GST, website, business presence — checked by hand. Shell companies and time-wasters are rejected before you ever see them.",
  },
  {
    title: "Contact Verified",
    body: "We call the contact person. If they don't pick up, don't work there, or can't make decisions — the listing dies. Simple.",
  },
  {
    title: "Requirement Reviewed",
    body: "We read every scope line by line. Vague wishlists and “just exploring” posts get rejected. What goes live is budgeted, timed, real demand.",
  },
];

function InfoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5v5.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.3" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Verification() {
  return (
    <section className="bg-charcoal py-[128px]">
      <div className="mx-auto w-full max-w-[1272px] px-6">
        <span className="inline-block rounded-md bg-white/[0.06] px-3 py-2 text-[12px] text-blush">
          The Verification Framework
        </span>

        <h2 className="display mt-8 max-w-[760px] text-[clamp(36px,5vw,66px)] text-blush">
          We reject listings so you <br />
          never waste ₹999.
        </h2>

        <p className="mt-10 max-w-[640px] font-body text-[clamp(20px,2vw,28px)] leading-[1.3] font-light text-blush">
          Nothing goes live until a real person on our team has verified all
          three layers. <br />
          <strong className="font-medium">
            If we can't confirm it, you never see it.
          </strong>
        </p>

        <div className="mt-[140px] grid grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-3">
          {LAYERS.map((l) => (
            <article
              key={l.title}
              className="rounded-[20px] border border-white/[0.09] bg-white/[0.03] p-10"
            >
              <div className="grid size-[68px] place-items-center rounded-2xl bg-white/[0.06] text-[40px]">
                🏢
              </div>
              <h3 className="display mt-8 text-[26px] text-blush">{l.title}</h3>
              <p className="mt-6 font-body text-[18px] leading-[1.45] font-light text-blush">
                {l.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-[110px] flex items-center gap-2.5 rounded-2xl bg-blush px-4 py-2.5 text-brand">
          <InfoIcon className="size-5 shrink-0" />
          <p className="text-[16px] font-medium">
            <strong className="font-semibold">
              Every listing verified within 24 hours — or it never launches.
            </strong>{" "}
            That's the promise the whole marketplace runs on.
          </p>
        </div>
      </div>
    </section>
  );
}
