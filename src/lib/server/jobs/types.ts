export type JobStatus =
  | "QUEUED"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "DEAD";

export type AsyncJobRow = {
  id: string;
  job_type: string;
  status: JobStatus;
  payload_json: Record<string, unknown>;
  attempts: number;
  max_attempts: number;
  run_after: string;
  locked_at: string | null;
  locked_by: string | null;
  last_error: string | null;
  created_at: string;
  updated_at: string;
};

export type JobFailureResult = {
  ok: boolean;
  status: "FAILED" | "DEAD" | "NOT_OWNED";
  retryInSeconds?: number;
};

export type JobRunSummary = {
  workerId: string;
  claimed: number;
  succeeded: number;
  failed: number;
  dead: number;
  results: {
    jobId: string;
    jobType: string;
    status: string;
    error?: string;
  }[];
};
