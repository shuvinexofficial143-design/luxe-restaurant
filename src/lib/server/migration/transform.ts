import type {
  LocalMigrationSection,
} from "./types";
import type {
  ReservationDBRow,
} from "@/lib/server/supabase/reservations";
import type {
  OrderDBRow,
} from "@/lib/server/supabase/orders";
import type {
  CMSDBRow,
} from "@/lib/server/supabase/cms";

function objectRecord(
  value: unknown
): Record<string, unknown> | null {
  return value &&
    typeof value === "object" &&
    !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function text(
  record: Record<string, unknown>,
  key: string
) {
  return typeof record[key] === "string"
    ? String(record[key])
    : "";
}

function num(
  record: Record<string, unknown>,
  key: string
) {
  return typeof record[key] === "number"
    ? Number(record[key])
    : 0;
}

export function transformLocalRecord(
  section: "reservations",
  value: unknown
): ReservationDBRow | null;
export function transformLocalRecord(
  section: "orders",
  value: unknown
): OrderDBRow | null;
export function transformLocalRecord(
  section: "cms",
  value: unknown
): CMSDBRow | null;
export function transformLocalRecord(
  section: LocalMigrationSection,
  value: unknown
):
  | ReservationDBRow
  | OrderDBRow
  | CMSDBRow
  | null {
  const record =
    objectRecord(value);

  if (!record) return null;

  if (section === "reservations") {
    const id =
      text(record, "id");

    if (!id) return null;

    return {
      id,
      guest_name:
        text(record, "name"),
      email:
        text(record, "email"),
      phone:
        text(record, "phone"),
      reservation_date:
        text(record, "date"),
      reservation_time:
        text(record, "time"),
      guest_count:
        Math.max(
          1,
          num(record, "guests") || 1
        ),
      area:
        text(record, "area") || null,
      table_id:
        text(record, "tableId") || null,
      occasion:
        text(record, "occasion") || null,
      notes:
        text(record, "notes") || null,
      status:
        text(record, "status") ||
        "CONFIRMED",
    };
  }

  if (section === "orders") {
    const id =
      text(record, "id");

    if (!id) return null;

    return {
      id,
      guest_name:
        text(record, "name"),
      phone:
        text(record, "phone"),
      fulfillment:
        text(record, "fulfillment") ||
        "PICKUP",
      table_number:
        text(record, "tableNumber") ||
        null,
      pickup_time:
        text(record, "pickupTime") ||
        null,
      subtotal:
        num(record, "subtotal"),
      service_charge:
        num(
          record,
          "serviceCharge"
        ),
      total:
        num(record, "total"),
      status:
        text(record, "status") ||
        "RECEIVED",
      notes:
        text(record, "notes") || null,
    };
  }

  const id =
    text(record, "id");

  if (!id) return null;

  return {
    id,
    collection:
      text(record, "collection") ||
      "menu",
    title:
      text(record, "title"),
    slug:
      text(record, "slug"),
    excerpt:
      text(record, "excerpt"),
    image_url:
      text(record, "image"),
    category:
      text(record, "category"),
    price:
      typeof record.price === "number"
        ? record.price
        : null,
    status:
      text(record, "status") ||
      "DRAFT",
    featured:
      Boolean(record.featured),
    sort_order:
      num(record, "sortOrder") || 1,
  };
}
