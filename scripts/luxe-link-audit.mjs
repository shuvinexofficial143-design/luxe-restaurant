import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const appDir = "src/app";
const scanDirs = ["src/app", "src/components"];

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function routeFromPage(file) {
  let route = relative(appDir, file).split(sep).join("/");
  route = route.replace(/\/page\.tsx$/, "");
  route = route.replace(/^page\.tsx$/, "");
  const parts = route
    .split("/")
    .filter(Boolean)
    .filter((part) => !(part.startsWith("(") && part.endsWith(")")));
  return "/" + parts.join("/");
}

function routePattern(route) {
  if (route === "/") return /^\/$/;
  const escaped = route
    .split("/")
    .map((part) => {
      if (!part) return "";
      if (/^\[\[\.\.\..+\]\]$/.test(part)) return ".*";
      if (/^\[\.\.\..+\]$/.test(part)) return ".+";
      if (/^\[.+\]$/.test(part)) return "[^/]+";
      return part.replace(/[.*+?^$()|[\]{}\\]/g, "\\$&");
    })
    .join("/");
  return new RegExp("^" + escaped + "/?$");
}

const pageFiles = walk(appDir).filter((file) => file.endsWith("page.tsx"));
const routes = pageFiles.map(routeFromPage);
const routePatterns = routes.map((route) => ({ route, pattern: routePattern(route) }));

const sourceFiles = scanDirs
  .flatMap(walk)
  .filter((file) => /\.(tsx|ts)$/.test(file));

const refs = [];
const hrefPattern = /href\s*=\s*["'](\/[^"'{}]*)["']/g;

for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(hrefPattern)) {
    const raw = match[1];
    const path = raw.split(/[?#]/)[0] || "/";
    if (path.startsWith("/api/") || path.startsWith("/_next/")) continue;
    refs.push({ file, raw, path });
  }
}

const broken = refs.filter(
  ({ path }) => !routePatterns.some(({ pattern }) => pattern.test(path))
);

const uniqueBroken = Array.from(
  new Map(broken.map((item) => [item.file + "|" + item.raw, item])).values()
);

console.log(`Discovered ${routes.length} app page routes and checked ${refs.length} static internal links.`);

if (uniqueBroken.length) {
  console.error("\nBroken static internal links:");
  for (const item of uniqueBroken) {
    console.error(`- ${item.raw} in ${item.file}`);
  }
  process.exit(1);
}

console.log("Static internal link audit: PASS");
