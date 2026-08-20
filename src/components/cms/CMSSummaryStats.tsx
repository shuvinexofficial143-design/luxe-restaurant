"use client";

import { useSyncExternalStore } from "react";
import { cmsStore } from "@/lib/cms/storage";

export default function CMSSummaryStats() {
  useSyncExternalStore(
    cmsStore.subscribe,
    cmsStore.getVersion,
    cmsStore.getServerVersion
  );

  const items = cmsStore.list();
  const values = [
    [String(items.length), "content items"],
    [String(items.filter((item) => item.status === "PUBLISHED").length), "published"],
    [String(items.filter((item) => item.status === "DRAFT").length), "drafts"],
    [String(cmsStore.approvals().filter((item) => item.status === "PENDING").length), "pending approvals"],
  ];

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {values.map(([value, label]) => (
        <div key={label} className="rounded-[20px] bg-[#fffaf4] p-4 text-center">
          <p className="lx-serif text-3xl text-[#7c241e]">{value}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
