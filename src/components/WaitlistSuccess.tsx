import confetti from "canvas-confetti";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* Displayed count before this signup — matches the "340+ partners already
   waiting" line in the design. */
const BASE_COUNT = 340;

type Props = {
  email: string;
  duplicate: boolean;
  dark: boolean;
};

/* Brand palette, so the burst reads as ours rather than generic party. */
const CONFETTI_COLORS = ["#2052eb", "#fadbe5", "#03c685", "#ffffff"];

function fireConfetti(origin: { x: number; y: number }) {
  const shared = {
    origin,
    colors: CONFETTI_COLORS,
    disableForReducedMotion: true,
  };
  /* Two overlapping cones read fuller than one wide spray, and stay
     tight enough not to cover the copy. */
  confetti({
    ...shared,
    particleCount: 38,
    spread: 58,
    startVelocity: 42,
    scalar: 0.9,
  });
  confetti({
    ...shared,
    particleCount: 18,
    spread: 90,
    startVelocity: 28,
    scalar: 0.65,
    ticks: 160,
  });
}

export default function WaitlistSuccess({ email, duplicate, dark }: Props) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  /* A duplicate adds nobody, and reduced-motion users get the final value
     immediately — both are known at render, so neither needs an effect. */
  const [count, setCount] = useState(() =>
    duplicate || reduce ? BASE_COUNT + 1 : BASE_COUNT,
  );

  useEffect(() => {
    /* Celebrate a real signup only. A duplicate is information, not an
       achievement, so it gets the card without the burst. */
    if (reduce || duplicate) return;

    /* Burst from the card itself, so the celebration is anchored to the
       thing the user just acted on rather than the middle of the screen. */
    const t1 = window.setTimeout(() => {
      const r = cardRef.current?.getBoundingClientRect();
      const origin = r
        ? {
            x: (r.left + r.width / 2) / window.innerWidth,
            y: (r.top + r.height / 2) / window.innerHeight,
          }
        : { x: 0.5, y: 0.5 };
      fireConfetti(origin);
    }, 420);

    /* Tick the counter after the check lands, not alongside it. */
    const t2 = window.setTimeout(() => setCount(BASE_COUNT + 1), 900);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduce, duplicate]);

  const panel = dark ? "bg-white/[0.06]" : "bg-white/10";

  return (
    <motion.div
      ref={cardRef}
      initial={reduce ? false : { opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.9 }}
      className={`mt-10 flex max-w-[560px] items-start gap-5 rounded-2xl ${panel} p-6 backdrop-blur-sm`}
    >
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
          className="stroke-blush"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{ rotate: -90, transformOrigin: "center" }}
        />
        <motion.path
          d="M16.5 26.5 L23 33 L36 19.5"
          className="stroke-white"
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
        <p className="display text-[26px] leading-tight text-white">
          {duplicate ? "You're already on the list" : "You're on the list"}
        </p>

        <p className="mt-2 font-body text-[15px] leading-[1.5] font-light text-white/85">
          {duplicate ? (
            <>We already have {email} — we'll be in touch at launch.</>
          ) : (
            <>
              We'll email{" "}
              <span className="font-normal text-blush">{email}</span> when early
              access opens.
            </>
          )}
        </p>

        <p className="mt-4 font-body text-[13px] font-light text-white/70">
          <motion.span
            key={count}
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="inline-block font-medium text-blush tabular-nums"
          >
            #{count}
          </motion.span>{" "}
          on the waitlist · Your first unlock is free
        </p>
      </div>
    </motion.div>
  );
}
