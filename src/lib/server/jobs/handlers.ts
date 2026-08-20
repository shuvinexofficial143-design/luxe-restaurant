import { ApiError } from "@/lib/server/api/errors";
import { jobTypes } from "./config";
import type { AsyncJobRow } from "./types";
import { processWebhookEvent } from "@/lib/server/webhooks/ingest";
import {
  processNotification,
} from "@/lib/server/notifications/service";

function stringField(
  payload: Record<string, unknown>,
  key: string
) {
  const value = payload[key];

  if (typeof value !== "string" || !value.trim()) {
    throw new ApiError(
      "JOB_PAYLOAD_INVALID",
      `Job payload is missing ${key}.`,
      422
    );
  }

  return value;
}

export async function handleJob(job: AsyncJobRow) {
  if (job.job_type === jobTypes.webhookProcess) {
    return processWebhookEvent(
      stringField(job.payload_json, "webhookEventId")
    );
  }

  if (job.job_type === jobTypes.notificationSend) {
    return processNotification(
      stringField(job.payload_json, "notificationId")
    );
  }

  throw new ApiError(
    "UNKNOWN_JOB_TYPE",
    `No handler exists for ${job.job_type}.`,
    422
  );
}
