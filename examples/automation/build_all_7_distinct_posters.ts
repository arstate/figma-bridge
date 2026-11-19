import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

// =============================================================================
// MASTER BUILDER: 6 VARIED & DISTINCT STYLES (POSTERS 15 TO 20)
// Designed according to Djadi Creative CCO Fadhil & /opus-distills standards:
// - P14: Website Express .com (Gold Benchmark - Unchanged)
// - P15: Feed Instagram 3:4 (Pop Editorial Bento Grid & Dual Phone Showdown)
// - P16: Brand Identity & Vektor HKI (Architectural Blueprint Drafting & Monogram)
// - P17: B2B Pitch Deck & Profile (Swiss Corporate Studio & Executive Dossier)
// - P18: Flagship Retainer HERO (Full-Bleed Deep Navy #012969 Dark Mode)
// - P19: Video Reels & TikTok (Cinematic 9:16 Filmstrip & Retention Curve)
// - P20: React Remotion Video (Pitch Dark Slate #0F172A Cybernetic IDE)
// =============================================================================

async function main() {
  console.log("=== STARTING MASTER RE-ENGINEERING OF POSTERS 15-20 ===");

  // Helper execute wrapper
  async function execFigma(name: string, code: string) {
    console.log(`Executing ${name}...`);
    const res = await callPlugin("execute", { code });
    if (res && res.error) {
      console.error(`Error in ${name}:`, res.error);
      throw new Error(res.error);
    }
    console.log(`${name} SUCCESS.`);
    return res;
  }

  // ===========================================================================
  // 1. POSTER 15: INSTAGRAM FEED 3:4 (POP EDITORIAL BENTO GRID)
  // ===========================================================================
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

    // Floating Progressive Blur Orbs in safe corners
    const orb1 = figma.createEllipse();
    orb1.name = "Floating_Orb_TopRight";
    orb1.resize(130, 130); orb1.x = 940; orb1.y = 120;
    orb1.fills = [{
      type: "GRADIENT_LINEAR",
      gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
      gradientStops: [
        { position: 0, color: { r: 1.0, g: 0.243, b: 0.114, a: 0.7 } },
        { position: 1, color: { r: 0.961, g: 0.620, b: 0.043, a: 0.6 } }
      ]
    }];
    orb1.effects = [{ type: "LAYER_BLUR", radius: 18, visible: true }];
    p.appendChild(orb1);

    const pill1 = figma.createFrame();
    pill1.name = "Floating_Pill_BottomLeft";
    pill1.resize(90, 36); pill1.cornerRadius = 18;
    pill1.x = 20; pill1.y = 860; pill1.rotation = -12;
    pill1.fills = [{
      type: "GRADIENT_LINEAR",
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: { r: 0.004, g: 0.161, b: 0.412, a: 0.7 } },
        { position: 1, color: { r: 0.22, g: 0.74, b: 0.97, a: 0.6 } }
      ]
    }];
    pill1.effects = [{ type: "LAYER_BLUR", radius: 8, visible: true }];
    p.appendChild(pill1);

    // Header Logo clone from benchmark
    const logoSource = await figma.getNodeByIdAsync("850:11581");
    if (logoSource) {
      const l = logoSource.clone();
      l.name = "Official_Logo";
      l.x = 80; l.y = 38;
      p.appendChild(l);
    }

    const catPill = figma.createFrame();
    catPill.resize(270, 36); catPill.x = 730; catPill.y = 50;
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
    heroTitle.fontSize = 40;
    heroTitle.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    heroTitle.textAlignHorizontal = "CENTER";
    heroTitle.x = 80; heroTitle.y = 115;
    heroTitle.resize(920, 105);
    p.appendChild(heroTitle);

    const subBanner = figma.createFrame();
    subBanner.resize(680, 40); subBanner.x = 200; subBanner.y = 230;
    subBanner.cornerRadius = 6;
    subBanner.fills = [{ type: "SOLID", color: { r: 0.702, g: 0, b: 0.106 } }];

    const subTxt = figma.createText();
    subTxt.fontName = { family: "Space Mono", style: "Bold" };
    subTxt.characters = "KUASAI 80% LAYAR HP AUDIENS DENGAN FORMAT FEED 3:4";
    subTxt.fontSize = 12;
    subTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    subTxt.textAlignHorizontal = "CENTER";
    subTxt.x = 0; subTxt.y = 11; subTxt.resize(680, 20);
    subBanner.appendChild(subTxt);
    p.appendChild(subBanner);

    // Comparison Card
    const compShadow = figma.createRectangle();
    compShadow.resize(920, 350); compShadow.x = 88; compShadow.y = 296;
    compShadow.cornerRadius = 14;
    compShadow.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    p.appendChild(compShadow);

    const compCard = figma.createFrame();
    compCard.resize(920, 350); compCard.x = 80; compCard.y = 288;
    compCard.cornerRadius = 14;
    compCard.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    compCard.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    compCard.strokeWeight = 2;

    // Left pane
    const lPane = figma.createFrame();
    lPane.resize(425, 306); lPane.x = 22; lPane.y = 22;
    lPane.cornerRadius = 10;
    lPane.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.95, b: 0.95 } }];
    lPane.strokes = [{ type: "SOLID", color: { r: 0.85, g: 0.3, b: 0.3 } }];

    const lBadge = figma.createFrame();
    lBadge.resize(180, 24); lBadge.x = 16; lBadge.y = 14;
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
        sq.resize(112, 58);
        sq.x = 22 + c * 128; sq.y = 48 + r * 68;
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
    lAlert.x = 22; lAlert.y = 270;
    lPane.appendChild(lAlert);
    compCard.appendChild(lPane);

    // Right pane
    const rPane = figma.createFrame();
    rPane.resize(435, 306); rPane.x = 463; rPane.y = 22;
    rPane.cornerRadius = 10;
    rPane.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];

    const rBadge = figma.createFrame();
    rBadge.resize(230, 24); rBadge.x = 16; rBadge.y = 14;
    rBadge.cornerRadius = 4;
    rBadge.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    const rBadgeTxt = figma.createText();
    rBadgeTxt.fontName = { family: "Space Mono", style: "Bold" };
    rBadgeTxt.characters = "DESAIN MODERN TEGAS 3:4";
    rBadgeTxt.fontSize = 9; rBadgeTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    rBadgeTxt.x = 14; rBadgeTxt.y = 5;
    rBadge.appendChild(rBadgeTxt);
    rPane.appendChild(rBadge);

    const colorsAgency = [
      { r: 0.965, g: 0.957, b: 0.925 }, { r: 0.08, g: 0.25, b: 0.55 }, { r: 1, g: 0.839, b: 0.039 },
      { r: 0.08, g: 0.25, b: 0.55 }, { r: 0.965, g: 0.957, b: 0.925 }, { r: 1, g: 0.243, b: 0.114 }
    ];
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const sq = figma.createRectangle();
        sq.resize(118, 92);
        sq.x = 22 + c * 132; sq.y = 48 + r * 105;
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
    rSuccess.x = 22; rSuccess.y = 270;
    rPane.appendChild(rSuccess);
    compCard.appendChild(rPane);

    p.appendChild(compCard);

    // Section title
    const ribbonSec = figma.createFrame();
    ribbonSec.resize(920, 48); ribbonSec.x = 80; ribbonSec.y = 665;
    ribbonSec.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    ribbonSec.cornerRadius = 6;
    const ribTxt = figma.createText();
    ribTxt.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    ribTxt.characters = "PILIHAN PAKET KONTEN INSTAGRAM 3:4";
    ribTxt.fontSize = 20; ribTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    ribTxt.textAlignHorizontal = "CENTER";
    ribTxt.x = 0; ribTxt.y = 12; ribTxt.resize(920, 26);
    ribbonSec.appendChild(ribTxt);
    p.appendChild(ribbonSec);

    // Bento Asymmetric Layout: Row 1 Hero Card (920 x 180), Row 2 Split Cards (445 x 375 each)
    const r1Sh = figma.createRectangle();
    r1Sh.resize(920, 180); r1Sh.x = 88; r1Sh.y = 735;
    r1Sh.cornerRadius = 12;
    r1Sh.fills = [{ type: "SOLID", color: { r: 0.702, g: 0, b: 0.106 } }];
    p.appendChild(r1Sh);

    const r1Card = figma.createFrame();
    r1Card.resize(920, 180); r1Card.x = 80; r1Card.y = 727;
    r1Card.cornerRadius = 12;
    r1Card.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    r1Card.strokes = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    r1Card.strokeWeight = 2;

    const r1Bdg = figma.createFrame();
    r1Bdg.resize(180, 26); r1Bdg.x = 24; r1Bdg.y = 20; r1Bdg.cornerRadius = 4;
    r1Bdg.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    const r1BdgTxt = figma.createText();
    r1BdgTxt.fontName = { family: "Space Mono", style: "Bold" };
    r1BdgTxt.characters = "TIER HERO · ALL-IN BEST VALUE";
    r1BdgTxt.fontSize = 8.5; r1BdgTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    r1BdgTxt.x = 10; r1BdgTxt.y = 6;
    r1Bdg.appendChild(r1BdgTxt);
    r1Card.appendChild(r1Bdg);

    const r1Tit = figma.createText();
    r1Tit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    r1Tit.characters = "20 Konten Campuran (Feed 3:4 + Reels 9:16)";
    r1Tit.fontSize = 22; r1Tit.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    r1Tit.x = 24; r1Tit.y = 56;
    r1Card.appendChild(r1Tit);

    const r1Price = figma.createText();
    r1Price.fontName = { family: "Space Mono", style: "Bold" };
    r1Price.characters = "Rp 4.000.000 / Bln";
    r1Price.fontSize = 24; r1Price.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    r1Price.x = 640; r1Price.y = 22;
    r1Card.appendChild(r1Price);

    const r1Dp = figma.createFrame();
    r1Dp.resize(170, 24); r1Dp.x = 720; r1Dp.y = 60; r1Dp.cornerRadius = 4;
    r1Dp.fills = [{ type: "SOLID", color: { r: 0.702, g: 0, b: 0.106 } }];
    const r1DpTxt = figma.createText();
    r1DpTxt.fontName = { family: "Space Mono", style: "Bold" };
    r1DpTxt.characters = "KOMITMEN DP RP 2 JT";
    r1DpTxt.fontSize = 9; r1DpTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    r1DpTxt.x = 14; r1DpTxt.y = 5;
    r1Dp.appendChild(r1DpTxt);
    r1Card.appendChild(r1Dp);

    const r1Bullets = [
      "✓ 20 Desain Feed & Reels Campuran", "✓ Copywriting Persuasif & Riset Tren",
      "✓ Full Safe-Zone 1080x1080 Anti Potong", "✓ Terintegrasi Kalender Konten G-Drive"
    ];
    r1Bullets.forEach((b, idx) => {
      const bx = 24 + (idx % 2) * 440;
      const by = 105 + Math.floor(idx / 2) * 32;
      const bt = figma.createText();
      bt.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      bt.characters = b; bt.fontSize = 13;
      bt.fills = [{ type: "SOLID", color: { r: 0.22, g: 0.74, b: 0.97 } }];
      bt.x = bx; bt.y = by;
      r1Card.appendChild(bt);
    });
    p.appendChild(r1Card);

    // Row 2: Split Card A & Split Card B
    const splitData = [
      {
        tier: "TIER 1 · STARTER",
        title: "10 Feed 3:4 Single",
        price: "Rp 1.200.000",
        theme: "WHITE",
        bullets: [
          "✓ 10 Desain Feed Visual Potret 3:4",
          "✓ Desain Modern Tegas Sesuai Brand",
          "✓ Copywriting Caption + 5 Tagar Terpilih",
          "✓ Revisi Minor 2x Sampai Serah Terima"
        ]
      },
      {
        tier: "TIER 2 · CAROUSEL EXPERT",
        title: "5 Seri Carousel Edukasi",
        price: "Rp 1.800.000",
        theme: "GOLD",
        bullets: [
          "✓ 5 Judul Carousel (Total 25-30 Slide)",
          "✓ Struktur Swipe Retention Formula",
          "✓ Anatomi Hook - Friction - Solution",
          "✓ Micro-CTA Penutup Direct WhatsApp"
        ]
      }
    ];

    splitData.forEach((s, idx) => {
      const sx = 80 + idx * 475;
      const sy = 930;

      const sh = figma.createRectangle();
      sh.resize(445, 375); sh.x = sx + 7; sh.y = sy + 7;
      sh.cornerRadius = 12;
      sh.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      p.appendChild(sh);

      const c = figma.createFrame();
      c.resize(445, 375); c.x = sx; c.y = sy;
      c.cornerRadius = 12;
      c.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      c.strokeWeight = 2;
      c.fills = [{ type: "SOLID", color: s.theme === "WHITE" ? { r: 1, g: 1, b: 1 } : { r: 1, g: 0.839, b: 0.039 } }];

      const bdg = figma.createFrame();
      bdg.resize(170, 24); bdg.x = 24; bdg.y = 20; bdg.cornerRadius = 4;
      bdg.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      const bdgTxt = figma.createText();
      bdgTxt.fontName = { family: "Space Mono", style: "Bold" };
      bdgTxt.characters = s.tier;
      bdgTxt.fontSize = 8.5; bdgTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      bdgTxt.x = 10; bdgTxt.y = 5;
      bdg.appendChild(bdgTxt);
      c.appendChild(bdg);

      const tit = figma.createText();
      tit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      tit.characters = s.title;
      tit.fontSize = 22; tit.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      tit.x = 24; tit.y = 58;
      c.appendChild(tit);

      const pr = figma.createText();
      pr.fontName = { family: "Space Mono", style: "Bold" };
      pr.characters = s.price;
      pr.fontSize = 24; pr.fills = [{ type: "SOLID", color: s.theme === "WHITE" ? { r: 0.702, g: 0, b: 0.106 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      pr.x = 24; pr.y = 96;
      c.appendChild(pr);

      const div = figma.createLine();
      div.x = 24; div.y = 138; div.resize(395, 0);
      div.strokes = [{ type: "SOLID", color: { r: 0, g: 0, b: 0, a: 0.15 } }];
      c.appendChild(div);

      s.bullets.forEach((b, bIdx) => {
        const bt = figma.createText();
        bt.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        bt.characters = b; bt.fontSize = 12.5;
        bt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
        bt.x = 24; bt.y = 155 + bIdx * 38;
        bt.resize(395, 34);
        c.appendChild(bt);
      });

      const btn = figma.createFrame();
      btn.resize(395, 42); btn.x = 24; btn.y = 315; btn.cornerRadius = 6;
      btn.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      const btnTxt = figma.createText();
      btnTxt.fontName = { family: "Space Mono", style: "Bold" };
      btnTxt.characters = "AMBIL PAKET INI →";
      btnTxt.fontSize = 11; btnTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      btnTxt.textAlignHorizontal = "CENTER";
      btnTxt.x = 0; btnTxt.y = 13; btnTxt.resize(395, 20);
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
  await execFigma("Poster 15", codeP15);

  // ===========================================================================
  // 2. POSTER 16: BRAND IDENTITY & VEKTOR HKI (ARCHITECTURAL BLUEPRINT)
  // ===========================================================================
  const codeP16 = `
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });

    const p = await figma.getNodeByIdAsync("809:10097");
    if (!p) return { error: "P16 not found" };

    const old = [...p.children];
    for (const c of old) c.remove();

    p.resize(1080, 1440);
    p.fills = [{ type: "SOLID", color: { r: 0.97, g: 0.97, b: 0.96 } }]; // Technical Blueprint Off-White

    // Architectural Blueprint grid & crosshairs
    const grid = figma.createFrame();
    grid.name = "Architectural_Grid";
    grid.resize(1080, 1440); grid.fills = [];
    for (let y = 60; y < 1440; y += 60) {
      const line = figma.createLine();
      line.x = 0; line.y = y; line.resize(1080, 0);
      line.strokes = [{ type: "SOLID", color: { r: 0.88, g: 0.90, b: 0.92, a: 0.6 } }];
      grid.appendChild(line);
    }
    for (let x = 60; x < 1080; x += 60) {
      const line = figma.createLine();
      line.x = x; line.y = 0; line.rotation = 90; line.resize(1440, 0);
      line.strokes = [{ type: "SOLID", color: { r: 0.88, g: 0.90, b: 0.92, a: 0.6 } }];
      grid.appendChild(line);
    }
    p.appendChild(grid);

    // Floating Progressive Blur Elements (Cyan & Deep Blue in background corners)
    const orb1 = figma.createEllipse();
    orb1.name = "Floating_Orb_Technical";
    orb1.resize(140, 140); orb1.x = 930; orb1.y = 110;
    orb1.fills = [{
      type: "GRADIENT_LINEAR",
      gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
      gradientStops: [
        { position: 0, color: { r: 0.08, g: 0.6, b: 0.95, a: 0.6 } },
        { position: 1, color: { r: 0.004, g: 0.161, b: 0.412, a: 0.5 } }
      ]
    }];
    orb1.effects = [{ type: "LAYER_BLUR", radius: 20, visible: true }];
    p.appendChild(orb1);

    // Header Logo clone
    const logoSource = await figma.getNodeByIdAsync("850:11581");
    if (logoSource) {
      const l = logoSource.clone();
      l.name = "Official_Logo";
      l.x = 80; l.y = 38;
      p.appendChild(l);
    }

    const catPill = figma.createFrame();
    catPill.resize(290, 36); catPill.x = 710; catPill.y = 50;
    catPill.cornerRadius = 18;
    catPill.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    catPill.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    catPill.strokeWeight = 1.5;

    const dot = figma.createEllipse();
    dot.resize(10, 10); dot.x = 14; dot.y = 13;
    dot.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.6, b: 0.95 } }];
    catPill.appendChild(dot);

    const catTxt = figma.createText();
    catTxt.fontName = { family: "Space Mono", style: "Bold" };
    catTxt.characters = "BRAND IDENTITY & VEKTOR HKI";
    catTxt.fontSize = 9.5;
    catTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    catTxt.x = 32; catTxt.y = 11;
    catPill.appendChild(catTxt);
    p.appendChild(catPill);

    // Headline
    const heroTitle = figma.createText();
    heroTitle.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    heroTitle.characters = "LOGO ASAL-ASALAN BIKIN BISNIS\\nSUSAH DAFTAR HKI & GAK DIPERCAYA!";
    heroTitle.fontSize = 38;
    heroTitle.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    heroTitle.textAlignHorizontal = "CENTER";
    heroTitle.x = 80; heroTitle.y = 115;
    heroTitle.resize(920, 105);
    p.appendChild(heroTitle);

    const subBanner = figma.createFrame();
    subBanner.resize(680, 40); subBanner.x = 200; subBanner.y = 230;
    subBanner.cornerRadius = 6;
    subBanner.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];

    const subTxt = figma.createText();
    subTxt.fontName = { family: "Space Mono", style: "Bold" };
    subTxt.characters = "STANDAR VEKTOR ARSITEKTURAL · 100% BEBAS PECAH SIAP HKI";
    subTxt.fontSize = 11.5;
    subTxt.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    subTxt.textAlignHorizontal = "CENTER";
    subTxt.x = 0; subTxt.y = 11; subTxt.resize(680, 20);
    subBanner.appendChild(subTxt);
    p.appendChild(subBanner);

    // Hero Visual: The Vector Drafting Board
    const boardSh = figma.createRectangle();
    boardSh.resize(920, 350); boardSh.x = 88; boardSh.y = 296;
    boardSh.cornerRadius = 14;
    boardSh.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    p.appendChild(boardSh);

    const board = figma.createFrame();
    board.resize(920, 350); board.x = 80; board.y = 288;
    board.cornerRadius = 14;
    board.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    board.strokes = [{ type: "SOLID", color: { r: 0.22, g: 0.74, b: 0.97 } }];
    board.strokeWeight = 2;

    // Technical Blueprint grid inside board
    for (let by = 30; by < 350; by += 40) {
      const bl = figma.createLine();
      bl.x = 0; bl.y = by; bl.resize(920, 0);
      bl.strokes = [{ type: "SOLID", color: { r: 0.2, g: 0.4, b: 0.7, a: 0.3 } }];
      board.appendChild(bl);
    }
    for (let bx = 40; bx < 920; bx += 40) {
      const bl = figma.createLine();
      bl.x = bx; bl.y = 0; bl.rotation = 90; bl.resize(350, 0);
      bl.strokes = [{ type: "SOLID", color: { r: 0.2, g: 0.4, b: 0.7, a: 0.3 } }];
      board.appendChild(bl);
    }

    // Monogram 'D' Geometry Symbol
    const circleGuide = figma.createEllipse();
    circleGuide.resize(220, 220); circleGuide.x = 350; circleGuide.y = 65;
    circleGuide.fills = [];
    circleGuide.strokes = [{ type: "SOLID", color: { r: 0.22, g: 0.74, b: 0.97, a: 0.6 } }];
    circleGuide.strokeWeight = 1.5;
    circleGuide.dashPattern = [6, 6];
    board.appendChild(circleGuide);

    // Large Monogram Display Text
    const monoText = figma.createText();
    monoText.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    monoText.characters = "D";
    monoText.fontSize = 170;
    monoText.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    monoText.x = 395; monoText.y = 65;
    board.appendChild(monoText);

    // Anchor Point square nodes on monogram
    const anchorCoords = [
      { x: 395, y: 95 }, { x: 505, y: 95 }, { x: 540, y: 175 }, { x: 505, y: 255 }, { x: 395, y: 255 }
    ];
    anchorCoords.forEach(ac => {
      const sq = figma.createRectangle();
      sq.resize(10, 10); sq.x = ac.x - 5; sq.y = ac.y - 5;
      sq.fills = [{ type: "SOLID", color: { r: 1, g: 0.243, b: 0.114 } }];
      sq.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      sq.strokeWeight = 1.5;
      board.appendChild(sq);
    });

    // Left callout badge
    const lCall = figma.createFrame();
    lCall.resize(280, 80); lCall.x = 30; lCall.y = 70;
    lCall.cornerRadius = 8;
    lCall.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.25, b: 0.55 } }];
    const lCallTit = figma.createText();
    lCallTit.fontName = { family: "Space Mono", style: "Bold" };
    lCallTit.characters = "GEOMETRIC GOLDEN RATIO";
    lCallTit.fontSize = 10; lCallTit.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    lCallTit.x = 16; lCallTit.y = 14;
    lCall.appendChild(lCallTit);
    const lCallDesc = figma.createText();
    lCallDesc.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
    lCallDesc.characters = "Kurva presisi berbasis rasio matematis, mudah diaplikasikan di segala media.";
    lCallDesc.fontSize = 11; lCallDesc.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    lCallDesc.x = 16; lCallDesc.y = 34; lCallDesc.resize(250, 36);
    lCall.appendChild(lCallDesc);
    board.appendChild(lCall);

    // Right callout badge
    const rCall = figma.createFrame();
    rCall.resize(280, 80); rCall.x = 610; rCall.y = 70;
    rCall.cornerRadius = 8;
    rCall.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.25, b: 0.55 } }];
    const rCallTit = figma.createText();
    rCallTit.fontName = { family: "Space Mono", style: "Bold" };
    rCallTit.characters = "LOSSLESS SCALE-UP";
    rCallTit.fontSize = 10; rCallTit.fills = [{ type: "SOLID", color: { r: 0.22, g: 0.74, b: 0.97 } }];
    rCallTit.x = 16; rCallTit.y = 14;
    rCall.appendChild(rCallTit);
    const rCallDesc = figma.createText();
    rCallDesc.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
    rCallDesc.characters = "Dari stiker kemasan 2 cm sampai billboard jalan tol 20 meter, 0% pecah!";
    rCallDesc.fontSize = 11; rCallDesc.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    rCallDesc.x = 16; rCallDesc.y = 34; rCallDesc.resize(250, 36);
    rCall.appendChild(rCallDesc);
    board.appendChild(rCall);

    // Color Swatch Bar at bottom
    const swatchData = [
      { name: "Deep Navy #012969", col: { r: 0.004, g: 0.161, b: 0.412 } },
      { name: "Signal Vermillion #FF3E1D", col: { r: 1, g: 0.243, b: 0.114 } },
      { name: "High Gold #F59E0B", col: { r: 0.961, g: 0.620, b: 0.043 } },
      { name: "Warm Cream #F6DEBB", col: { r: 0.965, g: 0.871, b: 0.733 } },
      { name: "Pitch Dark #0F172A", col: { r: 0.059, g: 0.090, b: 0.165 } }
    ];
    swatchData.forEach((sw, idx) => {
      const swCard = figma.createFrame();
      swCard.resize(165, 36); swCard.x = 30 + idx * 175; swCard.y = 290;
      swCard.cornerRadius = 6;
      swCard.fills = [{ type: "SOLID", color: sw.col }];
      swCard.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1, a: 0.4 } }];
      const swTxt = figma.createText();
      swTxt.fontName = { family: "Space Mono", style: "Bold" };
      swTxt.characters = sw.name; swTxt.fontSize = 7.5;
      swTxt.fills = [{ type: "SOLID", color: idx === 3 ? { r: 0.004, g: 0.161, b: 0.412 } : { r: 1, g: 1, b: 1 } }];
      swTxt.x = 8; swTxt.y = 12;
      swCard.appendChild(swTxt);
      board.appendChild(swCard);
    });

    p.appendChild(board);

    // Section title
    const ribbonSec = figma.createFrame();
    ribbonSec.resize(920, 48); ribbonSec.x = 80; ribbonSec.y = 665;
    ribbonSec.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    ribbonSec.cornerRadius = 6;
    const ribTxt = figma.createText();
    ribTxt.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    ribTxt.characters = "PILIHAN PAKET IDENTITAS BRAND & LOGO VEKTOR";
    ribTxt.fontSize = 20; ribTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    ribTxt.textAlignHorizontal = "CENTER";
    ribTxt.x = 0; ribTxt.y = 12; ribTxt.resize(920, 26);
    ribbonSec.appendChild(ribTxt);
    p.appendChild(ribbonSec);

    // 3 Column Split Cards (290 x 640)
    const tierData16 = [
      {
        tier: "TIER 1 · LOGO VEKTOR",
        title: "Master Logo 3 Konsep",
        price: "Rp 1.500.000",
        theme: "WHITE",
        points: [
          "✓ 3 Konsep Desain Filosofis",
          "✓ Master Vektor SVG, EPS, PDF",
          "✓ Ekspor PNG High-Res Transparan",
          "✓ Hak Cipta 100% Milik Klien",
          "✓ Revisi Minor 3x Sampai Deal"
        ]
      },
      {
        tier: "TIER 2 · BEST SELLER",
        title: "Brand Guideline Book",
        price: "Rp 2.800.000",
        theme: "NAVY",
        points: [
          "✓ Master Logo + Filosofi Resmi",
          "✓ Buku Panduan Visual Brand (GSM)",
          "✓ Aturan Tipografi & Skema Warna",
          "✓ Mockup Kemasan & Kartu Nama",
          "✓ Berkas Siap Pendaftaran HKI"
        ]
      },
      {
        tier: "TIER 3 · ENTERPRISE",
        title: "Full Rebranding Kit",
        price: "Rp 4.500.000",
        theme: "GOLD",
        points: [
          "✓ Logo + Panduan Lengkap",
          "✓ Template Konten Sosmed Resmi",
          "✓ Kop Surat, Invoice & ID Card",
          "✓ Serah Terima Aset & Konsultasi",
          "✓ Prioritas Pengerjaan 7 Hari"
        ]
      }
    ];

    tierData16.forEach((b, idx) => {
      const bx = 80 + idx * 315;
      const by = 730;

      const sh = figma.createRectangle();
      sh.resize(290, 580); sh.x = bx + 7; sh.y = by + 7;
      sh.cornerRadius = 12;
      sh.fills = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 0.702, g: 0, b: 0.106 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      p.appendChild(sh);

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

      const bgBadge = figma.createFrame();
      bgBadge.resize(180, 24); bgBadge.x = 20; bgBadge.y = 20;
      bgBadge.cornerRadius = 4;
      bgBadge.fills = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 0.702, g: 0, b: 0.106 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      const bt = figma.createText();
      bt.fontName = { family: "Space Mono", style: "Bold" };
      bt.characters = b.tier;
      bt.fontSize = 8.5; bt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      bt.x = 10; bt.y = 5;
      bgBadge.appendChild(bt);
      c.appendChild(bgBadge);

      const tit = figma.createText();
      tit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      tit.characters = b.title;
      tit.fontSize = 20; tit.fills = [{ type: "SOLID", color: tColor }];
      tit.x = 20; tit.y = 58; tit.resize(250, 50);
      c.appendChild(tit);

      const pr = figma.createText();
      pr.fontName = { family: "Space Mono", style: "Bold" };
      pr.characters = b.price;
      pr.fontSize = 22; pr.fills = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 1, g: 0.839, b: 0.039 } : tColor }];
      pr.x = 20; pr.y = 118;
      c.appendChild(pr);

      const l = figma.createLine();
      l.x = 20; l.y = 158; l.resize(250, 0);
      l.strokes = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 1, g: 1, b: 1, a: 0.25 } : { r: 0, g: 0, b: 0, a: 0.12 } }];
      c.appendChild(l);

      b.points.forEach((pt, idx2) => {
        const txt = figma.createText();
        txt.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        txt.characters = pt;
        txt.fontSize = 11.5;
        txt.fills = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 0.22, g: 0.74, b: 0.97 } : tColor }];
        txt.x = 20; txt.y = 175 + idx2 * 46;
        txt.resize(250, 40);
        c.appendChild(txt);
      });

      const btn = figma.createFrame();
      btn.resize(250, 42); btn.x = 20; btn.y = 515; btn.cornerRadius = 6;
      btn.fills = [{ type: "SOLID", color: b.theme === "NAVY" ? { r: 1, g: 0.839, b: 0.039 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      const btnTxt = figma.createText();
      btnTxt.fontName = { family: "Space Mono", style: "Bold" };
      btnTxt.characters = "PILIH PAKET INI →";
      btnTxt.fontSize = 11;
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
  await execFigma("Poster 16", codeP16);

  // ===========================================================================
  // 3. POSTER 17: B2B PITCH DECK & COMPANY PROFILE (SWISS CORPORATE STUDIO)
  // ===========================================================================
  const codeP17 = `
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });

    const p = await figma.getNodeByIdAsync("809:10425");
    if (!p) return { error: "P17 not found" };

    const old = [...p.children];
    for (const c of old) c.remove();

    p.resize(1080, 1440);
    p.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }]; // Swiss Gallery Off-White

    // Clean Studio Lighting Vignette
    const orbTop = figma.createEllipse();
    orbTop.name = "Floating_Studio_Glow";
    orbTop.resize(180, 180); orbTop.x = 880; orbTop.y = 80;
    orbTop.fills = [{
      type: "GRADIENT_LINEAR",
      gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
      gradientStops: [
        { position: 0, color: { r: 1, g: 0.839, b: 0.039, a: 0.5 } },
        { position: 1, color: { r: 1, g: 0.243, b: 0.114, a: 0.4 } }
      ]
    }];
    orbTop.effects = [{ type: "LAYER_BLUR", radius: 24, visible: true }];
    p.appendChild(orbTop);

    // Header Logo clone
    const logoSource = await figma.getNodeByIdAsync("850:11581");
    if (logoSource) {
      const l = logoSource.clone();
      l.name = "Official_Logo";
      l.x = 80; l.y = 38;
      p.appendChild(l);
    }

    const catPill = figma.createFrame();
    catPill.resize(300, 36); catPill.x = 700; catPill.y = 50;
    catPill.cornerRadius = 18;
    catPill.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    catPill.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    catPill.strokeWeight = 1.5;

    const dot = figma.createEllipse();
    dot.resize(10, 10); dot.x = 14; dot.y = 13;
    dot.fills = [{ type: "SOLID", color: { r: 0.961, g: 0.620, b: 0.043 } }];
    catPill.appendChild(dot);

    const catTxt = figma.createText();
    catTxt.fontName = { family: "Space Mono", style: "Bold" };
    catTxt.characters = "B2B PITCH DECK & PROFILE";
    catTxt.fontSize = 10;
    catTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    catTxt.x = 32; catTxt.y = 11;
    catPill.appendChild(catTxt);
    p.appendChild(catPill);

    // Headline
    const heroTitle = figma.createText();
    heroTitle.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    heroTitle.characters = "PITCH DECK AMATIR BIKIN INVESTOR &\\nKLIEN KORPORAT ILFEEL DALAM 30 DETIK!";
    heroTitle.fontSize = 38;
    heroTitle.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    heroTitle.textAlignHorizontal = "CENTER";
    heroTitle.x = 80; heroTitle.y = 115;
    heroTitle.resize(920, 105);
    p.appendChild(heroTitle);

    const subBanner = figma.createFrame();
    subBanner.resize(680, 40); subBanner.x = 200; subBanner.y = 230;
    subBanner.cornerRadius = 6;
    subBanner.fills = [{ type: "SOLID", color: { r: 0.961, g: 0.620, b: 0.043 } }];

    const subTxt = figma.createText();
    subTxt.fontName = { family: "Space Mono", style: "Bold" };
    subTxt.characters = "STANDAR TUFTE DATA VISUAL · INVESTOR & TENDER READY";
    subTxt.fontSize = 12;
    subTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    subTxt.textAlignHorizontal = "CENTER";
    subTxt.x = 0; subTxt.y = 11; subTxt.resize(680, 20);
    subBanner.appendChild(subTxt);
    p.appendChild(subBanner);

    // 16:9 Presentation Slide Showcase (920 x 350)
    const slideSh = figma.createRectangle();
    slideSh.resize(920, 350); slideSh.x = 88; slideSh.y = 296;
    slideSh.cornerRadius = 14;
    slideSh.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    p.appendChild(slideSh);

    const slideFrame = figma.createFrame();
    slideFrame.resize(920, 350); slideFrame.x = 80; slideFrame.y = 288;
    slideFrame.cornerRadius = 14;
    slideFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    slideFrame.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    slideFrame.strokeWeight = 2;

    // Slide Top Bar (16:9 Slide Header)
    const slHead = figma.createFrame();
    slHead.resize(920, 44); slHead.x = 0; slHead.y = 0;
    slHead.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    const slTit = figma.createText();
    slTit.fontName = { family: "Space Mono", style: "Bold" };
    slTit.characters = "EXECUTIVE SLIDE DECK · ACQUISITION CHANNELS & ROI";
    slTit.fontSize = 10; slTit.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    slTit.x = 24; slTit.y = 14;
    slHead.appendChild(slTit);
    slideFrame.appendChild(slHead);

    // Inside Slide: Tufte Bar Chart & Metric
    const chartBox = figma.createFrame();
    chartBox.resize(520, 260); chartBox.x = 30; chartBox.y = 65;
    chartBox.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
    chartBox.cornerRadius = 8;
    chartBox.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];

    const cTit = figma.createText();
    cTit.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
    cTit.characters = "Perbandingan Win-Rate Tender Korporat B2B";
    cTit.fontSize = 13; cTit.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    cTit.x = 20; cTit.y = 18;
    chartBox.appendChild(cTit);

    // Bar 1: Djadi Framework (Winner)
    const b1Txt = figma.createText();
    b1Txt.fontName = { family: "Space Mono", style: "Bold" };
    b1Txt.characters = "Djadi Presentation Deck";
    b1Txt.fontSize = 11; b1Txt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    b1Txt.x = 20; b1Txt.y = 55;
    chartBox.appendChild(b1Txt);

    const b1 = figma.createRectangle();
    b1.resize(360, 36); b1.x = 20; b1.y = 75; b1.cornerRadius = 4;
    b1.fills = [{ type: "SOLID", color: { r: 1, g: 0.243, b: 0.114 } }];
    chartBox.appendChild(b1);

    const b1Val = figma.createText();
    b1Val.fontName = { family: "Space Mono", style: "Bold" };
    b1Val.characters = "68% WIN-RATE";
    b1Val.fontSize = 12; b1Val.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    b1Val.x = 390; b1Val.y = 85;
    chartBox.appendChild(b1Val);

    // Bar 2: Pitch Tradisional
    const b2Txt = figma.createText();
    b2Txt.fontName = { family: "Space Mono", style: "Regular" };
    b2Txt.characters = "Slide Teks Monoton Biasa";
    b2Txt.fontSize = 11; b2Txt.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.55 } }];
    b2Txt.x = 20; b2Txt.y = 130;
    chartBox.appendChild(b2Txt);

    const b2 = figma.createRectangle();
    b2.resize(120, 36); b2.x = 20; b2.y = 150; b2.cornerRadius = 4;
    b2.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.82, b: 0.85 } }];
    chartBox.appendChild(b2);

    const b2Val = figma.createText();
    b2Val.fontName = { family: "Space Mono", style: "Bold" };
    b2Val.characters = "22%";
    b2Val.fontSize = 12; b2Val.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.55 } }];
    b2Val.x = 150; b2Val.y = 160;
    chartBox.appendChild(b2Val);

    const cFoot = figma.createText();
    cFoot.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
    cFoot.characters = "Rasio kemenangan tender naik 3.1x lipat dengan narasi berbobot & data visual.";
    cFoot.fontSize = 10.5; cFoot.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    cFoot.x = 20; cFoot.y = 215;
    chartBox.appendChild(cFoot);

    slideFrame.appendChild(chartBox);

    // Right Callout: Investor Dossier Wax Seal Box
    const sealBox = figma.createFrame();
    sealBox.resize(320, 260); sealBox.x = 570; sealBox.y = 65;
    sealBox.cornerRadius = 8;
    sealBox.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];

    const sBdg = figma.createFrame();
    sBdg.resize(190, 24); sBdg.x = 20; sBdg.y = 20; sBdg.cornerRadius = 4;
    sBdg.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    const sBdgTxt = figma.createText();
    sBdgTxt.fontName = { family: "Space Mono", style: "Bold" };
    sBdgTxt.characters = "EXECUTIVE DOSSIER";
    sBdgTxt.fontSize = 9; sBdgTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    sBdgTxt.x = 12; sBdgTxt.y = 5;
    sBdg.appendChild(sBdgTxt);
    sealBox.appendChild(sBdg);

    const sTit = figma.createText();
    sTit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    sTit.characters = "Siap Pitching di Hadapan Direksi & Investor";
    sTit.fontSize = 18; sTit.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    sTit.x = 20; sTit.y = 58; sTit.resize(280, 50);
    sealBox.appendChild(sTit);

    const sBullets = [
      "✓ Alur Storytelling Standar VC Silicon Valley",
      "✓ Format PPTX Editable Bebas Kunci",
      "✓ File Vektor PDF Siap Cetak Eksklusif",
      "✓ Kerahasiaan Data Klien Dijamin NDA"
    ];
    sBullets.forEach((b, idx) => {
      const bt = figma.createText();
      bt.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      bt.characters = b; bt.fontSize = 11;
      bt.fills = [{ type: "SOLID", color: { r: 0.22, g: 0.74, b: 0.97 } }];
      bt.x = 20; bt.y = 120 + idx * 32; bt.resize(280, 28);
      sealBox.appendChild(bt);
    });

    slideFrame.appendChild(sealBox);
    p.appendChild(slideFrame);

    // Section title
    const ribbonSec = figma.createFrame();
    ribbonSec.resize(920, 48); ribbonSec.x = 80; ribbonSec.y = 665;
    ribbonSec.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    ribbonSec.cornerRadius = 6;
    const ribTxt = figma.createText();
    ribTxt.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    ribTxt.characters = "OPSI LAYANAN DOKUMEN PRESENTASI & PROFIL BISNIS";
    ribTxt.fontSize = 20; ribTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    ribTxt.textAlignHorizontal = "CENTER";
    ribTxt.x = 0; ribTxt.y = 12; ribTxt.resize(920, 26);
    ribbonSec.appendChild(ribTxt);
    p.appendChild(ribbonSec);

    // 3 Executive Dossier Rows (920 x 180 each)
    const dossierRows = [
      {
        tier: "TIER 1 · INVESTOR DECK",
        title: "Pitch Deck Pendanaan Startup (12-15 Slide)",
        price: "Rp 2.500.000",
        theme: "WHITE",
        desc: "Struktur Validasi: Problem · Solution · Market Size · Business Model · Traction · Financial Projections."
      },
      {
        tier: "TIER 2 · BEST SELLER",
        title: "Company Profile Korporat & Katalog Tender B2B",
        price: "Rp 3.500.000",
        theme: "NAVY",
        desc: "Desain Modern Tegas · Profil Direksi, Portofolio Proyek, Izin Usaha, & Standar Kredibilitas Pengadaan."
      },
      {
        tier: "TIER 3 · ENTERPRISE SUITE",
        title: "Full B2B Closing Kit: Deck + Proposal SPK + One-Pager",
        price: "Rp 5.000.000",
        theme: "GOLD",
        desc: "Solusi Lengkap Closing Klien Nilai Ratusan Juta · Termasuk Template Negosiasi & Panduan Presentasi Mas Tiar."
      }
    ];

    dossierRows.forEach((r, idx) => {
      const ry = 730 + idx * 195;

      const sh = figma.createRectangle();
      sh.resize(920, 180); sh.x = 88; sh.y = ry + 7; sh.cornerRadius = 12;
      sh.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 0.702, g: 0, b: 0.106 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      p.appendChild(sh);

      const c = figma.createFrame();
      c.resize(920, 180); c.x = 80; c.y = ry; c.cornerRadius = 12;
      c.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      c.strokeWeight = 2;

      let bg, tColor;
      if (r.theme === "WHITE") {
        bg = { r: 1, g: 1, b: 1 };
        tColor = { r: 0.004, g: 0.161, b: 0.412 };
      } else if (r.theme === "NAVY") {
        bg = { r: 0.004, g: 0.161, b: 0.412 };
        tColor = { r: 1, g: 1, b: 1 };
      } else {
        bg = { r: 1, g: 0.839, b: 0.039 };
        tColor = { r: 0.004, g: 0.161, b: 0.412 };
      }
      c.fills = [{ type: "SOLID", color: bg }];

      const bdg = figma.createFrame();
      bdg.resize(190, 24); bdg.x = 24; bdg.y = 18; bdg.cornerRadius = 4;
      bdg.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 1, g: 0.839, b: 0.039 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      const bdgTxt = figma.createText();
      bdgTxt.fontName = { family: "Space Mono", style: "Bold" };
      bdgTxt.characters = r.tier;
      bdgTxt.fontSize = 8.5;
      bdgTxt.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 0.004, g: 0.161, b: 0.412 } : { r: 1, g: 1, b: 1 } }];
      bdgTxt.x = 10; bdgTxt.y = 5;
      bdg.appendChild(bdgTxt);
      c.appendChild(bdg);

      const tit = figma.createText();
      tit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      tit.characters = r.title;
      tit.fontSize = 22; tit.fills = [{ type: "SOLID", color: tColor }];
      tit.x = 24; tit.y = 52;
      c.appendChild(tit);

      const pr = figma.createText();
      pr.fontName = { family: "Space Mono", style: "Bold" };
      pr.characters = r.price;
      pr.fontSize = 24; pr.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 1, g: 0.839, b: 0.039 } : tColor }];
      pr.x = 660; pr.y = 20;
      c.appendChild(pr);

      const desc = figma.createText();
      desc.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      desc.characters = r.desc;
      desc.fontSize = 13;
      desc.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 0.22, g: 0.74, b: 0.97 } : { r: 0.4, g: 0.4, b: 0.45 } }];
      desc.x = 24; desc.y = 90; desc.resize(870, 30);
      c.appendChild(desc);

      const btn = figma.createFrame();
      btn.resize(260, 38); btn.x = 24; btn.y = 126; btn.cornerRadius = 6;
      btn.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 1, g: 0.839, b: 0.039 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      const btnTxt = figma.createText();
      btnTxt.fontName = { family: "Space Mono", style: "Bold" };
      btnTxt.characters = "PESAN DOKUMEN INI →";
      btnTxt.fontSize = 11;
      btnTxt.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 0.004, g: 0.161, b: 0.412 } : { r: 1, g: 1, b: 1 } }];
      btnTxt.textAlignHorizontal = "CENTER";
      btnTxt.x = 0; btnTxt.y = 11; btnTxt.resize(260, 20);
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
  await execFigma("Poster 17", codeP17);

  // ===========================================================================
  // 4. POSTER 18: PAKET HERO RETAINER ALL-IN-ONE (FULL-BLEED DEEP NAVY #012969)
  // ===========================================================================
  const codeP18 = `
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });

    const p = await figma.getNodeByIdAsync("809:10591");
    if (!p) return { error: "P18 not found" };

    const old = [...p.children];
    for (const c of old) c.remove();

    p.resize(1080, 1440);
    p.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }]; // Deep Navy Full-Bleed

    // Background Geometric Radiance & Floating Orbs
    const orbCenter = figma.createEllipse();
    orbCenter.name = "Floating_Hero_Gold_Orb";
    orbCenter.resize(260, 260); orbCenter.x = 800; orbCenter.y = 200;
    orbCenter.fills = [{
      type: "GRADIENT_LINEAR",
      gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
      gradientStops: [
        { position: 0, color: { r: 1, g: 0.839, b: 0.039, a: 0.4 } },
        { position: 1, color: { r: 1, g: 0.243, b: 0.114, a: 0.3 } }
      ]
    }];
    orbCenter.effects = [{ type: "LAYER_BLUR", radius: 30, visible: true }];
    p.appendChild(orbCenter);

    // Header Logo clone with white/gold tint
    const logoSource = await figma.getNodeByIdAsync("850:11581");
    if (logoSource) {
      const l = logoSource.clone();
      l.name = "Official_Logo";
      l.x = 80; l.y = 38;
      // Recolor vectors to white & orange
      const vectors = l.findAll(n => n.type === "VECTOR");
      vectors.forEach(v => {
        v.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      });
      p.appendChild(l);
    }

    const catPill = figma.createFrame();
    catPill.resize(300, 36); catPill.x = 700; catPill.y = 50;
    catPill.cornerRadius = 18;
    catPill.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];

    const dot = figma.createEllipse();
    dot.resize(10, 10); dot.x = 14; dot.y = 13;
    dot.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    catPill.appendChild(dot);

    const catTxt = figma.createText();
    catTxt.fontName = { family: "Space Mono", style: "Bold" };
    catTxt.characters = "FLAGSHIP HERO ALL-IN-ONE";
    catTxt.fontSize = 10;
    catTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    catTxt.x = 32; catTxt.y = 11;
    catPill.appendChild(catTxt);
    p.appendChild(catPill);

    // Headline
    const heroTitle = figma.createText();
    heroTitle.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    heroTitle.characters = "SATU AGENSI, SEMUA BERES JADI CUAN!\\nREVENUE ENGINE LENGKAP TANPA RIBET.";
    heroTitle.fontSize = 38;
    heroTitle.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    heroTitle.textAlignHorizontal = "CENTER";
    heroTitle.x = 80; heroTitle.y = 115;
    heroTitle.resize(920, 105);
    p.appendChild(heroTitle);

    const subBanner = figma.createFrame();
    subBanner.resize(680, 40); subBanner.x = 200; subBanner.y = 230;
    subBanner.cornerRadius = 6;
    subBanner.fills = [{ type: "SOLID", color: { r: 0.702, g: 0, b: 0.106 } }];

    const subTxt = figma.createText();
    subTxt.fontName = { family: "Space Mono", style: "Bold" };
    subTxt.characters = "HEMAT 80% BIAYA DIBANDINGKAN REKRUT TIM IN-HOUSE SENDIRI";
    subTxt.fontSize = 11.5;
    subTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    subTxt.textAlignHorizontal = "CENTER";
    subTxt.x = 0; subTxt.y = 11; subTxt.resize(680, 20);
    subBanner.appendChild(subTxt);
    p.appendChild(subBanner);

    // Giant Golden HERO Card (920 x 440)
    const heroSh = figma.createRectangle();
    heroSh.resize(920, 440); heroSh.x = 88; heroSh.y = 296; heroSh.cornerRadius = 16;
    heroSh.fills = [{ type: "SOLID", color: { r: 0.702, g: 0, b: 0.106 } }];
    p.appendChild(heroSh);

    const heroCard = figma.createFrame();
    heroCard.resize(920, 440); heroCard.x = 80; heroCard.y = 288; heroCard.cornerRadius = 16;
    heroCard.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    heroCard.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    heroCard.strokeWeight = 3;

    // Card Header
    const hcBadge = figma.createFrame();
    hcBadge.resize(220, 26); hcBadge.x = 28; hcBadge.y = 24; hcBadge.cornerRadius = 4;
    hcBadge.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    const hcBadgeTxt = figma.createText();
    hcBadgeTxt.fontName = { family: "Space Mono", style: "Bold" };
    hcBadgeTxt.characters = "PAKET UTAMA DJADI CREATIVE";
    hcBadgeTxt.fontSize = 9; hcBadgeTxt.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    hcBadgeTxt.x = 12; hcBadgeTxt.y = 6;
    hcBadge.appendChild(hcBadgeTxt);
    heroCard.appendChild(hcBadge);

    const hcTit = figma.createText();
    hcTit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    hcTit.characters = "Paket Djadi HERO All-In Retainer";
    hcTit.fontSize = 28; hcTit.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    hcTit.x = 28; hcTit.y = 60;
    heroCard.appendChild(hcTit);

    const hcPrice = figma.createText();
    hcPrice.fontName = { family: "Space Mono", style: "Bold" };
    hcPrice.characters = "Rp 4.000.000 / Bulan";
    hcPrice.fontSize = 30; hcPrice.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    hcPrice.x = 510; hcPrice.y = 24;
    heroCard.appendChild(hcPrice);

    const hcVoucher = figma.createFrame();
    hcVoucher.resize(360, 26); hcVoucher.x = 510; hcVoucher.y = 68; hcVoucher.cornerRadius = 4;
    hcVoucher.fills = [{ type: "SOLID", color: { r: 0.702, g: 0, b: 0.106 } }];
    const hcVTxt = figma.createText();
    hcVTxt.fontName = { family: "Space Mono", style: "Bold" };
    hcVTxt.characters = "KODE: DJADICUAN500 · DP HANYA RP 2 JT";
    hcVTxt.fontSize = 9; hcVTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    hcVTxt.x = 16; hcVTxt.y = 6;
    hcVoucher.appendChild(hcVTxt);
    heroCard.appendChild(hcVoucher);

    // 6 Deliverables 2-Column Grid inside HERO Card
    const d6 = [
      { num: "01", tit: "Official Website .com Custom", sub: "LCP < 1.0 Detik & Sticky WA Checkout" },
      { num: "02", tit: "20 Konten Campuran Bulanan", sub: "Feed 3:4 Authority + Video Reels 9:16" },
      { num: "03", tit: "Managed Meta Ads Advantage+", sub: "Budget Rp 50rb/hari, Target CPR < Rp 4.000" },
      { num: "04", tit: "Google Search Brand Defense", sub: "200+ Negative Keywords, Amankan #1 Ranking" },
      { num: "05", tit: "3x Private Mentoring Mas Tiar", sub: "Sesi 1-on-1 Bedah Funnel & Kualifikasi Leads" },
      { num: "06", tit: "Friday Impact Pulse via WA", sub: "Laporan Transparan Tiap Jumat Sore Pukul 16:00" }
    ];

    d6.forEach((item, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const ix = 28 + col * 440;
      const iy = 115 + row * 98;

      const f = figma.createFrame();
      f.resize(420, 85); f.x = ix; f.y = iy; f.cornerRadius = 8;
      f.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      f.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      f.strokeWeight = 1.5;

      const numBdg = figma.createFrame();
      numBdg.resize(32, 32); numBdg.x = 14; numBdg.y = 14; numBdg.cornerRadius = 16;
      numBdg.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      const nt = figma.createText();
      nt.fontName = { family: "Space Mono", style: "Bold" };
      nt.characters = item.num; nt.fontSize = 12; nt.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
      nt.x = 8; nt.y = 8;
      numBdg.appendChild(nt);
      f.appendChild(numBdg);

      const itit = figma.createText();
      itit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      itit.characters = item.tit; itit.fontSize = 14; itit.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      itit.x = 56; itit.y = 12;
      f.appendChild(itit);

      const isub = figma.createText();
      isub.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      isub.characters = item.sub; isub.fontSize = 11; isub.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.45 } }];
      isub.x = 56; isub.y = 36; isub.resize(350, 40);
      f.appendChild(isub);

      heroCard.appendChild(f);
    });

    p.appendChild(heroCard);

    // Bottom Comparison Matrix: In-House vs Djadi HERO
    const compBoxSh = figma.createRectangle();
    compBoxSh.resize(920, 260); compBoxSh.x = 88; compBoxSh.y = 758; compBoxSh.cornerRadius = 12;
    compBoxSh.fills = [{ type: "SOLID", color: { r: 0.702, g: 0, b: 0.106 } }];
    p.appendChild(compBoxSh);

    const compBox = figma.createFrame();
    compBox.resize(920, 260); compBox.x = 80; compBox.y = 750; compBox.cornerRadius = 12;
    compBox.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    compBox.strokes = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    compBox.strokeWeight = 2;

    const cbHead = figma.createFrame();
    cbHead.resize(920, 40); cbHead.x = 0; cbHead.y = 0;
    cbHead.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.25, b: 0.55 } }];
    const cbTxt = figma.createText();
    cbTxt.fontName = { family: "Space Mono", style: "Bold" };
    cbTxt.characters = "PERBANDINGAN BIAYA & OUTPUT BULANAN";
    cbTxt.fontSize = 11; cbTxt.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    cbTxt.x = 24; cbTxt.y = 12;
    cbHead.appendChild(cbTxt);
    compBox.appendChild(cbHead);

    // Row A: In-House
    const rATit = figma.createText();
    rATit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    rATit.characters = "Rekrut Tim In-House (Desainer + Copywriter + Web Dev + Media Buyer):";
    rATit.fontSize = 13; rATit.fills = [{ type: "SOLID", color: { r: 0.702, g: 0, b: 0.106 } }];
    rATit.x = 24; rATit.y = 56;
    compBox.appendChild(rATit);

    const rADesc = figma.createText();
    rADesc.fontName = { family: "Space Mono", style: "Bold" };
    rADesc.characters = "Total Biaya: Rp 16.000.000 - Rp 25.000.000 / Bulan (Belum Termasuk BPJS & Resiko Resign)";
    rADesc.fontSize = 12; rADesc.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.45 } }];
    rADesc.x = 24; rADesc.y = 80;
    compBox.appendChild(rADesc);

    const divL = figma.createLine();
    divL.x = 24; divL.y = 118; divL.resize(870, 0);
    divL.strokes = [{ type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.85 } }];
    compBox.appendChild(divL);

    // Row B: Djadi HERO
    const rBTit = figma.createText();
    rBTit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    rBTit.characters = "Paket Djadi HERO Retainer (Satu Invoice All-In):";
    rBTit.fontSize = 14; rBTit.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    rBTit.x = 24; rBTit.y = 136;
    compBox.appendChild(rBTit);

    const rBDesc = figma.createText();
    rBDesc.fontName = { family: "Space Mono", style: "Bold" };
    rBDesc.characters = "Hanya Rp 4.000.000 / Bulan · Langsung Di-handle 4 Specialist Agensi Senior!";
    rBDesc.fontSize = 14; rBDesc.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.6, b: 0.3 } }];
    rBDesc.x = 24; rBDesc.y = 162;
    compBox.appendChild(rBDesc);

    const ctaFull = figma.createFrame();
    ctaFull.resize(870, 44); ctaFull.x = 24; ctaFull.y = 196; ctaFull.cornerRadius = 6;
    ctaFull.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    const ctaFTxt = figma.createText();
    ctaFTxt.fontName = { family: "Space Mono", style: "Bold" };
    ctaFTxt.characters = "KUNCI KUOTA RETAINER SEKARANG (TERBATAS 4-5 KLIEN AKTIF) →";
    ctaFTxt.fontSize = 11.5; ctaFTxt.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    ctaFTxt.textAlignHorizontal = "CENTER";
    ctaFTxt.x = 0; ctaFTxt.y = 14; ctaFTxt.resize(870, 20);
    ctaFull.appendChild(ctaFTxt);
    compBox.appendChild(ctaFull);

    p.appendChild(compBox);

    // Footer
    const footer = figma.createFrame();
    footer.resize(920, 68); footer.x = 80; footer.y = 1334; footer.fills = [];

    const fTag = figma.createText();
    fTag.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
    fTag.characters = "Urusan Iklan & Konten, Semua Beres di Djadi!";
    fTag.fontSize = 16;
    fTag.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    fTag.x = 0; fTag.y = 10;
    footer.appendChild(fTag);

    const fSub = figma.createText();
    fSub.fontName = { family: "Space Mono", style: "Regular" };
    fSub.characters = "OFFICIAL DJADI CREATIVE · SURABAYA - SIDOARJO";
    fSub.fontSize = 10;
    fSub.fills = [{ type: "SOLID", color: { r: 0.6, g: 0.7, b: 0.85 } }];
    fSub.x = 0; fSub.y = 36;
    footer.appendChild(fSub);

    const waBox = figma.createFrame();
    waBox.resize(250, 48); waBox.x = 670; waBox.y = 8;
    waBox.cornerRadius = 6;
    waBox.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];

    const waCircle = figma.createEllipse();
    waCircle.resize(22, 22); waCircle.x = 12; waCircle.y = 13;
    waCircle.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    waBox.appendChild(waCircle);

    const waKicker = figma.createText();
    waKicker.fontName = { family: "Space Mono", style: "Bold" };
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
  await execFigma("Poster 18", codeP18);

  // ===========================================================================
  // 5. POSTER 19: VIDEO REELS & TIKTOK KINETIK (CINEMATIC 9:16 FILMSTRIP)
  // ===========================================================================
  const codeP19 = `
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });

    const p = await figma.getNodeByIdAsync("809:10758");
    if (!p) return { error: "P19 not found" };

    const old = [...p.children];
    for (const c of old) c.remove();

    p.resize(1080, 1440);
    p.fills = [{ type: "SOLID", color: { r: 0.965, g: 0.957, b: 0.925 } }]; // Warm Cream

    // Filmstrip Sprocket Perforations along left & right borders
    const filmstripL = figma.createFrame();
    filmstripL.resize(40, 1440); filmstripL.x = 0; filmstripL.y = 0;
    filmstripL.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    for (let sy = 30; sy < 1440; sy += 70) {
      const sp = figma.createRectangle();
      sp.resize(20, 35); sp.x = 10; sp.y = sy; sp.cornerRadius = 4;
      sp.fills = [{ type: "SOLID", color: { r: 0.965, g: 0.957, b: 0.925 } }];
      filmstripL.appendChild(sp);
    }
    p.appendChild(filmstripL);

    const filmstripR = figma.createFrame();
    filmstripR.resize(40, 1440); filmstripR.x = 1040; filmstripR.y = 0;
    filmstripR.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    for (let sy = 30; sy < 1440; sy += 70) {
      const sp = figma.createRectangle();
      sp.resize(20, 35); sp.x = 10; sp.y = sy; sp.cornerRadius = 4;
      sp.fills = [{ type: "SOLID", color: { r: 0.965, g: 0.957, b: 0.925 } }];
      filmstripR.appendChild(sp);
    }
    p.appendChild(filmstripR);

    // Floating Progressive Blur Orbs in safe corners
    const orbVideo = figma.createEllipse();
    orbVideo.name = "Floating_Orb_Reels";
    orbVideo.resize(140, 140); orbVideo.x = 900; orbVideo.y = 100;
    orbVideo.fills = [{
      type: "GRADIENT_LINEAR",
      gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
      gradientStops: [
        { position: 0, color: { r: 1.0, g: 0.243, b: 0.114, a: 0.6 } },
        { position: 1, color: { r: 0.961, g: 0.620, b: 0.043, a: 0.5 } }
      ]
    }];
    orbVideo.effects = [{ type: "LAYER_BLUR", radius: 20, visible: true }];
    p.appendChild(orbVideo);

    // Header Logo clone
    const logoSource = await figma.getNodeByIdAsync("850:11581");
    if (logoSource) {
      const l = logoSource.clone();
      l.name = "Official_Logo";
      l.x = 80; l.y = 38;
      p.appendChild(l);
    }

    const catPill = figma.createFrame();
    catPill.resize(290, 36); catPill.x = 710; catPill.y = 50;
    catPill.cornerRadius = 18;
    catPill.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    catPill.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    catPill.strokeWeight = 1.5;

    const dot = figma.createEllipse();
    dot.resize(10, 10); dot.x = 14; dot.y = 13;
    dot.fills = [{ type: "SOLID", color: { r: 1, g: 0.243, b: 0.114 } }];
    catPill.appendChild(dot);

    const catTxt = figma.createText();
    catTxt.fontName = { family: "Space Mono", style: "Bold" };
    catTxt.characters = "KINETIC REELS & TIKTOK";
    catTxt.fontSize = 10;
    catTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    catTxt.x = 32; catTxt.y = 11;
    catPill.appendChild(catTxt);
    p.appendChild(catPill);

    // Headline
    const heroTitle = figma.createText();
    heroTitle.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    heroTitle.characters = "STOP BIKIN VIDEO DITONTON 3 DETIK\\nLALU DI-SKIP TANPA MENGHASILKAN CLOSING!";
    heroTitle.fontSize = 38;
    heroTitle.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    heroTitle.textAlignHorizontal = "CENTER";
    heroTitle.x = 80; heroTitle.y = 115;
    heroTitle.resize(920, 105);
    p.appendChild(heroTitle);

    const subBanner = figma.createFrame();
    subBanner.resize(680, 40); subBanner.x = 200; subBanner.y = 230;
    subBanner.cornerRadius = 6;
    subBanner.fills = [{ type: "SOLID", color: { r: 0.702, g: 0, b: 0.106 } }];

    const subTxt = figma.createText();
    subTxt.fontName = { family: "Space Mono", style: "Bold" };
    subTxt.characters = "FORMULA HOOK KINETIK · KURVA RETENSI 85% DI 15 DETIK PERTAMA";
    subTxt.fontSize = 11.5;
    subTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    subTxt.textAlignHorizontal = "CENTER";
    subTxt.x = 0; subTxt.y = 11; subTxt.resize(680, 20);
    subBanner.appendChild(subTxt);
    p.appendChild(subBanner);

    // 9:16 Video Stage Showcase (920 x 350)
    const stageSh = figma.createRectangle();
    stageSh.resize(920, 350); stageSh.x = 88; stageSh.y = 296; stageSh.cornerRadius = 14;
    stageSh.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    p.appendChild(stageSh);

    const stage = figma.createFrame();
    stage.resize(920, 350); stage.x = 80; stage.y = 288; stage.cornerRadius = 14;
    stage.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    stage.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    stage.strokeWeight = 2;

    // Left: 9:16 Phone Mockup inside stage
    const phone = figma.createFrame();
    phone.resize(190, 306); phone.x = 30; phone.y = 22; phone.cornerRadius = 16;
    phone.fills = [{ type: "SOLID", color: { r: 0.059, g: 0.090, b: 0.165 } }];
    phone.strokes = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
    phone.strokeWeight = 3;

    const recBdg = figma.createFrame();
    recBdg.resize(90, 20); recBdg.x = 12; recBdg.y = 12; recBdg.cornerRadius = 4;
    recBdg.fills = [{ type: "SOLID", color: { r: 0.702, g: 0, b: 0.106 } }];
    const rbt = figma.createText();
    rbt.fontName = { family: "Space Mono", style: "Bold" };
    rbt.characters = "● REC 00:15"; rbt.fontSize = 8; rbt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    rbt.x = 8; rbt.y = 4;
    recBdg.appendChild(rbt);
    phone.appendChild(recBdg);

    const phoneHook = figma.createText();
    phoneHook.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    phoneHook.characters = "\\"3 Kesalahan Fatal Iklan Boncos!\\"";
    phoneHook.fontSize = 14; phoneHook.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    phoneHook.x = 14; phoneHook.y = 70; phoneHook.resize(162, 50);
    phone.appendChild(phoneHook);

    const phoneWave = figma.createFrame();
    phoneWave.resize(162, 28); phoneWave.x = 14; phoneWave.y = 250; phoneWave.fills = [];
    for (let w = 0; w < 162; w += 8) {
      const wh = 8 + Math.abs(Math.sin(w)) * 18;
      const bar = figma.createRectangle();
      bar.resize(4, wh); bar.x = w; bar.y = (28 - wh) / 2; bar.cornerRadius = 2;
      bar.fills = [{ type: "SOLID", color: { r: 0.22, g: 0.74, b: 0.97 } }];
      phoneWave.appendChild(bar);
    }
    phone.appendChild(phoneWave);
    stage.appendChild(phone);

    // Right: Algorithm Retention Architecture
    const retBox = figma.createFrame();
    retBox.resize(650, 306); retBox.x = 240; retBox.y = 22; retBox.cornerRadius = 10;
    retBox.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];

    const rHead = figma.createText();
    rHead.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    rHead.characters = "Anatomi Video Penembus Algoritma TikTok & Reels";
    rHead.fontSize = 18; rHead.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    rHead.x = 24; rHead.y = 20;
    retBox.appendChild(rHead);

    const vSteps = [
      { sec: "DETIK 00 - 03", name: "Kinetic Visual Hook (Anti-Skip)", desc: "Pola visual mengejutkan + teks kontras tinggi penahan jempol audiens." },
      { sec: "DETIK 04 - 18", name: "Friction & Value Bridge", desc: "Bahasa empati manusia asli tanpa jualan murahan, menaikkan durasi tonton." },
      { sec: "DETIK 19 - 30", name: "Micro-CTA Frictionless Direct WA", desc: "Mengajak audiens klik link WhatsApp tanpa resistensi atau penolakan." }
    ];

    vSteps.forEach((st, idx) => {
      const sy = 65 + idx * 75;

      const sTag = figma.createFrame();
      sTag.resize(130, 22); sTag.x = 24; sTag.y = sy; sTag.cornerRadius = 4;
      sTag.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
      const stt = figma.createText();
      stt.fontName = { family: "Space Mono", style: "Bold" };
      stt.characters = st.sec; stt.fontSize = 8.5; stt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      stt.x = 10; stt.y = 4;
      sTag.appendChild(stt);
      retBox.appendChild(sTag);

      const stName = figma.createText();
      stName.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      stName.characters = st.name; stName.fontSize = 14; stName.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      stName.x = 165; stName.y = sy + 2;
      retBox.appendChild(stName);

      const stDesc = figma.createText();
      stDesc.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      stDesc.characters = st.desc; stDesc.fontSize = 11; stDesc.fills = [{ type: "SOLID", color: { r: 0.22, g: 0.74, b: 0.97 } }];
      stDesc.x = 24; stDesc.y = sy + 28; stDesc.resize(600, 32);
      retBox.appendChild(stDesc);
    });

    stage.appendChild(retBox);
    p.appendChild(stage);

    // Section title
    const ribbonSec = figma.createFrame();
    ribbonSec.resize(920, 48); ribbonSec.x = 80; ribbonSec.y = 665;
    ribbonSec.fills = [{ type: "SOLID", color: { r: 1, g: 0.839, b: 0.039 } }];
    ribbonSec.cornerRadius = 6;
    const ribTxt = figma.createText();
    ribTxt.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    ribTxt.characters = "PILIHAN PAKET PRODUKSI VIDEO KINETIK FYP";
    ribTxt.fontSize = 20; ribTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
    ribTxt.textAlignHorizontal = "CENTER";
    ribTxt.x = 0; ribTxt.y = 12; ribTxt.resize(920, 26);
    ribbonSec.appendChild(ribTxt);
    p.appendChild(ribbonSec);

    // 3 Video Package Cards (920 x 180 each)
    const vTiers = [
      {
        tier: "TIER 1 · STARTER REELS",
        title: "Paket 5 Video Reels Kinetik 9:16",
        price: "Rp 1.500.000",
        theme: "WHITE",
        desc: "Riset Naskah Hook FYP · Editing Fast-Cuts Dinamis · Dynamic Captions Subtitle Kuning Kontras Tinggi."
      },
      {
        tier: "TIER 2 · BEST SELLER",
        title: "Paket 10 Video Reels Campuran B-Roll",
        price: "Rp 2.800.000",
        theme: "NAVY",
        desc: "Riset Audio Trending Algoritma · Voiceover AI Natural EBU R128 · Color Grading Sinematik Sesuai Brand."
      },
      {
        tier: "TIER 3 · HERO RETAINER",
        title: "Paket 20 Konten Campuran (Feed + Reels)",
        price: "Rp 4.000.000 / Bln",
        theme: "GOLD",
        desc: "Solusi Paling Hemat & Lengkap · Bebas Capek Mikir Ide Konten Sendirian · Bonus Website .com & Mentoring."
      }
    ];

    vTiers.forEach((r, idx) => {
      const ry = 730 + idx * 195;

      const sh = figma.createRectangle();
      sh.resize(920, 180); sh.x = 88; sh.y = ry + 7; sh.cornerRadius = 12;
      sh.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 0.702, g: 0, b: 0.106 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      p.appendChild(sh);

      const c = figma.createFrame();
      c.resize(920, 180); c.x = 80; c.y = ry; c.cornerRadius = 12;
      c.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }];
      c.strokeWeight = 2;

      let bg, tColor;
      if (r.theme === "WHITE") {
        bg = { r: 1, g: 1, b: 1 };
        tColor = { r: 0.004, g: 0.161, b: 0.412 };
      } else if (r.theme === "NAVY") {
        bg = { r: 0.004, g: 0.161, b: 0.412 };
        tColor = { r: 1, g: 1, b: 1 };
      } else {
        bg = { r: 1, g: 0.839, b: 0.039 };
        tColor = { r: 0.004, g: 0.161, b: 0.412 };
      }
      c.fills = [{ type: "SOLID", color: bg }];

      const bdg = figma.createFrame();
      bdg.resize(190, 24); bdg.x = 24; bdg.y = 18; bdg.cornerRadius = 4;
      bdg.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 1, g: 0.839, b: 0.039 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      const bdgTxt = figma.createText();
      bdgTxt.fontName = { family: "Space Mono", style: "Bold" };
      bdgTxt.characters = r.tier;
      bdgTxt.fontSize = 8.5;
      bdgTxt.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 0.004, g: 0.161, b: 0.412 } : { r: 1, g: 1, b: 1 } }];
      bdgTxt.x = 10; bdgTxt.y = 5;
      bdg.appendChild(bdgTxt);
      c.appendChild(bdg);

      const tit = figma.createText();
      tit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      tit.characters = r.title;
      tit.fontSize = 22; tit.fills = [{ type: "SOLID", color: tColor }];
      tit.x = 24; tit.y = 52;
      c.appendChild(tit);

      const pr = figma.createText();
      pr.fontName = { family: "Space Mono", style: "Bold" };
      pr.characters = r.price;
      pr.fontSize = 24; pr.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 1, g: 0.839, b: 0.039 } : tColor }];
      pr.x = 640; pr.y = 20;
      c.appendChild(pr);

      const desc = figma.createText();
      desc.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      desc.characters = r.desc;
      desc.fontSize = 13;
      desc.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 0.22, g: 0.74, b: 0.97 } : { r: 0.4, g: 0.4, b: 0.45 } }];
      desc.x = 24; desc.y = 90; desc.resize(870, 30);
      c.appendChild(desc);

      const btn = figma.createFrame();
      btn.resize(260, 38); btn.x = 24; btn.y = 126; btn.cornerRadius = 6;
      btn.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 1, g: 0.839, b: 0.039 } : { r: 0.004, g: 0.161, b: 0.412 } }];
      const btnTxt = figma.createText();
      btnTxt.fontName = { family: "Space Mono", style: "Bold" };
      btnTxt.characters = "PRODUKSI SEKARANG →";
      btnTxt.fontSize = 11;
      btnTxt.fills = [{ type: "SOLID", color: r.theme === "NAVY" ? { r: 0.004, g: 0.161, b: 0.412 } : { r: 1, g: 1, b: 1 } }];
      btnTxt.textAlignHorizontal = "CENTER";
      btnTxt.x = 0; btnTxt.y = 11; btnTxt.resize(260, 20);
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
  await execFigma("Poster 19", codeP19);

  // ===========================================================================
  // 6. POSTER 20: PROGRAMMATIC VIDEO REMOTION (PITCH DARK SLATE #0F172A)
  // ===========================================================================
  const codeP20 = `
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });

    const p = await figma.getNodeByIdAsync("809:10921");
    if (!p) return { error: "P20 not found" };

    const old = [...p.children];
    for (const c of old) c.remove();

    p.resize(1080, 1440);
    p.fills = [{ type: "SOLID", color: { r: 0.059, g: 0.090, b: 0.165 } }]; // Pitch Dark Slate #0F172A

    // Cybernetic Neon Glow in background
    const neonGlow = figma.createEllipse();
    neonGlow.name = "Floating_Neon_Glow";
    neonGlow.resize(280, 280); neonGlow.x = 760; neonGlow.y = 160;
    neonGlow.fills = [{
      type: "GRADIENT_LINEAR",
      gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
      gradientStops: [
        { position: 0, color: { r: 0.0, g: 0.8, b: 0.6, a: 0.35 } },
        { position: 1, color: { r: 0.08, g: 0.6, b: 0.95, a: 0.25 } }
      ]
    }];
    neonGlow.effects = [{ type: "LAYER_BLUR", radius: 36, visible: true }];
    p.appendChild(neonGlow);

    // Header Logo clone with white vectors
    const logoSource = await figma.getNodeByIdAsync("850:11581");
    if (logoSource) {
      const l = logoSource.clone();
      l.name = "Official_Logo";
      l.x = 80; l.y = 38;
      const vectors = l.findAll(n => n.type === "VECTOR");
      vectors.forEach(v => {
        v.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      });
      p.appendChild(l);
    }

    const catPill = figma.createFrame();
    catPill.resize(320, 36); catPill.x = 680; catPill.y = 50;
    catPill.cornerRadius = 18;
    catPill.fills = [{ type: "SOLID", color: { r: 0.118, g: 0.161, b: 0.235 } }];
    catPill.strokes = [{ type: "SOLID", color: { r: 0.0, g: 0.8, b: 0.6 } }];
    catPill.strokeWeight = 1.5;

    const dot = figma.createEllipse();
    dot.resize(10, 10); dot.x = 14; dot.y = 13;
    dot.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.8, b: 0.6 } }];
    catPill.appendChild(dot);

    const catTxt = figma.createText();
    catTxt.fontName = { family: "Space Mono", style: "Bold" };
    catTxt.characters = "REMOTION REACT VIDEO ENGINE";
    catTxt.fontSize = 10;
    catTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    catTxt.x = 32; catTxt.y = 11;
    catPill.appendChild(catTxt);
    p.appendChild(catPill);

    // Headline
    const heroTitle = figma.createText();
    heroTitle.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    heroTitle.characters = "REKAYASA VIDEO PEMASARAN DENGAN\\nKODE REACT: ZERO LAG, RENDERING 60 FPS!";
    heroTitle.fontSize = 38;
    heroTitle.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    heroTitle.textAlignHorizontal = "CENTER";
    heroTitle.x = 80; heroTitle.y = 115;
    heroTitle.resize(920, 105);
    p.appendChild(heroTitle);

    const subBanner = figma.createFrame();
    subBanner.resize(680, 40); subBanner.x = 200; subBanner.y = 230;
    subBanner.cornerRadius = 6;
    subBanner.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.5, b: 0.4 } }];

    const subTxt = figma.createText();
    subTxt.fontName = { family: "Space Mono", style: "Bold" };
    subTxt.characters = "DETERMINISTIC MOTION GRAPHICS · HEADLESS CLI AUTOMATION";
    subTxt.fontSize = 11.5;
    subTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    subTxt.textAlignHorizontal = "CENTER";
    subTxt.x = 0; subTxt.y = 11; subTxt.resize(680, 20);
    subBanner.appendChild(subTxt);
    p.appendChild(subBanner);

    // macOS IDE Code Editor Window (920 x 350)
    const ideSh = figma.createRectangle();
    ideSh.resize(920, 350); ideSh.x = 88; ideSh.y = 296; ideSh.cornerRadius = 14;
    ideSh.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.5, b: 0.4 } }];
    p.appendChild(ideSh);

    const ide = figma.createFrame();
    ide.resize(920, 350); ide.x = 80; ide.y = 288; ide.cornerRadius = 14;
    ide.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.027, b: 0.071 } }]; // Pitch Black Terminal
    ide.strokes = [{ type: "SOLID", color: { r: 0.0, g: 0.8, b: 0.6 } }];
    ide.strokeWeight = 2;

    // Window Header Bar
    const ideHead = figma.createFrame();
    ideHead.resize(920, 42); ideHead.x = 0; ideHead.y = 0;
    ideHead.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.12, b: 0.2 } }];

    const dotsData = [
      { col: { r: 1, g: 0.35, b: 0.35 } },
      { col: { r: 1, g: 0.8, b: 0.2 } },
      { col: { r: 0.2, g: 0.8, b: 0.4 } }
    ];
    dotsData.forEach((d, idx) => {
      const dt = figma.createEllipse();
      dt.resize(12, 12); dt.x = 20 + idx * 20; dt.y = 15;
      dt.fills = [{ type: "SOLID", color: d.col }];
      ideHead.appendChild(dt);
    });

    const fileTab = figma.createText();
    fileTab.fontName = { family: "Space Mono", style: "Bold" };
    fileTab.characters = "RemotionCampaignVideo.tsx · React 19 Engine";
    fileTab.fontSize = 11; fileTab.fills = [{ type: "SOLID", color: { r: 0.22, g: 0.74, b: 0.97 } }];
    fileTab.x = 95; fileTab.y = 14;
    ideHead.appendChild(fileTab);
    ide.appendChild(ideHead);

    // Syntax-Highlighted React Code Box
    const codeBox = figma.createFrame();
    codeBox.resize(560, 280); codeBox.x = 24; codeBox.y = 54;
    codeBox.fills = [];

    const lines = [
      { text: "import { useCurrentFrame, spring } from 'remotion';", col: { r: 0.8, g: 0.6, b: 1 } },
      { text: "export const VideoAd = ({ title, ctaPrice }) => {", col: { r: 0.4, g: 0.8, b: 1 } },
      { text: "  const frame = useCurrentFrame();", col: { r: 0.9, g: 0.9, b: 0.95 } },
      { text: "  const pop = spring({ frame, fps: 30, config: { damping: 12 } });", col: { r: 1, g: 0.8, b: 0.2 } },
      { text: "  return (", col: { r: 0.4, g: 0.8, b: 1 } },
      { text: "    <AbsoluteFill style={{ transform: 'scale(pop)' }}>", col: { r: 0.2, g: 0.9, b: 0.6 } },
      { text: "      <Headline text={title} safeZone='1080x1080' />", col: { r: 1, g: 0.5, b: 0.4 } },
      { text: "      <ConversionDock price={ctaPrice} wa='0851-9659-8881' />", col: { r: 0.2, g: 0.9, b: 0.6 } },
      { text: "    </AbsoluteFill>", col: { r: 0.2, g: 0.9, b: 0.6 } },
      { text: "  );", col: { r: 0.4, g: 0.8, b: 1 } },
      { text: "};", col: { r: 0.4, g: 0.8, b: 1 } }
    ];

    lines.forEach((l, idx) => {
      const ln = figma.createText();
      ln.fontName = { family: "Space Mono", style: "Regular" };
      ln.characters = l.text;
      ln.fontSize = 11.5; ln.fills = [{ type: "SOLID", color: l.col }];
      ln.x = 0; ln.y = idx * 24;
      codeBox.appendChild(ln);
    });
    ide.appendChild(codeBox);

    // Right Badge Card: Performance Telemetry
    const telem = figma.createFrame();
    telem.resize(290, 275); telem.x = 605; telem.y = 54; telem.cornerRadius = 8;
    telem.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.12, b: 0.2 } }];
    telem.strokes = [{ type: "SOLID", color: { r: 0.0, g: 0.8, b: 0.6 } }];

    const tTit = figma.createText();
    tTit.fontName = { family: "Space Mono", style: "Bold" };
    tTit.characters = "PERFORMANCE SPECS";
    tTit.fontSize = 10; tTit.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.8, b: 0.6 } }];
    tTit.x = 18; tTit.y = 16;
    telem.appendChild(tTit);

    const metrics = [
      { val: "60 FPS NATIVE", desc: "Animasi fisika spring tanpa stutter" },
      { val: "100+ VARIAN / JAM", desc: "Headless CLI batch video rendering" },
      { val: "DYNAMIC CBO ADS", desc: "A/B Testing iklan Meta otomatis" }
    ];
    metrics.forEach((m, idx) => {
      const my = 45 + idx * 72;
      const mv = figma.createText();
      mv.fontName = { family: "Space Mono", style: "Bold" };
      mv.characters = m.val; mv.fontSize = 13; mv.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      mv.x = 18; mv.y = my;
      telem.appendChild(mv);

      const md = figma.createText();
      md.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      md.characters = m.desc; md.fontSize = 11; md.fills = [{ type: "SOLID", color: { r: 0.22, g: 0.74, b: 0.97 } }];
      md.x = 18; md.y = my + 20; md.resize(250, 28);
      telem.appendChild(md);
    });

    ide.appendChild(telem);
    p.appendChild(ide);

    // Section title
    const ribbonSec = figma.createFrame();
    ribbonSec.resize(920, 48); ribbonSec.x = 80; ribbonSec.y = 665;
    ribbonSec.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.8, b: 0.6 } }];
    ribbonSec.cornerRadius = 6;
    const ribTxt = figma.createText();
    ribTxt.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    ribTxt.characters = "OPSI PAKET OTOMASI VIDEO PROGRAMMATIK REACT";
    ribTxt.fontSize = 20; ribTxt.fills = [{ type: "SOLID", color: { r: 0.059, g: 0.090, b: 0.165 } }];
    ribTxt.textAlignHorizontal = "CENTER";
    ribTxt.x = 0; ribTxt.y = 12; ribTxt.resize(920, 26);
    ribbonSec.appendChild(ribTxt);
    p.appendChild(ribbonSec);

    // 3 Cybernetic Cards (920 x 180 each)
    const pTiers = [
      {
        tier: "TIER 1 · COMPONENT MOTION",
        title: "Template Video React Kinetik Custom",
        price: "Rp 2.500.000",
        theme: "DARK",
        desc: "Pembuatan Komponen Video Berbasis React + Setup Spring Physics Halus + Kontrol Parameter Teks & Warna."
      },
      {
        tier: "TIER 2 · BEST SELLER",
        title: "Batch Video Automation Engine (50+ Varian)",
        price: "Rp 4.500.000",
        theme: "EMERALD",
        desc: "Otomasi Data-Driven Video dari Spreadsheet / JSON API · Sangat Cocok untuk Katalog E-Commerce & Flash Sale."
      },
      {
        tier: "TIER 3 · HERO ALL-IN",
        title: "Paket Retainer HERO (Video + Web + Meta Ads)",
        price: "Rp 4.000.000 / Bln",
        theme: "GOLD",
        desc: "20 Konten Campuran + Website Kilat + Advantage+ CBO + Mentoring Mas Tiar · Solusi Omzet Paling Direkomendasikan."
      }
    ];

    pTiers.forEach((r, idx) => {
      const ry = 730 + idx * 195;

      const sh = figma.createRectangle();
      sh.resize(920, 180); sh.x = 88; sh.y = ry + 7; sh.cornerRadius = 12;
      sh.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.8, b: 0.6 } }];
      p.appendChild(sh);

      const c = figma.createFrame();
      c.resize(920, 180); c.x = 80; c.y = ry; c.cornerRadius = 12;
      c.strokes = [{ type: "SOLID", color: { r: 0.0, g: 0.8, b: 0.6 } }];
      c.strokeWeight = 1.5;

      let bg, tColor;
      if (r.theme === "DARK") {
        bg = { r: 0.118, g: 0.161, b: 0.235 };
        tColor = { r: 1, g: 1, b: 1 };
      } else if (r.theme === "EMERALD") {
        bg = { r: 0.04, g: 0.25, b: 0.2 };
        tColor = { r: 1, g: 1, b: 1 };
      } else {
        bg = { r: 1, g: 0.839, b: 0.039 };
        tColor = { r: 0.059, g: 0.090, b: 0.165 };
      }
      c.fills = [{ type: "SOLID", color: bg }];

      const bdg = figma.createFrame();
      bdg.resize(210, 24); bdg.x = 24; bdg.y = 18; bdg.cornerRadius = 4;
      bdg.fills = [{ type: "SOLID", color: r.theme === "GOLD" ? { r: 0.059, g: 0.090, b: 0.165 } : { r: 0.0, g: 0.8, b: 0.6 } }];
      const bdgTxt = figma.createText();
      bdgTxt.fontName = { family: "Space Mono", style: "Bold" };
      bdgTxt.characters = r.tier;
      bdgTxt.fontSize = 8.5;
      bdgTxt.fills = [{ type: "SOLID", color: r.theme === "GOLD" ? { r: 1, g: 0.839, b: 0.039 } : { r: 0.059, g: 0.090, b: 0.165 } }];
      bdgTxt.x = 10; bdgTxt.y = 5;
      bdg.appendChild(bdgTxt);
      c.appendChild(bdg);

      const tit = figma.createText();
      tit.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      tit.characters = r.title;
      tit.fontSize = 22; tit.fills = [{ type: "SOLID", color: tColor }];
      tit.x = 24; tit.y = 52;
      c.appendChild(tit);

      const pr = figma.createText();
      pr.fontName = { family: "Space Mono", style: "Bold" };
      pr.characters = r.price;
      pr.fontSize = 24; pr.fills = [{ type: "SOLID", color: r.theme === "GOLD" ? { r: 0.059, g: 0.090, b: 0.165 } : { r: 1, g: 0.839, b: 0.039 } }];
      pr.x = 640; pr.y = 20;
      c.appendChild(pr);

      const desc = figma.createText();
      desc.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      desc.characters = r.desc;
      desc.fontSize = 13;
      desc.fills = [{ type: "SOLID", color: r.theme === "GOLD" ? { r: 0.1, g: 0.15, b: 0.25 } : { r: 0.7, g: 0.85, b: 0.95 } }];
      desc.x = 24; desc.y = 90; desc.resize(870, 30);
      c.appendChild(desc);

      const btn = figma.createFrame();
      btn.resize(260, 38); btn.x = 24; btn.y = 126; btn.cornerRadius = 6;
      btn.fills = [{ type: "SOLID", color: r.theme === "GOLD" ? { r: 0.059, g: 0.090, b: 0.165 } : { r: 0.0, g: 0.8, b: 0.6 } }];
      const btnTxt = figma.createText();
      btnTxt.fontName = { family: "Space Mono", style: "Bold" };
      btnTxt.characters = "KONSULTASI ENGINE →";
      btnTxt.fontSize = 11;
      btnTxt.fills = [{ type: "SOLID", color: r.theme === "GOLD" ? { r: 1, g: 0.839, b: 0.039 } : { r: 0.059, g: 0.090, b: 0.165 } }];
      btnTxt.textAlignHorizontal = "CENTER";
      btnTxt.x = 0; btnTxt.y = 11; btnTxt.resize(260, 20);
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
    fTag.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    fTag.x = 0; fTag.y = 10;
    footer.appendChild(fTag);

    const fSub = figma.createText();
    fSub.fontName = { family: "Space Mono", style: "Regular" };
    fSub.characters = "OFFICIAL DJADI CREATIVE · SURABAYA - SIDOARJO";
    fSub.fontSize = 10;
    fSub.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.6, b: 0.7 } }];
    fSub.x = 0; fSub.y = 36;
    footer.appendChild(fSub);

    const waBox = figma.createFrame();
    waBox.resize(250, 48); waBox.x = 670; waBox.y = 8;
    waBox.cornerRadius = 6;
    waBox.fills = [{ type: "SOLID", color: { r: 0.118, g: 0.161, b: 0.235 } }];
    waBox.strokes = [{ type: "SOLID", color: { r: 0.0, g: 0.8, b: 0.6 } }];
    waBox.strokeWeight = 1.5;

    const waCircle = figma.createEllipse();
    waCircle.resize(22, 22); waCircle.x = 12; waCircle.y = 13;
    waCircle.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.8, b: 0.6 } }];
    waBox.appendChild(waCircle);

    const waKicker = figma.createText();
    waKicker.fontName = { family: "Space Mono", style: "Regular" };
    waKicker.characters = "DIRECT WHATSAPP CONSULT";
    waKicker.fontSize = 7.5;
    waKicker.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    waKicker.x = 42; waKicker.y = 9;
    waBox.appendChild(waKicker);

    const waNum = figma.createText();
    waNum.fontName = { family: "Space Mono", style: "Bold" };
    waNum.characters = "0851-9659-8881";
    waNum.fontSize = 15;
    waNum.fills = [{ type: "SOLID", color: { r: 0.0, g: 0.8, b: 0.6 } }];
    waNum.x = 42; waNum.y = 22;
    waBox.appendChild(waNum);

    footer.appendChild(waBox);
    p.appendChild(footer);

    return { success: true };
  `;
  await execFigma("Poster 20", codeP20);

  console.log("=== ALL POSTERS 15-20 SUCCESSFULLY RE-ENGINEERED ===");
}

main().catch(console.error);
