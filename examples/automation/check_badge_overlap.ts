import { callPlugin } from "./server/src/relay-client";

async function main() {
  const code = `
    const posterIds = [
      { num: 14, id: "809:10263" },
      { num: 16, id: "809:10097" },
      { num: 17, id: "809:10425" },
      { num: 18, id: "809:10591" },
      { num: 19, id: "809:10758" },
      { num: 20, id: "809:10921" }
    ];

    const results = [];

    for (const p of posterIds) {
      const poster = await figma.getNodeByIdAsync(p.id);
      if (!poster) continue;

      const badge = poster.findOne(n => n.name.includes("Floating_2_Crisp_Badge"));
      if (!badge) continue;

      // Find all texts inside poster
      const allTexts = poster.findAll(n => n.type === "TEXT");
      const badgeBounds = {
        x: badge.x,
        y: badge.y,
        w: badge.width,
        h: badge.height
      };

      const nearbyTexts = [];
      for (const t of allTexts) {
        // Skip texts inside badge itself
        let par = t.parent;
        let isInside = false;
        while (par && par !== poster) {
          if (par.id === badge.id) { isInside = true; break; }
          par = par.parent;
        }
        if (isInside) continue;

        // Get relative bounds to poster
        const tRelX = t.absoluteTransform[0][2] - poster.absoluteTransform[0][2];
        const tRelY = t.absoluteTransform[1][2] - poster.absoluteTransform[1][2];

        // check intersection with badgeBounds
        const overlap = !(
          badgeBounds.x + badgeBounds.w <= tRelX ||
          tRelX + t.width <= badgeBounds.x ||
          badgeBounds.y + badgeBounds.h <= tRelY ||
          tRelY + t.height <= badgeBounds.y
        );

        if (overlap) {
          nearbyTexts.push({
            id: t.id,
            name: t.name,
            chars: t.characters,
            x: tRelX,
            y: tRelY,
            w: t.width,
            h: t.height
          });
        }
      }

      results.push({
        num: p.num,
        badge: { name: badge.name, pos: [badge.x, badge.y], size: [badge.width, badge.height] },
        nearbyTexts
      });
    }

    return results;
  `;

  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res.value || res, null, 2));
}

main().catch(console.error);
