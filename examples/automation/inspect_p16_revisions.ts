import { callPlugin } from "./server/src/relay-client";

async function main() {
  const code = `
    const p16 = await figma.getNodeByIdAsync("809:10097");
    if (!p16) return { error: "P16 not found" };

    // 1. Crosshairs
    const crosshairs = [];
    p16.findAll(n => {
      if (n.name.includes("crosshair")) {
        crosshairs.push({ id: n.id, name: n.name });
      }
      return false;
    });

    // 2. Ribbon
    const ribbon = p16.findOne(n => n.name === "P16_Yellow_Ribbon");
    let ribbonInfo = null;
    if (ribbon && "children" in ribbon) {
      ribbonInfo = {
        id: ribbon.id,
        x: ribbon.x,
        y: ribbon.y,
        w: ribbon.width,
        h: ribbon.height,
        children: ribbon.children.map(c => ({
          id: c.id,
          name: c.name,
          type: c.type,
          x: c.x,
          y: c.y,
          w: c.width,
          h: c.height,
          text: c.type === "TEXT" ? c.characters : null
        }))
      };
    }

    // 3. Middle Bento
    const bento = p16.findOne(n => n.name === "P16_Middle_Bento_Hero");
    let bentoInfo = null;
    if (bento && "findAll" in bento) {
      const texts = bento.findAll(n => n.type === "TEXT").map(t => ({
        id: t.id,
        name: t.name,
        text: t.characters,
        parentName: t.parent ? t.parent.name : null,
        parentId: t.parent ? t.parent.id : null,
        parentW: t.parent ? t.parent.width : null,
        textW: t.width
      }));
      bentoInfo = { texts };
    }

    // 4. Group 75 (Bottom cards)
    const g75 = await figma.getNodeByIdAsync("841:64");
    let g75Info = null;
    if (g75 && "children" in g75) {
      g75Info = g75.children.map(card => {
        const items = [];
        if ("children" in card) {
          card.children.forEach(ch => {
            items.push({
              id: ch.id,
              name: ch.name,
              type: ch.type,
              x: ch.x,
              y: ch.y,
              w: ch.width,
              h: ch.height,
              fills: "fills" in ch ? ch.fills : null
            });
          });
        }
        return {
          id: card.id,
          name: card.name,
          x: card.x,
          y: card.y,
          w: card.width,
          h: card.height,
          items
        };
      });
    }

    return { crosshairs, ribbonInfo, bentoInfo, g75Info };
  `;

  const res = await callPlugin("execute", { code });
  console.log(JSON.stringify(res, null, 2));
}

main().catch(console.error);
