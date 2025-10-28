import fs from "fs";
import path from "path";

const docsDir = path.resolve("./docs");

function pad2(n) {
  return String(n).padStart(2, "0");
}

function getNowParts() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = pad2(now.getMonth() + 1);
  const dd = pad2(now.getDate());
  const hh = pad2(now.getHours());
  const mi = pad2(now.getMinutes());
  return { date: `${yyyy}/${mm}/${dd}`, time: `${hh}:${mi}` };
}

function ensureFrontMatter(content, defaultDate, defaultTime) {
  // Normalize line endings
  let text = content.replace(/\r\n?/g, "\n");
  let fmDate = null;

  if (text.startsWith("---\n")) {
    const endIdx = text.indexOf("\n---\n", 4);
    if (endIdx !== -1) {
      const fmStart = 4; // after first '---\n'
      const fmEnd = endIdx + 1; // position of the newline before closing '---\n'
      const fmBlock = text.slice(fmStart, fmEnd);
      const hasLastUpdated =
        /(^|\n)\s*Last updated:\s*(\d{4})\/(\d{2})\/(\d{2})(?:\s+\d{2}:\d{2})?/m.test(
          fmBlock
        );
      const dateMatch = fmBlock.match(
        /Last updated:\s*(\d{4})\/(\d{2})\/(\d{2})(?:\s+(\d{2}:\d{2}))?/
      );
      if (dateMatch) {
        fmDate = `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}`;
      }
      if (!hasLastUpdated) {
        const insertion = `Last updated: ${defaultDate} ${defaultTime}\n`;
        text = text.slice(0, fmStart) + insertion + text.slice(fmStart);
      }
      return { text, fmDate };
    }
  }

  // No valid front matter block; prepend one
  const header = `---\nLast updated: ${defaultDate} ${defaultTime}\n---\n`;
  text = header + text;
  return { text, fmDate: defaultDate };
}

function ensureFooterDate(text, dateToUse) {
  // Ensure footer format:
  // ---\n\n<div align="right">YYYY/MM/DD</div> at end of file
  const footerRegex =
    /(\n|\r\n)---\s*\n\s*<div align="right">(\d{4}\/\d{2}\/\d{2})<\/div>\s*$/;
  if (footerRegex.test(text)) {
    // Replace date if differs and we have a target date
    return text.replace(footerRegex, (m, nl, existingDate) => {
      const finalDate = dateToUse || existingDate;
      return `${nl}---\n\n<div align="right">${finalDate}</div>`;
    });
  }
  const suffix = `\n\n---\n\n<div align="right">${dateToUse}</div>\n`;
  return text.endsWith("\n") ? text + suffix : text + "\n" + suffix;
}

function run() {
  const { date, time } = getNowParts();
  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md"));

  let changedCount = 0;
  const changedFiles = [];

  files.forEach((file) => {
    const fullPath = path.join(docsDir, file);
    const original = fs.readFileSync(fullPath, "utf-8");

    let { text, fmDate } = ensureFrontMatter(original, date, time);
    // If front matter date exists, prefer that for footer; else use today's date
    const footerDate = fmDate || date;
    text = ensureFooterDate(text, footerDate);

    if (text !== original) {
      fs.writeFileSync(fullPath, text, "utf-8");
      changedCount++;
      changedFiles.push(file);
    }
  });

  if (changedCount) {
    console.log(`✅ Updated ${changedCount} markdown file(s):`);
    changedFiles.forEach((f) => console.log(`  - ${f}`));
  } else {
    console.log(
      "ℹ️ No changes needed. All markdown files already have required dates."
    );
  }
}

run();
