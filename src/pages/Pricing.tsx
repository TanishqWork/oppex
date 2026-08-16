import { useState } from "react";

import CompaniesOffer from "../components/pricing/CompaniesOffer";
import PlanCard from "../components/pricing/PlanCard";
import WaitlistCTA from "../components/WaitlistCTA";
import { PARTNER_PLANS } from "../data/pricing";

const AUDIENCES = ["For partners", "For companies"] as const;

/*
 * Figma: Frame 13 (node 53:7845) is the "For partners" state and Frame 33
 * (node 185:888) the "For companies" state — same page, same dark shell,
 * different body. Everything above the toggle is identical in both.
 */
export default function Pricing() {
  const [audience, setAudience] = useState<(typeof AUDIENCES)[number]>("For partners");
  const isPartners = audience === "For partners";

  return (
    <>
      <section className="bg-ink-soft pt-20 pb-24">
        <div className="mx-auto flex w-full max-w-[1272px] flex-col items-center px-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-blush/10 px-3 py-[11px]">
            <span className="text-[12px] text-blush">Pricing</span>
          </div>

          {/* Explicit U+2028 break after "want." in the Figma text. */}
          <h1 className="display mt-12 max-w-[1010px] text-[clamp(40px,7vw,88px)] leading-[1.02] text-white">
            Pay per deal you want. <br />
            Nothing else.
          </h1>

          <p className="mt-12 max-w-[700px] text-[18px] leading-[1.65] text-blush">
            No subscriptions. No monthly fees. No commission on what you close.{" "}You pay ₹999
            when you find a deal worth pursuing — that's the whole model.
          </p>

          {/* Audience toggle — Figma: 319x53, r12, 6px padding, 8px gap */}
          <div
            role="tablist"
            aria-label="Pricing audience"
            className="mt-14 inline-flex gap-2 rounded-xl bg-paper/5 p-1.5"
          >
            {AUDIENCES.map((a) => {
              const active = audience === a;
              return (
                <button
                  key={a}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setAudience(a)}
                  className={`h-[41px] w-[149px] rounded-lg text-[16px] font-medium transition-colors ${
                    active ? "bg-white text-ink-soft" : "text-paper hover:bg-white/5"
                  }`}
                >
                  {a}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`bg-ink-soft pb-20 ${isPartners ? "pt-[47px]" : "pt-4"}`}>
        <div className="mx-auto w-full max-w-[1272px] px-6">
          {isPartners ? (
            <>
              <div className="flex flex-wrap items-stretch justify-center gap-6 lg:flex-nowrap">
                {PARTNER_PLANS.map((p) => (
                  <PlanCard key={p.name} plan={p} />
                ))}
              </div>

              {/* Agency / volume enquiry row — partner side only */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-5 text-center">
                <p className="text-[28px] font-medium text-paper">Agency doing volume?</p>
                <a
                  href="mailto:hello@oppurtunity.example"
                  className="inline-flex h-[49px] items-center rounded-xl bg-paper/10 px-6 text-[18px] font-medium text-paper transition-colors hover:bg-paper/20"
                >
                  Talk to us about team plans
                </a>
              </div>
            </>
          ) : (
            <CompaniesOffer />
          )}
        </div>
      </section>

      <WaitlistCTA tone="dark" source="pricing" />
    </>
  );
}
