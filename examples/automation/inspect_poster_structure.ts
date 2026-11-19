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
    const res = [];
    for (const p of posterIds) {
      const node = await figma.getNodeByIdAsync(p.id);
      if (!node) continue;
      const children = node.children.map((c, idx) => ({
        idx,
        id: c.id,
        name: c.name,
        type: c.type,
        x: c.x,
        y: c.y,
        width: c.width,
        height: c.height,
        visible: c.visible
      }));
      res.push({
        num: p.num,
        name: node.name,
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
        children
      });
    }
    return res;
  `;
  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res.value || res, null, 2));
}

main().catch(console.error);
