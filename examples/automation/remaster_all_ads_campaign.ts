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
    // 1. REMASTER POSTER 16 (Brand Identity & Logo - Warm Cream)
    // ==========================================
    const p16 = await figma.getNodeByIdAsync("809:10097");
    if (p16) {
      // Clean up old bottom cards and CTA
      const toRemove = [];
      p16.children.forEach(c => {
        if (c.name.includes("Group 75") || c.name.includes("Tight") || c.name.includes("Curiosity") || c.name.includes("CTA") || c.name.includes("Floating")) {
          toRemove.push(c);
        }
      });
      toRemove.forEach(c => c.remove());

      // 2 Compact Visual Benefit Bars (y: 890, h: 140)
      const bBarFrame = figma.createFrame();
      bBarFrame.name = "P16_Visual_Benefit_Bars";
      bBarFrame.x = 80;
      bBarFrame.y = 885;
      bBarFrame.resize(920, 140);
      bBarFrame.fills = [];
      p16.appendChild(bBarFrame);

      const b1 = figma.createFrame();
      b1.x = 0;
      b1.y = 0;
      b1.resize(445, 135);
      b1.cornerRadius = 14;
      b1.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b1.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b1.strokeWeight = 2;
      bBarFrame.appendChild(b1);

      const b1Icon = figma.createText();
      b1Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b1Icon.fontSize = 26;
      b1Icon.characters = "🎯";
      b1Icon.x = 18;
      b1Icon.y = 18;
      b1.appendChild(b1Icon);

      const b1Title = figma.createText();
      b1Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b1Title.fontSize = 17;
      b1Title.characters = "Filosofi & Makna Otentik";
      b1Title.x = 60;
      b1Title.y = 18;
      b1Title.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b1.appendChild(b1Title);

      const b1Desc = figma.createText();
      b1Desc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b1Desc.fontSize = 13;
      b1Desc.characters = "Diriset khusus dari karakter bisnis riil. Bukan template pasaran yang dipakai ribuan brand.";
      b1Desc.x = 18;
      b1Desc.y = 56;
      b1Desc.resize(410, 45);
      b1Desc.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
      b1.appendChild(b1Desc);

      // Pill badge b1
      const b1Pill = figma.createFrame();
      b1Pill.x = 18;
      b1Pill.y = 100;
      b1Pill.resize(170, 24);
      b1Pill.cornerRadius = 6;
      b1Pill.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b1.appendChild(b1Pill);

      const b1Pt = figma.createText();
      b1Pt.fontName = { family: "Space Mono", style: "Bold" };
      b1Pt.fontSize = 10.5;
      b1Pt.characters = "UNIQUE BRAND STORY";
      b1Pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b1Pill.appendChild(b1Pt);
      b1Pt.x = (b1Pill.width - b1Pt.width) / 2;
      b1Pt.y = (b1Pill.height - b1Pt.height) / 2;

      // Bar 2
      const b2 = figma.createFrame();
      b2.x = 475;
      b2.y = 0;
      b2.resize(445, 135);
      b2.cornerRadius = 14;
      b2.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Gold
      b2.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b2.strokeWeight = 2;
      bBarFrame.appendChild(b2);

      const b2Icon = figma.createText();
      b2Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b2Icon.fontSize = 26;
      b2Icon.characters = "📘";
      b2Icon.x = 18;
      b2Icon.y = 18;
      b2.appendChild(b2Icon);

      const b2Title = figma.createText();
      b2Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b2Title.fontSize = 17;
      b2Title.characters = "Brand Guidelines PDF";
      b2Title.x = 60;
      b2Title.y = 18;
      b2Title.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b2.appendChild(b2Title);

      const b2Desc = figma.createText();
      b2Desc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b2Desc.fontSize = 13;
      b2Desc.characters = "Panduan warna GSM v2.5 digital & cetak kemasan, tipografi terlisensi, siap paten HKI resmi.";
      b2Desc.x = 18;
      b2Desc.y = 56;
      b2Desc.resize(410, 45);
      b2Desc.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b2.appendChild(b2Desc);

      const b2Pill = figma.createFrame();
      b2Pill.x = 18;
      b2Pill.y = 100;
      b2Pill.resize(190, 24);
      b2Pill.cornerRadius = 6;
      b2Pill.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }]; // Crimson
      b2.appendChild(b2Pill);

      const b2Pt = figma.createText();
      b2Pt.fontName = { family: "Space Mono", style: "Bold" };
      b2Pt.fontSize = 10.5;
      b2Pt.characters = "STANDARISASI GSM v2.5";
      b2Pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b2Pill.appendChild(b2Pt);
      b2Pt.x = (b2Pill.width - b2Pt.width) / 2;
      b2Pt.y = (b2Pill.height - b2Pt.height) / 2;

      // Massive Curiosity CTA Section (y: 1045, h: 260)
      const ctaSh = figma.createRectangle();
      ctaSh.x = 88;
      ctaSh.y = 1053;
      ctaSh.resize(920, 260);
      ctaSh.cornerRadius = 20;
      ctaSh.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      p16.appendChild(ctaSh);

      const ctaBox = figma.createFrame();
      ctaBox.name = "P16_Curiosity_CTA_Massive";
      ctaBox.x = 80;
      ctaBox.y = 1045;
      ctaBox.resize(920, 260);
      ctaBox.cornerRadius = 20;
      ctaBox.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }]; // Deep Navy
      ctaBox.strokes = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Gold
      ctaBox.strokeWeight = 3;
      p16.appendChild(ctaBox);

      const cKicker = figma.createFrame();
      cKicker.x = 28;
      cKicker.y = 24;
      cKicker.resize(280, 30);
      cKicker.cornerRadius = 6;
      cKicker.fills = [{ type: "SOLID", color: { r: 1, g: 0.24, b: 0.11 } }];
      ctaBox.appendChild(cKicker);

      const ckTxt = figma.createText();
      ckTxt.fontName = { family: "Space Mono", style: "Bold" };
      ckTxt.fontSize = 11.5;
      ckTxt.characters = "⚡ AUDIT LOGO GRATIS 15 MENIT";
      ckTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      cKicker.appendChild(ckTxt);
      ckTxt.x = (cKicker.width - ckTxt.width) / 2;
      ckTxt.y = (cKicker.height - ckTxt.height) / 2;

      const cTitle = figma.createText();
      cTitle.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      cTitle.fontSize = 28;
      cTitle.characters = "Logo Bisnismu Masih Terlihat Amatir?";
      cTitle.x = 28;
      cTitle.y = 66;
      cTitle.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      ctaBox.appendChild(cTitle);

      const cDesc = figma.createText();
      cDesc.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      cDesc.fontSize = 15;
      cDesc.characters = "Kirimkan foto logomu ke WhatsApp Mas Tiar — Kami bedah daya jual & kelayakan paten HKI gratis!";
      cDesc.x = 28;
      cDesc.y = 110;
      cDesc.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      ctaBox.appendChild(cDesc);

      const cBtn = figma.createFrame();
      cBtn.x = 28;
      cBtn.y = 160;
      cBtn.resize(864, 72);
      cBtn.cornerRadius = 14;
      cBtn.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Gold
      ctaBox.appendChild(cBtn);

      const cBtnTxt = figma.createText();
      cBtnTxt.fontName = { family: "Space Mono", style: "Bold" };
      cBtnTxt.fontSize = 18;
      cBtnTxt.characters = "👉 KETIK 'LOGO' KE WHATSAPP: 0851-9659-8881 →";
      cBtnTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      cBtn.appendChild(cBtnTxt);
      cBtnTxt.x = (cBtn.width - cBtnTxt.width) / 2;
      cBtnTxt.y = (cBtn.height - cBtnTxt.height) / 2;

      // 3 Floating Elements
      const f1 = figma.createFrame();
      f1.name = "Floating_1_Progressive_Blur_Monogram";
      f1.x = 930;
      f1.y = 440;
      f1.resize(115, 115);
      f1.cornerRadius = 30;
      f1.fills = [{
        type: "GRADIENT_LINEAR",
        gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
        gradientStops: [
          { position: 0, color: { r: 1, g: 0.24, b: 0.11, a: 0.95 } },
          { position: 1, color: { r: 1, g: 0.84, b: 0.04, a: 0.85 } }
        ]
      }];
      f1.rotation = 12;
      f1.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: 30,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];
      p16.appendChild(f1);

      const f2 = figma.createFrame();
      f2.name = "Floating_2_Crisp_Badge_Vector";
      f2.x = 30;
      f2.y = 790;
      f2.resize(95, 95);
      f2.cornerRadius = 24;
      f2.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      f2.strokes = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      f2.strokeWeight = 3;
      f2.rotation = -14;
      p16.appendChild(f2);

      const f2t = figma.createText();
      f2t.fontName = { family: "Space Mono", style: "Bold" };
      f2t.fontSize = 24;
      f2t.characters = "SVG";
      f2t.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      f2.appendChild(f2t);
      f2t.x = (f2.width - f2t.width) / 2;
      f2t.y = (f2.height - f2t.height) / 2;

      const f3 = figma.createEllipse();
      f3.name = "Floating_3_Progressive_Blur_Orb";
      f3.x = 955;
      f3.y = 1020;
      f3.resize(85, 85);
      f3.fills = [{ type: "SOLID", color: { r: 1, g: 0.24, b: 0.11 } }];
      f3.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: 26,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];
      p16.appendChild(f3);
    }

    // ==========================================
    // 2. REMASTER POSTER 17 (B2B Pitch Deck - Warm Cream)
    // ==========================================
    const p17 = await figma.getNodeByIdAsync("809:10425");
    if (p17) {
      const toRemove = [];
      p17.children.forEach(c => {
        if (c.name.includes("Tight") || c.name.includes("Curiosity") || c.name.includes("Bottom") || c.name.includes("CTA") || c.name.includes("Floating")) {
          toRemove.push(c);
        }
      });
      toRemove.forEach(c => c.remove());

      // Replace Mid Dossier with Larger Visual Showcase
      const mid17 = p17.findOne(n => n.name.includes("Mid"));
      if (mid17) {
        mid17.y = 340;
        mid17.resize(920, 480);
      }

      // 2 Compact Visual Benefit Bars (y: 840, h: 180)
      const bBar17 = figma.createFrame();
      bBar17.name = "P17_Visual_Benefit_Bars";
      bBar17.x = 80;
      bBar17.y = 840;
      bBar17.resize(920, 185);
      bBar17.fills = [];
      p17.appendChild(bBar17);

      const b1 = figma.createFrame();
      b1.x = 0;
      b1.y = 0;
      b1.resize(445, 185);
      b1.cornerRadius = 14;
      b1.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b1.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b1.strokeWeight = 2;
      bBar17.appendChild(b1);

      const b1Icon = figma.createText();
      b1Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b1Icon.fontSize = 28;
      b1Icon.characters = "🏛️";
      b1Icon.x = 20;
      b1Icon.y = 18;
      b1.appendChild(b1Icon);

      const b1Title = figma.createText();
      b1Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b1Title.fontSize = 18;
      b1Title.characters = "Editorial Hierarchy Swiss";
      b1Title.x = 64;
      b1Title.y = 20;
      b1Title.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b1.appendChild(b1Title);

      const b1Desc = figma.createText();
      b1Desc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b1Desc.fontSize = 14;
      b1Desc.characters = "Tipografi berwibawa standar agensi multinasional. Bebas huruf alay, direksi dan investor langsung yakin bermitra.";
      b1Desc.x = 20;
      b1Desc.y = 60;
      b1Desc.resize(405, 60);
      b1Desc.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
      b1.appendChild(b1Desc);

      const b1Pill = figma.createFrame();
      b1Pill.x = 20;
      b1Pill.y = 135;
      b1Pill.resize(190, 26);
      b1Pill.cornerRadius = 6;
      b1Pill.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b1.appendChild(b1Pill);

      const b1Pt = figma.createText();
      b1Pt.fontName = { family: "Space Mono", style: "Bold" };
      b1Pt.fontSize = 11;
      b1Pt.characters = "EXECUTIVE DOSSIER";
      b1Pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b1Pill.appendChild(b1Pt);
      b1Pt.x = (b1Pill.width - b1Pt.width) / 2;
      b1Pt.y = (b1Pill.height - b1Pt.height) / 2;

      // Bar 2
      const b2 = figma.createFrame();
      b2.x = 475;
      b2.y = 0;
      b2.resize(445, 185);
      b2.cornerRadius = 14;
      b2.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Gold
      b2.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b2.strokeWeight = 2;
      bBar17.appendChild(b2);

      const b2Icon = figma.createText();
      b2Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b2Icon.fontSize = 28;
      b2Icon.characters = "📄";
      b2Icon.x = 20;
      b2Icon.y = 18;
      b2.appendChild(b2Icon);

      const b2Title = figma.createText();
      b2Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b2Title.fontSize = 18;
      b2Title.characters = "Dua Format Siap Pakai";
      b2Title.x = 64;
      b2Title.y = 20;
      b2Title.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b2.appendChild(b2Title);

      const b2Desc = figma.createText();
      b2Desc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b2Desc.fontSize = 14;
      b2Desc.characters = "PDF High-Res 300 DPI mewah saat dicetak di hadapan dewan direksi + versi digital ringan < 5MB siap kirim via WhatsApp.";
      b2Desc.x = 20;
      b2Desc.y = 60;
      b2Desc.resize(405, 60);
      b2Desc.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b2.appendChild(b2Desc);

      const b2Pill = figma.createFrame();
      b2Pill.x = 20;
      b2Pill.y = 135;
      b2Pill.resize(190, 26);
      b2Pill.cornerRadius = 6;
      b2Pill.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      b2.appendChild(b2Pill);

      const b2Pt = figma.createText();
      b2Pt.fontName = { family: "Space Mono", style: "Bold" };
      b2Pt.fontSize = 11;
      b2Pt.characters = "CETAK 300 DPI & WA";
      b2Pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b2Pill.appendChild(b2Pt);
      b2Pt.x = (b2Pill.width - b2Pt.width) / 2;
      b2Pt.y = (b2Pill.height - b2Pt.height) / 2;

      // Massive Curiosity CTA Section (y: 1045, h: 260)
      const ctaSh17 = figma.createRectangle();
      ctaSh17.x = 88;
      ctaSh17.y = 1053;
      ctaSh17.resize(920, 260);
      ctaSh17.cornerRadius = 20;
      ctaSh17.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      p17.appendChild(ctaSh17);

      const ctaBox17 = figma.createFrame();
      ctaBox17.name = "P17_Curiosity_CTA_Massive";
      ctaBox17.x = 80;
      ctaBox17.y = 1045;
      ctaBox17.resize(920, 260);
      ctaBox17.cornerRadius = 20;
      ctaBox17.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }]; // Deep Navy
      ctaBox17.strokes = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      ctaBox17.strokeWeight = 3;
      p17.appendChild(ctaBox17);

      const cKicker17 = figma.createFrame();
      cKicker17.x = 28;
      cKicker17.y = 24;
      cKicker17.resize(280, 30);
      cKicker17.cornerRadius = 6;
      cKicker17.fills = [{ type: "SOLID", color: { r: 1, g: 0.24, b: 0.11 } }];
      ctaBox17.appendChild(cKicker17);

      const ckTxt17 = figma.createText();
      ckTxt17.fontName = { family: "Space Mono", style: "Bold" };
      ckTxt17.fontSize = 11.5;
      ckTxt17.characters = "⚡ REVIEW PITCH DECK GRATIS";
      ckTxt17.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      cKicker17.appendChild(ckTxt17);
      ckTxt17.x = (cKicker17.width - ckTxt17.width) / 2;
      ckTxt17.y = (cKicker17.height - ckTxt17.height) / 2;

      const cTitle17 = figma.createText();
      cTitle17.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      cTitle17.fontSize = 28;
      cTitle17.characters = "Deck Tendermu Masih Sering Ditolak Direksi?";
      cTitle17.x = 28;
      cTitle17.y = 66;
      cTitle17.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      ctaBox17.appendChild(cTitle17);

      const cDesc17 = figma.createText();
      cDesc17.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      cDesc17.fontSize = 15;
      cDesc17.characters = "Konsultasikan draf deck bisnismu ke WA Mas Tiar — Kami bedah 3 celah narasi yang bikin investor ragu!";
      cDesc17.x = 28;
      cDesc17.y = 110;
      cDesc17.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      ctaBox17.appendChild(cDesc17);

      const cBtn17 = figma.createFrame();
      cBtn17.x = 28;
      cBtn17.y = 160;
      cBtn17.resize(864, 72);
      cBtn17.cornerRadius = 14;
      cBtn17.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      ctaBox17.appendChild(cBtn17);

      const cBtnTxt17 = figma.createText();
      cBtnTxt17.fontName = { family: "Space Mono", style: "Bold" };
      cBtnTxt17.fontSize = 18;
      cBtnTxt17.characters = "👉 KETIK 'DECK' KE WHATSAPP: 0851-9659-8881 →";
      cBtnTxt17.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      cBtn17.appendChild(cBtnTxt17);
      cBtnTxt17.x = (cBtn17.width - cBtnTxt17.width) / 2;
      cBtnTxt17.y = (cBtn17.height - cBtnTxt17.height) / 2;

      // 3 Floating Elements
      const f1 = figma.createFrame();
      f1.name = "Floating_1_Progressive_Blur_Doc";
      f1.x = 920;
      f1.y = 300;
      f1.resize(120, 120);
      f1.cornerRadius = 30;
      f1.fills = [{
        type: "GRADIENT_LINEAR",
        gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
        gradientStops: [
          { position: 0, color: { r: 0.004, g: 0.16, b: 0.41, a: 0.95 } },
          { position: 1, color: { r: 0.15, g: 0.39, b: 0.92, a: 0.85 } }
        ]
      }];
      f1.rotation = 15;
      f1.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: 32,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];
      p17.appendChild(f1);

      const f2 = figma.createFrame();
      f2.name = "Floating_2_Crisp_Badge_SLA";
      f2.x = 30;
      f2.y = 780;
      f2.resize(95, 95);
      f2.cornerRadius = 24;
      f2.fills = [{ type: "SOLID", color: { r: 0.06, g: 0.65, b: 0.38 } }];
      f2.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      f2.strokeWeight = 3;
      f2.rotation = -12;
      p17.appendChild(f2);

      const f2t = figma.createText();
      f2t.fontName = { family: "Space Mono", style: "Bold" };
      f2t.fontSize = 20;
      f2t.characters = "100%";
      f2t.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      f2.appendChild(f2t);
      f2t.x = (f2.width - f2t.width) / 2;
      f2t.y = (f2.height - f2t.height) / 2;

      const f3 = figma.createEllipse();
      f3.name = "Floating_3_Progressive_Blur_Orb";
      f3.x = 955;
      f3.y = 1010;
      f3.resize(85, 85);
      f3.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      f3.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: 28,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];
      p17.appendChild(f3);
    }

    // ==========================================
    // 3. REMASTER POSTER 18 (Digital Ecosystem - Deep Navy)
    // ==========================================
    const p18 = await figma.getNodeByIdAsync("809:10591");
    if (p18) {
      const toRemove = [];
      p18.children.forEach(c => {
        if (c.name.includes("Tight") || c.name.includes("Curiosity") || c.name.includes("Bottom") || c.name.includes("CTA") || c.name.includes("Floating")) {
          toRemove.push(c);
        }
      });
      toRemove.forEach(c => c.remove());

      const mid18 = p18.findOne(n => n.name.includes("Mid"));
      if (mid18) {
        mid18.y = 340;
        mid18.resize(920, 480);
      }

      // 2 Compact Visual Benefit Bars (y: 840, h: 185)
      const bBar18 = figma.createFrame();
      bBar18.name = "P18_Visual_Benefit_Bars";
      bBar18.x = 80;
      bBar18.y = 840;
      bBar18.resize(920, 185);
      bBar18.fills = [];
      p18.appendChild(bBar18);

      const b1 = figma.createFrame();
      b1.x = 0;
      b1.y = 0;
      b1.resize(445, 185);
      b1.cornerRadius = 14;
      b1.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }];
      b1.strokes = [{ type: "SOLID", color: { r: 0.25, g: 0.55, b: 0.95 } }];
      b1.strokeWeight = 2;
      bBar18.appendChild(b1);

      const b1Icon = figma.createText();
      b1Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b1Icon.fontSize = 28;
      b1Icon.characters = "🛡️";
      b1Icon.x = 20;
      b1Icon.y = 18;
      b1.appendChild(b1Icon);

      const b1Title = figma.createText();
      b1Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b1Title.fontSize = 18;
      b1Title.characters = "Benteng Anti-Ragu Toko Resmi";
      b1Title.x = 64;
      b1Title.y = 20;
      b1Title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b1.appendChild(b1Title);

      const b1Desc = figma.createText();
      b1Desc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b1Desc.fontSize = 14;
      b1Desc.characters = "Official domain .com terverifikasi SSL & checkout WhatsApp kilat. Menghapus keraguan pembeli saat transaksi.";
      b1Desc.x = 20;
      b1Desc.y = 60;
      b1Desc.resize(405, 60);
      b1Desc.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      b1.appendChild(b1Desc);

      const b1Pill = figma.createFrame();
      b1Pill.x = 20;
      b1Pill.y = 135;
      b1Pill.resize(190, 26);
      b1Pill.cornerRadius = 6;
      b1Pill.fills = [{ type: "SOLID", color: { r: 0.06, g: 0.65, b: 0.38 } }];
      b1.appendChild(b1Pill);

      const b1Pt = figma.createText();
      b1Pt.fontName = { family: "Space Mono", style: "Bold" };
      b1Pt.fontSize = 11;
      b1Pt.characters = "100% TRUST ACCREDITED";
      b1Pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b1Pill.appendChild(b1Pt);
      b1Pt.x = (b1Pill.width - b1Pt.width) / 2;
      b1Pt.y = (b1Pill.height - b1Pt.height) / 2;

      // Bar 2
      const b2 = figma.createFrame();
      b2.x = 475;
      b2.y = 0;
      b2.resize(445, 185);
      b2.cornerRadius = 14;
      b2.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }];
      b2.strokes = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      b2.strokeWeight = 2;
      bBar18.appendChild(b2);

      const b2Icon = figma.createText();
      b2Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b2Icon.fontSize = 28;
      b2Icon.characters = "💎";
      b2Icon.x = 20;
      b2Icon.y = 18;
      b2.appendChild(b2Icon);

      const b2Title = figma.createText();
      b2Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b2Title.fontSize = 18;
      b2Title.characters = "Hemat Biaya Admin 15%";
      b2Title.x = 64;
      b2Title.y = 20;
      b2Title.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      b2.appendChild(b2Title);

      const b2Desc = figma.createText();
      b2Desc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b2Desc.fontSize = 14;
      b2Desc.characters = "Kanal mandiri D2C: simpan margin keuntungan utuh tanpa potongan komisi platform, kuasai database pembeli sendiri.";
      b2Desc.x = 20;
      b2Desc.y = 60;
      b2Desc.resize(405, 60);
      b2Desc.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      b2.appendChild(b2Desc);

      const b2Pill = figma.createFrame();
      b2Pill.x = 20;
      b2Pill.y = 135;
      b2Pill.resize(190, 26);
      b2Pill.cornerRadius = 6;
      b2Pill.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      b2.appendChild(b2Pill);

      const b2Pt = figma.createText();
      b2Pt.fontName = { family: "Space Mono", style: "Bold" };
      b2Pt.fontSize = 11;
      b2Pt.characters = "PROFIT 100% MILIKMU";
      b2Pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b2Pill.appendChild(b2Pt);
      b2Pt.x = (b2Pill.width - b2Pt.width) / 2;
      b2Pt.y = (b2Pill.height - b2Pt.height) / 2;

      // Massive Curiosity CTA Section (y: 1045, h: 260)
      const ctaSh18 = figma.createRectangle();
      ctaSh18.x = 88;
      ctaSh18.y = 1053;
      ctaSh18.resize(920, 260);
      ctaSh18.cornerRadius = 20;
      ctaSh18.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      p18.appendChild(ctaSh18);

      const ctaBox18 = figma.createFrame();
      ctaBox18.name = "P18_Curiosity_CTA_Massive";
      ctaBox18.x = 80;
      ctaBox18.y = 1045;
      ctaBox18.resize(920, 260);
      ctaBox18.cornerRadius = 20;
      ctaBox18.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Solid Gold
      ctaBox18.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      ctaBox18.strokeWeight = 3;
      p18.appendChild(ctaBox18);

      const cKicker18 = figma.createFrame();
      cKicker18.x = 28;
      cKicker18.y = 24;
      cKicker18.resize(280, 30);
      cKicker18.cornerRadius = 6;
      cKicker18.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      ctaBox18.appendChild(cKicker18);

      const ckTxt18 = figma.createText();
      ckTxt18.fontName = { family: "Space Mono", style: "Bold" };
      ckTxt18.fontSize = 11.5;
      ckTxt18.characters = "⚡ HITUNG MARGIN BOCOR TOKO";
      ckTxt18.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      cKicker18.appendChild(ckTxt18);
      ckTxt18.x = (cKicker18.width - ckTxt18.width) / 2;
      ckTxt18.y = (cKicker18.height - ckTxt18.height) / 2;

      const cTitle18 = figma.createText();
      cTitle18.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      cTitle18.fontSize = 28;
      cTitle18.characters = "Berapa Juta Keuntunganmu yang Hilang Tiap Bulan?";
      cTitle18.x = 28;
      cTitle18.y = 66;
      cTitle18.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      ctaBox18.appendChild(cTitle18);

      const cDesc18 = figma.createText();
      cDesc18.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      cDesc18.fontSize = 15;
      cDesc18.characters = "Bangun ekosistem web resmi + medsos rapi. Stop bakar fee admin 15% sia-sia ke marketplace!";
      cDesc18.x = 28;
      cDesc18.y = 110;
      cDesc18.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
      ctaBox18.appendChild(cDesc18);

      const cBtn18 = figma.createFrame();
      cBtn18.x = 28;
      cBtn18.y = 160;
      cBtn18.resize(864, 72);
      cBtn18.cornerRadius = 14;
      cBtn18.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      ctaBox18.appendChild(cBtn18);

      const cBtnTxt18 = figma.createText();
      cBtnTxt18.fontName = { family: "Space Mono", style: "Bold" };
      cBtnTxt18.fontSize = 18;
      cBtnTxt18.characters = "👉 KETIK 'EKOSISTEM' KE WA: 0851-9659-8881 →";
      cBtnTxt18.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      cBtn18.appendChild(cBtnTxt18);
      cBtnTxt18.x = (cBtn18.width - cBtnTxt18.width) / 2;
      cBtnTxt18.y = (cBtn18.height - cBtnTxt18.height) / 2;

      // 3 Floating Elements
      const f1 = figma.createFrame();
      f1.name = "Floating_1_Progressive_Blur_Shield";
      f1.x = 920;
      f1.y = 310;
      f1.resize(120, 120);
      f1.cornerRadius = 32;
      f1.fills = [{
        type: "GRADIENT_LINEAR",
        gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
        gradientStops: [
          { position: 0, color: { r: 0.06, g: 0.65, b: 0.38, a: 0.95 } },
          { position: 1, color: { r: 1, g: 0.84, b: 0.04, a: 0.85 } }
        ]
      }];
      f1.rotation = 14;
      f1.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: 32,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];
      p18.appendChild(f1);

      const f2 = figma.createFrame();
      f2.name = "Floating_2_Crisp_Badge_Fee";
      f2.x = 35;
      f2.y = 780;
      f2.resize(90, 90);
      f2.cornerRadius = 22;
      f2.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      f2.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      f2.strokeWeight = 3;
      f2.rotation = -12;
      p18.appendChild(f2);

      const f2t = figma.createText();
      f2t.fontName = { family: "Space Mono", style: "Bold" };
      f2t.fontSize = 20;
      f2t.characters = "0% FEE";
      f2t.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      f2.appendChild(f2t);
      f2t.x = (f2.width - f2t.width) / 2;
      f2t.y = (f2.height - f2t.height) / 2;

      const f3 = figma.createEllipse();
      f3.name = "Floating_3_Progressive_Blur_Orb";
      f3.x = 955;
      f3.y = 1010;
      f3.resize(80, 80);
      f3.fills = [{ type: "SOLID", color: { r: 1, g: 0.24, b: 0.11 } }];
      f3.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: 26,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];
      p18.appendChild(f3);
    }

    // ==========================================
    // 4. REMASTER POSTER 19 (Content Funnel - Warm Cream)
    // ==========================================
    const p19 = await figma.getNodeByIdAsync("809:10758");
    if (p19) {
      const toRemove = [];
      p19.children.forEach(c => {
        if (c.name.includes("Tight") || c.name.includes("Curiosity") || c.name.includes("Bottom") || c.name.includes("CTA") || c.name.includes("Floating")) {
          toRemove.push(c);
        }
      });
      toRemove.forEach(c => c.remove());

      const mid19 = p19.findOne(n => n.name.includes("Mid"));
      if (mid19) {
        mid19.y = 340;
        mid19.resize(920, 480);
      }

      const bBar19 = figma.createFrame();
      bBar19.name = "P19_Visual_Benefit_Bars";
      bBar19.x = 80;
      bBar19.y = 840;
      bBar19.resize(920, 185);
      bBar19.fills = [];
      p19.appendChild(bBar19);

      const b1 = figma.createFrame();
      b1.x = 0;
      b1.y = 0;
      b1.resize(445, 185);
      b1.cornerRadius = 14;
      b1.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b1.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b1.strokeWeight = 2;
      bBar19.appendChild(b1);

      const b1Icon = figma.createText();
      b1Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b1Icon.fontSize = 28;
      b1Icon.characters = "🔥";
      b1Icon.x = 20;
      b1Icon.y = 18;
      b1.appendChild(b1Icon);

      const b1Title = figma.createText();
      b1Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b1Title.fontSize = 18;
      b1Title.characters = "Stop Kejar Tren Alay";
      b1Title.x = 64;
      b1Title.y = 20;
      b1Title.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b1.appendChild(b1Title);

      const b1Desc = figma.createText();
      b1Desc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b1Desc.fontSize = 14;
      b1Desc.characters = "Tolak joget tanpa cuan yang hanya menggaet penonton bocah. Bangun konten solutif untuk sasar pembeli berduit.";
      b1Desc.x = 20;
      b1Desc.y = 60;
      b1Desc.resize(405, 60);
      b1Desc.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
      b1.appendChild(b1Desc);

      const b1Pill = figma.createFrame();
      b1Pill.x = 20;
      b1Pill.y = 135;
      b1Pill.resize(190, 26);
      b1Pill.cornerRadius = 6;
      b1Pill.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b1.appendChild(b1Pill);

      const b1Pt = figma.createText();
      b1Pt.fontName = { family: "Space Mono", style: "Bold" };
      b1Pt.fontSize = 11;
      b1Pt.characters = "HIGH-BUYER TARGET";
      b1Pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b1Pill.appendChild(b1Pt);
      b1Pt.x = (b1Pill.width - b1Pt.width) / 2;
      b1Pt.y = (b1Pill.height - b1Pt.height) / 2;

      // Bar 2
      const b2 = figma.createFrame();
      b2.x = 475;
      b2.y = 0;
      b2.resize(445, 185);
      b2.cornerRadius = 14;
      b2.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      b2.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b2.strokeWeight = 2;
      bBar19.appendChild(b2);

      const b2Icon = figma.createText();
      b2Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b2Icon.fontSize = 28;
      b2Icon.characters = "📈";
      b2Icon.x = 20;
      b2Icon.y = 18;
      b2.appendChild(b2Icon);

      const b2Title = figma.createText();
      b2Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b2Title.fontSize = 18;
      b2Title.characters = "Save & Share Triggers";
      b2Title.x = 64;
      b2Title.y = 20;
      b2Title.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b2.appendChild(b2Title);

      const b2Desc = figma.createText();
      b2Desc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b2Desc.fontSize = 14;
      b2Desc.characters = "Formula retensi algoritma sejati: memicu audiens membagikan dan menyimpan konten, melipatgandakan jangkauan organik.";
      b2Desc.x = 20;
      b2Desc.y = 60;
      b2Desc.resize(405, 60);
      b2Desc.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      b2.appendChild(b2Desc);

      const b2Pill = figma.createFrame();
      b2Pill.x = 20;
      b2Pill.y = 135;
      b2Pill.resize(190, 26);
      b2Pill.cornerRadius = 6;
      b2Pill.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      b2.appendChild(b2Pill);

      const b2Pt = figma.createText();
      b2Pt.fontName = { family: "Space Mono", style: "Bold" };
      b2Pt.fontSize = 11;
      b2Pt.characters = "ORGANIC FYP VIRAL";
      b2Pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b2Pill.appendChild(b2Pt);
      b2Pt.x = (b2Pill.width - b2Pt.width) / 2;
      b2Pt.y = (b2Pill.height - b2Pt.height) / 2;

      // Massive Curiosity CTA Section (y: 1045, h: 260)
      const ctaSh19 = figma.createRectangle();
      ctaSh19.x = 88;
      ctaSh19.y = 1053;
      ctaSh19.resize(920, 260);
      ctaSh19.cornerRadius = 20;
      ctaSh19.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      p19.appendChild(ctaSh19);

      const ctaBox19 = figma.createFrame();
      ctaBox19.name = "P19_Curiosity_CTA_Massive";
      ctaBox19.x = 80;
      ctaBox19.y = 1045;
      ctaBox19.resize(920, 260);
      ctaBox19.cornerRadius = 20;
      ctaBox19.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }];
      ctaBox19.strokes = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      ctaBox19.strokeWeight = 3;
      p19.appendChild(ctaBox19);

      const cKicker19 = figma.createFrame();
      cKicker19.x = 28;
      cKicker19.y = 24;
      cKicker19.resize(280, 30);
      cKicker19.cornerRadius = 6;
      cKicker19.fills = [{ type: "SOLID", color: { r: 1, g: 0.24, b: 0.11 } }];
      ctaBox19.appendChild(cKicker19);

      const ckTxt19 = figma.createText();
      ckTxt19.fontName = { family: "Space Mono", style: "Bold" };
      ckTxt19.fontSize = 11.5;
      ckTxt19.characters = "⚡ AUDIT RETENSI KONTEN";
      ckTxt19.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      cKicker19.appendChild(ckTxt19);
      ckTxt19.x = (cKicker19.width - ckTxt19.width) / 2;
      ckTxt19.y = (cKicker19.height - ckTxt19.height) / 2;

      const cTitle19 = figma.createText();
      cTitle19.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      cTitle19.fontSize = 28;
      cTitle19.characters = "Penasaran Kenapa Kontenmu Stuck di 200 Views?";
      cTitle19.x = 28;
      cTitle19.y = 66;
      cTitle19.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      ctaBox19.appendChild(cTitle19);

      const cDesc19 = figma.createText();
      cDesc19.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      cDesc19.fontSize = 15;
      cDesc19.characters = "Kirim link akun bisnismu ke Mas Tiar — Kami bedah 3 formula hook kinetik yang bikin videomu tembus FYP!";
      cDesc19.x = 28;
      cDesc19.y = 110;
      cDesc19.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      ctaBox19.appendChild(cDesc19);

      const cBtn19 = figma.createFrame();
      cBtn19.x = 28;
      cBtn19.y = 160;
      cBtn19.resize(864, 72);
      cBtn19.cornerRadius = 14;
      cBtn19.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      ctaBox19.appendChild(cBtn19);

      const cBtnTxt19 = figma.createText();
      cBtnTxt19.fontName = { family: "Space Mono", style: "Bold" };
      cBtnTxt19.fontSize = 18;
      cBtnTxt19.characters = "👉 KETIK 'KONTEN' KE WA: 0851-9659-8881 →";
      cBtnTxt19.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      cBtn19.appendChild(cBtnTxt19);
      cBtnTxt19.x = (cBtn19.width - cBtnTxt19.width) / 2;
      cBtnTxt19.y = (cBtn19.height - cBtnTxt19.height) / 2;

      // 3 Floating Elements
      const f1 = figma.createFrame();
      f1.name = "Floating_1_Progressive_Blur_Flame";
      f1.x = 920;
      f1.y = 310;
      f1.resize(115, 115);
      f1.cornerRadius = 30;
      f1.fills = [{
        type: "GRADIENT_LINEAR",
        gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
        gradientStops: [
          { position: 0, color: { r: 1, g: 0.24, b: 0.11, a: 0.95 } },
          { position: 1, color: { r: 1, g: 0.84, b: 0.04, a: 0.85 } }
        ]
      }];
      f1.rotation = 16;
      f1.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: 30,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];
      p19.appendChild(f1);

      const f2 = figma.createFrame();
      f2.name = "Floating_2_Crisp_Badge_Retention";
      f2.x = 35;
      f2.y = 780;
      f2.resize(90, 90);
      f2.cornerRadius = 22;
      f2.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      f2.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      f2.strokeWeight = 3;
      f2.rotation = -14;
      p19.appendChild(f2);

      const f2t = figma.createText();
      f2t.fontName = { family: "Space Mono", style: "Bold" };
      f2t.fontSize = 18;
      f2t.characters = ">70%";
      f2t.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      f2.appendChild(f2t);
      f2t.x = (f2.width - f2t.width) / 2;
      f2t.y = (f2.height - f2t.height) / 2;

      const f3 = figma.createEllipse();
      f3.name = "Floating_3_Progressive_Blur_Orb";
      f3.x = 955;
      f3.y = 1010;
      f3.resize(80, 80);
      f3.fills = [{ type: "SOLID", color: { r: 0.06, g: 0.65, b: 0.38 } }];
      f3.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: 26,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];
      p19.appendChild(f3);
    }

    // ==========================================
    // 5. REMASTER POSTER 20 (Short-Form Video - Deep Navy)
    // ==========================================
    const p20 = await figma.getNodeByIdAsync("809:10921");
    if (p20) {
      const toRemove = [];
      p20.children.forEach(c => {
        if (c.name.includes("Tight") || c.name.includes("Curiosity") || c.name.includes("Bottom") || c.name.includes("CTA") || c.name.includes("Floating")) {
          toRemove.push(c);
        }
      });
      toRemove.forEach(c => c.remove());

      const mid20 = p20.findOne(n => n.name.includes("Mid"));
      if (mid20) {
        mid20.y = 340;
        mid20.resize(920, 480);
      }

      const bBar20 = figma.createFrame();
      bBar20.name = "P20_Visual_Benefit_Bars";
      bBar20.x = 80;
      bBar20.y = 840;
      bBar20.resize(920, 185);
      bBar20.fills = [];
      p20.appendChild(bBar20);

      const b1 = figma.createFrame();
      b1.x = 0;
      b1.y = 0;
      b1.resize(445, 185);
      b1.cornerRadius = 14;
      b1.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }];
      b1.strokes = [{ type: "SOLID", color: { r: 0.25, g: 0.55, b: 0.95 } }];
      b1.strokeWeight = 2;
      bBar20.appendChild(b1);

      const b1Icon = figma.createText();
      b1Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b1Icon.fontSize = 28;
      b1Icon.characters = "🎬";
      b1Icon.x = 20;
      b1Icon.y = 18;
      b1.appendChild(b1Icon);

      const b1Title = figma.createText();
      b1Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b1Title.fontSize = 18;
      b1Title.characters = "Hook Kinetik di Detik 0";
      b1Title.x = 64;
      b1Title.y = 20;
      b1Title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b1.appendChild(b1Title);

      const b1Desc = figma.createText();
      b1Desc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b1Desc.fontSize = 14;
      b1Desc.characters = "Hentikan scroll jempol audiens di 2 detik pertama tanpa intro bumper logo lambat. Tembak langsung masalah utama.";
      b1Desc.x = 20;
      b1Desc.y = 60;
      b1Desc.resize(405, 60);
      b1Desc.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      b1.appendChild(b1Desc);

      const b1Pill = figma.createFrame();
      b1Pill.x = 20;
      b1Pill.y = 135;
      b1Pill.resize(190, 26);
      b1Pill.cornerRadius = 6;
      b1Pill.fills = [{ type: "SOLID", color: { r: 1, g: 0.24, b: 0.11 } }];
      b1.appendChild(b1Pill);

      const b1Pt = figma.createText();
      b1Pt.fontName = { family: "Space Mono", style: "Bold" };
      b1Pt.fontSize = 11;
      b1Pt.characters = "ZERO BORING INTRO";
      b1Pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b1Pill.appendChild(b1Pt);
      b1Pt.x = (b1Pill.width - b1Pt.width) / 2;
      b1Pt.y = (b1Pill.height - b1Pt.height) / 2;

      // Bar 2
      const b2 = figma.createFrame();
      b2.x = 475;
      b2.y = 0;
      b2.resize(445, 185);
      b2.cornerRadius = 14;
      b2.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }];
      b2.strokes = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      b2.strokeWeight = 2;
      bBar20.appendChild(b2);

      const b2Icon = figma.createText();
      b2Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b2Icon.fontSize = 28;
      b2Icon.characters = "📱";
      b2Icon.x = 20;
      b2Icon.y = 18;
      b2.appendChild(b2Icon);

      const b2Title = figma.createText();
      b2Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      b2Title.fontSize = 18;
      b2Title.characters = "Siap Iklan Meta Ads CBO";
      b2Title.x = 64;
      b2Title.y = 20;
      b2Title.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      b2.appendChild(b2Title);

      const b2Desc = figma.createText();
      b2Desc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
      b2Desc.fontSize = 14;
      b2Desc.characters = "Format vertikal 9:16 standar broadcast TV, subtitle bergerak dinamis, dan terbukti menghasilkan transfer ke WhatsApp.";
      b2Desc.x = 20;
      b2Desc.y = 60;
      b2Desc.resize(405, 60);
      b2Desc.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
      b2.appendChild(b2Desc);

      const b2Pill = figma.createFrame();
      b2Pill.x = 20;
      b2Pill.y = 135;
      b2Pill.resize(190, 26);
      b2Pill.cornerRadius = 6;
      b2Pill.fills = [{ type: "SOLID", color: { r: 0.06, g: 0.65, b: 0.38 } }];
      b2.appendChild(b2Pill);

      const b2Pt = figma.createText();
      b2Pt.fontName = { family: "Space Mono", style: "Bold" };
      b2Pt.fontSize = 11;
      b2Pt.characters = "ADS-READY REELS 9:16";
      b2Pt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      b2Pill.appendChild(b2Pt);
      b2Pt.x = (b2Pill.width - b2Pt.width) / 2;
      b2Pt.y = (b2Pill.height - b2Pt.height) / 2;

      // Massive Curiosity CTA Section (y: 1045, h: 260)
      const ctaSh20 = figma.createRectangle();
      ctaSh20.x = 88;
      ctaSh20.y = 1053;
      ctaSh20.resize(920, 260);
      ctaSh20.cornerRadius = 20;
      ctaSh20.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      p20.appendChild(ctaSh20);

      const ctaBox20 = figma.createFrame();
      ctaBox20.name = "P20_Curiosity_CTA_Massive";
      ctaBox20.x = 80;
      ctaBox20.y = 1045;
      ctaBox20.resize(920, 260);
      ctaBox20.cornerRadius = 20;
      ctaBox20.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Solid Gold
      ctaBox20.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      ctaBox20.strokeWeight = 3;
      p20.appendChild(ctaBox20);

      const cKicker20 = figma.createFrame();
      cKicker20.x = 28;
      cKicker20.y = 24;
      cKicker20.resize(280, 30);
      cKicker20.cornerRadius = 6;
      cKicker20.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
      ctaBox20.appendChild(cKicker20);

      const ckTxt20 = figma.createText();
      ckTxt20.fontName = { family: "Space Mono", style: "Bold" };
      ckTxt20.fontSize = 11.5;
      ckTxt20.characters = "⚡ BEDAH HOOK REELS 15 MENIT";
      ckTxt20.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      cKicker20.appendChild(ckTxt20);
      ckTxt20.x = (cKicker20.width - ckTxt20.width) / 2;
      ckTxt20.y = (cKicker20.height - ckTxt20.height) / 2;

      const cTitle20 = figma.createText();
      cTitle20.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
      cTitle20.fontSize = 28;
      cTitle20.characters = "Punya Ide Video Tapi Bingung Bikin Hook-nya?";
      cTitle20.x = 28;
      cTitle20.y = 66;
      cTitle20.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      ctaBox20.appendChild(cTitle20);

      const cDesc20 = figma.createText();
      cDesc20.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
      cDesc20.fontSize = 15;
      cDesc20.characters = "Konsultasi 15 menit bareng Mas Tiar — Kami bedah storyboard kinetik penahan jempol audiens!";
      cDesc20.x = 28;
      cDesc20.y = 110;
      cDesc20.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
      ctaBox20.appendChild(cDesc20);

      const cBtn20 = figma.createFrame();
      cBtn20.x = 28;
      cBtn20.y = 160;
      cBtn20.resize(864, 72);
      cBtn20.cornerRadius = 14;
      cBtn20.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
      ctaBox20.appendChild(cBtn20);

      const cBtnTxt20 = figma.createText();
      cBtnTxt20.fontName = { family: "Space Mono", style: "Bold" };
      cBtnTxt20.fontSize = 18;
      cBtnTxt20.characters = "👉 KETIK 'REELS' KE WHATSAPP: 0851-9659-8881 →";
      cBtnTxt20.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      cBtn20.appendChild(cBtnTxt20);
      cBtnTxt20.x = (cBtn20.width - cBtnTxt20.width) / 2;
      cBtnTxt20.y = (cBtn20.height - cBtnTxt20.height) / 2;

      // 3 Floating Elements
      const f1 = figma.createFrame();
      f1.name = "Floating_1_Progressive_Blur_Play";
      f1.x = 920;
      f1.y = 310;
      f1.resize(120, 120);
      f1.cornerRadius = 32;
      f1.fills = [{
        type: "GRADIENT_LINEAR",
        gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
        gradientStops: [
          { position: 0, color: { r: 1, g: 0.24, b: 0.11, a: 0.95 } },
          { position: 1, color: { r: 1, g: 0.84, b: 0.04, a: 0.85 } }
        ]
      }];
      f1.rotation = 14;
      f1.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: 32,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];
      p20.appendChild(f1);

      const f2 = figma.createFrame();
      f2.name = "Floating_2_Crisp_Badge_FPS";
      f2.x = 35;
      f2.y = 780;
      f2.resize(90, 90);
      f2.cornerRadius = 22;
      f2.fills = [{ type: "SOLID", color: { r: 0.06, g: 0.65, b: 0.38 } }];
      f2.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      f2.strokeWeight = 3;
      f2.rotation = -12;
      p20.appendChild(f2);

      const f2t = figma.createText();
      f2t.fontName = { family: "Space Mono", style: "Bold" };
      f2t.fontSize = 20;
      f2t.characters = "30 FPS";
      f2t.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      f2.appendChild(f2t);
      f2t.x = (f2.width - f2t.width) / 2;
      f2t.y = (f2.height - f2t.height) / 2;

      const f3 = figma.createEllipse();
      f3.name = "Floating_3_Progressive_Blur_Orb";
      f3.x = 955;
      f3.y = 1010;
      f3.resize(80, 80);
      f3.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
      f3.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: 26,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];
      p20.appendChild(f3);
    }

    return { success: true };
  `;

  const res = await callPlugin("execute", { code });
  console.log("Remaster All Campaign Ads Posters Result:", res);
}

main().catch(console.error);
