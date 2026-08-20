import type {
  DeploymentCheck,
  DeploymentReadiness,
} from "./types";
import { environmentChecks } from "./env";
import {
  expectedLatestMigration,
  latestDatabaseMigration,
} from "./migrations";
import { deploymentVersion } from "./version";

export async function buildDeploymentReadiness(): Promise<DeploymentReadiness> {
  const checks: DeploymentCheck[] =
    environmentChecks();
  let migrationVersion: string | null = null;
  let migrationReady = false;

  if (
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    try {
      migrationVersion =
        await latestDatabaseMigration();

      migrationReady =
        migrationVersion ===
        expectedLatestMigration;
    } catch {
      migrationReady = false;
    }
  }

  checks.push({
    key: "DATABASE_MIGRATION",
    label: "Latest database migration",
    required: true,
    ready: migrationReady,
    detail: migrationVersion
      ? `Database reports ${migrationVersion}; expected ${expectedLatestMigration}.`
      : "Latest migration could not be verified.",
  });

  const requiredFailure =
    checks.some(
      (check) =>
        check.required &&
        !check.ready
    );

  const optionalFailure =
    checks.some(
      (check) =>
        !check.required &&
        !check.ready
    );

  return {
    state: requiredFailure
      ? "BLOCKED"
      : optionalFailure
        ? "DEGRADED"
        : "READY",
    checkedAt:
      new Date().toISOString(),
    checks,
    migrationVersion,
    deploymentVersion:
      deploymentVersion(),
  };
}
