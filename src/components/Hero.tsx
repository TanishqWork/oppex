import { Link } from "react-router";

import { ArrowRight, CheckCircle } from "./icons";

/* Decorative 6x4 tile scatter flanking the hero — 57px cells, sparse,
   with the per-tile opacities taken straight from the Figma groups.
   `null` means no tile in that slot. */
type Alpha = number | null;

const LEFT_TILES: Alpha[][] = [
  [0.02, null, 0.02, null],
  [0.02, 0.02, null, null],
  [0.02, 0.11, 0.02, 0.02],
  [null, 0.02, 0.02, 0.16],
  [0.02, 0.26, null, 0.02],
  [null, 0.02, 0.02, null],
];

const RIGHT_TILES: Alpha[][] = [
  [0.02, null, 0.02, null],
  [0.02, 0.02, null, null],
  [0.02, 0.26, 0.02, 0.02],
  [null, 0.02, 0.02, 0.26],
  [0.02, 0.26, null, 0.02],
  [null, 0.02, 0.02, null],
];

/* Plain tiles read as white against the #f7f7f7 page; the handful of
   higher-opacity slots in the Figma group become grey accents. */
function Checkers({ tiles }: { tiles: Alpha[][] }) {
  return (
    <div className="grid grid-cols-4 grid-rows-6" aria-hidden="true">
      {tiles.flat().map((a, i) => (
        <span
          key={i}
          className="block size-[57px]"
          style={
            a === null
              ? undefined
              : { background: a > 0.05 ? `rgba(0,0,0,${a})` : "#ffffff" }
          }
        />
      ))}
    </div>
  );
}

const TRUST = [
  "Verified opportunity",
  "Keep 100% of your deal",
  "Max 4 partners per listing",
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-page pb-24">
      {/* flanking tile decorations — desktop only */}
      <div className="pointer-events-none absolute top-[520px] left-0 hidden xl:block">
        <Checkers tiles={LEFT_TILES} />
      </div>
      <div className="pointer-events-none absolute top-[578px] right-0 hidden xl:block">
        <Checkers tiles={RIGHT_TILES} />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1272px] flex-col items-center px-6 pt-20 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-[11px]">
          <span className="size-2 rounded-full bg-live" />
          <span className="text-[12px] text-brand">
            356 verified Salesforce projects live right now
          </span>
        </div>

        <h1 className="display mt-14 max-w-[1090px] text-[clamp(44px,7vw,88px)] leading-[1.02] text-ink">
          Your next Salesforce deal is{"\u00a0"}already posted.
        </h1>

        <p className="mt-12 max-w-[668px] text-[18px] leading-[1.65] text-brand">
          Verified companies post real projects with real budgets. You unlock
          direct contact for ₹999 and close the deal yourself.
        </p>
        <p className="mt-4 max-w-[668px] text-[18px] leading-[1.65] text-brand">
          No commissions. No bidding wars. No cold outreach.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <Link
            to="/opportunities"
            className="inline-flex h-10 items-center gap-3 rounded-xl bg-brand px-6 font-display text-[16px] text-white transition-transform hover:-translate-y-px"
          >
            See live opportunities
            <ArrowRight className="size-[18px]" />
          </Link>
          <a
            href="#post"
            className="inline-flex h-10 items-center rounded-xl bg-blush px-6 font-display text-[16px] text-brand-alt transition-transform hover:-translate-y-px"
          >
            Post a project- Free
          </a>
        </div>

        <ul className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
          {TRUST.map((t) => (
            <li
              key={t}
              className="flex items-center gap-2 text-[13px] text-brand"
            >
              <CheckCircle className="size-[17px] shrink-0 text-verified" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
