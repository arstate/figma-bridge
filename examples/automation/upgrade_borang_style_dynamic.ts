import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

async function main() {
  console.log("Applying Dynamic High-Aesthetic Style Upgrade to Borang A3...");

  const code = `
    const borang = figma.currentPage.findOne(n => n.name === "MASTER_BORANG_SCALE_UP_DJADI_CREATIVE_A3");
    if (!borang) return { error: "Borang not found" };

    // Colors
    const cNavy = { r: 0.004, g: 0.161, b: 0.412 };    // #012969
    const cGold = { r: 0.961, g: 0.620, b: 0.043 };    // #F59E0B
    const cVermillion = { r: 1.0, g: 0.243, b: 0.114 }; // #FF3E1D
    const cCrimson = { r: 0.702, g: 0.0, b: 0.106 };   // #B3001B
    const cWhite = { r: 1.0, g: 1.0, b: 1.0 };
    const cDark = { r: 0.059, g: 0.090, b: 0.165 };     // #0F172A
    const cCyan = { r: 0.12, g: 0.63, b: 0.95 };

    // 1. Upgrade Canvas Background (Gradient Depth)
    borang.fills = [{
      type: "GRADIENT_RADIAL",
      gradientTransform: [[0.85, 0, 0.08], [0, 0.85, 0.08]],
      gradientStops: [
        { position: 0, color: { r: 0.992, g: 0.985, b: 0.965, a: 1 } },
        { position: 1, color: { r: 0.940, g: 0.925, b: 0.880, a: 1 } }
      ]
    }];

    // 2. HERO CARD: Bagian V Value Ladder (Transform into Midnight Navy Board)
    const bV = borang.findOne(n => n.name === "Bagian_V_Value_Ladder");
    if (bV) {
      bV.fills = [{ type: "SOLID", color: cNavy }];
      bV.strokes = [{ type: "SOLID", color: cGold }];
      bV.strokeWeight = 2;

      const vHead = bV.findOne(n => n.name === "Header");
      if (vHead) {
        vHead.fills = [{ type: "SOLID", color: cCrimson }];
      }

      // Upgrade tier cards inside Value Ladder
      const tierFrames = bV.children.filter(c => c.type === "FRAME" && c.name !== "Header");
      tierFrames.forEach((tf, idx) => {
        if (idx === 2) {
          // HERO FLAGSHIP TIER (Make it radiant gold/orange)
          tf.fills = [{
            type: "GRADIENT_LINEAR",
            gradientTransform: [[1, 0, 0], [0, 1, 0]],
            gradientStops: [
              { position: 0, color: { r: 1.0, g: 0.92, b: 0.65, a: 1 } },
              { position: 1, color: { r: 1.0, g: 0.78, b: 0.35, a: 1 } }
            ]
          }];
          tf.strokes = [{ type: "SOLID", color: cVermillion }];
          tf.strokeWeight = 2;

          // Dark text on gold card
          const texts = tf.findAll(n => n.type === "TEXT");
          texts.forEach(t => {
            if (t.characters.includes("Rp 4.000.000")) {
              t.fills = [{ type: "SOLID", color: cCrimson }];
            } else if (t.characters.includes("LEVEL 2")) {
              // Level badge
              t.fills = [{ type: "SOLID", color: cWhite }];
            } else {
              t.fills = [{ type: "SOLID", color: cDark }];
            }
          });
        } else {
          // Other tiers on navy
          tf.fills = [{ type: "SOLID", color: { r: 0.04, g: 0.22, b: 0.52 } }];
          tf.strokes = [{ type: "SOLID", color: { r: 0.15, g: 0.35, b: 0.68 } }];
          const texts = tf.findAll(n => n.type === "TEXT");
          texts.forEach(t => {
            if (t.characters.includes("LEVEL")) {
              t.fills = [{ type: "SOLID", color: cWhite }];
            } else if (t.characters.includes("Rp ")) {
              t.fills = [{ type: "SOLID", color: cGold }];
            } else {
              t.fills = [{ type: "SOLID", color: { r: 0.88, g: 0.92, b: 0.98 } }];
            }
          });
        }
      });
    }

    // 3. BLUEPRINT CARD: Bagian VI.16 Winning Zone Positioning
    const bW = borang.findOne(n => n.name === "Bagian_VI_16_Winning_Zone");
    if (bW) {
      bW.fills = [{ type: "SOLID", color: { r: 0.04, g: 0.07, b: 0.14 } }]; // Dark Blueprint
      bW.strokes = [{ type: "SOLID", color: cCyan }];
      bW.strokeWeight = 1.8;

      const wHead = bW.findOne(n => n.name === "Header");
      if (wHead) {
        wHead.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.15, b: 0.3 } }];
      }

      const wTxt = bW.findOne(n => n.type === "TEXT" && n.x === 8);
      if (wTxt) {
        wTxt.fills = [{ type: "SOLID", color: { r: 0.92, g: 0.95, b: 1.0 } }];
      }
    }

    // 4. ROYAL CHARTER CARD: Bagian VII Pengesahan Eksekutif
    const bVII = borang.findOne(n => n.name === "Bagian_VII_Segmen_Pengesahan");
    if (bVII) {
      bVII.fills = [{ type: "SOLID", color: { r: 0.995, g: 0.992, b: 0.985 } }];
      bVII.strokes = [{ type: "SOLID", color: cCrimson }];
      bVII.strokeWeight = 2;

      // Add solid drop shadow to sigFrame
      const sigFrame = bVII.children.find(c => c.type === "FRAME" && c.name !== "Header");
      if (sigFrame) {
        sigFrame.strokes = [{ type: "SOLID", color: cGold }];
        sigFrame.strokeWeight = 1.5;
        sigFrame.fills = [{ type: "SOLID", color: { r: 0.985, g: 0.975, b: 0.95 } }];
      }
    }

    // 5. BMC 9-BLOK CARD: Highlight Center VP & Bottom Rows
    const bBMC = borang.findOne(n => n.name === "Bagian_VI_1_BMC_9_Blok");
    if (bBMC) {
      const vpCard = bBMC.children.find(c => c.x >= 210 && c.x <= 230 && c.y === 25);
      if (vpCard) {
        vpCard.fills = [{ type: "SOLID", color: { r: 1.0, g: 0.97, b: 0.85 } }];
        vpCard.strokes = [{ type: "SOLID", color: cVermillion }];
        vpCard.strokeWeight = 2;
      }
    }

    // 6. CARD 1.1 PROFIL KREDIBILITAS: Add Depth Shadow
    const b1 = borang.findOne(n => n.name === "Bagian_I_Profil_Kredibilitas");
    if (b1) {
      b1.strokes = [{ type: "SOLID", color: cNavy }];
      b1.strokeWeight = 2;
    }

    return { success: true, upgradedStyle: true };
  `;

  const res = await callPlugin("execute", { code });
  console.log("Upgrade Style Result:", res);

  // Capture Screenshot of Upgraded Borang A3
  const bNode = await callPlugin("execute", { code: "const b = figma.currentPage.findOne(n => n.name === 'MASTER_BORANG_SCALE_UP_DJADI_CREATIVE_A3'); return b ? b.id : null;" });
  if (bNode && bNode.value) {
    const snap = await callPlugin("get_screenshot", { nodeId: bNode.value, format: "png", scale: 1 });
    const buf = Buffer.from(snap.data, "base64");
    const out = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/figma_master_borang_a3_dynamic_style.png";
    writeFileSync(out, buf);
    console.log("Saved dynamic style Borang screenshot:", out, "Size:", buf.length, "bytes");
  }
}

main().catch(console.error);
