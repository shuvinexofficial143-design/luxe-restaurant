import type { DailyMetric } from "@/lib/server/analytics/types";

export default function OrderTrendChart({
  data,
}: {
  data: DailyMetric[];
}) {
  const recent = data.slice(-14);
  const totalOrders = recent.reduce(
    (sum, item) => sum + item.orders,
    0
  );
  const completed = recent.reduce(
    (sum, item) => sum + item.completedOrders,
    0
  );
  const completion = totalOrders
    ? (completed / totalOrders) * 100
    : 0;

  return (
    <div className="rounded-[24px] bg-[#335f50] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc99a]">
        Order operations
      </p>
      <p className="lx-serif mt-2 text-5xl">
        {completion.toFixed(1)}%
      </p>
      <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-white/45">
        14-day completion rate
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-[16px] bg-white/[.07] p-3">
          <p className="lx-serif text-2xl text-[#efc99a]">
            {totalOrders}
          </p>
          <p className="mt-1 text-[8px] text-white/40">orders</p>
        </div>
        <div className="rounded-[16px] bg-white/[.07] p-3">
          <p className="lx-serif text-2xl text-[#efc99a]">
            {completed}
          </p>
          <p className="mt-1 text-[8px] text-white/40">
            completed
          </p>
        </div>
      </div>
    </div>
  );
}
