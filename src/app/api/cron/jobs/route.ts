import { NextRequest, NextResponse } from "next/server";
import { runJobBatch } from "@/lib/server/jobs/worker";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest
) {
  const expected =
    process.env.CRON_SECRET ||
    process.env.LUXE_JOB_RUNNER_SECRET ||
    "";

  const authorization =
    request.headers.get(
      "authorization"
    ) || "";

  if (
    !expected ||
    authorization !==
      `Bearer ${expected}`
  ) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "cron_unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const summary =
      await runJobBatch({
        workerId:
          "vercel-cron",
        limit: 25,
      });

    return NextResponse.json(
      {
        ok: true,
        summary,
      },
      {
        headers: {
          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "job_batch_failed",
      },
      { status: 503 }
    );
  }
}
