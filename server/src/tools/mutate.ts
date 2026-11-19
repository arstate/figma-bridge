/**
 * Mutation tools: create, style, clone, delete, selection, notifications.
 */

import { z } from "zod";
import * as fs from "node:fs/promises";
import { callPlugin } from "../relay-client";
import { defineTool, json, text } from "./registry";

const paint = z.any().describe("Figma Paint object");

export const notify = defineTool({
  description:
    "Show a toast inside Figma (figma.notify) so the human sees what the agent did.",
  schema: z.object({ message: z.string() }),
  run: (args) =>
    callPlugin("notify", { message: args.message }).then(() => text("ok")),
});

export const createFrame = defineTool({
  description:
    "Create a frame. Parent defaults to the current page. Pass layoutMode (HORIZONTAL/VERTICAL/NONE) plus itemSpacing and padding for auto-layout.",
  schema: z.object({
    parent_id: z.string().optional(),
    name: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    fills: z.array(paint).optional(),
    corner_radius: z.number().optional(),
    layout_mode: z.enum(["NONE", "HORIZONTAL", "VERTICAL"]).optional(),
    item_spacing: z.number().optional(),
    padding_left: z.number().optional(),
    padding_right: z.number().optional(),
    padding_top: z.number().optional(),
    padding_bottom: z.number().optional(),
    primary_axis_align_items: z.string().optional(),
    counter_axis_align_items: z.string().optional(),
  }),
  run: (args) =>
    callPlugin("create_frame", {
      parentId: args.parent_id,
      name: args.name,
      x: args.x,
      y: args.y,
      width: args.width,
      height: args.height,
      fills: args.fills,
      cornerRadius: args.corner_radius,
      layoutMode: args.layout_mode,
      itemSpacing: args.item_spacing,
      paddingLeft: args.padding_left,
      paddingRight: args.padding_right,
      paddingTop: args.padding_top,
      paddingBottom: args.padding_bottom,
      primaryAxisAlignItems: args.primary_axis_align_items,
      counterAxisAlignItems: args.counter_axis_align_items,
    }).then(json),
});

