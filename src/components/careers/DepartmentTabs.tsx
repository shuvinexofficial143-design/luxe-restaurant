"use client";

import type { JobDepartment } from "@/lib/careers/types";

const departments: ("All" | JobDepartment)[] = [
  "All",
  "Kitchen",
  "Service",
  "Wine",
  "Pastry",
  "Events",
  "Operations",
];

export default function DepartmentTabs({
  value,
  onChange,
}: {
  value: "All" | JobDepartment;
  onChange: (value: "All" | JobDepartment) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {departments.map((department) => (
        <button
          key={department}
          type="button"
          onClick={() => onChange(department)}
          className={`shrink-0 rounded-full px-4 py-3 text-[8px] uppercase tracking-[.11em] ${
            value === department
              ? "bg-[#201713] text-white"
              : "border border-[#4a3025]/10 bg-white"
          }`}
        >
          {department}
        </button>
      ))}
    </div>
  );
}
