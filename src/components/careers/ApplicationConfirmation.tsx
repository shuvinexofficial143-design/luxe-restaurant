"use client";

import Link from "next/link";
import { useState } from "react";
import { careerApplicationStorage } from "@/lib/careers/storage";
import { applicationStatusText } from "@/lib/careers/utils";

export default function ApplicationConfirmation({
  id,
}: {
  id: string;
}) {
  const [application] = useState(() =>
    typeof window !== "undefined"
      ? careerApplicationStorage.get(id)
      : undefined
  );

  if (!application) {
    return (
      <div className="rounded-[28px] bg-[#fffaf4] p-8 text-center">
        <h1 className="lx-serif text-4xl">Application not found.</h1>
        <Link
          href="/careers"
          className="mt-5 inline-flex rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.12em] text-white"
        >
          Careers
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[30px] bg-[#fffaf4]">
      <div className="bg-[#335f50] p-7 text-white">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
          Application received
        </p>
        <h1 className="lx-serif mt-2 text-5xl">Thank you, {application.name}.</h1>
        <p className="mt-3 text-sm text-white/55">{application.id}</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-2">
          {[
            [application.jobTitle, "role"],
            [applicationStatusText(application.status), "status"],
            [application.email, "email"],
            [application.resumeName || "No CV file", "CV"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[16px] bg-[#f3e7dc] p-3">
              <p className="truncate text-sm">{value}</p>
              <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs leading-6 text-[#75645d]">
          This is a local demo application. No CV, email or personal details were sent to a real employer.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            href={`/careers/track?id=${encodeURIComponent(application.id)}`}
            className="flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
          >
            Track application
          </Link>
          <Link
            href="/careers"
            className="flex min-h-12 items-center justify-center rounded-[16px] border border-[#4a3025]/10 text-[9px] uppercase tracking-[.12em]"
          >
            More roles
          </Link>
        </div>
      </div>
    </div>
  );
}
