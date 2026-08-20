import { secureIdentifier } from "@/lib/server/security/admin-token";
import { supabaseRest } from "@/lib/server/supabase/http";

export async function recordSystemError(input: {
  source: string;
  error: unknown;
  severity?: "INFO" | "WARN" | "ERROR" | "CRITICAL";
  requestPath?: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
}) {
  const error =
    input.error instanceof Error
      ? input.error
      : new Error(String(input.error));

  await supabaseRest<unknown>(
    "system_error_events",
    {
      method: "POST",
      body: {
        id: secureIdentifier("ERR"),
        source: input.source,
        severity: input.severity || "ERROR",
        message: error.message.slice(0, 2000),
        stack_text:
          error.stack?.slice(0, 12000) || null,
        request_path:
          input.requestPath?.slice(0, 500) || null,
        request_id:
          input.requestId?.slice(0, 200) || null,
        metadata_json: input.metadata || {},
      },
      prefer: "return=minimal",
    }
  );
}
