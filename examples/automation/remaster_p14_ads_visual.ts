import { callPlugin } from "./server/src/relay-client";

async function main() {
  const code = `
    const p14 = await figma.getNodeByIdAsync("809:10263");
    if (!p14) return { error: "p14 not found" };

    // Load Fonts
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "SemiBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });

    // Clear everything except header and footer
    const keepNames = ["Djadi Header", "Djadi Footer"];
    const toRemove = [];
    p14.children.forEach(c => {
      if (!keepNames.some(k => c.name.includes(k))) {
        toRemove.push(c);
      }
    });
    toRemove.forEach(c => c.remove());

    // 1. BIG HEADLINE SECTION (y: 140, h: 180)
    const headFrame = figma.createFrame();
    headFrame.name = "P14_Big_Headline";
    headFrame.x = 80;
    headFrame.y = 140;
    headFrame.resize(920, 180);
    headFrame.fills = [];
    p14.appendChild(headFrame);

    // Kicker Pill
    const kickerPill = figma.createFrame();
    kickerPill.name = "KickerPill";
    kickerPill.x = 0;
    kickerPill.y = 0;
    kickerPill.resize(260, 30);
    kickerPill.cornerRadius = 6;
    kickerPill.fills = [{ type: "SOLID", color: { r: 1, g: 0.24, b: 0.11 } }]; // Vermillion
    headFrame.appendChild(kickerPill);

    const kTxt = figma.createText();
    kTxt.fontName = { family: "Space Mono", style: "Bold" };
    kTxt.fontSize = 11.5;
    kTxt.characters = "⚡ SEARCH INTENT MONOPOLIZATION";
    kTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    kickerPill.appendChild(kTxt);
    kTxt.x = (kickerPill.width - kTxt.width) / 2;
    kTxt.y = (kickerPill.height - kTxt.height) / 2;

    // Display Headline
    const mainHead = figma.createText();
    mainHead.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    mainHead.fontSize = 48;
    mainHead.characters = "Website Tembus Halaman 1";
    mainHead.x = 0;
    mainHead.y = 42;
    mainHead.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    headFrame.appendChild(mainHead);

    // Sub-Headline Highlight
    const subHead = figma.createText();
    subHead.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    subHead.fontSize = 32;
    subHead.characters = "Banjir Pembeli Siap Transfer!";
    subHead.x = 0;
    subHead.y = 104;
    subHead.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Gold
    headFrame.appendChild(subHead);

    const teaserTxt = figma.createText();
    teaserTxt.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
    teaserTxt.fontSize = 16;
    teaserTxt.characters = "Raih ribuan pelanggan aktif yang mengetik produkmu di Google setiap hari.";
    teaserTxt.x = 0;
    teaserTxt.y = 148;
    teaserTxt.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
    headFrame.appendChild(teaserTxt);

    // 2. HERO VISUAL VECTOR ARTIFACT (y: 340, h: 680) — DOMINAN, VISUAL, MEWAH!
    const heroFrame = figma.createFrame();
    heroFrame.name = "P14_Hero_Visual_Showcase";
    heroFrame.x = 80;
    heroFrame.y = 340;
    heroFrame.resize(920, 680);
    heroFrame.cornerRadius = 20;
    heroFrame.fills = [{ type: "SOLID", color: { r: 0.008, g: 0.08, b: 0.22 } }]; // Deep Blue Container
    heroFrame.strokes = [{ type: "SOLID", color: { r: 0.2, g: 0.45, b: 0.85 } }];
    heroFrame.strokeWeight = 2;

    // Hard Shadow for Hero Container
    const heroSh = figma.createRectangle();
    heroSh.name = "Hero_Shadow";
    heroSh.x = 88;
    heroSh.y = 348;
    heroSh.resize(920, 680);
    heroSh.cornerRadius = 20;
    heroSh.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }]; // Crimson
    p14.appendChild(heroSh);
    p14.appendChild(heroFrame);

    // Inside Hero: Top Browser Search Bar Simulator
    const searchBar = figma.createFrame();
    searchBar.name = "Google_Search_Bar";
    searchBar.x = 24;
    searchBar.y = 24;
    searchBar.resize(872, 60);
    searchBar.cornerRadius = 30;
    searchBar.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    searchBar.strokes = [{ type: "SOLID", color: { r: 0.6, g: 0.75, b: 0.95 } }];
    searchBar.strokeWeight = 2;
    heroFrame.appendChild(searchBar);

    // Clean Search Vector Icon (SVG)
    const searchSvg = \`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/>
    </svg>\`;
    const sIcon = figma.createNodeFromSvg(searchSvg);
    sIcon.x = 22;
    sIcon.y = 18;
    searchBar.appendChild(sIcon);

    const queryTxt = figma.createText();
    queryTxt.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
    queryTxt.fontSize = 17;
    queryTxt.characters = "jasa pembuatan website resmi toko online";
    queryTxt.x = 58;
    queryTxt.y = 19;
    queryTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
    searchBar.appendChild(queryTxt);

    // Search Button
    const sBtn = figma.createFrame();
    sBtn.x = 760;
    sBtn.y = 10;
    sBtn.resize(100, 40);
    sBtn.cornerRadius = 20;
    sBtn.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
    searchBar.appendChild(sBtn);

    const sBtnTxt = figma.createText();
    sBtnTxt.fontName = { family: "Space Mono", style: "Bold" };
    sBtnTxt.fontSize = 13;
    sBtnTxt.characters = "SEARCH";
    sBtnTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    sBtn.appendChild(sBtnTxt);
    sBtnTxt.x = (sBtn.width - sBtnTxt.width) / 2;
    sBtnTxt.y = (sBtn.height - sBtnTxt.height) / 2;

    // #1 RESULT CARD (HERO SPOTLIGHT)
    const rankCard = figma.createFrame();
    rankCard.name = "Rank_1_Spotlight";
    rankCard.x = 24;
    rankCard.y = 104;
    rankCard.resize(872, 190);
    rankCard.cornerRadius = 14;
    rankCard.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    rankCard.strokes = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Gold border
    rankCard.strokeWeight = 3;
    heroFrame.appendChild(rankCard);

    // Rank 1 Badge
    const rBadge = figma.createFrame();
    rBadge.x = 20;
    rBadge.y = 18;
    rBadge.resize(140, 30);
    rBadge.cornerRadius = 6;
    rBadge.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Gold
    rankCard.appendChild(rBadge);

    const rbTxt = figma.createText();
    rbTxt.fontName = { family: "Space Mono", style: "Bold" };
    rbTxt.fontSize = 12;
    rbTxt.characters = "🏆 PERINGKAT #1";
    rbTxt.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
    rBadge.appendChild(rbTxt);
    rbTxt.x = (rBadge.width - rbTxt.width) / 2;
    rbTxt.y = (rBadge.height - rbTxt.height) / 2;

    const urlTxt = figma.createText();
    urlTxt.fontName = { family: "Space Mono", style: "Regular" };
    urlTxt.fontSize = 13;
    urlTxt.characters = "https://toko-resmi-anda.com · Terverifikasi SSL";
    urlTxt.x = 175;
    urlTxt.y = 23;
    urlTxt.fills = [{ type: "SOLID", color: { r: 0.06, g: 0.65, b: 0.38 } }];
    rankCard.appendChild(urlTxt);

    // Speed Pill
    const spPill = figma.createFrame();
    spPill.x = 640;
    spPill.y = 18;
    spPill.resize(212, 30);
    spPill.cornerRadius = 6;
    spPill.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
    rankCard.appendChild(spPill);

    const spTxt = figma.createText();
    spTxt.fontName = { family: "Space Mono", style: "Bold" };
    spTxt.fontSize = 11;
    spTxt.characters = "⚡ PAGESPEED 98+ (0.8s)";
    spTxt.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
    spPill.appendChild(spTxt);
    spTxt.x = (spPill.width - spTxt.width) / 2;
    spTxt.y = (spPill.height - spTxt.height) / 2;

    // Site Title
    const siteTitle = figma.createText();
    siteTitle.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    siteTitle.fontSize = 22;
    siteTitle.characters = "Official Website Brand Anda — Siap Terima Orderan 24 Jam";
    siteTitle.x = 20;
    siteTitle.y = 60;
    siteTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.35, b: 0.85 } }];
    rankCard.appendChild(siteTitle);

    const siteDesc = figma.createText();
    siteDesc.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
    siteDesc.fontSize = 14.5;
    siteDesc.characters = "Katalog interaktif mobile-first, direct checkout WhatsApp 1-klik, margin 100% utuh tanpa potongan fee.";
    siteDesc.x = 20;
    siteDesc.y = 96;
    siteDesc.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
    rankCard.appendChild(siteDesc);

    // Rating & Stars
    const starTxt = figma.createText();
    starTxt.fontName = { family: "Space Mono", style: "Bold" };
    starTxt.fontSize = 13.5;
    starTxt.characters = "★★★★★ 4.9/5 Rating Toko · 1.450+ Transaksi Sukses";
    starTxt.x = 20;
    starTxt.y = 138;
    starTxt.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }];
    rankCard.appendChild(starTxt);

    // 3 VISUAL BENEFIT PILL BARS (Bukan kartu teks membosankan!)
    const p1 = figma.createFrame();
    p1.x = 24;
    p1.y = 315;
    p1.resize(872, 105);
    p1.cornerRadius = 14;
    p1.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }];
    p1.strokes = [{ type: "SOLID", color: { r: 0.25, g: 0.55, b: 0.95 } }];
    heroFrame.appendChild(p1);

    const p1Icon = figma.createText();
    p1Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    p1Icon.fontSize = 32;
    p1Icon.characters = "🚀";
    p1Icon.x = 20;
    p1Icon.y = 30;
    p1.appendChild(p1Icon);

    const p1Title = figma.createText();
    p1Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    p1Title.fontSize = 19;
    p1Title.characters = "Trafik Organik Datang Sendiri Tiap Hari";
    p1Title.x = 80;
    p1Title.y = 20;
    p1Title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    p1.appendChild(p1Title);

    const p1Sub = figma.createText();
    p1Sub.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
    p1Sub.fontSize = 14;
    p1Sub.characters = "Target kata kunci niat beli tinggi (bukan pencari gratisan). Sekali ranking, cuan terus mengalir.";
    p1Sub.x = 80;
    p1Sub.y = 52;
    p1Sub.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
    p1.appendChild(p1Sub);

    // Pill 2
    const p2 = figma.createFrame();
    p2.x = 24;
    p2.y = 435;
    p2.resize(872, 105);
    p2.cornerRadius = 14;
    p2.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }];
    p2.strokes = [{ type: "SOLID", color: { r: 0.06, g: 0.65, b: 0.38 } }];
    heroFrame.appendChild(p2);

    const p2Icon = figma.createText();
    p2Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    p2Icon.fontSize = 32;
    p2Icon.characters = "💰";
    p2Icon.x = 20;
    p2Icon.y = 30;
    p2.appendChild(p2Icon);

    const p2Title = figma.createText();
    p2Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    p2Title.fontSize = 19;
    p2Title.characters = "Bebas Potongan Komisi Marketplace 15%";
    p2Title.x = 80;
    p2Title.y = 20;
    p2Title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    p2.appendChild(p2Title);

    const p2Sub = figma.createText();
    p2Sub.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
    p2Sub.fontSize = 14;
    p2Sub.characters = "Semua profit 100% masuk ke rekening tokomu. Miliki database pelanggan setia sendiri.";
    p2Sub.x = 80;
    p2Sub.y = 52;
    p2Sub.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
    p2.appendChild(p2Sub);

    // Pill 3 (Gold Accent)
    const p3 = figma.createFrame();
    p3.x = 24;
    p3.y = 555;
    p3.resize(872, 105);
    p3.cornerRadius = 14;
    p3.fills = [{ type: "SOLID", color: { r: 0.012, g: 0.055, b: 0.15 } }];
    p3.strokes = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
    heroFrame.appendChild(p3);

    const p3Icon = figma.createText();
    p3Icon.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    p3Icon.fontSize = 32;
    p3Icon.characters = "🛡️";
    p3Icon.x = 20;
    p3Icon.y = 30;
    p3.appendChild(p3Icon);

    const p3Title = figma.createText();
    p3Title.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    p3Title.fontSize = 19;
    p3Title.characters = "Kode Kustom Modern Cepat (Anti-Lemot)";
    p3Title.x = 80;
    p3Title.y = 20;
    p3Title.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
    p3.appendChild(p3Title);

    const p3Sub = figma.createText();
    p3Sub.fontName = { family: "Plus Jakarta Sans", style: "Medium" };
    p3Sub.fontSize = 14;
    p3Sub.characters = "Dibuat dengan Next.js / Tailwind murni. Bukan template WordPress berat yang bikin calon pembeli kabur.";
    p3Sub.x = 80;
    p3Sub.y = 52;
    p3Sub.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.86, b: 0.96 } }];
    p3.appendChild(p3Sub);

    // 3. MASSIVE CURIOSITY CTA SECTION (y: 1045, h: 260) — MENGUNCI ADS CONVERSION!
    const ctaSh = figma.createRectangle();
    ctaSh.x = 88;
    ctaSh.y = 1053;
    ctaSh.resize(920, 260);
    ctaSh.cornerRadius = 20;
    ctaSh.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }]; // Crimson
    p14.appendChild(ctaSh);

    const ctaBox = figma.createFrame();
    ctaBox.name = "P14_Curiosity_CTA_Massive";
    ctaBox.x = 80;
    ctaBox.y = 1045;
    ctaBox.resize(920, 260);
    ctaBox.cornerRadius = 20;
    ctaBox.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Solid Gold Background!
    ctaBox.strokes = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
    ctaBox.strokeWeight = 3;
    p14.appendChild(ctaBox);

    // Kicker Inside CTA
    const cKicker = figma.createFrame();
    cKicker.x = 28;
    cKicker.y = 24;
    cKicker.resize(300, 30);
    cKicker.cornerRadius = 6;
    cKicker.fills = [{ type: "SOLID", color: { r: 0.7, g: 0, b: 0.11 } }]; // Crimson
    ctaBox.appendChild(cKicker);

    const ckTxt = figma.createText();
    ckTxt.fontName = { family: "Space Mono", style: "Bold" };
    ckTxt.fontSize = 11.5;
    ckTxt.characters = "⚡ AUDIT WEB GRATIS 15 MENIT";
    ckTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    cKicker.appendChild(ckTxt);
    ckTxt.x = (cKicker.width - ckTxt.width) / 2;
    ckTxt.y = (cKicker.height - ckTxt.height) / 2;

    // CTA Title
    const cTitle = figma.createText();
    cTitle.fontName = { family: "Plus Jakarta Sans", style: "ExtraBold" };
    cTitle.fontSize = 28;
    cTitle.characters = "Penasaran Berapa Skor Webmu di Google?";
    cTitle.x = 28;
    cTitle.y = 66;
    cTitle.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }];
    ctaBox.appendChild(cTitle);

    const cDesc = figma.createText();
    cDesc.fontName = { family: "Plus Jakarta Sans", style: "Bold" };
    cDesc.fontSize = 15;
    cDesc.characters = "Kirim link tokomu ke WA Mas Tiar — Kami bedah 3 celah fatal yang bikin tokomu sepi pembeli!";
    cDesc.x = 28;
    cDesc.y = 110;
    cDesc.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.25, b: 0.35 } }];
    ctaBox.appendChild(cDesc);

    // Big Action Button
    const cBtn = figma.createFrame();
    cBtn.name = "WhatsApp_CTA_Pill";
    cBtn.x = 28;
    cBtn.y = 160;
    cBtn.resize(864, 72);
    cBtn.cornerRadius = 14;
    cBtn.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.16, b: 0.41 } }]; // Deep Navy
    ctaBox.appendChild(cBtn);

    const cBtnTxt = figma.createText();
    cBtnTxt.fontName = { family: "Space Mono", style: "Bold" };
    cBtnTxt.fontSize = 18;
    cBtnTxt.characters = "👉 KETIK 'AUDIT' KE WHATSAPP: 0851-9659-8881 →";
    cBtnTxt.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }]; // Gold
    cBtn.appendChild(cBtnTxt);
    cBtnTxt.x = (cBtn.width - cBtnTxt.width) / 2;
    cBtnTxt.y = (cBtn.height - cBtnTxt.height) / 2;

    // 4. MULTIPLE FLOATING ELEMENTS (3 Variasi Berbeda dengan PROGRESSIVE BLUR)
    // Floating Element 1: Large Progressive Blur Monogram 'D' in foreground
    const f1 = figma.createFrame();
    f1.name = "Floating_1_Progressive_Blur_SEO_Token";
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
    p14.appendChild(f1);

    // Floating Element 2: Crisp Floating Star Badge (kiri bawah)
    const f2 = figma.createFrame();
    f2.name = "Floating_2_Crisp_Badge_TopRank";
    f2.x = 40;
    f2.y = 880;
    f2.resize(90, 90);
    f2.cornerRadius = 22;
    f2.fills = [{ type: "SOLID", color: { r: 0.06, g: 0.65, b: 0.38 } }];
    f2.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    f2.strokeWeight = 3;
    f2.rotation = -12;
    p14.appendChild(f2);

    const f2t = figma.createText();
    f2t.fontName = { family: "Space Mono", style: "Bold" };
    f2t.fontSize = 28;
    f2t.characters = "#1";
    f2t.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    f2.appendChild(f2t);
    f2t.x = (f2.width - f2t.width) / 2;
    f2t.y = (f2.height - f2t.height) / 2;

    // Floating Element 3: Foreground Progressive Blur Micro Orb (kanan bawah)
    const f3 = figma.createEllipse();
    f3.name = "Floating_3_Progressive_Blur_Orb";
    f3.x = 960;
    f3.y = 1010;
    f3.resize(80, 80);
    f3.fills = [{ type: "SOLID", color: { r: 1, g: 0.84, b: 0.04 } }];
    f3.effects = [{
      type: "LAYER_BLUR",
      visible: true,
      radius: 24,
      blurType: "PROGRESSIVE",
      startRadius: 0,
      startOffset: { x: 0, y: 0 },
      endOffset: { x: 1, y: 1 }
    }];
    p14.appendChild(f3);

    return { success: true };
  `;

  const res = await callPlugin("execute", { code });
  console.log("Remaster Ads Poster 14 Result:", res);
}

main().catch(console.error);
