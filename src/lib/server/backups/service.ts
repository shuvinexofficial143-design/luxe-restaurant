import { secureIdentifier } from "@/lib/server/security/admin-token";
import { supabaseRest } from "@/lib/server/supabase/http";
import { createSanitizedBackup } from "./export";

export async function runSanitizedBackup(
  requestedBy: string
) {
  const id =
    secureIdentifier("BACKUP");

  await supabaseRest<unknown>(
    "backup_exports",
    {
      method: "POST",
      body: {
        id,
        requested_by: requestedBy,
        scope: "SANITIZED_CORE",
        status: "CREATED",
        record_count: 0,
        manifest_json: {},
      },
      prefer: "return=minimal",
    }
  );

  try {
    const data =
      await createSanitizedBackup();

    await supabaseRest<unknown>(
      "backup_exports",
      {
        method: "PATCH",
        query: `id=eq.${encodeURIComponent(
          id
        )}`,
        body: {
          status: "EXPORTED",
          record_count:
            data.recordCount,
          manifest_json: {
            generatedAt:
              data.generatedAt,
            tables:
              Object.keys(
                data.tables
              ),
            notes: data.notes,
          },
          last_error: null,
        },
        prefer: "return=minimal",
      }
    );

    return {
      id,
      data,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Backup export failed.";

    await supabaseRest<unknown>(
      "backup_exports",
      {
        method: "PATCH",
        query: `id=eq.${encodeURIComponent(
          id
        )}`,
        body: {
          status: "FAILED",
          last_error:
            message.slice(0, 2000),
        },
        prefer: "return=minimal",
      }
    ).catch(() => undefined);

    throw error;
  }
}
