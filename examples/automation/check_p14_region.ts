import { callPlugin } from "./server/src/relay-client";

async function main() {
  const code = `
    const p14 = await figma.getNodeByIdAsync("809:10263");
    if (!p14) return null;
    const allTexts = p14.findAll(n => n.type === "TEXT");
    
    // Check rectangle x: 0 to 120, y: 200 to 320
    const inRegion = allTexts.filter(t => {
      const rx = t.absoluteTransform[0][2] - p14.absoluteTransform[0][2];
      const ry = t.absoluteTransform[1][2] - p14.absoluteTransform[1][2];
      return rx < 150 && ry >= 200 && ry <= 350;
    }).map(t => ({ chars: t.characters, x: t.x, y: t.y }));

    return { inRegion };
  `;
  const res = await callPlugin("execute", { code });
  console.log("P14 in region:", JSON.stringify(res.value || res, null, 2));
}
main().catch(console.error);
