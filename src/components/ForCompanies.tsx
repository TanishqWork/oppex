import mockCompanies from "../assets/mock-companies.png";
import { ArrowRight, CheckSquare } from "./icons";

const POINTS: [string, string][] = [
  ["₹0 to post, ₹0 forever.", "Partners pay us — you never do."],
  [
    "Invisible until you're unlocked.",
    "Your name stays hidden from the public. Zero spam risk.",
  ],
  [
    "Only serious partners reach you.",
    "Each one paid ₹999 just to get your contact — tire-kickers filtered out.",
  ],
  [
    "Max 4 partners, ever.",
    "Four qualified conversations, not forty sales pitches.",
  ],
];

export default function ForCompanies() {
  return (
    <section id="post" className="relative overflow-hidden bg-blush py-[148px]">
      <div className="mx-auto w-full max-w-[1272px] px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,865px)_minmax(0,1fr)]">
          {/* Copy */}
          <div>
            <span className="inline-block rounded-md bg-brand/10 px-3 py-2 text-[12px] text-brand">
              For Companies — Free Forever
            </span>

            <h2 className="display mt-9 max-w-[865px] text-[clamp(36px,4.6vw,66px)] text-brand">
              Stop interviewing vendors. Start choosing between them.
            </h2>

            <p className="mt-10 font-body text-[clamp(20px,2vw,28px)] leading-[1.35] font-light text-brand">
              One post replaces months of referral-chasing and cold vendor
              calls. Describe your project once — verified Salesforce partners
              compete to reach you.
            </p>

            <ul className="mt-12 space-y-5">
              {POINTS.map(([lead, rest]) => (
                <li
                  key={lead}
                  className="flex gap-3.5 font-body text-[16px] leading-[1.5] text-brand"
                >
                  <CheckSquare className="mt-0.5 size-[19px] shrink-0" />
                  <span>
                    <strong className="font-semibold">{lead}</strong> {rest}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#get-started"
              className="mt-12 inline-flex items-center gap-3 rounded-xl bg-brand px-6 py-3 font-display text-[17.8px] text-white transition-transform hover:-translate-y-px"
            >
              Post your project free
              <ArrowRight className="size-[18px]" />
            </a>
          </div>

          {/* Browser mockup — bleeds off the right edge, as in the design */}
          <div className="relative lg:-mr-[320px] xl:-mr-[380px]">
            <img
              src={mockCompanies}
              alt="Preview of the Oppurtunity project posting form, showing product, budget, timeline and scope fields."
              className="w-full max-w-none"
              width={1154}
              height={884}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
