import type { LoyaltyTransactionRow } from "@/lib/server/account/types";

export default function LoyaltyHistoryList({
  items,
}: {
  items: LoyaltyTransactionRow[];
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-4 rounded-[15px] bg-white p-3"
        >
          <div>
            <p className="text-xs">{item.description}</p>
            <p className="mt-1 text-[8px] uppercase tracking-[.08em] text-[#8a756b]">
              {item.source}
            </p>
          </div>
          <span
            className={`lx-serif text-xl ${
              item.points >= 0 ? "text-[#335f50]" : "text-[#7c241e]"
            }`}
          >
            {item.points > 0 ? "+" : ""}
            {item.points}
          </span>
        </div>
      ))}

      {!items.length ? (
        <p className="rounded-[15px] bg-white p-4 text-xs text-[#75645d]">
          No loyalty transactions yet.
        </p>
      ) : null}
    </div>
  );
}
