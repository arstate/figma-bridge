import { callPlugin } from "./server/src/relay-client";

async function main() {
  const code = `
    const posterIds = ["809:10263", "809:9931", "809:10097", "809:10425", "809:10591", "809:10758", "809:10921"];
    const found = [];
    for (const pid of posterIds) {
      const p = await figma.getNodeByIdAsync(pid);
      if (!p) continue;
      const icons = p.findAll(n => n.name === "SVG_WA_Icon");
      found.push({
        pid,
        name: p.name,
        icons: icons.map(i => ({ id: i.id, name: i.name, x: i.x, y: i.y, parent: i.parent ? i.parent.name : null }))
      });
    }
    return found;
  `;
  const res = await callPlugin("execute", { code });
  console.log("SVG_WA_Icon search:", JSON.stringify(res.value || res, null, 2));
}

main().catch(console.error);
