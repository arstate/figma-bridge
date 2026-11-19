import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

async function main() {
  const code = `
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "SemiBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });

    // ==========================================
    // 1. PERFECT POSTER 16 TITLE CENTERING & HIGHLIGHT
    // ==========================================
    const p16 = await figma.getNodeByIdAsync("809:10097");
    const ribGroup = await figma.getNodeByIdAsync("846:83");
    if (ribGroup) {
      const rect = ribGroup.findOne(n => n.name === "Rounded rectangle");
      const text = ribGroup.findOne(n => n.type === "TEXT");
      const highlight = ribGroup.findOne(n => n.name === "Rectangle 52");
      if (rect && text && highlight) {
        // Vertical center
        text.y = rect.y + (rect.height - text.height) / 2;
        text.x = rect.x + (rect.width - text.width) / 2;

        // Measure "Logo Amatir " prefix width
        const measure = figma.createText();
        measure.fontName = text.fontName;
        measure.fontSize = text.fontSize;
        measure.characters = "Logo Amatir ";
        const prefixW = measure.width;

        measure.characters = "Bikin Konsumen Kabur!";
        const suffixW = measure.width;
        measure.remove();

        highlight.y = rect.y + (rect.height - highlight.height) / 2;
        highlight.x = text.x + prefixW - 6;
        highlight.resize(suffixW + 12, highlight.height);
      }
    }

    // ==========================================
    // 2. HELPER TO CREATE FLOATING FOREGROUND LOGO (NO BG, GRADIENT, PROGRESSIVE BLUR)
    // ==========================================
    const logoSource = await figma.getNodeByIdAsync("812:14769"); // Djadi Master Logo Frame

    function injectFloatingLogo(poster, { x, y, rotation, scale = 1, blurRadius = 20, stops }) {
      if (!poster || !logoSource) return;

      // Remove any existing floating logo
      const oldF = poster.findOne(n => n.name === "Floating_Logo_DOF_Progressive");
      if (oldF) oldF.remove();

      const floatLogo = logoSource.clone();
      floatLogo.name = "Floating_Logo_DOF_Progressive";
      floatLogo.fills = [];
      floatLogo.x = x;
      floatLogo.y = y;
      floatLogo.rotation = rotation;
      
      const gradStops = stops || [
        { position: 0, color: { r: 1, g: 0.24, b: 0.11, a: 0.95 } }, // Vermillion
        { position: 1, color: { r: 1, g: 0.84, b: 0.04, a: 0.9 } }   // Gold
      ];

      // Apply vibrant gradient to vector paths inside
      const vectors = floatLogo.findAll(n => n.type === "VECTOR");
      vectors.forEach(v => {
        v.fills = [{
          type: "GRADIENT_LINEAR",
          gradientTransform: [[0.7, -0.7, 0.5], [0.7, 0.7, 0]],
          gradientStops: gradStops
        }];
        v.strokes = [];
      });

      // Apply Progressive Blur for cinematic depth-of-field
      floatLogo.effects = [{
        type: "LAYER_BLUR",
        visible: true,
        radius: blurRadius,
        blurType: "PROGRESSIVE",
        startRadius: 0,
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 1, y: 1 }
      }];

      poster.appendChild(floatLogo);
    }

    // 1. Poster 14 (SEO) - Floating Logo at top right
    const p14 = await figma.getNodeByIdAsync("809:10263");
    if (p14) {
      const oldToken = p14.findOne(n => n.name.includes("Floating_1"));
      if (oldToken) oldToken.remove();
      injectFloatingLogo(p14, {
        x: 910,
        y: 400,
        rotation: -14,
        blurRadius: 18,
        stops: [
          { position: 0, color: { r: 1, g: 0.84, b: 0.04, a: 0.95 } },
          { position: 1, color: { r: 1, g: 0.24, b: 0.11, a: 0.9 } }
        ]
      });
    }

    // 2. Poster 16 (Brand Identity) - Floating Logo at top right
    if (p16) {
      injectFloatingLogo(p16, {
        x: 915,
        y: 390,
        rotation: 14,
        blurRadius: 18
      });
    }

    // 3. Poster 17 (B2B Pitch Deck) - Floating Logo at top right
    const p17 = await figma.getNodeByIdAsync("809:10425");
    if (p17) {
      const oldF17 = p17.findOne(n => n.name.includes("Floating_1"));
      if (oldF17) oldF17.remove();
      injectFloatingLogo(p17, {
        x: 920,
        y: 395,
        rotation: -12,
        blurRadius: 18,
        stops: [
          { position: 0, color: { r: 0.1, g: 0.45, b: 1, a: 0.95 } },
          { position: 1, color: { r: 0.004, g: 0.16, b: 0.41, a: 0.9 } }
        ]
      });
    }

    // 4. Poster 18 (Digital Ecosystem) - Floating Logo at top right
    const p18 = await figma.getNodeByIdAsync("809:10591");
    if (p18) {
      const oldF18 = p18.findOne(n => n.name.includes("Floating_1"));
      if (oldF18) oldF18.remove();
      injectFloatingLogo(p18, {
        x: 915,
        y: 410,
        rotation: 16,
        blurRadius: 18,
        stops: [
          { position: 0, color: { r: 0.2, g: 0.85, b: 0.45, a: 0.95 } },
          { position: 1, color: { r: 1, g: 0.84, b: 0.04, a: 0.9 } }
        ]
      });
    }

    // 5. Poster 19 (Content Strategy) - Floating Logo at top right
    const p19 = await figma.getNodeByIdAsync("809:10758");
    if (p19) {
      const oldF19 = p19.findOne(n => n.name.includes("Floating_1"));
      if (oldF19) oldF19.remove();
      injectFloatingLogo(p19, {
        x: 910,
        y: 395,
        rotation: -15,
        blurRadius: 18,
        stops: [
          { position: 0, color: { r: 1, g: 0.24, b: 0.11, a: 0.95 } },
          { position: 1, color: { r: 1, g: 0.84, b: 0.04, a: 0.9 } }
        ]
      });
    }

    // 6. Poster 20 (9:16 Kinetic Video) - Floating Logo at top right
    const p20 = await figma.getNodeByIdAsync("809:10921");
    if (p20) {
      const oldF20 = p20.findOne(n => n.name.includes("Floating_1"));
      if (oldF20) oldF20.remove();
      injectFloatingLogo(p20, {
        x: 920,
        y: 405,
        rotation: 12,
        blurRadius: 18,
        stops: [
          { position: 0, color: { r: 1, g: 0.84, b: 0.04, a: 0.95 } },
          { position: 1, color: { r: 1, g: 0.24, b: 0.11, a: 0.9 } }
        ]
      });
    }

    return { success: true };
  `;

  const res = await callPlugin("execute", { code });
  console.log("Execute result:", res);

  // Capture clean final screenshots
  const targets = [
    { id: "809:10263", name: "ads_poster_14_perfect" },
    { id: "809:10097", name: "ads_poster_16_perfect" },
    { id: "809:10425", name: "ads_poster_17_perfect" },
    { id: "809:10591", name: "ads_poster_18_perfect" },
    { id: "809:10758", name: "ads_poster_19_perfect" },
    { id: "809:10921", name: "ads_poster_20_perfect" }
  ];

  for (const t of targets) {
    const snap = await callPlugin("get_screenshot", { nodeId: t.id, format: "png", scale: 0.75 });
    const buf = Buffer.from(snap.data, "base64");
    const out = `/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/${t.name}.png`;
    writeFileSync(out, buf);
    console.log(`Saved ${t.name} (${buf.length} bytes)`);
  }
}

main().catch(console.error);
