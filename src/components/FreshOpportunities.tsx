import { useRef, useState } from "react";
import { Link } from "react-router";

import { FRESH_OPPORTUNITIES } from "../data/opportunities";
import OpportunityCard from "./opportunities/OpportunityCard";
import { ArrowRight } from "./icons";

/*
 * Figma: "Oppurtunity ex" / Frame 18, the brand-blue strip at node 109:13546
 * — heading + blurb + "Explore more" on the left, three 87px stat chips on
 * the right, then a row of listing cards over a dash indicator.
 */
const CHIPS: { value: string; label: string; tone: string }[] = [
  { value: "487", label: "Verified Companies", tone: "text-blush" },
  { value: "24+", label: "New Opportunities added this week", tone: "text-blush" },
  { value: "15", label: "Opportunities closing soon!", tone: "text-[#ff8686]" },
];

export default function FreshOpportunities() {
  /* At lg+ all three cards are on screen at once, so the dash indicator is
     hidden there; below that the row scroll-snaps one card at a time. */
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    setActive(Math.round(el.scrollLeft / (card.offsetWidth + 24)));
  }

  return (
    <section className="bg-brand/95 py-[120px]">
      <div className="mx-auto w-full max-w-[1358px] px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Headline + blurb + link */}
          <div className="min-w-0 lg:flex-1">
            {/* Figma sets this heading in a 770px box; Literata (the free
                stand-in for Late Serif) runs wider, so the cap is loosened
                to keep the design's two-line setting. */}
            <h2 className="display max-w-[880px] text-[clamp(36px,5vw,66px)] text-blush">
              Fresh Opportunities. <br />
              Posted in the Last 24 Hours.
            </h2>

            <p className="mt-5 max-w-[565px] text-[18px] leading-[1.55] text-blush">
              Discover verified cloud projects from businesses worldwide. Review
              budgets, locations, and cloud requirements, then unlock the
              opportunities that match your expertise.
            </p>

            <Link
              to="/opportunities"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-blush px-6 py-3 font-display text-[17.8px] text-blush transition-transform hover:-translate-y-px"
            >
              Explore more
              <ArrowRight className="size-[18px]" />
            </Link>
          </div>

          {/* Stat chips */}
          <ul className="flex flex-col gap-5 lg:shrink-0">
            {CHIPS.map((chip) => (
              <li key={chip.label} className="flex items-center gap-4">
                <span className="grid size-[87px] shrink-0 place-items-center rounded-[19px] bg-blush/10">
                  <span
                    className={`text-[35px] leading-none font-bold ${chip.tone}`}
                  >
                    {chip.value}
                  </span>
                </span>
                <span className="max-w-[272px] text-[16px] text-white">
                  {chip.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card row — 3-up at lg+, scroll-snap carousel below */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {FRESH_OPPORTUNITIES.map((item) => (
            <div
              key={item.id}
              className="w-[min(100%,437px)] shrink-0 snap-start lg:w-auto"
            >
              <OpportunityCard item={item} dateFirst />
            </div>
          ))}
        </div>

        <div
          className="mt-10 flex items-center justify-center gap-2.5 lg:hidden"
          aria-hidden="true"
        >
          {FRESH_OPPORTUNITIES.map((item, i) => (
            <span
              key={item.id}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                i === active ? "w-[79px] bg-blush" : "w-[44px] bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
