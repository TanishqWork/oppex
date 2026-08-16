import { Link } from "react-router";

import type { Plan } from "../../data/pricing";
import { CheckCircle } from "../icons";

/* Figma: 352x584 card, r12. Featured card is filled with a blush border;
   the others are transparent with a #4c4a47 hairline. */
export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="relative flex w-full max-w-[352px] flex-col">
      {/* Ribbon overhangs above the card; its bottom 11px tuck behind it,
          so every card top still lines up across the row. */}
      {plan.ribbon && (
        <div className="absolute -top-[47px] left-1/2 z-0 grid h-[58px] w-[254px] -translate-x-1/2 place-items-center rounded-[11px] bg-blush">
          <span className="display text-[18px] whitespace-nowrap text-brand">{plan.ribbon}</span>
        </div>
      )}

      <div
        className={`relative z-10 flex flex-1 flex-col rounded-xl border p-6 ${
          plan.featured ? "border-blush bg-ink-soft" : "border-hairline"
        }`}
      >
        <h3 className="text-[20px] font-medium text-paper">{plan.name}</h3>
        <p className="mt-1 text-[14px] font-light text-paper">{plan.tagline}</p>

        <p className="mt-4 text-[42px] leading-none font-medium text-white">{plan.price}</p>
        <p className="mt-2 text-[18px] font-light text-paper">{plan.unit}</p>

        <hr className="mt-6 border-0 border-t border-paper/10" />

        <ul className="mt-5 space-y-2">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-[16px] leading-[1.35] font-light text-paper">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-paper/60" />
              {f}
            </li>
          ))}
        </ul>

        {/* Pushes the CTA to the card foot so all three align. */}
        <div className="mt-8 flex-1" />

        {plan.featured && <hr className="mb-4 border-0 border-t border-paper/10" />}

        <Link
          to="/opportunities"
          className={`grid h-[47px] place-items-center rounded-xl font-display text-[17.8px] transition-transform hover:-translate-y-px ${
            plan.featured ? "bg-blush text-[#2854e8]" : "bg-white text-ink-soft"
          }`}
        >
          {plan.cta}
        </Link>
      </div>
    </div>
  );
}
