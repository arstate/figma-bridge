import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

async function main() {
  console.log("Starting Master Borang A3 Generation in Figma...");

  const code = `
    // 1. Load All Required Fonts
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "SemiBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Regular" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });

    // 2. Check for existing Borang frame and remove if present
    const existing = figma.currentPage.findOne(n => n.name === "MASTER_BORANG_SCALE_UP_DJADI_CREATIVE_A3");
    if (existing) existing.remove();

    // 3. Create Main A3 Frame (Landscape: 1754 x 1240 px)
    const borang = figma.createFrame();
    borang.name = "MASTER_BORANG_SCALE_UP_DJADI_CREATIVE_A3";
    borang.x = 5098; // Situated neatly under Poster 14
    borang.y = 400;   // Below the main row
    borang.resize(1754, 1240);
    borang.fills = [{ type: "SOLID", color: { r: 0.969, g: 0.957, b: 0.925 } }]; // Warm Cream (#F7F4EC)
    borang.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }]; // Deep Navy
    borang.strokeWeight = 3;
    figma.currentPage.appendChild(borang);

    // Color Constants (GSM v2.5)
    const cNavy = { r: 0.004, g: 0.161, b: 0.412 };    // #012969
    const cGold = { r: 0.961, g: 0.620, b: 0.043 };    // #F59E0B
    const cVermillion = { r: 1.0, g: 0.243, b: 0.114 }; // #FF3E1D
    const cCrimson = { r: 0.702, g: 0.0, b: 0.106 };   // #B3001B
    const cWhite = { r: 1.0, g: 1.0, b: 1.0 };
    const cDark = { r: 0.059, g: 0.090, b: 0.165 };     // #0F172A
    const cCardBg = { r: 0.985, g: 0.985, b: 0.980 };
    const cBorder = { r: 0.82, g: 0.85, b: 0.89 };
    const cGreen = { r: 0.063, g: 0.725, b: 0.506 };

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

      const box = figma.createFrame();
      box.name = name;
      box.x = x;
      box.y = y;
      box.resize(w, h);
      box.cornerRadius = 8;
      box.fills = [{ type: "SOLID", color: cCardBg }];
      box.strokes = [{ type: "SOLID", color: cNavy }];
      box.strokeWeight = 1.5;
      parent.appendChild(box);

      // Header Bar
      const head = figma.createFrame();
      head.name = "Header";
      head.x = 0;
      head.y = 0;
      head.resize(w, 24);
      head.fills = [{ type: "SOLID", color: headerBg }];
      box.appendChild(head);

      const tTitle = figma.createText();
      tTitle.fontName = { family: "Space Mono", style: "Bold" };
      tTitle.fontSize = 9.5;
      tTitle.characters = title;
      tTitle.fills = [{ type: "SOLID", color: headerColor }];
      tTitle.x = 8;
      tTitle.y = 5;
      head.appendChild(tTitle);

      if (kicker) {
        const tKicker = figma.createText();
        tKicker.fontName = { family: "Space Mono", style: "Bold" };
        tKicker.fontSize = 8.5;
        tKicker.characters = kicker;
        tKicker.fills = [{ type: "SOLID", color: cGold }];
        tKicker.x = w - tKicker.width - 8;
        tKicker.y = 5;
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

    // Left Logo & Subtitle
    const logoSource = await figma.getNodeByIdAsync("812:14769");
    if (logoSource) {
      const l = logoSource.clone();
      l.x = 18;
      l.y = 12;
      headFrame.appendChild(l);
    } else {
      createTxt(headFrame, { text: "DJADI CREATIVE", x: 18, y: 16, size: 22, style: "ExtraBold", color: cNavy });
    }
    createTxt(headFrame, { text: "Modern Digital Growth & Performance Media Agency", x: 18, y: 64, size: 9, style: "Bold", color: cCrimson });

    // Center Title & Motto
    createTxt(headFrame, {
      text: "CETAK BIRU STRATEGIS SCALE-UP & MASTER BORANG BISNIS",
      x: 215, y: 12, size: 19, style: "ExtraBold", color: cNavy
    });
    createTxt(headFrame, {
      text: "DJADI CREATIVE — DIGITAL GROWTH & PERFORMANCE AGENCY (2026–2027)",
      x: 215, y: 36, size: 12.5, style: "Bold", color: cCrimson
    });
    createTxt(headFrame, {
      text: "Integrasi Analisis SWOT & TOWS, 9 Blok BMC Grounded, Value Ladder Funnel & Target Omzet Rp 200.000.000 / Tahun (Net)",
      x: 215, y: 53, size: 9.5, style: "Medium", color: cDark
    });
    createTxt(headFrame, {
      text: "“Urusan Iklan & Konten, Semua Beres Djadi! (Bikin Iklan & Konten Auto Djadi Cuan!)”",
      x: 215, y: 68, size: 9.5, style: "Bold", color: cNavy
    });

    // Right Dark Quote Block (w: 430, h: 72)
    const rBlock = figma.createFrame();
    rBlock.x = 1242;
    rBlock.y = 7;
    rBlock.resize(438, 72);
    rBlock.cornerRadius = 8;
    rBlock.fills = [{ type: "SOLID", color: cNavy }];
    headFrame.appendChild(rBlock);

    createTxt(rBlock, {
      text: "“Satu Invoice, Enam Solusi Pertumbuhan. Ekosistem Digital Beres Total.”",
      x: 12, y: 10, size: 9.5, style: "Bold", color: cGold, width: 414, align: "CENTER"
    });

    // 5 Pills inside Right Block
    const pills = [
      "1 Web .com LCP < 1.5s",
      "2 20 Konten (3:4 & 9:16)",
      "3 Advantage+ CBO",
      "4 Google Ads Defense",
      "5 Mentoring Mas Tiar"
    ];
    let pillX = 10;
    pills.forEach((p, idx) => {
      const pf = figma.createFrame();
      pf.x = pillX;
      pf.y = 38;
      pf.resize(80, 22);
      pf.cornerRadius = 4;
      pf.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.25, b: 0.55 } }];
      rBlock.appendChild(pf);

      const pt = createTxt(pf, { text: p, x: 0, y: 4, size: 7.5, style: "Mono Bold", color: cWhite, width: 80, align: "CENTER" });
      pillX += 85;
    });

    // =========================================================================
    // STATS HIGHLIGHT BAR (y: 118, h: 50, w: 1690)
    // =========================================================================
    const statsCols = [
      {
        title: "🎯 TARGET FINANSIAL AGSI",
        line1: "Rp 16.600.000 – Rp 20.000.000 / Bln",
        line2: "Rp 200.000.000 / Thn | Margin Net >= 75%",
        w: 395, bg: cWhite, border: cNavy
      },
      {
        title: "💰 3 LINI PENDAPATAN (Rp 20 Jt/Bln)",
        line1: "1. Retainer Paket HERO (4-5 Klien @ Rp 4 Jt = Rp 16-20 Jt)",
        line2: "2. Downsell Web Express (Rp 2-3.5 Jt) | 3. VIP B2B (Rp 7.5-12 Jt)",
        w: 435, bg: cWhite, border: cNavy
      },
      {
        title: "🏆 POSITIONING & 3 PILAR UTAMA",
        line1: "Digital Growth & Performance Agency Partner",
        line2: "1. Web Engineering | 2. GSM v2.5 Art Direct | 3. Paid Media",
        w: 420, bg: cWhite, border: cNavy
      },
      {
        title: "🏢 BAGIAN III: EKOSISTEM 4 BRAND",
        line1: "1. Djadi Creative (Core) | 2. Djadi Web Solutions (Tech)",
        line2: "3. Tiar Property (KPR Jatim) | 4. Akademi Djadi (Referral)",
        w: 420, bg: cWhite, border: cNavy
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
      sf.fills = [{ type: "SOLID", color: sc.bg }];
      sf.strokes = [{ type: "SOLID", color: sc.border }];
      sf.strokeWeight = 1.5;
      borang.appendChild(sf);

      // Mini top badge
      const mb = figma.createFrame();
      mb.x = 0; mb.y = 0; mb.resize(sc.w, 16);
      mb.fills = [{ type: "SOLID", color: cNavy }];
      sf.appendChild(mb);
      createTxt(mb, { text: sc.title, x: 6, y: 2, size: 8, style: "Mono Bold", color: cGold });

      createTxt(sf, { text: sc.line1, x: 8, y: 19, size: 8.5, style: "Bold", color: cCrimson });
      createTxt(sf, { text: sc.line2, x: 8, y: 32, size: 8, style: "Medium", color: cDark });

      sX += sc.w + 10;
    });

    // =========================================================================
    // ROW 1: CORE FOUNDATION (y: 176, h: 220)
    // 4 Columns: Bagian I (410), Bagian II (410), Bagian IV (420), Bagian V (430)
    // =========================================================================
    // Box 1.1: Bagian I - Profil & Kredibilitas
    const b1_1 = createBox(borang, {
      name: "Bagian_I_Profil_Kredibilitas",
      x: 32, y: 176, w: 410, h: 220,
      title: "BAGIAN I: PROFIL RESMI & KREDIBILITAS DJADI CREATIVE",
      kicker: "6 Divisi Spesialis"
    });
    createTxt(b1_1, {
      text: "1.1. Pimpinan & Personel Kunci:\n• Mas Tiar: Founder & Closer Zoom 15 Menit (Mentor Bisnis)\n• Fadhil: CCO & Visual Director (GSM v2.5 Desain Modern Tegas)\n• Arya: Head of Paid Traffic (Advantage+ CBO & Web Engineer)\n• Fifa: COO & Lead Inbound Sales Closer (Respon WA < 60s)\n\n1.2. Track Record & Metrik Kemenangan Klien Riil:\n• F&B Surabaya: Omzet +320%, CPR Rp 7.400 (1.450+ Order WA)\n• Skincare Sidoarjo: Treatment +210%, Web LCP 0.9s, Google #1\n• Fashion Eza Attire: Mandiri bebas fee marketplace 15%\n• Tiar Property: KPR Surabaya-Sidoarjo CPR < Rp 8.000\n\n1.3. Tech Stack & Standar Eksekusi:\nNext.js 15 · Tailwind CSS · React Remotion · Cloudflare Edge · Meta CBO",
      x: 8, y: 30, size: 8.2, style: "Medium", color: cDark, width: 394
    });

    // Box 1.2: Bagian II - Analisis SWOT & TOWS
    const b1_2 = createBox(borang, {
      name: "Bagian_II_SWOT_TOWS",
      x: 452, y: 176, w: 410, h: 220,
      title: "BAGIAN II: ANALISIS SWOT & MATRIKS TOWS STRATEGIS",
      kicker: "Formula Menang"
    });
    createTxt(b1_2, {
      text: "S (Kekuatan): Paket 1 invoice 6 solusi, Web LCP < 1.5s, CS < 60s, CBO CPR < Rp 10rb.\nW (Kelemahan): Kapasitas slot terbatas 4-5 klien, edukasi custom code vs WP.\nO (Peluang): Biaya fee marketplace 15%+ bikin brand butuh web toko mandiri.\nT (Ancaman): Perang harga agensi murah abal-abal, fluktuasi ad spend CPM.\n\n• SO STRATEGY (Agresif): Tembak brand D2C korban fee marketplace via kampanye 'Simpan Profit 15% Utuh di Web Toko Resmi'.\n• WO STRATEGY (Perbaikan): Filter kualifikasi 5 menit oleh Fifa agar Zoom Mas Tiar 100% prospek panas siap bayar DP Rp 2 Jt.\n• ST STRATEGY (Kompetitif): Kunci 200+ negative keywords Google Ads agar brand klien tidak dipalak kompetitor.\n• WT STRATEGY (Defensif): Wajib kontrak SPK & DP Rp 2 Jt komitmen awal.",
      x: 8, y: 30, size: 8.2, style: "Medium", color: cDark, width: 394
    });

    // Box 1.3: Bagian IV - 4 Prioritas & Roadmap
    const b1_3 = createBox(borang, {
      name: "Bagian_IV_Prioritas_Roadmap",
      x: 872, y: 176, w: 410, h: 220,
      title: "BAGIAN IV: 4 PRIORITAS, ROADMAP 2026–2027 & KPI",
      kicker: "Target Rp 200 Jt"
    });
    createTxt(b1_3, {
      text: "P1: Positioning Unggul — Web kenceng LCP < 1.5s + Konten GSM v2.5 + Ads CBO.\nP2: Otoritas Teruji — Portofolio live 10 brand, testimoni riil, Pagespeed 95+.\nP3: Produk Hero — Paket HERO All-In Retainer Rp 4.000.000 / Bulan (DP Rp 2 Jt).\nP4: Monetisasi Sehat — 4-5 klien aktif stabil + 1 web express = Rp 18-20 Jt/bln.\n\nRoadmap Kuartal 2026–2027:\n• Q1: Fondasi & 3 Klien Pertama (MRR Rp 12 Jt, Setup WA CRM Fifa < 60s)\n• Q2: Stabilitas 5 Retainer HERO (MRR Rp 20 Jt, Program Referral Reward 500k)\n• Q3: Retensi Klien > 80% & Downsell Web Express (Akumulasi Rp 130 Jt)\n• Q4: Ekspansi VIP Corporate B2B (Pencapaian Omzet Rp 200 Jt Tuntas)\n\nKPI: MRR Rp 16-20 Jt · CPR < Rp 10rb · Closing WA > 25% · LCP < 1.5s",
      x: 8, y: 30, size: 8.2, style: "Medium", color: cDark, width: 394
    });

    // Box 1.4: Bagian V - Value Ladder Funnel
    const b1_4 = createBox(borang, {
      name: "Bagian_V_Value_Ladder_Table",
      x: 1292, y: 176, w: 430, h: 220,
      title: "BAGIAN V: VALUE LADDER FUNNEL (TANGGA PENAWARAN HERO)",
      kicker: "Level 0 s.d 3"
    });
    createTxt(b1_4, {
      text: "Lv 0: Lead Magnet Gratis (Audit Celah Iklan & Web 15 Mnt Mas Tiar)\n• Investasi: GRATIS (Rp 0,-) | Jaring 15-25 kontak WA prospek/hari\n\nLv 1: Tripwire & Downsell (Website Custom Express Toko Online)\n• Investasi: Rp 1.500.000 – Rp 2.500.000 (One-Time Payment)\n• Deliverables: Web Next.js LCP < 1.2s, Domain .com, WA Checkout\n\nLv 2: Core Flagship Offer (Paket Djadi HERO All-In Retainer)\n• Investasi: Rp 4.000.000 / Bulan (DP Rp 2.000.000 SPK | DJADICUAN500)\n• 6 Deliverables: 1 Official Web .com + 20 Konten Campuran (Feed 3:4 &\n  Reels 9:16) + Ads Advantage+ CBO + Google Brand Defense + 3x Zoom\n  Mentoring Mas Tiar + Friday Impact Pulse tiap Jumat 16:00 WIB\n\nLv 3: VIP Corporate B2B Retainer (Omnichannel Multi-Brand)\n• Investasi: Rp 7.500.000 – Rp 12.000.000 / Bulan (Klinik & Tender)",
      x: 8, y: 30, size: 8.2, style: "Medium", color: cDark, width: 414
    });

    // =========================================================================
    // ROW 2: BUSINESS ARCHITECTURE & BLUE OCEAN (y: 404, h: 195)
    // 3 Columns: BMC (620), Blue Ocean ERRC (580), 7 Area Identity (480)
    // =========================================================================
    // Box 2.1: Business Model Canvas
    const b2_1 = createBox(borang, {
      name: "Bagian_VI_1_BMC_Grounded",
      x: 32, y: 404, w: 620, h: 195,
      title: "BAGIAN VI.1: BUSINESS MODEL CANVAS SBU (9 BLOK GROUNDED DJADI CREATIVE)",
      kicker: "Unit Economics"
    });
    createTxt(b2_1, {
      text: "KP (Key Partners): Cloudflare & Vercel, Meta/Google Ads, Komunitas UMKM Jatim, Mitra Referral B2B.\nKA (Key Activities): Riset web search, produksi 20 konten campuran, coding web Next.js, media buying CBO.\nKR (Key Resources): Persona tim (Tiar, Fadhil, Arya, Fifa), server edge, token GSM v2.5, master todolist.\nVP (Value Propositions): Paket HERO 1 invoice 6 solusi, Web LCP < 1.5s, Ads CPR < Rp 10rb, GSM v2.5.\nCR (Customer Relations): Respon WA CS < 60s, Friday Impact Pulse tiap Jumat 16:00, 3x Zoom Mas Tiar.\nCH (Channels): WhatsApp resmi CS, website djadicreative.com, Instagram @djadi.creative, Meta Ads.\nCS (Customer Segments): Brand D2C, Kuliner F&B, Skincare, Fashion, Klinik, Kontraktor Surabaya-SDA.\nCost: Server & Tools Rp 1.5 Jt | Iklan Mandiri Rp 1.5 Jt | Operasional Rp 1.5 Jt = Total Rp 4.5 Jt/bln.\nRevenue: Retainer Rp 16-20 Jt + Downsell Web Rp 2-3.5 Jt = Target Bersih Rp 200.000.000 / Tahun.",
      x: 8, y: 30, size: 8.1, style: "Medium", color: cDark, width: 604
    });

    // Box 2.2: Blue Ocean ERRC
    const b2_2 = createBox(borang, {
      name: "Bagian_VI_2_Blue_Ocean_ERRC",
      x: 662, y: 404, w: 580, h: 195,
      title: "2. VALUE INNOVATION (BLUE OCEAN STRATEGY ERRC GRID)",
      kicker: "Diferensiasi Tajam"
    });
    createTxt(b2_2, {
      text: "✖ ELIMINATE (Hilangkan Total):\n• Template Canva murahan yang pasaran dan pecah saat dicetak.\n• Website WordPress lemot yang rawan malware dan bikin pembeli kabur.\n• Istilah meta-jargon asing ('brutalist', 'bento') yang membingungkan klien awam.\n\n🔻 REDUCE (Kurangi Signifikan):\n• Waktu tunggu respon chat (dari hitungan jam menjadi < 60 detik oleh Fifa).\n• Ad spend testing yang boros lewat isolasi variabel dan The 3-Day Kill Rule.\n\n🔺 RAISE (Tingkatkan Standar):\n• Kecepatan muat web ke tingkat eksekutif (LCP < 1.5s, PageSpeed 95+).\n• Jangkauan layar HP dengan rasio feed 3:4 (1080x1440) & video reels 9:16.\n\n💡 CREATE (Ciptakan Baru):\n• Paket terpadu Djadi HERO All-In (Web + 20 Konten + Ads CBO + Mentoring @ Rp 4 Jt).\n• Google Search Ads Brand Defense sebagai perisai anti-bajak nama brand klien.",
      x: 8, y: 30, size: 8.1, style: "Medium", color: cDark, width: 564
    });

    // Box 2.3: 7 Area Marketing Identity
    const b2_3 = createBox(borang, {
      name: "Bagian_VI_3_7_Area_Marketing",
      x: 1252, y: 404, w: 470, h: 195,
      title: "3. 7 AREA MARKETING IDENTITY & EXECUTION",
      kicker: "Standar Layanan"
    });
    createTxt(b2_3, {
      text: "01 Analisis Titik Bocor Bisnis: Diagnosa penyebab omzet macet & fee MP.\n02 Audit Web & Iklan Eksisting: Uji PageSpeed & efisiensi ad spend.\n03 Definisi Buyer Persona: Brand D2C & UMKM omzet Rp 20–150 Jt/bln.\n04 Penetapan Tangga Penawaran: Paket HERO Rp 4 Jt (DP Rp 2 Jt SPK).\n05 Alokasi Deliverables: 20 Konten Campuran + Official Web .com.\n06 Tujuan Finansial SMART: Target Rp 18-20 Jt/bln (Rp 200 Jt/Thn).\n07 Strategi Traffic Mandiri: Advantage+ CBO & Google Search Ads.\n08 Infrastruktur CS Kilat: Standar respon WA < 60 detik oleh Fifa.\n09 Keputusan Closing: Zoom 15 Menit Mas Tiar kunci invoice DP Rp 2 Jt.\n10 Eksekusi Produksi: Sprint Web Minggu 1, Batch Konten Minggu 2.\n11 Evaluasi & Scaling: Friday Impact Pulse & scale-up budget +20%.\n12 Komunitas & Referral: Cash reward Rp 500rb per rekomendasi deal.",
      x: 8, y: 30, size: 7.9, style: "Medium", color: cDark, width: 454
    });

    // =========================================================================
    // ROW 3: CUSTOMER PSYCHOLOGY & MARKET SIZE (y: 607, h: 175)
    // 4 Columns: 5 Alasan (420), 12 Step (430), Market Size (380), 5 Buyer Value (430)
    // =========================================================================
    // Box 3.1: 5 Alasan Customer Memilih
    const b3_1 = createBox(borang, {
      name: "5_Alasan_Customer_Memilih",
      x: 32, y: 607, w: 420, h: 175,
      title: "4. 5 ALASAN CUSTOMER MEMILIH DJADI CREATIVE",
      kicker: "Problem vs Solusi"
    });
    createTxt(b3_1, {
      text: "• PROBLEM: Tercekik fee marketplace 15%+, web lemot, iklan boncos, konten amatir, dan waktu founder habis untuk urusan teknis serabutan.\n• VALUE: Website toko resmi mandiri kenceng LCP < 1.5s, direct WA checkout, CPR iklan stabil < Rp 10rb, dan feed estetik 3:4 berwibawa.\n• DIFFERENCE: Satu-satunya agensi yang mengintegrasikan website custom code, 20 konten campuran, iklan CBO, dan mentoring founder dalam 1 paket Rp 4 Jt.\n• PROOF: Lonjakan omzet F&B +320%, Skincare +210%, 1.450+ chat orderan baru.\n• REASON TO ACT: Menunda beresin web & iklan berarti membiarkan jutaan rupiah keuntungan tokomu dipotong marketplace setiap bulan.",
      x: 8, y: 30, size: 8.0, style: "Medium", color: cDark, width: 404
    });

    // Box 3.2: 12 Step Assessment
    const b3_2 = createBox(borang, {
      name: "12_Step_Assessment_Agsi",
      x: 462, y: 607, w: 420, h: 175,
      title: "5. 12 STEP ASSESSMENT (SKALA AGSI DJADI CREATIVE)",
      kicker: "Alur Eksekusi"
    });
    createTxt(b3_2, {
      text: "01 Inbound WA disapa Fifa < 60s | 02 Kualifikasi 5 menit (Niche & Omzet)\n03 Klaim Free Audit 15 Mnt | 04 Sesi Zoom 15 Mnt bersama Mas Tiar\n05 Penerbitan Invoice DP Rp 2 Jt & SPK Kontrak Resmi (DJADICUAN500)\n06 Pengisian Welcome Kit Form H-1 & Penyerahan Aset Produk Klien\n07 Rebuild Website Toko Resmi Custom Next.js LCP < 1.5s (Minggu 1)\n08 Produksi Batch 1 Konten Medsos (Feed 3:4 GSM v2.5 + Reels 9:16)\n09 Setup Meta Ads Advantage+ CBO & Pasang Pixel/CAPI Tracking\n10 Eksekusi The 3-Day Kill Rule & Optimasi CPR < Rp 10.000\n11 Pengiriman Friday Impact Pulse rutin setiap Jumat sore jam 16:00 WIB\n12 Evaluasi Hasil Bersama Mas Tiar & Perpanjangan Retainer Bulan Berikutnya.",
      x: 8, y: 30, size: 7.9, style: "Medium", color: cDark, width: 404
    });

    // Box 3.3: Market Size & Target
    const b3_3 = createBox(borang, {
      name: "Market_Size_Opportunity",
      x: 892, y: 607, w: 390, h: 175,
      title: "6. MARKET SIZE & OPPORTUNITY TARGET",
      kicker: "Skala Potensi"
    });
    createTxt(b3_3, {
      text: "TAM (Total Addressable Market): 64 Juta UMKM\nJutaan pemilik usaha di Indonesia yang butuh solusi digitalisasi iklan & web mandiri.\n\nSAM (Serviceable Available Market): 1,5 Juta Pebisnis\nBrand D2C, Toko Online, Kuliner, Skincare, dan Klinik di Jawa Timur & Bali.\n\nSOM (Serviceable Obtainable Market): 300–500 Brand\nTarget pengusaha tertarget per tahun via iklan Meta & outbound canvasing, fokus mengawal 4–5 klien retainer aktif simultan (@ Rp 4.000.000 / bulan net).",
      x: 8, y: 30, size: 8.1, style: "Medium", color: cDark, width: 374
    });

    // Box 3.4: 5 Buyer Value & 5 Reason to Buy
    const b3_4 = createBox(borang, {
      name: "5_Buyer_Value_Reason_To_Buy",
      x: 1292, y: 607, w: 430, h: 175,
      title: "7. 5 BUYER VALUE & 8. 5 REASON TO BUY",
      kicker: "Daya Dorong"
    });
    createTxt(b3_4, {
      text: "5 BUYER VALUE (Nilai yang Diterima Pembeli):\n1. Kecepatan Web Tak Tertandingi: Toko resmi loading kilat LCP < 1.5s.\n2. Otoritas Brand Naik: Desain modern tegas GSM v2.5 membenarkan harga mahal.\n3. Anti-Boncos Bergaransi: The 3-Day Kill Rule mengunci ad spend aman.\n4. Ketenangan Operasional: Friday Impact Pulse transparan tanpa perlu ditagih.\n5. Bimbingan Langsung Praktisi: Akses 3x Zoom 1-on-1 bersama Mas Tiar.\n\n5 REASON TO BUY (Alasan Membeli Sekarang):\n1. Portofolio riil bukan teori (F&B +320%, Skincare +210%).\n2. Paket All-In paling hemat (1 invoice dapet programmer, desainer, media buyer).\n3. Respon WA super kilat (< 60s oleh Fifa).\n4. Sistem kerja autonomous swarm teruji.\n5. Cash reward referral Rp 500rb bagi mitra pembawa klien.",
      x: 8, y: 30, size: 7.8, style: "Medium", color: cDark, width: 414
    });

    // =========================================================================
    // ROW 4: JOURNEY, 5 WOW & SEVEN STRATA (y: 790, h: 140)
    // 3 Columns: 5 Journey (560), 5 WOW (560), 7 Strata (540)
    // =========================================================================
    // Box 4.1: 5 Customer Experience Journey
    const b4_1 = createBox(borang, {
      name: "5_Customer_Experience_Journey",
      x: 32, y: 790, w: 560, h: 140,
      title: "9. 5 CUSTOMER EXPERIENCE JOURNEY (ALUR PERJALANAN KLIEN)",
      kicker: "5 Fase Layanan"
    });
    createTxt(b4_1, {
      text: "01 SEBELUM DEAL (Lead Magnet): Calon klien melihat iklan/konten Djadi -> Chat WA Fifa < 60s -> Klaim Free Audit Web/Ads 15 Mnt.\n02 SAAT KONSULTASI (Diagnostic): Sesi Zoom 15 menit to the point bersama Mas Tiar membedah 3 titik bocor akun iklan & solusi web.\n03 ONBOARDING RESMI (Welcome Kit): Penerbitan invoice DP Rp 2 Jt & SPK resmi -> Pengisian form brief aset produk di Welcome Kit H-1.\n04 EKSEKUSI PRODUKSI: Sprint 1 Minggu Rebuild Web Next.js LCP < 1.5s -> Rilis 20 Konten Campuran GSM v2.5 -> Aktivasi Advantage+ CBO.\n05 IMPACT PULSE & RENEWAL: Laporan mingguan Friday Impact Pulse jam 16:00 -> Mentoring evaluasi ROAS -> Perpanjangan kontrak retainer.",
      x: 8, y: 30, size: 7.9, style: "Medium", color: cDark, width: 544
    });

    // Box 4.2: 5 WOW & 5 WOM Engine
    const b4_2 = createBox(borang, {
      name: "10_5_WOW_And_5_WOM_Engine",
      x: 602, y: 790, w: 560, h: 140,
      title: "10. 5 WOW CLIENT EXPERIENCE & 5 WOM REFERRAL ENGINE",
      kicker: "Viral Referral"
    });
    createTxt(b4_2, {
      text: "5 WOW EXPERIENCE: Respon Kilat CS Fifa < 60 Detik | Diagnosa Tajam Mas Tiar di Zoom 15 Mnt | Kecepatan Web LCP < 1.5s Terbukti di PageSpeed | Estetika Feed 3:4 Desain Modern Tegas GSM v2.5 | Laporan Transparan Friday Impact Pulse setiap Jumat sore jam 16:00 WIB.\n\n5 WOM (WORD-OF-MOUTH) ENGINE:\n1. Cash Reward Referral Rp 500.000 tunai per klien baru yang deal SPK.\n2. Diskon Retainer 10% (Rp 400.000/bln) bagi klien aktif pembawa mitra.\n3. Tagging Showcase Medsos di akun resmi Djadi Creative.\n4. Link Share Free Audit 15 Mnt mudah dibagikan ke grup pengusaha.\n5. Bukti Transferan Kasir WhatsApp riil yang memicu cerita ke sesama owner.",
      x: 8, y: 30, size: 7.8, style: "Medium", color: cDark, width: 544
    });

    // Box 4.3: The Seven Strata of Strategy
    const b4_3 = createBox(borang, {
      name: "11_The_Seven_Strata_Of_Strategy",
      x: 1172, y: 790, w: 550, h: 140,
      title: "11. THE SEVEN STRATA OF STRATEGY (7 LAPIS KEUNGGULAN)",
      kicker: "Benteng Agensi"
    });
    createTxt(b4_3, {
      text: "1. Positioning: Agensi pertumbuhan bisnis modern terdepan pengawal omzet Rp 200 Jt.\n2. Sandbox: Ekosistem web mandiri kenceng, 20 konten estetik, dan iklan Advantage+.\n3. Brand Promise Guarantee: Kepuasan terjamin via SPK resmi & Friday Pulse transparan.\n4. One-Phrase Strategy: 'Urusan Iklan & Konten, Semua Beres Djadi!'\n5. Differentiating Activities: GSM v2.5 + Next.js LCP < 1.5s + The 3-Day Kill Rule.\n6. 10x Underlying Advantage: Tim responsif (<60s), AI autonomous swarm, anti-yes-man.\n7. Profit per X: Profit stabil Rp 3.000.000 – Rp 3.500.000 Net per klien retainer aktif.",
      x: 8, y: 30, size: 7.8, style: "Medium", color: cDark, width: 534
    });

    // =========================================================================
    // ROW 5 & 6: BOTTOM ANCHOR (y: 938, h: 275)
    // 4 Columns: Winning Zone (390), Audit 5M (410), Action Engine (420), Bagian VII Sign-off (440)
    // =========================================================================
    // Box 5.1: Business Positioning Matrix
    const b5_1 = createBox(borang, {
      name: "Business_Positioning_Winning_Zone",
      x: 32, y: 938, w: 390, h: 275,
      title: "16. BUSINESS POSITIONING (WINNING ZONE)",
      kicker: "Peta Persaingan"
    });
    createTxt(b5_1, {
      text: "★ WINNING ZONE (Zona Menang Mutlak) ★\nDJADI CREATIVE PAKET HERO ALL-IN RETAINER (Rp 4 Jt)\nEkosistem pertumbuhan bisnis nyata: Website custom code kenceng LCP < 1.5s + 20 konten campuran GSM v2.5 + Advantage+ CBO + Mentoring Zoom 1-on-1 Mas Tiar.\n\nLOSING ZONE (Agensi Murah Canva):\nMenjual jasa postingan Rp 200k-500k tanpa strategi iklan, tanpa website, materi pasaran, dan lepas tangan saat boncos.\n\nRISKY ZONE (Konsultan Teori Tanpa Eksekusi):\nBiaya puluhan juta bicara teori mindset/finansial tanpa mau turun tangan bikin website, desain konten, maupun kelola iklan.\n\nDUMB ZONE (Software Bot Otomasi Abal):\nSpamming pesan massal yang rawan blokir nomor dan merusak reputasi.",
      x: 8, y: 28, size: 7.6, style: "Medium", color: cDark, width: 374
    });

    // Box 5.2: Ground Approaches (Audit 5M & Brutal Facts)
    const b5_2 = createBox(borang, {
      name: "Ground_Approaches_Audit_5M",
      x: 432, y: 938, w: 410, h: 275,
      title: "17. AUDIT INTERNAL 5M & BRUTAL FACTS",
      kicker: "Kesiapan Operasi"
    });
    createTxt(b5_2, {
      text: "A. Audit 5M SBU Djadi Creative:\n1. Man: Mas Tiar (Orchestrator), Fadhil (CCO), Arya (Traffic), Fifa (COO).\n2. Machine: Server Edge Next.js, React Remotion, Meta CBO, Figma MCP.\n3. Material: Official Web .com, 20 Konten Campuran, Kontrak SPK, Video 9:16.\n4. Money: Target Omzet Rp 200 Jt/Thn (Rp 18-20 Jt/Bln | Margin Net >= 75%).\n5. Method: The 3-Day Kill Rule, Golden Scale +20%/48j, Friday Impact Pulse.\n\nB. Brutal Facts & Reality Check:\n! Fact 1: 60% pembeli kabur jika web loading > 2 detik; custom code Next.js LCP < 1.5s adalah harga mati konversi.\n! Fact 2: Iklan foto statis di 2026 boncos; wajib hook video kinetik 3 detik.\n! Fact 3: 80% calon klien beralih jika CS respon > 15 menit; disiplin CS Fifa < 60 detik adalah kunci mengunci transfer DP Rp 2 Juta.",
      x: 8, y: 28, size: 7.5, style: "Medium", color: cDark, width: 394
    });

    // Box 5.3: Action Engine Scale-Up
    const b5_3 = createBox(borang, {
      name: "Action_Engine_Scale_Up_8_Tahap",
      x: 852, y: 938, w: 420, h: 275,
      title: "18. ACTION ENGINE SCALE-UP (8 TAHAP EKSEKUSI)",
      kicker: "Jadwal Sprint"
    });
    createTxt(b5_3, {
      text: "01 Standardisasi Aset Master: Web djadicreative.com live LCP < 1.5s & GSM v2.5.\n02 Aktivasi WA CS Kilat: Standar respon < 60s & skrip 3 balon terpasang.\n03 Peluncuran Kampanye Ads: Aktifkan poster campaign 14-20 di Ads Manager.\n04 Onboarding 3 Klien Pertama: Eksekusi Paket HERO (MRR Rp 12.000.000).\n05 Stabilisasi 5 Retainer Aktif: Capai kapasitas penuh (MRR Rp 20.000.000).\n06 Otomasi Friday Impact Pulse: Laporan rutin mingguan tiap Jumat 16:00 WIB.\n07 Aktivasi Downsell Web Express: Solusi alternatif klien budget terbatas.\n08 Capaian Target Finansial: Akumulasi omzet tembus Rp 200.000.000 / Tahun.\n\nTotal Marketing Matrix Terpadu:\n• Inbound: Free Audit 15 Mnt & Mockup Desain Web Toko Mandiri.\n• Organic: 20 Konten Campuran (Feed Carousel 3:4 & Video Reels 9:16 FYP).\n• Outbound: Canvasing Sniper Instagram DM & G-Maps Scouting (10 brand/hari).\n• Paid Traffic: Advantage+ CBO (Rp 50k-100k/hari) & Google Ads Brand Defense.",
      x: 8, y: 28, size: 7.4, style: "Medium", color: cDark, width: 404
    });

    // Box 5.4: Bagian VII - Segmen Utama & Pengesahan Eksekutif
    const b5_4 = createBox(borang, {
      name: "Bagian_VII_Segmen_Pengesahan",
      x: 1282, y: 938, w: 440, h: 275,
      title: "BAGIAN VII: SEGMEN UTAMA & PENGESAHAN EKSEKUTIF",
      headerBg: cCrimson,
      kicker: "Resmi Disahkan"
    });
    createTxt(b5_4, {
      text: "★ REKOMENDASI SEGMEN UTAMA: Pemilik Brand D2C & UMKM Bertumbuh\nAlasan Strategis: Segmen berdaya beli tinggi (omzet Rp 20-150 Jt/bln) yang paling sakit tercekik fee marketplace 15%+ atau pernah boncos iklan, dan siap investasi Paket HERO Rp 4 Jt/bln (DP Rp 2 Jt SPK) demi ekosistem mandiri.\n\nVisi Agensi:\n“Menjadi agensi pertumbuhan bisnis modern terdepan di Indonesia yang menggaransi ekosistem digital (website custom code, konten media sosial 3:4 & 9:16, iklan CBO terukur, dan mentoring) terintegrasi tanpa ribet.”\n\nDitetapkan di Sidoarjo & Surabaya pada tanggal 4 November 2026.\n\nDisusun Oleh Tim Operasional:       Disetujui & Diresmikan Oleh:\n[Tanda Tangan Digital]              [Tanda Tangan Digital]\nArya Prasetya & Fifa Nur Haliza     Mas Tiar\nHead of Paid Traffic & COO          Founder & Principal Orchestrator\nDjadi Creative Holding              Djadi Creative Holding",
      x: 8, y: 28, size: 7.3, style: "Medium", color: cDark, width: 424
    });

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
  console.log("Master Borang A3 Execution Result:", JSON.stringify(res, null, 2));

  // If success, capture screenshot of the Borang
  if (res && res.value && res.value.frameId) {
    const snap = await callPlugin("get_screenshot", { nodeId: res.value.frameId, format: "png", scale: 0.5 });
    const buf = Buffer.from(snap.data, "base64");
    const out = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/figma_master_borang_a3_djadi.png";
    writeFileSync(out, buf);
    console.log("Screenshot of Master Borang A3 saved to:", out, "Size:", buf.length, "bytes");
  }
}

main().catch(console.error);
