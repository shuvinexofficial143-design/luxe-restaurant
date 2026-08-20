import { secureIdentifier } from "@/lib/server/security/admin-token";
import { supabaseRest } from "@/lib/server/supabase/http";
import type {
  PrivacyRequestRow,
  PrivacyRequestType,
} from "./types";

export async function createPrivacyRequest(input: {
  customerId: string;
  type: PrivacyRequestType;
  note?: string;
}) {
  const rows =
    await supabaseRest<PrivacyRequestRow[]>(
      "privacy_requests",
      {
        method: "POST",
        body: {
          id: secureIdentifier("PRIV"),
          customer_id:
            input.customerId,
          request_type:
            input.type,
          status: "REQUESTED",
          request_note:
            input.note?.slice(
              0,
              1000
            ) || null,
          resolution_note:
            null,
          resolved_at: null,
        },
        prefer:
          "return=representation",
      }
    );

  return rows[0] || null;
}

export async function listPrivacyRequests() {
  return supabaseRest<PrivacyRequestRow[]>(
    "privacy_requests",
    {
      query:
        "select=*&order=requested_at.desc&limit=250",
    }
  );
}

export async function resolvePrivacyRequest(input: {
  id: string;
  status:
    | "COMPLETED"
    | "REJECTED"
    | "IN_REVIEW";
  note?: string;
}) {
  const rows =
    await supabaseRest<PrivacyRequestRow[]>(
      "privacy_requests",
      {
        method: "PATCH",
        query: `id=eq.${encodeURIComponent(
          input.id
        )}`,
        body: {
          status: input.status,
          resolution_note:
            input.note?.slice(
              0,
              2000
            ) || null,
          resolved_at:
            [
              "COMPLETED",
              "REJECTED",
            ].includes(
              input.status
            )
              ? new Date().toISOString()
              : null,
        },
        prefer:
          "return=representation",
      }
    );

  return rows[0] || null;
}
