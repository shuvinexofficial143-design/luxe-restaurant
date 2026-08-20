import type { OrderStatus } from "@/lib/orders/types";

const steps: { status: OrderStatus; label: string }[] = [
  { status: "RECEIVED", label: "Order received" },
  { status: "CONFIRMED", label: "Restaurant confirmed" },
  { status: "PREPARING", label: "Kitchen preparing" },
  { status: "READY", label: "Ready" },
  { status: "COMPLETED", label: "Completed" },
];

export default function OrderStatusTimeline({
  status,
}: {
  status: OrderStatus;
}) {
  if (status === "CANCELLED") {
    return (
      <div className="rounded-[20px] bg-[#7c241e]/10 p-4 text-[#7c241e]">
        <p className="text-[9px] uppercase tracking-[.13em]">Order cancelled</p>
      </div>
    );
  }

  const activeIndex = steps.findIndex((step) => step.status === status);

  return (
    <div className="space-y-2">
      {steps.map((step, index) => {
        const done = index <= activeIndex;
        return (
          <div
            key={step.status}
            className={`flex items-center gap-3 rounded-[16px] p-3 ${
              done ? "bg-[#335f50]/10 text-[#335f50]" : "bg-black/[.03] text-[#8a756b]"
            }`}
          >
            <span
              className={`grid h-7 w-7 place-items-center rounded-full text-[10px] ${
                done ? "bg-[#335f50] text-white" : "bg-white"
              }`}
            >
              {done ? "✓" : index + 1}
            </span>
            <span className="text-sm">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
