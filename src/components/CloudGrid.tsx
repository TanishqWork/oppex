type Cell = {
  emoji: string;
  title: string;
  deals: number;
  /* position within the 1065x593 Figma collage */
  x: number;
  y: number;
  w: number;
  tone: "white" | "tile";
};

const CELLS: Cell[] = [
  { emoji: "🧮", title: "CPQ", deals: 64, x: 278, y: 0, w: 397, tone: "white" },
  {
    emoji: "🔗",
    title: "MuleSoft",
    deals: 64,
    x: 81,
    y: 197,
    w: 198,
    tone: "tile",
  },
  {
    emoji: "💰",
    title: "Revenue Cloud",
    deals: 64,
    x: 279,
    y: 197,
    w: 198,
    tone: "white",
  },
  {
    emoji: "📊",
    title: "Data Cloud",
    deals: 64,
    x: 477,
    y: 197,
    w: 198,
    tone: "white",
  },
  {
    emoji: "📣",
    title: "Marketing Cloud",
    deals: 64,
    x: 754,
    y: 197,
    w: 198,
    tone: "tile",
  },
  {
    emoji: "🎧",
    title: "Service Cloud",
    deals: 64,
    x: 0,
    y: 395,
    w: 198,
    tone: "white",
  },
  {
    emoji: "⚡",
    title: "Agentforce",
    deals: 64,
    x: 278,
    y: 395,
    w: 397,
    tone: "white",
  },
  {
    emoji: "☁️",
    title: "Industry Clouds",
    deals: 64,
    x: 754,
    y: 395,
    w: 198,
    tone: "tile",
  },
];

/* Flat squares, rotated diamonds and dot ticks that sit behind the tiles. */
const SQUARES = [
  { x: 198, y: 513, s: 80, fill: "var(--color-tile)" },
  { x: 674, y: 513, s: 80, fill: "var(--color-tile-soft)" },
];
const DIAMONDS = [
  { x: 165, y: 84, s: 113 },
  { x: 952, y: 480, s: 113 },
];
const DOTS = [
  { x: 78, y: 194 },
  { x: 751, y: 194 },
  { x: 194, y: 391 },
  { x: 671, y: 509 },
];

function CellBody({ cell }: { cell: Cell }) {
  return (
    <>
      <span className="text-[40px] leading-none">{cell.emoji}</span>
      <div className="mt-auto">
        <h3 className="text-[19px] font-semibold text-black">{cell.title}</h3>
        <p className="mt-1 text-[12px] text-black">
          <span className="text-brand">{cell.deals}</span> deals waiting
        </p>
      </div>
    </>
  );
}

const toneClass = (t: Cell["tone"]) => (t === "white" ? "bg-white" : "bg-tile");

/* Lift the tile and float it above its neighbours on hover. Purely
   decorative for now — give these real category routes and they should
   become links so keyboard users get the same affordance. */
const HOVER =
  "cursor-pointer transition-[transform,box-shadow] duration-300 ease-out " +
  "hover:z-20 hover:-translate-y-2 hover:shadow-[0_18px_40px_-12px_rgba(15,15,15,0.28)] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export default function CloudGrid() {
  return (
    <section id="explore" className="bg-page py-[120px]">
      <div className="mx-auto w-full max-w-[1272px] px-6">
        <h2 className="display max-w-[671px] text-[clamp(36px,5vw,66px)] text-black">
          Where is your next <br />
          deal hiding?
        </h2>
        <p className="mt-8 max-w-[720px] font-body text-[20px] leading-[1.5] font-light text-ink-soft">
          356 verified projects across the entire ecosystem — updated daily.
          Pick your cloud and see what's waiting.
        </p>

        {/* Desktop: the exact offset collage from the design */}
        <div className="mt-20 hidden justify-center xl:flex">
          <div className="relative h-[593px] w-[1065px]" aria-hidden="false">
            {SQUARES.map((sq, i) => (
              <span
                key={`sq-${i}`}
                className="absolute"
                style={{
                  left: sq.x,
                  top: sq.y,
                  width: sq.s,
                  height: sq.s,
                  background: sq.fill,
                }}
              />
            ))}
            {DIAMONDS.map((d, i) => (
              <span
                key={`dm-${i}`}
                className="absolute bg-tile-soft"
                style={{
                  left: d.x,
                  top: d.y,
                  width: d.s,
                  height: d.s,
                  transform: "rotate(45deg)",
                }}
              />
            ))}
            {DOTS.map((d, i) => (
              <span
                key={`dot-${i}`}
                className="absolute size-[7px] bg-black"
                style={{ left: d.x, top: d.y }}
              />
            ))}
            {CELLS.map((c) => (
              <article
                key={c.title}
                className={`absolute flex flex-col p-[15px] ${toneClass(c.tone)} ${HOVER}`}
                style={{ left: c.x, top: c.y, width: c.w, height: 198 }}
              >
                <CellBody cell={c} />
              </article>
            ))}
          </div>
        </div>

        {/* Below xl: same tiles, plain responsive grid */}
        <div className="mt-16 grid grid-cols-1 gap-px bg-tile-soft sm:grid-cols-2 lg:grid-cols-3 xl:hidden">
          {CELLS.map((c) => (
            <article
              key={c.title}
              className={`relative flex h-[198px] flex-col p-[15px] ${toneClass(c.tone)} ${HOVER}`}
            >
              <CellBody cell={c} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
