import type { JobDepartment, JobOpening } from "./types";

export function filterJobs(
  jobs: JobOpening[],
  query: string,
  department: "All" | JobDepartment
) {
  const q = query.trim().toLowerCase();

  return jobs.filter((job) => {
    if (department !== "All" && job.department !== department) return false;

    if (!q) return true;

    return [
      job.title,
      job.department,
      job.location,
      job.type,
      job.experience,
      job.summary,
      job.description,
    ]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}
