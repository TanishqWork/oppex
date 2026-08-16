/*
 * Sample marketplace data for the Explore page (Figma Frame 32, node 179:2629).
 *
 * The Figma frame repeats one placeholder listing nine times; these vary the
 * cloud, industry, budget and title so the grid reads like a real marketplace.
 * Swap this module for an API call when the backend exists — the components
 * only depend on the types below.
 */

export type Opportunity = {
  id: string;
  cloud: string;
  industry: string;
  verified: boolean;
  postedAgo: string;
  title: string;
  summary: string;
  budget: string;
  duration: string;
  location: string;
  company: string;
  contact: string;
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "op-1041",
    cloud: "Data Cloud",
    industry: "Financial Services",
    verified: true,
    postedAgo: "2 days ago",
    title: "Data Cloud unification across 12 systems",
    summary:
      "Implement Salesforce Data Cloud to unify customer data across 12 disparate systems. Requires experience with real-time CDP architecture and identity resolution at enterprise scale.",
    budget: "₹40L – ₹80L",
    duration: "6 Months",
    location: "Remote / India",
    company: "CloudPrism Solutions",
    contact: "procurement@cloudprism.io",
  },
  {
    id: "op-1042",
    cloud: "Agentforce",
    industry: "Healthcare",
    verified: true,
    postedAgo: "3 days ago",
    title: "Agentforce rollout for patient support",
    summary:
      "Deploy Agentforce across a 400-seat patient support centre. Needs deep prompt design experience, HIPAA-aware data handling and integration with an existing Service Cloud org.",
    budget: "₹60L – ₹1.2Cr",
    duration: "8 Months",
    location: "Hybrid / Bengaluru",
    company: "Meridian Health Group",
    contact: "tech.partners@meridianhg.com",
  },
  {
    id: "op-1043",
    cloud: "Revenue Cloud",
    industry: "Manufacturing",
    verified: true,
    postedAgo: "4 days ago",
    title: "CPQ and billing migration from legacy ERP",
    summary:
      "Migrate quoting and billing off a legacy SAP stack onto Revenue Cloud. Complex product catalogue with 4,000+ SKUs, tiered pricing and multi-currency contract management.",
    budget: "₹80L – ₹1.5Cr",
    duration: "10 Months",
    location: "On-site / Pune",
    company: "Arclight Industries",
    contact: "vendor.desk@arclight.in",
  },
  {
    id: "op-1044",
    cloud: "MuleSoft",
    industry: "Logistics",
    verified: true,
    postedAgo: "5 days ago",
    title: "MuleSoft integration layer for fleet telemetry",
    summary:
      "Build an API-led integration layer connecting fleet telemetry, warehouse management and Salesforce. High-throughput event streaming with sub-second latency requirements.",
    budget: "₹35L – ₹70L",
    duration: "5 Months",
    location: "Remote / India",
    company: "Northwind Freight",
    contact: "it.sourcing@northwindfreight.com",
  },
  {
    id: "op-1045",
    cloud: "Marketing Cloud",
    industry: "Retail",
    verified: true,
    postedAgo: "6 days ago",
    title: "Marketing Cloud journeys for a 2M-member loyalty base",
    summary:
      "Design and implement lifecycle journeys for a two-million-member loyalty programme. Requires Journey Builder depth, SQL segmentation and a clean migration off an incumbent ESP.",
    budget: "₹45L – ₹90L",
    duration: "7 Months",
    location: "Hybrid / Mumbai",
    company: "Kesari Retail Group",
    contact: "digital@kesariretail.com",
  },
  {
    id: "op-1046",
    cloud: "Service Cloud",
    industry: "Telecom",
    verified: true,
    postedAgo: "1 week ago",
    title: "Service Cloud consolidation across three regions",
    summary:
      "Consolidate three regional Service Cloud orgs into a single instance without disrupting a 24/7 support operation. Heavy data migration and change-management component.",
    budget: "₹1Cr – ₹2Cr",
    duration: "12 Months",
    location: "On-site / Gurugram",
    company: "Vantel Communications",
    contact: "partner.intake@vantel.co",
  },
  {
    id: "op-1047",
    cloud: "CPQ",
    industry: "Energy",
    verified: true,
    postedAgo: "1 week ago",
    title: "CPQ for long-cycle infrastructure contracts",
    summary:
      "Configure CPQ for multi-year infrastructure deals with milestone billing, escalation clauses and joint-venture splits. Prior experience with capital projects strongly preferred.",
    budget: "₹55L – ₹95L",
    duration: "9 Months",
    location: "Remote / India",
    company: "Solaris Power Partners",
    contact: "contracts@solarispower.in",
  },
  {
    id: "op-1048",
    cloud: "Industry Clouds",
    industry: "Insurance",
    verified: true,
    postedAgo: "2 weeks ago",
    title: "Financial Services Cloud claims transformation",
    summary:
      "Re-platform the claims journey on Financial Services Cloud, including underwriting workflows, document automation and an IRDAI-compliant audit trail across every touchpoint.",
    budget: "₹70L – ₹1.4Cr",
    duration: "11 Months",
    location: "Hybrid / Hyderabad",
    company: "Suraksha General Insurance",
    contact: "vendors@surakshagi.com",
  },
  {
    id: "op-1049",
    cloud: "Data Cloud",
    industry: "Education",
    verified: true,
    postedAgo: "2 weeks ago",
    title: "Student 360 on Data Cloud and Education Cloud",
    summary:
      "Build a unified student profile spanning admissions, learning and alumni systems. Requires identity resolution across nine source systems and consent-aware activation.",
    budget: "₹30L – ₹60L",
    duration: "6 Months",
    location: "Remote / India",
    company: "Ashwin Institute of Technology",
    contact: "procurement@ashwin.edu.in",
  },
];

export type ActivityItem = { title: string; meta: string; tone: string };

export const HAPPENING_NOW: ActivityItem[] = [
  { title: "Revenue Cloud deal posted", meta: "NBFC · ₹80L · 4 min ago", tone: "bg-live" },
  { title: "Agentforce deal verified", meta: "Healthcare · USA · 38 min ago", tone: "bg-brand" },
  { title: "MuleSoft contact unlocked", meta: "Partner from Pune · 1 hr ago", tone: "bg-amber-500" },
  { title: "Data Cloud deal posted", meta: "Retail · ₹55L · 3 hrs ago", tone: "bg-blush" },
];

export type TrendingItem = { label: string; delta: number };

export const HOT_THIS_WEEK: TrendingItem[] = [
  { label: "⚡ Agentforce", delta: 34 },
  { label: "📊 Data Cloud", delta: 28 },
  { label: "💰 Revenue Cloud", delta: 21 },
];
