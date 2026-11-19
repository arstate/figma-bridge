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

    // ==========================================
    // 1. REBUILD POSTER 17 HERO VISUAL (B2B Pitch Deck - Warm Cream)
    // ==========================================
    const p17 = await figma.getNodeByIdAsync("809:10425");
    if (p17) {
      const oldMid = p17.findOne(n => n.name.includes("Mid"));
      if (oldMid) oldMid.remove();

      // Clean Reconstructed Hero Visual (y: 340, h: 480)
      const hero = figma.createFrame();
      hero.name = "P17_Hero_B2B_Executive_Dossier";
      hero.x = 80;
      hero.y = 340;
      hero.resize(920, 480);
      hero.cornerRadius = 20;
      hero.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      hero.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      hero.strokeWeight = 2.5;

      // Hard Shadow
      const sh = figma.createRectangle();
      sh.name = "Hero_Shadow";
      sh.x = 88;
      sh.y = 348;
      sh.resize(920, 480);
      sh.cornerRadius = 20;
      sh.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      p17.appendChild(sh);
      p17.appendChild(hero);

      // Top Tab Bar
      const tab = figma.createFrame();
      tab.x = 0;
      tab.y = 0;
      tab.resize(920, 48);
      tab.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      hero.appendChild(tab);

      // 3 dots
      const dots = [
        { c: { r: 1, g: 0.38, b: 0.35 }, x: 20 },
        { c: { r: 1, g: 0.75, b: 0.2 }, x: 38 },
        { c: { r: 0.2, g: 0.8, b: 0.4 }, x: 56 }
      ];
      dots.forEach(d => {
        const dot = figma.createEllipse();
        dot.x = d.x;
        dot.y = 18;
        dot.resize(12, 12);
        dot.fills = [{ type: "SOLID", color: d.c }];
        tab.appendChild(dot);
      });

      const tabTitle = figma.createText();
      tabTitle.fontName = { family: "Space Mono", style: "Bold" };
      tabTitle.fontSize = 12.5;
      tabTitle.characters = "COMPANY_PROFILE_DJADI_2026_EXECUTIVE.PDF";
      tabTitle.x = 84;
      tabTitle.y = 15;
      tabTitle.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      tab.appendChild(tabTitle);

      // Left Panel: Document Preview (x: 28, y: 72, w: 460, h: 380)
      const doc = figma.createFrame();
      doc.x = 28;
      doc.y = 72;
      doc.resize(460, 380);
      doc.cornerRadius = 14;
      doc.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.96 } }];
      doc.strokes = [{ type: "SOLID", color: { r: 0.85, g: 0.88, b: 0.92 } }];
      doc.strokeWeight = 1.5;
      hero.appendChild(doc);

      const dKicker = figma.createText();
      dKicker.fontName = { family: "Space Mono", style: "Bold" };
      dKicker.fontSize = 11;
      dKicker.characters = "CONFIDENTIAL · B2B PITCH DECK";
      dKicker.x = 24;
      dKicker.y = 24;
      dKicker.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      doc.appendChild(dKicker);

      const dTitle = figma.createText();
      dTitle.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      dTitle.fontSize = 24;
      dTitle.characters = "Strategic Track Record & Capabilities";
      dTitle.x = 24;
      dTitle.y = 52;
      dTitle.resize(412, 60);
      dTitle.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      doc.appendChild(dTitle);

      const dSub = figma.createText();
      dSub.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      dSub.fontSize = 14;
      dSub.characters = "Portofolio terverifikasi, studi kasus ROI, dan sertifikasi tim ahli.";
      dSub.x = 24;
      dSub.y = 120;
      dSub.resize(412, 40);
      dSub.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
      doc.appendChild(dSub);

      // SLA Box inside Doc
      const sla = figma.createFrame();
      sla.x = 24;
      sla.y = 175;
      sla.resize(412, 180);
      sla.cornerRadius = 10;
      sla.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      doc.appendChild(sla);

      const slaHead = figma.createText();
      slaHead.fontName = { family: "Space Mono", style: "Bold" };
      slaHead.fontSize = 11;
      slaHead.characters = "VERIFIED SLA METRICS 2026:";
      slaHead.x = 18;
      slaHead.y = 18;
      slaHead.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      sla.appendChild(slaHead);

      const sla1 = figma.createText();
      sla1.fontName = { family: "Space Mono", style: "Bold" };
      sla1.fontSize = 13.5;
      sla1.characters = "✓ 99.8% On-Time Delivery Guaranteed";
      sla1.x = 18;
      sla1.y = 50;
      sla1.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.8, b: 0.4 } }];
      sla.appendChild(sla1);

      const sla2 = figma.createText();
      sla2.fontName = { family: "Space Mono", style: "Bold" };
      sla2.fontSize = 13.5;
      sla2.characters = "✓ Rp 12.8M Projected Client Value";
      sla2.x = 18;
      sla2.y = 86;
      sla2.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      sla.appendChild(sla2);

      const sla3 = figma.createText();
      sla3.fontName = { family: "Space Mono", style: "Bold" };
      sla3.fontSize = 13.5;
      sla3.characters = "✓ 100% Legal HKI & Commercial Licensed";
      sla3.x = 18;
      sla3.y = 122;
      sla3.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.75, b: 1 } }];
      sla.appendChild(sla3);

      // Right Panel: 3 Pitching Pillars (x: 512, y: 72, w: 380, h: 380)
      const rPanel = figma.createFrame();
      rPanel.x = 512;
      rPanel.y = 72;
      rPanel.resize(380, 380);
      rPanel.cornerRadius = 14;
      rPanel.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      hero.appendChild(rPanel);

      const rHead = figma.createText();
      rHead.fontName = { family: "Space Mono", style: "Bold" };
      rHead.fontSize = 12;
      rHead.characters = "⚡ 3 ELEMEN PENEMBUS TENDER:";
      rHead.x = 24;
      rHead.y = 24;
      rHead.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      rPanel.appendChild(rHead);

      const p1Title = figma.createText();
      p1Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      p1Title.fontSize = 16.5;
      p1Title.characters = "1. Mitigasi Risiko Klien";
      p1Title.x = 24;
      p1Title.y = 60;
      p1Title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      rPanel.appendChild(p1Title);

      const p1Sub = figma.createText();
      p1Sub.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      p1Sub.fontSize = 13;
      p1Sub.characters = "Buktikan kapasitas tim & legalitas transparan.";
      p1Sub.x = 24;
      p1Sub.y = 86;
      p1Sub.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      rPanel.appendChild(p1Sub);

      const p2Title = figma.createText();
      p2Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      p2Title.fontSize = 16.5;
      p2Title.characters = "2. Metrik Data Riil & ROI";
      p2Title.x = 24;
      p2Title.y = 130;
      p2Title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      rPanel.appendChild(p2Title);

      const p2Sub = figma.createText();
      p2Sub.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      p2Sub.fontSize = 13;
      p2Sub.characters = "Studi kasus riil yang membuktikan hasil terukur.";
      p2Sub.x = 24;
      p2Sub.y = 156;
      p2Sub.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      rPanel.appendChild(p2Sub);

      const p3Title = figma.createText();
      p3Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      p3Title.fontSize = 16.5;
      p3Title.characters = "3. Dua Format Siap Pitching";
      p3Title.x = 24;
      p3Title.y = 200;
      p3Title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      rPanel.appendChild(p3Title);

      const p3Sub = figma.createText();
      p3Sub.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      p3Sub.fontSize = 13;
      p3Sub.characters = "Cetak 300 DPI mewah + versi ringan <5MB kirim WA.";
      p3Sub.x = 24;
      p3Sub.y = 226;
      p3Sub.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      rPanel.appendChild(p3Sub);

      // Button Garansi
      const gBtn = figma.createFrame();
      gBtn.x = 24;
      gBtn.y = 290;
      gBtn.resize(332, 58);
      gBtn.cornerRadius = 12;
      gBtn.fills = [{ type: "SOLID", color: { r: 1, g: 0.24, b: 0.11 } }]; // Vermillion
      rPanel.appendChild(gBtn);

      const gBtnTxt = figma.createText();
      gBtnTxt.fontName = { family: "Space Mono", style: "Bold" };
      gBtnTxt.fontSize = 14;
      gBtnTxt.characters = "GARANSI DIREKSI YAKIN 100%";
      gBtnTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      gBtn.appendChild(gBtnTxt);
      gBtnTxt.x = (gBtn.width - gBtnTxt.width) / 2;
      gBtnTxt.y = (gBtn.height - gBtnTxt.height) / 2;
    }

    // ==========================================
    // 2. REBUILD POSTER 18 HERO VISUAL (Digital Ecosystem - Deep Navy)
    // ==========================================
    const p18 = await figma.getNodeByIdAsync("809:10591");
    if (p18) {
      const oldMid = p18.findOne(n => n.name.includes("Mid"));
      if (oldMid) oldMid.remove();

      const hero = figma.createFrame();
      hero.name = "P18_Hero_Ecosystem_Diagram";
      hero.x = 80;
      hero.y = 340;
      hero.resize(920, 480);
      hero.cornerRadius = 20;
      hero.fills = [{ type: "SOLID", color: { r: 0.008, g: 0.08, b: 0.22 } }];
      hero.strokes = [{ type: "SOLID", color: { r: 0.25, g: 0.55, b: 0.95 } }];
      hero.strokeWeight = 2;

      const sh = figma.createRectangle();
      sh.name = "Hero_Shadow";
      sh.x = 88;
      sh.y = 348;
      sh.resize(920, 480);
      sh.cornerRadius = 20;
      sh.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      p18.appendChild(sh);
      p18.appendChild(hero);

      // Header Bar
      const hBar = figma.createFrame();
      hBar.x = 24;
      hBar.y = 20;
      hBar.resize(872, 40);
      hBar.cornerRadius = 8;
      hBar.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      hero.appendChild(hBar);

      const hbTxt = figma.createText();
      hbTxt.fontName = { family: "Space Mono", style: "Bold" };
      hbTxt.fontSize = 12.5;
      hbTxt.characters = "⚡ TRI-PILLAR CONNECTED NETWORK · 3 SIMPUL KONVERSI ABADI";
      hbTxt.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      hBar.appendChild(hbTxt);
      hbTxt.x = 20;
      hbTxt.y = 12;

      // 3 Connected Pillar Cards
      const pillars = [
        {
          num: "PILAR 01",
          title: "Website Resmi .com",
          sub: "Katalog SSL & Checkout WhatsApp",
          badge: "VERIFIED DOMAIN",
          accent: { r: 0.15, g: 0.39, b: 0.92 },
          x: 24, y: 80, w: 265, h: 260
        },
        {
          num: "PILAR 02",
          title: "Feed Medsos 3:4",
          sub: "20 Konten Bulanan Konsisten",
          badge: "HIGH ENGAGEMENT",
          accent: { r: 1, g: 0.24, b: 0.11 },
          x: 314, y: 80, w: 292, h: 260
        },
        {
          num: "PILAR 03",
          title: "WhatsApp Closer",
          sub: "Respon Kilat < 60 Detik Closing",
          badge: "FAST CONVERSION",
          accent: { r: 0.06, g: 0.65, b: 0.38 },
          x: 631, y: 80, w: 265, h: 260
        }
      ];

      pillars.forEach(p => {
        const c = figma.createFrame();
        c.x = p.x;
        c.y = p.y;
        c.resize(p.w, p.h);
        c.cornerRadius = 14;
        c.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
        c.strokes = [{ type: "SOLID", color: p.accent }];
        c.strokeWeight = 2.5;
        hero.appendChild(c);

        const pill = figma.createFrame();
        pill.x = 18;
        pill.y = 18;
        pill.resize(95, 26);
        pill.cornerRadius = 6;
        pill.fills = [{ type: "SOLID", color: p.accent }];
        c.appendChild(pill);

        const pt = figma.createText();
        pt.fontName = { family: "Space Mono", style: "Bold" };
        pt.fontSize = 11;
        pt.characters = p.num;
        pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
        pill.appendChild(pt);
        pt.x = (pill.width - pt.width) / 2;
        pt.y = (pill.height - pt.height) / 2;

        const t = figma.createText();
        t.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
        t.fontSize = 19;
        t.characters = p.title;
        t.x = 18;
        t.y = 56;
        t.resize(p.w - 36, 50);
        t.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        c.appendChild(t);

        const s = figma.createText();
        s.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
        s.fontSize = 13.5;
        s.characters = p.sub;
        s.x = 18;
        s.y = 115;
        s.resize(p.w - 36, 45);
        s.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
        c.appendChild(s);

        const bBadge = figma.createFrame();
        bBadge.x = 18;
        bBadge.y = 200;
        bBadge.resize(p.w - 36, 36);
        bBadge.cornerRadius = 8;
        bBadge.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        c.appendChild(bBadge);

        const bbt = figma.createText();
        bbt.fontName = { family: "Space Mono", style: "Bold" };
        bbt.fontSize = 11;
        bbt.characters = "✓ " + p.badge;
        bbt.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
        bBadge.appendChild(bbt);
        bbt.x = (bBadge.width - bbt.width) / 2;
        bbt.y = (bBadge.height - bbt.height) / 2;
      });

      // Bottom Golden Banner
      const bBanner = figma.createFrame();
      bBanner.x = 24;
      bBanner.y = 360;
      bBanner.resize(872, 95);
      bBanner.cornerRadius = 14;
      bBanner.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      bBanner.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      bBanner.strokeWeight = 2;
      hero.appendChild(bBanner);

      const bbt1 = figma.createText();
      bbt1.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      bbt1.fontSize = 20;
      bbt1.characters = "Satu Simpul Terputus Pembeli Ragu, Tiga Simpul Menyatu Omzet Melaju!";
      bbt1.x = 24;
      bbt1.y = 20;
      bbt1.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      bBanner.appendChild(bbt1);

      const bbt2 = figma.createText();
      bbt2.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      bbt2.fontSize = 14;
      bbt2.characters = "Seluruh 3 simpul dikawal langsung oleh tim Djadi Creative dalam 1 paket retainer HERO.";
      bbt2.x = 24;
      bbt2.y = 52;
      bbt2.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      bBanner.appendChild(bbt2);
    }

    // ==========================================
    // 3. REBUILD POSTER 19 HERO VISUAL (Content Funnel - Warm Cream)
    // ==========================================
    const p19 = await figma.getNodeByIdAsync("809:10758");
    if (p19) {
      const oldMid = p19.findOne(n => n.name.includes("Mid"));
      if (oldMid) oldMid.remove();

      const hero = figma.createFrame();
      hero.name = "P19_Hero_Funnel_Engine";
      hero.x = 80;
      hero.y = 340;
      hero.resize(920, 480);
      hero.cornerRadius = 20;
      hero.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      hero.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      hero.strokeWeight = 2.5;

      const sh = figma.createRectangle();
      sh.name = "Hero_Shadow";
      sh.x = 88;
      sh.y = 348;
      sh.resize(920, 480);
      sh.cornerRadius = 20;
      sh.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      p19.appendChild(sh);
      p19.appendChild(hero);

      // Left Panel: 3 Stacked Funnel Steps (x: 28, y: 28, w: 430, h: 424)
      const steps = [
        {
          num: "1. HOOK KINETIK 3 DETIK",
          sub: "Visual kontras menahan jempol scroll (Retensi > 70%)",
          bg: { r: 0.7, g: 0, b: 0.11 }, // Crimson
          textCol: { r: 1, g: 1, b: 1 },
          y: 28
        },
        {
          num: "2. VALUE EDUKASI BERMUTU",
          sub: "Wawasan solutif bernilai tinggi memicu Save & Share",
          bg: { r: 1, g: 0.84, b: 0.04 }, // Gold
          textCol: { r: 0.004, g: 0.16, b: 0.41 },
          y: 168
        },
        {
          num: "3. JEMBATAN CLOSING WHATSAPP",
          sub: "Call-to-action jelas tanpa friksi, langsung chat kasir",
          bg: { r: 0.004, g: 0.16, b: 0.41 }, // Deep Navy
          textCol: { r: 1, g: 1, b: 1 },
          y: 308
        }
      ];

      steps.forEach(s => {
        const sf = figma.createFrame();
        sf.x = 28;
        sf.y = s.y;
        sf.resize(420, 115);
        sf.cornerRadius = 14;
        sf.fills = [{ type: "SOLID", color: s.bg }];
        sf.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        sf.strokeWeight = 2;
        hero.appendChild(sf);

        const st = figma.createText();
        st.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
        st.fontSize = 17;
        st.characters = s.num;
        st.x = 20;
        st.y = 20;
        st.fills = [{ type: "SOLID", color: s.textCol }];
        sf.appendChild(st);

        const ss = figma.createText();
        ss.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
        ss.fontSize = 13.5;
        ss.characters = s.sub;
        ss.x = 20;
        ss.y = 52;
        ss.resize(380, 45);
        ss.fills = [{ type: "SOLID", color: s.textCol }];
        sf.appendChild(ss);
      });

      // Right Panel: 3 Golden Rules (x: 476, y: 28, w: 416, h: 424)
      const rPanel = figma.createFrame();
      rPanel.x = 476;
      rPanel.y = 28;
      rPanel.resize(416, 424);
      rPanel.cornerRadius = 14;
      rPanel.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      hero.appendChild(rPanel);

      const rHead = figma.createText();
      rHead.fontName = { family: "Space Mono", style: "Bold" };
      rHead.fontSize = 13;
      rHead.characters = "⚡ 3 HUKUM KONVERSI KONTEN ABADI:";
      rHead.x = 24;
      rHead.y = 24;
      rHead.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      rPanel.appendChild(rHead);

      const r1 = figma.createText();
      r1.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      r1.fontSize = 16.5;
      r1.characters = "1. Jangan Buang Waktu di Detik 0";
      r1.x = 24;
      r1.y = 66;
      r1.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      rPanel.appendChild(r1);

      const r1s = figma.createText();
      r1s.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      r1s.fontSize = 13.5;
      r1s.characters = "Penonton memutuskan scroll atau lanjut nonton hanya dalam 1.5 detik pertama.";
      r1s.x = 24;
      r1s.y = 94;
      r1s.resize(368, 40);
      r1s.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      rPanel.appendChild(r1s);

      const r2 = figma.createText();
      r2.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      r2.fontSize = 16.5;
      r2.characters = "2. Sasar Calon Pembeli, Bukan Bocah";
      r2.x = 24;
      r2.y = 152;
      r2.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      rPanel.appendChild(r2);

      const r2s = figma.createText();
      r2s.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      r2s.fontSize = 13.5;
      r2s.characters = "Konten edukasi solutif menyaring audiens berdaya beli tinggi yang siap transfer.";
      r2s.x = 24;
      r2s.y = 180;
      r2s.resize(368, 40);
      r2s.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      rPanel.appendChild(r2s);

      const r3 = figma.createText();
      r3.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      r3.fontSize = 16.5;
      r3.characters = "3. Wajib Ada Jembatan Closing";
      r3.x = 24;
      r3.y = 238;
      r3.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      rPanel.appendChild(r3);

      const r3s = figma.createText();
      r3s.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      r3s.fontSize = 13.5;
      r3s.characters = "Views jutaan sia-sia jika tidak ada ajakan jelas menuju WhatsApp atau website toko.";
      r3s.x = 24;
      r3s.y = 266;
      r3s.resize(368, 40);
      r3s.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      rPanel.appendChild(r3s);

      const gBtn = figma.createFrame();
      gBtn.x = 24;
      gBtn.y = 330;
      gBtn.resize(368, 64);
      gBtn.cornerRadius = 12;
      gBtn.fills = [{ type: "SOLID", color: { r: 1, g: 0.24, b: 0.11 } }];
      rPanel.appendChild(gBtn);

      const gbt = figma.createText();
      gbt.fontName = { family: "Space Mono", style: "Bold" };
      gbt.fontSize = 14;
      gbt.characters = "STRATEGI TAHAN BANTING 2026";
      gbt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      gBtn.appendChild(gbt);
      gbt.x = (gBtn.width - gbt.width) / 2;
      gbt.y = (gBtn.height - gbt.height) / 2;
    }

    // ==========================================
    // 4. REBUILD POSTER 20 HERO VISUAL (Short-Form Video - Deep Navy)
    // ==========================================
    const p20 = await figma.getNodeByIdAsync("809:10921");
    if (p20) {
      const oldMid = p20.findOne(n => n.name.includes("Mid"));
      if (oldMid) oldMid.remove();

      const hero = figma.createFrame();
      hero.name = "P20_Hero_Timeline_Simulator";
      hero.x = 80;
      hero.y = 340;
      hero.resize(920, 480);
      hero.cornerRadius = 20;
      hero.fills = [{ type: "SOLID", color: { r: 0.008, g: 0.08, b: 0.22 } }];
      hero.strokes = [{ type: "SOLID", color: { r: 0.25, g: 0.55, b: 0.95 } }];
      hero.strokeWeight = 2;

      const sh = figma.createRectangle();
      sh.name = "Hero_Shadow";
      sh.x = 88;
      sh.y = 348;
      sh.resize(920, 480);
      sh.cornerRadius = 20;
      sh.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      p20.appendChild(sh);
      p20.appendChild(hero);

      // Top Timeline Scrubber Bar
      const sBar = figma.createFrame();
      sBar.x = 24;
      sBar.y = 20;
      sBar.resize(872, 40);
      sBar.cornerRadius = 8;
      sBar.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      hero.appendChild(sBar);

      const sbTxt = figma.createText();
      sbTxt.fontName = { family: "Space Mono", style: "Bold" };
      sbTxt.fontSize = 12.5;
      sbTxt.characters = "🔴 TIMELINE: 9:16 VERTICAL REELS · 30 FPS KINETIC ENGINE (00:15:00)";
      sbTxt.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      sBar.appendChild(sbTxt);
      sbTxt.x = 20;
      sbTxt.y = 12;

      // 3 Timeline Video Zone Cards
      const zones = [
        {
          zone: "ZONE 1: 0 - 3 DETIK",
          title: "Visual Hook Kinetik",
          sub: "Gerakan cepat & teks kontras tinggi tanpa intro basi.",
          metric: "RETENTION > 70%",
          accent: { r: 1, g: 0.24, b: 0.11 },
          x: 24, w: 275
        },
        {
          zone: "ZONE 2: 3 - 10 DETIK",
          title: "Sentuh Masalah Riil",
          sub: "Friksi nyata yang bikin audiens merasa 'ini masalah gue!'.",
          metric: "EMPATHY ENGAGE",
          accent: { r: 1, g: 0.84, b: 0.04 },
          x: 322, w: 275
        },
        {
          zone: "ZONE 3: 10 - 15 DETIK",
          title: "Jembatan Beli Jelas",
          sub: "Solusi produk + ajakan langsung chat WhatsApp kasir.",
          metric: "DIRECT CONVERT",
          accent: { r: 0.06, g: 0.65, b: 0.38 },
          x: 620, w: 275
        }
      ];

      zones.forEach(z => {
        const c = figma.createFrame();
        c.x = z.x;
        c.y = 80;
        c.resize(z.w, 240);
        c.cornerRadius = 14;
        c.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }];
        c.strokes = [{ type: "SOLID", color: z.accent }];
        c.strokeWeight = 2.5;
        hero.appendChild(c);

        const pill = figma.createFrame();
        pill.x = 16;
        pill.y = 16;
        pill.resize(z.w - 32, 28);
        pill.cornerRadius = 6;
        pill.fills = [{ type: "SOLID", color: z.accent }];
        c.appendChild(pill);

        const pt = figma.createText();
        pt.fontName = { family: "Space Mono", style: "Bold" };
        pt.fontSize = 11;
        pt.characters = z.zone;
        pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
        pill.appendChild(pt);
        pt.x = (pill.width - pt.width) / 2;
        pt.y = (pill.height - pt.height) / 2;

        const t = figma.createText();
        t.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
        t.fontSize = 18;
        t.characters = z.title;
        t.x = 16;
        t.y = 58;
        t.resize(z.w - 32, 50);
        t.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
        c.appendChild(t);

        const s = figma.createText();
        s.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
        s.fontSize = 13.5;
        s.characters = z.sub;
        s.x = 16;
        s.y = 115;
        s.resize(z.w - 32, 60);
        s.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
        c.appendChild(s);

        const bBadge = figma.createFrame();
        bBadge.x = 16;
        bBadge.y = 185;
        bBadge.resize(z.w - 32, 36);
        bBadge.cornerRadius = 8;
        bBadge.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
        c.appendChild(bBadge);

        const bbt = figma.createText();
        bbt.fontName = { family: "Space Mono", style: "Bold" };
        bbt.fontSize = 11;
        bbt.characters = "✓ " + z.metric;
        bbt.fills = [{ type: "SOLID", color: z.accent }];
        bBadge.appendChild(bbt);
        bbt.x = (bBadge.width - bbt.width) / 2;
        bbt.y = (bBadge.height - bbt.height) / 2;
      });

      // Bottom Tech Box
      const tBox = figma.createFrame();
      tBox.x = 24;
      tBox.y = 345;
      tBox.resize(872, 110);
      tBox.cornerRadius = 14;
      tBox.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      tBox.strokes = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      tBox.strokeWeight = 2;
      hero.appendChild(tBox);

      const tb1 = figma.createText();
      tb1.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      tb1.fontSize = 19;
      tb1.characters = "Rekayasa Video Vertikal React Remotion · Spring Physics Engine";
      tb1.x = 24;
      tb1.y = 20;
      tb1.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      tBox.appendChild(tb1);

      const tb2 = figma.createText();
      tb2.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      tb2.fontSize = 14;
      tb2.characters = "Zero keyframe kaku. Subtitle dinamis auto-highlight menjaga mata penonton tetap terpaku.";
      tb2.x = 24;
      tb2.y = 50;
      tb2.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      tBox.appendChild(tb2);

      const tbPill = figma.createFrame();
      tbPill.x = 24;
      tbPill.y = 74;
      tbPill.resize(380, 24);
      tbPill.cornerRadius = 6;
      tbPill.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      tBox.appendChild(tbPill);

      const tbpTxt = figma.createText();
      tbpTxt.fontName = { family: "Space Mono", style: "Bold" };
      tbpTxt.fontSize = 10.5;
      tbpTxt.characters = "HASIL: ALGORITMA OTOMATIS DORONG KE FOR YOU PAGE (FYP)";
      tbpTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      tbPill.appendChild(tbpTxt);
      tbpTxt.x = (tbPill.width - tbpTxt.width) / 2;
      tbpTxt.y = (tbPill.height - tbpTxt.height) / 2;
    }

    return { success: true };
  `;

  const res = await callPlugin("execute", { code });
  console.log("Rebuild Hero Visuals 17-20 Result:", res);
}

main().catch(console.error);
