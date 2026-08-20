import type { JobOpening } from "@/lib/careers/types";
import JobCard from "./JobCard";

export default function JobGrid({
  jobs,
}: {
  jobs: JobOpening[];
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {jobs.map((job) => (
        <JobCard key={job.slug} job={job} />
      ))}
    </div>
  );
}
