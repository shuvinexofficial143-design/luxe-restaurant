import type { JobOpening } from "@/lib/careers/types";

export default function JobRequirements({
  job,
}: {
  job: JobOpening;
}) {
  return (
    <div className="rounded-[26px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">What you&apos;ll do</p>
      <h2 className="lx-serif mt-2 text-3xl">Responsibilities.</h2>

      <div className="mt-4 space-y-2">
        {job.responsibilities.map((item) => (
          <p key={item} className="rounded-[15px] bg-[#f3e7dc] p-3 text-xs leading-6">
            ✓ {item}
          </p>
        ))}
      </div>

      <p className="lx-kicker mt-6">What you bring</p>
      <h2 className="lx-serif mt-2 text-3xl">Requirements.</h2>

      <div className="mt-4 space-y-2">
        {job.requirements.map((item) => (
          <p key={item} className="rounded-[15px] border border-[#4a3025]/10 bg-white p-3 text-xs leading-6">
            • {item}
          </p>
        ))}
      </div>
    </div>
  );
}
