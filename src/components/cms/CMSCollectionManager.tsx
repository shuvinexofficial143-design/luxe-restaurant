"use client";

import { useState, useSyncExternalStore } from "react";
import { cmsStore } from "@/lib/cms/storage";
import type { CMSCollection, CMSItem } from "@/lib/cms/types";
import CMSItemCard from "./CMSItemCard";
import CMSItemEditor from "./CMSItemEditor";
import CMSStatusTabs from "./CMSStatusTabs";

export default function CMSCollectionManager({
  collection,
}: {
  collection: CMSCollection;
}) {
  useSyncExternalStore(
    cmsStore.subscribe,
    cmsStore.getVersion,
    cmsStore.getServerVersion
  );

  const [editing, setEditing] = useState<CMSItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [status, setStatus] = useState<"ALL" | CMSItem["status"]>("ALL");

  const items = cmsStore
    .list(collection)
    .filter((item) => (status === "ALL" ? true : item.status === status))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_430px]">
      <div>
        <div className="rounded-[22px] bg-[#fffaf4] p-3">
          <div className="flex items-center justify-between gap-3">
            <CMSStatusTabs value={status} onChange={setStatus} />
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setCreating(true);
              }}
              className="shrink-0 rounded-full bg-[#7c241e] px-4 py-3 text-[8px] uppercase tracking-[.11em] text-white"
            >
              + New
            </button>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {items.length ? (
            items.map((item) => (
              <CMSItemCard
                key={item.id}
                item={item}
                onEdit={() => {
                  setCreating(false);
                  setEditing(item);
                }}
              />
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-[#4a3025]/15 bg-[#fffaf4] p-8 text-center md:col-span-2">
              <p className="lx-serif text-3xl">No content here.</p>
            </div>
          )}
        </div>
      </div>

      <div className="xl:sticky xl:top-[96px] xl:self-start">
        {creating || editing ? (
          <CMSItemEditor
            collection={collection}
            item={editing}
            onDone={() => {
              setCreating(false);
              setEditing(null);
            }}
          />
        ) : (
          <div className="rounded-[28px] bg-[#201713] p-6 text-white">
            <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
              Editor
            </p>
            <h3 className="lx-serif mt-2 text-4xl">Select content.</h3>
            <p className="mt-3 text-sm leading-7 text-white/45">
              Open an existing item or create a new one. Save it as draft,
              publish it, send it for approval or archive it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
