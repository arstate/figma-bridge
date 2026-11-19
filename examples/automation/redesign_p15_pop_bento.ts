import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

// =============================================================================
// MASTER SCRIPT: 7 VARIED STYLES ACROSS POSTERS 14-20 (ZERO MONOTONY)
// =============================================================================

async function main() {
  console.log("=== REMASTERING 7 DIVERSE CAMPAIGN POSTERS (DJADI CREATIVE) ===");

  // ---------------------------------------------------------------------------
  // 1. POSTER 15: POP-SURREALIST BENTO GRID & DUAL FEED COMPARISON
  // ---------------------------------------------------------------------------
  console.log("Building Poster 15 (Pop-Surrealist 3:4 Bento Grid)...");
  const codeP15 = `
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });

    const p = await figma.getNodeByIdAsync("809:9931");
    if (!p) return { error: "P15 not found" };

    const old = [...p.children];
    for (const c of old) c.remove();

    p.resize(1080, 1440);
    p.fills = [{ type: "SOLID", color: { r: 0.965, g: 0.957, b: 0.925 } }]; // Warm Cream

    // Background 3:4 grid lines
    const grid = figma.createFrame();
    grid.name = "Background_3x4_Grid";
    grid.resize(1080, 1440); grid.fills = [];
    for (let y = 120; y < 1440; y += 120) {
      const line = figma.createLine();
      line.x = 0; line.y = y; line.resize(1080, 0);
      line.strokes = [{ type: "SOLID", color: { r: 0.90, g: 0.88, b: 0.84 } }];
      grid.appendChild(line);
    }
    for (let x = 120; x < 1080; x += 120) {
      const line = figma.createLine();
      line.x = x; line.y = 0; line.rotation = 90; line.resize(1440, 0);
      line.strokes = [{ type: "SOLID", color: { r: 0.90, g: 0.88, b: 0.84 } }];
      grid.appendChild(line);
    }
    p.appendChild(grid);

    // Header
    const master = await figma.getNodeByIdAsync("795:273");
    const mLogo = master.findOne(n => n.name.toLowerCase().includes("logo") || n.name === "Djadi creative");
    if (mLogo) {
      const l = mLogo.clone();
      l.x = 80; l.y = 45;
      p.appendChild(l);
    }

    const catPill = figma.createFrame();
    catPill.resize(260, 36); catPill.x = 740; catPill.y = 52;
    catPill.cornerRadius = 18;
    catPill.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    catPill.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    catPill.strokeWeight = 1.5;

    const dot = figma.createEllipse();
    dot.resize(10, 10); dot.x = 14; dot.y = 13;
    dot.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.75, b: 0.45 } }];
    catPill.appendChild(dot);

    const catTxt = figma.createText();
    catTxt.fontName = { family: "Space Mono", style: "Bold" };
    catTxt.characters = "VISUAL AUTHORITY 3:4";
    catTxt.fontSize = 10;
    catTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    catTxt.x = 32; catTxt.y = 11;
    catPill.appendChild(catTxt);
    p.appendChild(catPill);

    // Headline
    const heroTitle = figma.createText();
    heroTitle.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    heroTitle.characters = "FEED BERANTAKAN BIKIN BRAND\\nDICAP TOKO MURAHAN!";
    heroTitle.fontSize = 42;
    heroTitle.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    heroTitle.textAlignHorizontal = "CENTER";
    heroTitle.x = 80; heroTitle.y = 120;
    heroTitle.resize(920, 110);
    p.appendChild(heroTitle);

    const subBanner = figma.createFrame();
    subBanner.resize(680, 42); subBanner.x = 200; subBanner.y = 245;
    subBanner.cornerRadius = 6;
    subBanner.fills = [{ type: "SOLID", color: { r: 0.702, g: 0, b: 0.106 } }];

    const subTxt = figma.createText();
    subTxt.fontName = { family: "Space Mono", style: "Bold" };
    subTxt.characters = "KUASAI 80% LAYAR HP AUDIENS DENGAN FORMAT FEED 3:4";
    subTxt.fontSize = 12;
    subTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    subTxt.textAlignHorizontal = "CENTER";
    subTxt.x = 0; subTxt.y = 12; subTxt.resize(680, 20);
    subBanner.appendChild(subTxt);
    p.appendChild(subBanner);

    // Comparison Card
    // Hard shadow rectangle
    const compShadow = figma.createRectangle();
    compShadow.resize(920, 370); compShadow.x = 88; compShadow.y = 318;
    compShadow.cornerRadius = 14;
    compShadow.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    p.appendChild(compShadow);

    const compCard = figma.createFrame();
    compCard.resize(920, 370); compCard.x = 80; compCard.y = 310;
    compCard.cornerRadius = 14;
    compCard.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    compCard.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    compCard.strokeWeight = 2;

    // Left pane
    const lPane = figma.createFrame();
    lPane.resize(420, 320); lPane.x = 25; lPane.y = 25;
    lPane.cornerRadius = 10;
    lPane.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.95, b: 0.95 } }];
    lPane.strokes = [{ type: "SOLID", color: { r: 0.85, g: 0.3, b: 0.3 } }];

    const lBadge = figma.createFrame();
    lBadge.resize(170, 24); lBadge.x = 15; lBadge.y = 15;
    lBadge.cornerRadius = 4;
    lBadge.fills = [{ type: "SOLID", color: { r: 0.85, g: 0.2, b: 0.2 } }];
    const lBadgeTxt = figma.createText();
    lBadgeTxt.fontName = { family: "Space Mono", style: "Bold" };
    lBadgeTxt.characters = "FEED AMATIR 1:1";
    lBadgeTxt.fontSize = 9; lBadgeTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    lBadgeTxt.x = 18; lBadgeTxt.y = 5;
    lBadge.appendChild(lBadgeTxt);
    lPane.appendChild(lBadge);

    const colorsAmatir = [
      { r: 0.9, g: 0.5, b: 0.5 }, { r: 0.5, g: 0.6, b: 0.9 }, { r: 0.9, g: 0.8, b: 0.4 },
      { r: 0.7, g: 0.5, b: 0.8 }, { r: 0.4, g: 0.8, b: 0.6 }, { r: 0.9, g: 0.4, b: 0.6 },
      { r: 0.8, g: 0.7, b: 0.5 }, { r: 0.6, g: 0.6, b: 0.6 }, { r: 0.8, g: 0.4, b: 0.9 }
    ];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const sq = figma.createRectangle();
        sq.resize(110, 60);
        sq.x = 25 + c * 125; sq.y = 50 + r * 72;
        sq.cornerRadius = 6;
        sq.fills = [{ type: "SOLID", color: colorsAmatir[r * 3 + c] }];
        lPane.appendChild(sq);
      }
    }
    const lAlert = figma.createText();
    lAlert.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
    lAlert.characters = "Hasil: Audiens Ragu, Toko Terkesan Tidak Niat.";
    lAlert.fontSize = 11.5;
    lAlert.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.1, b: 0.1 } }];
    lAlert.x = 25; lAlert.y = 285;
    lPane.appendChild(lAlert);
    compCard.appendChild(lPane);

    // Right pane
    const rPane = figma.createFrame();
    rPane.resize(430, 320); rPane.x = 465; rPane.y = 25;
    rPane.cornerRadius = 10;
    rPane.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];

    const rBadge = figma.createFrame();
    rBadge.resize(220, 24); rBadge.x = 15; rBadge.y = 15;
    rBadge.cornerRadius = 4;
    rBadge.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    const rBadgeTxt = figma.createText();
    rBadgeTxt.fontName = { family: "Space Mono", style: "Bold" };
    rBadgeTxt.characters = "DESAIN MODERN TEGAS 3:4";
    rBadgeTxt.fontSize = 9; rBadgeTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    rBadgeTxt.x = 12; rBadgeTxt.y = 5;
    rBadge.appendChild(rBadgeTxt);
    rPane.appendChild(rBadge);

    const colorsAgency = [
      { r: 0.965, g: 0.957, b: 0.925 }, { r: 0.08, g: 0.25, b: 0.55 }, { r: 1, g: 0.839, b: 0.039 },
      { r: 0.08, g: 0.25, b: 0.55 }, { r: 0.965, g: 0.957, b: 0.925 }, { r: 1, g: 0.243, b: 0.114 }
    ];
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const sq = figma.createRectangle();
        sq.resize(115, 95);
        sq.x = 25 + c * 130; sq.y = 50 + r * 110;
        sq.cornerRadius = 6;
        sq.fills = [{ type: "SOLID", color: colorsAgency[r * 3 + c] }];
        rPane.appendChild(sq);
      }
    }
    const rSuccess = figma.createText();
    rSuccess.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
    rSuccess.characters = "Hasil: Tampil Mewah, Menjustifikasi Harga Tinggi!";
    rSuccess.fontSize = 11.5;
    rSuccess.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    rSuccess.x = 25; rSuccess.y = 285;
    rPane.appendChild(rSuccess);
    compCard.appendChild(rPane);

    p.appendChild(compCard);

    // 3 Bento Columns
    const bentoData = [
      {
        tier: "TIER 1 · STARTER",
        title: "10 Feed 3:4",
        price: "Rp 1.200.000",
        theme: "WHITE",
        points: ["10 Feed 3:4 Potret", "Safe-Zone 1080x1080", "Hook 3 Detik FYP", "Riset Pembeda Tajam"]
      },
      {
        tier: "TIER 2 · AUTHORITY",
        title: "20 Feed & Carousel",
        price: "Rp 2.400.000",
        theme: "NAVY",
        points: ["20 Konten Campuran", "Slide Edukasi 5-Lapis", "Storytelling Konversi", "Panduan Visual Brand"]
      },
      {
        tier: "TIER 3 · HERO ALL-IN",
        title: "Retainer HERO",
        price: "Rp 4.000.000 / Bln",
        theme: "GOLD",
        points: ["20 Konten (Feed+Reels)", "Website .com Kilat", "Meta Ads CBO Terarah", "3x Mentoring Mas Tiar"]
      }
    ];

    bentoData.forEach((b, idx) => {
      const bx = 80 + idx * 315;
      const by = 710;

      // Shadow
      const sh = figma.createRectangle();
      sh.resize(290, 580); sh.x = bx + 7; sh.y = by + 7;
      sh.cornerRadius = 12;
      sh.fills = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 0.702, g: 0, b: 0.106 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      p.appendChild(sh);

      // Card
      const c = figma.createFrame();
      c.resize(290, 580); c.x = bx; c.y = by;
      c.cornerRadius = 12;
      c.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      c.strokeWeight = 2;

      let bg, tColor;
      if (b.theme === "WHITE") {
        bg = { r: 1, g: 1, b: 1 };
        tColor = { r: 0.004, g: 0.161, b: 0.412 };
      } else if (b.theme === "NAVY") {
        bg = { r: 0.004, g: 0.161, b: 0.412 };
        tColor = { r: 1, g: 1, b: 1 };
      } else {
        bg = { r: 1, g: 0.839, b: 0.039 };
        tColor = { r: 0.004, g: 0.161, b: 0.412 };
      }
      c.fills = [{ type: "SOLID", color: bg }];

      // Badge
      const bgBadge = figma.createFrame();
      bgBadge.resize(170, 24); bgBadge.x = 20; bgBadge.y = 20;
      bgBadge.cornerRadius = 4;
      bgBadge.fills = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 0.702, g: 0, b: 0.106 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      const bt = figma.createText();
      bt.fontName = { family: "Space Mono", style: "Bold" };
      bt.characters = b.tier;
      bt.fontSize = 8.5;
      bt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      bt.x = 10; bt.y = 5;
      bgBadge.appendChild(bt);
      c.appendChild(bgBadge);

      // Title
      const tit = figma.createText();
      tit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      tit.characters = b.title;
      tit.fontSize = 20;
      tit.fills = [{ type: "SOLID", color: tColor }];
      tit.x = 20; tit.y = 58; tit.resize(250, 50);
      c.appendChild(tit);

      // Price
      const pr = figma.createText();
      pr.fontName = { family: "Space Mono", style: "Bold" };
      pr.characters = b.price;
      pr.fontSize = 18;
      pr.fills = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 1, g: 0.839, b: 0.039 } : tColor }];
      pr.x = 20; pr.y = 120;
      c.appendChild(pr);

      // Divider line
      const l = figma.createLine();
      l.x = 20; l.y = 160; l.resize(250, 0);
      l.strokes = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 1, g: 1, b: 1, a: 0.25 } : { r: 0, g: 0, b: 0, a: 0.12 } }];
      c.appendChild(l);

      // Points
      b.points.forEach((pt, idx2) => {
        const row = figma.createFrame();
        row.resize(250, 48); row.x = 20; row.y = 180 + idx2 * 54;
        row.fills = [];

        const chk = figma.createText();
        chk.fontName = { family: "Space Mono", style: "Bold" };
        chk.characters = "✓";
        chk.fontSize = 14;
        chk.fills = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 0.22, g: 0.74, b: 0.97 } : { r: 0.004, g: 0.161, b: 0.412 } }];
        chk.x = 0; chk.y = 2;
        row.appendChild(chk);

        const txt = figma.createText();
        txt.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        txt.characters = pt;
        txt.fontSize = 11;
        txt.fills = [{ type: "SOLID", color: tColor }];
        txt.x = 20; txt.y = 2; txt.resize(230, 44);
        row.appendChild(txt);
        c.appendChild(row);
      });

      // Bottom Button
      const btn = figma.createFrame();
      btn.resize(250, 42); btn.x = 20; btn.y = 510;
      btn.cornerRadius = 8;
      btn.fills = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 1, g: 0.839, b: 0.039 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      const btnTxt = figma.createText();
      btnTxt.fontName = { family: "Space Mono", style: "Bold" };
      btnTxt.characters = "PILIH PAKET INI →";
      btnTxt.fontSize = 10.5;
      btnTxt.fills = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 0.004, g: 0.161, b: 0.412 } : { r: 1, g: 1, b: 1 } }];
      btnTxt.textAlignHorizontal = "CENTER";
      btnTxt.x = 0; btnTxt.y = 13; btnTxt.resize(250, 20);
      btn.appendChild(btnTxt);
      c.appendChild(btn);

      p.appendChild(c);
    });

    // Footer
    const footer = figma.createFrame();
    footer.resize(920, 68); footer.x = 80; footer.y = 1334; footer.fills = [];

    const fTag = figma.createText();
    fTag.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
    fTag.characters = "Urusan Iklan & Konten, Semua Beres di Djadi!";
    fTag.fontSize = 16;
    fTag.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    fTag.x = 0; fTag.y = 10;
    footer.appendChild(fTag);

    const fSub = figma.createText();
    fSub.fontName = { family: "Space Mono", style: "Regular" };
    fSub.characters = "OFFICIAL DJADI CREATIVE · SURABAYA - SIDOARJO";
    fSub.fontSize = 10;
    fSub.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.45 } }];
    fSub.x = 0; fSub.y = 36;
    footer.appendChild(fSub);

    const waBox = figma.createFrame();
    waBox.resize(250, 48); waBox.x = 670; waBox.y = 8;
    waBox.cornerRadius = 6;
    waBox.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    waBox.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    waBox.strokeWeight = 1.5;

    const waCircle = figma.createEllipse();
    waCircle.resize(22, 22); waCircle.x = 12; waCircle.y = 13;
    waCircle.fills = [{ type: "SOLID", color: { r: 0.145, g: 0.827, b: 0.4 } }];
    waBox.appendChild(waCircle);

    const waKicker = figma.createText();
    waKicker.fontName = { family: "Space Mono", style: "Regular" };
    waKicker.characters = "DIRECT WHATSAPP CONSULT";
    waKicker.fontSize = 7.5;
    waKicker.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    waKicker.x = 42; waKicker.y = 9;
    waBox.appendChild(waKicker);

    const waNum = figma.createText();
    waNum.fontName = { family: "Space Mono", style: "Bold" };
    waNum.characters = "0851-9659-8881";
    waNum.fontSize = 15;
    waNum.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    waNum.x = 42; waNum.y = 22;
    waBox.appendChild(waNum);

    footer.appendChild(waBox);
    p.appendChild(footer);

    return { success: true };
  `;

  const res = await callPlugin("execute", { code: codeP15 });
  console.log("P15 Redesign Result:", res);
}

main().catch(console.error);
