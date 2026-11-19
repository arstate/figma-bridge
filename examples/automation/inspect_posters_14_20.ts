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
    const emojiRegex = /(\\u00a9|\\u00ae|[\\u2000-\\u3300]|\\ud83c[\\ud000-\\udfff]|\\ud83d[\\ud000-\\udfff]|\\ud83e[\\ud000-\\udfff])/g;

    const results = [];

    for (const p of posterIds) {
      const node = await figma.getNodeByIdAsync(p.id);
      if (!node) {
        results.push({ num: p.num, id: p.id, error: "Node not found" });
        continue;
      }

      const allTexts = node.findAll(n => n.type === "TEXT");
      const textsWithEmojis = [];
      const gsmTexts = [];
      const allTextList = [];

      for (const t of allTexts) {
        const textVal = t.characters || "";
        allTextList.push({ id: t.id, name: t.name, text: textVal, x: t.absoluteTransform[0][2], y: t.absoluteTransform[1][2], width: t.width, height: t.height });
        if (emojiRegex.test(textVal)) {
          textsWithEmojis.push({ id: t.id, name: t.name, text: textVal });
        }
        if (/GSM/i.test(textVal)) {
          gsmTexts.push({ id: t.id, name: t.name, text: textVal });
        }
      }

      // Find floating elements
      const floatingNodes = node.findAll(n => n.name.toLowerCase().includes("float") || n.name.toLowerCase().includes("dof"));
      const floatingList = floatingNodes.map(f => ({
        id: f.id,
        name: f.name,
        type: f.type,
        x: f.x,
        y: f.y,
        width: f.width,
        height: f.height
      }));

      results.push({
        num: p.num,
        id: p.id,
        name: node.name,
        textCount: allTexts.length,
        textsWithEmojis,
        gsmTexts,
        floatingList,
        sampleTexts: allTextList.slice(0, 10)
      });
    }

    return results;
  `;

  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res, null, 2));
}

main().catch(console.error);
