import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";

import { ArrowRight } from "../icons";

/* Replaces the form once a project is in. The three lines mirror the promise
   the page makes: a human calls, then it goes live, then partners unlock it. */
const NEXT = [
  "A real person reads the scope and calls the number you gave us — usually the same working day.",
  "Nothing goes live until you approve it. Your company name stays hidden either way.",
  "Verified partners then pay ₹999 each for your contact — capped at four, ever.",
];

export default function PostProjectSuccess({
  title,
  email,
}: {
  title: string;
  email: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.9 }}
      className="mx-auto w-full max-w-[729px] rounded-[18px] border border-brand/25 px-4 py-8 sm:px-8 sm:py-[30px]"
    >
      <div className="flex items-start gap-5">
        {/* Ring draws, then the tick draws inside it */}
        <svg
          viewBox="0 0 52 52"
          className="size-[52px] shrink-0"
          aria-hidden="true"
          fill="none"
        >
          <motion.circle
            cx="26"
            cy="26"
            r="23"
            className="stroke-brand/40"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            style={{ rotate: -90, transformOrigin: "center" }}
          />
          <motion.path
            d="M16.5 26.5 L23 33 L36 19.5"
            className="stroke-brand"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
              delay: reduce ? 0 : 0.42,
            }}
          />
        </svg>

        <div className="min-w-0">
          <h2 className="display text-[26px] leading-tight text-brand">
            Your project is in review
          </h2>
          <p className="mt-2 font-body text-[15px] leading-[1.5] font-light text-ink-soft">
            We have “{title.trim()}” and will confirm at{" "}
            <span className="font-normal text-brand">
              {email.trim().toLowerCase()}
            </span>
            .
          </p>
        </div>
      </div>

      <ol className="mt-8 space-y-3 border-t border-brand/15 pt-6">
        {NEXT.map((step, i) => (
          <li
            key={step}
            className="flex gap-3 font-body text-[14px] leading-[1.5] font-light text-ink-soft"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand/10 text-[12px] font-medium text-brand">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <Link
        to="/opportunities"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-display text-[17.8px] text-white transition-transform hover:-translate-y-px"
      >
        See who's already posting
        <ArrowRight className="size-[18px]" />
      </Link>
    </motion.div>
  );
}
