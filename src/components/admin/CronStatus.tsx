export default function CronStatus() {
  const configured =
    Boolean(
      process.env.CRON_SECRET ||
      process.env.LUXE_JOB_RUNNER_SECRET
    );

  return (
    <div className="rounded-[24px] bg-[#7c241e] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#ffd0aa]">
        Background jobs
      </p>
      <h2 className="lx-serif mt-2 text-3xl">
        {configured
          ? "Cron authentication configured."
          : "Cron secret still required."}
      </h2>
      <p className="mt-3 text-[9px] leading-5 text-white/55">
        vercel.json schedules /api/cron/jobs hourly. This file does not prove
        the deployment platform accepted or executed the schedule.
      </p>
    </div>
  );
}
