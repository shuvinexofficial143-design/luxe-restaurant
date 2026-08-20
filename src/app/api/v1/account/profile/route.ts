import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireCustomer } from "@/lib/server/account/session";
import { ensureCustomerProfile } from "@/lib/server/account/service";
import { supabaseCustomerProfiles } from "@/lib/server/supabase/customer-profiles";

function stringArray(value: unknown) {
  return Array.isArray(value)
    ? value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 20)
    : [];
}

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);
    const profile = await ensureCustomerProfile(customer.id);
    return apiSuccess({ profile }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}

export async function PATCH(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);
    const body = await parseJsonObject(request);

    await ensureCustomerProfile(customer.id);

    const profile = await supabaseCustomerProfiles.patch(customer.id, {
      favourite_area:
        typeof body.favouriteArea === "string" && body.favouriteArea.trim()
          ? body.favouriteArea.trim().slice(0, 120)
          : null,
      dietary_preferences: stringArray(body.dietaryPreferences),
      favourite_cuisines: stringArray(body.favouriteCuisines),
      marketing_opt_in: Boolean(body.marketingOptIn),
      notes:
        typeof body.notes === "string" && body.notes.trim()
          ? body.notes.trim().slice(0, 1000)
          : null,
      updated_at: new Date().toISOString(),
    });

    return apiSuccess({ profile }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
