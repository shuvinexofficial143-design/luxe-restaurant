import AdminShell from "@/components/admin/AdminShell";
import {
  requireAdminPagePermission,
} from "@/lib/server/security/admin-guard";
import {
  supabaseRest,
} from "@/lib/server/supabase/http";
import type {
  ErrorEventRow,
} from "@/lib/server/monitoring/types";

export const metadata = {
  title: "System Errors · LUXE",
};

export const dynamic =
  "force-dynamic";

export default async function ErrorEventsPage() {
  await requireAdminPagePermission(
    "security.view"
  );

  let events:
    ErrorEventRow[] = [];
  let errorMessage = "";

  try {
    events =
      await supabaseRest<
        ErrorEventRow[]
      >(
        "system_error_events",
        {
          query:
            "select=*&order=created_at.desc&limit=200",
        }
      );
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Error events unavailable.";
  }

  return (
    <AdminShell
      title="System Errors"
      eyebrow="Server Error Log"
    >
      <div className="mx-auto max-w-[1180px]">
        {errorMessage ? (
          <div className="rounded-[20px] bg-[#fff4de] p-4 text-xs text-[#75645d]">
            {
              errorMessage
            }
          </div>
        ) : null}

        <div className="mt-4 space-y-2">
          {events.map(
            (
              event
            ) => (
              <article
                key={
                  event.id
                }
                className="rounded-[18px] bg-[#fffaf4] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
                      {
                        event.source
                      }{" "}
                      ·{" "}
                      {
                        event.severity
                      }
                    </p>
                    <h2 className="lx-serif mt-2 text-2xl">
                      {
                        event.message
                      }
                    </h2>
                  </div>
                  <span className="text-[8px] text-[#75645d]">
                    {new Date(
                      event.created_at
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              </article>
            )
          )}

          {!events.length &&
          !errorMessage ? (
            <p className="rounded-[20px] bg-[#fffaf4] p-5 text-xs text-[#75645d]">
              No recorded system errors.
            </p>
          ) : null}
        </div>
      </div>
    </AdminShell>
  );
}
