import { callPlugin } from "./server/src/relay-client";

const posterIds = [
  { num: 14, id: "809:10263" },
  { num: 15, id: "809:9931" },
  { num: 16, id: "809:10097" },
  { num: 17, id: "809:10425" },
  { num: 18, id: "809:10591" },
  { num: 19, id: "809:10758" },
  { num: 20, id: "809:10921" }
];

async function main() {
  const code = `
    const posterIds = ${JSON.stringify(posterIds)};
    const dump = {};

    // Also search page for any text with GSM
    const page = figma.currentPage;
    const allPageTexts = page.findAll(n => n.type === "TEXT");
    const gsmMatchesOnPage = [];
    for (const t of allPageTexts) {
      if (/GSM/i.test(t.characters) || /v2\\.5/i.test(t.characters)) {
        // find which top-level frame it belongs to
        let cur = t;
        while (cur.parent && cur.parent !== page) {
          cur = cur.parent;
        }
        gsmMatchesOnPage.push({
          posterParent: cur.name,
          posterId: cur.id,
          textId: t.id,
          name: t.name,
          characters: t.characters
        });
      }
    }

    for (const p of posterIds) {
      const poster = await figma.getNodeByIdAsync(p.id);
      if (!poster) continue;

      const texts = poster.findAll(n => n.type === "TEXT").map(t => ({
        id: t.id,
        name: t.name,
        characters: t.characters
      }));

      const allChildren = poster.findAll(n => true).map(n => ({
        id: n.id,
        name: n.name,
        type: n.type
      }));

      // Find any node that might be a logo used as floating element
      const floatingLogos = poster.findAll(n => 
        n.name.toLowerCase().includes("logo") && 
        (n.name.toLowerCase().includes("float") || n.name.toLowerCase().includes("dof"))
      ).map(n => ({ id: n.id, name: n.name, type: n.type, x: n.x, y: n.y }));

      dump[p.num] = {
        name: poster.name,
        texts,
        floatingLogos,
        totalNodes: allChildren.length
      };
    }

    return { gsmMatchesOnPage, dump };
  `;

  const res = await callPlugin("execute", { code });
  console.log("GSM MATCHES ON ENTIRE PAGE:");
  console.log(JSON.stringify(res.value?.gsmMatchesOnPage || res.gsmMatchesOnPage, null, 2));

  // Write dump to file
  const fs = await import("fs");
  fs.writeFileSync("/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/poster_dump.json", JSON.stringify(res.value || res, null, 2));
  console.log("Dump written to poster_dump.json");
}

main().catch(console.error);
