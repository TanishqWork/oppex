import { CheckCircle, ClockIcon, SearchIcon, WalletIcon } from "../icons";

const STATS = [
  { icon: CheckCircle, label: "356 live opportunities", size: "text-[14px]" },
  { icon: ClockIcon, label: "Updated 4 minutes ago", size: "text-[12px]" },
  {
    icon: WalletIcon,
    label: "₹214Cr in combined budgets",
    size: "text-[12px]",
  },
];

export default function ExploreHero() {
  return (
    <section className="bg-page pt-20 pb-16">
      <div className="mx-auto flex w-full max-w-[1272px] flex-col items-center px-6 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-[11px]">
          <span className="size-2 rounded-full bg-live" />
          <span className="text-[12px] text-brand">Live Marketplace</span>
        </div>

        <h1 className="display mt-14 max-w-[1090px] text-[clamp(40px,7vw,88px)] leading-[1.02] text-ink">
          356 Salesforce deals. <br />
          Zero cold outreach.
        </h1>

        {/* Search — Figma: 872x70, brand @10%, r20, inset button */}
        <form
          className="mt-14 flex h-[70px] w-full max-w-[872px] items-center gap-3 rounded-[20px] bg-brand/10 pr-[15px] pl-[14px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="explore-search" className="sr-only">
            Search opportunities
          </label>
          <SearchIcon className="size-6 shrink-0 text-brand" />
          <input
            id="explore-search"
            type="search"
            placeholder="Search by cloud, industry or keyword - e.g. ‘Agentforce healthcare’"
            className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-brand placeholder:text-brand/70 focus:outline-none"
          />
          <button
            type="submit"
            className="h-10 shrink-0 rounded-xl bg-brand px-5 font-display text-[16px] text-white transition-transform hover:-translate-y-px"
          >
            Search
          </button>
        </form>

        <ul className="mt-11 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {STATS.map(({ icon: Icon, label, size }) => (
            <li
              key={label}
              className={`flex items-center gap-2 text-brand ${size}`}
            >
              <Icon className="size-[17px] shrink-0 text-verified" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
