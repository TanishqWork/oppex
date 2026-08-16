import PartnerFaq from "../components/partners/PartnerFaq";
import PartnersHero from "../components/partners/PartnersHero";
import UnlockMath from "../components/partners/UnlockMath";
import UnlockSteps from "../components/partners/UnlockSteps";
import WaitlistCTA from "../components/WaitlistCTA";

/* Figma: "Oppurtunity ex" / Frame 34 (node 185:1311). */
export default function Partners() {
  return (
    <>
      <PartnersHero />
      <UnlockMath />
      <UnlockSteps />
      <PartnerFaq />
      <WaitlistCTA source="partners" />
    </>
  );
}
