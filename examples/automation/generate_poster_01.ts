import { exec } from "./server/src/relay-client";

export const posterCode = `
return (async () => {
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

  // 5. Header Zone (Y: 60 - 160)
  // Top Kicker Pill
  const kickerBg = createRect({
    name: "Kicker_Badge",
    x: 80,
    y: 70,
    width: 320,
    height: 38,
    color: cNavy,
    radius: 6,
  });
  createText({
    text: "EFISIENSI BIAYA BISNIS 2026",
    x: 96,
    y: 81,
    fontSize: 13,
    style: "Bold",
    color: cGold,
  });

  // Top Domain Badge
  createText({
    text: "DJADICREATIVE.COM · OFFICIAL RETAINER",
    x: 650,
    y: 81,
    fontSize: 13,
    style: "Semi Bold",
    color: cNavy,
    align: "RIGHT",
  });

  // 6. Safe-Zone Header (Y: 180 - 450)
  createText({
    text: "GAJI TIM IN-HOUSE 13.5 JUTA?",
    x: 80,
    y: 190,
    width: 920,
    fontSize: 50,
    style: "Extra Bold",
    color: cNavy,
    lineHeight: 58,
  });

  createText({
    text: "PANGKAS JADI 4 JUTA ALL-IN!",
    x: 80,
    y: 256,
    width: 920,
    fontSize: 52,
    style: "Extra Bold",
    color: cOrange,
    lineHeight: 60,
  });

  createText({
    text: "Ngapain bayar 3 gaji karyawan terpisah kalau satu tim agensi bisa mengawal Website Kilat, 20 Konten Bulanan, dan Iklan Meta CBO sekaligus?",
    x: 80,
    y: 335,
    width: 920,
    fontSize: 22,
    style: "Medium",
    color: cDark,
    lineHeight: 34,
  });

  // 7. Comparison Cards (Y: 460 - 1000)
  // LEFT CARD: In-House Overhead
  const leftX = 80;
  const cardY = 470;
  const cardW = 440;
  const cardH = 500;

  // Hard Shadow Left Card
  createRect({
    name: "Left_Card_Shadow",
    x: leftX + 8,
    y: cardY + 8,
    width: cardW,
    height: cardH,
    color: cNavy,
    radius: 12,
  });

  // Left Card Body
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

  // Left Card Content
  createRect({
    name: "Left_Card_Header_Pill",
    x: leftX + 24,
    y: cardY + 24,
    width: 250,
    height: 32,
    color: hex("#F1F5F9"),
    radius: 6,
  });
  createText({
    text: "TIM IN-HOUSE TRADISIONAL",
    x: leftX + 34,
    y: cardY + 31,
    fontSize: 12,
    style: "Bold",
    color: cGray,
  });

  createText({
    text: "Beban Finansial / Bulan:",
    x: leftX + 24,
    y: cardY + 76,
    fontSize: 16,
    style: "Semi Bold",
    color: cDark,
  });

  const inhouseItems = [
    { role: "1 Desainer Grafis Feed/Story", cost: "Rp 4.000.000" },
    { role: "1 Web Developer Custom Code", cost: "Rp 5.000.000" },
    { role: "1 Media Buyer Meta/Google Ads", cost: "Rp 4.500.000" },
    { role: "BPJS + THR + Fasilitas Kerja", cost: "Rp 1.500.000+" },
  ];

  let itemY = cardY + 115;
  for (const it of inhouseItems) {
    createText({ text: "✕ " + it.role, x: leftX + 24, y: itemY, fontSize: 14, style: "Medium", color: cGray });
    createText({ text: it.cost, x: leftX + 24, y: itemY + 22, fontSize: 16, style: "Bold", color: cDark });
    itemY += 56;
  }

  // Strikethrough Box
  createRect({
    name: "Total_Inhouse_Bg",
    x: leftX + 24,
    y: cardY + 375,
    width: cardW - 48,
    height: 80,
    color: hex("#FEF2F2"),
    radius: 8,
    stroke: hex("#FCA5A5"),
  });
  createText({
    text: "TOTAL BIAYA OWNER:",
    x: leftX + 40,
    y: cardY + 390,
    fontSize: 12,
    style: "Bold",
    color: cCrimson,
  });
  createText({
    text: "Rp 15.000.000/bln",
    x: leftX + 40,
    y: cardY + 412,
    fontSize: 26,
    style: "Extra Bold",
    color: cCrimson,
  });

  // RIGHT CARD: Paket Djadi HERO (Winning Card)
  const rightX = 560;

  // Hard Shadow Right Card (Crimson Red Shadow for High Energy)
  createRect({
    name: "Right_Card_Shadow",
    x: rightX + 10,
    y: cardY + 10,
    width: cardW,
    height: cardH,
    color: cCrimson,
    radius: 12,
  });

  // Right Card Body (Deep Navy)
  createRect({
    name: "Right_Card_Body",
    x: rightX,
    y: cardY,
    width: cardW,
    height: cardH,
    color: cNavy,
    radius: 12,
  });

  // Right Card Header Badge
  createRect({
    name: "Right_Card_Header_Pill",
    x: rightX + 24,
    y: cardY + 24,
    width: 230,
    height: 32,
    color: cOrange,
    radius: 6,
  });
  createText({
    text: "PAKET DJADI HERO ALL-IN",
    x: rightX + 34,
    y: cardY + 31,
    fontSize: 12,
    style: "Bold",
    color: cWhite,
  });

  createText({
    text: "Investasi Bersih All-In:",
    x: rightX + 24,
    y: cardY + 74,
    fontSize: 15,
    style: "Medium",
    color: hex("#93C5FD"),
  });

  createText({
    text: "Rp 4.000.000",
    x: rightX + 24,
    y: cardY + 100,
    fontSize: 38,
    style: "Extra Bold",
    color: cGold,
  });
  createText({
    text: "/bulan (Net)",
    x: rightX + 300,
    y: cardY + 118,
    fontSize: 16,
    style: "Semi Bold",
    color: cWhite,
  });

  const heroItems = [
    "✓ 20 Konten Campuran (Feed 3:4 + Reels 9:16)",
    "✓ Official Website .com (LCP < 1.5s kilat)",
    "✓ Managed Meta Ads Advantage+ CBO",
    "✓ Google Search Ads Brand Defense #1",
    "✓ 3x Mentoring Zoom Mas Tiar (Strategi Cuan)",
  ];

  let heroY = cardY + 175;
  for (const h of heroItems) {
    createText({ text: h, x: rightX + 24, y: heroY, width: cardW - 48, fontSize: 14, style: "Medium", color: cWhite, lineHeight: 22 });
    heroY += 44;
  }

  // Right Card Saving Callout
  createRect({
    name: "Saving_Badge",
    x: rightX + 24,
    y: cardY + 415,
    width: cardW - 48,
    height: 54,
    color: hex("#0F172A"),
    radius: 8,
  });
  createText({
    text: "★ HEMAT SAMPAI RP 11.000.000 / BULAN",
    x: rightX + 40,
    y: cardY + 432,
    fontSize: 14,
    style: "Bold",
    color: cGold,
  });

  // 8. Conversion Dock & Voucher (Y: 1010 - 1220)
  const dockY = 1020;
  const dockW = 920;
  const dockH = 150;

  // Dock Shadow
  createRect({
    name: "Dock_Shadow",
    x: 88,
    y: dockY + 8,
    width: dockW,
    height: dockH,
    color: cNavy,
    radius: 16,
  });

  // Dock Body
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

  // Left CTA Text in Dock
  createText({
    text: "DISKON KHUSUS SPK BULAN INI",
    x: 110,
    y: dockY + 28,
    fontSize: 14,
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
    width: 520,
    fontSize: 15,
    style: "Regular",
    color: cDark,
    lineHeight: 22,
  });

  // Right WhatsApp Action Button
  const btnX = 660;
  const btnY = dockY + 40;
  createRect({
    name: "CTA_Button_Bg",
    x: btnX,
    y: btnY,
    width: 300,
    height: 70,
    color: cOrange,
    radius: 12,
  });
  createText({
    text: "KLAIM VIA WHATSAPP →",
    x: btnX + 30,
    y: btnY + 16,
    fontSize: 16,
    style: "Extra Bold",
    color: cWhite,
  });
  createText({
    text: "+62 851-9659-8881",
    x: btnX + 50,
    y: btnY + 40,
    fontSize: 14,
    style: "Bold",
    color: cGold,
  });

  // 9. Footer Safe Zone (Y: 1250 - 1380)
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
  figma.notify("Poster 01 Djadi HERO Berhasil Dibuat di Figma!");

  return {
    success: true,
    posterId: root.id,
    name: root.name,
    width: root.width,
    height: root.height,
  };
})();
`;

async function main() {
  try {
    console.log("Mengirim kode pembuatan Poster 01 ke Figma Desktop...");
    const res = await exec(posterCode);
    console.log("Hasil Pembuatan Poster di Figma:", JSON.stringify(res, null, 2));
  } catch (err: any) {
    console.error("Gagal membuat poster di Figma:", err.message);
  }
}

if (import.meta.main) {
  main();
}
