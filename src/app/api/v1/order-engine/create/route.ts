import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { CUSTOMER_SESSION_COOKIE } from "@/lib/server/auth/customer-cookies";
import { resolveCustomerSession } from "@/lib/server/auth/customer-service";
import { createDatabaseOrder } from "@/lib/server/orders/service";
import type { OrderCartInput } from "@/lib/server/orders/types";

function parseItems(value: unknown): OrderCartInput[] {
  if (!Array.isArray(value)) {
    throw new ApiError(
      "INVALID_CART",
      "items must be an array.",
      422
    );
  }

  const items = value
    .slice(0, 40)
    .map((item): OrderCartInput | null => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const record = item as Record<string, unknown>;
      const slug =
        typeof record.slug === "string" ? record.slug.trim() : "";
      const quantity =
        typeof record.quantity === "number"
          ? Math.floor(record.quantity)
          : 0;

      if (!slug || quantity < 1 || quantity > 20) return null;

      return {
        slug,
        quantity,
        notes:
          typeof record.notes === "string"
            ? record.notes.trim().slice(0, 300)
            : "",
      };
    })
    .filter((item): item is OrderCartInput => Boolean(item));

  if (!items.length) {
    throw new ApiError(
      "EMPTY_CART",
      "At least one valid order item is required.",
      422
    );
  }

  return items;
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);
    const fulfillment = requireString(body, "fulfillment", {
      max: 20,
    }).toUpperCase();

    if (!["TABLE", "PICKUP"].includes(fulfillment)) {
      throw new ApiError(
        "INVALID_FULFILLMENT",
        "fulfillment must be TABLE or PICKUP.",
        422
      );
    }

    const token =
      request.cookies.get(CUSTOMER_SESSION_COOKIE)?.value || "";
    const session = token
      ? await resolveCustomerSession(token).catch(() => null)
      : null;

    const tableNumber =
      typeof body.tableNumber === "string"
        ? body.tableNumber.trim().slice(0, 50)
        : "";

    if (fulfillment === "TABLE" && !tableNumber) {
      throw new ApiError(
        "TABLE_NUMBER_REQUIRED",
        "Table number is required for dine-in ordering.",
        422
      );
    }

    const guestName =
      fulfillment === "TABLE"
        ? session?.customer.name || `Table ${tableNumber}`
        : requireString(body, "guestName", {
            min: 2,
            max: 100,
          });

    const phone =
      fulfillment === "TABLE"
        ? session?.customer.phone || "TABLE-ORDER"
        : requireString(body, "phone", {
            min: 8,
            max: 40,
          });

    const order = await createDatabaseOrder({
      customerId: session?.customer.id,
      guestName,
      phone,
      fulfillment: fulfillment as "TABLE" | "PICKUP",
      tableNumber,
      pickupTime:
        typeof body.pickupTime === "string"
          ? body.pickupTime.trim().slice(0, 100)
          : "",
      notes:
        typeof body.notes === "string"
          ? body.notes.trim().slice(0, 1000)
          : "",
      items: parseItems(body.items),
    });

    return apiSuccess({ order }, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
