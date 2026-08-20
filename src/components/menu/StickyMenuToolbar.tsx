import type { MenuFilters } from "@/lib/menu/types";
import MenuSearch from "./MenuSearch";
import MenuFilterBar from "./MenuFilterBar";

export default function StickyMenuToolbar({
  filters,
  onChange,
}: {
  filters: MenuFilters;
  onChange: (next: MenuFilters) => void;
}) {
  return (
    <div className="sticky top-[80px] z-30 -mx-3 border-y border-[#4a3025]/8 bg-[#f7f1e8]/94 px-3 py-3 backdrop-blur-xl md:top-[92px] md:mx-0 md:rounded-[24px] md:border">
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
        <MenuSearch value={filters.query} onChange={(query) => onChange({ ...filters, query })} />
        <MenuFilterBar filters={filters} onChange={onChange} />
      </div>
    </div>
  );
}
