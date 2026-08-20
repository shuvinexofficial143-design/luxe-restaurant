"use client";

import type { NotificationType } from "@/lib/notifications/types";

const options: ("All" | NotificationType)[] = [
  "All",
  "EVENT",
  "WINE",
  "OFFER",
  "BOOKING",
  "GENERAL",
];

export default function NotificationFilters({
  value,
  onChange,
}: {
  value: "All" | NotificationType;
  onChange: (value: "All" | NotificationType) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`shrink-0 rounded-full px-4 py-3 text-[8px] uppercase tracking-[.11em] ${
            value === option
              ? "bg-[#201713] text-white"
              : "border border-[#4a3025]/10 bg-white"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
