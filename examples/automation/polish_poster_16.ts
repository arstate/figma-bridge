import { writeFileSync } from "node:fs";
import { callPlugin, exec } from "./server/src/relay-client";

export const polishCode = `
const p16 = await figma.getNodeByIdAsync("809:10097");
if (!p16) throw new Error("P16 not found");

// 1. Polish Headline Ribbon (P16_Yellow_Ribbon)
const rib = p16.findOne(n => n.name === "P16_Yellow_Ribbon");
if (rib) {
  // Hide empty white Rectangle 48
  const rect48 = rib.findOne(n => n.name === "Rectangle 48");
  if (rect48) rect48.visible = false;

  // Reposition Yellow Highlight Rectangle 52 under "Bikin Konsumen Kabur!"
  const g2 = rib.findOne(n => n.name === "Group");
  if (g2) {
    const rect52 = g2.findOne(n => n.name === "Rectangle 52");
    if (rect52) {
      rect52.x = 450;
      rect52.y = 264;
      rect52.resize(430, 48);
    }
  }
}

// 2. Polish Card 02 (Color Token Guide) to clean white card
const g75 = await figma.getNodeByIdAsync("841:64");
if (g75) {
  const cColor = g75.findOne(n => n.name.includes("Color Token"));
  if (cColor) {
    const base = cColor.findOne(n => n.name === "Card base");
    if (base && "fills" in base) {
      base.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      base.strokes = [{ type: "SOLID", color: { r: 0.88, g: 0.91, b: 0.94 } }];
      base.strokeWeight = 1.5;
    }
    // Change any text inside if needed
    const bullets = cColor.findAll(n => n.type === "TEXT");
    for (const b of bullets) {
      if (b.fills && b.fills.length > 0) {
        // keep text clear
      }
    }
  }

  // Polish Card 03 (Termasuk Paket HERO) to Deep Navy Authority Card (like P15 Card 3)
  const cHero = g75.findOne(n => n.name.includes("Paket HERO"));
  if (cHero) {
    const base = cHero.findOne(n => n.name === "Card base");
    if (base && "fills" in base) {
      base.fills = [{ type: "SOLID", color: { r: 0.00392, g: 0.16078, b: 0.41176 } }];
      base.strokes = [{ type: "SOLID", color: { r: 0.05, g: 0.2, b: 0.45 } }];
    }
    // Update texts inside Card 03 to white & gold
    const texts = cHero.findAll(n => n.type === "TEXT");
    for (const t of texts) {
      if (t.characters.includes("Termasuk") || t.characters.includes("HERO") || t.characters.includes("All-In") || t.characters.includes("Standarisasi") || t.characters.includes("Bebas")) {
        t.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      } else if (t.characters.includes("Sudah") || t.characters.includes("Materi") || t.characters.includes("Tanpa")) {
        t.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.85, b: 0.92 } }];
      }
    }
    // Update bottom pill inside Card 03
    const bottomPill = cHero.findOne(n => n.name.includes("Button") || n.name.includes("pill") || n.name === "Rectangle 54" || (n.type === "RECTANGLE" && n.y > 250));
    if (bottomPill && "fills" in bottomPill) {
      bottomPill.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    }
    const bottomText = cHero.findOne(n => n.type === "TEXT" && n.characters.includes("ALL-IN HERO RETAINER"));
    if (bottomText) {
      bottomText.fills = [{ type: "SOLID", color: { r: 0.00392, g: 0.16078, b: 0.41176 } }];
    }
  }
}

// 3. Polish Footer Text & Line
const footer = await figma.getNodeByIdAsync("812:14751");
if (footer) {
  // Divider line
  const vec = footer.findOne(n => n.type === "VECTOR");
  if (vec && "strokes" in vec) {
    vec.strokes = [{ type: "SOLID", color: { r: 0.8, g: 0.85, b: 0.9 } }];
  }
  // Footer text to Deep Navy
  const texts = footer.findAll(n => n.type === "TEXT");
  for (const t of texts) {
    if (t.characters.includes("Urusan Iklan")) {
      t.fills = [{ type: "SOLID", color: { r: 0.00392, g: 0.16078, b: 0.41176 } }];
    } else if (t.characters.includes("OFFICIAL WEBSITE")) {
      t.fills = [{ type: "SOLID", color: { r: 0.39, g: 0.45, b: 0.55 } }];
    }
  }
}

// Zoom and notify
figma.viewport.scrollAndZoomIntoView([p16]);
figma.notify("Poster 16 Selesai Dipolish 100% Sempurna!");

return { success: true };
`;

async function main() {
  try {
    console.log("Melakukan fine-tuning polish Poster 16...");
    await exec(polishCode);
    console.log("Fine-tuning sukses!");

    console.log("Mengambil screenshot hasil akhir...");
    const snap: any = await callPlugin("get_screenshot", { nodeId: "809:10097", format: "png", scale: 1 });
    const buf = Buffer.from(snap.data, "base64");
    const outPath = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/figma_poster_16_polished.png";
    writeFileSync(outPath, buf);
    console.log("Screenshot final tersimpan di:", outPath, "Ukuran:", buf.length, "bytes");
  } catch (err: any) {
    console.error("Error polish:", err.message);
  }
}

main();
