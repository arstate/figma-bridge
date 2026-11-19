import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

const posterIds = [
  { num: 14, id: "809:10263" },
  { num: 15, id: "809:9931" },
  { num: 16, id: "809:10097" },
  { num: 17, id: "809:10425" },
  { num: 18, id: "809:10591" },
  { num: 19, id: "809:10758" },
  { num: 20, id: "809:10921" }
];

async function main() {
  const code = `
    const posterIds = ${JSON.stringify(posterIds)};

    // 1. Position P15 Orb in zero-collision zone (rx: 975, ry: 315)
    const p15 = await figma.getNodeByIdAsync("809:9931");
    if (p15) {
      const orb15 = p15.findOne(n => n.name === "Floating_Geometric_Orb_DOF");
      if (orb15) {
        orb15.x = 975;
        orb15.y = 315;
        orb15.resize(80, 80);
      }
    }

    // 2. Comprehensive Forensic Audit across all 7 posters
    const emojiRegex = /\\p{Extended_Pictographic}/u;
    const auditReport = [];

    for (const p of posterIds) {
      const poster = await figma.getNodeByIdAsync(p.id);
      if (!poster) {
        auditReport.push({ num: p.num, error: "Not found" });
        continue;
      }

      const allTexts = poster.findAll(n => n.type === "TEXT");
      const foundEmojis = [];
      const foundGsm = [];

      for (const t of allTexts) {
        const str = t.characters || "";
        if (emojiRegex.test(str)) {
          foundEmojis.push({ id: t.id, name: t.name, text: str });
        }
        if (/GSM/i.test(str) || /v2\\.5/i.test(str)) {
          foundGsm.push({ id: t.id, name: t.name, text: str });
        }
      }

      // Find all genuine floating decorative nodes
      const floatingNodes = poster.findAll(n => 
        (n.name.toLowerCase().includes("float") || n.name.toLowerCase().includes("orb")) &&
        n.type !== "TEXT"
      );

      const collisions = [];

      for (const f of floatingNodes) {
        const fAbsX = f.absoluteTransform[0][2];
        const fAbsY = f.absoluteTransform[1][2];
        const fW = f.width;
        const fH = f.height;

        for (const t of allTexts) {
          if (!t.characters || t.characters.trim().length === 0) continue;

          // Check if text is a descendant of f (e.g. text inside a floating badge)
          let par = t.parent;
          let isDescendant = false;
          while (par && par !== poster) {
            if (par.id === f.id) { isDescendant = true; break; }
            par = par.parent;
          }
          if (isDescendant) continue;

          const tAbsX = t.absoluteTransform[0][2];
          const tAbsY = t.absoluteTransform[1][2];
          const tW = t.width;
          const tH = t.height;

          const overlap = !(
            fAbsX + fW <= tAbsX ||
            tAbsX + tW <= fAbsX ||
            fAbsY + fH <= tAbsY ||
            tAbsY + tH <= fAbsY
          );

          if (overlap) {
            collisions.push({
              floating: { id: f.id, name: f.name, x: fAbsX, y: fAbsY, w: fW, h: fH },
              text: { id: t.id, name: t.name, text: t.characters, x: tAbsX, y: tAbsY, w: tW, h: tH }
            });
          }
        }
      }

      // Check SVG vector icons present
      const svgIcons = poster.findAll(n => n.name === "Vector_SVG_Icon");

      auditReport.push({
        num: p.num,
        name: poster.name,
        totalTexts: allTexts.length,
        foundEmojis,
        foundGsm,
        floatingCount: floatingNodes.length,
        svgIconsCount: svgIcons.length,
        collisions
      });
    }

    return auditReport;
  `;

  console.log("Executing final audit and perfection...");
  const res = await callPlugin("execute", { code });
  const report = res.value || res;
  console.log("Audit Report:");
  console.log(JSON.stringify(report, null, 2));

  // Verify that all collisions are 0 and emojis are 0
  let totalCollisions = 0;
  let totalEmojis = 0;
  let totalGsm = 0;

  for (const item of report) {
    totalCollisions += item.collisions.length;
    totalEmojis += item.foundEmojis.length;
    totalGsm += item.foundGsm.length;
  }

  console.log(`\n==========================================`);
  console.log(`TOTAL COLLISIONS: ${totalCollisions}`);
  console.log(`TOTAL EMOJIS: ${totalEmojis}`);
  console.log(`TOTAL GSM OCCURRENCES: ${totalGsm}`);
  console.log(`==========================================\n`);

  if (totalCollisions === 0 && totalEmojis === 0 && totalGsm === 0) {
    console.log("PERFECTION ACHIEVED! Capturing high-resolution verified screenshots...");

    for (const p of posterIds) {
      console.log(`Capturing poster ${p.num} (${p.id})...`);
      const snap = await callPlugin("get_screenshot", { nodeId: p.id, format: "png", scale: 1 });
      const buf = Buffer.from(snap.data, "base64");
      const outPath = `/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/ads_poster_${p.num}_verified.png`;
      writeFileSync(outPath, buf);
      console.log(`Saved ads_poster_${p.num}_verified.png (${buf.length} bytes)`);
    }
    console.log("All screenshots captured and saved successfully!");
  } else {
    console.error("Audit did not pass 100% cleanly! Please review report above.");
  }
}

main().catch(console.error);
