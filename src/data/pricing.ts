export type Plan = {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  features: string[];
  cta: string;
  /* The middle plan is emphasised in the design: filled card, blush
     border, blush button and a ribbon above it. */
  featured?: boolean;
  ribbon?: string;
};

/* Figma Frame 13 (node 53:7845) — the "For partners" side of the toggle. */
export const PARTNER_PLANS: Plan[] = [
  {
    name: "Explorer",
    tagline: "See what's on the table",
    price: "₹0",
    unit: "forever",
    features: [
      "Browse all 356 live opportunities",
      "Full scope, budget & timeline visible",
      "Save up to 5 opportunities",
      "Filter by cloud, budget, region",
    ],
    cta: "Start browsing",
  },
  {
    name: "Pay Per Unlock",
    tagline: "For your first deals",
    price: "₹999",
    unit: "per unlock",
    features: [
      "Full contact revealed: name, email, phone, LinkedIn, website",
      "Yours permanently — no expiry on unlocked contacts",
      "Max 4 partners ever get the same contact",
      "Bad contact? Credited back, no questions",
    ],
    cta: "Get Started",
    featured: true,
    ribbon: "Most partners start here",
  },
  {
    name: "Credit Pack",
    tagline: "For your first deals",
    price: "₹4,999",
    unit: "6 unlocks · ₹833 each",
    features: [
      "Everything in Pay Per Unlock",
      "Instant alerts when matching deals go live",
      "Priority support on WhatsApp",
      "Credits valid 12 months",
    ],
    cta: "Buy credit pack",
  },
];

/*
 * The "For companies" side of the toggle — Figma Frame 33 (node 185:888).
 * It is not a card grid like the partner side, but a single centred
 * statement, so it has its own shape.
 */
export const COMPANY_OFFER = {
  heading: "Posting is free. It will always be free.",
  body: "Partners pay to reach you — you never pay us anything. Post your Salesforce requirement, get verified within 24 hours, and let a maximum of 4 qualified partners come to you. Your identity stays hidden until someone pays to unlock it, which means every partner who contacts you has already invested in the conversation.",
  price: "₹0",
  note: "To post · To get verified · To receive partners Forever.",
  cta: "Post your project free",
};
