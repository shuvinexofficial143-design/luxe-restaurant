import type { TopItem } from "@/lib/server/analytics/types";

export default function TopItemsTable({
  items,
}: {
  items: TopItem[];
}) {
  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Top dishes</p>
      <div className="mt-4 space-y-2">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="grid grid-cols-[28px_1fr_auto] items-center gap-3 rounded-[14px] bg-white p-3"
          >
            <span className="lx-serif text-xl text-[#7c241e]">
              {index + 1}
            </span>
            <div>
              <p className="text-xs">{item.title}</p>
              <p className="mt-1 text-[8px] text-[#75645d]">
                {item.quantity} sold
              </p>
            </div>
            <span className="text-xs">
              ₹{Math.round(item.revenue).toLocaleString("en-IN")}
            </span>
          </div>
        ))}

        {!items.length ? (
          <p className="text-xs text-[#75645d]">
            No completed order-item data in this range.
          </p>
        ) : null}
      </div>
    </div>
  );
}
