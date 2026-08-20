import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { supabaseCRMNotes } from "@/lib/server/supabase/customer-notes";
import { serverIds } from "@/lib/server/db/ids";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const requestId = getRequestId(request);

  try {
    if (request.cookies.get("luxe_admin_demo")?.value !== "1") {
      throw new ApiError(
        "ADMIN_REQUIRED",
        "Admin session is required.",
        401
      );
    }

    const { id } = await context.params;
    const body = await parseJsonObject(request);

    const note = await supabaseCRMNotes.insert({
      id: `NOTE-${serverIds.audit()}`,
      customer_id: id,
      author_label:
        typeof body.authorLabel === "string" &&
        body.authorLabel.trim()
          ? body.authorLabel.trim().slice(0, 100)
          : "LUXE Admin",
      note: requireString(body, "note", {
        min: 2,
        max: 2000,
      }),
    });

    return apiSuccess({ note }, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
