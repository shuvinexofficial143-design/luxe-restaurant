import {
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { join } from "node:path";

const roots = ["src", "database", "scripts"];
const extensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".sql",
  ".json",
  ".md",
]);

const suspicious = [
  /sk_live_[A-Za-z0-9_-]{12,}/g,
  /rzp_live_[A-Za-z0-9_-]{8,}/g,
  /re_[A-Za-z0-9_-]{20,}/g,
  /SUPABASE_SERVICE_ROLE_KEY\s*=\s*["'][^"']+["']/g,
  /RAZORPAY_KEY_SECRET\s*=\s*["'][^"']+["']/g,
];

const findings = [];

function walk(path) {
  for (const entry of readdirSync(path)) {
    const full = join(path, entry);
    const stat = statSync(full);

    if (stat.isDirectory()) {
      if (
        entry === "node_modules" ||
        entry === ".next" ||
        entry === ".git"
      ) {
        continue;
      }
      walk(full);
      continue;
    }

    const dot = entry.lastIndexOf(".");
    const ext = dot >= 0 ? entry.slice(dot) : "";

    if (!extensions.has(ext)) continue;

    const text = readFileSync(full, "utf8");

    for (const pattern of suspicious) {
      pattern.lastIndex = 0;
      if (pattern.test(text)) {
        findings.push(full);
        break;
      }
    }
  }
}

for (const root of roots) {
  try {
    walk(root);
  } catch {
    // Missing optional root is ignored.
  }
}

if (findings.length) {
  console.error("Potential hard-coded secrets found:");
  for (const path of findings) console.error(` - ${path}`);
  process.exit(1);
}

console.log("Secret scan: no listed hard-coded secret patterns found.");
console.log(
  "This is a lightweight scan, not a substitute for GitHub/Vercel secret scanning."
);
