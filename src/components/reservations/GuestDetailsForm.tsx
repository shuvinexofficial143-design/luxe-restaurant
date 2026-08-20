"use client";

import type { ReservationDraft } from "@/lib/reservations/types";
import OccasionSelector from "./OccasionSelector";

export default function GuestDetailsForm({
  draft,
  onChange,
}: {
  draft: ReservationDraft;
  onChange: (patch: Partial<ReservationDraft>) => void;
}) {
  return (
    <div>
      <p className="lx-kicker">Guest details</p>
      <h2 className="lx-serif mt-2 text-4xl">Almost done.</h2>

      <div className="mt-6">
        <OccasionSelector value={draft.occasion} onChange={(occasion) => onChange({ occasion })} />
      </div>

      <div className="mt-5 grid gap-3">
        {[
          ["Name", "name", "text"],
          ["Email", "email", "email"],
          ["Phone", "phone", "tel"],
        ].map(([label, key, type]) => (
          <label key={key} className="grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
            {label}
            <input
              required
              type={type}
              value={String(draft[key as keyof ReservationDraft] || "")}
              onChange={(event) => onChange({ [key]: event.target.value })}
              className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-[#fffaf4] px-4 text-sm normal-case tracking-normal outline-none"
            />
          </label>
        ))}

        <label className="grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          Notes
          <textarea
            rows={4}
            value={draft.notes}
            onChange={(event) => onChange({ notes: event.target.value })}
            placeholder="Allergies, accessibility, celebration details..."
            className="rounded-[18px] border border-[#4a3025]/10 bg-[#fffaf4] p-4 text-sm normal-case tracking-normal outline-none"
          />
        </label>
      </div>
    </div>
  );
}
