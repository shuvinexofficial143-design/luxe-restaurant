import { NextResponse } from "next/server";
import { buildLiveHealth } from "@/lib/server/monitoring/health";

export async function GET() {
  const report =
    await buildLiveHealth();

  return NextResponse.json(
    report,
    {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store",
      },
    }
  );
}
