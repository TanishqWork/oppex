/*
 * Options for the "Post a project" form (Figma Frame 35, node 255:921).
 *
 * The design ships the selects closed, showing only their placeholders, so
 * these lists are derived from the rest of the site: the products are the
 * eight clouds from the landing collage, and the budget bands and timelines
 * bracket the ranges used across the marketplace listings.
 */

export const SALESFORCE_PRODUCTS = [
  "Agentforce",
  "CPQ",
  "Data Cloud",
  "Industry Clouds",
  "Marketing Cloud",
  "MuleSoft",
  "Revenue Cloud",
  "Service Cloud",
  "Something else",
] as const;

export const BUDGET_RANGES = [
  "Under ₹10L",
  "₹10L – ₹40L",
  "₹40L – ₹80L",
  "₹80L – ₹1.5Cr",
  "₹1.5Cr and above",
] as const;

export const TIMELINES = [
  "Under 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "12 months or more",
  "Not sure yet",
] as const;

/* The three reassurances under the form. The design uses pixel-art emoji
   images; the rest of the site sets emoji as text, so these follow suit. */
export const POST_TRUST = [
  {
    emoji: "🕶️",
    title: "Anonymous listing",
    body: "Your name is blurred until unlocked",
  },
  {
    emoji: "☎️",
    title: "Human verified",
    body: "A real person calls before anything goes live",
  },
  {
    emoji: "🎯",
    title: "Max 4 partners",
    body: "Quality conversations, not spam floods",
  },
] as const;
