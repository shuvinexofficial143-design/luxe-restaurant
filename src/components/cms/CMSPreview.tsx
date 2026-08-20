"use client";

import { useState } from "react";
import { cmsStore } from "@/lib/cms/storage";
import { cmsMoney } from "@/lib/cms/utils";
import CMSStatusBadge from "./CMSStatusBadge";

export default function CMSPreview({
  id,
}: {
  id: string;
}) {
  const [item] = useState(() =>
    typeof window !== "undefined" ? cmsStore.get(id) : undefined
  );

  if (!item) {
    return (
      <div className="rounded-[28px] bg-[#fffaf4] p-8 text-center">
        <p className="lx-serif text-4xl">Content not found.</p>
      </div>
    );
  }

  return (
    <article className="overflow-hidden rounded-[30px] bg-[#fffaf4]">
      <div
        className="relative min-h-[50svh] bg-[#ddd] bg-cover bg-center"
        style={item.image ? { backgroundImage: `url("${item.image}")` } : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
            {item.collection} · {item.category}
          </p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">{item.title}</h1>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <CMSStatusBadge status={item.status} />
          <span className="lx-serif text-2xl text-[#7c241e]">
            {item.price ? cmsMoney(item.price) : item.featured ? "Featured" : ""}
          </span>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[#66534b]">
          {item.excerpt}
        </p>
        <p className="mt-5 rounded-[16px] bg-[#fff4de] p-3 text-[9px] leading-5 text-[#75645d]">
          CMS preview only. Public pages will be connected to a real backend/content API in the production backend phase.
        </p>
      </div>
    </article>
  );
}
