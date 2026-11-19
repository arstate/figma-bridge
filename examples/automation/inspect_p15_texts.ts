import { callPlugin } from "./server/src/relay-client";
async function main() {
  const code = `
    const p15 = await figma.getNodeByIdAsync("809:9931");
    // Get all texts in P15 with their relative bounds
    const texts = p15.findAll(n => n.type === "TEXT").map(t => ({
      name: t.name,
      chars: t.characters,
      rx: t.absoluteTransform[0][2] - p15.absoluteTransform[0][2],
      ry: t.absoluteTransform[1][2] - p15.absoluteTransform[1][2],
      w: t.width,
      h: t.height
    }));
    return texts;
  `;
  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res.value || res, null, 2));
}
main().catch(console.error);
