import { callPlugin } from "./server/src/relay-client";
async function main() {
  const code = `
    const p14Hero = await figma.getNodeByIdAsync("848:3016");
    if (!p14Hero) return null;
    return p14Hero.children.slice(2).map(c => ({
      id: c.id,
      name: c.name,
      pos: [c.x, c.y],
      size: [c.width, c.height],
      children: c.children.map(ch => ({
        id: ch.id,
        name: ch.name,
        type: ch.type,
        chars: ch.type === "TEXT" ? ch.characters : undefined,
        pos: [ch.x, ch.y],
        size: [ch.width, ch.height]
      }))
    }));
  `;
  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res.value || res, null, 2));
}
main().catch(console.error);
