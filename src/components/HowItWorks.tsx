import step1 from "../assets/step-1.png";
import step2 from "../assets/step-2.png";
import step3 from "../assets/step-3.png";
import step4 from "../assets/step-4.png";

const STEPS = [
  {
    img: step1,
    title: "Company posts free",
    body: "Product, budget, timeline, scope — 5 minutes, no account fees, no credit card.",
  },
  {
    img: step2,
    title: "We verify by hand",
    body: "A real person checks the company, calls the contact, reads the scope. Fakes never go live.",
  },
  {
    img: step3,
    title: "Partners unlock",
    body: "Verified partners pay ₹999 for direct contact — capped at 4 per listing. First come, first served.",
  },
  {
    img: step4,
    title: "You close directly",
    body: "No platform in the middle. No commission. The deal is 100% yours — we're already out of the way.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-page py-[130px]">
      <div className="mx-auto w-full max-w-[1272px] px-6">
        <span className="inline-block rounded-md bg-brand/10 px-3 py-2 text-[12px] text-brand">
          How It Works
        </span>

        <h2 className="display mt-10 max-w-[720px] text-[clamp(36px,5vw,66px)] text-brand">
          Posted Monday. <br />
          Verified Tuesday. <br />
          Contacted Wednesday.
        </h2>

        <ol className="mt-24 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              {/* connector arrow — sits in the gutter between cards */}
              {i < STEPS.length - 1 && (
                <span className="absolute top-[117px] -right-[30px] z-10 hidden size-11 place-items-center rounded-[10px] bg-[#f2ebdb] font-grotesk text-[26px] font-semibold text-brand xl:grid">
                  →
                </span>
              )}

              <div className="grid aspect-square w-full max-w-[278px] place-items-center rounded-[20px] bg-[#f2ebdb] p-[9px]">
                <div className="grid size-full place-items-center overflow-hidden rounded-[11px] bg-page">
                  <img
                    src={step.img}
                    alt=""
                    className="size-full object-contain"
                  />
                </div>
              </div>

              <h3 className="display mt-8 text-[27.7px] leading-[1.3] text-ink-soft">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[290px] font-body text-[16px] leading-[1.5] font-light text-ink-mute">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
