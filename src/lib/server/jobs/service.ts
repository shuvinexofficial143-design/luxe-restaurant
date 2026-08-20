import { supabaseRpc } from "@/lib/server/supabase/rpc";
import { supabaseRest } from "@/lib/server/supabase/http";
import type {
  AsyncJobRow,
  JobFailureResult,
} from "./types";

export async function claimJobs(
  workerId: string,
  limit: number
) {
  return supabaseRpc<AsyncJobRow[]>("luxe_claim_jobs", {
    p_worker_id: workerId,
    p_limit: limit,
  });
}

export async function completeJob(
  jobId: string,
  workerId: string
) {
  return supabaseRpc<{ ok: boolean; status: string }>(
    "luxe_complete_job",
    {
      p_job_id: jobId,
      p_worker_id: workerId,
    }
  );
}

export async function failJob(
  jobId: string,
  workerId: string,
  error: string
) {
  return supabaseRpc<JobFailureResult>("luxe_fail_job", {
    p_job_id: jobId,
    p_worker_id: workerId,
    p_error: error.slice(0, 2000),
  });
}

export async function enqueueJob(input: {
  id: string;
  jobType: string;
  payload: Record<string, unknown>;
  maxAttempts?: number;
  runAfter?: string;
}) {
  const rows = await supabaseRest<AsyncJobRow[]>(
    "async_jobs",
    {
      method: "POST",
      body: {
        id: input.id,
        job_type: input.jobType,
        status: "QUEUED",
        payload_json: input.payload,
        attempts: 0,
        max_attempts: input.maxAttempts || 6,
        run_after:
          input.runAfter || new Date().toISOString(),
      },
      prefer: "return=representation",
    }
  );

  return rows[0] || null;
}

export async function retryDeadJob(jobId: string) {
  await supabaseRest<unknown>("async_jobs", {
    method: "PATCH",
    query: `id=eq.${encodeURIComponent(
      jobId
    )}&status=eq.DEAD`,
    body: {
      status: "QUEUED",
      attempts: 0,
      run_after: new Date().toISOString(),
      locked_at: null,
      locked_by: null,
      last_error: null,
      updated_at: new Date().toISOString(),
    },
    prefer: "return=minimal",
  });
}
