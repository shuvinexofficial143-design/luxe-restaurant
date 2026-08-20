import type { TableOption } from "@/lib/reservations/types";

export default function TableCard({
  table,
  active,
  onSelect,
}: {
  table: TableOption;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-[18px] border p-3 text-left transition ${
        active
          ? "border-[#7c241e] bg-[#7c241e] text-white"
          : "border-[#4a3025]/10 bg-[#fffaf4]"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="lx-serif text-xl">{table.label}</span>
        <span className="text-[8px] uppercase tracking-[.1em]">{table.seats} seats</span>
      </div>
      <p className="mt-2 text-[10px] leading-5 opacity-65">{table.note}</p>
      {table.premium ? (
        <span className="mt-2 inline-flex rounded-full bg-[#d89a4b]/15 px-2 py-1 text-[7px] uppercase tracking-[.1em]">
          premium
        </span>
      ) : null}
    </button>
  );
}
