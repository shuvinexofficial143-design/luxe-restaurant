"use client";

export default function WineSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">Search wines</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search wine, grape, region..."
        className="h-12 w-full rounded-[18px] border border-[#4a3025]/10 bg-[#fffaf4] pl-11 pr-4 text-sm outline-none focus:border-[#7c241e]/40"
      />
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7c241e]">
        ⌕
      </span>
    </label>
  );
}
