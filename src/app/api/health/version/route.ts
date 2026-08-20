import { NextResponse } from "next/server";
import {
  deploymentEnvironment,
  deploymentVersion,
} from "@/lib/deployment/version";

export async function GET() {
  return NextResponse.json(
    {
      version:
        deploymentVersion(),
      environment:
        deploymentEnvironment(),
      generatedAt:
        new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control":
          "no-store",
      },
    }
  );
}