export const createText = defineTool({
  description:
    "Create a text node. fontName is {family, style}; load the font first via execute if it is not Inter Regular.",
  schema: z.object({
    parent_id: z.string().optional(),
    name: z.string().optional(),
    characters: z.string().optional(),
    font_name: z.object({ family: z.string(), style: z.string() }).optional(),
    font_size: z.number().optional(),
    fills: z.array(paint).optional(),
    text_align_horizontal: z.string().optional(),
    text_auto_resize: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
  run: (args) =>
    callPlugin("create_text", {
      parentId: args.parent_id,
      name: args.name,
      characters: args.characters,
      fontName: args.font_name,
      fontSize: args.font_size,
      fills: args.fills,
      textAlignHorizontal: args.text_align_horizontal,
      textAutoResize: args.text_auto_resize,
      x: args.x,
      y: args.y,
      width: args.width,
      height: args.height,
    }).then(json),
});

export const setProperties = defineTool({
  description:
    'Set any writable Plugin API properties on a node in one call: {"cornerRadius": 8, "opacity": 0.5, ...}. Unknown keys throw the API\'s own error.',
  schema: z.object({
    node_id: z.string(),
    properties: z
      .record(z.string(), z.any())
      .describe("key/value map of Plugin API properties"),
  }),
  run: (args) =>
    callPlugin("set_properties", {
      nodeId: args.node_id,
      properties: args.properties,
    }).then(json),
});

export const deleteNode = defineTool({
  description: "Remove a node from the document.",
  schema: z.object({ node_id: z.string() }),
  annotations: { destructiveHint: true },
  run: (args) => callPlugin("delete_node", { nodeId: args.node_id }).then(json),
});

export const cloneNode = defineTool({
  description:
    "Duplicate a node, optionally into a different parent and position.",
  schema: z.object({
    node_id: z.string(),
    parent_id: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional(),
  }),
  run: (args) =>
    callPlugin("clone_node", {
      nodeId: args.node_id,
      parentId: args.parent_id,
      x: args.x,
      y: args.y,
    }).then(json),
});

export const setFills = defineTool({
  description: "Replace a node's fills with Figma Paint objects.",
  schema: z.object({ node_id: z.string(), fills: z.array(paint) }),
  run: (args) =>
    callPlugin("set_fills", { nodeId: args.node_id, fills: args.fills }).then(
      json,
    ),
});

export const setStrokes = defineTool({
  description: "Replace a node's strokes with Figma Paint objects.",
  schema: z.object({ node_id: z.string(), strokes: z.array(paint) }),
  run: (args) =>
    callPlugin("set_strokes", {
      nodeId: args.node_id,
      strokes: args.strokes,
    }).then(json),
});

export const setEffects = defineTool({
  description:
    "Replace a node's effects (shadows, blurs) with Figma Effect objects.",
  schema: z.object({ node_id: z.string(), effects: z.array(z.any()) }),
  run: (args) =>
    callPlugin("set_effects", {
      nodeId: args.node_id,
      effects: args.effects,
    }).then(json),
});

export const importComponent = defineTool({
  description:
    "Instantiate a team library component by its component key (from the component's share link or get_node on an instance).",
  schema: z.object({
    component_key: z.string(),
    parent_id: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional(),
  }),
  run: (args) =>
    callPlugin("import_component", {
      componentKey: args.component_key,
      parentId: args.parent_id,
      x: args.x,
      y: args.y,
    }).then(json),
});

export const setImageFill = defineTool({
  description:
    "Set a node's fill to an image: pass image_url (fetched by the relay) or image_base64. This is how a placeholder rectangle becomes a real screenshot. scale_mode defaults to FILL.",
  schema: z.object({
    node_id: z.string(),
    image_url: z.string().optional().describe("URL to fetch the image from"),
    image_base64: z.string().optional().describe("Raw image bytes, base64"),
    scale_mode: z.enum(["FILL", "FIT", "CROP", "TILE"]).optional(),
  }),
  run: async (args) => {
    let base64 = args.image_base64;
    if (!base64 && args.image_url) {
      const res = await fetch(args.image_url);
      if (!res.ok)
        throw new Error(`image fetch failed: ${res.status} ${res.statusText}`);
      base64 = Buffer.from(await res.arrayBuffer()).toString("base64");
    }
    if (!base64) throw new Error("pass image_url or image_base64");
    return callPlugin("set_image_fill", {
      nodeId: args.node_id,
      base64,
      scaleMode: args.scale_mode ?? "FILL",
    }).then(json);
  },
});

export const setSelection = defineTool({
  description:
    "Select nodes in the Figma editor and scroll the viewport to them, so the human sees where you are working.",
  schema: z.object({ node_ids: z.array(z.string()) }),
  run: (args) =>
    callPlugin("set_selection", { nodeIds: args.node_ids }).then(json),
});

export const createSvg = defineTool({
  description:
    "Create/import vector nodes directly from an SVG string or local SVG file path. Scales proportionally if width/height is passed.",
  schema: z.object({
    svg_content: z.string().optional().describe("Raw SVG XML text"),
    svg_path: z.string().optional().describe("Absolute file path to an SVG file on disk"),
    parent_id: z.string().optional().describe("Target frame or page ID"),
    name: z.string().optional().describe("Node name in layer list"),
    x: z.number().optional().describe("X position"),
    y: z.number().optional().describe("Y position"),
    width: z.number().optional().describe("Target width (proportional scale)"),
    height: z.number().optional().describe("Target height (proportional scale)"),
    color: z.string().optional().describe("Optional hex tint color (e.g. #012969) applied to vector fills"),
  }),
  run: async (args) => {
    let svg = args.svg_content;
    if (!svg && args.svg_path) {
      svg = await fs.readFile(args.svg_path, "utf-8");
    }
    if (!svg) throw new Error("pass svg_content or svg_path");

    const code = `
      const svg = ${JSON.stringify(svg)};
      const node = figma.createNodeFromSvg(svg);
      if (${JSON.stringify(args.name)}) node.name = ${JSON.stringify(args.name)};
      
      const parentId = ${JSON.stringify(args.parent_id)};
      if (parentId) {
        const parent = await figma.getNodeByIdAsync(parentId);
        if (parent && "appendChild" in parent) {
          parent.appendChild(node);
        }
      } else {
        figma.currentPage.appendChild(node);
      }

      if (${args.x !== undefined}) node.x = ${args.x ?? 0};
      if (${args.y !== undefined}) node.y = ${args.y ?? 0};

      const targetW = ${args.width ?? "null"};
      const targetH = ${args.height ?? "null"};
      if (node.width > 0 && node.height > 0) {
        if (targetW && targetH) {
          const scale = Math.min(targetW / node.width, targetH / node.height);
          node.rescale(scale);
        } else if (targetW) {
          node.rescale(targetW / node.width);
        } else if (targetH) {
          node.rescale(targetH / node.height);
        }
      }

      const hexColor = ${JSON.stringify(args.color ?? null)};
      if (hexColor) {
        const clean = hexColor.replace("#", "");
        const rgb = {
          r: parseInt(clean.substring(0, 2), 16) / 255,
          g: parseInt(clean.substring(2, 4), 16) / 255,
          b: parseInt(clean.substring(4, 6), 16) / 255
        };
        const applyColor = (n) => {
          if ("fills" in n && Array.isArray(n.fills) && n.fills.length > 0) {
            n.fills = [{ type: "SOLID", color: rgb }];
          }
          if ("children" in n && Array.isArray(n.children)) {
            for (const c of n.children) applyColor(c);
          }
        };
        applyColor(node);
      }

      return {
        id: node.id,
        name: node.name,
        type: node.type,
        x: Math.round(node.x),
        y: Math.round(node.y),
        width: Math.round(node.width),
        height: Math.round(node.height),
        childrenCount: node.children ? node.children.length : 0
      };
    `;

    return callPlugin("execute", { code }).then(json);
  },
});

export const updateText = defineTool({
  description:
    "Safely update characters and styling of an existing text node with automatic multi-font preloading to prevent font errors.",
  schema: z.object({
    node_id: z.string().describe("Text node ID to update"),
    characters: z.string().describe("New text content"),
    font_size: z.number().optional().describe("Optional new font size in px"),
    font_name: z.object({ family: z.string(), style: z.string() }).optional(),
    color: z.string().optional().describe("Optional new hex fill color (e.g. #012969)"),
    fills: z.array(paint).optional().describe("Optional new fill colors"),
  }),
  run: async (args) => {
    const code = `
      const node = await figma.getNodeByIdAsync(${JSON.stringify(args.node_id)});
      if (!node) throw new Error("Node not found: " + ${JSON.stringify(args.node_id)});
      if (node.type !== "TEXT") throw new Error("Node is not a TEXT node: " + node.type);

      // 1. Fast deduplicated font preloading
      const loadedFonts = new Set();
      const loadFontSafe = async (fn) => {
        if (!fn || fn === figma.mixed) return;
        const key = fn.family + "::" + fn.style;
        if (!loadedFonts.has(key)) {
          loadedFonts.add(key);
          await figma.loadFontAsync(fn);
        }
      };

      if (node.fontName !== figma.mixed) {
        await loadFontSafe(node.fontName);
      } else {
        if (typeof node.getStyledTextSegments === "function") {
          const segments = node.getStyledTextSegments(["fontName"]);
          for (const s of segments) {
            await loadFontSafe(s.fontName);
          }
          if (segments.length > 0 && segments[0].fontName && segments[0].fontName !== figma.mixed) {
            node.fontName = segments[0].fontName;
          }
        } else {
          const len = node.characters.length;
          for (let i = 0; i < len; i++) {
            const fn = node.getRangeFontName(i, i + 1);
            await loadFontSafe(fn);
          }
          if (len > 0) {
            const firstFn = node.getRangeFontName(0, 1);
            if (firstFn !== figma.mixed) node.fontName = firstFn;
          }
        }
      }

      // 2. Preload target font if specified
      const targetFont = ${JSON.stringify(args.font_name)};
      if (targetFont) {
        await figma.loadFontAsync(targetFont);
        node.fontName = targetFont;
      }

      // 3. Update characters
      node.characters = ${JSON.stringify(args.characters)};

      // 4. Update optional properties
      const targetSize = ${args.font_size ?? "null"};
      if (targetSize !== null) node.fontSize = targetSize;

      const hexColor = ${JSON.stringify(args.color ?? null)};
      if (hexColor) {
        const clean = hexColor.replace("#", "");
        node.fills = [{
          type: "SOLID",
          color: {
            r: parseInt(clean.substring(0, 2), 16) / 255,
            g: parseInt(clean.substring(2, 4), 16) / 255,
            b: parseInt(clean.substring(4, 6), 16) / 255
          }
        }];
      } else {
        const targetFills = ${JSON.stringify(args.fills)};
        if (targetFills) node.fills = targetFills;
      }

      return {
        id: node.id,
        name: node.name,
        characters: node.characters,
        fontSize: node.fontSize,
        fontName: node.fontName,
        width: Math.round(node.width),
        height: Math.round(node.height)
      };
    `;

    return callPlugin("execute", { code }).then(json);
  },
});

export const tidyLayout = defineTool({
  description:
    "Tidy and align a frame: snap coordinates/dimensions to whole integer pixels (eliminating subpixel jitter) or apply clean Auto Layout with uniform spacing and padding.",
  schema: z.object({
    node_id: z.string().describe("Frame node ID to tidy"),
    mode: z.enum(["PIXEL_GRID", "AUTO_LAYOUT"]).default("PIXEL_GRID"),
    layout_mode: z.enum(["HORIZONTAL", "VERTICAL"]).optional(),
    item_spacing: z.number().optional(),
    padding: z.number().optional(),
    corner_radius: z.number().optional(),
    align_items: z.enum(["MIN", "CENTER", "MAX", "SPACE_BETWEEN"]).optional(),
    counter_align_items: z.enum(["MIN", "CENTER", "MAX"]).optional(),
  }),
  run: async (args) => {
    const code = `
      const node = await figma.getNodeByIdAsync(${JSON.stringify(args.node_id)});
      if (!node) throw new Error("Node not found: " + ${JSON.stringify(args.node_id)});
      if (!("children" in node)) throw new Error("Node has no children to tidy");

      let count = 0;
      if (${JSON.stringify(args.mode)} === "PIXEL_GRID") {
        try {
          node.x = Math.round(node.x);
          node.y = Math.round(node.y);
          if ("resize" in node) node.resize(Math.round(node.width), Math.round(node.height));
        } catch {}
        for (const child of node.children) {
          try {
            child.x = Math.round(child.x);
            child.y = Math.round(child.y);
            if ("resize" in child) {
              child.resize(Math.round(child.width), Math.round(child.height));
            }
          } catch {}
          count++;
        }
      } else if (${JSON.stringify(args.mode)} === "AUTO_LAYOUT" && "layoutMode" in node) {
        const rawLm = ${JSON.stringify(args.layout_mode ?? "VERTICAL")};
        const lm = (rawLm === "HORIZONTAL" || rawLm === "VERTICAL") ? rawLm : "VERTICAL";
        node.layoutMode = lm;
        if (${args.item_spacing !== undefined}) node.itemSpacing = ${args.item_spacing ?? 16};
        if (${args.padding !== undefined}) {
          const p = ${args.padding ?? 24};
          node.paddingLeft = p;
          node.paddingRight = p;
          node.paddingTop = p;
          node.paddingBottom = p;
        }
        if (${args.corner_radius !== undefined}) node.cornerRadius = ${args.corner_radius ?? 16};
        const align = ${JSON.stringify(args.align_items ?? null)};
        if (align && "primaryAxisAlignItems" in node) node.primaryAxisAlignItems = align;
        const cAlign = ${JSON.stringify(args.counter_align_items ?? null)};
        if (cAlign && "counterAxisAlignItems" in node) node.counterAxisAlignItems = cAlign;
        count = node.children.length;
      }

      return {
        id: node.id,
        name: node.name,
        mode: ${JSON.stringify(args.mode)},
        childrenCount: count,
        width: Math.round(node.width),
        height: Math.round(node.height)
      };
    `;

    return callPlugin("execute", { code }).then(json);
  },
});

export const mutateTools = {
  notify,
  create_frame: createFrame,
  create_text: createText,
  create_svg: createSvg,
  update_text: updateText,
  tidy_layout: tidyLayout,
  set_properties: setProperties,
  delete_node: deleteNode,
  clone_node: cloneNode,
  set_fills: setFills,
  set_strokes: setStrokes,
  set_effects: setEffects,
  import_component: importComponent,
  set_image_fill: setImageFill,
  set_selection: setSelection,
};
