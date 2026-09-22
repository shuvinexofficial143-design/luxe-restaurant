import { existsSync } from "node:fs";

const migrations = [
  "002_supabase_core.sql",
  "003_customer_auth.sql",
  "004_customer_profile_loyalty.sql",
  "005_reservation_engine.sql",
  "006_ordering_kds.sql",
  "007_crm.sql",
  "008_analytics.sql",
  "009_i18n.sql",
  "010_security_rbac.sql",
  "011_async_jobs_webhooks.sql",
  "012_payments_billing.sql",
  "013_communications_consent.sql",
  "014_public_cms_seo.sql",
  "015_monitoring_privacy.sql",
];

let missing = 0;

for (const name of migrations) {
  const path = `database/migrations/${name}`;
  const ok = existsSync(path);
  console.log(`${ok ? "OK " : "MISS"} ${path}`);
  if (!ok) missing += 1;
}

if (missing) {
  console.error(
    `\nMigration file audit found ${missing} missing migration file(s).`
  );
  process.exit(1);
}

console.log("\nMigration file audit: PASS");
console.log(
  "Important: this checks local files only. It does NOT prove migrations were applied to Supabase."
);
