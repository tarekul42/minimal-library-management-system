import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "src";
const ALLOW = ["src/index.css", "src/lib/styles.ts"];
const FORBIDDEN = [
  /bg-gray-(?:800|900|950)\b/,
  /bg-blue-(?:600|700)\b/,
  /text-gray-(?:300|400|500)\b/,
  /bg-green-600\b/,
  /text-red-400\b/,
  /bg-black\b/,
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(tsx?|css)$/.test(extname(p))) files.push(p);
  }
  return files;
}

const offenders = [];
for (const file of walk(ROOT)) {
  if (ALLOW.includes(file.replace(/\\/g, "/"))) continue;
  if (file.includes("components/ui")) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const re of FORBIDDEN) {
      if (re.test(line)) offenders.push(`${file}:${i + 1}: ${line.trim()}`);
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
