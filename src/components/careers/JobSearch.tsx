"use client";

export default function JobSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">Search jobs</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search role, department, location..."
        className="h-12 w-full rounded-[18px] border border-[#4a3025]/10 bg-white pl-11 pr-4 text-sm outline-none"
      />
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7c241e]">
        ⌕
      </span>
    </label>
  );
}
