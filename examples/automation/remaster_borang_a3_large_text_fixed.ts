import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

async function main() {
  console.log("Remastering Master Borang A3 with High-Legibility Large Typography (Min 9.5px - 14px)...");

  const code = `
    // 1. Load All Required Fonts
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "SemiBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Regular" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });

    // 2. Remove existing Borang frame
    const existing = figma.currentPage.findOne(function(n) { return n.name === "MASTER_BORANG_SCALE_UP_DJADI_CREATIVE_A3"; });
    if (existing) existing.remove();

    // 3. Create Main A3 Frame (Landscape: 1754 x 1240 px)
    const borang = figma.createFrame();
    borang.name = "MASTER_BORANG_SCALE_UP_DJADI_CREATIVE_A3";
    borang.x = 5098;
    borang.y = 400;
    borang.resize(1754, 1240);
    borang.fills = [{ type: "SOLID", color: { r: 0.969, g: 0.957, b: 0.925 } }]; // Warm Cream (#F7F4EC)
    borang.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }]; // Deep Navy
    borang.strokeWeight = 3;
    figma.currentPage.appendChild(borang);

    // Color Constants (Standar Desain Modern)
    const cNavy = { r: 0.004, g: 0.161, b: 0.412 };    // #012969
    const cGold = { r: 0.961, g: 0.620, b: 0.043 };    // #F59E0B
    const cVermillion = { r: 1.0, g: 0.243, b: 0.114 }; // #FF3E1D
    const cCrimson = { r: 0.702, g: 0.0, b: 0.106 };   // #B3001B
    const cWhite = { r: 1.0, g: 1.0, b: 1.0 };
    const cDark = { r: 0.059, g: 0.090, b: 0.165 };     // #0F172A
    const cCardBg = { r: 0.988, g: 0.988, b: 0.984 };
    const cBorder = { r: 0.82, g: 0.85, b: 0.89 };
    const cGreen = { r: 0.063, g: 0.725, b: 0.506 };
    const cCyan = { r: 0.12, g: 0.63, b: 0.95 };
    const cOrange = { r: 0.98, g: 0.45, b: 0.08 };

    // Helper: Create Text
    function createTxt(parent, opts) {
      const text = opts.text;
      const x = opts.x !== undefined ? opts.x : 0;
      const y = opts.y !== undefined ? opts.y : 0;
      const size = opts.size !== undefined ? opts.size : 11;
      const style = opts.style !== undefined ? opts.style : "Regular";
      const color = opts.color !== undefined ? opts.color : cDark;
      const width = opts.width !== undefined ? opts.width : null;
      const align = opts.align !== undefined ? opts.align : "LEFT";

      const t = figma.createText();
      t.fontName = { family: style.indexOf("Mono") !== -1 ? "Space Mono" : "Plus Jakarta Sans", style: style.replace("Mono ", "") };
      t.characters = text;
      t.fontSize = size;
      t.fills = [{ type: "SOLID", color: color }];
      t.textAlignHorizontal = align;
      if (width) {
        t.textAutoResize = "HEIGHT";
        t.resize(width, t.height);
      }
      t.x = x;
      t.y = y;
      parent.appendChild(t);
      return t;
    }

    // Helper: Create Section Card Box with Header
    function createBox(parent, opts) {
      const name = opts.name;
      const x = opts.x;
      const y = opts.y;
      const w = opts.w;
      const h = opts.h;
      const title = opts.title;
      const headerBg = opts.headerBg !== undefined ? opts.headerBg : cNavy;
      const headerColor = opts.headerColor !== undefined ? opts.headerColor : cWhite;
      const kicker = opts.kicker !== undefined ? opts.kicker : null;
      const cardBg = opts.cardBg !== undefined ? opts.cardBg : cCardBg;

      const box = figma.createFrame();
      box.name = name;
      box.x = x;
      box.y = y;
      box.resize(w, h);
      box.cornerRadius = 8;
      box.fills = [{ type: "SOLID", color: cardBg }];
      box.strokes = [{ type: "SOLID", color: cNavy }];
      box.strokeWeight = 1.5;
      parent.appendChild(box);

      // Header Bar (Height 26px for readable 12px title)
      const head = figma.createFrame();
      head.name = "Header";
      head.x = 0;
      head.y = 0;
      head.resize(w, 26);
      head.fills = [{ type: "SOLID", color: headerBg }];
      box.appendChild(head);

      const tTitle = figma.createText();
      tTitle.fontName = { family: "Space Mono", style: "Bold" };
      tTitle.fontSize = 11.5;
      tTitle.characters = title;
      tTitle.fills = [{ type: "SOLID", color: headerColor }];
      tTitle.x = 8;
      tTitle.y = 4;
      head.appendChild(tTitle);

      if (kicker) {
        const tKicker = figma.createText();
        tKicker.fontName = { family: "Space Mono", style: "Bold" };
        tKicker.fontSize = 10;
        tKicker.characters = kicker;
        tKicker.fills = [{ type: "SOLID", color: cGold }];
        tKicker.x = w - tKicker.width - 8;
        tKicker.y = 5;
        head.appendChild(tKicker);
      }

      return box;
    }

    // =========================================================================
    // HEADER AREA (y: 20, h: 90, w: 1690)
    // =========================================================================
    const headFrame = figma.createFrame();
    headFrame.name = "Header_Borang";
    headFrame.x = 32;
    headFrame.y = 20;
    headFrame.resize(1690, 90);
    headFrame.cornerRadius = 10;
    headFrame.fills = [{ type: "SOLID", color: cWhite }];
    headFrame.strokes = [{ type: "SOLID", color: cNavy }];
    headFrame.strokeWeight = 2;
    borang.appendChild(headFrame);

    // Left Logo
    const logoSource = await figma.getNodeByIdAsync("812:14769");
    if (logoSource) {
      const l = logoSource.clone();
      l.x = 18;
      l.y = 12;
      headFrame.appendChild(l);
    } else {
      createTxt(headFrame, { text: "DJADI CREATIVE", x: 18, y: 16, size: 24, style: "ExtraBold", color: cNavy });
    }

    // Center Title Block (Prominent, High Legibility)
    createTxt(headFrame, { text: "CETAK BIRU STRATEGIS SCALE-UP & MASTER BORANG BISNIS", x: 215, y: 10, size: 21, style: "ExtraBold", color: cNavy });
    createTxt(headFrame, { text: "DJADI CREATIVE — DIGITAL GROWTH & PERFORMANCE AGENCY (2026–2027)", x: 215, y: 36, size: 13, style: "Bold", color: cCrimson });
    createTxt(headFrame, { text: "Founder & Head of Growth: Bachtiar Aryansyah Putra (Mas Tiar / Arya) · 9 Blok BMC · Target Omzet Rp 200 Jt/Thn Net", x: 215, y: 54, size: 11, style: "SemiBold", color: cDark });
    createTxt(headFrame, { text: "“Urusan Iklan & Konten, Semua Beres Djadi! (Bikin Iklan & Konten Auto Djadi Cuan!)”", x: 215, y: 70, size: 10.5, style: "Bold", color: cVermillion });

    // Right Pillars Block
    const rBlock = figma.createFrame();
    rBlock.name = "Right_Pillars_Block";
    rBlock.x = 1230;
    rBlock.y = 8;
    rBlock.resize(450, 74);
    rBlock.cornerRadius = 8;
    rBlock.fills = [{ type: "SOLID", color: cNavy }];
    headFrame.appendChild(rBlock);

    createTxt(rBlock, {
      text: "“Satu Invoice, Enam Solusi Pertumbuhan. Ekosistem Digital Beres Total.”",
      x: 10, y: 6, size: 10.5, style: "Bold", color: cGold, width: 430, align: "CENTER"
    });

    const pillsData = [
      { l1: "WEB .COM", l2: "LCP < 1.5s" },
      { l1: "20 KONTEN", l2: "Feed & Reels" },
      { l1: "META ADS", l2: "Advantage+" },
      { l1: "GOOGLE ADS", l2: "Brand Defense" },
      { l1: "MENTORING", l2: "1-on-1 Mas Tiar" }
    ];

    let px = 8;
    pillsData.forEach(function(pd) {
      const pf = figma.createFrame();
      pf.name = "Pill_" + pd.l1;
      pf.x = px;
      pf.y = 26;
      pf.resize(84, 38);
      pf.cornerRadius = 4;
      pf.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.25, b: 0.55 } }];
      rBlock.appendChild(pf);

      const t1 = figma.createText();
      t1.fontName = { family: "Space Mono", style: "Bold" };
      t1.characters = pd.l1;
      t1.fontSize = 9.5;
      t1.fills = [{ type: "SOLID", color: cGold }];
      t1.textAlignHorizontal = "CENTER";
      t1.resize(84, t1.height);
      t1.x = 0;
      t1.y = 4;
      pf.appendChild(t1);

      const t2 = figma.createText();
      t2.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      t2.characters = pd.l2;
      t2.fontSize = 9;
      t2.fills = [{ type: "SOLID", color: cWhite }];
      t2.textAlignHorizontal = "CENTER";
      t2.resize(84, t2.height);
      t2.x = 0;
      t2.y = 20;
      pf.appendChild(t2);

      px += 88;
    });

    // =========================================================================
    // STATS HIGHLIGHT BAR (y: 118, h: 54, w: 1690)
    // =========================================================================
    const statsCols = [
      {
        title: "[ TARGET FINANSIAL AGSI ]",
        line1: "Rp 16.600.000 – Rp 20.000.000 / Bln",
        line2: "Rp 200.000.000 / Thn | Margin Net >= 75%",
        w: 395, badgeText: "NET >= 75%", badgeBg: cGreen
      },
      {
        title: "[ 3 LINI PENDAPATAN (Rp 20 Jt/Bln) ]",
        line1: "1. Retainer Paket HERO (4-5 Klien @ Rp 4 Jt = Rp 16-20 Jt)",
        line2: "2. Downsell Web Express (Rp 2-3.5 Jt) | 3. VIP B2B (Rp 7.5-12 Jt)",
        w: 435, badgeText: "RETAINER CORE", badgeBg: cNavy
      },
      {
        title: "[ POSITIONING & 3 PILAR UTAMA ]",
        line1: "Digital Growth & Performance Agency Partner",
        line2: "1. Web Engineering | 2. Panduan Visual Resmi | 3. Paid Media",
        w: 420, badgeText: "3 PILAR", badgeBg: cVermillion
      },
      {
        title: "[ BAGIAN III: EKOSISTEM 4 BRAND ]",
        line1: "1. Djadi Creative (Core) | 2. Djadi Web Solutions (Tech)",
        line2: "3. Tiar Property (KPR Jatim) | 4. Akademi Djadi (Referral)",
        w: 420, badgeText: "4 HOLDING", badgeBg: cDark
      }
    ];

    let sX = 32;
    statsCols.forEach(function(sc) {
      const sf = figma.createFrame();
      sf.name = sc.title;
      sf.x = sX;
      sf.y = 118;
      sf.resize(sc.w, 54);
      sf.cornerRadius = 6;
      sf.fills = [{ type: "SOLID", color: cWhite }];
      sf.strokes = [{ type: "SOLID", color: cNavy }];
      sf.strokeWeight = 1.5;
      borang.appendChild(sf);

      // Mini top bar with badge
      const mb = figma.createFrame();
      mb.x = 0; mb.y = 0; mb.resize(sc.w, 18);
      mb.fills = [{ type: "SOLID", color: cNavy }];
      sf.appendChild(mb);
      createTxt(mb, { text: sc.title, x: 6, y: 2, size: 10, style: "Mono Bold", color: cGold });

      // Right mini badge
      const bgBadge = figma.createFrame();
      bgBadge.resize(85, 14);
      bgBadge.x = sc.w - 89;
      bgBadge.y = 2;
      bgBadge.cornerRadius = 3;
      bgBadge.fills = [{ type: "SOLID", color: sc.badgeBg }];
      mb.appendChild(bgBadge);
      createTxt(bgBadge, { text: sc.badgeText, x: 0, y: 1, size: 9, style: "Mono Bold", color: cWhite, width: 85, align: "CENTER" });

      createTxt(sf, { text: sc.line1, x: 8, y: 21, size: 11, style: "Bold", color: cCrimson });
      createTxt(sf, { text: sc.line2, x: 8, y: 36, size: 10, style: "SemiBold", color: cDark });

      sX += sc.w + 10;
    });

    // =========================================================================
    // ROW 1: CORE FOUNDATION (y: 180, h: 220)
    // Box 1.1: Profil & Kredibilitas (w: 410)
    // Box 1.2: SWOT & TOWS Matrix (w: 410)
    // Box 1.3: 4 Prioritas & Roadmap (w: 420)
    // Box 1.4: Value Ladder Funnel (w: 420)
    // =========================================================================

    // Box 1.1: Profil & Kredibilitas
    const b1_1 = createBox(borang, {
      name: "Bagian_I_Profil_Kredibilitas",
      x: 32, y: 180, w: 410, h: 220,
      title: "BAGIAN I: PROFIL RESMI & KREDIBILITAS AGSI",
      kicker: "3 Inti & 6 Divisi"
    });

    const teamMembers = [
      { role: "FOUNDER & GROWTH", name: "Bachtiar Aryansyah Putra (Mas Tiar / Arya)", desc: "Head of Paid Traffic, Closing WA, Web Architect", bg: cNavy, tag: "LEAD" },
      { role: "CREATIVE & DESIGN", name: "Fadhil (CCO)", desc: "Visual Director, Standar Desain Modern Tegas", bg: cCrimson, tag: "ART" },
      { role: "OPERATIONS & CS", name: "Fifa Nur Haliza (COO)", desc: "Lead Inbound WhatsApp Closer (< 60s), SPK & Invoice", bg: { r: 0.08, g: 0.45, b: 0.28 }, tag: "OPS" }
    ];

    let tmY = 32;
    teamMembers.forEach(function(tm) {
      const tf = figma.createFrame();
      tf.x = 8; tf.y = tmY; tf.resize(394, 32);
      tf.cornerRadius = 4;
      tf.fills = [{ type: "SOLID", color: { r: 0.94, g: 0.95, b: 0.98 } }];
      tf.strokes = [{ type: "SOLID", color: cBorder }];
      b1_1.appendChild(tf);

      const tc = figma.createFrame();
      tc.x = 4; tc.y = 4; tc.resize(48, 24);
      tc.cornerRadius = 3;
      tc.fills = [{ type: "SOLID", color: tm.bg }];
      tf.appendChild(tc);
      createTxt(tc, { text: tm.tag, x: 0, y: 5, size: 9.5, style: "Mono Bold", color: cWhite, width: 48, align: "CENTER" });

      createTxt(tf, { text: tm.role + ": " + tm.name, x: 58, y: 3, size: 10.5, style: "Bold", color: cDark });
      createTxt(tf, { text: tm.desc, x: 58, y: 17, size: 9.5, style: "Medium", color: { r: 0.3, g: 0.35, b: 0.45 } });

      tmY += 36;
    });

    // 3 Metrics Highlight
    const metrics = [
      { val: "+320%", label: "F&B Surabayafans", sub: "1.450+ Order WA" },
      { val: "+210%", label: "Skincare Sidoarjo", sub: "LCP 0.9s | Score 98" },
      { val: "< 60s", label: "Inbound WA Speed", sub: "CPR < Rp 4.000 CBO" }
    ];
    let metX = 8;
    metrics.forEach(function(m) {
      const mf = figma.createFrame();
      mf.x = metX; mf.y = 142; mf.resize(127, 44);
      mf.cornerRadius = 4;
      mf.fills = [{ type: "SOLID", color: cNavy }];
      b1_1.appendChild(mf);

      createTxt(mf, { text: m.val, x: 0, y: 2, size: 14, style: "Mono Bold", color: cGold, width: 127, align: "CENTER" });
      createTxt(mf, { text: m.label, x: 0, y: 18, size: 9.5, style: "Bold", color: cWhite, width: 127, align: "CENTER" });
      createTxt(mf, { text: m.sub, x: 0, y: 30, size: 8.5, style: "Regular", color: { r: 0.75, g: 0.85, b: 0.98 }, width: 127, align: "CENTER" });
      metX += 133;
    });

    createTxt(b1_1, { text: "STACK: Next.js 15 · Tailwind CSS · React Remotion · Cloudflare Edge · Meta CBO", x: 8, y: 192, size: 10, style: "Mono Bold", color: cCrimson, width: 394 });

    // -------------------------------------------------------------------------
    // Box 1.2: SWOT & TOWS Matrix (Visual 2x2 Grid)
    // -------------------------------------------------------------------------
    const b1_2 = createBox(borang, {
      name: "Bagian_II_SWOT_TOWS",
      x: 452, y: 180, w: 410, h: 220,
      title: "BAGIAN II: MATRIKS SWOT & TOWS STRATEGIS",
      kicker: "Formula Menang 2x2"
    });

    const swotQuads = [
      { code: "S", title: "STRENGTHS", border: cGreen, bg: { r: 0.94, g: 0.99, b: 0.96 }, items: "• Paket HERO 1 invoice 6 solusi\\n• Web kilat LCP < 1.5s, CS < 60s" },
      { code: "W", title: "WEAKNESSES", border: cOrange, bg: { r: 0.99, g: 0.97, b: 0.94 }, items: "• Kapasitas slot terbatas 4-5 klien\\n• Edukasi custom code vs WP lemot" },
      { code: "O", title: "OPPORTUNITIES", border: cCyan, bg: { r: 0.94, g: 0.97, b: 0.99 }, items: "• Biaya fee marketplace 15%+ naik\\n• Brand lokal butuh web mandiri" },
      { code: "T", title: "THREATS", border: cCrimson, bg: { r: 0.99, g: 0.95, b: 0.95 }, items: "• Perang harga agensi Rp 200k\\n• Fluktuasi ad spend CBO Meta" }
    ];

    let sqX = [8, 208, 8, 208];
    let sqY = [30, 30, 94, 94];
    swotQuads.forEach(function(sq, i) {
      const qf = figma.createFrame();
      qf.x = sqX[i]; qf.y = sqY[i]; qf.resize(194, 58);
      qf.cornerRadius = 4;
      qf.fills = [{ type: "SOLID", color: sq.bg }];
      qf.strokes = [{ type: "SOLID", color: sq.border }];
      qf.strokeWeight = 1.2;
      b1_2.appendChild(qf);

      const qh = figma.createFrame();
      qh.x = 0; qh.y = 0; qh.resize(194, 16);
      qh.fills = [{ type: "SOLID", color: sq.border }];
      qf.appendChild(qh);
      createTxt(qh, { text: sq.code + " · " + sq.title, x: 6, y: 1, size: 9.5, style: "Mono Bold", color: cWhite });

      createTxt(qf, { text: sq.items, x: 6, y: 19, size: 10, style: "Medium", color: cDark, width: 182 });
    });

    const towsBanner = figma.createFrame();
    towsBanner.x = 8; towsBanner.y = 158; towsBanner.resize(394, 54);
    towsBanner.cornerRadius = 4;
    towsBanner.fills = [{ type: "SOLID", color: cNavy }];
    b1_2.appendChild(towsBanner);

    createTxt(towsBanner, { text: "[ STRATEGI TOWS EKSEKUTIF ]", x: 8, y: 3, size: 10, style: "Mono Bold", color: cGold });
    createTxt(towsBanner, { text: "SO: Serbu brand D2C korban fee marketplace via kampanye 'Simpan Profit 15%'.\\nWO/ST: Filter 5 menit CS Fifa -> Closer Zoom 15 menit Mas Tiar + DP Rp 2 Jt.", x: 8, y: 18, size: 9.5, style: "Medium", color: cWhite, width: 380 });

    // -------------------------------------------------------------------------
    // Box 1.3: 4 Prioritas & Roadmap 2026-2027
    // -------------------------------------------------------------------------
    const b1_3 = createBox(borang, {
      name: "Bagian_IV_Roadmap_KPI",
      x: 872, y: 180, w: 420, h: 220,
      title: "BAGIAN IV: 4 PRIORITAS, ROADMAP 2026-2027 & KPI",
      kicker: "Target Rp 200 Jt"
    });

    const priors = [
      { p: "P1", t: "Web LCP < 1.5s", bg: cNavy },
      { p: "P2", t: "10 Brand Portofolio", bg: cCrimson },
      { p: "P3", t: "Paket HERO Rp 4 Jt", bg: cVermillion },
      { p: "P4", t: "4-5 Klien Retainer", bg: cGreen }
    ];
    let prX = 8;
    priors.forEach(function(pr) {
      const prf = figma.createFrame();
      prf.x = prX; prf.y = 30; prf.resize(98, 30);
      prf.cornerRadius = 4;
      prf.fills = [{ type: "SOLID", color: pr.bg }];
      b1_3.appendChild(prf);
      createTxt(prf, { text: pr.p, x: 0, y: 2, size: 9.5, style: "Mono Bold", color: cGold, width: 98, align: "CENTER" });
      createTxt(prf, { text: pr.t, x: 0, y: 15, size: 9, style: "Bold", color: cWhite, width: 98, align: "CENTER" });
      prX += 102;
    });

    const quarters = [
      { q: "Q1 2026", goal: "MRR Rp 12 Jt", sub: "3 Klien Pertama\\nCS WA < 60s" },
      { q: "Q2 2026", goal: "MRR Rp 20 Jt", sub: "5 Retainer HERO\\nReferral Rp 500k" },
      { q: "Q3 2026", goal: "Akumulasi 130 Jt", sub: "Retensi > 80%\\nScale CBO +20%" },
      { q: "Q4 2026", goal: "OMZET RP 200 JT", sub: "Ekspansi VIP B2B\\nDividen Net 75%" }
    ];

    let qX = 8;
    quarters.forEach(function(q, i) {
      const qBox = figma.createFrame();
      qBox.x = qX; qBox.y = 66; qBox.resize(98, 86);
      qBox.cornerRadius = 4;
      qBox.fills = [{ type: "SOLID", color: i === 3 ? { r: 1, g: 0.95, b: 0.9 } : cWhite }];
      qBox.strokes = [{ type: "SOLID", color: i === 3 ? cVermillion : cBorder }];
      qBox.strokeWeight = i === 3 ? 1.5 : 1;
      b1_3.appendChild(qBox);

      const qHead = figma.createFrame();
      qHead.x = 0; qHead.y = 0; qHead.resize(98, 18);
      qHead.fills = [{ type: "SOLID", color: i === 3 ? cVermillion : cNavy }];
      qBox.appendChild(qHead);
      createTxt(qHead, { text: q.q, x: 0, y: 2, size: 9.5, style: "Mono Bold", color: cGold, width: 98, align: "CENTER" });

      createTxt(qBox, { text: q.goal, x: 4, y: 22, size: 10, style: "Bold", color: i === 3 ? cCrimson : cNavy, width: 90, align: "CENTER" });
      createTxt(qBox, { text: q.sub, x: 4, y: 44, size: 9.5, style: "Medium", color: cDark, width: 90, align: "CENTER" });

      qX += 102;
    });

    const kpiF = figma.createFrame();
    kpiF.x = 8; kpiF.y = 158; kpiF.resize(404, 54);
    kpiF.cornerRadius = 4;
    kpiF.fills = [{ type: "SOLID", color: { r: 0.94, g: 0.96, b: 0.99 } }];
    kpiF.strokes = [{ type: "SOLID", color: cNavy }];
    b1_3.appendChild(kpiF);

    createTxt(kpiF, { text: "[ TARGET KPI OPERASIONAL EKSEKUTIF ]", x: 8, y: 4, size: 10, style: "Mono Bold", color: cNavy });
    createTxt(kpiF, { text: "• MRR: Rp 16.000.000 – Rp 20.000.000 / Bln (Target Omzet Rp 200 Jt/Thn Net)\\n• Traffic: CPR Advantage+ CBO < Rp 10.000 | Web live < 5 hari | CS WA < 60s", x: 8, y: 20, size: 10, style: "SemiBold", color: cDark, width: 388 });

    // -------------------------------------------------------------------------
    // Box 1.4: Value Ladder Funnel (High-Contrast Hero Card)
    // -------------------------------------------------------------------------
    const b1_4 = createBox(borang, {
      name: "Bagian_V_Value_Ladder",
      x: 1302, y: 180, w: 420, h: 220,
      title: "BAGIAN V: VALUE LADDER FUNNEL (TANGGA PENAWARAN HERO)",
      kicker: "Level 0 s.d 3",
      cardBg: { r: 0.004, g: 0.161, b: 0.412 }, // Midnight Navy
      headerBg: cVermillion,
      headerColor: cWhite
    });

    const tiers = [
      { lvl: "LEVEL 0: LEAD MAGNET", price: "GRATIS (Rp 0)", feat: "Audit Celah Web & Iklan 15 Mnt Mas Tiar -> 15-25 kontak WA", bg: cWhite, border: cBorder, tagBg: cNavy, pColor: cNavy },
      { lvl: "LEVEL 1: TRIPWIRE", price: "Rp 1.500.000 – Rp 2.500.000", feat: "Website Custom Express Toko Online (Deliverables Web Next.js LCP < 1.5s)", bg: cWhite, border: cBorder, tagBg: cNavy, pColor: cNavy },
      { lvl: "LEVEL 2: CORE HERO ★", price: "Rp 4.000.000 / Bln (DP Rp 2 Jt)", feat: "Flagship HERO: Official Web .com + 20 Konten + Ads CBO + Mentoring", bg: { r: 1, g: 0.96, b: 0.92 }, border: cGold, tagBg: cVermillion, pColor: cCrimson },
      { lvl: "LEVEL 3: VIP CORPORATE", price: "Rp 7.500.000 – Rp 12.000.000 / Bln", feat: "Retainer Omni-Channel Multi-Brand (Scale Agresif, Tender, Multi-Funnel)", bg: cWhite, border: cBorder, tagBg: cNavy, pColor: cNavy }
    ];

    let tY = 30;
    tiers.forEach(function(tr, i) {
      const tf = figma.createFrame();
      tf.x = 8; tf.y = tY; tf.resize(404, 43);
      tf.cornerRadius = 4;
      tf.fills = [{ type: "SOLID", color: tr.bg }];
      tf.strokes = [{ type: "SOLID", color: tr.border }];
      tf.strokeWeight = i === 2 ? 2 : 1;
      b1_4.appendChild(tf);

      const lBadge = figma.createFrame();
      lBadge.x = 4; lBadge.y = 4; lBadge.resize(120, 16);
      lBadge.cornerRadius = 3;
      lBadge.fills = [{ type: "SOLID", color: tr.tagBg }];
      tf.appendChild(lBadge);
      createTxt(lBadge, { text: tr.lvl, x: 0, y: 1, size: 9, style: "Mono Bold", color: cWhite, width: 120, align: "CENTER" });

      createTxt(tf, { text: tr.price, x: 130, y: 4, size: 11, style: "Bold", color: tr.pColor });
      createTxt(tf, { text: tr.feat, x: 8, y: 23, size: 10, style: "Medium", color: cDark, width: 388 });

      tY += 46;
    });

    // =========================================================================
    // ROW 2: STRATEGIC MATRICES (y: 406, h: 200)
    // Box 2.1: 9 Blok BMC Grounded (w: 545)
    // Box 2.2: Blue Ocean ERRC Strategy (w: 545)
    // Box 2.3: 7 Area Marketing Identity (w: 580)
    // =========================================================================

    // Box 2.1: 9 Blok BMC Grounded
    const b2_1 = createBox(borang, {
      name: "Bagian_VI_1_BMC_9_Blok",
      x: 32, y: 406, w: 545, h: 200,
      title: "BAGIAN VI.1: BUSINESS MODEL CANVAS SBU (9 BLOK GROUNDED)",
      kicker: "Unit Economics Sehat"
    });

    const bmcBlocks = [
      { code: "KP", name: "KEY PARTNERS", x: 6, y: 28, w: 102, h: 112, txt: "Cloudflare, Vercel, Meta Agency, Komunitas UMKM Jatim, Mitra Referral." },
      { code: "KA", name: "KEY ACTIVITIES", x: 112, y: 28, w: 104, h: 54, txt: "Riset web, 20 konten feed & reels, coding Next.js, Ads CBO." },
      { code: "KR", name: "KEY RESOURCES", x: 112, y: 86, w: 104, h: 54, txt: "Tim B. Aryansyah P. (Arya), Fadhil, Fifa, server edge, SOP master." },
      { code: "VP", name: "VALUE PROPOSITIONS", x: 220, y: 28, w: 112, h: 112, txt: "[ PAKET HERO Rp 4 Jt ]\\\nSolusi 6-in-1: Web LCP < 1.5s, 20 konten, ads CBO, 3x mentoring." },
      { code: "CR", name: "CUSTOMER RELATIONS", x: 336, y: 28, w: 100, h: 54, txt: "Respon WA < 60s, Friday Impact Pulse jam 16:00, 3x Zoom." },
      { code: "CH", name: "CHANNELS", x: 336, y: 86, w: 100, h: 54, txt: "WhatsApp, website djadicreative.com, IG @djadi.creative, Meta Ads." },
      { code: "CS", name: "CUSTOMER SEGMENT", x: 440, y: 28, w: 99, h: 112, txt: "Brand D2C, Kuliner F&B, Skincare, Fashion, Klinik Surabaya-SDA." }
    ];

    bmcBlocks.forEach(function(b) {
      const bf = figma.createFrame();
      bf.x = b.x; bf.y = b.y; bf.resize(b.w, b.h);
      bf.cornerRadius = 4;
      bf.fills = [{ type: "SOLID", color: b.code === "VP" ? { r: 1, g: 0.97, b: 0.92 } : cWhite }];
      bf.strokes = [{ type: "SOLID", color: b.code === "VP" ? cVermillion : cBorder }];
      bf.strokeWeight = b.code === "VP" ? 2 : 1;
      b2_1.appendChild(bf);

      const bh = figma.createFrame();
      bh.x = 0; bh.y = 0; bh.resize(b.w, 16);
      bh.fills = [{ type: "SOLID", color: b.code === "VP" ? cVermillion : cNavy }];
      bf.appendChild(bh);
      createTxt(bh, { text: b.code + ": " + b.name, x: 4, y: 1, size: 8.5, style: "Mono Bold", color: cWhite });

      createTxt(bf, { text: b.txt, x: 4, y: 18, size: 9.5, style: b.code === "VP" ? "Bold" : "Medium", color: cDark, width: b.w - 8 });
    });

    const costF = figma.createFrame();
    costF.x = 6; costF.y = 144; costF.resize(263, 50);
    costF.cornerRadius = 4;
    costF.fills = [{ type: "SOLID", color: { r: 0.99, g: 0.95, b: 0.95 } }];
    costF.strokes = [{ type: "SOLID", color: cCrimson }];
    b2_1.appendChild(costF);
    createTxt(costF, { text: "[ COST STRUCTURE (Biaya Bulanan) ]", x: 6, y: 3, size: 9.5, style: "Mono Bold", color: cCrimson });
    createTxt(costF, { text: "Server: Rp 1.5 Jt | Iklan: Rp 1.5 Jt | Operasional: Rp 1.5 Jt\\nTotal: Rp 4.5 Jt / bln (Operasional Efisien & Terkendali).", x: 6, y: 18, size: 9.5, style: "SemiBold", color: cDark, width: 251 });

    const revF = figma.createFrame();
    revF.x = 276; revF.y = 144; revF.resize(263, 50);
    revF.cornerRadius = 4;
    revF.fills = [{ type: "SOLID", color: { r: 0.94, g: 0.99, b: 0.96 } }];
    revF.strokes = [{ type: "SOLID", color: cGreen }];
    b2_1.appendChild(revF);
    createTxt(revF, { text: "[ REVENUE STREAMS (Pendapatan Masuk) ]", x: 6, y: 3, size: 9.5, style: "Mono Bold", color: cGreen });
    createTxt(revF, { text: "Retainer HERO Rp 16-20 Jt + Downsell Express = Rp 20 Jt/bln.\\nTarget Bersih: Rp 200 Jt / Thn Net (Margin >= 75%).", x: 6, y: 18, size: 9.5, style: "SemiBold", color: cDark, width: 251 });

    // -------------------------------------------------------------------------
    // Box 2.2: Blue Ocean ERRC Strategy
    // -------------------------------------------------------------------------
    const b2_2 = createBox(borang, {
      name: "Bagian_VI_2_ERRC_Grid",
      x: 587, y: 406, w: 545, h: 200,
      title: "2. VALUE INNOVATION (BLUE OCEAN STRATEGY ERRC GRID)",
      kicker: "Diferensiasi Tajam"
    });

    const errcData = [
      { action: "ELIMINATE", badge: "[ HAPUS TOTAL ]", color: cCrimson, bg: { r: 0.99, g: 0.95, b: 0.95 }, items: "• Template Canva murahan & pasaran.\\n• Website WordPress lemot sarang malware.\\n• Jargon teknis yang membingungkan klien." },
      { action: "REDUCE", badge: "[ KURANGI ]", color: cOrange, bg: { r: 0.99, g: 0.97, b: 0.94 }, items: "• Waktu tunggu chat (jadi < 60 detik).\\n• Testing iklan boros tanpa The 3-Day Kill Rule.\\n• Revisi liar tanpa kunci brief SPK awal." },
      { action: "RAISE", badge: "[ TINGKATKAN ]", color: cCyan, bg: { r: 0.94, g: 0.97, b: 0.99 }, items: "• Kecepatan web eksekutif (LCP < 1.5s).\\n• Rasio feed 3:4 & reels 9:16 vertikal.\\n• Transparansi Friday Impact Pulse mingguan." },
      { action: "CREATE", badge: "[ CIPTAKAN ]", color: cGreen, bg: { r: 0.94, g: 0.99, b: 0.96 }, items: "• Paket terpadu HERO All-In @ Rp 4 Jt/bln.\\n• Google Ads Brand Defense perisai nama brand.\\n• Autonomous multi-agent swarm terintegrasi." }
    ];

    let erX = [8, 276, 8, 276];
    let erY = [30, 30, 114, 114];
    errcData.forEach(function(er, i) {
      const ef = figma.createFrame();
      ef.x = erX[i]; ef.y = erY[i]; ef.resize(261, 80);
      ef.cornerRadius = 4;
      ef.fills = [{ type: "SOLID", color: er.bg }];
      ef.strokes = [{ type: "SOLID", color: er.color }];
      ef.strokeWeight = 1.2;
      b2_2.appendChild(ef);

      const eh = figma.createFrame();
      eh.x = 0; eh.y = 0; eh.resize(261, 18);
      eh.fills = [{ type: "SOLID", color: er.color }];
      ef.appendChild(eh);
      createTxt(eh, { text: er.action + " · " + er.badge, x: 6, y: 1, size: 9.5, style: "Mono Bold", color: cWhite });

      createTxt(ef, { text: er.items, x: 6, y: 22, size: 10, style: "Medium", color: cDark, width: 249 });
    });

    // -------------------------------------------------------------------------
    // Box 2.3: 7 Area Marketing Identity & Execution
    // -------------------------------------------------------------------------
    const b2_3 = createBox(borang, {
      name: "Bagian_VI_3_7_Area_Marketing",
      x: 1142, y: 406, w: 580, h: 200,
      title: "3. 7 AREA MARKETING IDENTITY & EXECUTION",
      kicker: "Standar Layanan Agensi"
    });

    const areas = [
      { no: "01", t: "Analisis Titik Bocor", d: "Diagnosa penyebab omzet macet & fee marketplace 15%+" },
      { no: "02", t: "Audit Web & Iklan", d: "Uji PageSpeed & efisiensi ad spend CPR CBO" },
      { no: "03", t: "Positioning Eksekutif", d: "Menetapkan brand bernilai tinggi (membenarkan harga mahal)" },
      { no: "04", t: "Penetapan HERO Rp 4 Jt", d: "Paket retainer 6-in-1 dengan komitmen DP Rp 2 Jt SPK" },
      { no: "05", t: "Alokasi Deliverables", d: "20 Konten Campuran (Feed 3:4 & Reels 9:16) + Web .com" },
      { no: "06", t: "Tujuan Finansial Smart", d: "Target omzet Rp 20 Jt/bln (Rp 200 Jt/thn net)" },
      { no: "07", t: "Strategi Dual Traffic", d: "Meta Advantage+ CBO & Google Search Ads Brand Defense" }
    ];

    let arY = 30;
    areas.forEach(function(ar) {
      const af = figma.createFrame();
      af.x = 8; af.y = arY; af.resize(564, 22);
      af.cornerRadius = 3;
      af.fills = [{ type: "SOLID", color: cWhite }];
      af.strokes = [{ type: "SOLID", color: cBorder }];
      b2_3.appendChild(af);

      const nb = figma.createFrame();
      nb.x = 2; nb.y = 2; nb.resize(24, 18);
      nb.cornerRadius = 2;
      nb.fills = [{ type: "SOLID", color: cNavy }];
      af.appendChild(nb);
      createTxt(nb, { text: ar.no, x: 0, y: 2, size: 9.5, style: "Mono Bold", color: cGold, width: 24, align: "CENTER" });

      createTxt(af, { text: ar.t + ":", x: 32, y: 3, size: 10, style: "Bold", color: cCrimson });
      createTxt(af, { text: ar.d, x: 190, y: 3, size: 10, style: "Medium", color: cDark });

      arY += 24;
    });

    // =========================================================================
    // ROW 3: CUSTOMER & MARKET STRATEGY (y: 612, h: 180)
    // Box 3.1: 5 Alasan Customer (w: 410)
    // Box 3.2: 12 Step Assessment (w: 410)
    // Box 3.3: Market Size TAM/SAM/SOM (w: 420)
    // Box 3.4: 5 Buyer Value & Reason To Buy (w: 420)
    // =========================================================================

    // Box 3.1: 5 Alasan Customer
    const b3_1 = createBox(borang, {
      name: "Bagian_VI_4_5_Alasan_Customer",
      x: 32, y: 612, w: 410, h: 180,
      title: "4. 5 ALASAN CUSTOMER MEMILIH DJADI CREATIVE",
      kicker: "Problem vs Solusi"
    });
    createTxt(b3_1, {
      text: "[ MASALAH UMUM UMKM & BRAND D2C ]\\\n• Tercekik fee marketplace 15%+, web sering jebol, konten pasaran, dan iklan boncos.\\\n\\\n[ SOLUSI HERO DJADI CREATIVE ]\\\n1. VALUE: Web mandiri LCP < 1.5s + direct WhatsApp checkout.\\\n2. DIFFERENCE: 1 agensi mengintegrasikan web custom, 20 konten, dan ads CBO.\\\n3. PROOF: Omzet F&B +320%, Skincare +210%, 1.450+ order tercatat.\\\n4. REASON: Menunda ekosistem = membiarkan profit mengalir ke kompetitor.",
      x: 8, y: 30, size: 10.5, style: "Medium", color: cDark, width: 394
    });

    // Box 3.2: 12 Step Assessment
    const b3_2 = createBox(borang, {
      name: "Bagian_VI_5_12_Step_Assessment",
      x: 452, y: 612, w: 410, h: 180,
      title: "5. 12 STEP ASSESSMENT (SKALA AGSI DJADI CREATIVE)",
      kicker: "Alur Eksekusi"
    });
    createTxt(b3_2, {
      text: "01 Inbound WA Disapa CS Fifa <60s | 02 Kualifikasi 5 mnt (Niche & Omzet)\\\n03 Free Audit 15 Mnt | 04 Zoom 15 Mnt Mas Tiar (Arya)\\\n05 Invoice DP Rp 2 Jt & SPK Kontrak Resmi (DJADICUAN500)\\\n06 Welcome Kit Form H-1 & Serah Terima Aset Produk\\\n07 Rebuild Web Next.js 15 LCP < 1.5s (Minggu 1 Live)\\\n08 Batch 1 Konten (Feed 3:4 Standar Modern + Reels 9:16)\\\n09 Setup Meta Ads Advantage+ CBO & Pixel/CAPI Tracking\\\n10 The 3-Day Kill Rule & Optimasi CPR < Rp 10.000\\\n11 Friday Impact Pulse rutin tiap Jumat jam 16:00 WIB\\\n12 Evaluasi Hasil & Perpanjangan Retainer HERO.",
      x: 8, y: 30, size: 10, style: "Medium", color: cDark, width: 394
    });

    // Box 3.3: Market Size TAM/SAM/SOM
    const b3_3 = createBox(borang, {
      name: "Bagian_VI_6_Market_Size",
      x: 872, y: 612, w: 420, h: 180,
      title: "6. MARKET SIZE & OPPORTUNITY TARGET",
      kicker: "Skala Potensi"
    });

    const marketTiers = [
      { name: "TAM (Total Addressable Market)", num: "64 JUTA UMKM", desc: "Pemilik usaha di Indonesia yang butuh web & iklan mandiri.", w: 404, bg: { r: 0.9, g: 0.94, b: 0.99 }, border: cNavy },
      { name: "SAM (Serviceable Available Market)", num: "1.5 JUTA BISNIS", desc: "Brand D2C, Kuliner, Skincare, Klinik di Jawa Timur & Bali.", w: 340, bg: { r: 0.85, g: 0.92, b: 0.98 }, border: cNavy },
      { name: "SOM (Serviceable Obtainable Market) ★", num: "300–500 BRAND", desc: "Fokus canvasing Djadi: 4-5 klien retainer aktif (@ Rp 4 Jt/bln).", w: 270, bg: { r: 1, g: 0.96, b: 0.9 }, border: cVermillion }
    ];

    let mY = 30;
    marketTiers.forEach(function(mt, i) {
      const mf = figma.createFrame();
      mf.x = 8; mf.y = mY; mf.resize(mt.w, 44);
      mf.cornerRadius = 4;
      mf.fills = [{ type: "SOLID", color: mt.bg }];
      mf.strokes = [{ type: "SOLID", color: mt.border }];
      mf.strokeWeight = i === 2 ? 1.5 : 1;
      b3_3.appendChild(mf);

      createTxt(mf, { text: mt.name + " · " + mt.num, x: 6, y: 3, size: 10.5, style: "Bold", color: i === 2 ? cCrimson : cNavy });
      createTxt(mf, { text: mt.desc, x: 6, y: 20, size: 9.5, style: "Medium", color: cDark, width: mt.w - 12 });

      mY += 48;
    });

    // Box 3.4: 5 Buyer Value & 5 Reason To Buy
    const b3_4 = createBox(borang, {
      name: "Bagian_VI_7_Buyer_Value",
      x: 1302, y: 612, w: 420, h: 180,
      title: "7. 5 BUYER VALUE & 8. 5 REASON TO BUY",
      kicker: "Daya Dorong"
    });
    createTxt(b3_4, {
      text: "[ 5 BUYER VALUE ]\\\n1. Kecepatan Web Eksekutif: Loading kilat LCP < 1.5s.\\\n2. Otoritas Brand Naik: Desain modern tegas membenarkan harga mahal.\\\n3. Anti-Boncos Bergaransi: The 3-Day Kill Rule mengunci ad spend aman.\\\n4. Ketenangan Operasional: Friday Impact Pulse mingguan tanpa ditagih.\\\n5. Bimbingan Praktisi: 3x Zoom 1-on-1 bersama Mas Tiar (Arya).\\\n\\\n[ 5 REASON TO BUY ]\\\n• Portofolio riil teruji (F&B +320%, Skincare +210%).\\\n• Paket All-In 1 invoice (programmer, desainer, media buyer).\\\n• CS Kilat (< 60s oleh Fifa) & Garansi DP Rp 2 Jt SPK aman.",
      x: 8, y: 30, size: 10, style: "Medium", color: cDark, width: 404
    });

    // =========================================================================
    // ROW 4: CUSTOMER EXPERIENCE & STRATEGY STRATA (y: 798, h: 146)
    // Box 4.1: 5 Customer Experience Journey (w: 545)
    // Box 4.2: 5 WOW Experience & 5 WOM Engine (w: 545)
    // Box 4.3: The Seven Strata of Strategy (w: 580)
    // =========================================================================

    // Box 4.1: 5 Customer Experience Journey
    const b4_1 = createBox(borang, {
      name: "Bagian_VI_9_Customer_Journey",
      x: 32, y: 798, w: 545, h: 146,
      title: "9. 5 CUSTOMER EXPERIENCE JOURNEY (ALUR PERJALANAN KLIEN)",
      kicker: "5 Fase Layanan"
    });

    const journeySteps = [
      { step: "01", name: "DEAL LEAD", desc: "Ads CBO -> WA CS Fifa < 60s -> Klaim Free Audit 15 Mnt" },
      { step: "02", name: "KONSULTASI", desc: "Zoom 15 Mnt Mas Tiar (Arya) bedah celah web & iklan" },
      { step: "03", name: "ONBOARDING", desc: "Invoice DP Rp 2 Jt & SPK -> Form brief welcome kit" },
      { step: "04", name: "EKSEKUSI", desc: "Minggu 1 Web Live, M2 20 Konten & Launching CBO" },
      { step: "05", name: "PULSE REPORT", desc: "Friday Impact Pulse 16:00 -> Evaluasi & Scale Up" }
    ];

    let jX = 8;
    journeySteps.forEach(function(js, i) {
      const jf = figma.createFrame();
      jf.x = jX; jf.y = 30; jf.resize(100, 106);
      jf.cornerRadius = 4;
      jf.fills = [{ type: "SOLID", color: i === 2 ? { r: 1, g: 0.96, b: 0.92 } : cWhite }];
      jf.strokes = [{ type: "SOLID", color: i === 2 ? cVermillion : cNavy }];
      jf.strokeWeight = 1.2;
      b4_1.appendChild(jf);

      const snb = figma.createFrame();
      snb.x = 0; snb.y = 0; snb.resize(100, 20);
      snb.fills = [{ type: "SOLID", color: i === 2 ? cVermillion : cNavy }];
      jf.appendChild(snb);
      createTxt(snb, { text: "FASE " + js.step, x: 0, y: 3, size: 9.5, style: "Mono Bold", color: cGold, width: 100, align: "CENTER" });

      createTxt(jf, { text: js.name, x: 4, y: 24, size: 10, style: "Bold", color: i === 2 ? cCrimson : cNavy, width: 92, align: "CENTER" });
      createTxt(jf, { text: js.desc, x: 4, y: 44, size: 9.5, style: "Medium", color: cDark, width: 92, align: "CENTER" });

      jX += 106;
    });

    // Box 4.2: 5 WOW & 5 WOM
    const b4_2 = createBox(borang, {
      name: "Bagian_VI_10_WOW_WOM",
      x: 587, y: 798, w: 545, h: 146,
      title: "10. 5 WOW CLIENT EXPERIENCE & 5 WOM REFERRAL ENGINE",
      kicker: "Viral Referral"
    });
    createTxt(b4_2, {
      text: "[ 5 WOW EXPERIENCE ]\\\n• Respon Kilat CS Fifa < 60s | Diagnosa Tajam Mas Tiar di Zoom 15 Mnt\\\n• Kecepatan Web LCP < 1.5s Terbukti | Feed 3:4 Standar Desain Modern\\\n• Laporan Transparan Friday Impact Pulse setiap Jumat sore jam 16:00 WIB.\\\n\\\n[ 5 WOM REFERRAL ENGINE ]\\\n1. Cash Reward Referral Rp 500.000 tunai per deal SPK baru.\\\n2. Diskon Retainer 10% (Rp 400.000/bln) bagi klien pembawa mitra.\\\n3. Tagging Showcase Medsos di akun resmi @djadi.creative.\\\n4. Link Share Free Audit 15 Mnt dibagikan ke komunitas pengusaha.",
      x: 8, y: 30, size: 10, style: "Medium", color: cDark, width: 529
    });

    // Box 4.3: The Seven Strata of Strategy
    const b4_3 = createBox(borang, {
      name: "Bagian_VI_11_Seven_Strata",
      x: 1142, y: 798, w: 580, h: 146,
      title: "11. THE SEVEN STRATA OF STRATEGY (7 LAPIS KEUNGGULAN)",
      kicker: "Benteng Agensi"
    });
    createTxt(b4_3, {
      text: "1. Positioning: Agensi pertumbuhan modern pengawal omzet Rp 200 Jt/thn.\\\n2. Sandbox: Web custom Next.js, 20 konten feed & video, Ads Advantage+ CBO.\\\n3. Guarantee: Kepuasan terjamin via kontrak SPK resmi & Friday Pulse transparan.\\\n4. One-Phrase Strategy: 'Urusan Iklan & Konten, Semua Beres Djadi!'\\\n5. Differentiating: Next.js LCP < 1.5s + Desain Modern Tegas + The 3-Day Kill Rule.\\\n6. 10x Advantage: CS respon < 60s, AI swarm automasi, advisory kritis anti-yes-man.\\\n7. Profit per X: Profit stabil Rp 3.000.000 - Rp 3.500.000 Net per klien retainer.",
      x: 8, y: 30, size: 10, style: "Medium", color: cDark, width: 564
    });

    // =========================================================================
    // ROW 5: POSITIONING, AUDIT & PENGESAHAN EKSEKUTIF (y: 950, h: 265)
    // Box 5.1: Winning Zone Positioning (w: 405)
    // Box 5.2: Audit Internal 5M & Brutal Facts (w: 415)
    // Box 5.3: Action Engine Scale-Up (w: 400)
    // Box 5.4: Pengesahan Eksekutif & Official Seal (w: 440)
    // =========================================================================

    // Box 5.1: Winning Zone Positioning (High-Contrast Deep Navy Card)
    const b5_1 = createBox(borang, {
      name: "Bagian_VI_16_Winning_Zone",
      x: 32, y: 950, w: 405, h: 265,
      title: "16. BUSINESS POSITIONING (WINNING ZONE)",
      kicker: "Peta Persaingan",
      cardBg: { r: 0.004, g: 0.161, b: 0.412 },
      headerBg: cVermillion,
      headerColor: cWhite
    });
    createTxt(b5_1, {
      text: "[ WINNING ZONE (Zona Menang Mutlak) ]\\\nDJADI CREATIVE PAKET HERO ALL-IN RETAINER (Rp 4 Jt/Bln)\\\nEkosistem pertumbuhan bisnis: Web custom LCP < 1.5s + 20 konten campuran + Advantage+ CBO + Mentoring Zoom 1-on-1 Mas Tiar.\\\n\\\n[ LOSING ZONE (Agensi Murah Canva) ]\\\nJasa postingan Rp 200k-500k tanpa strategi iklan, tanpa web, materi pasaran, dan lepas tangan saat boncos.\\\n\\\n[ RISKY ZONE (Konsultan Teori Tanpa Eksekusi) ]\\\nBiaya puluhan juta hanya menghasilkan slide PDF tanpa eksekusi teknis.",
      x: 8, y: 32, size: 10.5, style: "Medium", color: cWhite, width: 389
    });

    // Box 5.2: Audit Internal 5M & Brutal Facts
    const b5_2 = createBox(borang, {
      name: "Bagian_VI_17_Audit_5M_Facts",
      x: 447, y: 950, w: 415, h: 265,
      title: "17. AUDIT INTERNAL 5M & BRUTAL FACTS",
      kicker: "Realita Pasar"
    });
    createTxt(b5_2, {
      text: "[ A. AUDIT 5M DJADI CREATIVE ]\\\n1. Man: B. Aryansyah P. (Lead), Fadhil (Design), Fifa (Sales).\\\n2. Machine: Next.js 15, Remotion, Meta CBO, CDP automation.\\\n3. Material: Panduan Visual Resmi, asset database 1-BRAND.\\\n4. Money: Arus kas mandiri sehat (Target Rp 20 Jt/Bln Net >= 75%).\\\n5. Method: The 3-Day Kill Rule, Golden Scale +20%/48j, Friday Pulse.\\\n\\\n[ B. BRUTAL FACTS & REALITY CHECK ]\\\n• Fact 1: 60% pembeli kabur jika web loading > 2 detik; custom code LCP < 1.5s adalah harga mati konversi.\\\n• Fact 2: Iklan foto statis di 2026 boncos; wajib hook video kinetik 3 detik.\\\n• Fact 3: 80% calon klien beralih jika CS respon > 15 mnt; disiplin CS Fifa < 60 detik adalah kunci DP Rp 2 Jt.",
      x: 8, y: 32, size: 10, style: "Medium", color: cDark, width: 399
    });

    // Box 5.3: Action Engine Scale-Up
    const b5_3 = createBox(borang, {
      name: "Bagian_VI_18_Action_Engine",
      x: 872, y: 950, w: 400, h: 265,
      title: "18. ACTION ENGINE SCALE-UP (8 TAHAP EKSEKUSI)",
      kicker: "Jadwal Sprint"
    });
    createTxt(b5_3, {
      text: "01 Standardisasi Aset Master: Web djadicreative.com live LCP < 1.5s.\\\n02 Aktivasi WA CS Kilat: Standar respon < 60s & skrip 3 balon.\\\n03 Peluncuran Kampanye Ads: Aktifkan poster campaign 14-20 di Ads.\\\n04 Onboarding 3 Klien Pertama: Eksekusi paket HERO (MRR Rp 12 Jt).\\\n05 Stabilisasi 5 Retainer Aktif: Capai kapasitas (MRR Rp 20 Jt).\\\n06 Otomasi Friday Impact Pulse: Laporan mingguan tiap Jumat 16:00.\\\n07 Aktivasi Downsell Web Express: Solusi alternatif budget fleksibel.\\\n08 Capaian Target Finansial: Akumulasi omzet Rp 200.000.000 / Tahun.\\\n\\\n[ TOTAL MARKETING MATRIX ]\\\n• Inbound: Free Audit 15 Mnt & Mockup Desain Web Toko Mandiri.\\\n• Organic: 20 Konten Campuran (Feed Carousel 3:4 & Video Reels 9:16).\\\n• Outbound: Canvasing Sniper Instagram DM & G-Maps Scouting.\\\n• Paid Traffic: Advantage+ CBO & Google Ads Brand Defense.",
      x: 8, y: 32, size: 10, style: "Medium", color: cDark, width: 384
    });

    // Box 5.4: Pengesahan Eksekutif & Official Verified Seal
    const b5_4 = createBox(borang, {
      name: "Bagian_VII_Segmen_Pengesahan",
      x: 1282, y: 950, w: 440, h: 265,
      title: "BAGIAN VII: SEGMEN UTAMA & PENGESAHAN EKSEKUTIF",
      headerBg: cCrimson,
      kicker: "Resmi Disahkan"
    });

    createTxt(b5_4, {
      text: "[ REKOMENDASI SEGMEN UTAMA ]\\\nPemilik Brand D2C & UMKM Bertumbuh (Omzet Rp 20-150 Jt/Bln)\\\nTercekik fee marketplace 15%+ atau pernah boncos iklan, siap investasi Paket HERO Rp 4 Jt/bln (DP Rp 2 Jt SPK) demi ekosistem mandiri.\\\n\\\n[ VISI AGSI 2026-2027 ]\\\n“Menjadi agensi pertumbuhan bisnis modern terdepan di Indonesia yang menggaransi ekosistem digital (website custom code, konten 3:4 & 9:16, iklan CBO terukur, dan mentoring) terintegrasi tanpa ribet.”\\\n\\\nDitetapkan di Sidoarjo & Surabaya pada tanggal 4 November 2026.",
      x: 8, y: 32, size: 10, style: "Medium", color: cDark, width: 424
    });

    // Visual Signatures Frame with Verified Seal
    const sigFrame = figma.createFrame();
    sigFrame.x = 8; sigFrame.y = 152; sigFrame.resize(424, 105);
    sigFrame.cornerRadius = 6;
    sigFrame.fills = [{ type: "SOLID", color: cWhite }];
    sigFrame.strokes = [{ type: "SOLID", color: cNavy }];
    b5_4.appendChild(sigFrame);

    // Left Signature: Tim Operasional (Fadhil & Fifa)
    createTxt(sigFrame, { text: "Disusun Oleh Tim Operasional:", x: 12, y: 6, size: 9.5, style: "Bold", color: cDark });
    createTxt(sigFrame, { text: "[ Tanda Tangan Digital Terverifikasi ]", x: 12, y: 22, size: 9.5, style: "Mono Bold", color: cNavy });
    createTxt(sigFrame, { text: "Fadhil (CCO) & Fifa Nur Haliza (COO)", x: 12, y: 40, size: 10.5, style: "Bold", color: cCrimson });
    createTxt(sigFrame, { text: "Art Direction & Client Success Lead\\\nDjadi Creative Holding", x: 12, y: 56, size: 9.5, style: "Regular", color: cDark });

    // Center Official Gold Seal Stamp
    const seal = figma.createFrame();
    seal.name = "Official_Verified_Seal";
    seal.x = 188; seal.y = 10; seal.resize(80, 80);
    seal.cornerRadius = 40;
    seal.fills = [{ type: "SOLID", color: cGold }];
    seal.strokes = [{ type: "SOLID", color: cCrimson }];
    seal.strokeWeight = 2;
    sigFrame.appendChild(seal);

    const sealInner = figma.createFrame();
    sealInner.x = 5; sealInner.y = 5; sealInner.resize(70, 70);
    sealInner.cornerRadius = 35;
    sealInner.fills = [{ type: "SOLID", color: cNavy }];
    seal.appendChild(sealInner);

    createTxt(sealInner, { text: "[ OFFICIAL ]", x: 0, y: 8, size: 7.5, style: "Mono Bold", color: cGold, width: 70, align: "CENTER" });
    createTxt(sealInner, { text: "DJADI", x: 0, y: 20, size: 11, style: "ExtraBold", color: cWhite, width: 70, align: "CENTER" });
    createTxt(sealInner, { text: "VERIFIED", x: 0, y: 34, size: 7.5, style: "Mono Bold", color: cVermillion, width: 70, align: "CENTER" });
    createTxt(sealInner, { text: "B. ARYANSYAH P.", x: 0, y: 48, size: 6.5, style: "Mono Bold", color: cGold, width: 70, align: "CENTER" });

    // Right Signature: Founder & Head of Growth (Bachtiar Aryansyah Putra)
    createTxt(sigFrame, { text: "Disahkan Oleh:", x: 278, y: 6, size: 9.5, style: "Bold", color: cDark });
    createTxt(sigFrame, { text: "[ Tanda Tangan Digital Resmi ]", x: 278, y: 22, size: 9.5, style: "Mono Bold", color: cCrimson });
    createTxt(sigFrame, { text: "Bachtiar Aryansyah Putra", x: 278, y: 40, size: 11, style: "Bold", color: cNavy });
    createTxt(sigFrame, { text: "Founder & Head of Growth (Mas Tiar / Arya)\\\nDjadi Creative Holding", x: 278, y: 56, size: 9.5, style: "Medium", color: cDark });

    return {
      success: true,
      nodeId: borang.id,
      dimensions: { w: borang.width, h: borang.height }
    };
  `;

  const res = await callPlugin("execute", { code });
  console.log("Execution Result:", JSON.stringify(res, null, 2));

  const nodeId = res.value?.nodeId || res.nodeId;
  if (nodeId) {
    console.log("Capturing fresh screenshot of high-legibility Borang A3:", nodeId);
    const snap = await callPlugin("get_screenshot", { nodeId, format: "png", scale: 1 });
    const buf = Buffer.from(snap.data, "base64");
    const outPath = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/figma_master_borang_a3_large_text.png";
    writeFileSync(outPath, buf);
    console.log("Saved screenshot successfully to:", outPath, "Size:", buf.length, "bytes");
  }
}

main().catch(console.error);
