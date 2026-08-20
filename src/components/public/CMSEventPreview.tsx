import Link from "next/link";
import type { PublicContentItem } from "@/lib/public-content/types";

export default function CMSEventPreview({
  items,
  locale,
}: {
  items: PublicContentItem[];
  locale: "en" | "hi";
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/${locale}/events/live/${encodeURIComponent(item.slug)}`}
          className="rounded-[24px] bg-[#fffaf4] p-5"
        >
          <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
            {item.category || "Event"}
          </p>
          <h2 className="lx-serif mt-2 text-3xl">{item.title}</h2>
          <p className="mt-3 text-[10px] leading-5 text-[#75645d]">
            {item.excerpt}
          </p>
        </Link>
      ))}
    </div>
  );
}
