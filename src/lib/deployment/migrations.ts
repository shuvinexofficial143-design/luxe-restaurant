import { supabaseRest } from "@/lib/server/supabase/http";

export const expectedLatestMigration =
  "015_monitoring_privacy";

export const expectedMigrationFiles = [
  "002_supabase_core",
  "003_customer_auth",
  "004_customer_profile_loyalty",
  "005_reservation_engine",
  "006_order_engine",
  "007_crm",
  "008_analytics",
  "009_i18n",
  "010_security_rbac",
  "011_async_jobs_webhooks",
  "012_payments_billing",
  "013_communications_consent",
  "014_public_cms_seo",
  "015_monitoring_privacy",
] as const;

export async function latestDatabaseMigration() {
  const rows =
    await supabaseRest<
      { version: string }[]
    >("schema_migrations", {
      query:
        "select=version&order=version.desc&limit=1",
    });

  return rows[0]?.version || null;
}
