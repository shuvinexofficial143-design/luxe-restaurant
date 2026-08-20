import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireCustomer } from "@/lib/server/account/session";
import { supabaseCustomerOccasions } from "@/lib/server/supabase/customer-occasions";
import { serverIds } from "@/lib/server/db/ids";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);
    const occasions =
      await supabaseCustomerOccasions.listForCustomer(customer.id);
    return apiSuccess({ occasions }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);
    const body = await parseJsonObject(request);

    const occasion = await supabaseCustomerOccasions.insert({
      id: serverIds.audit(),
      customer_id: customer.id,
      label: requireString(body, "label", { min: 2, max: 80 }),
      occasion_date: requireString(body, "date", { min: 10, max: 10 }),
      note:
        typeof body.note === "string" && body.note.trim()
          ? body.note.trim().slice(0, 300)
          : null,
    });

    return apiSuccess({ occasion }, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
