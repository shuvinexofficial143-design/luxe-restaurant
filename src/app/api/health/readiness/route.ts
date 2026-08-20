import { NextResponse } from "next/server";
import { buildDeploymentReadiness } from "@/lib/deployment/readiness";

export const dynamic = "force-dynamic";

export async function GET() {
  const readiness =
    await buildDeploymentReadiness();

  const required = readiness.checks.filter(
    (check) => check.required
  );

  return NextResponse.json(
    {
      state: readiness.state,
      checkedAt:
        readiness.checkedAt,
      requiredReady:
        required.filter(
          (check) => check.ready
        ).length,
      requiredTotal:
        required.length,
      version:
        readiness.deploymentVersion,
    },
    {
      status:
        readiness.state ===
        "BLOCKED"
          ? 503
          : 200,
      headers: {
        "Cache-Control":
          "no-store",
      },
    }
  );
}
