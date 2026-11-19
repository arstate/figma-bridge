import { callPlugin } from "./server/src/relay-client";
async function main() {
  const code = `
    const cta = await figma.getNodeByIdAsync("848:3047");
    if (!cta) return null;
    return cta.children.map(c => ({
      id: c.id,
      name: c.name,
      type: c.type,
      chars: c.type === "TEXT" ? c.characters : undefined,
      x: c.x,
      y: c.y,
      w: c.width,
      h: c.height
    }));
  `;
  const res = await callPlugin("execute", { code });
  console.log("CTA children:", JSON.stringify(res.value || res, null, 2));
}
main().catch(console.error);
