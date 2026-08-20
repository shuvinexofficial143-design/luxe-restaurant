import { orderStatuses } from "@/lib/server/orders/config";
import type { OrderStatusHistoryRow } from "@/lib/server/orders/types";

export default function OrderStatusTimelineReal({
  status,
  history,
}: {
  status: string;
  history: OrderStatusHistoryRow[];
}) {
  const current = orderStatuses.indexOf(
    status as (typeof orderStatuses)[number]
  );

  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Kitchen progress</p>

      <div className="mt-4 space-y-2">
        {orderStatuses
          .filter((item) => item !== "CANCELLED")
          .map((item, index) => {
            const reached =
              status === "CANCELLED" ? false : index <= current;
            const event = history.find(
              (entry) => entry.status === item
            );

            return (
              <div
                key={item}
                className={`flex items-center gap-3 rounded-[15px] p-3 ${
                  reached ? "bg-[#335f50] text-white" : "bg-white"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    reached
                      ? "bg-white/15"
                      : "bg-[#f3e7dc] text-[#8a756b]"
                  }`}
                >
                  {reached ? "✓" : index + 1}
                </span>
                <div>
                  <p className="text-[9px] uppercase tracking-[.1em]">
                    {item}
                  </p>
                  {event?.created_at ? (
                    <p className="mt-1 text-[8px] opacity-50">
                      {new Date(event.created_at).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}

        {status === "CANCELLED" ? (
          <div className="rounded-[15px] bg-[#7c241e] p-3 text-white">
            <p className="text-[9px] uppercase tracking-[.1em]">
              CANCELLED
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
