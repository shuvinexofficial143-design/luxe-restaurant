import Link from "next/link";
import type { JobOpening } from "@/lib/careers/types";

export default function JobCard({
  job,
}: {
  job: JobOpening;
}) {
  return (
    <article className="rounded-[24px] border border-[#4a3025]/10 bg-[#fffaf4] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[8px] uppercase tracking-[.12em] text-[#7c241e]">
            {job.department} · {job.type}
          </p>
          <h3 className="lx-serif mt-2 text-3xl">{job.title}</h3>
        </div>
        {job.featured ? (
          <span className="rounded-full bg-[#335f50]/10 px-3 py-2 text-[8px] uppercase tracking-[.1em] text-[#335f50]">
            Featured
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm leading-7 text-[#66534b]">{job.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {[job.location, job.experience, job.schedule].map((item) => (
          <span
            key={item}
            className="rounded-full bg-[#f3e7dc] px-3 py-2 text-[8px] uppercase tracking-[.09em] text-[#75645d]"
          >
            {item}
          </span>
        ))}
      </div>

      <Link
        href={`/careers/${job.slug}`}
        className="mt-5 flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
      >
        View role ↗
      </Link>
    </article>
  );
}
