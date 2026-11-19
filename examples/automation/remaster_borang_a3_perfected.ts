import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

async function main() {
  console.log("Remastering Master Borang A3 with High Visual Contrast & Dynamic Elements...");

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
    const existing = figma.currentPage.findOne(n => n.name === "MASTER_BORANG_SCALE_UP_DJADI_CREATIVE_A3");
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

    // Color Constants
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
      const boxBg = opts.boxBg !== undefined ? opts.boxBg : cCardBg;
      const boxBorder = opts.boxBorder !== undefined ? opts.boxBorder : cNavy;
      const boxStroke = opts.boxStroke !== undefined ? opts.boxStroke : 1.5;

      const box = figma.createFrame();
      box.name = name;
      box.x = x;
      box.y = y;
      box.resize(w, h);
      box.cornerRadius = 8;
      box.fills = [{ type: "SOLID", color: boxBg }];
      box.strokes = [{ type: "SOLID", color: boxBorder }];
      box.strokeWeight = boxStroke;
      parent.appendChild(box);

      // Header Bar
      const head = figma.createFrame();
      head.name = "Header";
      head.x = 0;
      head.y = 0;
      head.resize(w, 22);
      head.fills = [{ type: "SOLID", color: headerBg }];
      box.appendChild(head);

      const tTitle = figma.createText();
      tTitle.fontName = { family: "Space Mono", style: "Bold" };
      tTitle.fontSize = 8;
      tTitle.characters = title;
      tTitle.fills = [{ type: "SOLID", color: headerColor }];
      tTitle.x = 8;
      tTitle.y = 4;
      head.appendChild(tTitle);

      if (kicker) {
        const tKicker = figma.createText();
        tKicker.fontName = { family: "Space Mono", style: "Bold" };
        tKicker.fontSize = 7.5;
        tKicker.characters = kicker;
        tKicker.fills = [{ type: "SOLID", color: cGold }];
        tKicker.x = w - tKicker.width - 8;
        tKicker.y = 4;
        head.appendChild(tKicker);
      }

      return box;
    }

    // =========================================================================
    // HEADER AREA (y: 24, h: 86, w: 1690)
    // =========================================================================
    const headFrame = figma.createFrame();
    headFrame.name = "Header_Borang";
    headFrame.x = 32;
    headFrame.y = 24;
    headFrame.resize(1690, 86);
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
      createTxt(headFrame, { text: "DJADI CREATIVE", x: 18, y: 16, size: 22, style: "ExtraBold", color: cNavy });
    }

    // Center Title Block
    createTxt(headFrame, { text: "CETAK BIRU STRATEGIS SCALE-UP & MASTER BORANG BISNIS", x: 215, y: 12, size: 20, style: "ExtraBold", color: cNavy });
    createTxt(headFrame, { text: "DJADI CREATIVE — DIGITAL GROWTH & PERFORMANCE AGENCY (2026–2027)", x: 215, y: 36, size: 12.5, style: "Bold", color: cCrimson });
    createTxt(headFrame, { text: "Founder & Principal Growth Orchestrator: Bachtiar Aryansyah Putra (Mas Tiar / Arya) · 9 Blok BMC Grounded · Target Rp 200 Jt/Thn Net", x: 215, y: 53, size: 8.8, style: "Medium", color: cDark });
    createTxt(headFrame, { text: "“Urusan Iklan & Konten, Semua Beres Djadi! (Bikin Iklan & Konten Auto Djadi Cuan!)”", x: 215, y: 68, size: 9, style: "Bold", color: cVermillion });

    // Right Pillars Block
    const rBlock = figma.createFrame();
    rBlock.name = "Right_Pillars_Block";
    rBlock.x = 1242;
    rBlock.y = 7;
    rBlock.resize(438, 72);
    rBlock.cornerRadius = 8;
    rBlock.fills = [{ type: "SOLID", color: cNavy }];
    headFrame.appendChild(rBlock);

    createTxt(rBlock, {
      text: "“Satu Invoice, Enam Solusi Pertumbuhan. Ekosistem Digital Beres Total.”",
      x: 12, y: 7, size: 8.8, style: "Bold", color: cGold, width: 414, align: "CENTER"
    });

    const pillsData = [
      { l1: "WEB .COM", l2: "LCP < 1.5s" },
      { l1: "20 KONTEN", l2: "Feed & Reels" },
      { l1: "META ADS", l2: "Advantage+" },
      { l1: "GOOGLE ADS", l2: "Brand Defense" },
      { l1: "MENTORING", l2: "Mas Tiar 1-on-1" }
    ];

    let px = 10;
    pillsData.forEach(pd => {
      const pf = figma.createFrame();
      pf.name = "Pill_" + pd.l1;
      pf.x = px;
      pf.y = 28;
      pf.resize(80, 28);
      pf.cornerRadius = 4;
      pf.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.25, b: 0.55 } }];
      rBlock.appendChild(pf);

      const t1 = figma.createText();
      t1.fontName = { family: "Space Mono", style: "Bold" };
      t1.characters = pd.l1;
      t1.fontSize = 7;
      t1.fills = [{ type: "SOLID", color: cGold }];
      t1.textAlignHorizontal = "CENTER";
      t1.resize(80, t1.height);
      t1.x = 0;
      t1.y = 3;
      pf.appendChild(t1);

      const t2 = figma.createText();
      t2.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      t2.characters = pd.l2;
      t2.fontSize = 6.8;
      t2.fills = [{ type: "SOLID", color: cWhite }];
      t2.textAlignHorizontal = "CENTER";
      t2.resize(80, t2.height);
      t2.x = 0;
      t2.y = 14;
      pf.appendChild(t2);

      px += 84;
    });

    // =========================================================================
    // STATS HIGHLIGHT BAR (y: 118, h: 50, w: 1690)
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
        line2: "1. Web Engineering | 2. Standar Desain Modern | 3. Paid Media",
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
    statsCols.forEach(sc => {
      const sf = figma.createFrame();
      sf.name = sc.title;
      sf.x = sX;
      sf.y = 118;
      sf.resize(sc.w, 50);
      sf.cornerRadius = 6;
      sf.fills = [{ type: "SOLID", color: cWhite }];
      sf.strokes = [{ type: "SOLID", color: cNavy }];
      sf.strokeWeight = 1.5;
      borang.appendChild(sf);

      const mb = figma.createFrame();
      mb.x = 0; mb.y = 0; mb.resize(sc.w, 16);
      mb.fills = [{ type: "SOLID", color: cNavy }];
      sf.appendChild(mb);
      createTxt(mb, { text: sc.title, x: 6, y: 2, size: 8, style: "Mono Bold", color: cGold });

      const bgBadge = figma.createFrame();
      bgBadge.resize(85, 12);
      bgBadge.x = sc.w - 89;
      bgBadge.y = 2;
      bgBadge.cornerRadius = 3;
      bgBadge.fills = [{ type: "SOLID", color: sc.badgeBg }];
      mb.appendChild(bgBadge);
      createTxt(bgBadge, { text: sc.badgeText, x: 0, y: 1, size: 6.5, style: "Mono Bold", color: cWhite, width: 85, align: "CENTER" });

      createTxt(sf, { text: sc.line1, x: 8, y: 19, size: 8.5, style: "Bold", color: cCrimson });
      createTxt(sf, { text: sc.line2, x: 8, y: 32, size: 8, style: "Medium", color: cDark });

      sX += sc.w + 10;
    });

    // =========================================================================
    // ROW 1: CORE FOUNDATION (y: 176, h: 220)
    // =========================================================================

    // Box 1.1: Profil & Kredibilitas
    const b1_1 = createBox(borang, {
      name: "Bagian_I_Profil_Kredibilitas",
      x: 32, y: 176, w: 410, h: 220,
      title: "BAGIAN I: PROFIL RESMI & KREDIBILITAS AGSI",
      kicker: "3 Inti & 6 Divisi"
    });

    const teamMembers = [
      { role: "FOUNDER & GROWTH", name: "Bachtiar Aryansyah Putra (Mas Tiar / Arya)", desc: "Head of Paid Traffic, Closing WA, Web Architect", bg: cNavy, tag: "LEAD" },
      { role: "CREATIVE & DESIGN", name: "Fadhil (CCO)", desc: "Visual Director, Panduan Visual Resmi & Desain Modern", bg: cCrimson, tag: "ART" },
      { role: "OPERATIONS & CS", name: "Fifa Nur Haliza (COO)", desc: "Lead Inbound WhatsApp Closer (< 60s), SPK & Invoice", bg: { r: 0.08, g: 0.45, b: 0.28 }, tag: "OPS" }
    ];

    let tmY = 26;
    teamMembers.forEach(tm => {
      const tf = figma.createFrame();
      tf.x = 8; tf.y = tmY; tf.resize(394, 30);
      tf.cornerRadius = 4;
      tf.fills = [{ type: "SOLID", color: { r: 0.94, g: 0.95, b: 0.98 } }];
      tf.strokes = [{ type: "SOLID", color: cBorder }];
      b1_1.appendChild(tf);

      const tc = figma.createFrame();
      tc.x = 4; tc.y = 4; tc.resize(44, 22);
      tc.cornerRadius = 3;
      tc.fills = [{ type: "SOLID", color: tm.bg }];
      tf.appendChild(tc);
      createTxt(tc, { text: tm.tag, x: 0, y: 5, size: 7.5, style: "Mono Bold", color: cWhite, width: 44, align: "CENTER" });

      createTxt(tf, { text: tm.role + ": " + tm.name, x: 54, y: 3, size: 7.8, style: "Bold", color: cDark });
      createTxt(tf, { text: tm.desc, x: 54, y: 15, size: 7.2, style: "Regular", color: { r: 0.3, g: 0.35, b: 0.45 } });

      tmY += 34;
    });

    const metrics = [
      { val: "+320%", label: "F&B Surabayafans", sub: "1.450+ Order WA" },
      { val: "+210%", label: "Skincare Sidoarjo", sub: "LCP 0.9s | PageSpeed 98" },
      { val: "< 60s", label: "Inbound WA Speed", sub: "CPR < Rp 4.000 CBO" }
    ];
    let metX = 8;
    metrics.forEach(m => {
      const mf = figma.createFrame();
      mf.x = metX; mf.y = 130; mf.resize(127, 44);
      mf.cornerRadius = 4;
      mf.fills = [{ type: "SOLID", color: cNavy }];
      b1_1.appendChild(mf);

      createTxt(mf, { text: m.val, x: 0, y: 3, size: 11, style: "Mono Bold", color: cGold, width: 127, align: "CENTER" });
      createTxt(mf, { text: m.label, x: 0, y: 18, size: 7, style: "Bold", color: cWhite, width: 127, align: "CENTER" });
      createTxt(mf, { text: m.sub, x: 0, y: 29, size: 6.5, style: "Regular", color: { r: 0.75, g: 0.85, b: 0.98 }, width: 127, align: "CENTER" });
      metX += 133;
    });

    // Clean Pill for Tech Stack
    const techPill = figma.createFrame();
    techPill.x = 8; techPill.y = 178; techPill.resize(394, 18);
    techPill.cornerRadius = 3;
    techPill.fills = [{ type: "SOLID", color: { r: 0.99, g: 0.95, b: 0.95 } }];
    techPill.strokes = [{ type: "SOLID", color: { r: 0.95, g: 0.8, b: 0.8 } }];
    b1_1.appendChild(techPill);
    createTxt(techPill, { text: "TEKNOLOGI: Next.js 15 · Tailwind CSS · React Remotion · Cloudflare Edge · Meta CBO", x: 6, y: 3, size: 7, style: "Mono Bold", color: cCrimson, width: 382 });

    // Clean Pill for Credibility
    const credPill = figma.createFrame();
    credPill.x = 8; credPill.y = 198; credPill.resize(394, 18);
    credPill.cornerRadius = 3;
    credPill.fills = [{ type: "SOLID", color: { r: 0.96, g: 0.97, b: 0.99 } }];
    credPill.strokes = [{ type: "SOLID", color: cBorder }];
    b1_1.appendChild(credPill);
    createTxt(credPill, { text: "Kredibilitas: 10 Brand Portofolio Aktif, Jaringan Mitra B2B, Komunitas UMKM Jatim.", x: 6, y: 3, size: 7, style: "Medium", color: cDark, width: 382 });

    // Box 1.2: SWOT & TOWS Matrix (Visual 2x2 Grid)
    const b1_2 = createBox(borang, {
      name: "Bagian_II_SWOT_TOWS",
      x: 452, y: 176, w: 410, h: 220,
      title: "BAGIAN II: MATRIKS SWOT & TOWS STRATEGIS",
      kicker: "Formula Menang 2x2"
    });

    const swotQuads = [
      { code: "S", title: "KEKUATAN (STRENGTHS)", border: cGreen, bg: { r: 0.94, g: 0.99, b: 0.96 }, items: "• Paket HERO 1 invoice 6 solusi\n• Web kilat LCP < 1.5s, CS < 60s\n• CPR CBO < Rp 10rb teruji" },
      { code: "W", title: "KELEMAHAN (WEAKNESSES)", border: cOrange, bg: { r: 0.99, g: 0.97, b: 0.94 }, items: "• Kapasitas slot terbatas 4-5 klien\n• Edukasi custom code vs WP lemot\n• Ketergantungan automasi tim" },
      { code: "O", title: "PELUANG (OPPORTUNITIES)", border: cCyan, bg: { r: 0.94, g: 0.97, b: 0.99 }, items: "• Biaya fee marketplace 15%+ naik\n• Brand lokal butuh web mandiri\n• Potensi referral cash Rp 500k" },
      { code: "T", title: "ANCAMAN (THREATS)", border: cCrimson, bg: { r: 0.99, g: 0.95, b: 0.95 }, items: "• Perang harga agensi Rp 200k\n• Fluktuasi ad spend CBO Meta\n• Klien telat kirim materi produk" }
    ];

    let sqX = [8, 208, 8, 208];
    let sqY = [26, 26, 96, 96];
    swotQuads.forEach((sq, i) => {
      const qf = figma.createFrame();
      qf.x = sqX[i]; qf.y = sqY[i]; qf.resize(194, 65);
      qf.cornerRadius = 4;
      qf.fills = [{ type: "SOLID", color: sq.bg }];
      qf.strokes = [{ type: "SOLID", color: sq.border }];
      qf.strokeWeight = 1.2;
      b1_2.appendChild(qf);

      const qh = figma.createFrame();
      qh.x = 0; qh.y = 0; qh.resize(194, 15);
      qh.fills = [{ type: "SOLID", color: sq.border }];
      qf.appendChild(qh);
      createTxt(qh, { text: sq.code + " · " + sq.title, x: 6, y: 1, size: 7.2, style: "Mono Bold", color: cWhite });

      createTxt(qf, { text: sq.items, x: 6, y: 18, size: 6.8, style: "Medium", color: cDark, width: 182 });
    });

    const towsBanner = figma.createFrame();
    towsBanner.x = 8; towsBanner.y = 168; towsBanner.resize(394, 44);
    towsBanner.cornerRadius = 4;
    towsBanner.fills = [{ type: "SOLID", color: cNavy }];
    b1_2.appendChild(towsBanner);

    createTxt(towsBanner, { text: "[ STRATEGI TOWS EKSEKUTIF ]", x: 8, y: 3, size: 7.5, style: "Mono Bold", color: cGold });
    createTxt(towsBanner, { text: "SO: Serbu brand D2C korban fee marketplace via kampanye 'Simpan Profit 15%'.\nWO: Filter kualifikasi 5 menit CS Fifa -> Konsultasi 15 menit Mas Tiar (Arya).\nST/WT: Kunci 200+ negative keywords + Wajib kontrak SPK & DP Rp 2 Jt komitmen.", x: 8, y: 15, size: 6.8, style: "Regular", color: cWhite, width: 380 });

    // Box 1.3: 4 Prioritas & Roadmap 2026-2027
    const b1_3 = createBox(borang, {
      name: "Bagian_IV_Roadmap_KPI",
      x: 872, y: 176, w: 420, h: 220,
      title: "BAGIAN IV: 4 PRIORITAS, ROADMAP 2026-2027 & KPI",
      kicker: "Target Rp 200 Jt"
    });

    const priors = [
      { p: "P1", t: "Web Kencang LCP < 1.5s", bg: cNavy },
      { p: "P2", t: "Portofolio 10 Brand Teruji", bg: cCrimson },
      { p: "P3", t: "Paket HERO Rp 4 Jt/bln", bg: cVermillion },
      { p: "P4", t: "Monetisasi 4-5 Retainer", bg: cGreen }
    ];
    let prX = 8;
    priors.forEach(pr => {
      const prf = figma.createFrame();
      prf.x = prX; prf.y = 26; prf.resize(98, 26);
      prf.cornerRadius = 4;
      prf.fills = [{ type: "SOLID", color: pr.bg }];
      b1_3.appendChild(prf);
      createTxt(prf, { text: pr.p, x: 0, y: 2, size: 7, style: "Mono Bold", color: cGold, width: 98, align: "CENTER" });
      createTxt(prf, { text: pr.t, x: 0, y: 13, size: 6.2, style: "Bold", color: cWhite, width: 98, align: "CENTER" });
      prX += 102;
    });

    const quarters = [
      { q: "Q1 2026", goal: "MRR Rp 12 Jt", sub: "3 Klien Pertama\nSetup WA CS <60s\nEksekusi Sprint W1-2" },
      { q: "Q2 2026", goal: "MRR Rp 20 Jt", sub: "5 Retainer HERO\nProgram Referral 500k\nStabilisasi SOP DIP" },
      { q: "Q3 2026", goal: "Akumulasi 130 Jt", sub: "Retensi Klien > 80%\nDownsell Web Express\nScale CBO +20%/48j" },
      { q: "Q4 2026", goal: "OMZET RP 200 JT", sub: "Ekspansi VIP B2B\nPencapaian Target Net\nPembagian Dividen" }
    ];

    let qX = 8;
    quarters.forEach((q, i) => {
      const qBox = figma.createFrame();
      qBox.x = qX; qBox.y = 58; qBox.resize(98, 96);
      qBox.cornerRadius = 4;
      qBox.fills = [{ type: "SOLID", color: i === 3 ? { r: 1, g: 0.95, b: 0.9 } : cWhite }];
      qBox.strokes = [{ type: "SOLID", color: i === 3 ? cVermillion : cBorder }];
      qBox.strokeWeight = i === 3 ? 1.5 : 1;
      b1_3.appendChild(qBox);

      const qHead = figma.createFrame();
      qHead.x = 0; qHead.y = 0; qHead.resize(98, 16);
      qHead.fills = [{ type: "SOLID", color: i === 3 ? cVermillion : cNavy }];
      qBox.appendChild(qHead);
      createTxt(qHead, { text: q.q, x: 0, y: 2, size: 7.5, style: "Mono Bold", color: cGold, width: 98, align: "CENTER" });

      createTxt(qBox, { text: q.goal, x: 4, y: 19, size: 7.8, style: "Bold", color: i === 3 ? cCrimson : cNavy, width: 90, align: "CENTER" });
      createTxt(qBox, { text: q.sub, x: 4, y: 34, size: 6.8, style: "Regular", color: cDark, width: 90, align: "CENTER" });

      qX += 102;
    });

    const kpiF = figma.createFrame();
    kpiF.x = 8; kpiF.y = 160; kpiF.resize(404, 52);
    kpiF.cornerRadius = 4;
    kpiF.fills = [{ type: "SOLID", color: { r: 0.94, g: 0.96, b: 0.99 } }];
    kpiF.strokes = [{ type: "SOLID", color: cNavy }];
    b1_3.appendChild(kpiF);

    createTxt(kpiF, { text: "[ TARGET KPI OPERASIONAL EKSEKUTIF ]", x: 8, y: 4, size: 7.5, style: "Mono Bold", color: cNavy });
    createTxt(kpiF, { text: "• MRR: Rp 16.000.000 – Rp 20.000.000 / Bulan (Target Tahunan: Rp 200.000.000 Net)\n• Traffic: CPR Advantage+ CBO < Rp 10.000 | Closing Rate Konsultasi > 25%\n• Kecepatan Produksi: Web .com live < 5 hari, LCP < 1.5 detik, Chat CS < 60 detik.", x: 8, y: 16, size: 7, style: "Medium", color: cDark, width: 388 });

    // Box 1.4: Value Ladder Funnel (Hero Styling with Vermillion Header & Gold Glow)
    const b1_4 = createBox(borang, {
      name: "Bagian_V_Value_Ladder",
      x: 1302, y: 176, w: 420, h: 220,
      title: "BAGIAN V: VALUE LADDER FUNNEL (TANGGA PENAWARAN HERO)",
      headerBg: cVermillion,
      kicker: "[ REVENUE ENGINE ]",
      boxBg: { r: 1.0, g: 0.99, b: 0.97 },
      boxBorder: cVermillion,
      boxStroke: 2
    });

    const tiers = [
      { lvl: "LEVEL 0: LEAD MAGNET", price: "GRATIS (Rp 0)", feat: "Audit Celah Web & Iklan 15 Mnt Mas Tiar (Arya) -> 15-25 kontak WA", bg: cWhite, border: cBorder, tagBg: cNavy, w: 340 },
      { lvl: "LEVEL 1: TRIPWIRE", price: "Rp 1.500.000 – Rp 2.500.000", feat: "Website Custom Express Toko Online (Deliverables Web Next.js LCP < 1.5s)", bg: cWhite, border: cBorder, tagBg: cNavy, w: 365 },
      { lvl: "LEVEL 2: CORE HERO OFFER [UTAMA]", price: "Rp 4.000.000 / Bln (DP Rp 2 Jt)", feat: "Flagship HERO: Official Web .com + 20 Konten + Ads CBO + Google Ads + Mentoring", bg: { r: 1, g: 0.96, b: 0.90 }, border: cVermillion, tagBg: cVermillion, w: 404 },
      { lvl: "LEVEL 3: VIP CORPORATE B2B", price: "Rp 7.500.000 – Rp 12.000.000 / Bln", feat: "Retainer Omni-Channel Multi-Brand (Scale Agresif, Tender, Multi-Funnel)", bg: cWhite, border: cBorder, tagBg: cNavy, w: 385 }
    ];

    let tY = 25;
    tiers.forEach((tr, i) => {
      const tf = figma.createFrame();
      tf.x = 8; tf.y = tY; tf.resize(tr.w, 44);
      tf.cornerRadius = 4;
      tf.fills = [{ type: "SOLID", color: tr.bg }];
      tf.strokes = [{ type: "SOLID", color: tr.border }];
      tf.strokeWeight = i === 2 ? 2 : 1;
      b1_4.appendChild(tf);

      const lBadge = figma.createFrame();
      lBadge.x = 4; lBadge.y = 4; lBadge.resize(116, 16);
      lBadge.cornerRadius = 3;
      lBadge.fills = [{ type: "SOLID", color: tr.tagBg }];
      tf.appendChild(lBadge);
      createTxt(lBadge, { text: tr.lvl, x: 0, y: 2, size: 6.5, style: "Mono Bold", color: cWhite, width: 116, align: "CENTER" });

      createTxt(tf, { text: tr.price, x: 124, y: 4, size: 8, style: "Bold", color: i === 2 ? cCrimson : cNavy });
      createTxt(tf, { text: tr.feat, x: 8, y: 23, size: 7, style: "Medium", color: cDark, width: tr.w - 16 });

      tY += 48;
    });

    // =========================================================================
    // ROW 2: STRATEGIC MATRICES (y: 404, h: 195)
    // =========================================================================

    // Box 2.1: 9 Blok BMC Grounded
    const b2_1 = createBox(borang, {
      name: "Bagian_VI_1_BMC_9_Blok",
      x: 32, y: 404, w: 545, h: 195,
      title: "BAGIAN VI.1: BUSINESS MODEL CANVAS SBU (9 BLOK GROUNDED)",
      kicker: "Unit Economics Sehat"
    });

    const bmcBlocks = [
      { code: "KP", name: "KEY PARTNERS", x: 6, y: 25, w: 102, h: 110, txt: "Cloudflare & Vercel, Meta Ads Agency Whitelist, Komunitas UMKM Jatim, Mitra Referral B2B." },
      { code: "KA", name: "KEY ACTIVITIES", x: 112, y: 25, w: 104, h: 53, txt: "Riset web search, produksi 20 konten, coding web Next.js, media buying CBO." },
      { code: "KR", name: "KEY RESOURCES", x: 112, y: 82, w: 104, h: 53, txt: "Tim Bachtiar Aryansyah Putra (Mas Tiar / Arya), Fadhil, Fifa, server edge, Panduan Visual Resmi, master todolist." },
      { code: "VP", name: "VALUE PROPOSITIONS", x: 220, y: 25, w: 112, h: 110, txt: "[ PAKET HERO Rp 4 Jt/Bln ]\nSolusi 6-in-1, DP Rp 2 Jt SPK, web kilat LCP < 1.5s, 20 konten feed & video, ads CBO, 3x mentoring." },
      { code: "CR", name: "CUSTOMER RELATIONS", x: 336, y: 25, w: 100, h: 53, txt: "Respon WA < 60s, Friday Impact Pulse jam 16:00, 3x Mentoring Zoom." },
      { code: "CH", name: "CHANNELS", x: 336, y: 82, w: 100, h: 53, txt: "WhatsApp resmi, website djadicreative.com, IG @djadi.creative, Meta Ads." },
      { code: "CS", name: "CUSTOMER SEGEGMENT", x: 440, y: 25, w: 99, h: 110, txt: "Brand D2C, Kuliner F&B, Skincare, Fashion, Klinik, Kontraktor Surabaya-SDA (Omzet 20-150 Jt)." }
    ];

    bmcBlocks.forEach(b => {
      const bf = figma.createFrame();
      bf.x = b.x; bf.y = b.y; bf.resize(b.w, b.h);
      bf.cornerRadius = 4;
      bf.fills = [{ type: "SOLID", color: b.code === "VP" ? { r: 1, g: 0.97, b: 0.92 } : cWhite }];
      bf.strokes = [{ type: "SOLID", color: b.code === "VP" ? cVermillion : cBorder }];
      bf.strokeWeight = b.code === "VP" ? 1.5 : 1;
      b2_1.appendChild(bf);

      const bh = figma.createFrame();
      bh.x = 0; bh.y = 0; bh.resize(b.w, 14);
      bh.fills = [{ type: "SOLID", color: b.code === "VP" ? cVermillion : cNavy }];
      bf.appendChild(bh);
      createTxt(bh, { text: b.code + ": " + b.name, x: 4, y: 1, size: 6.2, style: "Mono Bold", color: cWhite });

      createTxt(bf, { text: b.txt, x: 4, y: 16, size: 6.2, style: "Regular", color: cDark, width: b.w - 8 });
    });

    const costF = figma.createFrame();
    costF.x = 6; costF.y = 139; costF.resize(263, 50);
    costF.cornerRadius = 4;
    costF.fills = [{ type: "SOLID", color: { r: 0.99, g: 0.95, b: 0.95 } }];
    costF.strokes = [{ type: "SOLID", color: cCrimson }];
    b2_1.appendChild(costF);
    createTxt(costF, { text: "[ STRUKTUR BIAYA BULANAN ]", x: 6, y: 3, size: 7, style: "Mono Bold", color: cCrimson });
    createTxt(costF, { text: "Server & Tools: Rp 1.5 Jt | Iklan Mandiri: Rp 1.5 Jt | Operasional Tim: Rp 1.5 Jt\nTotal Biaya: Rp 4.5 Jt / bln (Operasional Efisien & Terkendali).", x: 6, y: 16, size: 6.5, style: "Medium", color: cDark, width: 251 });

    const revF = figma.createFrame();
    revF.x = 276; revF.y = 139; revF.resize(263, 50);
    revF.cornerRadius = 4;
    revF.fills = [{ type: "SOLID", color: { r: 0.94, g: 0.99, b: 0.96 } }];
    revF.strokes = [{ type: "SOLID", color: cGreen }];
    b2_1.appendChild(revF);
    createTxt(revF, { text: "[ LINI PENDAPATAN MASUK ]", x: 6, y: 3, size: 7, style: "Mono Bold", color: cGreen });
    createTxt(revF, { text: "Retainer Rp 16-20 Jt + Downsell Express Rp 2-3.5 Jt = Rp 20 Jt/bln.\nTarget Bersih Tahunan: Rp 200.000.000 / Tahun (Margin Net >= 75%).", x: 6, y: 16, size: 6.5, style: "Medium", color: cDark, width: 251 });

    // Box 2.2: Blue Ocean ERRC Strategy
    const b2_2 = createBox(borang, {
      name: "Bagian_VI_2_ERRC_Grid",
      x: 587, y: 404, w: 545, h: 195,
      title: "2. VALUE INNOVATION (BLUE OCEAN STRATEGY ERRC GRID)",
      kicker: "Diferensiasi Tajam"
    });

    const errcData = [
      { action: "ELIMINATE (HAPUSKAN)", badge: "HAPUS TOTAL", color: cCrimson, bg: { r: 0.99, g: 0.95, b: 0.95 }, items: "• Template Canva murahan yang pasaran dan bikin audiens skeptis.\n• Website WordPress lemot sarang malware dan bikin pengunjung kabur.\n• Istilah meta-jargon asing ('brutalist', 'bento') yang membingungkan klien." },
      { action: "REDUCE (KURANGI)", badge: "KURANGI", color: cOrange, bg: { r: 0.99, g: 0.97, b: 0.94 }, items: "• Waktu tunggu respon chat (dikurangi dari hitungan jam jadi < 60 detik).\n• Ad spend testing boros tanpa isolasi variabel dan The 3-Day Kill Rule.\n• Revisi visual tanpa batas dengan mengunci brief awal SPK & Panduan Visual Resmi." },
      { action: "RAISE (TINGKATKAN)", badge: "TINGKATKAN", color: cCyan, bg: { r: 0.94, g: 0.97, b: 0.99 }, items: "• Kecepatan muat web ke tingkat eksekutif (LCP < 1.5s, PageSpeed 95+).\n• Jangkauan layar feed 3:4 (1080x1440) & video reels 9:16 vertikal.\n• Transparansi progres klien lewat WhatsApp Friday Impact Pulse rutin." },
      { action: "CREATE (CIPTAKAN BARU)", badge: "CIPTAKAN", color: cGreen, bg: { r: 0.94, g: 0.99, b: 0.96 }, items: "• Paket terpadu HERO All-In (Web + 20 Konten + Ads CBO + Mentoring @ Rp 4 Jt).\n• Google Search Ads Brand Defense sebagai perisai anti-bajak nama brand klien.\n• Sistem kerja autonomous multi-agent swarm terintegrasi tanpa ribet." }
    ];

    let erX = [8, 276, 8, 276];
    let erY = [26, 26, 110, 110];
    errcData.forEach((er, i) => {
      const ef = figma.createFrame();
      ef.x = erX[i]; ef.y = erY[i]; ef.resize(261, 78);
      ef.cornerRadius = 4;
      ef.fills = [{ type: "SOLID", color: er.bg }];
      ef.strokes = [{ type: "SOLID", color: er.color }];
      ef.strokeWeight = 1.2;
      b2_2.appendChild(ef);

      const eh = figma.createFrame();
      eh.x = 0; eh.y = 0; eh.resize(261, 16);
      eh.fills = [{ type: "SOLID", color: er.color }];
      ef.appendChild(eh);
      createTxt(eh, { text: er.action + " · " + er.badge, x: 6, y: 2, size: 7.2, style: "Mono Bold", color: cWhite });

      createTxt(ef, { text: er.items, x: 6, y: 20, size: 6.8, style: "Medium", color: cDark, width: 249 });
    });

    // Box 2.3: 7 Area Marketing Identity & Execution
    const b2_3 = createBox(borang, {
      name: "Bagian_VI_3_7_Area_Marketing",
      x: 1142, y: 404, w: 580, h: 195,
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

    let arY = 26;
    areas.forEach(ar => {
      const af = figma.createFrame();
      af.x = 8; af.y = arY; af.resize(564, 21);
      af.cornerRadius = 3;
      af.fills = [{ type: "SOLID", color: cWhite }];
      af.strokes = [{ type: "SOLID", color: cBorder }];
      b2_3.appendChild(af);

      const nb = figma.createFrame();
      nb.x = 2; nb.y = 2; nb.resize(22, 17);
      nb.cornerRadius = 2;
      nb.fills = [{ type: "SOLID", color: cNavy }];
      af.appendChild(nb);
      createTxt(nb, { text: ar.no, x: 0, y: 3, size: 7.5, style: "Mono Bold", color: cGold, width: 22, align: "CENTER" });

      createTxt(af, { text: ar.t + ":", x: 30, y: 4, size: 7.5, style: "Bold", color: cCrimson });
      createTxt(af, { text: ar.d, x: 180, y: 4, size: 7.2, style: "Regular", color: cDark });

      arY += 23;
    });

    // =========================================================================
    // ROW 3: CUSTOMER & MARKET STRATEGY (y: 607, h: 175)
    // =========================================================================

    // Box 3.1: 5 Alasan Customer (Dual Contrast Containers: Red vs Green)
    const b3_1 = createBox(borang, {
      name: "Bagian_VI_4_5_Alasan_Customer",
      x: 32, y: 607, w: 410, h: 175,
      title: "4. 5 ALASAN CUSTOMER MEMILIH DJADI CREATIVE",
      kicker: "Problem vs Solusi"
    });

    // Problem Container
    const probBox = figma.createFrame();
    probBox.x = 8; probBox.y = 25; probBox.resize(394, 52);
    probBox.cornerRadius = 4;
    probBox.fills = [{ type: "SOLID", color: { r: 1.0, g: 0.95, b: 0.95 } }];
    probBox.strokes = [{ type: "SOLID", color: { r: 1.0, g: 0.8, b: 0.8 } }];
    b3_1.appendChild(probBox);

    const probHead = figma.createFrame();
    probHead.x = 0; probHead.y = 0; probHead.resize(394, 15);
    probHead.fills = [{ type: "SOLID", color: cCrimson }];
    probBox.appendChild(probHead);
    createTxt(probHead, { text: "[ MASALAH UMUM UMKM & BRAND D2C ]", x: 6, y: 1.5, size: 6.8, style: "Mono Bold", color: cWhite });
    createTxt(probBox, {
      text: "• Tercekik fee marketplace 15%+, web lemot sering jebol, konten pasaran nol transferan, dan bakar duit iklan tanpa konversi riil.",
      x: 6, y: 18, size: 6.8, style: "Medium", color: cDark, width: 382
    });

    // Solution Container
    const solBox = figma.createFrame();
    solBox.x = 8; solBox.y = 82; solBox.resize(394, 86);
    solBox.cornerRadius = 4;
    solBox.fills = [{ type: "SOLID", color: { r: 0.94, g: 0.99, b: 0.96 } }];
    solBox.strokes = [{ type: "SOLID", color: { r: 0.7, g: 0.92, b: 0.8 } }];
    b3_1.appendChild(solBox);

    const solHead = figma.createFrame();
    solHead.x = 0; solHead.y = 0; solHead.resize(394, 15);
    solHead.fills = [{ type: "SOLID", color: cGreen }];
    solBox.appendChild(solHead);
    createTxt(solHead, { text: "[ SOLUSI HERO DJADI CREATIVE ]", x: 6, y: 1.5, size: 6.8, style: "Mono Bold", color: cWhite });
    createTxt(solBox, {
      text: "1. VALUE: Website mandiri kencang LCP < 1.5s + direct WhatsApp checkout.\n2. DIFFERENCE: Solusi terintegrasi web custom, 20 konten, dan iklan CBO.\n3. PROOF: Lonjakan omzet F&B +320%, Skincare +210%, 1.450+ order WA baru.\n4. REASON: Menunda = membiarkan jutaan rupiah mengalir ke kompetitor.",
      x: 6, y: 18, size: 6.8, style: "Medium", color: cDark, width: 382
    });

    // Box 3.2: 12 Step Assessment
    const b3_2 = createBox(borang, {
      name: "Bagian_VI_5_12_Step_Assessment",
      x: 452, y: 607, w: 410, h: 175,
      title: "5. 12 STEP ASSESSMENT (SKALA AGSI DJADI CREATIVE)",
      kicker: "Alur Eksekusi"
    });
    createTxt(b3_2, {
      text: "01 Inbound WA Disapa Fifa <60s | 02 Kualifikasi 5 menit (Niche & Omzet)\n03 Klaim Free Audit 15 Mnt | 04 Sesi Konsultasi 15 Mnt bersama Mas Tiar (Arya)\n05 Penerbitan Invoice DP Rp 2 Jt & SPK Kontrak Resmi (DJADICUAN500)\n06 Pengisian Welcome Kit Form H-1 & Penyerahan Aset Produk Klien\n07 Rebuild Website Toko Resmi Custom Next.js LCP < 1.5s (Minggu 1)\n08 Produksi Batch 1 Konten Medsos (Feed 3:4 Standar Desain Modern + Reels 9:16)\n09 Setup Meta Ads Advantage+ CBO & Pasang Pixel/CAPI Tracking\n10 Eksekusi The 3-Day Kill Rule & Optimasi CPR < Rp 10.000\n11 Pengiriman Friday Impact Pulse rutin setiap Jumat sore jam 16:00 WIB\n12 Evaluasi Hasil Bersama Mas Tiar (Arya) & Perpanjangan Retainer.",
      x: 8, y: 26, size: 7.2, style: "Medium", color: cDark, width: 394
    });

    // Box 3.3: Market Size TAM/SAM/SOM (Visual Concentric Funnel Bars)
    const b3_3 = createBox(borang, {
      name: "Bagian_VI_6_Market_Size",
      x: 872, y: 607, w: 420, h: 175,
      title: "6. MARKET SIZE & OPPORTUNITY TARGET",
      kicker: "Skala Potensi"
    });

    const marketTiers = [
      { name: "TAM (Total Addressable Market)", num: "64 JUTA UMKM", desc: "Total pemilik usaha di Indonesia yang butuh solusi digitalisasi web & iklan mandiri.", w: 404, bg: { r: 0.9, g: 0.94, b: 0.99 }, border: cNavy },
      { name: "SAM (Serviceable Available Market)", num: "1.5 JUTA BISNIS", desc: "Brand D2C, Toko Online, Kuliner, Skincare, dan Klinik di Jawa Timur & Bali.", w: 330, bg: { r: 0.85, g: 0.92, b: 0.98 }, border: cNavy },
      { name: "SOM (Serviceable Obtainable Market) [UTAMA]", num: "300–500 BRAND", desc: "Fokus radar canvasing Djadi Creative: 4-5 klien retainer aktif simultan (@ Rp 4 Jt/bln).", w: 265, bg: { r: 1, g: 0.96, b: 0.9 }, border: cVermillion }
    ];

    let mY = 26;
    marketTiers.forEach((mt, i) => {
      const mf = figma.createFrame();
      mf.x = 8; mf.y = mY; mf.resize(mt.w, 42);
      mf.cornerRadius = 4;
      mf.fills = [{ type: "SOLID", color: mt.bg }];
      mf.strokes = [{ type: "SOLID", color: mt.border }];
      mf.strokeWeight = i === 2 ? 1.5 : 1;
      b3_3.appendChild(mf);

      createTxt(mf, { text: mt.name + " · " + mt.num, x: 6, y: 3, size: 7.5, style: "Bold", color: i === 2 ? cCrimson : cNavy });
      createTxt(mf, { text: mt.desc, x: 6, y: 16, size: 6.8, style: "Regular", color: cDark, width: mt.w - 12 });

      mY += 46;
    });

    // Box 3.4: 5 Buyer Value & 5 Reason To Buy (Dual Styled Containers)
    const b3_4 = createBox(borang, {
      name: "Bagian_VI_7_Buyer_Value",
      x: 1302, y: 607, w: 420, h: 175,
      title: "7. 5 BUYER VALUE & 8. 5 REASON TO BUY",
      kicker: "Daya Dorong"
    });

    // Buyer Value Container
    const bvBox = figma.createFrame();
    bvBox.x = 8; bvBox.y = 25; bvBox.resize(404, 66);
    bvBox.cornerRadius = 4;
    bvBox.fills = [{ type: "SOLID", color: { r: 0.94, g: 0.97, b: 1.0 } }];
    bvBox.strokes = [{ type: "SOLID", color: { r: 0.75, g: 0.88, b: 0.98 } }];
    b3_4.appendChild(bvBox);

    const bvHead = figma.createFrame();
    bvHead.x = 0; bvHead.y = 0; bvHead.resize(404, 15);
    bvHead.fills = [{ type: "SOLID", color: cNavy }];
    bvBox.appendChild(bvHead);
    createTxt(bvHead, { text: "[ 5 BUYER VALUE (NILAI UTAMA PEMBELI) ]", x: 6, y: 1.5, size: 6.8, style: "Mono Bold", color: cGold });
    createTxt(bvBox, {
      text: "1. Web Kilat LCP < 1.5s | 2. Otoritas Brand Naik (Standar Desain Modern)\n3. Anti-Boncos Bergaransi via The 3-Day Kill Rule | 4. Ketenangan Operasional Friday Pulse\n5. Bimbingan Langsung Praktisi: Akses 3x Zoom 1-on-1 bersama Mas Tiar (Arya).",
      x: 6, y: 18, size: 6.8, style: "Medium", color: cDark, width: 392
    });

    // Reason to Buy Container
    const rbBox = figma.createFrame();
    rbBox.x = 8; rbBox.y = 96; rbBox.resize(404, 72);
    rbBox.cornerRadius = 4;
    rbBox.fills = [{ type: "SOLID", color: { r: 1.0, g: 0.99, b: 0.92 } }];
    rbBox.strokes = [{ type: "SOLID", color: { r: 0.95, g: 0.85, b: 0.5 } }];
    b3_4.appendChild(rbBox);

    const rbHead = figma.createFrame();
    rbHead.x = 0; rbHead.y = 0; rbHead.resize(404, 15);
    rbHead.fills = [{ type: "SOLID", color: cVermillion }];
    rbBox.appendChild(rbHead);
    createTxt(rbHead, { text: "[ 5 REASON TO BUY (ALASAN MEMBELI SEKARANG) ]", x: 6, y: 1.5, size: 6.8, style: "Mono Bold", color: cWhite });
    createTxt(rbBox, {
      text: "• Portofolio riil bukan teori (F&B +320%, Skincare +210%, 1.450+ order WA).\n• Paket All-In paling hemat (1 invoice: programmer, desainer, media buyer).\n• Respon WA super kilat (< 60s oleh Fifa) & Garansi DP Rp 2 Jt SPK aman.",
      x: 6, y: 18, size: 6.8, style: "Medium", color: cDark, width: 392
    });

    // =========================================================================
    // ROW 4: CUSTOMER EXPERIENCE & STRATEGY STRATA (y: 790, h: 140)
    // =========================================================================

    // Box 4.1: 5 Customer Experience Journey (Horizontal 5-Step Pipeline with Chevrons)
    const b4_1 = createBox(borang, {
      name: "Bagian_VI_9_Customer_Journey",
      x: 32, y: 790, w: 545, h: 140,
      title: "9. 5 CUSTOMER EXPERIENCE JOURNEY (ALUR PERJALANAN KLIEN)",
      kicker: "5 Fase Layanan"
    });

    const journeySteps = [
      { step: "01", name: "DEAL LEAD", desc: "Iklan CBO -> WA CS Fifa <60s -> Klaim Audit" },
      { step: "02", name: "KONSULTASI", desc: "Zoom 15 Mnt Mas Tiar (Arya) bedah akun iklan" },
      { step: "03", name: "ONBOARDING", desc: "Invoice DP Rp 2 Jt & SPK -> Form brief produk" },
      { step: "04", name: "EKSEKUSI", desc: "Minggu 1 Web Live, M2 Konten 3:4 & Ads CBO" },
      { step: "05", name: "PULSE REPORT", desc: "Friday Impact Pulse 16:00 -> Evaluasi ROAS" }
    ];

    let jX = 8;
    journeySteps.forEach((js, i) => {
      const jf = figma.createFrame();
      jf.x = jX; jf.y = 28; jf.resize(92, 96);
      jf.cornerRadius = 4;
      jf.fills = [{ type: "SOLID", color: i === 2 ? { r: 1, g: 0.96, b: 0.92 } : cWhite }];
      jf.strokes = [{ type: "SOLID", color: i === 2 ? cVermillion : cNavy }];
      jf.strokeWeight = 1.2;
      b4_1.appendChild(jf);

      const snb = figma.createFrame();
      snb.x = 0; snb.y = 0; snb.resize(92, 18);
      snb.fills = [{ type: "SOLID", color: i === 2 ? cVermillion : cNavy }];
      jf.appendChild(snb);
      createTxt(snb, { text: "FASE " + js.step, x: 0, y: 3, size: 7.2, style: "Mono Bold", color: cGold, width: 92, align: "CENTER" });

      createTxt(jf, { text: js.name, x: 2, y: 22, size: 7.5, style: "Bold", color: i === 2 ? cCrimson : cNavy, width: 88, align: "CENTER" });
      createTxt(jf, { text: js.desc, x: 2, y: 38, size: 6.5, style: "Regular", color: cDark, width: 88, align: "CENTER" });

      // Connecting arrow indicator (if not last)
      if (i < 4) {
        const arr = figma.createFrame();
        arr.x = jX + 94; arr.y = 66; arr.resize(12, 16);
        arr.cornerRadius = 2;
        arr.fills = [{ type: "SOLID", color: cNavy }];
        b4_1.appendChild(arr);
        createTxt(arr, { text: ">", x: 0, y: 2, size: 8, style: "Mono Bold", color: cGold, width: 12, align: "CENTER" });
      }

      jX += 108;
    });

    // Box 4.2: 5 WOW & 5 WOM
    const b4_2 = createBox(borang, {
      name: "Bagian_VI_10_WOW_WOM",
      x: 587, y: 790, w: 545, h: 140,
      title: "10. 5 WOW CLIENT EXPERIENCE & 5 WOM REFERRAL ENGINE",
      kicker: "Viral Referral"
    });
    createTxt(b4_2, {
      text: "[ 5 WOW EXPERIENCE ] Respon Kilat CS Fifa < 60 Detik | Diagnosa Tajam Mas Tiar di Zoom 15 Mnt | Kecepatan Web LCP < 1.5s Terbukti di PageSpeed | Estetika Feed 3:4 Standar Desain Modern | Laporan Transparan Friday Impact Pulse setiap Jumat sore jam 16:00 WIB.\n\n[ 5 WOM REFERRAL ENGINE ]\n1. Cash Reward Referral Rp 500.000 tunai per klien baru yang deal SPK.\n2. Diskon Retainer 10% (Rp 400.000/bln) bagi klien aktif pembawa mitra.\n3. Tagging Showcase Medsos di akun resmi Djadi Creative.\n4. Link Share Free Audit 15 Mnt mudah dibagikan ke grup pengusaha.\n5. Bukti Transferan Kasir WhatsApp riil yang memicu cerita ke sesama owner.",
      x: 8, y: 26, size: 7.2, style: "Medium", color: cDark, width: 529
    });

    // Box 4.3: The Seven Strata of Strategy (7 Clean Pill Spines)
    const b4_3 = createBox(borang, {
      name: "Bagian_VI_11_Seven_Strata",
      x: 1142, y: 790, w: 580, h: 140,
      title: "11. THE SEVEN STRATA OF STRATEGY (7 LAPIS KEUNGGULAN)",
      kicker: "Benteng Agensi"
    });

    const strataItems = [
      { no: "1", t: "Positioning", d: "Agensi pertumbuhan bisnis modern pengawal omzet Rp 200 Jt" },
      { no: "2", t: "Sandbox", d: "Ekosistem web mandiri kencang, 20 konten estetik, iklan CBO" },
      { no: "3", t: "Brand Promise", d: "Kepuasan terjamin via SPK resmi & Friday Pulse transparan" },
      { no: "4", t: "One-Phrase", d: "'Urusan Iklan & Konten, Semua Beres Djadi!'" },
      { no: "5", t: "Activities", d: "Standar Desain Modern + Next.js LCP < 1.5s + The 3-Day Kill Rule" },
      { no: "6", t: "10x Advantage", d: "Tim responsif (<60s), AI autonomous swarm, anti-yes-man" },
      { no: "7", t: "Profit per X", d: "Profit stabil Rp 3.000.000 - Rp 3.500.000 Net per klien aktif" }
    ];

    let stY = 25;
    strataItems.forEach(st => {
      const stf = figma.createFrame();
      stf.x = 8; stf.y = stY; stf.resize(564, 14);
      stf.cornerRadius = 2;
      stf.fills = [{ type: "SOLID", color: cWhite }];
      b4_3.appendChild(stf);

      createTxt(stf, { text: st.no + ".", x: 2, y: 0, size: 7, style: "Mono Bold", color: cCrimson });
      createTxt(stf, { text: st.t + ":", x: 20, y: 0, size: 7, style: "Bold", color: cNavy });
      createTxt(stf, { text: st.d, x: 120, y: 0, size: 6.8, style: "Regular", color: cDark });

      stY += 16;
    });

    // =========================================================================
    // ROW 5: POSITIONING, AUDIT & PENGESAHAN EKSEKUTIF (y: 938, h: 278)
    // =========================================================================

    // Box 5.1: Winning Zone 2x2 Scatter Positioning Map (Visual 2x2 Grid)
    const b5_1 = createBox(borang, {
      name: "Bagian_VI_16_Winning_Zone",
      x: 32, y: 938, w: 405, h: 278,
      title: "16. MATRIKS POSISIONING PASAR 2x2 (WINNING ZONE)",
      kicker: "Peta Kuadran"
    });

    const winQuads = [
      {
        code: "Q2", title: "RISKY ZONE (KONSULTAN)",
        x: 8, y: 26, w: 188, h: 104,
        bg: { r: 0.98, g: 0.98, b: 0.98 }, border: cOrange,
        hColor: cOrange,
        txt: "Biaya Belasan Juta Rupiah\n• Banyak teori mindset/finansial\n• Nol eksekusi teknis web/iklan\n• Klien dibiarkan pusing sendiri"
      },
      {
        code: "Q1", title: "WINNING ZONE (DJADI CREATIVE)",
        x: 204, y: 26, w: 193, h: 104,
        bg: { r: 1.0, g: 0.96, b: 0.91 }, border: cVermillion,
        hColor: cVermillion,
        txt: "PAKET HERO ALL-IN (Rp 4 Jt/Bln)\n• Web Custom LCP < 1.5s kilat\n• 20 Konten Standar Desain Modern\n• Ads CBO & Mentoring Mas Tiar"
      },
      {
        code: "Q3", title: "DUMB ZONE (BOT SPAM ABAL)",
        x: 8, y: 136, w: 188, h: 106,
        bg: { r: 0.98, g: 0.98, b: 0.98 }, border: cNavy,
        hColor: cNavy,
        txt: "Software Bot Massal Murahan\n• Risiko banned nomor WA klien\n• Rusak reputasi & citra brand\n• Nol konversi pembeli riil"
      },
      {
        code: "Q4", title: "LOSING ZONE (AGENSI CANVA)",
        x: 204, y: 136, w: 193, h: 106,
        bg: { r: 0.98, g: 0.98, b: 0.98 }, border: cCrimson,
        hColor: cCrimson,
        txt: "Jasa Desain Rp 200k - 500k\n• Template pasaran bikin skeptis\n• Nol website & strategi iklan\n• Lepas tangan saat iklan boncos"
      }
    ];

    winQuads.forEach(wq => {
      const wqf = figma.createFrame();
      wqf.x = wq.x; wqf.y = wq.y; wqf.resize(wq.w, wq.h);
      wqf.cornerRadius = 4;
      wqf.fills = [{ type: "SOLID", color: wq.bg }];
      wqf.strokes = [{ type: "SOLID", color: wq.border }];
      wqf.strokeWeight = wq.code === "Q1" ? 1.5 : 1;
      b5_1.appendChild(wqf);

      const wqh = figma.createFrame();
      wqh.x = 0; wqh.y = 0; wqh.resize(wq.w, 16);
      wqh.fills = [{ type: "SOLID", color: wq.hColor }];
      wqf.appendChild(wqh);
      createTxt(wqh, { text: wq.title, x: 6, y: 2, size: 6.8, style: "Mono Bold", color: cWhite });

      createTxt(wqf, { text: wq.txt, x: 6, y: 20, size: 6.8, style: "Medium", color: cDark, width: wq.w - 12 });
    });

    createTxt(b5_1, {
      text: "Sumbu Vertikal: Nilai Strategis & Otoritas | Sumbu Horizontal: Eksekusi Nyata",
      x: 8, y: 252, size: 6.8, style: "Mono Bold", color: cNavy, width: 389, align: "CENTER"
    });

    // Box 5.2: Audit Internal 5M & Brutal Facts
    const b5_2 = createBox(borang, {
      name: "Bagian_VI_17_Audit_5M",
      x: 447, y: 938, w: 415, h: 278,
      title: "17. AUDIT INTERNAL 5M & BRUTAL FACTS",
      kicker: "Kesiapan Operasi"
    });

    const m5Items = [
      { m: "MAN", txt: "B. Aryansyah Putra (Lead), Fadhil (Art), Fifa (Ops)", status: "SOLID", bg: cGreen },
      { m: "MACHINE", txt: "Server Edge Next.js, React Remotion, Meta CBO", status: "OPTIMAL", bg: cCyan },
      { m: "MATERIAL", txt: "Web .com Resmi, 20 Konten, SPK, Video 9:16", status: "READY", bg: cGold, sColor: cNavy },
      { m: "MONEY", txt: "Target Rp 200 Jt/Thn (MRR Rp 16-20 Jt | Net >= 75%)", status: "HEALTHY", bg: cGreen },
      { m: "METHOD", txt: "The 3-Day Kill Rule, Golden Scale, Friday Pulse", status: "STANDARDIZED", bg: cNavy }
    ];

    let m5Y = 26;
    m5Items.forEach(item => {
      const mf = figma.createFrame();
      mf.x = 8; mf.y = m5Y; mf.resize(399, 21);
      mf.cornerRadius = 3;
      mf.fills = [{ type: "SOLID", color: cWhite }];
      mf.strokes = [{ type: "SOLID", color: cBorder }];
      b5_2.appendChild(mf);

      const mb = figma.createFrame();
      mb.x = 2; mb.y = 2; mb.resize(55, 17);
      mb.cornerRadius = 2;
      mb.fills = [{ type: "SOLID", color: cNavy }];
      mf.appendChild(mb);
      createTxt(mb, { text: item.m, x: 0, y: 3, size: 7, style: "Mono Bold", color: cGold, width: 55, align: "CENTER" });

      createTxt(mf, { text: item.txt, x: 62, y: 4, size: 6.8, style: "Bold", color: cDark });

      const sb = figma.createFrame();
      sb.x = 320; sb.y = 2; sb.resize(75, 17);
      sb.cornerRadius = 2;
      sb.fills = [{ type: "SOLID", color: item.bg }];
      mf.appendChild(sb);
      createTxt(sb, { text: item.status, x: 0, y: 3, size: 6.5, style: "Mono Bold", color: item.sColor || cWhite, width: 75, align: "CENTER" });

      m5Y += 24;
    });

    const bfBox = figma.createFrame();
    bfBox.x = 8; bfBox.y = 150; bfBox.resize(399, 116);
    bfBox.cornerRadius = 4;
    bfBox.fills = [{ type: "SOLID", color: { r: 0.99, g: 0.95, b: 0.95 } }];
    bfBox.strokes = [{ type: "SOLID", color: cCrimson }];
    b5_2.appendChild(bfBox);

    const bfh = figma.createFrame();
    bfh.x = 0; bfh.y = 0; bfh.resize(399, 16);
    bfh.fills = [{ type: "SOLID", color: cCrimson }];
    bfBox.appendChild(bfh);
    createTxt(bfh, { text: "[ 3 REALITAS PAHIT PASAR (BRUTAL FACTS) ]", x: 8, y: 2, size: 7.2, style: "Mono Bold", color: cWhite });

    createTxt(bfBox, {
      text: "1. Web Lambat = Pembeli Kabur: 60% pembeli menutup tab jika loading > 2 detik. Web custom code Next.js LCP < 1.5s adalah harga mati konversi.\n2. Iklan Statis Boncos: Foto polos di 2026 diabaikan audiens; wajib video pendek vertikal 9:16 dengan hook kinetik 3 detik pertama.\n3. CS Lambat = Uang Hilang: Respon chat > 15 menit membuat 80% calon pembeli beralih ke kompetitor. Disiplin CS Fifa < 60 detik mengunci transfer DP Rp 2 Jt.",
      x: 8, y: 22, size: 6.8, style: "Medium", color: cDark, width: 383
    });

    // Box 5.3: Action Engine Scale-Up
    const b5_3 = createBox(borang, {
      name: "Bagian_VI_18_Action_Engine",
      x: 872, y: 938, w: 400, h: 278,
      title: "18. ACTION ENGINE SCALE-UP (8 TAHAP & MARKETING MIX)",
      kicker: "Jadwal Sprint"
    });

    const sprintCol1 = [
      "01 Standar Aset Master Web & Desain",
      "02 Aktivasi Respon WA CS < 60 Detik",
      "03 Launching Kampanye Ads CBO",
      "04 Onboarding 3 Klien Pertama (12 Jt)"
    ];
    const sprintCol2 = [
      "05 Stabilisasi 5 Retainer HERO (20 Jt)",
      "06 Rutinitas Friday Impact Pulse",
      "07 Aktivasi Downsell Web Express",
      "08 Capaian Target Omzet Rp 200 Jt"
    ];

    let spY = 26;
    for (let i = 0; i < 4; i++) {
      const c1 = figma.createFrame();
      c1.x = 8; c1.y = spY; c1.resize(188, 22);
      c1.cornerRadius = 3;
      c1.fills = [{ type: "SOLID", color: cWhite }];
      c1.strokes = [{ type: "SOLID", color: cBorder }];
      b5_3.appendChild(c1);
      createTxt(c1, { text: sprintCol1[i], x: 4, y: 4, size: 6.5, style: "Bold", color: cDark });

      const c2 = figma.createFrame();
      c2.x = 202; c2.y = spY; c2.resize(188, 22);
      c2.cornerRadius = 3;
      c2.fills = [{ type: "SOLID", color: i === 3 ? { r: 1, g: 0.95, b: 0.9 } : cWhite }];
      c2.strokes = [{ type: "SOLID", color: i === 3 ? cVermillion : cBorder }];
      b5_3.appendChild(c2);
      createTxt(c2, { text: sprintCol2[i], x: 4, y: 4, size: 6.5, style: "Bold", color: i === 3 ? cCrimson : cDark });

      spY += 25;
    }

    const mmBox = figma.createFrame();
    mmBox.x = 8; mmBox.y = 132; mmBox.resize(384, 136);
    mmBox.cornerRadius = 4;
    mmBox.fills = [{ type: "SOLID", color: cWhite }];
    mmBox.strokes = [{ type: "SOLID", color: cNavy }];
    b5_3.appendChild(mmBox);

    const mmh = figma.createFrame();
    mmh.x = 0; mmh.y = 0; mmh.resize(384, 16);
    mmh.fills = [{ type: "SOLID", color: cNavy }];
    mmBox.appendChild(mmh);
    createTxt(mmh, { text: "[ 4 SALURAN AKUISISI TERPADU (TOTAL MARKETING) ]", x: 8, y: 2, size: 7.2, style: "Mono Bold", color: cGold });

    const mmChannels = [
      { t: "INBOUND MARKETING", d: "Free Audit 15 Mnt Mas Tiar + Mockup Toko Mandiri", bg: { r: 0.94, g: 0.97, b: 1 } },
      { t: "ORGANIC RETENTION", d: "20 Konten Campuran (Feed 3:4 & Video Reels 9:16)", bg: { r: 0.94, g: 0.99, b: 0.96 } },
      { t: "OUTBOUND SNIPER", d: "Scouting G-Maps + DM Instagram Tertarget (10/hari)", bg: { r: 0.99, g: 0.97, b: 0.94 } },
      { t: "PAID TRAFFIC ENGINE", d: "Meta Advantage+ CBO + Google Search Brand Defense", bg: { r: 1, g: 0.96, b: 0.92 } }
    ];

    let mmY = 22;
    mmChannels.forEach(ch => {
      const chf = figma.createFrame();
      chf.x = 6; chf.y = mmY; chf.resize(372, 24);
      chf.cornerRadius = 3;
      chf.fills = [{ type: "SOLID", color: ch.bg }];
      mmBox.appendChild(chf);

      createTxt(chf, { text: ch.t + ":", x: 6, y: 5, size: 6.8, style: "Mono Bold", color: cCrimson });
      createTxt(chf, { text: ch.d, x: 120, y: 5, size: 6.5, style: "Regular", color: cDark });

      mmY += 27;
    });

    // Box 5.4: Pengesahan Eksekutif & Official Verified Seal
    const b5_4 = createBox(borang, {
      name: "Bagian_VII_Segmen_Pengesahan",
      x: 1282, y: 938, w: 440, h: 278,
      title: "BAGIAN VII: SEGMEN UTAMA & PENGESAHAN EKSEKUTIF",
      headerBg: cCrimson,
      kicker: "Resmi Disahkan"
    });

    createTxt(b5_4, {
      text: "[ REKOMENDASI SEGMEN UTAMA: Pemilik Brand D2C & UMKM Bertumbuh ]\nAlasan Strategis: Segmen berdaya beli tinggi (omzet Rp 20-150 Jt/bln) yang paling sakit tercekik fee marketplace 15%+ atau pernah boncos iklan, dan siap investasi Paket HERO Rp 4 Jt/bln (DP Rp 2 Jt SPK) demi ekosistem mandiri.\n\nVisi Agensi:\n“Menjadi agensi pertumbuhan bisnis modern terdepan di Indonesia yang menggaransi ekosistem digital (website custom code, konten media sosial 3:4 & 9:16, iklan CBO terukur, dan mentoring) terintegrasi tanpa ribet.”\n\nDitetapkan di Sidoarjo & Surabaya pada tanggal 4 November 2026.",
      x: 8, y: 26, size: 7.2, style: "Medium", color: cDark, width: 424
    });

    // Signatures Frame
    const sigFrame = figma.createFrame();
    sigFrame.x = 8; sigFrame.y = 152; sigFrame.resize(424, 116);
    sigFrame.cornerRadius = 6;
    sigFrame.fills = [{ type: "SOLID", color: cWhite }];
    sigFrame.strokes = [{ type: "SOLID", color: cNavy }];
    b5_4.appendChild(sigFrame);

    // Left Signature: Tim Operasional (Fadhil & Fifa)
    createTxt(sigFrame, { text: "Disusun Oleh Tim Operasional:", x: 10, y: 8, size: 7.2, style: "Bold", color: cDark });
    createTxt(sigFrame, { text: "[ Tanda Tangan Terverifikasi ]", x: 10, y: 26, size: 7.2, style: "Mono Bold", color: cNavy });
    createTxt(sigFrame, { text: "Fadhil (CCO) & Fifa Nur Haliza (COO)", x: 10, y: 44, size: 7.8, style: "Bold", color: cCrimson });
    createTxt(sigFrame, { text: "Art Direction & Client Operations Lead\nDjadi Creative Holding", x: 10, y: 58, size: 6.8, style: "Regular", color: cDark });

    // Center Official Gold Seal Stamp
    const seal = figma.createFrame();
    seal.name = "Official_Verified_Seal";
    seal.x = 166; seal.y = 12; seal.resize(90, 90);
    seal.cornerRadius = 45;
    seal.fills = [{ type: "SOLID", color: cGold }];
    seal.strokes = [{ type: "SOLID", color: cCrimson }];
    seal.strokeWeight = 2;
    sigFrame.appendChild(seal);

    const sealInner = figma.createFrame();
    sealInner.x = 5; sealInner.y = 5; sealInner.resize(80, 80);
    sealInner.cornerRadius = 40;
    sealInner.fills = [{ type: "SOLID", color: cNavy }];
    seal.appendChild(sealInner);

    createTxt(sealInner, { text: "OFFICIAL", x: 0, y: 8, size: 7, style: "Mono Bold", color: cGold, width: 80, align: "CENTER" });
    createTxt(sealInner, { text: "DJADI", x: 0, y: 20, size: 11, style: "ExtraBold", color: cWhite, width: 80, align: "CENTER" });
    createTxt(sealInner, { text: "VERIFIED", x: 0, y: 35, size: 7, style: "Mono Bold", color: cVermillion, width: 80, align: "CENTER" });
    createTxt(sealInner, { text: "B. ARYANSYAH P.", x: 0, y: 49, size: 6.2, style: "Bold", color: cWhite, width: 80, align: "CENTER" });
    createTxt(sealInner, { text: "SCALE-UP 2026", x: 0, y: 61, size: 6, style: "Mono Bold", color: cGold, width: 80, align: "CENTER" });

    // Right Signature: Bachtiar Aryansyah Putra (Founder)
    createTxt(sigFrame, { text: "Disetujui & Diresmikan Oleh:", x: 268, y: 8, size: 7.2, style: "Bold", color: cDark });
    createTxt(sigFrame, { text: "[ Tanda Tangan Terverifikasi ]", x: 268, y: 26, size: 7.2, style: "Mono Bold", color: cNavy });
    createTxt(sigFrame, { text: "Bachtiar Aryansyah Putra", x: 268, y: 44, size: 8.2, style: "ExtraBold", color: cCrimson });
    createTxt(sigFrame, { text: "(Mas Tiar / Arya)", x: 268, y: 58, size: 7.5, style: "Bold", color: cDark });
    createTxt(sigFrame, { text: "Founder & Principal Growth Orchestrator\nDjadi Creative Holding", x: 268, y: 72, size: 6.8, style: "Regular", color: cDark });

    // 4. Focus viewport on the new Borang A3 frame
    figma.viewport.scrollAndZoomIntoView([borang]);

    return {
      success: true,
      frameId: borang.id,
      name: borang.name,
      x: borang.x,
      y: borang.y,
      width: borang.width,
      height: borang.height
    };
  `;

  const res = await callPlugin("execute", { code });
  console.log("Execution Result:", JSON.stringify(res, null, 2));

  if (res && res.value && res.value.frameId) {
    const snap = await callPlugin("get_screenshot", { nodeId: res.value.frameId, format: "png", scale: 1 });
    const buf = Buffer.from(snap.data, "base64");
    const out = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/figma_master_borang_a3_verified_final.png";
    writeFileSync(out, buf);
    console.log("High-res screenshot saved to:", out, "Size:", buf.length, "bytes");
  }
}

main().catch(console.error);
