"use client";

import Link from "next/link";
import { useState } from "react";
import { privateDiningStorage } from "@/lib/private-dining/storage";

export default function InquiryConfirmation({ id }: { id: string }) {
  const [inquiry] = useState(() =>
    typeof window !== "undefined" ? privateDiningStorage.get(id) : undefined
  );

  if (!inquiry) {
    return (
      <div className="rounded-[24px] bg-[#fffaf4] p-6 text-center">
        <p className="lx-serif text-3xl">Enquiry not found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[30px] bg-[#fffaf4]">
      <div className="bg-[#335f50] p-6 text-white md:p-8">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
          Private dining enquiry
        </p>
        <h2 className="lx-serif mt-2 text-5xl">Request received.</h2>
        <p className="mt-3 text-sm text-white/60">{inquiry.id}</p>
      </div>

      <div className="p-5 md:p-8">
        <div className="grid grid-cols-2 gap-2">
          {[
            [inquiry.roomName, "room"],
            [inquiry.packageName, "package"],
            [String(inquiry.guests), "guests"],
            [`₹${inquiry.estimatedTotal.toLocaleString("en-IN")}`, "estimate"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[16px] bg-[#f3e7dc] p-3">
              <p className="text-sm">{value}</p>
              <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs leading-6 text-[#75645d]">
          This is a demo enquiry. Production email/WhatsApp automation can later send this request to the events team.
        </p>

        <Link
          href="/private-dining"
          className="mt-5 flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
        >
          View rooms
        </Link>
      </div>
    </div>
  );
}
