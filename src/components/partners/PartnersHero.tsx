import { Link } from "react-router";

export default function PartnersHero() {
  return (
    <section className="bg-page pt-20 pb-24">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-6 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-[11px]">
          <span className="size-2 rounded-full bg-live" />
          <span className="text-[12px] text-brand">
            For Salesforce Partners
          </span>
        </div>

        <h1 className="display mt-14 max-w-[1250px] text-[clamp(40px,7vw,88px)] leading-[1.02] text-ink">
          Your BD team costs ₹2L a month. This costs ₹999 a deal.
        </h1>

        {/* NBSPs match the design, binding "that already" and "done —". */}
        <p className="mt-12 max-w-[960px] text-[18px] leading-[1.65] text-brand">
          Every listing is a company that{" "}already wants Salesforce work done
          {" "}— budget approved, timeline set, contact verified by a human.
          You're not prospecting. You're choosing.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/opportunities"
            className="inline-flex h-10 items-center rounded-xl bg-brand px-6 font-display text-[16px] text-white transition-transform hover:-translate-y-px"
          >
            See live deals
          </Link>
          <a
            href="/#pricing"
            className="inline-flex h-10 items-center rounded-xl bg-blush px-6 font-display text-[16px] text-brand-alt transition-transform hover:-translate-y-px"
          >
            View pricing
          </a>
        </div>
      </div>
    </section>
  );
}
