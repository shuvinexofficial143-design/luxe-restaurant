"use client";

import { useSyncExternalStore } from "react";
import { cmsStore } from "@/lib/cms/storage";

export default function CMSApprovalQueue() {
  useSyncExternalStore(
    cmsStore.subscribe,
    cmsStore.getVersion,
    cmsStore.getServerVersion
  );

  const approvals = cmsStore.approvals();

  return (
    <div className="space-y-3">
      {approvals.length ? (
        approvals.map((approval) => (
          <article
            key={approval.id}
            className="rounded-[22px] bg-[#fffaf4] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[8px] uppercase tracking-[.11em] text-[#7c241e]">
                  {approval.collection}
                </p>
                <p className="lx-serif mt-1 text-2xl">{approval.title}</p>
                <p className="mt-1 text-[9px] text-[#8a756b]">
                  Requested {new Date(approval.requestedAt).toLocaleString("en-IN")}
                </p>
              </div>

              <span className="rounded-full bg-[#fff0d7] px-3 py-2 text-[8px] uppercase tracking-[.1em] text-[#8a5a21]">
                {approval.status}
              </span>
            </div>

            {approval.status === "PENDING" ? (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => cmsStore.setApproval(approval.id, "APPROVED")}
                  className="h-11 rounded-[14px] bg-[#335f50] text-[8px] uppercase tracking-[.11em] text-white"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => cmsStore.setApproval(approval.id, "REJECTED")}
                  className="h-11 rounded-[14px] border border-[#7c241e]/15 text-[8px] uppercase tracking-[.11em] text-[#7c241e]"
                >
                  Reject
                </button>
              </div>
            ) : null}
          </article>
        ))
      ) : (
        <div className="rounded-[24px] bg-[#fffaf4] p-8 text-center">
          <p className="lx-serif text-3xl">Approval queue is empty.</p>
        </div>
      )}
    </div>
  );
}
