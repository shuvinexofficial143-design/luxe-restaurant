import type { GalleryItem } from "@/lib/media/types";

export default function MediaStats({
  items,
}: {
  items: GalleryItem[];
}) {
  const categories = new Set(items.map((item) => item.category)).size;

  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        [String(items.length), "photos"],
        [String(categories), "collections"],
        [String(items.filter((item) => item.featured).length), "featured"],
      ].map(([value, label]) => (
        <div
          key={label}
          className="rounded-[18px] bg-[#fffaf4] p-3 text-center"
        >
          <p className="lx-serif text-2xl text-[#7c241e]">{value}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[.11em] text-[#75645d]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
