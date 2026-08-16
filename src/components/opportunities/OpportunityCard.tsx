import type { Opportunity } from "../../data/opportunities";
import { ArrowRight, CheckCircle, ClockIcon, WalletIcon } from "../icons";

/* Figma: card 332x465, white, r16, 24px padding, 12px internal gap. */
export default function OpportunityCard({ item }: { item: Opportunity }) {
  return (
    <article className="flex min-h-[465px] flex-col rounded-2xl border border-black/[0.08] bg-white p-6 transition-shadow duration-300 hover:shadow-[0_14px_36px_-14px_rgba(15,15,15,0.22)]">
      {/* Taxonomy badges */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded bg-[#dbeafe] px-2.5 py-1 text-[12px] font-bold text-brand-link">
          {item.cloud}
        </span>
        <span className="rounded bg-chrome px-2.5 py-1 text-[12px] text-[#6b6b6b]">
          {item.industry}
        </span>
        {item.verified && (
          <span className="inline-flex items-center gap-1 text-[12px] font-bold text-verified">
            <CheckCircle className="size-3" />
            Verified
          </span>
        )}
      </div>

      <p className="mt-2.5 text-[12px] text-[#6b6b6b]">{item.postedAgo}</p>

      <h3 className="display mt-3 text-[26px] leading-[1.15] text-brand">
        {item.title}
      </h3>

      <p className="mt-3 text-[14px] leading-[1.45] text-[#171717]/80">
        {item.summary}
      </p>

      {/* Commercials — rule above, matching the Figma divider */}
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/[0.08] pt-4 text-[14px]">
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#171717]">
          <WalletIcon className="size-4 text-[#6b6b6b]" />
          {item.budget}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[#6b6b6b]">
          <ClockIcon className="size-4" />
          {item.duration}
        </span>
        <span className="text-[#6b6b6b]">{item.location}</span>
      </div>

      {/*
       * Locked contact details: the real values are blurred out and the
       * unlock CTA sits on top, exactly as the design shows. The text is
       * hidden from assistive tech too, so the blur is not merely visual.
       */}
      <div className="relative mt-4">
        <div aria-hidden="true" className="space-y-1 blur-[5px] select-none">
          <p className="truncate text-[12px]">
            <span className="font-extrabold text-[#6b6b6b]">Company: </span>
            <span className="font-bold text-[#171717]">{item.company}</span>
          </p>
          <p className="truncate text-[12px]">
            <span className="font-extrabold text-[#6b6b6b]">Contact: </span>
            <span className="font-semibold text-[#171717]">{item.contact}</span>
          </p>
        </div>

        <div className="absolute inset-0 grid place-items-center">
          <button
            type="button"
            className="inline-flex h-[47px] items-center gap-3 rounded-xl bg-brand px-6 font-display text-[17.8px] text-white shadow-sm transition-transform hover:-translate-y-px"
          >
            Join to unlock
            <ArrowRight className="size-[18px]" />
          </button>
        </div>
      </div>
    </article>
  );
}
