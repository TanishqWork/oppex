import pstep1 from "../../assets/pstep-1.png";
import pstep2 from "../../assets/pstep-2.png";
import pstep3 from "../../assets/pstep-3.png";
import pstep4 from "../../assets/pstep-4.png";

const STEPS = [
  {
    img: pstep1,
    title: "Browse free, forever",
    body: "Full scope, budget, timeline, industry, region — all visible before you spend anything. Only the identity is gated.",
  },
  {
    img: pstep2,
    title: "Unlock for ₹999",
    body: "One click reveals company name, decision-maker, email, phone, and LinkedIn. Yours for good.",
  },
  {
    img: pstep3,
    title: "You're 1 of max 4",
    body: "Each listing caps at 4 unlocks. When it's full, it's closed. Early movers win — just like real deals.",
  },
  {
    img: pstep4,
    title: "Close it. Keep 100%",
    body: "Contact them directly — no platform messaging, no escrow, no commission. The relationship is yours.",
  },
];

export default function UnlockSteps() {
  return (
    <section className="bg-page py-[110px]">
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <span className="inline-block rounded-md bg-brand/10 px-3 py-2 text-[12px] text-brand">
          How Unlocking Works
        </span>

        {/* Explicit break from the Figma text (\n after "everything."). */}
        <h2 className="display mt-10 max-w-[850px] text-[clamp(36px,5vw,66px)] text-brand">
          Read everything. <br />
          Pay only when you're sure.
        </h2>

        <ol className="mt-24 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
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
