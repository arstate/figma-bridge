import { callPlugin } from "./server/src/relay-client";
async function main() {
  const code = `
    const p15 = await figma.getNodeByIdAsync("809:9931");
    const t = await figma.getNodeByIdAsync("809:14413");
    const orb = p15.findOne(n => n.name === "Floating_Geometric_Orb_DOF");
    return {
      p15Pos: [p15.x, p15.y],
      textPos: [t.x, t.y],
      textRel: [t.absoluteTransform[0][2] - p15.absoluteTransform[0][2], t.absoluteTransform[1][2] - p15.absoluteTransform[1][2]],
      textSize: [t.width, t.height],
      orbPos: [orb.x, orb.y],
      orbSize: [orb.width, orb.height]
    };
  `;
  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res.value || res, null, 2));
}
main().catch(console.error);
