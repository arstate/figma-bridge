import { callPlugin } from "./server/src/relay-client";

async function main() {
  const code = `
    const svgCode = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF3E1D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>';
    try {
      const node = figma.createNodeFromSvg(svgCode);
      const res = {
        id: node.id,
        name: node.name,
        type: node.type,
        width: node.width,
        height: node.height,
        childrenCount: node.children.length
      };
      node.remove(); // cleanup test
      return { success: true, res };
    } catch (e) {
      return { success: false, error: e.message };
    }
  `;

  const res = await callPlugin("execute", { code });
  console.log("SVG Test:", JSON.stringify(res, null, 2));
}

main().catch(console.error);
