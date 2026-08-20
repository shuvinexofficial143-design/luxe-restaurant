import Link from "next/link";
import type { PublicContentItem } from "@/lib/public-content/types";

export default function CMSJournalPreview({
  items,
  locale,
}: {
  items: PublicContentItem[];
  locale: "en" | "hi";
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/${locale}/journal/live/${encodeURIComponent(item.slug)}`}
          className="grid gap-3 rounded-[20px] bg-[#fffaf4] p-4 md:grid-cols-[160px_1fr]"
        >
          <div
            className="min-h-[120px] rounded-[14px] bg-[#ddd] bg-cover bg-center"
            style={
              item.image_url
                ? { backgroundImage: `url("${item.image_url}")` }
                : undefined
            }
          />
          <div>
            <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
              {item.category}
            </p>
            <h3 className="lx-serif mt-2 text-3xl">{item.title}</h3>
            <p className="mt-2 text-[10px] leading-5 text-[#75645d]">
              {item.excerpt}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
