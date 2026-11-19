import { dispatch } from "./handlers";
import type { BridgeRequest } from "./handlers/protocol";

figma.showUI(__html__, { width: 240, height: 120, themeColors: true });

figma.on("selectionchange", () => {
  const selection = figma.currentPage.selection;
  figma.ui.postMessage({
    source: "figma-bridge",
    type: "event",
    name: "selectionchange",
    count: selection.length,
    nodes: selection.map((n) => ({
      id: n.id,
      name: n.name,
      type: n.type,
      x: Math.round(n.x),
      y: Math.round(n.y),
      width: Math.round(n.width),
      height: Math.round(n.height),
      parentId: n.parent ? n.parent.id : null,
      parentName: n.parent ? n.parent.name : null,
      characters: n.type === "TEXT" ? n.characters : undefined,
    })),
  });
});

figma.ui.onmessage = (msg: BridgeRequest) => {
  if (msg?.source !== "figma-bridge") return;
  dispatch(msg);
};
