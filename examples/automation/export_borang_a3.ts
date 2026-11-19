import { exec } from "./server/src/relay-client";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

async function main() {
  console.log("Requesting export of node 851:16993 from Figma...");
  const t0 = Date.now();
  
  // Export scale 2 (retina) and scale 1
  const res: any = await exec(`
    const node = await figma.getNodeByIdAsync("851:16993");
    if (!node) throw new Error("Node 851:16993 not found");
    
    // Scale 1 (1754x1240)
    const bytes1 = await node.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: 1 } });
    const b64_1 = figma.base64Encode(bytes1);
    
    // Scale 2 (3508x2480)
    const bytes2 = await node.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: 2 } });
    const b64_2 = figma.base64Encode(bytes2);
    
    return {
      b64_1,
      b64_2,
      len1: bytes1.byteLength,
      len2: bytes2.byteLength
    };
  `);
  
  console.log(`Exported from Figma in ${(Date.now() - t0) / 1000}s!`);
  const data = res.value || res;
  console.log(`Size 1x: ${data.len1} bytes, Size 2x: ${data.len2} bytes`);
  
  const buf1 = Buffer.from(data.b64_1, "base64");
  const buf2 = Buffer.from(data.b64_2, "base64");
  
  const target1 = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/figma_master_borang_a3_verified_final.png";
  const target2 = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/crops/borang_a3_retina_2x.png";
  
  mkdirSync(dirname(target1), { recursive: true });
  mkdirSync(dirname(target2), { recursive: true });
  
  writeFileSync(target1, buf1);
  writeFileSync(target2, buf2);
  
  console.log(`Saved 1x to: ${target1}`);
  console.log(`Saved 2x to: ${target2}`);
}

main().catch(err => {
  console.error("Export error:", err);
  process.exit(1);
});
