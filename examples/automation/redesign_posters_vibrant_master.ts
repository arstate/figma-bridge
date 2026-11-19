import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

async function main() {
  console.log("Starting Master Redesign of Campaign Posters 14–20 (Anti-Dead-Colors & Flawless Layout)...");

  const code = `
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });

    const posterIds = [
      { id: "809:10263", name: "P14" },
      { id: "809:9931", name: "P15" },
      { id: "809:10097", name: "P16" },
      { id: "809:10425", name: "P17" },
      { id: "809:10591", name: "P18" },
      { id: "809:10758", name: "P19" },
      { id: "809:10921", name: "P20" }
    ];

    const deepNavy = { r: 0.0039, g: 0.1608, b: 0.4118 }; // #012969
    const pureWhite = { r: 1.0, g: 1.0, b: 1.0 };          // #FFFFFF
    const yellowGold = { r: 1.0, g: 0.8392, b: 0.0392 };  // #FFD60A
    const vermillion = { r: 1.0, g: 0.2431, b: 0.1137 };  // #FF3E1D
    const darkSlate = { r: 0.2, g: 0.25, b: 0.35 };       // #334155
    const softWhite = { r: 0.97, g: 0.98, b: 0.99 };

    let cleanedBlobsCount = 0;
    let repositionedBadgesCount = 0;

    for (const pInfo of posterIds) {
      const p = await figma.getNodeByIdAsync(pInfo.id);
      if (!p) continue;

      // =========================================================================
      // 1. PURGE ALL BLURRY ORBS, SMEARS & STAIN-LIKE ELEMENTS
      // =========================================================================
      const blobs = p.findAll(n => 
        n.name.includes("Progressive_Blur_Orb") ||
        n.name.includes("Geometric_Orb_DOF") ||
        n.name.includes("Floating_Geometric_Pill_Soft") ||
        (n.type === "ELLIPSE" && n.name.toLowerCase().includes("blur"))
      );
      blobs.forEach(b => {
        b.remove();
        cleanedBlobsCount++;
      });

      // =========================================================================
      // 2. REPOSITION CLIPPED LEFT BADGES TO TOP-RIGHT HERO SAFE ZONE
      // =========================================================================
      const leftBadge = p.findOne(n => n.name.startsWith("Floating_2_Crisp_Badge_"));
      if (leftBadge) {
        // Move from x: 15..22 to clean top-right hero position: x = 885, y = 315
        leftBadge.x = 885;
        leftBadge.y = 315;
        leftBadge.rotation = -6;
        leftBadge.effects = [{
          type: "DROP_SHADOW",
          color: { r: 0.0039, g: 0.1608, b: 0.4118, a: 0.5 },
          offset: { x: 4, y: 4 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        }];
        p.appendChild(leftBadge); // Bring to top of poster
        repositionedBadgesCount++;
      }
    }

    // =========================================================================
    // 3. P14: ELIMINATE DEAD NAVY-ON-NAVY BENEFIT ROWS
    // =========================================================================
    const p14 = await figma.getNodeByIdAsync("809:10263");
    if (p14) {
      const frames = [
        await figma.getNodeByIdAsync("848:3034"), // Row 1: Trafik Organik
        await figma.getNodeByIdAsync("848:3038"), // Row 2: Bebas Potongan Komisi
        await figma.getNodeByIdAsync("848:3042")  // Row 3: Kode Kustom Modern
      ];

      // Row 1: Pure White Card with Navy Text & Deep Navy Border
      if (frames[0]) {
        frames[0].fills = [{ type: "SOLID", color: pureWhite }];
        frames[0].strokes = [{ type: "SOLID", color: deepNavy }];
        frames[0].strokeWeight = 2;
        frames[0].cornerRadius = 8;
        frames[0].effects = [{
          type: "DROP_SHADOW",
          color: { r: 0.0039, g: 0.1608, b: 0.4118, a: 0.8 },
          offset: { x: 4, y: 4 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        }];
        const t1 = frames[0].findOne(n => n.type === "TEXT" && n.characters.includes("Trafik Organik"));
        if (t1) t1.fills = [{ type: "SOLID", color: deepNavy }];
        const sub1 = frames[0].findOne(n => n.type === "TEXT" && n.characters.includes("Target kata kunci"));
        if (sub1) sub1.fills = [{ type: "SOLID", color: darkSlate }];
      }

      // Row 2: Pure White Card with Navy Text & Deep Navy Border
      if (frames[1]) {
        frames[1].fills = [{ type: "SOLID", color: pureWhite }];
        frames[1].strokes = [{ type: "SOLID", color: deepNavy }];
        frames[1].strokeWeight = 2;
        frames[1].cornerRadius = 8;
        frames[1].effects = [{
          type: "DROP_SHADOW",
          color: { r: 0.0039, g: 0.1608, b: 0.4118, a: 0.8 },
          offset: { x: 4, y: 4 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        }];
        const t2 = frames[1].findOne(n => n.type === "TEXT" && n.characters.includes("Bebas Potongan"));
        if (t2) t2.fills = [{ type: "SOLID", color: deepNavy }];
        const sub2 = frames[1].findOne(n => n.type === "TEXT" && n.characters.includes("Semua profit"));
        if (sub2) sub2.fills = [{ type: "SOLID", color: darkSlate }];
      }

      // Row 3: High-Energy Yellow Gold Card for Hero Visual Punch!
      if (frames[2]) {
        frames[2].fills = [{ type: "SOLID", color: yellowGold }];
        frames[2].strokes = [{ type: "SOLID", color: deepNavy }];
        frames[2].strokeWeight = 2;
        frames[2].cornerRadius = 8;
        frames[2].effects = [{
          type: "DROP_SHADOW",
          color: { r: 0.0039, g: 0.1608, b: 0.4118, a: 0.8 },
          offset: { x: 4, y: 4 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        }];
        const t3 = frames[2].findOne(n => n.type === "TEXT" && n.characters.includes("Kode Kustom"));
        if (t3) t3.fills = [{ type: "SOLID", color: deepNavy }];
        const sub3 = frames[2].findOne(n => n.type === "TEXT" && n.characters.includes("Dibuat dengan Next.js"));
        if (sub3) sub3.fills = [{ type: "SOLID", color: deepNavy }];
      }
    }

    // =========================================================================
    // 4. P18: ELIMINATE DEAD CARDS IN MIDDLE SECTION
    // =========================================================================
    const p18 = await figma.getNodeByIdAsync("809:10591");
    if (p18) {
      const card1 = await figma.getNodeByIdAsync("848:3109"); // Benteng Anti-Ragu
      const card2 = await figma.getNodeByIdAsync("848:3115"); // Hemat Biaya Admin 15%

      // Card 1: Pure White Card
      if (card1) {
        card1.fills = [{ type: "SOLID", color: pureWhite }];
        card1.strokes = [{ type: "SOLID", color: deepNavy }];
        card1.strokeWeight = 2;
        card1.cornerRadius = 8;
        card1.effects = [{
          type: "DROP_SHADOW",
          color: { r: 0.0039, g: 0.1608, b: 0.4118, a: 0.8 },
          offset: { x: 4, y: 4 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        }];
        const t1 = card1.findOne(n => n.type === "TEXT" && n.characters.includes("Benteng Anti-Ragu"));
        if (t1) t1.fills = [{ type: "SOLID", color: deepNavy }];
        const sub1 = card1.findOne(n => n.type === "TEXT" && n.characters.includes("Official domain"));
        if (sub1) sub1.fills = [{ type: "SOLID", color: darkSlate }];
      }

      // Card 2: Vibrant Yellow Gold Card
      if (card2) {
        card2.fills = [{ type: "SOLID", color: yellowGold }];
        card2.strokes = [{ type: "SOLID", color: deepNavy }];
        card2.strokeWeight = 2;
        card2.cornerRadius = 8;
        card2.effects = [{
          type: "DROP_SHADOW",
          color: { r: 0.0039, g: 0.1608, b: 0.4118, a: 0.8 },
          offset: { x: 4, y: 4 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        }];
        const t2 = card2.findOne(n => n.type === "TEXT" && n.characters.includes("Hemat Biaya"));
        if (t2) t2.fills = [{ type: "SOLID", color: deepNavy }];
        const sub2 = card2.findOne(n => n.type === "TEXT" && n.characters.includes("Kanal mandiri D2C"));
        if (sub2) sub2.fills = [{ type: "SOLID", color: deepNavy }];
      }
    }

    // =========================================================================
    // 5. P20: ELIMINATE DEAD CARDS IN MIDDLE SECTION
    // =========================================================================
    const p20 = await figma.getNodeByIdAsync("809:10921");
    if (p20) {
      const card1 = await figma.getNodeByIdAsync("848:3159"); // Hook Kinetik di Detik 0
      const card2 = await figma.getNodeByIdAsync("848:3165"); // Siap Iklan Meta Ads CBO

      // Card 1: Pure White Card
      if (card1) {
        card1.fills = [{ type: "SOLID", color: pureWhite }];
        card1.strokes = [{ type: "SOLID", color: deepNavy }];
        card1.strokeWeight = 2;
        card1.cornerRadius = 8;
        card1.effects = [{
          type: "DROP_SHADOW",
          color: { r: 0.0039, g: 0.1608, b: 0.4118, a: 0.8 },
          offset: { x: 4, y: 4 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        }];
        const t1 = card1.findOne(n => n.type === "TEXT" && n.characters.includes("Hook Kinetik"));
        if (t1) t1.fills = [{ type: "SOLID", color: deepNavy }];
        const sub1 = card1.findOne(n => n.type === "TEXT" && n.characters.includes("Hentikan scroll"));
        if (sub1) sub1.fills = [{ type: "SOLID", color: darkSlate }];
      }

      // Card 2: Vibrant Yellow Gold Card
      if (card2) {
        card2.fills = [{ type: "SOLID", color: yellowGold }];
        card2.strokes = [{ type: "SOLID", color: deepNavy }];
        card2.strokeWeight = 2;
        card2.cornerRadius = 8;
        card2.effects = [{
          type: "DROP_SHADOW",
          color: { r: 0.0039, g: 0.1608, b: 0.4118, a: 0.8 },
          offset: { x: 4, y: 4 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        }];
        const t2 = card2.findOne(n => n.type === "TEXT" && n.characters.includes("Siap Iklan"));
        if (t2) t2.fills = [{ type: "SOLID", color: deepNavy }];
        const sub2 = card2.findOne(n => n.type === "TEXT" && n.characters.includes("Format vertikal 9:16"));
        if (sub2) sub2.fills = [{ type: "SOLID", color: deepNavy }];
      }
    }

    return {
      success: true,
      cleanedBlobs: cleanedBlobsCount,
      repositionedBadges: repositionedBadgesCount
    };
  `;

  const res = await callPlugin("execute", { code });
  console.log("Master Redesign Execute Result:", JSON.stringify(res, null, 2));

  // Capture updated screenshots
  console.log("Capturing fresh high-resolution screenshots of all 7 redesigned posters...");
  const posters = [
    { id: "809:10263", name: "vibrant_p14" },
    { id: "809:9931", name: "vibrant_p15" },
    { id: "809:10097", name: "vibrant_p16" },
    { id: "809:10425", name: "vibrant_p17" },
    { id: "809:10591", name: "vibrant_p18" },
    { id: "809:10758", name: "vibrant_p19" },
    { id: "809:10921", name: "vibrant_p20" }
  ];

  for (const p of posters) {
    const snap = await callPlugin("get_screenshot", { nodeId: p.id, format: "png", scale: 0.75 });
    const buf = Buffer.from(snap.data, "base64");
    const out = `/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/${p.name}.png`;
    writeFileSync(out, buf);
    console.log(`Saved ${p.name}.png (${buf.length} bytes)`);
  }
}

main().catch(console.error);
