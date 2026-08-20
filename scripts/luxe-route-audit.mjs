import { existsSync } from "node:fs";

const routes = [
  ["home", "src/app/page.tsx"],
  ["menu", "src/app/menu/page.tsx"],
  ["reservations", "src/app/reservations/page.tsx"],
  ["live reservation", "src/app/reservations/live/page.tsx"],
  ["live order", "src/app/order/live/page.tsx"],
  ["account secure", "src/app/account/secure/page.tsx"],
  ["admin", "src/app/admin/page.tsx"],
  ["admin login", "src/app/admin/login/page.tsx"],
  ["billing", "src/app/admin/billing/page.tsx"],
  ["communications", "src/app/admin/communications/page.tsx"],
  ["operations", "src/app/admin/operations/page.tsx"],
  ["monitoring", "src/app/admin/monitoring/page.tsx"],
  ["privacy", "src/app/admin/privacy/page.tsx"],
  ["seo", "src/app/admin/seo/page.tsx"],
  ["health live", "src/app/api/health/live/route.ts"],
  ["health readiness", "src/app/api/health/readiness/route.ts"],
];

let missing = 0;

for (const [label, path] of routes) {
  const ok = existsSync(path);
  console.log(`${ok ? "OK " : "MISS"} ${label.padEnd(22)} ${path}`);
  if (!ok) missing += 1;
}

if (missing) {
  console.error(`\nRoute audit found ${missing} missing core route files.`);
  process.exit(1);
}

console.log("\nCore route audit: PASS");
