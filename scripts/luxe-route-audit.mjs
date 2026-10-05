import { existsSync, readFileSync } from "node:fs";

const routes = [
  ["home", "src/app/page.tsx"],
  ["menu", "src/app/menu/page.tsx"],
  ["reservations", "src/app/reservations/page.tsx"],
  ["reservation confirmation", "src/app/reservations/confirmation/[id]/page.tsx"],
  ["legacy reservation redirect", "src/app/reservations/live/page.tsx"],
  ["order", "src/app/order/page.tsx"],
  ["order checkout", "src/app/order/checkout/page.tsx"],
  ["order tracking", "src/app/order/track/[id]/page.tsx"],
  ["table order", "src/app/order/live/page.tsx"],
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
  ["reservations API", "src/app/api/v1/reservations/route.ts"],
];

const contentChecks = [
  [
    "primary reservation engine",
    "src/app/reservations/page.tsx",
    "RealReservationForm",
  ],
  [
    "real checkout submit",
    "src/components/orders/CheckoutForm.tsx",
    "/api/v1/order-engine/create",
  ],
  [
    "primary order tracking",
    "src/components/orders/CheckoutForm.tsx",
    "/order/track/",
  ],
  [
    "reservation privacy lookup",
    "src/app/api/v1/reservations/route.ts",
    "reference",
  ],
  [
    "shared admin session gate",
    "src/components/admin/AdminShell.tsx",
    "requireAdminPagePermission",
  ],
];

let failures = 0;

for (const [label, routePath] of routes) {
  const ok = existsSync(routePath);
  console.log(`${ok ? "OK " : "MISS"} ${label.padEnd(28)} ${routePath}`);
  if (!ok) failures += 1;
}

for (const [label, routePath] of protectedAdminReads) {
  if (!existsSync(routePath)) {
    console.log(`MISS ${label.padEnd(28)} ${routePath}`);
    failures += 1;
    continue;
  }

  const source = readFileSync(routePath, "utf8");
  const guarded = source.includes("requireAdminPermission");
  console.log(`${guarded ? "OK " : "OPEN"} ${label.padEnd(28)} ${routePath}`);
  if (!guarded) failures += 1;
}

for (const [label, routePath, requiredText] of contentChecks) {
  if (!existsSync(routePath)) {
    console.log(`MISS ${label.padEnd(28)} ${routePath}`);
    failures += 1;
    continue;
  }

  const source = readFileSync(routePath, "utf8");
  const present = source.includes(requiredText);
  console.log(`${present ? "OK " : "FAIL"} ${label.padEnd(28)} ${routePath}`);
  if (!present) failures += 1;
}

if (failures) {
  console.error(`\nRoute audit found ${failures} routing/security issue(s).`);
  process.exit(1);
}

console.log("\nCore route, customer flow and API guard audit: PASS");
