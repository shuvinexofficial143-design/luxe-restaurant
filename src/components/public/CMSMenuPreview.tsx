import type { PublicContentItem } from "@/lib/public-content/types";

export default function CMSMenuPreview({
  items,
}: {
  items: PublicContentItem[];
}) {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.id}
          className="flex items-start justify-between gap-4 rounded-[18px] bg-[#fffaf4] p-4"
        >
          <div>
            <p className="text-[8px] uppercase tracking-[.09em] text-[#7c241e]">
              {item.category}
            </p>
            <h3 className="lx-serif mt-1 text-2xl">{item.title}</h3>
            <p className="mt-2 text-[9px] leading-5 text-[#75645d]">
              {item.excerpt}
            </p>
          </div>

          {typeof item.price === "number" ? (
            <span className="lx-serif shrink-0 text-xl text-[#335f50]">
              ₹{item.price.toLocaleString("en-IN")}
            </span>
          ) : null}
        </article>
      ))}
    </div>
  );
}
