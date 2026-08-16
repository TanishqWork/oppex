import { Chevron } from "../icons";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const box =
  "inline-flex h-[42px] items-center gap-2 rounded border border-[#d4d5d9] px-4 text-[16px] font-bold text-[#282c3f] " +
  "transition-colors hover:border-[#282c3f] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#d4d5d9]";

export default function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <nav
      aria-label="Opportunity pages"
      className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-[#edebef] pt-10"
    >
      <span className="text-[16px] font-bold text-[#282c3f]">Page {page}</span>

      <button
        type="button"
        className={box}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        <Chevron dir="left" className="size-3" />
        Previous
      </button>

      <span className="text-[14px] text-[#535766]">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        className={box}
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
        <Chevron dir="right" className="size-3" />
      </button>
    </nav>
  );
}
