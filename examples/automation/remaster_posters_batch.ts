import { callPlugin } from "./server/src/relay-client";

async function main() {
  const code = `
    // Load Fonts
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "SemiBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });

    // Helper to create Curiosity CTA Box
    function createCuriosityCTA(parent, y, isDark, kickerText, headlineText, subText, waText, accentCol) {
      // Background and shadow
      const ctaSh = figma.createRectangle();
      ctaSh.name = "CTA_Shadow";
      ctaSh.x = 88;
      ctaSh.y = y + 8;
      ctaSh.resize(920, 155);
      ctaSh.cornerRadius = 16;
      ctaSh.fills = [{ type: "SOLID", color: isDark ? { r: 0.7, g: 0, b: 0.11 } : { r: 0.004, g: 0.16, b: 0.41 } }];
      parent.appendChild(ctaSh);

      const ctaFrame = figma.createFrame();
      ctaFrame.name = "Curiosity_CTA_Box";
      ctaFrame.x = 80;
      ctaFrame.y = y;
      ctaFrame.resize(920, 155);
      ctaFrame.cornerRadius = 16;
      ctaFrame.fills = [{ type: "SOLID", color: isDark ? { r: 0.012, g: 0.055, b: 0.15 } : { r: 1, g: 1, b: 1 } }];
      ctaFrame.strokes = [{ type: "SOLID", color: accentCol }];
      ctaFrame.strokeWeight = 2.5;
      parent.appendChild(ctaFrame);

      // Kicker
      const kicker = figma.createFrame();
      kicker.x = 24;
      kicker.y = 18;
      kicker.resize(250, 24);
      kicker.cornerRadius = 6;
      kicker.fills = [{ type: "SOLID", color: { r: 1, g: 0.24, b: 0.11 } }];
      ctaFrame.appendChild(kicker);

      const kTxt = figma.createText();
      kTxt.fontName = { family: "Space Mono", style: "Bold" };
      kTxt.fontSize = 10.5;
      kTxt.characters = kickerText;
      kTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      kicker.appendChild(kTxt);
      kTxt.x = (kicker.width - kTxt.width) / 2;
      kTxt.y = (kicker.height - kTxt.height) / 2;

      // Headline
      const hTxt = figma.createText();
      hTxt.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      hTxt.fontSize = 22;
      hTxt.characters = headlineText;
      hTxt.x = 24;
      hTxt.y = 50;
      hTxt.fills = [{ type: "SOLID", color: isDark ? { r: 1, g: 1, b: 1 } : { r: 0.004, g: 0.16, b: 0.41 } }];
      ctaFrame.appendChild(hTxt);

      // Sub
      const sTxt = figma.createText();
      sTxt.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      sTxt.fontSize = 13.5;
      sTxt.characters = subText;
      sTxt.x = 24;
      sTxt.y = 82;
      sTxt.fills = [{ type: "SOLID", color: isDark ? { r: 0.8, g: 0.85, b: 0.95 } : { r: 0.2, g: 0.25, b: 0.35 } }];
      ctaFrame.appendChild(sTxt);

      // WA Button text
      const bTxt = figma.createText();
      bTxt.fontName = { family: "Space Mono", style: "Bold" };
      bTxt.fontSize = 12;
      bTxt.characters = waText;
      bTxt.x = 24;
      bTxt.y = 114;
      bTxt.fills = [{ type: "SOLID", color: isDark ? { r: 1, g: 0.84, b: 0.04 } : { r: 0.7, g: 0, b: 0.11 } }];
      ctaFrame.appendChild(bTxt);

      // Floating element with PROGRESSIVE BLUR on the CTA
      const floatEl = figma.createFrame();
      floatEl.name = "CTA_Floating_Progressive_Blur";
      floatEl.x = 945;
      floatEl.y = y - 10;
      floatEl.resize(105, 105);
      floatEl.cornerRadius = 26;
      floatEl.fills = [{
        type: "GRADIENT_LINEAR",
        gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
        gradientStops: [
          { position: 0, color: { r: 1, g: 0.24, b: 0.11, a: 0.95 } },
          { position: 1, color: { r: 1, g: 0.84, b: 0.04, a: 0.85 } }
        ]
      }];
      floatEl.rotation = -16;
      floatEl.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: 28,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];
      parent.appendChild(floatEl);
    }

    // ==========================================
    // 1. REMASTER POSTER 17 (B2B Pitch Deck - Warm Cream)
    // ==========================================
    const p17 = await figma.getNodeByIdAsync("809:10425");
    if (p17) {
      // Remove old bottom cards
      const oldBtm = p17.findOne(n => n.name.includes("Bottom"));
      if (oldBtm) oldBtm.remove();
      const oldCta = p17.findOne(n => n.name.includes("Curiosity") || n.name.includes("CTA"));
      if (oldCta) oldCta.remove();

      // Tight 3 Cards (h: 320)
      const cFrame17 = figma.createFrame();
      cFrame17.name = "P17_Tight_Cards";
      cFrame17.x = 80;
      cFrame17.y = 765;
      cFrame17.resize(920, 320);
      cFrame17.fills = [];
      p17.appendChild(cFrame17);

      const d17 = [
        {
          kicker: "MODUL 01 · EXECUTIVE",
          title: "Editorial Hierarchy",
          sub: "Standar Agensi Multinasional",
          b1: "✓ Struktur Data Terverifikasi",
          s1: "Angka KPI, omzet & proyeksi transparan",
          b2: "✓ Tipografi Tegas Berwibawa",
          s2: "Bebas huruf alay, direksi langsung yakin",
          pill: "VERIFIED CORPORATE LOOK",
          bg: { r: 1, g: 1, b: 1 },
          accent: { r: 0.004, g: 0.16, b: 0.41 }
        },
        {
          kicker: "MODUL 02 · PERSUASION",
          title: "Alur Narasi Pitching",
          sub: "Menjawab Keraguan Klien",
          b1: "✓ Bedah Friction Pasar",
          s1: "Menjawab 'kenapa harus brand Anda?'",
          b2: "✓ Solusi & Eksekusi Jelas",
          s2: "Menghapus risiko kegagalan proyek",
          pill: "CONVINCING STRATEGY",
          bg: { r: 1, g: 1, b: 1 },
          accent: { r: 0.06, g: 0.65, b: 0.38 }
        },
        {
          kicker: "MODUL 03 · READY-TO-USE",
          title: "Format Siap Tender",
          sub: "Cetak & WhatsApp Instan",
          b1: "✓ PDF Tajam High-Res 300 DPI",
          s1: "Mewah saat dicetak di hadapan investor",
          b2: "✓ Versi Mobile Kilat < 5MB",
          s2: "Kirim via WA tanpa loading lambat",
          pill: "SIAP TEMBUS TENDER",
          bg: { r: 1, g: 0.84, b: 0.04 }, // Gold
          accent: { r: 0.7, g: 0, b: 0.11 }
        }
      ];

      for (let i = 0; i < 3; i++) {
        const item = d17[i];
        const cx = i * 315;

        const sh = figma.createRectangle();
        sh.x = cx + 8;
        sh.y = 8;
        sh.resize(290, 320);
        sh.cornerRadius = 14;
        sh.fills = [{ type: "SOLID", color: i === 2 ? { r: 0.7, g: 0, b: 0.11 } : { r: 0.004, g: 0.16, b: 0.41 } }];
        cFrame17.appendChild(sh);

        const card = figma.createFrame();
        card.x = cx;
        card.y = 0;
        card.resize(290, 320);
        card.cornerRadius = 14;
        card.fills = [{ type: "SOLID", color: item.bg }];
        card.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.strokeWeight = 2;
        cFrame17.appendChild(card);

        const k = figma.createText();
        k.fontName = { family: "Space Mono", style: "Bold" };
        k.fontSize = 11;
        k.characters = item.kicker;
        k.x = 18;
        k.y = 18;
        k.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(k);

        const t = figma.createText();
        t.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
        t.fontSize = 18;
        t.characters = item.title;
        t.x = 18;
        t.y = 38;
        t.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(t);

        const s = figma.createText();
        s.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        s.fontSize = 13;
        s.characters = item.sub;
        s.x = 18;
        s.y = 62;
        s.fills = [{ type: "SOLID", color: item.accent }];
        card.appendChild(s);

        const div = figma.createLine();
        div.x = 18;
        div.y = 86;
        div.resize(254, 0);
        div.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 }, opacity: 0.15 }];
        card.appendChild(div);

        // Bullets
        const b1 = figma.createText();
        b1.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        b1.fontSize = 13.5;
        b1.characters = item.b1;
        b1.x = 18;
        b1.y = 102;
        b1.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(b1);

        const s1 = figma.createText();
        s1.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
        s1.fontSize = 12;
        s1.characters = item.s1;
        s1.x = 34;
        s1.y = 122;
        s1.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
        card.appendChild(s1);

        const b2 = figma.createText();
        b2.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        b2.fontSize = 13.5;
        b2.characters = item.b2;
        b2.x = 18;
        b2.y = 154;
        b2.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(b2);

        const s2 = figma.createText();
        s2.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
        s2.fontSize = 12;
        s2.characters = item.s2;
        s2.x = 34;
        s2.y = 174;
        s2.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
        card.appendChild(s2);

        // Pill
        const pill = figma.createFrame();
        pill.x = 18;
        pill.y = 264;
        pill.resize(254, 38);
        pill.cornerRadius = 8;
        pill.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(pill);

        const pt = figma.createText();
        pt.fontName = { family: "Space Mono", style: "Bold" };
        pt.fontSize = 11.5;
        pt.characters = item.pill;
        pt.fills = [{ type: "SOLID", color: i === 2 ? { r: 1, g: 0.84, b: 0.04 } : { r: 1, g: 1, b: 1 } }];
        pill.appendChild(pt);
        pt.x = (pill.width - pt.width) / 2;
        pt.y = (pill.height - pt.height) / 2;
      }

      // Curiosity CTA Box
      createCuriosityCTA(
        p17,
        1120,
        false,
        "⚡ DRAFT PITCH DECK CHECK",
        "Company Profile Bisnismu Masih Terlihat Amatir?",
        "Konsultasikan materi deck tender lu bareng Mas Tiar — kami bedah kelemahan sales pitch lu!",
        "👉 KETIK 'PITCH' KE WA: 0851-9659-8881 →",
        { r: 0.004, g: 0.16, b: 0.41 }
      );
    }

    // ==========================================
    // 2. REMASTER POSTER 18 (Digital Ecosystem - Deep Navy)
    // ==========================================
    const p18 = await figma.getNodeByIdAsync("809:10591");
    if (p18) {
      const oldBtm = p18.findOne(n => n.name.includes("Bottom"));
      if (oldBtm) oldBtm.remove();
      const oldCta = p18.findOne(n => n.name.includes("Curiosity") || n.name.includes("CTA"));
      if (oldCta) oldCta.remove();

      const cFrame18 = figma.createFrame();
      cFrame18.name = "P18_Tight_Cards";
      cFrame18.x = 80;
      cFrame18.y = 765;
      cFrame18.resize(920, 320);
      cFrame18.fills = [];
      p18.appendChild(cFrame18);

      const d18 = [
        {
          kicker: "PILAR 01 · OTORITAS",
          title: "Benteng Anti-Ragu",
          sub: "Official Web .com Bergaransi",
          b1: "✓ Toko Terverifikasi Resmi",
          s1: "Menghapus stigma bisnis abal-abal",
          b2: "✓ Checkout WhatsApp Kilat",
          s2: "1-klik langsung terhubung CS",
          pill: "100% TRUST ACCREDITED",
          bg: { r: 0.97, g: 0.96, b: 0.93 },
          accent: { r: 0.15, g: 0.39, b: 0.92 }
        },
        {
          kicker: "PILAR 02 · PROFIT",
          title: "Bebas Fee Marketplace",
          sub: "Hemat Margin Admin 15%",
          b1: "✓ Kanal Penjualan Mandiri",
          s1: "Calon pembeli belanja tanpa perantara",
          b2: "✓ Database Pelanggan Milikmu",
          s2: "Aset jangka panjang bebas suspend",
          pill: "SAVING 15% ADMIN FEE",
          bg: { r: 0.97, g: 0.96, b: 0.93 },
          accent: { r: 0.06, g: 0.65, b: 0.38 }
        },
        {
          kicker: "PILAR 03 · INTEGRASI",
          title: "Ekosistem Satu Komando",
          sub: "Semua Dikelola Tim Djadi",
          b1: "✓ Website, Medsos & Iklan Rapi",
          s1: "Brand tampil seragam di semua kanal",
          b2: "✓ Owner Fokus Siapkan Stok",
          s2: "Urusan teknis serahkan ke ahli",
          pill: "ALL-IN-ONE RETROFIT",
          bg: { r: 1, g: 0.84, b: 0.04 },
          accent: { r: 0.7, g: 0, b: 0.11 }
        }
      ];

      for (let i = 0; i < 3; i++) {
        const item = d18[i];
        const cx = i * 315;

        const sh = figma.createRectangle();
        sh.x = cx + 8;
        sh.y = 8;
        sh.resize(290, 320);
        sh.cornerRadius = 14;
        sh.fills = [{ type: "SOLID", color: i === 2 ? { r: 0.7, g: 0, b: 0.11 } : { r: 0.004, g: 0.16, b: 0.41 } }];
        cFrame18.appendChild(sh);

        const card = figma.createFrame();
        card.x = cx;
        card.y = 0;
        card.resize(290, 320);
        card.cornerRadius = 14;
        card.fills = [{ type: "SOLID", color: item.bg }];
        card.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.strokeWeight = 2;
        cFrame18.appendChild(card);

        const k = figma.createText();
        k.fontName = { family: "Space Mono", style: "Bold" };
        k.fontSize = 11;
        k.characters = item.kicker;
        k.x = 18;
        k.y = 18;
        k.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(k);

        const t = figma.createText();
        t.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
        t.fontSize = 18;
        t.characters = item.title;
        t.x = 18;
        t.y = 38;
        t.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(t);

        const s = figma.createText();
        s.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        s.fontSize = 13;
        s.characters = item.sub;
        s.x = 18;
        s.y = 62;
        s.fills = [{ type: "SOLID", color: item.accent }];
        card.appendChild(s);

        const div = figma.createLine();
        div.x = 18;
        div.y = 86;
        div.resize(254, 0);
        div.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 }, opacity: 0.15 }];
        card.appendChild(div);

        const b1 = figma.createText();
        b1.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        b1.fontSize = 13.5;
        b1.characters = item.b1;
        b1.x = 18;
        b1.y = 102;
        b1.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(b1);

        const s1 = figma.createText();
        s1.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
        s1.fontSize = 12;
        s1.characters = item.s1;
        s1.x = 34;
        s1.y = 122;
        s1.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
        card.appendChild(s1);

        const b2 = figma.createText();
        b2.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        b2.fontSize = 13.5;
        b2.characters = item.b2;
        b2.x = 18;
        b2.y = 154;
        b2.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(b2);

        const s2 = figma.createText();
        s2.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
        s2.fontSize = 12;
        s2.characters = item.s2;
        s2.x = 34;
        s2.y = 174;
        s2.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
        card.appendChild(s2);

        const pill = figma.createFrame();
        pill.x = 18;
        pill.y = 264;
        pill.resize(254, 38);
        pill.cornerRadius = 8;
        pill.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(pill);

        const pt = figma.createText();
        pt.fontName = { family: "Space Mono", style: "Bold" };
        pt.fontSize = 11.5;
        pt.characters = item.pill;
        pt.fills = [{ type: "SOLID", color: i === 2 ? { r: 1, g: 0.84, b: 0.04 } : { r: 1, g: 1, b: 1 } }];
        pill.appendChild(pt);
        pt.x = (pill.width - pt.width) / 2;
        pt.y = (pill.height - pt.height) / 2;
      }

      createCuriosityCTA(
        p18,
        1120,
        true,
        "⚡ SIMULASI MARGIN BISNIS",
        "Berapa Juta Keuntungan Tokomu yang Hilang Tiap Bulan?",
        "Kombinasikan web resmi + medsos rapi. Stop bakar fee admin 15% sia-sia!",
        "👉 KETIK 'EKOSISTEM' KE WA: 0851-9659-8881 →",
        { r: 1, g: 0.84, b: 0.04 }
      );
    }

    // ==========================================
    // 3. REMASTER POSTER 19 (Content System - Warm Cream)
    // ==========================================
    const p19 = await figma.getNodeByIdAsync("809:10758");
    if (p19) {
      const oldBtm = p19.findOne(n => n.name.includes("Bottom"));
      if (oldBtm) oldBtm.remove();
      const oldCta = p19.findOne(n => n.name.includes("Curiosity") || n.name.includes("CTA"));
      if (oldCta) oldCta.remove();

      const cFrame19 = figma.createFrame();
      cFrame19.name = "P19_Tight_Cards";
      cFrame19.x = 80;
      cFrame19.y = 765;
      cFrame19.resize(920, 320);
      cFrame19.fills = [];
      p19.appendChild(cFrame19);

      const d19 = [
        {
          kicker: "STEP 01 · RETENSI",
          title: "Stop Kejar Tren Alay",
          sub: "Sasar Audiens Berduit",
          b1: "✓ Tolak Joget Tanpa Cuan",
          s1: "Hanya menarik penonton bocah non-buyer",
          b2: "✓ Konten Edukasi Solutif",
          s2: "Target pemilik daya beli siap transfer",
          pill: "HIGH-PURCHASE AUDIENCE",
          bg: { r: 1, g: 1, b: 1 },
          accent: { r: 0.004, g: 0.16, b: 0.41 }
        },
        {
          kicker: "STEP 02 · SEEDING",
          title: "Save & Share Triggers",
          sub: "Pemicu Algoritma Sejati",
          b1: "✓ Formula Wawasan Bernilai",
          s1: "Memicu penonton membagikan ke relasi",
          b2: "✓ Otoritas Akun Melonjak",
          s2: "Akun dinilai kredibel oleh sistem IG",
          pill: "ORGANIC RETENTION VIRAL",
          bg: { r: 1, g: 1, b: 1 },
          accent: { r: 0.06, g: 0.65, b: 0.38 }
        },
        {
          kicker: "STEP 03 · FUNNEL",
          title: "Jembatan Beli Jelas",
          sub: "Semua Berujung WhatsApp",
          b1: "✓ Call-To-Action Terarah",
          s1: "Prospek diarahkan langsung ke kasir",
          b2: "✓ Pipeline Penjualan Stabil",
          s2: "Lead panas mengalir setiap hari",
          pill: "CONVERSION MACHINE",
          bg: { r: 1, g: 0.84, b: 0.04 },
          accent: { r: 0.7, g: 0, b: 0.11 }
        }
      ];

      for (let i = 0; i < 3; i++) {
        const item = d19[i];
        const cx = i * 315;

        const sh = figma.createRectangle();
        sh.x = cx + 8;
        sh.y = 8;
        sh.resize(290, 320);
        sh.cornerRadius = 14;
        sh.fills = [{ type: "SOLID", color: i === 2 ? { r: 0.7, g: 0, b: 0.11 } : { r: 0.004, g: 0.16, b: 0.41 } }];
        cFrame19.appendChild(sh);

        const card = figma.createFrame();
        card.x = cx;
        card.y = 0;
        card.resize(290, 320);
        card.cornerRadius = 14;
        card.fills = [{ type: "SOLID", color: item.bg }];
        card.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.strokeWeight = 2;
        cFrame19.appendChild(card);

        const k = figma.createText();
        k.fontName = { family: "Space Mono", style: "Bold" };
        k.fontSize = 11;
        k.characters = item.kicker;
        k.x = 18;
        k.y = 18;
        k.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(k);

        const t = figma.createText();
        t.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
        t.fontSize = 18;
        t.characters = item.title;
        t.x = 18;
        t.y = 38;
        t.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(t);

        const s = figma.createText();
        s.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        s.fontSize = 13;
        s.characters = item.sub;
        s.x = 18;
        s.y = 62;
        s.fills = [{ type: "SOLID", color: item.accent }];
        card.appendChild(s);

        const div = figma.createLine();
        div.x = 18;
        div.y = 86;
        div.resize(254, 0);
        div.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 }, opacity: 0.15 }];
        card.appendChild(div);

        const b1 = figma.createText();
        b1.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        b1.fontSize = 13.5;
        b1.characters = item.b1;
        b1.x = 18;
        b1.y = 102;
        b1.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(b1);

        const s1 = figma.createText();
        s1.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
        s1.fontSize = 12;
        s1.characters = item.s1;
        s1.x = 34;
        s1.y = 122;
        s1.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
        card.appendChild(s1);

        const b2 = figma.createText();
        b2.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        b2.fontSize = 13.5;
        b2.characters = item.b2;
        b2.x = 18;
        b2.y = 154;
        b2.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(b2);

        const s2 = figma.createText();
        s2.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
        s2.fontSize = 12;
        s2.characters = item.s2;
        s2.x = 34;
        s2.y = 174;
        s2.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
        card.appendChild(s2);

        const pill = figma.createFrame();
        pill.x = 18;
        pill.y = 264;
        pill.resize(254, 38);
        pill.cornerRadius = 8;
        pill.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(pill);

        const pt = figma.createText();
        pt.fontName = { family: "Space Mono", style: "Bold" };
        pt.fontSize = 11.5;
        pt.characters = item.pill;
        pt.fills = [{ type: "SOLID", color: i === 2 ? { r: 1, g: 0.84, b: 0.04 } : { r: 1, g: 1, b: 1 } }];
        pill.appendChild(pt);
        pt.x = (pill.width - pt.width) / 2;
        pt.y = (pill.height - pt.height) / 2;
      }

      createCuriosityCTA(
        p19,
        1120,
        false,
        "⚡ AUDIT RETENSI KONTEN",
        "Penasaran Kenapa Kontenmu Selalu Stuck di 200 Views?",
        "Kirim link Instagram bisnismu ke Mas Tiar — kami berikan 3 ide hook kinetik gratis!",
        "👉 KETIK 'KONTEN' KE WA: 0851-9659-8881 →",
        { r: 0.004, g: 0.16, b: 0.41 }
      );
    }

    // ==========================================
    // 4. REMASTER POSTER 20 (Short-Form Video - Deep Navy)
    // ==========================================
    const p20 = await figma.getNodeByIdAsync("809:10921");
    if (p20) {
      const oldBtm = p20.findOne(n => n.name.includes("BottomCards"));
      if (oldBtm) oldBtm.remove();
      const oldCta = p20.findOne(n => n.name.includes("Curiosity") || n.name.includes("CTA"));
      if (oldCta) oldCta.remove();

      const cFrame20 = figma.createFrame();
      cFrame20.name = "P20_Tight_Cards";
      cFrame20.x = 80;
      cFrame20.y = 765;
      cFrame20.resize(920, 320);
      cFrame20.fills = [];
      p20.appendChild(cFrame20);

      const d20 = [
        {
          kicker: "RESEP 01 · 3 DETIK",
          title: "Tembak Masalah Utama",
          sub: "Tanpa Intro Basa-Basi",
          b1: "✓ Hentikan Scroll Jempol",
          s1: "Visual kinetik langsung ke inti masalah",
          b2: "✓ Buang Bumper Logo Lemot",
          s2: "Penonton tidak kabur di 2 detik awal",
          pill: "ZERO BORING INTRO",
          bg: { r: 0.97, g: 0.96, b: 0.93 },
          accent: { r: 0.15, g: 0.39, b: 0.92 }
        },
        {
          kicker: "RESEP 02 · KINETIK",
          title: "Subtitle Dinamis Auto",
          sub: "Highlight Kata Kunci Cuan",
          b1: "✓ 85% Nonton Tanpa Suara",
          s1: "Teks bergerak menjaga fokus mata",
          b2: "✓ Tipografi Standar Broadcast",
          s2: "Mudah dicerna di layar smartphone",
          pill: "HIGH RETENTION PACING",
          bg: { r: 0.97, g: 0.96, b: 0.93 },
          accent: { r: 0.06, g: 0.65, b: 0.38 }
        },
        {
          kicker: "RESEP 03 · CONVERT",
          title: "Siap Iklan Meta CBO",
          sub: "Biaya Murah < Rp 4.000/WA",
          b1: "✓ Format 9:16 Vertikal Tajam",
          s1: "Full screen menguasai layar feed",
          b2: "✓ Desain Menghasilkan Transfer",
          s2: "Bukan sekadar views kosong tanpa closing",
          pill: "ADS-READY VERTICAL",
          bg: { r: 1, g: 0.84, b: 0.04 },
          accent: { r: 0.7, g: 0, b: 0.11 }
        }
      ];

      for (let i = 0; i < 3; i++) {
        const item = d20[i];
        const cx = i * 315;

        const sh = figma.createRectangle();
        sh.x = cx + 8;
        sh.y = 8;
        sh.resize(290, 320);
        sh.cornerRadius = 14;
        sh.fills = [{ type: "SOLID", color: i === 2 ? { r: 0.7, g: 0, b: 0.11 } : { r: 0.004, g: 0.16, b: 0.41 } }];
        cFrame20.appendChild(sh);

        const card = figma.createFrame();
        card.x = cx;
        card.y = 0;
        card.resize(290, 320);
        card.cornerRadius = 14;
        card.fills = [{ type: "SOLID", color: item.bg }];
        card.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.strokeWeight = 2;
        cFrame20.appendChild(card);

        const k = figma.createText();
        k.fontName = { family: "Space Mono", style: "Bold" };
        k.fontSize = 11;
        k.characters = item.kicker;
        k.x = 18;
        k.y = 18;
        k.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(k);

        const t = figma.createText();
        t.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
        t.fontSize = 18;
        t.characters = item.title;
        t.x = 18;
        t.y = 38;
        t.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(t);

        const s = figma.createText();
        s.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        s.fontSize = 13;
        s.characters = item.sub;
        s.x = 18;
        s.y = 62;
        s.fills = [{ type: "SOLID", color: item.accent }];
        card.appendChild(s);

        const div = figma.createLine();
        div.x = 18;
        div.y = 86;
        div.resize(254, 0);
        div.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 }, opacity: 0.15 }];
        card.appendChild(div);

        const b1 = figma.createText();
        b1.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        b1.fontSize = 13.5;
        b1.characters = item.b1;
        b1.x = 18;
        b1.y = 102;
        b1.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(b1);

        const s1 = figma.createText();
        s1.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
        s1.fontSize = 12;
        s1.characters = item.s1;
        s1.x = 34;
        s1.y = 122;
        s1.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
        card.appendChild(s1);

        const b2 = figma.createText();
        b2.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
        b2.fontSize = 13.5;
        b2.characters = item.b2;
        b2.x = 18;
        b2.y = 154;
        b2.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(b2);

        const s2 = figma.createText();
        s2.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
        s2.fontSize = 12;
        s2.characters = item.s2;
        s2.x = 34;
        s2.y = 174;
        s2.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
        card.appendChild(s2);

        const pill = figma.createFrame();
        pill.x = 18;
        pill.y = 264;
        pill.resize(254, 38);
        pill.cornerRadius = 8;
        pill.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        card.appendChild(pill);

        const pt = figma.createText();
        pt.fontName = { family: "Space Mono", style: "Bold" };
        pt.fontSize = 11.5;
        pt.characters = item.pill;
        pt.fills = [{ type: "SOLID", color: i === 2 ? { r: 1, g: 0.84, b: 0.04 } : { r: 1, g: 1, b: 1 } }];
        pill.appendChild(pt);
        pt.x = (pill.width - pt.width) / 2;
        pt.y = (pill.height - pt.height) / 2;
      }

      createCuriosityCTA(
        p20,
        1120,
        true,
        "⚡ REELS SCRIPT CHECK",
        "Punya Ide Video Tapi Bingung Cara Bikin Hook-nya?",
        "Konsultasi 15 menit bareng Mas Tiar — kami bedah storyboard kinetik siap FYP!",
        "👉 KETIK 'REELS' KE WA: 0851-9659-8881 →",
        { r: 1, g: 0.84, b: 0.04 }
      );
    }

    return { success: true };
  `;

  const res = await callPlugin("execute", { code });
  console.log("Batch Remaster Result:", res);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
