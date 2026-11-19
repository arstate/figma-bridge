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
    const collisions = [];

    for (const p of posterIds) {
      const poster = await figma.getNodeByIdAsync(p.id);
      if (!poster) continue;

      const allTexts = poster.findAll(n => n.type === "TEXT");
      const floatingNodes = poster.findAll(n => 
        n.name.toLowerCase().includes("float") || 
        n.name.toLowerCase().includes("orb") ||
        n.name.toLowerCase().includes("badge")
      );

      for (const f of floatingNodes) {
        // Skip if f itself is a child of another floating node
        if (f.type === "TEXT") continue; // We only check floating containers vs texts

        const fBox = {
          x: f.absoluteTransform[0][2],
          y: f.absoluteTransform[1][2],
          w: f.width,
          h: f.height,
          id: f.id,
          name: f.name
        };

        for (const t of allTexts) {
          // Skip if t is inside f
          let parent = t.parent;
          let isChildOfF = false;
          while (parent && parent !== poster) {
            if (parent.id === f.id) {
              isChildOfF = true;
              break;
            }
            parent = parent.parent;
          }
          if (isChildOfF) continue;

          const tBox = {
            x: t.absoluteTransform[0][2],
            y: t.absoluteTransform[1][2],
            w: t.width,
            h: t.height,
            id: t.id,
            name: t.name,
            chars: t.characters
          };

          // check overlap
          const overlap = !(
            fBox.x + fBox.w <= tBox.x ||
            tBox.x + tBox.w <= fBox.x ||
            fBox.y + fBox.h <= tBox.y ||
            tBox.y + tBox.h <= fBox.y
          );

          if (overlap && t.characters.trim().length > 0) {
            collisions.push({
              poster: p.num,
              floating: { name: f.name, id: f.id, x: fBox.x, y: fBox.y, w: fBox.w, h: fBox.h },
              text: { chars: t.characters, name: t.name, id: t.id, x: tBox.x, y: tBox.y, w: tBox.w, h: tBox.h }
            });
          }
        }
      }
    }

    return collisions;
  `;

  const res = await callPlugin("execute", { code });
  console.log("Real Non-Empty Text Collisions:", JSON.stringify(res.value || res, null, 2));
}

main().catch(console.error);
