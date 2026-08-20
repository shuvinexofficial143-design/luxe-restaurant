import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { supabaseCRMCampaigns } from "@/lib/server/supabase/crm-campaigns";
import { serverIds } from "@/lib/server/db/ids";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    if (request.cookies.get("luxe_admin_demo")?.value !== "1") {
      throw new ApiError("ADMIN_REQUIRED", "Admin session is required.", 401);
    }

    const campaigns = await supabaseCRMCampaigns.list({
      limit: 100,
      order: "created_at.desc",
    });

    return apiSuccess({ campaigns }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    if (request.cookies.get("luxe_admin_demo")?.value !== "1") {
      throw new ApiError("ADMIN_REQUIRED", "Admin session is required.", 401);
    }

    const body = await parseJsonObject(request);
    const channel = requireString(body, "channel", {
      max: 20,
    }).toUpperCase();

    if (!["EMAIL", "WHATSAPP"].includes(channel)) {
      throw new ApiError(
        "INVALID_CHANNEL",
        "channel must be EMAIL or WHATSAPP.",
        422
      );
    }

    const campaign = await supabaseCRMCampaigns.insert({
      id: `CMP-${serverIds.audit()}`,
      name: requireString(body, "name", {
        min: 2,
        max: 160,
      }),
      channel: channel as "EMAIL" | "WHATSAPP",
      audience_filter:
        body.audienceFilter &&
        typeof body.audienceFilter === "object" &&
        !Array.isArray(body.audienceFilter)
          ? (body.audienceFilter as Record<string, unknown>)
          : {},
      status: "DRAFT",
      estimated_recipients:
        typeof body.estimatedRecipients === "number"
          ? Math.max(0, Math.floor(body.estimatedRecipients))
          : 0,
      sent_count: 0,
    });

    return apiSuccess(
      {
        campaign,
        sendingStarted: false,
      },
      requestId,
      201
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
