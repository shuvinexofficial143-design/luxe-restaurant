import { existsSync, readFileSync } from "node:fs";

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

const protectedAdminReads = [
  ["admin audit API", "src/app/api/v1/admin/audit/route.ts"],
  ["admin sessions API", "src/app/api/v1/admin/sessions/route.ts"],
  ["admin users API", "src/app/api/v1/admin/users/route.ts"],
];

let failures = 0;

for (const [label, routePath] of routes) {
  const ok = existsSync(routePath);
  console.log(`${ok ? "OK " : "MISS"} ${label.padEnd(22)} ${routePath}`);
  if (!ok) failures += 1;
}

for (const [label, routePath] of protectedAdminReads) {
  if (!existsSync(routePath)) {
    console.log(`MISS ${label.padEnd(22)} ${routePath}`);
    failures += 1;
    continue;
  }

  const source = readFileSync(routePath, "utf8");
  const guarded = source.includes("requireAdminPermission");
  console.log(`${guarded ? "OK " : "OPEN"} ${label.padEnd(22)} ${routePath}`);
  if (!guarded) failures += 1;
}

if (failures) {
  console.error(`\nRoute audit found ${failures} routing/security issue(s).`);
  process.exit(1);
}

console.log("\nCore route and admin API guard audit: PASS");
