import { callPlugin } from "./server/src/relay-client";
import { writeFileSync } from "node:fs";

async function main() {
  const code = `
    const icon = await figma.getNodeByIdAsync("848:7595");
    if (icon) {
      icon.remove();
      return { removed: true };
    }
    return { removed: false };
  `;
  const res = await callPlugin("execute", { code });
  console.log("Remove SVG_WA_Icon result:", res);

  // Re-capture P14
  const snap = await callPlugin("get_screenshot", { nodeId: "809:10263", format: "png", scale: 1 });
  const buf = Buffer.from(snap.data, "base64");
  const outPath = `/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/ads_poster_14_verified.png`;
  writeFileSync(outPath, buf);
  console.log(`Re-saved ads_poster_14_verified.png (${buf.length} bytes)`);
}

main().catch(console.error);
