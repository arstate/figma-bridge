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

      const hero = poster.findOne(n => n.name.includes("Hero") && n.type === "FRAME");
      const bBars = poster.findOne(n => n.name.includes("Benefit_Bars") && n.type === "FRAME");

      results.push({
        num: p.num,
        hero: hero ? {
          name: hero.name,
          x: hero.x,
          y: hero.y,
          w: hero.width,
          h: hero.height,
          children: hero.children.map(c => ({
            name: c.name,
            type: c.type,
            x: c.x,
            y: c.y,
            w: c.width,
            h: c.height
          }))
        } : null,
        bBars: bBars ? {
          name: bBars.name,
          x: bBars.x,
          y: bBars.y,
          w: bBars.width,
          h: bBars.height,
          children: bBars.children.map(c => ({
            name: c.name,
            type: c.type,
            x: c.x,
            y: c.y,
            w: c.width,
            h: c.height,
            subChildren: (c.children || []).map(sc => ({
              name: sc.name,
              type: sc.type,
              chars: sc.type === "TEXT" ? sc.characters : undefined,
              x: sc.x,
              y: sc.y,
              w: sc.width,
              h: sc.height
            }))
          }))
        } : null
      });
    }

    return results;
  `;

  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res.value || res, null, 2));
}

main().catch(console.error);
