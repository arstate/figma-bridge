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

// 2. Colors
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

// 3. Find P16
const p16 = await figma.getNodeByIdAsync("809:10097");
if (!p16) throw new Error("P16 not found");

// Remove existing middle bento hero
const oldHero = p16.findOne(n => n.name === "P16_Middle_Bento_Hero");
if (oldHero) oldHero.remove();

// Create new bento container frame
const bentoFrame = figma.createFrame();
bentoFrame.name = "P16_Middle_Bento_Hero";
bentoFrame.resize(1080, 1440);
bentoFrame.x = 0;
bentoFrame.y = 0;
bentoFrame.fills = [];
p16.appendChild(bentoFrame);

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

const makeRect = ({ name, x, y, width, height, color, radius = 0, stroke = null, strokeWeight = 1, parent, strokeDashes = null }) => {
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
  if (strokeDashes) {
    r.dashPattern = strokeDashes;
  }
  parent.appendChild(r);
  return r;
};

const makeCircle = ({ name, cx, cy, r, color, stroke = null, strokeWeight = 1, parent }) => {
  const e = figma.createEllipse();
  e.name = name;
  e.resize(r * 2, r * 2);
  e.x = cx - r;
  e.y = cy - r;
  if (color) e.fills = [{ type: "SOLID", color: { r: color.r, g: color.g, b: color.b } }];
  else e.fills = [];
  if (stroke) {
    e.strokes = [{ type: "SOLID", color: { r: stroke.r, g: stroke.g, b: stroke.b } }];
    e.strokeWeight = strokeWeight;
  }
  parent.appendChild(e);
  return e;
};

const makeLine = ({ name, x1, y1, x2, y2, stroke, strokeWeight = 1, parent, strokeDashes = null }) => {
  const l = figma.createLine();
  l.name = name;
  l.x = x1;
  l.y = y1;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  l.resize(len, 0);
  l.rotation = -Math.atan2(dy, dx) * (180 / Math.PI);
  l.strokes = [{ type: "SOLID", color: { r: stroke.r, g: stroke.g, b: stroke.b } }];
  l.strokeWeight = strokeWeight;
  if (strokeDashes) l.dashPattern = strokeDashes;
  parent.appendChild(l);
  return l;
};

const cardY = 465;
const cardW = 412;
const cardH = 370;

// ==========================================
// CARD 1: LOGO AMATIR CANVA (Kiri - x: 114)
// ==========================================
const leftX = 114;

// Left Shadow (CONSISTENT DEEP NAVY SHADOW)
makeRect({
  name: "Left_Card_Shadow",
  x: leftX + 7,
  y: cardY + 7,
  width: cardW,
  height: cardH,
  color: cNavy,
  radius: 12,
  parent: bentoFrame,
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
  strokeWeight: 1.5,
  parent: bentoFrame,
});

// Top Pill Header
makeRect({
  name: "Left_Pill_Header",
  x: leftX + 20,
  y: cardY + 18,
  width: 195,
  height: 28,
  color: hex("#FEE2E2"),
  radius: 6,
  stroke: hex("#FCA5A5"),
  parent: bentoFrame,
});
makeText({
  text: "✕ LOGO AMATIR CANVA",
  x: leftX + 30,
  y: cardY + 23,
  fontSize: 12.7,
  fontStyle: "Bold",
  color: cCrimson,
  parent: bentoFrame,
});

// Title
makeText({
  text: "Format Raster 72 DPI Pecah",
  x: leftX + 20,
  y: cardY + 54,
  fontSize: 18,
  fontStyle: "ExtraBold",
  color: cDark,
  parent: bentoFrame,
});

// --- VISUAL DEMONSTRATION ARTIFACT BOX (LEFT) ---
const vBoxY = cardY + 88;
const vBoxW = cardW - 40;
const vBoxH = 155;

makeRect({
  name: "Left_Visual_Box_Bg",
  x: leftX + 20,
  y: vBoxY,
  width: vBoxW,
  height: vBoxH,
  color: hex("#F8FAFC"),
  radius: 8,
  stroke: hex("#FCA5A5"),
  strokeWeight: 1,
  strokeDashes: [4, 4],
  parent: bentoFrame,
});

// Mockup of a jagged/pixelated logo inside
makeCircle({
  name: "Pixel_Circle_Amateur",
  cx: leftX + 105,
  cy: vBoxY + 75,
  r: 42,
  color: hex("#F1F5F9"),
  stroke: hex("#EF4444"),
  strokeWeight: 3,
  parent: bentoFrame,
});
makeText({
  text: "✕",
  x: leftX + 93,
  y: vBoxY + 52,
  fontSize: 34,
  fontStyle: "ExtraBold",
  color: cCrimson,
  parent: bentoFrame,
});

// Stamped Warning Badges inside Visual Box
makeRect({
  name: "Badge_Raster",
  x: leftX + 175,
  y: vBoxY + 28,
  width: 175,
  height: 28,
  color: hex("#FEF2F2"),
  radius: 6,
  stroke: hex("#FCA5A5"),
  parent: bentoFrame,
});
makeText({
  text: "✕ FORMAT RASTER 72 DPI",
  x: leftX + 185,
  y: vBoxY + 34,
  fontSize: 12.7,
  fontStyle: "Bold",
  color: cCrimson,
  parent: bentoFrame,
});

