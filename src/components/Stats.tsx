type Stat = { icon: React.ReactNode; value: string; label: string };

const s = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const STATS: Stat[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3v18M15.5 7.5c0-1.4-1.6-2.5-3.5-2.5S8.5 6.1 8.5 7.5 10.1 10 12 10s3.5 1.1 3.5 2.5S13.9 15 12 15s-3.5-1.1-3.5-2.5"
          {...s}
        />
      </svg>
    ),
    value: "₹214Cr",
    label: "In live project budgets",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="m3 16 5.5-5.5 3.5 3.5L21 5" {...s} />
        <path d="M16 5h5v5" {...s} />
      </svg>
    ),
    value: "487",
    label: "Companies verified by hand",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="5" {...s} />
        <path d="m9 13.5-1 7 4-2.2 4 2.2-1-7" {...s} />
      </svg>
    ),
    value: "24 hrs",
    label: "From posted to verified",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3.2" {...s} />
        <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" {...s} />
        <path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 19c0-2.2-.8-3.9-2-5" {...s} />
      </svg>
    ),
    value: "0%",
    label: "Commission on your deal",
  },
];

export default function Stats() {
  return (
    <section className="bg-brand py-[135px]">
      <div className="mx-auto w-full max-w-[1272px] px-6">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="size-5 text-blush/70">{stat.icon}</div>
              <dd className="display mt-3 text-[clamp(40px,5vw,66px)] text-blush">
                {stat.value}
              </dd>
              <dt className="mt-1 text-[14px] font-semibold text-white">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <div className="mt-[120px] flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display max-w-[700px] text-[clamp(36px,5vw,66px)] text-blush">
            Built for the premium Salesforce ecosystem.
          </h2>
          <p className="max-w-[448px] text-[18px] leading-[1.55] text-blush lg:pb-3">
            Whether you're looking for specialized Salesforce talent or seeking
            your next high-value project, explore opportunities across the
            ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
}
