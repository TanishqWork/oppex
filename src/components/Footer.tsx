import { Link } from "react-router";

import { useIsDarkRoute } from "../lib/routeTheme";

/* `to` routes client-side; anything without one is still a placeholder. */
type FooterLink = { label: string; to?: string };

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Marketplace",
    links: [
      { label: "Oppurtunities", to: "/opportunities" },
      { label: "Partners", to: "/partners" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    heading: "For partners",
    links: [
      { label: "Join as partner", to: "/partners" },
      { label: "How verification works", to: "/partners" },
      { label: "Pricing", to: "/pricing" },
      { label: "Post a requirement" },
    ],
  },
  {
    heading: "Important links",
    links: [
      { label: "Home", to: "/" },
      { label: "Login" },
      { label: "Get oppurtunity", to: "/opportunities" },
    ],
  },
  {
    heading: "Follow us on",
    links: [
      { label: "Linkedin" },
      { label: "Instagram" },
      { label: "Twitter" },
      { label: "Ambitionbox" },
    ],
  },
];

const footerLinkClass =
  "text-[15.5px] font-medium transition-opacity hover:opacity-70";

const SOCIALS = [
  {
    label: "LinkedIn",
    path: "M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.2 9h3.6v11.5H3.2V9Zm6.1 0h3.45v1.57h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.3 2.36 4.3 5.43V20.5h-3.6v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V20.5H9.3V9Z",
  },
  {
    label: "X",
    path: "M17.5 3h3l-6.6 7.55L21.7 21h-6.1l-4.28-5.6L6.4 21H3.4l7.06-8.07L2.6 3h6.25l3.87 5.12L17.5 3Zm-1.05 16.2h1.66L7.7 4.7H5.92l10.53 14.5Z",
  },
  {
    label: "Instagram",
    path: "M12 7.8a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Zm0 6.93a2.73 2.73 0 1 1 0-5.46 2.73 2.73 0 0 1 0 5.46Zm5.35-7.1a.98.98 0 1 1-1.96 0 .98.98 0 0 1 1.96 0ZM12 3.5c-2.3 0-2.6.01-3.5.05-.9.04-1.52.19-2.06.4a4.15 4.15 0 0 0-1.5.98c-.44.44-.72.88-.98 1.5-.21.54-.36 1.16-.4 2.06C3.51 9.4 3.5 9.7 3.5 12s.01 2.6.05 3.5c.4.9.19 1.52.4 2.06.26.62.54 1.06.98 1.5.44.44.88.72 1.5.98.54.21 1.16.36 2.06.4.9.04 1.2.05 3.5.05s2.6-.01 3.5-.05c.9-.04 1.52-.19 2.06-.4a4.15 4.15 0 0 0 1.5-.98c.44-.44.72-.88.98-1.5.21-.54.36-1.16.4-2.06.04-.9.05-1.2.05-3.5s-.01-2.6-.05-3.5c-.04-.9-.19-1.52-.4-2.06a4.15 4.15 0 0 0-.98-1.5 4.15 4.15 0 0 0-1.5-.98c-.54-.21-1.16-.36-2.06-.4-.9-.04-1.2-.05-3.5-.05Zm0 1.47c2.26 0 2.53.01 3.42.05.83.04 1.28.18 1.58.3.4.15.68.33.98.63.3.3.48.58.63.98.12.3.26.75.3 1.58.04.89.05 1.16.05 3.42s-.01 2.53-.05 3.42c-.4.83-.18 1.28-.3 1.58-.15.4-.33.68-.63.98-.3.3-.58.48-.98.63-.3.12-.75.26-1.58.3-.89.04-1.16.05-3.42.05s-2.53-.01-3.42-.05c-.83-.04-1.28-.18-1.58-.3a2.65 2.65 0 0 1-.98-.63 2.65 2.65 0 0 1-.63-.98c-.12-.3-.26-.75-.3-1.58C4.98 14.53 4.97 14.26 4.97 12s.01-2.53.05-3.42c.04-.83.18-1.28.3-1.58.15-.4.33-.68.63-.98.3-.3.58-.48.98-.63.3-.12.75-.26 1.58-.3.89-.04 1.16-.05 3.42-.05Z",
  },
];

export default function Footer() {
  const dark = useIsDarkRoute();

  return (
    <footer
      className={`pt-[60px] pb-[90px] text-white ${dark ? "bg-ink-soft" : "bg-brand"}`}
    >
      <div className="mx-auto w-full max-w-[1272px] px-6">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_repeat(4,minmax(0,auto))] lg:gap-20">
          <div>
            <p className="text-[45px] leading-none font-bold">Oppurtunity</p>
            <ul className="mt-8 flex items-center gap-4">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    aria-label={s.label}
                    className="block transition-opacity hover:opacity-70"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-[17px] fill-white"
                      aria-hidden="true"
                    >
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading}>
              <h2 className="text-[16px] font-medium">{col.heading}</h2>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to} className={footerLinkClass}>
                        {l.label}
                      </Link>
                    ) : (
                      <a href="#" className={footerLinkClass}>
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
