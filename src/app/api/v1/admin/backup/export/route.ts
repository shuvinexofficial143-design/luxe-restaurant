import {
  NextRequest,
  NextResponse,
} from "next/server";
import {
  requireAdminPermission,
} from "@/lib/server/security/admin-guard";
import {
  requireCsrf,
} from "@/lib/server/security/csrf";
import {
  runSanitizedBackup,
} from "@/lib/server/backups/service";

export async function POST(
  request: NextRequest
) {
  requireCsrf(request);

  const admin =
    await requireAdminPermission(
      request,
      "security.view"
    );

  const result =
    await runSanitizedBackup(
      admin.user.id
    );

  return new NextResponse(
    JSON.stringify(
      {
        backupId:
          result.id,
        ...result.data,
      },
      null,
      2
    ),
    {
      status: 200,
      headers: {
        "Content-Type":
          "application/json; charset=utf-8",
        "Content-Disposition":
          `attachment; filename="luxe-sanitized-backup-${new Date()
            .toISOString()
            .slice(
              0,
              10
            )}.json"`,
        "Cache-Control":
          "no-store",
      },
    }
  );
}
