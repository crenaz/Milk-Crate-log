import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const mdPath = join(root, "FILE.md");
const jsonPath = join(root, "FILE.json");

const content = readFileSync(mdPath, "utf-8");
const lines = content.split("\n");
const urlRegex = /^https?:\/\//i;
const entries = [];
let lastTitle = "";

for (const line of lines) {
  const trimmed = line.trim();
  if (urlRegex.test(trimmed)) {
    entries.push({
      title: lastTitle || trimmed,
      url: trimmed,
    });
    lastTitle = "";
  } else if (trimmed) {
    lastTitle = trimmed;
  } else {
    lastTitle = "";
  }
}

writeFileSync(jsonPath, JSON.stringify(entries, null, 2), "utf-8");
console.log(`Wrote ${entries.length} entries to FILE.json`);
