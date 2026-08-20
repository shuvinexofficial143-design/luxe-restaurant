export type HealthState =
  | "OK"
  | "DEGRADED"
  | "DOWN"
  | "NOT_CONFIGURED";

export type HealthCheck = {
  key: string;
  label: string;
  state: HealthState;
  detail: string;
  latencyMs?: number;
};

export type HealthReport = {
  status: "OK" | "DEGRADED" | "DOWN";
  checkedAt: string;
  checks: HealthCheck[];
};

export type ErrorEventRow = {
  id: string;
  source: string;
  severity: "INFO" | "WARN" | "ERROR" | "CRITICAL";
  message: string;
  stack_text: string | null;
  request_path: string | null;
  request_id: string | null;
  metadata_json: Record<string, unknown>;
  created_at: string;
};
