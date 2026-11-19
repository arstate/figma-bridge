import { callPlugin } from "./server/src/relay-client";

async function main() {
  const code = `
    const p14 = await figma.getNodeByIdAsync("809:10263");
    if (!p14) return { error: "p14 not found" };

    // Load fonts
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "SemiBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });

    // 1. Fix search icon in SERP Simulator (media_1793797773871_40e48e66.png)
    const serp = p14.findOne(n => n.name.includes("SERP"));
    if (serp) {
      // Find distorted icon
      const badIcons = serp.findAll(n => n.name.includes("Icon") || n.name.includes("Search") || (n.type === "VECTOR" && n.width < 35 && n.height < 35));
      for (const icon of badIcons) {
        if (icon.name.includes("Search") || (icon.parent && icon.parent.name.includes("Input") || icon.parent.name.includes("Bar"))) {
          const px = icon.x;
          const py = icon.y;
          const parent = icon.parent;
          icon.remove();
          
          // Create pristine vector search icon
          const svgCode = \`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="7" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/>
          </svg>\`;
          const cleanIcon = figma.createNodeFromSvg(svgCode);
          cleanIcon.name = "Clean_Search_Icon";
          cleanIcon.x = px;
          cleanIcon.y = py;
          parent.appendChild(cleanIcon);
        }
      }
    }

    // 2. Remove old P14_Organic_Pipeline (media_1793797678751_d0edce72.png) and replace with clean, tight, proportional cards + Curiosity CTA
    const oldPipeline = p14.findOne(n => n.name.includes("Organic_Pipeline") || n.name.includes("Bottom"));
    if (oldPipeline) {
      oldPipeline.remove();
    }

    // Remove any previous CTA box or floating elements to rebuild cleanly
    const oldCta = p14.findOne(n => n.name === "P14_Curiosity_CTA");
    if (oldCta) oldCta.remove();
    const oldFloat = p14.findOne(n => n.name === "P14_Floating_Progressive_Blur");
    if (oldFloat) oldFloat.remove();

    // 3. Build tight, punchy 3-Card Value Architecture (y: 765, h: 320)
    const cardsFrame = figma.createFrame();
    cardsFrame.name = "P14_Tight_Value_Cards";
    cardsFrame.x = 80;
    cardsFrame.y = 765;
    cardsFrame.resize(920, 330);
    cardsFrame.fills = [];
    cardsFrame.clipsContent = false;
    p14.appendChild(cardsFrame);

    const cardData = [
      {
        stage: "STAGE 01 · STRUKTUR",
        badge: "01",
        title: "Semantic HTML5",
        subtitle: "& Schema JSON-LD",
        b1Title: "Katalog Terbaca Google",
        b1Sub: "Harga, stok & rating terindeks kilat",
        b2Title: "PageSpeed Skor 98+",
        b2Sub: "LCP kilat < 1 detik, anti-bounce",
        pill: "INDEX KILAT 24 JAM",
        bg: { r: 0.97, g: 0.96, b: 0.93 }, // Light cream
        textCol: { r: 0.004, g: 0.16, b: 0.41 },
        accent: { r: 0.15, g: 0.39, b: 0.92 }
      },
      {
        stage: "STAGE 02 · TARGET",
        badge: "02",
        title: "Keyword Riset",
        subtitle: "Niat Beli Tinggi",
        b1Title: "Kata Kunci Transaksional",
        b1Sub: "Bukan sekadar trafik pencari gratisan",
        b2Title: "Target Area Spesifik",
        b2Sub: "Surabaya, Sidoarjo & kota incaran",
        pill: "HIGH-INTENT BUYERS",
        bg: { r: 0.97, g: 0.96, b: 0.93 },
        textCol: { r: 0.004, g: 0.16, b: 0.41 },
        accent: { r: 0.06, g: 0.65, b: 0.38 }
      },
      {
        stage: "STAGE 03 · HASIL",
        badge: "03",
        title: "Aset Digital Abadi",
        subtitle: "Bebas Bakar Iklan",
        b1Title: "Trafik Organik Terus Datang",
        b1Sub: "Calon pembeli siap transfer tiap hari",
        b2Title: "Margin Profit Utuh 100%",
        b2Sub: "Tanpa potongan fee marketplace 15%",
        pill: "PROFIT 100% UTUH",
        bg: { r: 1, g: 0.84, b: 0.04 }, // Gold hero card
        textCol: { r: 0.004, g: 0.16, b: 0.41 },
        accent: { r: 0.7, g: 0, b: 0.11 }
      }
    ];

    const cardW = 290;
    const cardH = 320;
    const gap = 25;

    for (let i = 0; i < 3; i++) {
      const data = cardData[i];
      const cx = i * (cardW + gap);

      // Card shadow
      const sh = figma.createRectangle();
      sh.name = "Shadow";
      sh.x = cx + 8;
      sh.y = 8;
      sh.resize(cardW, cardH);
      sh.cornerRadius = 14;
      sh.fills = [{ type: "SOLID", color: i === 2 ? { r: 0.7, g: 0, b: 0.11 } : { r: 0.004, g: 0.16, b: 0.41 } }];
      cardsFrame.appendChild(sh);

      // Card body
      const c = figma.createFrame();
      c.name = \`Card_\${i+1}\`;
      c.x = cx;
      c.y = 0;
      c.resize(cardW, cardH);
      c.cornerRadius = 14;
      c.fills = [{ type: "SOLID", color: data.bg }];
      c.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      c.strokeWeight = 2;
      cardsFrame.appendChild(c);

      // Stage kicker
      const kTxt = figma.createText();
      kTxt.fontName = { family: "Space Mono", style: "Bold" };
      kTxt.fontSize = 11;
      kTxt.characters = data.stage;
      kTxt.x = 18;
      kTxt.y = 18;
      kTxt.fills = [{ type: "SOLID", color: data.textCol }];
      c.appendChild(kTxt);

      // Title
      const tTxt = figma.createText();
      tTxt.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      tTxt.fontSize = 19;
      tTxt.characters = data.title;
      tTxt.x = 18;
      tTxt.y = 38;
      tTxt.fills = [{ type: "SOLID", color: data.textCol }];
      c.appendChild(tTxt);

      // Subtitle
      const sTxt = figma.createText();
      sTxt.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      sTxt.fontSize = 13.5;
      sTxt.characters = data.subtitle;
      sTxt.x = 18;
      sTxt.y = 62;
      sTxt.fills = [{ type: "SOLID", color: data.accent }];
      c.appendChild(sTxt);

      // Divider line
      const div = figma.createLine();
      div.x = 18;
      div.y = 88;
      div.resize(cardW - 36, 0);
      div.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 }, opacity: 0.15 }];
      div.strokeWeight = 1.2;
      c.appendChild(div);

      // Bullet 1
      const b1T = figma.createText();
      b1T.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      b1T.fontSize = 13.5;
      b1T.characters = "✓ " + data.b1Title;
      b1T.x = 18;
      b1T.y = 104;
      b1T.fills = [{ type: "SOLID", color: data.textCol }];
      c.appendChild(b1T);

      const b1S = figma.createText();
      b1S.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b1S.fontSize = 12;
      b1S.characters = data.b1Sub;
      b1S.x = 34;
      b1S.y = 124;
      b1S.fills = [{ type: "SOLID", color: data.textCol, opacity: 0.75 }];
      c.appendChild(b1S);

      // Bullet 2
      const b2T = figma.createText();
      b2T.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      b2T.fontSize = 13.5;
      b2T.characters = "✓ " + data.b2Title;
      b2T.x = 18;
      b2T.y = 158;
      b2T.fills = [{ type: "SOLID", color: data.textCol }];
      c.appendChild(b2T);

      const b2S = figma.createText();
      b2S.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b2S.fontSize = 12;
      b2S.characters = data.b2Sub;
      b2S.x = 34;
      b2S.y = 178;
      b2S.fills = [{ type: "SOLID", color: data.textCol, opacity: 0.75 }];
      c.appendChild(b2S);

      // Bottom pill badge (fit snuggly, no dead space!)
      const pillFrame = figma.createFrame();
      pillFrame.name = "PillBadge";
      pillFrame.x = 18;
      pillFrame.y = 264;
      pillFrame.resize(cardW - 36, 38);
      pillFrame.cornerRadius = 8;
      pillFrame.fills = [{ type: "SOLID", color: data.textCol }];
      c.appendChild(pillFrame);

      const pTxt = figma.createText();
      pTxt.fontName = { family: "Space Mono", style: "Bold" };
      pTxt.fontSize = 11.5;
      pTxt.characters = data.pill;
      pTxt.fills = [{ type: "SOLID", color: i === 2 ? { r: 1, g: 0.84, b: 0.04 } : { r: 1, g: 1, b: 1 } }];
      pillFrame.appendChild(pTxt);
      pTxt.x = (pillFrame.width - pTxt.width) / 2;
      pTxt.y = (pillFrame.height - pTxt.height) / 2;
    }

    // 4. Build Curiosity-Inducing Micro-CTA Box (y: 1120 .. 1290, h: 160)
    const ctaFrame = figma.createFrame();
    ctaFrame.name = "P14_Curiosity_CTA";
    ctaFrame.x = 80;
    ctaFrame.y = 1120;
    ctaFrame.resize(920, 160);
    ctaFrame.cornerRadius = 16;
    ctaFrame.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }]; // Pitch Dark Navy #030E26
    ctaFrame.strokes = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Gold border
    ctaFrame.strokeWeight = 2.5;

    // Hard shadow for CTA
    const ctaSh = figma.createRectangle();
    ctaSh.name = "CTA_Shadow";
    ctaSh.x = 88;
    ctaSh.y = 1128;
    ctaSh.resize(920, 160);
    ctaSh.cornerRadius = 16;
    ctaSh.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }]; // Crimson shadow
    p14.appendChild(ctaSh);
    p14.appendChild(ctaFrame);

    // Kicker pill
    const ctaPill = figma.createFrame();
    ctaPill.name = "KickerPill";
    ctaPill.x = 24;
    ctaPill.y = 20;
    ctaPill.resize(230, 26);
    ctaPill.cornerRadius = 6;
    ctaPill.fills = [{ type: "SOLID", color: { r: 1, g: 0.24, b: 0.11 } }]; // Vermillion
    ctaFrame.appendChild(ctaPill);

    const cpTxt = figma.createText();
    cpTxt.fontName = { family: "Space Mono", style: "Bold" };
    cpTxt.fontSize = 11;
    cpTxt.characters = "⚡ FREE 15-MIN AUDIT FORENSIK";
    cpTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    ctaPill.appendChild(cpTxt);
    cpTxt.x = (ctaPill.width - cpTxt.width) / 2;
    cpTxt.y = (ctaPill.height - cpTxt.height) / 2;

    // Curiosity Headline
    const ctaHead = figma.createText();
    ctaHead.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    ctaHead.fontSize = 24;
    ctaHead.characters = "Berapa Skor Kecepatan & Ranking Webmu Saat Ini?";
    ctaHead.x = 24;
    ctaHead.y = 56;
    ctaHead.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    ctaFrame.appendChild(ctaHead);

    // Curiosity Subtitle
    const ctaSub = figma.createText();
    ctaSub.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
    ctaSub.fontSize = 14;
    ctaSub.characters = "Kirim URL webmu ke WA Mas Tiar — kami bongkar 3 celah fatal yang bikin pembeli kabur!";
    ctaSub.x = 24;
    ctaSub.y = 92;
    ctaSub.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.85, b: 0.95 } }];
    ctaFrame.appendChild(ctaSub);

    // WhatsApp Action Button
    const ctaBtn = figma.createFrame();
    ctaBtn.name = "WA_Action_Button";
    ctaBtn.x = 24;
    ctaBtn.y = 118;
    ctaBtn.resize(380, 28);
    ctaBtn.fills = [];
    ctaFrame.appendChild(ctaBtn);

    const ctaBtnTxt = figma.createText();
    ctaBtnTxt.fontName = { family: "Space Mono", style: "Bold" };
    ctaBtnTxt.fontSize = 12.5;
    ctaBtnTxt.characters = "👉 KETIK 'AUDIT' KE WA: 0851-9659-8881 →";
    ctaBtnTxt.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Gold
    ctaBtn.appendChild(ctaBtnTxt);

    // 5. Add Foreground Floating Element with PROGRESSIVE BLUR on P14
    const floatMark = figma.createFrame();
    floatMark.name = "P14_Floating_Progressive_Blur";
    floatMark.x = 940;
    floatMark.y = 1110;
    floatMark.resize(110, 110);
    floatMark.cornerRadius = 28;
    floatMark.fills = [{
      type: "GRADIENT_LINEAR",
      gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
      gradientStops: [
        { position: 0, color: { r: 1, g: 0.24, b: 0.11, a: 0.95 } },
        { position: 1, color: { r: 1, g: 0.84, b: 0.04, a: 0.85 } }
      ]
    }];
    floatMark.rotation = -18;
    
    // PROGRESSIVE LAYER BLUR!
    floatMark.effects = [{
      type: "LAYER_BLUR",
      visible: true,
      radius: 30,
      blurType: "PROGRESSIVE",
      startRadius: 0,
      startOffset: { x: 0, y: 0 },
      endOffset: { x: 1, y: 1 }
    }];
    p14.appendChild(floatMark);

    return { success: true };
  `;

  const res = await callPlugin("execute", { code });
  console.log("P14 Remaster Result:", res);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
