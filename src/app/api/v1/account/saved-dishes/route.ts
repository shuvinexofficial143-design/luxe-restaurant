import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireCustomer } from "@/lib/server/account/session";
import { supabaseSavedDishes } from "@/lib/server/supabase/customer-saved-dishes";
import { serverIds } from "@/lib/server/db/ids";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);
    const dishes = await supabaseSavedDishes.listForCustomer(customer.id);
    return apiSuccess({ dishes }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);
    const body = await parseJsonObject(request);
    const dishSlug = requireString(body, "dishSlug", { max: 160 });

    const existing = await supabaseSavedDishes.findByDish(
      customer.id,
      dishSlug
    );

    if (existing) {
      return apiSuccess({ dish: existing, alreadySaved: true }, requestId);
    }

    const dish = await supabaseSavedDishes.insert({
      id: serverIds.audit(),
      customer_id: customer.id,
      dish_slug: dishSlug,
      dish_title: requireString(body, "dishTitle", { max: 160 }),
      image_url:
        typeof body.imageUrl === "string" && body.imageUrl.trim()
          ? body.imageUrl.trim().slice(0, 1000)
          : null,
    });

    return apiSuccess({ dish, alreadySaved: false }, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}

export async function DELETE(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);
    const url = new URL(request.url);
    const dishSlug = url.searchParams.get("dishSlug") || "";

    const existing = await supabaseSavedDishes.findByDish(
      customer.id,
      dishSlug
    );

    if (existing) {
      await supabaseSavedDishes.remove(existing.id);
    }

    return apiSuccess({ removed: Boolean(existing) }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
