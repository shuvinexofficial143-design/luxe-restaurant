import Link from "next/link";
import type { JobOpening } from "@/lib/careers/types";
import JobMeta from "./JobMeta";

export default function JobDetailHero({
  job,
}: {
  job: JobOpening;
}) {
  return (
    <div className="rounded-[30px] bg-[#201713] p-6 text-white md:p-9">
      <p className="text-[9px] uppercase tracking-[.16em] text-[#efc28b]">
        {job.department} · {job.type}
      </p>
      <h1 className="lx-serif mt-3 text-5xl md:text-7xl">{job.title}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
        {job.description}
      </p>

      <div className="mt-6">
        <JobMeta job={job} />
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <Link
          href={`/careers/apply/${job.slug}`}
          className="flex min-h-13 items-center justify-center rounded-[17px] bg-[#7c241e] text-[9px] uppercase tracking-[.13em] text-white"
        >
          Apply now ↗
        </Link>
        <Link
          href="/careers"
          className="flex min-h-13 items-center justify-center rounded-[17px] border border-white/15 text-[9px] uppercase tracking-[.13em]"
        >
          All roles
        </Link>
      </div>
    </div>
  );
}
