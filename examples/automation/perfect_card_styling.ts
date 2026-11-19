import { writeFileSync } from "node:fs";
import { callPlugin, exec } from "./server/src/relay-client";

export const script = `
// 1. Load Fonts
await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "SemiBold" });
await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Medium" });
await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Regular" });

const cNavy = { r: 0.00392, g: 0.16078, b: 0.41176 };
const cGold = { r: 1, g: 0.839, b: 0.039 };
const cWhite = { r: 1, g: 1, b: 1 };
const cDark = { r: 0.06, g: 0.09, b: 0.16 };
const cSlate = { r: 0.4, g: 0.45, b: 0.55 };
const cCrimson = { r: 0.702, g: 0, b: 0.106 };

// Polish Card 02: Color Token Guide (White card, Navy shadow)
const card2_surface = await figma.getNodeByIdAsync("818:115");
if (card2_surface) {
  card2_surface.fills = [{ type: "SOLID", color: cWhite }];
  card2_surface.strokes = [{ type: "SOLID", color: { r: 0.88, g: 0.91, b: 0.94 } }];
  card2_surface.strokeWeight = 1.5;
}
const card2_shadow = await figma.getNodeByIdAsync("818:116");
if (card2_shadow) {
  card2_shadow.fills = [{ type: "SOLID", color: cNavy }];
}

// Polish Card 03: Termasuk Paket HERO (Deep Navy Card, Crimson Red Shadow)
const card3_surface = await figma.getNodeByIdAsync("818:138");
if (card3_surface) {
  card3_surface.fills = [{ type: "SOLID", color: cNavy }];
  card3_surface.strokes = [{ type: "SOLID", color: { r: 0.05, g: 0.2, b: 0.45 } }];
  card3_surface.strokeWeight = 1.5;
}
const card3_shadow = await figma.getNodeByIdAsync("818:139");
if (card3_shadow) {
  card3_shadow.fills = [{ type: "SOLID", color: cCrimson }];
}
const card3_footer_surf = await figma.getNodeByIdAsync("818:137");
if (card3_footer_surf) {
  card3_footer_surf.fills = [{ type: "SOLID", color: cGold }];
}
const card3_footer_txt = await figma.getNodeByIdAsync("818:136");
if (card3_footer_txt) {
  card3_footer_txt.fills = [{ type: "SOLID", color: cNavy }];
}
const card3_title = await figma.getNodeByIdAsync("818:121");
if (card3_title) {
  card3_title.fills = [{ type: "SOLID", color: cWhite }];
}
const card3_sub = await figma.getNodeByIdAsync("818:122");
if (card3_sub) {
  card3_sub.fills = [{ type: "SOLID", color: cGold }];
}
const card3_num_badge = await figma.getNodeByIdAsync("839:464");
if (card3_num_badge) {
  card3_num_badge.fills = [{ type: "SOLID", color: cGold }];
}
const card3_num = await figma.getNodeByIdAsync("818:119");
if (card3_num) {
  card3_num.fills = [{ type: "SOLID", color: cNavy }];
}

// Features inside Card 03
for (const fid of ["818:132", "818:128", "818:124"]) {
  const feat = await figma.getNodeByIdAsync(fid);
  if (feat) {
    const lbl = feat.findOne(n => n.name === "Label");
    if (lbl) lbl.fills = [{ type: "SOLID", color: cWhite }];
    const desc = feat.findOne(n => n.name === "Description");
    if (desc) desc.fills = [{ type: "SOLID", color: { r: 0.75, g: 0.82, b: 0.92 } }];
    const bul = feat.findOne(n => n.name === "Bullet");
    if (bul) bul.fills = [{ type: "SOLID", color: cGold }];
  }
}

figma.notify("Styling 3 Kartu Berhasil Diselaraskan dengan Poster 15!");
return { success: true };
`;

async function main() {
  try {
    console.log("Applying perfect styling to bottom cards...");
    await exec(script);
    console.log("Styling applied!");

    const snap: any = await callPlugin("get_screenshot", { nodeId: "809:10097", format: "png", scale: 1 });
    const buf = Buffer.from(snap.data, "base64");
    const outPath = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/figma_poster_16_perfect.png";
    writeFileSync(outPath, buf);
    console.log("Screenshot saved to:", outPath);
  } catch (err: any) {
    console.error("Error:", err.message);
  }
}

main();
