"use client";

import { useMemo, useState } from "react";
import type { JobDepartment, JobOpening } from "@/lib/careers/types";
import { filterJobs } from "@/lib/careers/filters";
import JobSearch from "./JobSearch";
import DepartmentTabs from "./DepartmentTabs";
import JobGrid from "./JobGrid";

export default function CareersClient({
  jobs,
}: {
  jobs: JobOpening[];
}) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<"All" | JobDepartment>("All");

  const visible = useMemo(
    () => filterJobs(jobs, query, department),
    [department, jobs, query]
  );

  return (
    <div>
      <div className="sticky top-[80px] z-30 rounded-[22px] border border-[#4a3025]/10 bg-[#f7f1e8]/95 p-3 backdrop-blur-xl md:top-[92px]">
        <JobSearch value={query} onChange={setQuery} />
        <div className="mt-2">
          <DepartmentTabs value={department} onChange={setDepartment} />
        </div>
      </div>

      <p className="mt-4 text-xs text-[#75645d]">
        {visible.length} role{visible.length === 1 ? "" : "s"} found
      </p>

      <div className="mt-4">
        {visible.length ? (
          <JobGrid jobs={visible} />
        ) : (
          <div className="rounded-[26px] border border-dashed border-[#7c241e]/20 bg-[#fffaf4] p-10 text-center">
            <p className="lx-serif text-3xl">No roles match.</p>
          </div>
        )}
      </div>
    </div>
  );
}
