import type { NextRequest } from "next/server";
import { supabaseRest } from "@/lib/server/supabase/http";
import { secureIdentifier } from "./admin-token";

export async function writeSecurityAudit(input: {
  adminUserId?: string | null;
  eventType: string;
  severity?: "INFO" | "WARN" | "CRITICAL";
  resource?: string;
  action?: string;
  metadata?: Record<string, unknown>;
  request?: NextRequest | Request;
}) {
  const request = input.request;
  const forwarded =
    request?.headers.get("x-forwarded-for") || "";

  await supabaseRest<unknown>("security_audit_events", {
    method: "POST",
    body: {
      id: secureIdentifier("SEC"),
      admin_user_id: input.adminUserId || null,
      event_type: input.eventType,
      severity: input.severity || "INFO",
      ip_hint: forwarded.split(",")[0]?.trim().slice(0, 120) || null,
      user_agent:
        request?.headers.get("user-agent")?.slice(0, 500) || null,
      resource: input.resource || null,
      action: input.action || null,
      metadata_json: input.metadata || {},
    },
    prefer: "return=minimal",
  });
}
