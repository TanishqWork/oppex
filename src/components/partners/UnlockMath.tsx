/* Figma: dark card 1320x668, #262320, r43, 76/85 padding. */
const ROWS: [string, string][] = [
  ["Average deal size on OE", "₹52,00,000"],
  ["Cost to unlock the contact", "₹999"],
  ["OE commission on the deal", "₹0"],
  ["Max competitors per listing", "3 others"],
];

export default function UnlockMath() {
  return (
    <section className="bg-page pb-24">
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <div className="rounded-[43px] bg-ink-soft px-6 py-14 sm:px-12 lg:px-[76px] lg:py-[85px]">
          <h2 className="display text-[clamp(36px,5vw,66px)] text-blush">
            The math on one unlock
          </h2>

          <dl className="mt-11">
            {ROWS.map(([label, value], i) => (
              <div
                key={label}
                className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 ${
                  i < ROWS.length - 1 ? "border-b border-white/15" : ""
                }`}
              >
                <dt className="text-[17px] text-blush">{label}</dt>
                <dd className="text-[clamp(26px,3vw,34px)] font-medium text-blush">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-9 rounded-[10px] border border-[#60a5fa] bg-[#60a5fa]/12 px-5 py-4 text-[14px] leading-[1.5] text-white">
            Win one deal in{" "}
            <strong className="font-semibold">52 unlocks</strong> and you're
            still up <strong className="font-semibold">50x</strong>. Most
            partners need far fewer.
          </p>
        </div>
      </div>
    </section>
  );
}