makeRect({
  name: "Badge_Pecah",
  x: leftX + 175,
  y: vBoxY + 64,
  width: 175,
  height: 28,
  color: hex("#FEF2F2"),
  radius: 6,
  stroke: hex("#FCA5A5"),
  parent: bentoFrame,
});
makeText({
  text: "✕ PECAH DI BANNER 2X1M",
  x: leftX + 185,
  y: vBoxY + 70,
  fontSize: 12.7,
  fontStyle: "Bold",
  color: cCrimson,
  parent: bentoFrame,
});

makeRect({
  name: "Badge_Hki",
  x: leftX + 175,
  y: vBoxY + 100,
  width: 175,
  height: 28,
  color: hex("#FEF2F2"),
  radius: 6,
  stroke: hex("#FCA5A5"),
  parent: bentoFrame,
});
makeText({
  text: "✕ RAWAN DITOLAK HKI",
  x: leftX + 185,
  y: vBoxY + 106,
  fontSize: 12.7,
  fontStyle: "Bold",
  color: cCrimson,
  parent: bentoFrame,
});

// 2 High-Impact Specs (FONT SIZE 14.36px!)
makeText({
  text: "• Font gratisan pasaran & tanpa lisensi komersial",
  x: leftX + 20,
  y: cardY + 256,
  width: cardW - 40,
  fontSize: 14.36,
  fontStyle: "Medium",
  color: cGray,
  lineHeight: 20,
  parent: bentoFrame,
});
makeText({
  text: "• Ditolak saat pendaftaran sertifikasi merek resmi",
  x: leftX + 20,
  y: cardY + 282,
  width: cardW - 40,
  fontSize: 14.36,
  fontStyle: "Medium",
  color: cGray,
  lineHeight: 20,
  parent: bentoFrame,
});

// Bottom Warning Banner
makeRect({
  name: "Left_Warning_Banner",
  x: leftX + 20,
  y: cardY + 314,
  width: cardW - 40,
  height: 38,
  color: hex("#FEF2F2"),
  radius: 6,
  parent: bentoFrame,
});
makeText({
  text: "AUDIENS RAGU: TERKESAN BISNIS AMATIRAN",
  x: leftX + 20,
  y: cardY + 324,
  width: cardW - 40,
  fontSize: 12.7,
  fontStyle: "Bold",
  color: cCrimson,
  align: "CENTER",
  parent: bentoFrame,
});

// ==========================================
// CARD 2: DESAIN MODERN TEGAS DJADI (Kanan - x: 554)
// ==========================================
const rightX = 554;

// Right Shadow: REVISED! (DEEP NAVY SHADOW, NO MORE "BEDA SENDIRI" RED SHADOW!)
makeRect({
  name: "Right_Card_Shadow",
  x: rightX + 7,
  y: cardY + 7,
  width: cardW,
  height: cardH,
  color: cNavy, // SAME DEEP NAVY SHADOW AS CARD 1!
  radius: 12,
  parent: bentoFrame,
});

// Right Body (Deep Navy with elegant border)
makeRect({
  name: "Right_Card_Body",
  x: rightX,
  y: cardY,
  width: cardW,
  height: cardH,
  color: cNavy,
  radius: 12,
  stroke: hex("#1E3A8A"),
  strokeWeight: 1.5,
  parent: bentoFrame,
});

// Top Pill Header
makeRect({
  name: "Right_Pill_Header",
  x: rightX + 20,
  y: cardY + 18,
  width: 215,
  height: 28,
  color: cOrange,
  radius: 6,
  parent: bentoFrame,
});
makeText({
  text: "✓ DESAIN MODERN TEGAS DJADI",
  x: rightX + 30,
  y: cardY + 23,
  fontSize: 12.7,
  fontStyle: "Bold",
  color: cWhite,
  parent: bentoFrame,
});

// Title
makeText({
  text: "Vektor Presisi Skalabilitas 100%",
  x: rightX + 20,
  y: cardY + 54,
  fontSize: 18,
  fontStyle: "ExtraBold",
  color: cWhite,
  parent: bentoFrame,
});

// --- VISUAL DEMONSTRATION ARTIFACT BOX (RIGHT) ---
makeRect({
  name: "Right_Visual_Box_Bg",
  x: rightX + 20,
  y: vBoxY,
  width: vBoxW,
  height: vBoxH,
  color: hex("#020B1E"),
  radius: 8,
  stroke: hex("#1E3A8A"),
  strokeWeight: 1,
  parent: bentoFrame,
});

// Blueprint Grid Construction Lines
makeCircle({
  name: "Golden_Ratio_Circle_1",
  cx: rightX + 105,
  cy: vBoxY + 75,
  r: 44,
  color: null,
  stroke: hex("#F59E0B", 0.4),
  strokeWeight: 1,
  parent: bentoFrame,
});
makeCircle({
  name: "Golden_Ratio_Circle_2",
  cx: rightX + 105,
  cy: vBoxY + 75,
  r: 26,
  color: null,
  stroke: hex("#60A5FA", 0.4),
  strokeWeight: 1,
  parent: bentoFrame,
});

