import {
  supabaseCMS,
} from "@/lib/server/supabase/cms";
import {
  supabaseOrders,
} from "@/lib/server/supabase/orders";
import {
  supabaseReservations,
} from "@/lib/server/supabase/reservations";
import type {
  MigrationItemResult,
  MigrationPayload,
  MigrationSectionResult,
} from "./types";
import {
  transformLocalRecord,
} from "./transform";

export async function runLocalMigration(
  payload: MigrationPayload
): Promise<MigrationSectionResult> {
  const items:
    MigrationItemResult[] = [];

  for (
    const raw of payload.records.slice(
      0,
      200
    )
  ) {
    try {
      if (
        payload.section ===
        "reservations"
      ) {
        const transformed =
          transformLocalRecord(
            "reservations",
            raw
          );

        if (!transformed) {
          items.push({
            id: "unknown",
            ok: false,
            message:
              "Record shape was not recognized.",
          });
          continue;
        }

        const existing =
          await supabaseReservations.findById(
            transformed.id
          );

        if (existing) {
          await supabaseReservations.patch(
            transformed.id,
            transformed
          );
        } else {
          await supabaseReservations.insert(
            transformed
          );
        }

        items.push({
          id: transformed.id,
          ok: true,
          message: "Migrated.",
        });
        continue;
      }

      if (
        payload.section === "orders"
      ) {
        const transformed =
          transformLocalRecord(
            "orders",
            raw
          );

        if (!transformed) {
          items.push({
            id: "unknown",
            ok: false,
            message:
              "Record shape was not recognized.",
          });
          continue;
        }

        const existing =
          await supabaseOrders.findById(
            transformed.id
          );

        if (existing) {
          await supabaseOrders.patch(
            transformed.id,
            transformed
          );
        } else {
          await supabaseOrders.insert(
            transformed
          );
        }

        items.push({
          id: transformed.id,
          ok: true,
          message: "Migrated.",
        });
        continue;
      }

      const transformed =
        transformLocalRecord(
          "cms",
          raw
        );

      if (!transformed) {
        items.push({
          id: "unknown",
          ok: false,
          message:
            "Record shape was not recognized.",
        });
        continue;
      }

      const existing =
        await supabaseCMS.findById(
          transformed.id
        );

      if (existing) {
        await supabaseCMS.patch(
          transformed.id,
          transformed
        );
      } else {
        await supabaseCMS.insert(
          transformed
        );
      }

      items.push({
        id: transformed.id,
        ok: true,
        message: "Migrated.",
      });
    } catch (error) {
      const rawId =
        raw &&
        typeof raw === "object" &&
        !Array.isArray(raw) &&
        typeof (
          raw as Record<
            string,
            unknown
          >
        ).id === "string"
          ? String(
              (
                raw as Record<
                  string,
                  unknown
                >
              ).id
            )
          : "unknown";

      items.push({
        id: rawId,
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Migration failed.",
      });
    }
  }

  const migrated =
    items.filter(
      (item) => item.ok
    ).length;

  return {
    section: payload.section,
    attempted: items.length,
    migrated,
    failed:
      items.length - migrated,
    items,
  };
}
