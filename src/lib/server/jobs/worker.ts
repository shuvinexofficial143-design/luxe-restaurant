import { secureIdentifier } from "@/lib/server/security/admin-token";
import {
  claimJobs,
  completeJob,
  failJob,
} from "./service";
import { handleJob } from "./handlers";
import type { JobRunSummary } from "./types";
import {
  markNotificationDead,
} from "@/lib/server/notifications/service";

export async function runJobBatch(input?: {
  workerId?: string;
  limit?: number;
}): Promise<JobRunSummary> {
  const workerId =
    input?.workerId || secureIdentifier("WORKER");
  const limit = Math.max(
    1,
    Math.min(25, Math.floor(input?.limit || 10))
  );

  const jobs = await claimJobs(workerId, limit);

  const summary: JobRunSummary = {
    workerId,
    claimed: jobs.length,
    succeeded: 0,
    failed: 0,
    dead: 0,
    results: [],
  };

  for (const job of jobs) {
    try {
      await handleJob(job);
      await completeJob(job.id, workerId);

      summary.succeeded += 1;
      summary.results.push({
        jobId: job.id,
        jobType: job.job_type,
        status: "SUCCEEDED",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown job failure";

      const result = await failJob(
        job.id,
        workerId,
        message
      );

      if (result.status === "DEAD") {
        summary.dead += 1;

        if (
          job.job_type === "NOTIFICATION_SEND" &&
          typeof job.payload_json.notificationId === "string"
        ) {
          await markNotificationDead(
            job.payload_json.notificationId,
            message
          ).catch(() => undefined);
        }
      } else {
        summary.failed += 1;
      }

      summary.results.push({
        jobId: job.id,
        jobType: job.job_type,
        status: result.status,
        error: message,
      });
    }
  }

  return summary;
}
