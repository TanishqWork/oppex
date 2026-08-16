import { Link } from "react-router";

import phone from "../assets/phone.png";
import { ArrowRight, CheckSquare } from "./icons";

const POINTS: [string, string][] = [
  [
    "Read everything first, pay after.",
    "Full scope, budget, and timeline visible before you unlock.",
  ],
  [
    "A human verified this company exists",
    "— and called the contact person. No scraped leads, no dead ends.",
  ],
  [
    "You're one of 4, not one of 400.",
    "Unlock caps mean real exclusivity, not an auction.",
  ],
  ["Close a ₹40L deal, keep ₹40L.", "We take zero commission. Ever."],
];

export default function ForPartners() {
  return (
    <section id="partners" className="bg-brand py-[130px]">
      <div className="mx-auto w-full max-w-[1272px] px-6">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-[275px_minmax(0,1fr)] lg:gap-28">
          {/* Phone mockup + price comparison note */}
          <div className="mx-auto w-[275px] shrink-0 lg:mx-0">
            <img
              src={phone}
              alt="Mobile preview of a locked opportunity listing for a Data Cloud project."
              className="w-full"
              width={275}
              height={519}
            />
            <p className="mt-5 rounded-lg bg-blush/90 p-3 text-[12px] leading-[1.45] font-medium text-grape">
              Compare: one qualified enterprise lead from an agency costs
              ₹15,000–₹50,000. Here it's ₹999 — about 2% of the cost.
            </p>
          </div>

          {/* Copy */}
          <div>
            <span className="inline-block rounded-md bg-white/10 px-3 py-2 text-[12px] text-blush">
              For Salesforce Partners
            </span>

            <h2 className="display mt-9 max-w-[735px] text-[clamp(36px,4.6vw,66px)] text-blush">
              ₹999. That's what a qualified enterprise lead costs here.
            </h2>

            <p className="mt-9 max-w-[640px] font-body text-[clamp(20px,2vw,28px)] leading-[1.35] font-light text-blush">
              Your BD team spends weeks and lakhs chasing leads that go nowhere.
              Here, the scope, budget, and timeline are on the table before you
              spend a rupee
            </p>

            <ul className="mt-12 space-y-5">
              {POINTS.map(([lead, rest]) => (
                <li
                  key={lead}
                  className="flex max-w-[720px] gap-3.5 font-body text-[16px] leading-[1.5] text-blush"
                >
                  <CheckSquare className="mt-0.5 size-[19px] shrink-0" />
                  <span>
                    <strong className="font-semibold">{lead}</strong> {rest}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to="/opportunities"
              className="mt-12 inline-flex items-center gap-3 rounded-xl bg-blush px-6 py-3 font-display text-[17.8px] text-brand transition-transform hover:-translate-y-px"
            >
              Browse live opportunities
              <ArrowRight className="size-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
