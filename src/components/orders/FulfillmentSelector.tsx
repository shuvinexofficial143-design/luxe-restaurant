"use client";

import type { FulfillmentType } from "@/lib/orders/types";

export default function FulfillmentSelector({
  value,
  onChange,
}: {
  value: FulfillmentType;
  onChange: (value: FulfillmentType) => void;
}) {
  const options: {
    value: FulfillmentType;
    title: string;
    text: string;
    icon: string;
  }[] = [
    {
      value: "PICKUP",
      title: "Pickup",
      text: "Choose a collection time and pick up from LUXE.",
      icon: "⌂",
    },
    {
      value: "TABLE",
      title: "Order at table",
      text: "Enter your restaurant table number for table-side ordering.",
      icon: "◉",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-[22px] border p-4 text-left ${
            value === option.value
              ? "border-[#7c241e] bg-[#7c241e] text-white"
              : "border-[#4a3025]/10 bg-[#fffaf4]"
          }`}
        >
          <span className="text-2xl">{option.icon}</span>
          <p className="lx-serif mt-3 text-2xl">{option.title}</p>
          <p className="mt-2 text-xs leading-6 opacity-60">{option.text}</p>
        </button>
      ))}
    </div>
  );
}
