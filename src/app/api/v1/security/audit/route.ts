import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { supabaseRest } from "@/lib/server/supabase/http";

type SecurityAuditRow = {
  id: string;
  admin_user_id: string | null;
  event_type: string;
  severity: string;
  ip_hint: string | null;
  user_agent: string | null;
  resource: string | null;
  action: string | null;
  metadata_json: Record<string, unknown>;
  created_at: string;
};

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    await requireAdminPermission(request, "security.view");

    const rows = await supabaseRest<SecurityAuditRow[]>(
      "security_audit_events",
      {
        query: "select=*&order=created_at.desc&limit=200",
      }
    );

    return apiSuccess({ events: rows }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
