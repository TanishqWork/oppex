import { Link, NavLink } from "react-router";

import { useIsDarkRoute } from "../lib/routeTheme";

/* `to` renders a client-side <NavLink> (so the current page can be marked);
   `href` stays a plain anchor for sections without their own page yet. */
type NavLinkItem = { label: string; to?: string; href?: string };

const LINKS: NavLinkItem[] = [
  { label: "Exploare Oppurtunity", to: "/opportunities" },
  { label: "For Partners", to: "/partners" },
  { label: "Pricing", to: "/pricing" },
];

export default function Nav() {
  const dark = useIsDarkRoute();

  const base = "text-[16px] transition-opacity hover:opacity-70";
  const idle = dark ? "font-normal text-blush" : "font-medium text-brand";
  const active = dark ? "font-semibold text-white" : "font-semibold text-brand";

  return (
    <header className={`relative z-20 w-full ${dark ? "bg-ink-soft" : ""}`}>
      {/* 1fr / auto / 1fr keeps the link group optically centred in the bar
          regardless of how wide the logo and action buttons are. */}
      <nav className="mx-auto grid h-[90px] w-full max-w-[1364px] grid-cols-[1fr_auto_1fr] items-center gap-8 px-6">
        <Link
          to="/"
          className={`justify-self-start font-sans text-[36px] leading-none font-bold ${
            dark ? "text-blush" : "text-brand"
          }`}
        >
          op
        </Link>

        <ul className="col-start-2 hidden items-center gap-[52px] lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              {l.to ? (
                <NavLink
                  to={l.to}
                  end
                  className={({ isActive }) => `${base} ${isActive ? active : idle}`}
                >
                  {l.label}
                </NavLink>
              ) : (
                <a href={l.href} className={`${base} ${idle}`}>
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="col-start-3 flex items-center gap-3 justify-self-end">
          <a href="#signin" className={`hidden sm:inline ${base} ${idle}`}>
            Sign in
          </a>
          <a
            href="/#get-started"
            className={`rounded-[10px] bg-blush px-5 py-2.5 font-display text-[16px] transition-transform hover:-translate-y-px ${
              dark ? "text-ink-soft" : "text-brand-alt"
            }`}
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}
