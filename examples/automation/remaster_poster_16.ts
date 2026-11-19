import { writeFileSync } from "node:fs";
import { callPlugin, exec } from "./server/src/relay-client";

export const scriptCode = `
// 1. Load Fonts
await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "SemiBold" });
await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Regular" });
await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });
await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Medium" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Extra Bold" });

// 2. Color Helper
const hex = (h, a = 1) => {
  const c = h.replace("#", "");
  return {
    r: parseInt(c.substring(0, 2), 16) / 255,
    g: parseInt(c.substring(2, 4), 16) / 255,
    b: parseInt(c.substring(4, 6), 16) / 255,
    a,
  };
};

const cCream = hex("#F7F4EC");
const cNavy = hex("#012969");
const cOrange = hex("#FF3E1D");
const cGold = hex("#F59E0B");
const cCrimson = hex("#B3001B");
const cDark = hex("#0F172A");
const cWhite = hex("#FFFFFF");
const cGray = hex("#64748B");
const cBorder = hex("#CBD5E1");

// 3. Find Nodes
const p15 = await figma.getNodeByIdAsync("809:9931");
const p16 = await figma.getNodeByIdAsync("809:10097");
if (!p15 || !p16) throw new Error("P15 or P16 not found!");

// 4. Update Background of Poster 16 to Warm Cream
const bgVector16 = await figma.getNodeByIdAsync("809:10098");
if (bgVector16 && "fills" in bgVector16) {
  bgVector16.fills = [{
    type: "SOLID",
    visible: true,
    opacity: 1,
    blendMode: "NORMAL",
    color: { r: 0.968627, g: 0.956862, b: 0.925490 }
  }];
}

// 5. Update Grid Union in Frame 1 and Frame 2 to soft black 0.2 alpha gradient (like P15)
const f15 = await figma.getNodeByIdAsync("812:14598");
const u15 = f15 ? f15.findOne(n => n.name === "Union") : null;

for (const frameId of ["812:14794", "812:14796"]) {
  const f = await figma.getNodeByIdAsync(frameId);
  if (f) {
    const u = f.findOne(n => n.name === "Union");
    if (u && u15 && "fills" in u15) {
      u.fills = JSON.parse(JSON.stringify(u15.fills));
    }
  }
}

// 6. Purge Foreign & Messy Elements
const foreignIds = ["839:1232", "839:1245", "839:1250", "809:10156", "812:14656"];
for (const fid of foreignIds) {
  const node = await figma.getNodeByIdAsync(fid);
  if (node) node.remove();
}

// Also remove any existing cloned ribbons if re-running
const oldClones = p16.findAll(n => n.name === "P16_Yellow_Ribbon" || n.name === "P16_Typewriter_Ribbon" || n.name === "P16_Middle_Bento_Hero");
for (const oc of oldClones) oc.remove();

// 7. Clone Yellow Ribbon from Poster 15 (Group 74: 812:14655)
const rib15 = await figma.getNodeByIdAsync("812:14655");
if (rib15) {
  const ribClone = rib15.clone();
  ribClone.name = "P16_Yellow_Ribbon";
  ribClone.x = rib15.x;
  ribClone.y = rib15.y;
  p16.appendChild(ribClone);

  // Update Headline Text inside the clone
  const line1 = ribClone.findOne(n => n.type === "TEXT" && n.characters.includes("Feed Berantakan"));
  if (line1) {
    await figma.loadFontAsync(line1.fontName);
    line1.characters = "Kesan Pertama Menentukan:";
  }

  const line2Group = ribClone.findOne(n => n.name === "Group");
  if (line2Group) {
    const line2 = line2Group.findOne(n => n.type === "TEXT");
    if (line2) {
      await figma.loadFontAsync(line2.fontName);
      line2.characters = "Logo Amatir Bikin Konsumen Kabur!";
    }
  }
}

// 8. Clone Typewriter Ribbon from Poster 15 (Group 63: 809:14418)
const g63_15 = await figma.getNodeByIdAsync("809:14418");
if (g63_15) {
  const g63Clone = g63_15.clone();
  g63Clone.name = "P16_Typewriter_Ribbon";
  g63Clone.x = g63_15.x;
  g63Clone.y = g63_15.y;
  p16.appendChild(g63Clone);

  const twText = g63Clone.findOne(n => n.type === "TEXT");
  if (twText) {
    await figma.loadFontAsync(twText.fontName);
    twText.characters = "Identitas visual yang kokoh membenarkan harga tinggi dan membangun reputasi bisnis.";
  }
}

// 9. Create Symmetrical Middle Bento Hero (Logo Amatir vs Identitas Vektor Djadi)
const bentoGroup = figma.createFrame();
bentoGroup.name = "P16_Middle_Bento_Hero";
bentoGroup.resize(1080, 1440);
bentoGroup.x = 0;
bentoGroup.y = 0;
bentoGroup.fills = [];
p16.appendChild(bentoGroup);

// Helper creators
const makeText = ({ text, x, y, width, fontSize, fontStyle = "Regular", color = cDark, align = "LEFT", lineHeight = null, parent }) => {
  const t = figma.createText();
  t.fontName = { family: "Plus Jakarta Sans", style: fontStyle };
  t.characters = text;
  t.fontSize = fontSize;
  t.fills = [{ type: "SOLID", color: { r: color.r, g: color.g, b: color.b } }];
  t.textAlignHorizontal = align;
  if (width) {
    t.textAutoResize = "HEIGHT";
    t.resize(width, t.height);
  }
  if (lineHeight) {
    t.lineHeight = { value: lineHeight, unit: "PIXELS" };
  }
  t.x = x;
  t.y = y;
  parent.appendChild(t);
  return t;
};

const makeRect = ({ name, x, y, width, height, color, radius = 0, stroke = null, strokeWeight = 1, parent }) => {
  const r = figma.createRectangle();
  r.name = name;
  r.resize(width, height);
  r.x = x;
  r.y = y;
  r.cornerRadius = radius;
  r.fills = [{ type: "SOLID", color: { r: color.r, g: color.g, b: color.b } }];
  if (stroke) {
    r.strokes = [{ type: "SOLID", color: { r: stroke.r, g: stroke.g, b: stroke.b } }];
    r.strokeWeight = strokeWeight;
  }
  parent.appendChild(r);
  return r;
};

const cardY = 472;
const cardW = 417;
const cardH = 358;

// CARD 1: Logo Amatir Canva (Kiri - x: 116)
const leftX = 116;

// Left Shadow
makeRect({
  name: "Left_Card_Shadow",
  x: leftX + 8,
  y: cardY + 8,
  width: cardW,
  height: cardH,
  color: cNavy,
  radius: 12,
  parent: bentoGroup,
});

// Left Body
makeRect({
  name: "Left_Card_Body",
  x: leftX,
  y: cardY,
  width: cardW,
  height: cardH,
  color: cWhite,
  radius: 12,
  stroke: cBorder,
  strokeWeight: 2,
  parent: bentoGroup,
});

// Left Pill Header
makeRect({
  name: "Left_Pill_Header",
  x: leftX + 24,
  y: cardY + 22,
  width: 220,
  height: 30,
  color: hex("#FEE2E2"),
  radius: 6,
  stroke: hex("#FCA5A5"),
  parent: bentoGroup,
});
makeText({
  text: "✕ LOGO AMATIR CANVA",
  x: leftX + 36,
  y: cardY + 28,
  fontSize: 12,
  fontStyle: "Bold",
  color: cCrimson,
  parent: bentoGroup,
});

makeText({
  text: "Ciri Khas Template Pasaran:",
  x: leftX + 24,
  y: cardY + 68,
  fontSize: 15,
  fontStyle: "Bold",
  color: cDark,
  parent: bentoGroup,
});

const canvaFaults = [
  "✕ Font gratisan pasaran & tidak berlisensi",
  "✕ Format gambar raster (pecah saat dicetak)",
  "✕ Dipakai ribuan brand (sulit dibedakan)",
  "✕ Ditolak saat pendaftaran paten HKI",
];

let faultY = cardY + 105;
for (const f of canvaFaults) {
  makeText({ text: f, x: leftX + 24, y: faultY, width: cardW - 48, fontSize: 13, fontStyle: "Medium", color: cGray, lineHeight: 20, parent: bentoGroup });
  faultY += 40;
}

// Left Bottom Warning
makeRect({
  name: "Left_Warning_Banner",
  x: leftX + 20,
  y: cardY + 280,
  width: cardW - 40,
  height: 52,
  color: hex("#FEF2F2"),
  radius: 8,
  stroke: hex("#FCA5A5"),
  parent: bentoGroup,
});
makeText({
  text: "AUDIENS RAGU: TERKESAN BISNIS TIDAK NIAT",
  x: leftX + 32,
  y: cardY + 298,
  width: cardW - 64,
  fontSize: 12,
  fontStyle: "Bold",
  color: cCrimson,
  align: "CENTER",
  parent: bentoGroup,
});

// CARD 2: Identitas Vektor Modern Djadi (Kanan - x: 554)
const rightX = 554;

// Right Shadow (Vibrant Crimson Red)
makeRect({
  name: "Right_Card_Shadow",
  x: rightX + 10,
  y: cardY + 10,
  width: cardW,
  height: cardH,
  color: cCrimson,
  radius: 12,
  parent: bentoGroup,
});

// Right Body (Deep Navy)
makeRect({
  name: "Right_Card_Body",
  x: rightX,
  y: cardY,
  width: cardW,
  height: cardH,
  color: cNavy,
  radius: 12,
  parent: bentoGroup,
});

// Right Pill Header
makeRect({
  name: "Right_Pill_Header",
  x: rightX + 24,
  y: cardY + 22,
  width: 250,
  height: 30,
  color: cOrange,
  radius: 6,
  parent: bentoGroup,
});
makeText({
  text: "✓ DESAIN MODERN TEGAS DJADI",
  x: rightX + 34,
  y: cardY + 28,
  fontSize: 12,
  fontStyle: "Bold",
  color: cWhite,
  parent: bentoGroup,
});

makeText({
  text: "Standar Master Vektor Resmi:",
  x: rightX + 24,
  y: cardY + 68,
  fontSize: 15,
  fontStyle: "Bold",
  color: hex("#93C5FD"),
  parent: bentoGroup,
});

const djadiPerks = [
  "✓ 100% Master Vektor Asli SVG / AI / EPS",
  "✓ Standar Warna Lengkap Digital & Cetak",
  "✓ Font Resmi Terlisensi Komersial Aman",
  "✓ Siap Cetak Kemasan, Bordir & Paten HKI",
];

let perkY = cardY + 105;
for (const p of djadiPerks) {
  makeText({ text: p, x: rightX + 24, y: perkY, width: cardW - 48, fontSize: 13, fontStyle: "Medium", color: cWhite, lineHeight: 20, parent: bentoGroup });
  perkY += 40;
}

// Right Bottom Authority Banner
makeRect({
  name: "Right_Authority_Banner",
  x: rightX + 20,
  y: cardY + 280,
  width: cardW - 40,
  height: 52,
  color: hex("#030E26"),
  radius: 8,
  stroke: cGold,
  strokeWeight: 1.5,
  parent: bentoGroup,
});
makeText({
  text: "PREMIUM LOOK: MEMBENARKAN HARGA TINGGI",
  x: rightX + 32,
  y: cardY + 298,
  width: cardW - 64,
  fontSize: 12,
  fontStyle: "Bold",
  color: cGold,
  align: "CENTER",
  parent: bentoGroup,
});

// 10. Clean and Harmonize Bottom 3 Tier Cards (Group 75: 841:64)
const g75 = await figma.getNodeByIdAsync("841:64");
if (g75) {
  // Find card frames
  const cHero = g75.findOne(n => n.name.includes("Paket HERO"));
  const cFilo = g75.findOne(n => n.name.includes("Filosofi"));
  const cColor = g75.findOne(n => n.name.includes("Color Token"));

  // In Card 2 (Color Token Guide), let's ensure its background is clean white with Navy shadow, not muddy red
  if (cColor && "children" in cColor) {
    const bgRect = cColor.findOne(n => n.type === "RECTANGLE");
    if (bgRect) {
      bgRect.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      bgRect.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
    }
  }
}

// 11. Refresh Viewport & Toast
figma.viewport.scrollAndZoomIntoView([p16]);
figma.notify("Poster 16 Berhasil Diremaster 100% Harmonis dengan Poster 15!");

return {
  success: true,
  p16Id: p16.id,
  name: p16.name,
};
`;

async function main() {
  try {
    console.log("Mengeksekusi remaster Poster 16 di kanvas Figma...");
    const res: any = await exec(scriptCode);
    console.log("Hasil Eksekusi:", JSON.stringify(res, null, 2));

    console.log("Mengambil live screenshot visual kanvas untuk Poster 16...");
    const snap: any = await callPlugin("get_screenshot", { nodeId: "809:10097", format: "png", scale: 1 });
    const buf = Buffer.from(snap.data, "base64");
    const outPath = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/figma_poster_16_remastered.png";
    writeFileSync(outPath, buf);
    console.log("Screenshot Poster 16 Remastered tersimpan di:", outPath, "Ukuran:", buf.length, "bytes");
  } catch (err: any) {
    console.error("Gagal remaster:", err.message);
  }
}

main();
