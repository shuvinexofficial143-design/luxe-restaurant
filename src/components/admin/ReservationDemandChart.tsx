import type { DailyMetric } from "@/lib/server/analytics/types";

export default function ReservationDemandChart({
  data,
}: {
  data: DailyMetric[];
}) {
  const visible = data.slice(-21);
  const max = Math.max(
    1,
    ...visible.map((item) => item.reservations)
  );

  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Reservation demand</p>
      <div className="mt-4 space-y-2">
        {visible.map((item) => (
          <div
            key={item.date}
            className="grid grid-cols-[72px_1fr_34px] items-center gap-2"
          >
            <span className="text-[8px] text-[#75645d]">
              {item.date.slice(5)}
            </span>
            <div className="h-2 overflow-hidden rounded-full bg-[#eadfd4]">
              <div
                className="h-full rounded-full bg-[#7c241e]"
                style={{
                  width: `${(item.reservations / max) * 100}%`,
                }}
              />
            </div>
            <span className="text-right text-[9px]">
              {item.reservations}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
