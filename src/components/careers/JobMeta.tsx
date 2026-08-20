import type { JobOpening } from "@/lib/careers/types";

export default function JobMeta({
  job,
}: {
  job: JobOpening;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {[
        [job.department, "department"],
        [job.type, "type"],
        [job.experience, "experience"],
        [job.location, "location"],
      ].map(([value, label]) => (
        <div key={label} className="rounded-[16px] bg-[#f3e7dc] p-3">
          <p className="text-sm">{value}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
