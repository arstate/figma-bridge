import { callPlugin } from "./server/src/relay-client";
async function main() {
  const code = `
    const page = figma.currentPage;
    const allNodes = page.findAll(n => true);
    const matches = [];
    for (const n of allNodes) {
      if (n.type === "TEXT" && (/gsm/i.test(n.characters) || /v2\\.5/i.test(n.characters))) {
        matches.push({ id: n.id, name: n.name, text: n.characters, parent: n.parent ? n.parent.name : null });
      }
      if (/gsm/i.test(n.name) || /v2\\.5/i.test(n.name)) {
        matches.push({ id: n.id, name: n.name, type: n.type, text: n.type === "TEXT" ? n.characters : null });
      }
    }
    return matches;
  `;
  const res = await callPlugin("execute", { code });
  console.log("Matches:", JSON.stringify(res, null, 2));
}
main().catch(console.error);
