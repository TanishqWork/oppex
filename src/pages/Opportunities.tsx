import { useState } from "react";

import ExploreHero from "../components/opportunities/ExploreHero";
import ExploreSidebar from "../components/opportunities/ExploreSidebar";
import OpportunityCard from "../components/opportunities/OpportunityCard";
import Pagination from "../components/opportunities/Pagination";
import WaitlistCTA from "../components/WaitlistCTA";
import { ChevronDown } from "../components/icons";
import { OPPORTUNITIES } from "../data/opportunities";

const SORTS = [
  "Newest first",
  "Oldest first",
  "Budget: high to low",
  "Budget: low to high",
] as const;

/* Figma: "Oppurtunity ex" / Frame 32 (node 179:2629). */
export default function Opportunities() {
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Newest first");
  const [page, setPage] = useState(1);

  /* Budget sorting keys off the lower bound of the range (in ₹ lakh). */
  const items = [...OPPORTUNITIES].sort((a, b) => {
    if (sort === "Oldest first") return 0;
    if (sort === "Newest first") return 0;
    const lo = (s: string) => {
      const m = s.match(/₹([\d.]+)(L|Cr)/);
      if (!m) return 0;
      return Number(m[1]) * (m[2] === "Cr" ? 100 : 1);
    };
    return sort === "Budget: high to low"
      ? lo(b.budget) - lo(a.budget)
      : lo(a.budget) - lo(b.budget);
  });

  const list = sort === "Oldest first" ? [...items].reverse() : items;

  return (
    <>
      <ExploreHero />

      <section className="bg-page pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Listings */}
            <div className="min-w-0 flex-1">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {list.map((item) => (
                  <OpportunityCard key={item.id} item={item} />
                ))}
              </div>

              <Pagination page={page} totalPages={1297} onChange={setPage} />
            </div>

            {/* Sort + sidebar rail */}
            <div className="flex w-full flex-col gap-3 lg:w-[317px] lg:shrink-0">
              <div className="relative h-[59px] w-full">
                <label htmlFor="explore-sort" className="sr-only">
                  Sort opportunities
                </label>
                <select
                  id="explore-sort"
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value as (typeof SORTS)[number])
                  }
                  className="h-full w-full appearance-none rounded-[13px] bg-brand/10 px-8 text-[14px] text-brand focus:outline-2 focus:outline-offset-2 focus:outline-brand"
                >
                  {SORTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-7 size-5 -translate-y-1/2 text-brand" />
              </div>

              <ExploreSidebar />
            </div>
          </div>
        </div>
      </section>

      <WaitlistCTA source="explore" />
    </>
  );
}
