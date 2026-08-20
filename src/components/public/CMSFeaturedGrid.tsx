import Link from "next/link";
import type { PublicContentItem } from "@/lib/public-content/types";

export default function CMSFeaturedGrid({
  items,
  hrefBase,
}: {
  items: PublicContentItem[];
  hrefBase: string;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`${hrefBase}/${encodeURIComponent(item.slug)}`}
          className="overflow-hidden rounded-[24px] bg-[#fffaf4]"
        >
          <div
            className="h-[220px] bg-[#ddd] bg-cover bg-center"
            style={
              item.image_url
                ? { backgroundImage: `url("${item.image_url}")` }
                : undefined
            }
          />
          <div className="p-5">
            <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
              {item.category}
            </p>
            <h2 className="lx-serif mt-2 text-3xl">{item.title}</h2>
            <p className="mt-3 line-clamp-3 text-[10px] leading-5 text-[#75645d]">
              {item.excerpt}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
