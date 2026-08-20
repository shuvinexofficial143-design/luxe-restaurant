export type DeploymentState =
  | "READY"
  | "DEGRADED"
  | "BLOCKED";

export type DeploymentCheck = {
  key: string;
  label: string;
  required: boolean;
  ready: boolean;
  detail: string;
};

export type DeploymentReadiness = {
  state: DeploymentState;
  checkedAt: string;
  checks: DeploymentCheck[];
  migrationVersion: string | null;
  deploymentVersion: string;
};
