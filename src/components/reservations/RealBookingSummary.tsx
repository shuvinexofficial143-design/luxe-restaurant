export default function RealBookingSummary({
  date,
  time,
  guests,
  area,
  tableId,
}: {
  date: string;
  time: string;
  guests: number;
  area: string;
  tableId: string;
}) {
  const rows = [
    ["Date", date || "—"],
    ["Time", time || "—"],
    ["Guests", String(guests)],
    ["Area", area || "Any"],
    ["Table", tableId || "Best available"],
  ];

  return (
    <div className="rounded-[22px] bg-[#201713] p-5 text-white">
      <p className="text-[10px] uppercase tracking-[.13em] text-[#efc28b]">
        Booking summary
      </p>
      <div className="mt-4 space-y-2">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 rounded-[13px] bg-white/[.06] p-3"
          >
            <span className="text-[10px] text-white/52">{label}</span>
            <span className="text-xs">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
