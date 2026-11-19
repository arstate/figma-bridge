import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

async function main() {
  const code = `
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "SemiBold" });
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });

    // SVG Icons Map
    const svgIcons = {
      trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF3E1D" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
      shieldPercent: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#012969" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/></svg>',
      zap: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF3E1D" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#012969" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
      bookOpen: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#012969" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
      briefcase: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#012969" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
      fileCheck: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#012969" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>',
      shieldCheck: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#012969" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
      target: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#012969" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
      share2: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#012969" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>',
      play: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#012969" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
      megaphone: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#012969" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>'
    };

    function injectIcon(container, svgStr, x, y, size = 28) {
      if (!container) return;
      // Remove any existing SVG icon in container
      const old = container.findOne(n => n.name === "Vector_SVG_Icon");
      if (old) old.remove();

      const iconFrame = figma.createNodeFromSvg(svgStr);
      iconFrame.name = "Vector_SVG_Icon";
      iconFrame.x = x;
      iconFrame.y = y;
      iconFrame.resize(size, size);
      container.appendChild(iconFrame);
      return iconFrame;
    }

    // Helper to clean empty texts or emoji variation selectors
    function cleanEmptyAndEmojiTexts(node) {
      const texts = node.findAll(n => n.type === "TEXT");
      for (const t of texts) {
        if (!t.characters || t.characters.trim() === "" || t.characters === "️" || t.characters === "\\ufe0f") {
          t.remove();
        }
      }
    }

    // ==============================================================
    // 1. POSTER 14 (Website Tembus Halaman 1 Google)
    // ==============================================================
    const p14 = await figma.getNodeByIdAsync("809:10263");
    if (p14) {
      const p14Hero = await figma.getNodeByIdAsync("848:3016");
      if (p14Hero) {
        const frames = p14Hero.children.slice(2); // Frames at y: 315, 435, 555
        if (frames[0]) {
          cleanEmptyAndEmojiTexts(frames[0]);
          injectIcon(frames[0], svgIcons.trendingUp, 24, 28, 28);
        }
        if (frames[1]) {
          cleanEmptyAndEmojiTexts(frames[1]);
          injectIcon(frames[1], svgIcons.shieldPercent, 24, 28, 28);
        }
        if (frames[2]) {
          cleanEmptyAndEmojiTexts(frames[2]);
          injectIcon(frames[2], svgIcons.zap, 24, 28, 28);
        }
      }

      // Reposition floating badge in P14 to completely clear text
      const b14 = p14.findOne(n => n.name === "Floating_2_Crisp_Badge_TopRank");
      if (b14) {
        b14.x = 15;
        b14.y = 710;
        b14.resize(75, 75);
      }
    }

    // ==============================================================
    // 2. POSTER 15 (Feed Berantakan Bikin Pembeli Ragu)
    // ==============================================================
    const p15 = await figma.getNodeByIdAsync("809:9931");
    if (p15) {
      // Reposition Floating_Geometric_Orb_DOF from (946, 293) to safe margin (970, 170)
      const orb15 = p15.findOne(n => n.name === "Floating_Geometric_Orb_DOF");
      if (orb15) {
        orb15.x = 970;
        orb15.y = 170;
      }
    }

    // ==============================================================
    // 3. POSTER 16 (Brand Identity & Logo)
    // ==============================================================
    const p16 = await figma.getNodeByIdAsync("809:10097");
    if (p16) {
      const bBars16 = p16.findOne(n => n.name === "P16_Visual_Benefit_Bars");
      if (bBars16 && bBars16.children.length >= 2) {
        const c0 = bBars16.children[0];
        const c1 = bBars16.children[1];
        cleanEmptyAndEmojiTexts(c0);
        cleanEmptyAndEmojiTexts(c1);
        injectIcon(c0, svgIcons.sparkles, 20, 18, 26);
        injectIcon(c1, svgIcons.bookOpen, 20, 18, 26);
      }

      const b16 = p16.findOne(n => n.name === "Floating_2_Crisp_Badge_Vector");
      if (b16) {
        b16.x = 22;
        b16.y = 745;
        b16.resize(80, 80);
      }
    }

    // ==============================================================
    // 4. POSTER 17 (B2B Pitch Deck)
    // ==============================================================
    const p17 = await figma.getNodeByIdAsync("809:10425");
    if (p17) {
      const bBars17 = p17.findOne(n => n.name === "P17_Visual_Benefit_Bars");
      if (bBars17 && bBars17.children.length >= 2) {
        const c0 = bBars17.children[0];
        const c1 = bBars17.children[1];
        cleanEmptyAndEmojiTexts(c0);
        cleanEmptyAndEmojiTexts(c1);
        injectIcon(c0, svgIcons.briefcase, 20, 18, 26);
        injectIcon(c1, svgIcons.fileCheck, 20, 18, 26);
      }

      const b17 = p17.findOne(n => n.name === "Floating_2_Crisp_Badge_SLA");
      if (b17) {
        b17.x = 22;
        b17.y = 745;
        b17.resize(80, 80);
      }
    }

    // ==============================================================
    // 5. POSTER 18 (Digital Ecosystem)
    // ==============================================================
    const p18 = await figma.getNodeByIdAsync("809:10591");
    if (p18) {
      const bBars18 = p18.findOne(n => n.name === "P18_Visual_Benefit_Bars");
      if (bBars18 && bBars18.children.length >= 2) {
        const c0 = bBars18.children[0];
        const c1 = bBars18.children[1];
        cleanEmptyAndEmojiTexts(c0);
        cleanEmptyAndEmojiTexts(c1);
        injectIcon(c0, svgIcons.shieldCheck, 20, 18, 26);
        injectIcon(c1, svgIcons.shieldPercent, 20, 18, 26);
      }

      const b18 = p18.findOne(n => n.name === "Floating_2_Crisp_Badge_Fee");
      if (b18) {
        b18.x = 22;
        b18.y = 745;
        b18.resize(80, 80);
      }
    }

    // ==============================================================
    // 6. POSTER 19 (Content Strategy)
    // ==============================================================
    const p19 = await figma.getNodeByIdAsync("809:10758");
    if (p19) {
      const bBars19 = p19.findOne(n => n.name === "P19_Visual_Benefit_Bars");
      if (bBars19 && bBars19.children.length >= 2) {
        const c0 = bBars19.children[0];
        const c1 = bBars19.children[1];
        cleanEmptyAndEmojiTexts(c0);
        cleanEmptyAndEmojiTexts(c1);
        injectIcon(c0, svgIcons.target, 20, 18, 26);
        injectIcon(c1, svgIcons.share2, 20, 18, 26);
      }

      const b19 = p19.findOne(n => n.name === "Floating_2_Crisp_Badge_Retention");
      if (b19) {
        b19.x = 22;
        b19.y = 745;
        b19.resize(80, 80);
      }
    }

    // ==============================================================
    // 7. POSTER 20 (9:16 Kinetic Video)
    // ==============================================================
    const p20 = await figma.getNodeByIdAsync("809:10921");
    if (p20) {
      const bBars20 = p20.findOne(n => n.name === "P20_Visual_Benefit_Bars");
      if (bBars20 && bBars20.children.length >= 2) {
        const c0 = bBars20.children[0];
        const c1 = bBars20.children[1];
        cleanEmptyAndEmojiTexts(c0);
        cleanEmptyAndEmojiTexts(c1);
        injectIcon(c0, svgIcons.play, 20, 18, 26);
        injectIcon(c1, svgIcons.megaphone, 20, 18, 26);
      }

      const b20 = p20.findOne(n => n.name === "Floating_2_Crisp_Badge_FPS");
      if (b20) {
        b20.x = 22;
        b20.y = 745;
        b20.resize(80, 80);
      }
    }

    // ==============================================================
    // 8. FINAL GLOBAL GSM AUDIT & REPLACE ACROSS ALL POSTERS 14-20
    // ==============================================================
    const posterIds = ["809:10263", "809:9931", "809:10097", "809:10425", "809:10591", "809:10758", "809:10921"];
    let gsmReplaced = 0;
    for (const pid of posterIds) {
      const p = await figma.getNodeByIdAsync(pid);
      if (!p) continue;
      const texts = p.findAll(n => n.type === "TEXT");
      for (const t of texts) {
        let str = t.characters || "";
        if (/GSM v2\\.5/i.test(str)) {
          str = str.replace(/GSM v2\\.5/gi, "Standar Desain Modern");
          t.characters = str;
          gsmReplaced++;
        } else if (/GSM/i.test(str)) {
          str = str.replace(/GSM/gi, "Standar Desain Modern");
          t.characters = str;
          gsmReplaced++;
        }
      }
    }

    return { success: true, gsmReplaced };
  `;

  console.log("Applying refinement code...");
  const res = await callPlugin("execute", { code });
  console.log("Refinement Result:", JSON.stringify(res, null, 2));
}

main().catch(console.error);
