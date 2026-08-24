import CloudGrid from "../components/CloudGrid";
import ForCompanies from "../components/ForCompanies";
import ForPartners from "../components/ForPartners";
import FreshOpportunities from "../components/FreshOpportunities";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Verification from "../components/Verification";
import WaitlistCTA from "../components/WaitlistCTA";

/* Figma: "Oppurtunity ex" / Frame 18 (node 158:450). */
export default function Landing() {
  return (
    <>
      <Hero />
      <FreshOpportunities />
      <CloudGrid />
      <ForCompanies />
      <ForPartners />
      <HowItWorks />
      <Verification />
      <WaitlistCTA source="landing" />
    </>
  );
}
