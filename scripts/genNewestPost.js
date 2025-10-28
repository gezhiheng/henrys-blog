import fs from "fs";
import path from "path";

const docsDir = path.resolve("./docs");
const outputFile = path.resolve("./data/newestPost.js");

function parseLastUpdated(content) {
  const m = content.match(
    /Last updated:\s*(\d{4})\/(\d{2})\/(\d{2})(?:\s+(\d{2}):(\d{2}))?/
  );
  if (!m) return null;
  const [_, y, mo, d, hh = "00", mi = "00"] = m;
  const iso = `${y}-${mo}-${d}T${hh}:${mi}:00`;
  const ts = new Date(iso).getTime();
  return isNaN(ts) ? null : ts;
}

function run() {
  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md"));
  const items = [];
  for (const file of files) {
    const full = path.join(docsDir, file);
    const text = fs.readFileSync(full, "utf-8");
    const ts = parseLastUpdated(text);
    if (ts) items.push({ file, ts });
  }

  if (!items.length) {
    console.warn(
      'No markdown files with "Last updated" found. Skipping update.'
    );
    return;
  }

  items.sort((a, b) => b.ts - a.ts);
  const newest = items[0];
  const link = `docs/${newest.file}`;
  const out = `export const newestPostPath = ${JSON.stringify(link)}\n`;
  fs.writeFileSync(outputFile, out, "utf-8");
  console.log(`✅ Newest post set to: ${link}`);
}

run();
