const base = (
  process.env.LUXE_SMOKE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");

const targets = [
  ["/", [200]],
  ["/menu", [200]],
  ["/reservations", [200]],
  ["/api/health/live", [200]],
  ["/api/health/readiness", [200, 503]],
];

let failures = 0;

for (const [path, accepted] of targets) {
  try {
    const response = await fetch(`${base}${path}`, {
      redirect: "manual",
    });

    const ok = accepted.includes(response.status);
    console.log(
      `${ok ? "OK " : "BAD"} ${String(response.status).padEnd(4)} ${path}`
    );

    if (!ok) failures += 1;
  } catch (error) {
    failures += 1;
    console.log(
      `ERR ${path} ${error instanceof Error ? error.message : "request failed"}`
    );
  }
}

if (failures) {
  console.error(`\nSmoke test failed for ${failures} target(s).`);
  process.exit(1);
}

console.log("\nHTTP smoke test: PASS");
