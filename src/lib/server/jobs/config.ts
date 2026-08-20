export const jobTypes = {
  webhookProcess: "WEBHOOK_PROCESS",
  notificationSend: "NOTIFICATION_SEND",
} as const;

export const workerDefaults = {
  batchSize: 10,
  maxBatchSize: 25,
} as const;

export function jobRunnerSecret() {
  return process.env.LUXE_JOB_RUNNER_SECRET || "";
}
