import { supabaseRest } from "@/lib/server/supabase/http";
import type { SanitizedBackup } from "./types";

const tableQueries: Record<string, string> = {
  customers:
    "select=id,name,email,phone,active,created_at&limit=10000",
  customer_profiles:
    "select=*&limit=10000",
  reservations:
    "select=*&limit=10000",
  orders:
    "select=*&limit=10000",
  order_items:
    "select=*&limit=20000",
  cms_content:
    "select=*&limit=10000",
  crm_customer_profiles:
    "select=*&limit=10000",
  crm_customer_tags:
    "select=*&limit=10000",
  communication_preferences:
    "select=*&limit=10000",
  payment_intents:
    "select=*&limit=10000",
  billing_receipts:
    "select=*&limit=10000",
};

export async function createSanitizedBackup(): Promise<SanitizedBackup> {
  const tables: Record<string, unknown[]> = {};
  let recordCount = 0;

  for (const [table, query] of Object.entries(
    tableQueries
  )) {
    try {
      const rows =
        await supabaseRest<unknown[]>(
          table,
          { query }
        );

      tables[table] = rows;
      recordCount += rows.length;
    } catch (error) {
      tables[table] = [
        {
          exportError:
            error instanceof Error
              ? error.message
              : "Table export failed.",
        },
      ];
    }
  }

  return {
    generatedAt:
      new Date().toISOString(),
    scope: "SANITIZED_CORE",
    tables,
    recordCount,
    notes: [
      "Admin password hashes are excluded.",
      "Admin session token hashes are excluded.",
      "Provider secrets are environment variables and are not exported.",
      "This is an on-demand JSON export, not an offsite backup guarantee.",
    ],
  };
}
