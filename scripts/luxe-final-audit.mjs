import { spawnSync } from "node:child_process";

const steps = [
  ["lint", ["npm.cmd", ["run", "lint"]]],
  ["typecheck", ["npx.cmd", ["tsc", "--noEmit"]]],
  ["build", ["npm.cmd", ["run", "build"]]],
];

for (const [label, [command, args]] of steps) {
  console.log(`\n=== LUXE ${label.toUpperCase()} ===`);
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if ((result.status ?? 1) !== 0) {
    console.error(`\nFAILED: ${label}`);
    process.exit(result.status ?? 1);
  }
}

console.log("\nLUXE FINAL AUDIT: PASS");
