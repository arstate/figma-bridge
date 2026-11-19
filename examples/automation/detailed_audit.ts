import { callPlugin } from "./server/src/relay-client";

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
    // Precise emoji regex using Extended_Pictographic
    const emojiRegex = /\\p{Extended_Pictographic}/u;

    const report = [];

    for (const p of posterIds) {
      const poster = await figma.getNodeByIdAsync(p.id);
      if (!poster) {
        report.push({ num: p.num, id: p.id, error: "Not found" });
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

      // Check all floating elements
      const floatingNodes = poster.findAll(n => 
        n.name.toLowerCase().includes("float") || 
        n.name.toLowerCase().includes("logo_dof") ||
        n.name.toLowerCase().includes("orb")
      );

      const collisions = [];
      const floatings = [];

      for (const f of floatingNodes) {
        // Calculate absolute bounds of f
        const fBounds = {
          x: f.absoluteTransform[0][2],
          y: f.absoluteTransform[1][2],
          w: f.width,
          h: f.height,
          name: f.name,
          type: f.type,
          id: f.id
        };
        floatings.push(fBounds);

        // Check collision against all text nodes
        for (const t of allTexts) {
          const tBounds = {
            x: t.absoluteTransform[0][2],
            y: t.absoluteTransform[1][2],
            w: t.width,
            h: t.height
          };

          // AABB intersection
          const overlap = !(
            fBounds.x + fBounds.w <= tBounds.x ||
            tBounds.x + tBounds.w <= fBounds.x ||
            fBounds.y + fBounds.h <= tBounds.y ||
            tBounds.y + tBounds.h <= fBounds.y
          );

          if (overlap) {
            collisions.push({
              floating: { id: f.id, name: f.name, bounds: fBounds },
              text: { id: t.id, name: t.name, text: t.characters, bounds: tBounds }
            });
          }
        }
      }

      report.push({
        num: p.num,
        id: p.id,
        name: poster.name,
        totalTexts: allTexts.length,
        foundEmojis,
        foundGsm,
        floatings,
        collisions
      });
    }

    return report;
  `;

  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res, null, 2));
}

main().catch(console.error);
