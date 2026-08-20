import type { JobOpening } from "@/lib/careers/types";

export default function ApplicationSummary({
  job,
  resumeName,
}: {
  job: JobOpening;
  resumeName: string;
}) {
  return (
    <aside className="rounded-[26px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        Application summary
      </p>
      <h2 className="lx-serif mt-2 text-3xl">{job.title}</h2>
      <p className="mt-1 text-xs text-white/45">
        {job.department} · {job.location}
      </p>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-white/45">Type</span>
          <span>{job.type}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-white/45">Experience</span>
          <span>{job.experience}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-white/45">CV</span>
          <span className="max-w-[170px] truncate">{resumeName || "Not selected"}</span>
        </div>
      </div>

      <p className="mt-5 text-[9px] leading-5 text-white/40">
        Portfolio demo only. A production careers system would upload files securely to server storage and notify HR.
      </p>
    </aside>
  );
}
