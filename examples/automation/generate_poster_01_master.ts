import { readFileSync, writeFileSync } from "node:fs";
import { callPlugin, exec } from "./server/src/relay-client";

const logoSvg = readFileSync("/mnt/HDD-2/BACKUP LINUX/FILE DATA/DJADI CREATIVE/WEBSITE DJADI/dist/logo-djadi.svg", "utf-8");

export const posterCode = `
// 1. Load Fonts
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Medium" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Extra Bold" });

// 2. Color Helper
const hex = (h) => {
  const c = h.replace("#", "");
  return {
    r: parseInt(c.substring(0, 2), 16) / 255,
    g: parseInt(c.substring(2, 4), 16) / 255,
    b: parseInt(c.substring(4, 6), 16) / 255,
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

// 3. Remove existing frame if named identically
const existing = figma.currentPage.findOne(n => n.name === "POSTER_01_DJADI_HERO");
if (existing) existing.remove();

// 4. Create Main Frame (1080 x 1440)
const root = figma.createFrame();
root.name = "POSTER_01_DJADI_HERO";
root.resize(1080, 1440);
root.x = 0;
root.y = 0;
root.fills = [{ type: "SOLID", color: cCream }];
figma.currentPage.appendChild(root);

// Helper Text Creator
const createText = ({ text, x, y, width, fontSize, style = "Regular", color = cDark, align = "LEFT", lineHeight = null }) => {
  const t = figma.createText();
  t.fontName = { family: "Inter", style };
  t.characters = text;
  t.fontSize = fontSize;
  t.fills = [{ type: "SOLID", color }];
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
  root.appendChild(t);
  return t;
};

// Helper Rect Creator
const createRect = ({ name, x, y, width, height, color, radius = 0, stroke = null, strokeWeight = 1 }) => {
  const r = figma.createRectangle();
  r.name = name;
  r.resize(width, height);
  r.x = x;
  r.y = y;
  r.cornerRadius = radius;
  r.fills = [{ type: "SOLID", color }];
  if (stroke) {
    r.strokes = [{ type: "SOLID", color: stroke }];
    r.strokeWeight = strokeWeight;
  }
  root.appendChild(r);
  return r;
};

// 5. Header Zone (Y: 55 - 160)
// Official Djadi Logo from SVG
try {
  const rawSvg = ${JSON.stringify(logoSvg)};
  const logoNode = figma.createNodeFromSvg(rawSvg);
  logoNode.name = "Logo_Djadi_Creative";
  const targetW = 120;
  const scale = targetW / logoNode.width;
  logoNode.rescale(scale);
  logoNode.x = 880;
  logoNode.y = 58;
  root.appendChild(logoNode);
} catch (e) {
  console.error("Logo insertion error:", e);
}

// Top Kicker Badge
createRect({
  name: "Kicker_Badge",
  x: 80,
  y: 65,
  width: 290,
  height: 36,
  color: cNavy,
  radius: 6,
});
createText({
  text: "EFISIENSI BIAYA BISNIS 2026",
  x: 94,
  y: 75,
  fontSize: 13,
  style: "Bold",
  color: cGold,
});

createText({
  text: "FINANCIAL AUDIT · UMKM & SCALE-UP",
  x: 390,
  y: 76,
  fontSize: 12,
  style: "Semi Bold",
  color: cGray,
});

// 6. Safe-Zone Headline (Y: 175 - 430)
createText({
  text: "GAJI TIM IN-HOUSE 13.5 JUTA?",
  x: 80,
  y: 180,
  width: 920,
  fontSize: 48,
  style: "Extra Bold",
  color: cNavy,
  lineHeight: 56,
});

createText({
  text: "PANGKAS JADI 4 JUTA ALL-IN!",
  x: 80,
  y: 244,
  width: 920,
  fontSize: 52,
  style: "Extra Bold",
  color: cOrange,
  lineHeight: 60,
});

createText({
  text: "Ngapain bayar 3 gaji karyawan terpisah kalau satu tim agensi bisa mengawal Website Kilat, 20 Konten Bulanan, dan Iklan Meta CBO sekaligus?",
  x: 80,
  y: 320,
  width: 920,
  fontSize: 21,
  style: "Medium",
  color: cDark,
  lineHeight: 33,
});

// 7. Comparison Cards (Y: 440 - 970)
const cardY = 445;
const cardW = 440;
const cardH = 520;

// LEFT CARD: In-House Overhead
const leftX = 80;

createRect({
  name: "Left_Card_Shadow",
  x: leftX + 8,
  y: cardY + 8,
  width: cardW,
  height: cardH,
  color: cNavy,
  radius: 12,
});

createRect({
  name: "Left_Card_Body",
  x: leftX,
  y: cardY,
  width: cardW,
  height: cardH,
  color: cWhite,
  radius: 12,
  stroke: cBorder,
  strokeWeight: 2,
});

createRect({
  name: "Left_Card_Header_Pill",
  x: leftX + 24,
  y: cardY + 22,
  width: 250,
  height: 32,
  color: hex("#F1F5F9"),
  radius: 6,
});
createText({
  text: "TIM IN-HOUSE TRADISIONAL",
  x: leftX + 34,
  y: cardY + 29,
  fontSize: 12,
  style: "Bold",
  color: cGray,
});

createText({
  text: "Beban Finansial / Bulan:",
  x: leftX + 24,
  y: cardY + 70,
  fontSize: 15,
  style: "Semi Bold",
  color: cDark,
});

const inhouseItems = [
  { role: "1 Desainer Grafis Feed & Video", cost: "Rp 4.000.000" },
  { role: "1 Web Developer Custom Code", cost: "Rp 5.000.000" },
  { role: "1 Media Buyer Meta & Google Ads", cost: "Rp 4.500.000" },
  { role: "BPJS, THR, Fasilitas & Listrik", cost: "Rp 1.500.000+" },
];

let itemY = cardY + 105;
for (const it of inhouseItems) {
  createText({ text: "✕ " + it.role, x: leftX + 24, y: itemY, fontSize: 13, style: "Medium", color: cGray });
  createText({ text: it.cost, x: leftX + 24, y: itemY + 20, fontSize: 16, style: "Bold", color: cDark });
  itemY += 56;
}

// Strikethrough Box
createRect({
  name: "Total_Inhouse_Bg",
  x: leftX + 24,
  y: cardY + 395,
  width: cardW - 48,
  height: 95,
  color: hex("#FEF2F2"),
  radius: 8,
  stroke: hex("#FCA5A5"),
});
createText({
  text: "TOTAL PENGELUARAN FOUNDER:",
  x: leftX + 38,
  y: cardY + 410,
  fontSize: 12,
  style: "Bold",
  color: cCrimson,
});
createText({
  text: "Rp 15.000.000/bln",
  x: leftX + 38,
  y: cardY + 432,
  fontSize: 26,
  style: "Extra Bold",
  color: cCrimson,
});
createText({
  text: "*Belum termasuk pusing manajemen harian",
  x: leftX + 38,
  y: cardY + 468,
  fontSize: 11,
  style: "Regular",
  color: cGray,
});

// RIGHT CARD: Paket Djadi HERO (Winning Card)
const rightX = 560;

createRect({
  name: "Right_Card_Shadow",
  x: rightX + 10,
  y: cardY + 10,
  width: cardW,
  height: cardH,
  color: cCrimson,
  radius: 12,
});

createRect({
  name: "Right_Card_Body",
  x: rightX,
  y: cardY,
  width: cardW,
  height: cardH,
  color: cNavy,
  radius: 12,
});

createRect({
  name: "Right_Card_Header_Pill",
  x: rightX + 24,
  y: cardY + 22,
  width: 230,
  height: 32,
  color: cOrange,
  radius: 6,
});
createText({
  text: "PAKET DJADI HERO ALL-IN",
  x: rightX + 34,
  y: cardY + 29,
  fontSize: 12,
  style: "Bold",
  color: cWhite,
});

createText({
  text: "Investasi Bersih All-In:",
  x: rightX + 24,
  y: cardY + 68,
  fontSize: 14,
  style: "Medium",
  color: hex("#93C5FD"),
});

createText({
  text: "Rp 4.000.000",
  x: rightX + 24,
  y: cardY + 92,
  fontSize: 38,
  style: "Extra Bold",
  color: cGold,
});

createRect({
  name: "Right_Card_Net_Badge",
  x: rightX + 295,
  y: cardY + 102,
  width: 120,
  height: 28,
  color: hex("#0F172A"),
  radius: 6,
});
createText({
  text: "/bulan · Net",
  x: rightX + 310,
  y: cardY + 108,
  fontSize: 13,
  style: "Bold",
  color: cWhite,
});

const heroItems = [
  "✓ 20 Konten Campuran (Feed 3:4 + Reels 9:16)",
  "✓ Official Website .com (LCP < 1.5s kilat)",
  "✓ Managed Meta Ads Advantage+ CBO",
  "✓ Google Search Ads Brand Defense #1",
  "✓ 3x Mentoring Zoom Mas Tiar (Direct Strategy)",
];

let heroY = cardY + 165;
for (const h of heroItems) {
  createText({ text: h, x: rightX + 24, y: heroY, width: cardW - 48, fontSize: 13.5, style: "Medium", color: cWhite, lineHeight: 21 });
  heroY += 44;
}

// Right Card Saving Callout
createRect({
  name: "Saving_Badge",
  x: rightX + 24,
  y: cardY + 415,
  width: cardW - 48,
  height: 75,
  color: hex("#030E26"),
  radius: 8,
  stroke: cGold,
  strokeWeight: 1.5,
});
createText({
  text: "★ HEMAT SAMPAI RP 11.000.000 / BULAN",
  x: rightX + 38,
  y: cardY + 430,
  fontSize: 13.5,
  style: "Bold",
  color: cGold,
});
createText({
  text: "Fokus besarkan bisnis, operasional konten & iklan beres!",
  x: rightX + 38,
  y: cardY + 455,
  fontSize: 12,
  style: "Regular",
  color: hex("#CBD5E1"),
});

// 8. Conversion Dock & Voucher (Y: 995 - 1175)
const dockY = 1000;
const dockW = 920;
const dockH = 160;

createRect({
  name: "Dock_Shadow",
  x: 88,
  y: dockY + 8,
  width: dockW,
  height: dockH,
  color: cNavy,
  radius: 16,
});

createRect({
  name: "Dock_Body",
  x: 80,
  y: dockY,
  width: dockW,
  height: dockH,
  color: cWhite,
  radius: 16,
  stroke: cOrange,
  strokeWeight: 3,
});

createText({
  text: "DISKON KHUSUS SPK BULAN INI",
  x: 110,
  y: dockY + 28,
  fontSize: 13,
  style: "Bold",
  color: cCrimson,
});

createText({
  text: "Gunakan Kode Voucher: DJADICUAN500",
  x: 110,
  y: dockY + 54,
  fontSize: 24,
  style: "Extra Bold",
  color: cNavy,
});

createText({
  text: "Potongan langsung Rp 500.000 + DP Komitmen hanya Rp 2.000.000 di awal.",
  x: 110,
  y: dockY + 95,
  width: 500,
  fontSize: 15,
  style: "Regular",
  color: cDark,
  lineHeight: 22,
});

// WhatsApp Action Button
const btnX = 640;
const btnY = dockY + 35;
createRect({
  name: "CTA_Button_Bg",
  x: btnX,
  y: btnY,
  width: 320,
  height: 85,
  color: cOrange,
  radius: 12,
});
createText({
  text: "KLAIM VIA WHATSAPP →",
  x: btnX + 35,
  y: btnY + 20,
  fontSize: 16,
  style: "Extra Bold",
  color: cWhite,
});
createText({
  text: "+62 851-9659-8881",
  x: btnX + 55,
  y: btnY + 46,
  fontSize: 15,
  style: "Bold",
  color: cGold,
});

// 9. Footer Safe Zone (Y: 1220 - 1380)
createRect({
  name: "Footer_Divider",
  x: 80,
  y: 1240,
  width: 920,
  height: 1,
  color: cBorder,
});

createText({
  text: "URUSAN IKLAN & KONTEN, SEMUA BERES DJADI! · SURABAYA, INDONESIA",
  x: 80,
  y: 1270,
  width: 920,
  fontSize: 14,
  style: "Bold",
  color: cNavy,
  align: "CENTER",
});

createText({
  text: "Garansi Serah Terima Cepat & Transparan · djadicreative.com · Hak Cipta 2026 Djadi Creative",
  x: 80,
  y: 1300,
  width: 920,
  fontSize: 13,
  style: "Regular",
  color: cGray,
  align: "CENTER",
});

// Zoom into view & notify
figma.viewport.scrollAndZoomIntoView([root]);
figma.notify("Poster 01 Master Djadi HERO Berhasil Diperbarui di Figma!");

return {
  success: true,
  posterId: root.id,
  name: root.name,
  width: root.width,
  height: root.height,
};
`;

async function main() {
  try {
    console.log("Mengirim kode pembaruan Master Poster 01 ke Figma...");
    const res: any = await exec(posterCode);
    console.log("Hasil:", JSON.stringify(res, null, 2));

    const posterId = res.value.posterId;
    console.log("Mengambil screenshot visual kanvas untuk node:", posterId);
    const snap: any = await callPlugin("get_screenshot", { nodeId: posterId, format: "png", scale: 1 });
    const buf = Buffer.from(snap.data, "base64");
    const outPath = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/figma_poster_01_master.png";
    writeFileSync(outPath, buf);
    console.log("Screenshot master tersimpan di:", outPath, "Ukuran:", buf.length, "bytes");
  } catch (err: any) {
    console.error("Gagal mengeksekusi:", err.message);
  }
}

main();
