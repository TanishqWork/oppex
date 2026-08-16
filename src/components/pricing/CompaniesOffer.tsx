import { Link } from "react-router";

import { COMPANY_OFFER } from "../../data/pricing";

/* Figma Frame 33 (node 185:888) — the "For companies" toggle state. */
export default function CompaniesOffer() {
  return (
    <div className="mx-auto flex w-full max-w-[989px] flex-col items-center text-center">
      <h2 className="display text-[clamp(34px,5vw,66px)] text-white">
        {COMPANY_OFFER.heading}
      </h2>

      <p className="mt-7 font-body text-[20px] leading-[1.4] font-light text-white">
        {COMPANY_OFFER.body}
      </p>

      <p className="mt-10 text-[clamp(64px,10vw,117px)] leading-none font-medium text-white">
        {COMPANY_OFFER.price}
      </p>

      <p className="mt-6 font-body text-[13px] font-light text-white">{COMPANY_OFFER.note}</p>

      <Link
        to="/#post"
        className="mt-10 inline-flex h-10 items-center rounded-xl bg-blush px-7 font-display text-[16px] text-brand transition-transform hover:-translate-y-px"
      >
        {COMPANY_OFFER.cta}
      </Link>
    </div>
  );
}
