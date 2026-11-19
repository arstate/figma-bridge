import { callPlugin } from "./server/src/relay-client";

async function main() {
  const code = `
    const posterIds = ["809:10263", "809:9931", "809:10097", "809:10425", "809:10591", "809:10758", "809:10921"];
    const results = [];

    for (const pid of posterIds) {
      const p = await figma.getNodeByIdAsync(pid);
      if (!p) continue;

      // Find benefit bars or feature containers
      const cards = p.findAll(n => n.name.includes("Benefit") || n.name.includes("Card") || n.name.includes("Pill") || n.name.includes("CTA") || n.name.includes("Badge"));
      
      const cardDetails = cards.map(c => ({
        id: c.id,
        name: c.name,
        type: c.type,
        children: (c.children || []).map(ch => ({
          id: ch.id,
          name: ch.name,
          type: ch.type,
          characters: ch.type === "TEXT" ? ch.characters : undefined,
          childrenCount: (ch.children || []).length
        }))
      }));

      results.push({
        posterId: pid,
        posterName: p.name,
        cardCount: cards.length,
        cardDetails: cardDetails.slice(0, 15)
      });
    }

    return results;
  `;

  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res, null, 2));
}

main().catch(console.error);
