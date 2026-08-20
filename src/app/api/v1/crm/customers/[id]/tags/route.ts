import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { supabaseCRMTags } from "@/lib/server/supabase/customer-tags";
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
    const tag = requireString(body, "tag", {
      min: 2,
      max: 60,
    });

    const existing = (
      await supabaseCRMTags.listForCustomer(id)
    ).find(
      (item) => item.tag.toLowerCase() === tag.toLowerCase()
    );

    if (existing) {
      return apiSuccess({ tag: existing, alreadyExists: true }, requestId);
    }

    const created = await supabaseCRMTags.insert({
      id: `TAG-${serverIds.audit()}`,
      customer_id: id,
      tag,
    });

    return apiSuccess(
      { tag: created, alreadyExists: false },
      requestId,
      201
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}

export async function DELETE(
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
    const url = new URL(request.url);
    const tag = url.searchParams.get("tag") || "";
    const existing = (
      await supabaseCRMTags.listForCustomer(id)
    ).find(
      (item) => item.tag.toLowerCase() === tag.toLowerCase()
    );

    if (existing) await supabaseCRMTags.remove(existing.id);

    return apiSuccess({ removed: Boolean(existing) }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