// Crosshairs CAD
makeLine({
  name: "Cad_H",
  x1: rightX + 45,
  y1: vBoxY + 75,
  x2: rightX + 165,
  y2: vBoxY + 75,
  stroke: hex("#60A5FA", 0.35),
  strokeWeight: 1,
  strokeDashes: [2, 2],
  parent: bentoFrame,
});
makeLine({
  name: "Cad_V",
  x1: rightX + 105,
  y1: vBoxY + 15,
  x2: rightX + 105,
  y2: vBoxY + 135,
  stroke: hex("#60A5FA", 0.35),
  strokeWeight: 1,
  strokeDashes: [2, 2],
  parent: bentoFrame,
});

// Sharp Golden Monogram 'D' in Center
makeText({
  text: "D",
  x: rightX + 92,
  y: vBoxY + 54,
  fontSize: 36,
  fontStyle: "ExtraBold",
  color: cGold,
  parent: bentoFrame,
});

// Right Stamped High-Tech Badges inside Visual Box
makeRect({
  name: "Badge_Vector",
  x: rightX + 175,
  y: vBoxY + 28,
  width: 175,
  height: 28,
  color: hex("#0F172A"),
  radius: 6,
  stroke: hex("#3B82F6"),
  parent: bentoFrame,
});
makeText({
  text: "✓ 100% MASTER VEKTOR",
  x: rightX + 185,
  y: vBoxY + 34,
  fontSize: 12.7,
  fontStyle: "Bold",
  color: hex("#60A5FA"),
  parent: bentoFrame,
});

makeRect({
  name: "Badge_Infinite",
  x: rightX + 175,
  y: vBoxY + 64,
  width: 175,
  height: 28,
  color: hex("#0F172A"),
  radius: 6,
  stroke: cGold,
  parent: bentoFrame,
});
makeText({
  text: "✓ TAJAM DI BILLBOARD 10M",
  x: rightX + 185,
  y: vBoxY + 70,
  fontSize: 12.7,
  fontStyle: "Bold",
  color: cGold,
  parent: bentoFrame,
});

makeRect({
  name: "Badge_Hki_Ready",
  x: rightX + 175,
  y: vBoxY + 100,
  width: 175,
  height: 28,
  color: hex("#0F172A"),
  radius: 6,
  stroke: hex("#10B981"),
  parent: bentoFrame,
});
makeText({
  text: "✓ 100% SIAP PATEN HKI",
  x: rightX + 185,
  y: vBoxY + 106,
  fontSize: 12.7,
  fontStyle: "Bold",
  color: hex("#34D399"),
  parent: bentoFrame,
});

// 2 High-Impact Specs (FONT SIZE 14.36px!)
makeText({
  text: "• Master file asli SVG / AI / EPS + font terlisensi",
  x: rightX + 20,
  y: cardY + 256,
  width: cardW - 40,
  fontSize: 14.36,
  fontStyle: "Medium",
  color: hex("#CBD5E1"),
  lineHeight: 20,
  parent: bentoFrame,
});
makeText({
  text: "• Panduan warna GSM v2.5 digital & cetak kemasan",
  x: rightX + 20,
  y: cardY + 280,
  width: cardW - 40,
  fontSize: 14.36,
  fontStyle: "Medium",
  color: hex("#CBD5E1"),
  lineHeight: 20,
  parent: bentoFrame,
});

// Bottom Authority Banner
makeRect({
  name: "Right_Authority_Banner",
  x: rightX + 20,
  y: cardY + 314,
  width: cardW - 40,
  height: 38,
  color: hex("#030E26"),
  radius: 6,
  stroke: cGold,
  strokeWeight: 1,
  parent: bentoFrame,
});
makeText({
  text: "PREMIUM LOOK: MEMBENARKAN HARGA TINGGI",
  x: rightX + 20,
  y: cardY + 324,
  width: cardW - 40,
  fontSize: 12.7,
  fontStyle: "Bold",
  color: cGold,
  align: "CENTER",
  parent: bentoFrame,
});

figma.viewport.scrollAndZoomIntoView([p16]);
figma.notify("Middle Bento Cards Berhasil Diremaster dengan Taste Design!");

return { success: true };
`;

async function main() {
  try {
    console.log("Mengeksekusi remaster middle bento cards di Figma...");
    await exec(scriptCode);
    console.log("Eksekusi sukses!");

    console.log("Mengambil screenshot kanvas terbaru...");
    const snap: any = await callPlugin("get_screenshot", { nodeId: "809:10097", format: "png", scale: 1 });
    const buf = Buffer.from(snap.data, "base64");
    const outPath = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/figma_poster_16_taste_design.png";
    writeFileSync(outPath, buf);
    console.log("Screenshot tersimpan di:", outPath, "Ukuran:", buf.length);
  } catch (err: any) {
    console.error("Gagal remaster:", err.message);
  }
}

main();
