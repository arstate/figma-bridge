import { callPlugin } from "./server/src/relay-client";
async function main() {
  const code = `
    const posterIds = ["809:10425", "809:10591", "809:10758", "809:10921"];
    const res = [];
    for (const pid of posterIds) {
      const p = await figma.getNodeByIdAsync(pid);
      if (!p) continue;
      const hero = p.findOne(n => n.name.includes("Hero") && n.type === "FRAME");
      if (!hero) continue;
      const texts = hero.findAll(n => n.type === "TEXT" && n.x < 150 && n.y > 350);
      res.push({
        pid,
        name: p.name,
        heroName: hero.name,
        texts: texts.map(t => ({ chars: t.characters, x: t.x, y: t.y, w: t.width, h: t.height }))
      });
    }
    return res;
  `;
  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res.value || res, null, 2));
}
main().catch(console.error);
