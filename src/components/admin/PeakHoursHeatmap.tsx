import type { HourBucket } from "@/lib/server/analytics/types";

export default function PeakHoursHeatmap({
  rows,
}: {
  rows: HourBucket[];
}) {
  const max = Math.max(1, ...rows.map((item) => item.score));

  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Peak hours</p>
      <h2 className="lx-serif mt-2 text-3xl">Service heatmap.</h2>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {rows.map((item) => {
          const intensity = Math.max(
            0.08,
            Math.min(1, item.score / max)
          );

          return (
            <div
              key={item.hour}
              className="rounded-[16px] p-3"
              style={{
                backgroundColor: `rgba(124, 36, 30, ${intensity})`,
                color: intensity > 0.45 ? "white" : "#201713",
              }}
            >
              <p className="lx-serif text-xl">{item.hour}</p>
              <p className="mt-1 text-[8px] opacity-60">
                R {item.reservations} · O {item.orders}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
