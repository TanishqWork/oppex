import { HAPPENING_NOW, HOT_THIS_WEEK } from "../../data/opportunities";

function Panel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#e2e8f0] bg-white p-4">
      <h2 className="text-[10.5px] font-bold tracking-wide text-[#94a3b8] uppercase">
        {label}
      </h2>
      {children}
    </section>
  );
}

export default function ExploreSidebar() {
  return (
    <aside className="flex w-full flex-col gap-3 lg:w-[317px] lg:shrink-0">
      {/* Waitlist promo — Figma: #2563eb, r12 */}
      <section className="rounded-xl bg-[#2563eb] p-4">
        <h2 className="display text-[26px] text-blush">First unlock free.</h2>
        <p className="mt-4 text-[14px] leading-[1.3] text-blush">
          Waitlist members get 1 unlock (₹999 value) at launch. Gone on launch
          day.
        </p>
        <a
          href="/#get-started"
          className="mt-5 grid h-10 place-items-center rounded-xl bg-blush font-display text-[16px] text-brand-alt transition-transform hover:-translate-y-px"
        >
          Claim early access
        </a>
      </section>

      <Panel label="Happening Now">
        <ul className="mt-1">
          {HAPPENING_NOW.map((a, i) => (
            <li
              key={a.title}
              className={`flex gap-3 py-3.5 ${i < HAPPENING_NOW.length - 1 ? "border-b border-[#e2e8f0]" : ""}`}
            >
              <span
                className={`mt-1.5 size-[7px] shrink-0 rounded-full ${a.tone}`}
              />
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-[#0f172a]">
                  {a.title}
                </p>
                <p className="mt-0.5 text-[13px] font-light text-black">
                  {a.meta}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel label="Hot This Week">
        <ul className="mt-2 space-y-2.5">
          {HOT_THIS_WEEK.map((t) => (
            <li
              key={t.label}
              className="flex items-center justify-between gap-3"
            >
              <span className="text-[14px] font-light text-black">
                {t.label}
              </span>
              <span className="text-[12px] font-bold text-[#16a34a]">
                +{t.delta}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </aside>
  );
}
