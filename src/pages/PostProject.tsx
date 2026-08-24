import PostProjectForm from "../components/post/PostProjectForm";
import WaitlistCTA from "../components/WaitlistCTA";
import { POST_TRUST } from "../data/postProject";

/* Figma: "Oppurtunity ex" / Frame 35 (node 255:921) — where the
   "Post a project · Free" call to action lands. */
export default function PostProject() {
  return (
    <>
      <section className="bg-page pt-20 pb-[120px]">
        <div className="mx-auto w-full max-w-[1272px] px-6">
          <div className="flex flex-col items-center text-center">
            <span className="rounded-md bg-brand/10 px-3 py-3 text-[12px] text-brand">
              Free · Takes 5 Minutes
            </span>

            <h1 className="display mt-14 max-w-[1090px] text-[clamp(44px,7vw,88px)] leading-[1.02] text-ink">
              Describe it once. <br />
              Let partners come to you.
            </h1>

            <p className="mt-5 max-w-[938px] text-[18px] leading-[1.625] text-brand">
              Verified Salesforce partners are waiting. Your identity stays
              hidden until a partner pays to reach you.
            </p>
          </div>

          <div className="mt-9">
            <PostProjectForm />
          </div>

          {/* Reassurances under the card — Figma 255:1952 */}
          <ul className="mx-auto mt-11 grid w-full max-w-[640px] grid-cols-1 gap-5 text-center sm:grid-cols-3">
            {POST_TRUST.map((t) => (
              <li key={t.title}>
                <span className="grid h-[88px] place-items-center text-[56px] leading-none">
                  {t.emoji}
                </span>
                <p className="mt-1.5 text-[12.5px] font-bold text-[#0f172a]">
                  {t.title}
                </p>
                <p className="mt-0.5 text-[12px] leading-[1.5] text-[#475569]">
                  {t.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WaitlistCTA source="post-project" />
    </>
  );
}
