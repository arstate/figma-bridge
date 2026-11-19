import { callPlugin } from "./server/src/relay-client";

async function main() {
  const code = `
    const checkIds = ["848:3043", "848:3085", "848:3109", "848:3135", "848:3160", "848:3035", "848:3039", "848:3060", "848:3066", "848:3091", "848:3115", "848:3141", "848:3166"];
    const results = [];
    for (const id of checkIds) {
      const n = await figma.getNodeByIdAsync(id);
      if (n) {
        const text = n.characters || "";
        const charCodes = [];
        for (let i = 0; i < text.length; i++) {
          charCodes.push(text.charCodeAt(i).toString(16));
        }
        results.push({
          id: n.id,
          name: n.name,
          characters: text,
          charCodes: charCodes,
          parent: n.parent ? { id: n.parent.id, name: n.parent.name, type: n.parent.type } : null
        });
      }
    }
    return results;
  `;
  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res, null, 2));
}

main().catch(console.error);
