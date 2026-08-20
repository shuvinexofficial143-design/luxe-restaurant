"use client";

import { useSyncExternalStore } from "react";
import { cmsStore } from "@/lib/cms/storage";

export default function CMSRevisionHistory() {
  useSyncExternalStore(
    cmsStore.subscribe,
    cmsStore.getVersion,
    cmsStore.getServerVersion
  );

  const revisions = cmsStore.revisions();

  return (
    <div className="space-y-2">
      {revisions.length ? (
        revisions.map((revision) => (
          <article
            key={revision.id}
            className="rounded-[20px] border border-[#4a3025]/10 bg-[#fffaf4] p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[8px] uppercase tracking-[.11em] text-[#7c241e]">
                  {revision.action} · {revision.collection}
                </p>
                <p className="lx-serif mt-1 text-2xl">{revision.snapshot.title}</p>
              </div>
              <p className="text-[9px] text-[#8a756b]">
                {new Date(revision.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
            <p className="mt-2 text-[10px] leading-5 text-[#75645d]">
              Snapshot status: {revision.snapshot.status} · slug: {revision.snapshot.slug}
            </p>
          </article>
        ))
      ) : (
        <div className="rounded-[24px] bg-[#fffaf4] p-8 text-center">
          <p className="lx-serif text-3xl">No revisions yet.</p>
        </div>
      )}
    </div>
  );
}
