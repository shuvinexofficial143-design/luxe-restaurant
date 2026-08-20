import Link from "next/link";
import type { CMSItem } from "@/lib/cms/types";
import { cmsMoney, publicPreviewHref } from "@/lib/cms/utils";
import CMSStatusBadge from "./CMSStatusBadge";

export default function CMSItemCard({
  item,
  onEdit,
}: {
  item: CMSItem;
  onEdit: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[24px] bg-[#fffaf4]">
      <div
        className="h-[180px] bg-[#ded4c9] bg-cover bg-center"
        style={item.image ? { backgroundImage: `url("${item.image}")` } : undefined}
      />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[8px] uppercase tracking-[.11em] text-[#7c241e]">
              {item.category}
            </p>
            <h3 className="lx-serif mt-1 text-2xl">{item.title}</h3>
          </div>
          <CMSStatusBadge status={item.status} />
        </div>

        <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-[#75645d]">
          {item.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[10px] text-[#7c241e]">
            {item.price ? cmsMoney(item.price) : item.featured ? "Featured" : "Standard"}
          </span>

          <div className="flex gap-2">
            <Link
              href={publicPreviewHref(item)}
              className="rounded-full border border-[#4a3025]/10 px-3 py-2 text-[8px] uppercase tracking-[.09em]"
            >
              Preview
            </Link>
            <button
              type="button"
              onClick={onEdit}
              className="rounded-full bg-[#201713] px-3 py-2 text-[8px] uppercase tracking-[.09em] text-white"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
