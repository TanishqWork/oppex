import { useState } from "react";
import { Link } from "react-router";

/*
 * Only the first answer exists in Figma — the other four accordion rows are
 * collapsed in the design, so no answer copy was authored for them. Answers
 * 2-5 below are DRAFTED from claims already made on the landing page
 * (4-unlock cap, zero commission, human verification). Replace them with
 * real copy before launch.
 */
const FAQS: { q: string; a: string; fromDesign: boolean }[] = [
  {
    q: "What if I unlock and the lead is bad?",
    a: "If the contact doesn't respond within 7 days or the details are wrong, we refund the unlock as a credit — no questions. Our verification exists so this almost never happens: we call every contact before their listing goes live.",
    fromDesign: true,
  },
  {
    q: "How is this different from buying lead lists?",
    a: "Lead lists are scraped, stale and sold to everyone. Every listing here is posted by the company itself, with the budget, timeline and scope written down — then a real person calls the contact to confirm they exist and can make the decision.",
    fromDesign: false,
  },
  {
    q: "Why only 4 partners per listing?",
    a: "Because you're one of 4, not one of 400. Caps keep it a shortlist rather than an auction — the company gets a handful of qualified conversations instead of forty sales pitches, and you get a real chance of winning the work.",
    fromDesign: false,
  },
  {
    q: "Do you take a cut of the deal?",
    a: "No. Close a ₹40L deal and you keep ₹40L. The ₹999 unlock is the only thing you ever pay us — there is no commission, no success fee and no escrow sitting between you and the client.",
    fromDesign: false,
  },
  {
    q: "What do I need to join as a partner?",
    a: "A registered business doing Salesforce delivery work, and a contactable decision-maker we can verify. There's no subscription and no listing fee — you only pay when you choose to unlock a specific opportunity.",
    fromDesign: false,
  },
];

export default function PartnerFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-brand py-[100px]">
      <div className="mx-auto w-full max-w-[1272px] px-6">
        <div className="flex flex-col items-center text-center">
          <span className="inline-block rounded-md bg-blush/10 px-3 py-[11px] text-[12px] text-blush">
            Honest Answers
          </span>
          <h2 className="display mt-10 max-w-[1050px] text-[clamp(36px,5vw,66px)] text-white">
            What partners ask before joining
          </h2>
        </div>

        <dl className="mx-auto mt-14 w-full max-w-[704px]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-white/20">
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="display text-[clamp(20px,2.4vw,27.7px)] leading-[1.25] text-blush">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[23px] leading-none text-blush"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-panel-${i}`}
                  aria-labelledby={`faq-btn-${i}`}
                  hidden={!isOpen}
                  className="pb-6 font-body text-[16px] leading-[1.55] font-light text-white"
                >
                  {f.a}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-12 flex justify-center">
          <Link
            to="/opportunities"
            className="inline-flex h-10 items-center gap-3 rounded-xl bg-blush px-6 font-display text-[16px] text-brand transition-transform hover:-translate-y-px"
          >
            Become a partner
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
