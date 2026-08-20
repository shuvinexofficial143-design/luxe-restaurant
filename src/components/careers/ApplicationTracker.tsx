"use client";

import { useState } from "react";
import type { CareerApplication } from "@/lib/careers/types";
import { careerApplicationStorage } from "@/lib/careers/storage";

const steps = [
  ["RECEIVED", "Received"],
  ["REVIEW", "Review"],
  ["INTERVIEW", "Interview"],
  ["OFFER", "Offer"],
] as const;

export default function ApplicationTracker({
  initialId = "",
}: {
  initialId?: string;
}) {
  const [id, setId] = useState(initialId);
  const [application, setApplication] = useState<CareerApplication | null>(() =>
    initialId && typeof window !== "undefined"
      ? careerApplicationStorage.get(initialId) || null
      : null
  );
  const [searched, setSearched] = useState(Boolean(initialId));

  function search() {
    setSearched(true);
    setApplication(
      careerApplicationStorage.get(id.trim().toUpperCase()) || null
    );
  }

  const activeIndex = application
    ? steps.findIndex(([status]) => status === application.status)
    : -1;

  return (
    <div>
      <div className="rounded-[24px] bg-[#fffaf4] p-5">
        <p className="lx-kicker">Track application</p>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <input
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="APP-XXXXXXX"
            className="h-11 min-w-0 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm uppercase"
          />
          <button
            type="button"
            onClick={search}
            className="rounded-[14px] bg-[#201713] px-4 text-[9px] uppercase tracking-[.12em] text-white"
          >
            Track
          </button>
        </div>
      </div>

      {application ? (
        <div className="mt-4 rounded-[26px] bg-[#fffaf4] p-5">
          <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
            {application.id}
          </p>
          <h2 className="lx-serif mt-2 text-3xl">{application.jobTitle}</h2>

          <div className="mt-5 space-y-2">
            {steps.map(([status, label], index) => {
              const done = index <= activeIndex;
              return (
                <div
                  key={status}
                  className={`flex items-center gap-3 rounded-[16px] p-3 ${
                    done
                      ? "bg-[#335f50]/10 text-[#335f50]"
                      : "bg-black/[.03] text-[#8a756b]"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-full text-[10px] ${
                      done ? "bg-[#335f50] text-white" : "bg-white"
                    }`}
                  >
                    {done ? "✓" : index + 1}
                  </span>
                  <span className="text-sm">{label}</span>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-[9px] leading-5 text-[#8a756b]">
            Demo applications remain at the received stage unless a future admin system updates them.
          </p>
        </div>
      ) : searched ? (
        <div className="mt-4 rounded-[24px] border border-dashed border-[#7c241e]/20 p-8 text-center">
          <p className="lx-serif text-3xl">Application not found.</p>
        </div>
      ) : null}
    </div>
  );
}
