"use client";

import type { CMSStatus } from "@/lib/cms/types";

export default function CMSStatusTabs({
  value,
  onChange,
}: {
  value: "ALL" | CMSStatus;
  onChange: (value: "ALL" | CMSStatus) => void;
}) {
  const options: ("ALL" | CMSStatus)[] = [
    "ALL",
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`shrink-0 rounded-full px-3 py-2 text-[8px] uppercase tracking-[.1em] ${
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
