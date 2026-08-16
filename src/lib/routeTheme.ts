import { useLocation } from "react-router";

/*
 * Most pages sit on the light `--color-page` shell. Figma Frame 13 (Pricing)
 * is drawn dark instead — charcoal plate, blush nav links, dark waitlist CTA
 * and footer. Rather than fork Nav/Footer/WaitlistCTA, those components ask
 * this hook which shell they're rendering into.
 *
 * Add a route here to make it dark; nothing else needs to change.
 */
export const DARK_ROUTES = new Set<string>(["/pricing"]);

export function useIsDarkRoute(): boolean {
  const { pathname } = useLocation();
  return DARK_ROUTES.has(pathname.replace(/\/+$/, "") || "/");
}
