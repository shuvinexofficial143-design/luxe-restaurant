"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { cmsCollectionMeta } from "@/lib/cms/data";
import { cmsStore } from "@/lib/cms/storage";
import type { CMSCollection } from "@/lib/cms/types";
import { collectionHref } from "@/lib/cms/utils";

export default function CMSOverview() {
  useSyncExternalStore(
    cmsStore.subscribe,
    cmsStore.getVersion,
    cmsStore.getServerVersion
  );

  const collections = Object.keys(cmsCollectionMeta) as CMSCollection[];

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {collections.map((collection) => {
        const items = cmsStore.list(collection);
        const published = items.filter((item) => item.status === "PUBLISHED").length;
        const drafts = items.filter((item) => item.status === "DRAFT").length;
        const meta = cmsCollectionMeta[collection];

        return (
          <Link
            key={collection}
            href={collectionHref(collection)}
            className="rounded-[24px] border border-[#4a3025]/10 bg-[#fffaf4] p-5"
          >
            <p className="text-[8px] uppercase tracking-[.12em] text-[#7c241e]">
              CMS Collection
            </p>
            <h2 className="lx-serif mt-2 text-3xl">{meta.label}</h2>
            <p className="mt-2 text-xs leading-6 text-[#75645d]">
              {meta.description}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                [String(items.length), "total"],
                [String(published), "published"],
                [String(drafts), "drafts"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[14px] bg-[#f3e7dc] p-3">
                  <p className="lx-serif text-2xl text-[#7c241e]">{value}</p>
                  <p className="mt-1 text-[8px] uppercase tracking-[.09em] text-[#75645d]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
