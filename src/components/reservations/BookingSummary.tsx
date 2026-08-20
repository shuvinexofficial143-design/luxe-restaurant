import { tables } from "@/lib/reservations/data";
import type { ReservationDraft } from "@/lib/reservations/types";
import { depositFor, formatDate } from "@/lib/reservations/utils";

export default function BookingSummary({ draft }: { draft: ReservationDraft }) {
  const table = tables.find((item) => item.id === draft.tableId);
  const deposit = depositFor(draft.guests, draft.area);

  return (
    <aside className="rounded-[24px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.16em] text-[#efc28b]">Your booking</p>
      <div className="mt-4 space-y-3 text-sm">
        {[
          ["Guests", String(draft.guests)],
          ["Date", formatDate(draft.date)],
          ["Time", draft.time || "Not selected"],
          ["Area", draft.area],
          ["Table", table ? `${table.label} · ${table.seats} seats` : "Not selected"],
          ["Occasion", draft.occasion],
        ].map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4 border-b border-white/8 pb-3 last:border-b-0">
            <span className="text-white/45">{label}</span>
            <span className="text-right">{value}</span>
          </div>
        ))}
      </div>

      {deposit > 0 ? (
        <div className="mt-4 rounded-[18px] bg-white/8 p-3">
          <p className="text-[8px] uppercase tracking-[.12em] text-[#efc28b]">Deposit</p>
          <p className="lx-serif mt-1 text-2xl">₹{deposit.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-[10px] leading-5 text-white/45">Demo amount; payment gateway is not connected yet.</p>
        </div>
      ) : null}
    </aside>
  );
}
