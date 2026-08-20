import type { DailyMetric } from "@/lib/server/analytics/types";

export default function RevenueTrendChart({
  data,
}: {
  data: DailyMetric[];
}) {
  const max = Math.max(1, ...data.map((item) => item.revenue));
  const visible = data.slice(-30);

  return (
    <div className="rounded-[24px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc28b]">
        Revenue trend
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Daily completed-order revenue.</h2>

      <div className="mt-5 flex h-[190px] items-end gap-1 overflow-hidden">
        {visible.map((item) => (
          <div
            key={item.date}
            className="group relative flex h-full flex-1 items-end"
            title={`${item.date}: ₹${Math.round(
              item.revenue
            ).toLocaleString("en-IN")}`}
          >
            <div
              className="w-full min-w-[4px] rounded-t-[6px] bg-white/55 transition group-hover:bg-[#efc28b]"
              style={{
                height: `${Math.max(
                  3,
                  (item.revenue / max) * 100
                )}%`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-between text-[8px] text-white/35">
        <span>{visible[0]?.date || "—"}</span>
        <span>{visible[visible.length - 1]?.date || "—"}</span>
      </div>
    </div>
  );
}
