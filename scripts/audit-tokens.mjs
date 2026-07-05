import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "src";
const ALLOW = [
  "src/index.css",
  "src/lib/styles.ts",
  "src/lib/chart-utils.ts",
];
const ALLOW_DIRS = ["src/components/ui/"];

const FORBIDDEN_TAILWIND = [
  /bg-gray-/,
  /bg-blue-/,
  /text-gray-/,
  /text-blue-/,
  /border-gray-/,
  /bg-green-/,
  /text-red-/,
  /bg-red-/,
  /bg-black\b/,
  /text-black\b/,
  /bg-white\b/,
  /text-white\b/,
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(tsx?|css)$/.test(extname(p))) files.push(p);
  }
  return files;
}

function isAllowed(file) {
  const normalized = file.replace(/\\/g, "/");
  if (ALLOW.includes(normalized)) return true;
  if (ALLOW_DIRS.some((d) => normalized.startsWith(d))) return true;
  return false;
}

function isComment(line) {
  const t = line.trimStart();
  return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*");
}

function isExemptHex(line) {
  // Exempt hex colors in SVG fill/stroke attrs (brand logos)
  if (/^\s*</.test(line) && /(?:fill|stroke|stop-color)\s*=\s*"/.test(line)) return true;
  // Exempt hex colors inside data arrays or template strings (color swatches, chart configs)
  // Match lines that look like data assignments, array literals, or config objects
  const hexes = [...line.matchAll(/#[0-9a-fA-F]{3,8}\b/g)];
  if (hexes.length === 0) return false;
  const allArrayContext = hexes.every((m) => {
    const before = line.substring(0, m.index);
    return /["'`[,]\s*$/.test(before) || /:\s*$/.test(before);
  });
  return allArrayContext;
}

const offenders = [];
for (const file of walk(ROOT)) {
  if (isAllowed(file)) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (isComment(line)) return;
    for (const re of FORBIDDEN_TAILWIND) {
      if (re.test(line)) {
        offenders.push(`${file}:${i + 1}: ${line.trim()}`);
        return;
      }
    }
    if (isExemptHex(line)) return;
    const hexMatch = line.match(/#[0-9a-fA-F]{3,8}\b/g);
    if (hexMatch) {
      offenders.push(`${file}:${i + 1}: ${line.trim()}`);
    }
  });
}

if (offenders.length) {
  console.error(
    `Found ${offenders.length} forbidden literal(s):\n` +
      offenders.join("\n"),
  );
  process.exit(1);
}
console.log("No forbidden colour literals.");
