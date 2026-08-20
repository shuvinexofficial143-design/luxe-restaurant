import type { JobOpening } from "@/lib/careers/types";

export default function JobBenefits({
  job,
}: {
  job: JobOpening;
}) {
  return (
    <div className="rounded-[26px] bg-[#335f50] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
        Role benefits
      </p>
      <h2 className="lx-serif mt-2 text-3xl">What comes with it.</h2>

      <div className="mt-5 space-y-2">
        {job.benefits.map((item) => (
          <div key={item} className="rounded-[15px] bg-white/[.07] p-3 text-xs">
            ✓ {item}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[16px] bg-white/[.07] p-4">
        <p className="text-[8px] uppercase tracking-[.1em] text-white/45">
          Compensation
        </p>
        <p className="mt-1 text-sm">{job.salaryNote}</p>
      </div>
    </div>
  );
}
