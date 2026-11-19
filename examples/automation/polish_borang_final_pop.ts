import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

async function main() {
  const code = `
    const borang = figma.currentPage.findOne(n => n.name === "MASTER_BORANG_SCALE_UP_DJADI_CREATIVE_A3");
    if (!borang) return { error: "Borang not found" };

    const cNavy = { r: 0.004, g: 0.161, b: 0.412 };    // #012969
    const cGold = { r: 0.961, g: 0.620, b: 0.043 };    // #F59E0B
    const cVermillion = { r: 1.0, g: 0.243, b: 0.114 }; // #FF3E1D
    const cCrimson = { r: 0.702, g: 0.0, b: 0.106 };   // #B3001B
    const cWhite = { r: 1.0, g: 1.0, b: 1.0 };
    const cDark = { r: 0.059, g: 0.090, b: 0.165 };     // #0F172A

    // 1. Hero Contrast Anchor: Bagian V Value Ladder Funnel
    const bV = borang.findOne(n => n.name === "Bagian_V_Value_Ladder");
    if (bV) {
      bV.fills = [{ type: "SOLID", color: cNavy }];
      bV.strokes = [{ type: "SOLID", color: cGold }];
      bV.strokeWeight = 2;

      const vHead = bV.findOne(n => n.name === "Header");
      if (vHead) {
        vHead.fills = [{ type: "SOLID", color: cCrimson }];
      }

      const tierCards = bV.children.filter(c => c.type === "FRAME" && c.name !== "Header");
      tierCards.forEach((tc, idx) => {
        if (idx === 2) {
          // Level 2 HERO Card -> Radiant Gold Highlight
          tc.fills = [{
            type: "GRADIENT_LINEAR",
            gradientTransform: [[1, 0, 0], [0, 1, 0]],
            gradientStops: [
              { position: 0, color: { r: 1.0, g: 0.92, b: 0.65, a: 1 } },
              { position: 1, color: { r: 1.0, g: 0.78, b: 0.35, a: 1 } }
            ]
          }];
          tc.strokes = [{ type: "SOLID", color: cVermillion }];
          tc.strokeWeight = 2;

          const texts = tc.findAll(n => n.type === "TEXT");
          texts.forEach(t => {
            if (t.characters.includes("Rp 4.000.000")) {
              t.fills = [{ type: "SOLID", color: cCrimson }];
            } else if (t.characters.includes("LEVEL 2")) {
              t.fills = [{ type: "SOLID", color: cWhite }];
            } else {
              t.fills = [{ type: "SOLID", color: cDark }];
            }
          });
        } else {
          // Levels 0, 1, 3 -> Dark Blue Contrast on Navy
          tc.fills = [{ type: "SOLID", color: { r: 0.04, g: 0.22, b: 0.52 } }];
          tc.strokes = [{ type: "SOLID", color: { r: 0.15, g: 0.35, b: 0.68 } }];

          const texts = tc.findAll(n => n.type === "TEXT");
          texts.forEach(t => {
            if (t.characters.includes("LEVEL")) {
              t.fills = [{ type: "SOLID", color: cWhite }];
            } else if (t.characters.includes("Rp ") || t.characters.includes("GRATIS")) {
              t.fills = [{ type: "SOLID", color: cGold }];
            } else {
              t.fills = [{ type: "SOLID", color: { r: 0.88, g: 0.92, b: 0.98 } }];
            }
          });
        }
      });
    }

    // 2. Add visual borders to the 4 stats highlight columns
    const statCols = borang.children.filter(c => c.type === "FRAME" && c.y === 118);
    const borderColors = [
      { r: 0.063, g: 0.725, b: 0.506 }, // Green
      { r: 0.961, g: 0.620, b: 0.043 }, // Gold
      { r: 1.0, g: 0.243, b: 0.114 },   // Vermillion
      { r: 0.004, g: 0.161, b: 0.412 }    // Navy
    ];
    statCols.forEach((sc, i) => {
      sc.strokes = [{ type: "SOLID", color: borderColors[i % 4] }];
      sc.strokeWeight = 1.8;
    });

    return { success: true };
  `;

  await callPlugin("execute", { code });
  console.log("Value Ladder & Stats Contrast Applied.");

  // Capture Screenshot
  const bNode = await callPlugin("execute", { code: "const b = figma.currentPage.findOne(n => n.name === 'MASTER_BORANG_SCALE_UP_DJADI_CREATIVE_A3'); return b ? b.id : null;" });
  if (bNode && bNode.value) {
    const snap = await callPlugin("get_screenshot", { nodeId: bNode.value, format: "png", scale: 1 });
    const buf = Buffer.from(snap.data, "base64");
    const out = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/figma_master_borang_a3_perfect_non_monotonous.png";
    writeFileSync(out, buf);
    console.log("Saved non-monotonous screenshot:", out, "Size:", buf.length, "bytes");
  }
}

main().catch(console.error);
