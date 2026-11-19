import { callPlugin } from "/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/server/src/relay-client";
import * as fs from "fs";
import * as path from "path";

/**
 * figma-exec v3.1 (Master High-Speed Figma CLI & Automation Engine)
 *
 * Supported flags:
 *   bun figma-exec.ts "return figma.currentPage.name;"
 *   bun figma-exec.ts -e "return figma.currentPage.name;"
 *   bun figma-exec.ts -f ./script_to_run.ts
 *   bun figma-exec.ts --info
 *   bun figma-exec.ts --selection
 *   bun figma-exec.ts --svg <file.svg|content> [--name "Icon"] [--x 100] [--y 100] [--w 200] [--h 200] [--color "#012969"] [--parent "nodeId"]
 *   bun figma-exec.ts --text <nodeId> "New Text" [--size 24] [--font "Inter:Bold"] [--color "#012969"]
 *   bun figma-exec.ts --tidy <nodeId> [--mode PIXEL_GRID|AUTO_LAYOUT] [--direction VERTICAL|HORIZONTAL] [--spacing 16] [--padding 24] [--radius 16] [--align MIN|CENTER|MAX|SPACE_BETWEEN] [--counter-align MIN|CENTER|MAX]
 *   bun figma-exec.ts --export <nodeId> [--format png|svg|jpg] [--scale 2] [--out ./out.png]
 */

function parseArgs(args: string[]): { mode: string; options: Record<string, any>; positional: string[] } {
  const options: Record<string, any> = {};
  const positional: string[] = [];
  let mode = "eval";

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--info") {
      mode = "info";
    } else if (a === "--selection") {
      mode = "selection";
    } else if (a === "--svg") {
      mode = "svg";
      options.svg = args[++i];
    } else if (a === "--text") {
      mode = "text";
      options.nodeId = args[++i];
      options.characters = args[++i];
    } else if (a === "--tidy") {
      mode = "tidy";
      options.nodeId = args[++i];
    } else if (a === "--export") {
      mode = "export";
      options.nodeId = args[++i];
    } else if (a === "-f") {
      mode = "file";
      options.file = args[++i];
    } else if (a === "-e") {
      mode = "eval";
      options.code = args[++i];
    } else if (a === "--name") {
      options.name = args[++i];
    } else if (a === "--x") {
      options.x = Number(args[++i]);
    } else if (a === "--y") {
      options.y = Number(args[++i]);
    } else if (a === "--w" || a === "--width") {
      options.width = Number(args[++i]);
    } else if (a === "--h" || a === "--height") {
      options.height = Number(args[++i]);
    } else if (a === "--parent") {
      options.parentId = args[++i];
    } else if (a === "--size") {
      options.fontSize = Number(args[++i]);
    } else if (a === "--font") {
      options.font = args[++i];
    } else if (a === "--color") {
      options.color = args[++i];
    } else if (a === "--mode") {
      const val = args[++i];
      if (val === "AUTO_LAYOUT" || val === "PIXEL_GRID") {
        options.mode = val;
      } else if (val === "VERTICAL" || val === "HORIZONTAL") {
        options.mode = "AUTO_LAYOUT";
        options.direction = val;
      } else {
        options.mode = val;
      }
    } else if (a === "--direction" || a === "--layout") {
      options.direction = args[++i];
    } else if (a === "--spacing") {
      options.spacing = Number(args[++i]);
    } else if (a === "--padding") {
      options.padding = Number(args[++i]);
    } else if (a === "--radius") {
      options.radius = Number(args[++i]);
    } else if (a === "--align") {
      options.align = args[++i];
    } else if (a === "--counter-align") {
      options.counterAlign = args[++i];
    } else if (a === "--format") {
      options.format = args[++i];
    } else if (a === "--scale") {
      options.scale = Number(args[++i]);
    } else if (a === "--out") {
      options.out = args[++i];
    } else if (!a.startsWith("-")) {
      positional.push(a);
    }
  }

  return { mode, options, positional };
}

function hexToRgb(h: string): { r: number; g: number; b: number } {
  const c = h.replace("#", "");
  return {
    r: parseInt(c.substring(0, 2), 16) / 255,
    g: parseInt(c.substring(2, 4), 16) / 255,
    b: parseInt(c.substring(4, 6), 16) / 255,
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.log("Usage: bun figma-exec.ts [code | -e <code> | -f <file> | --info | --selection | --svg <file> | --text <id> <text> | --tidy <id> | --export <id>]");
    process.exit(1);
  }

  const { mode, options, positional } = parseArgs(args);

  try {
    if (mode === "info") {
      const code = `
        return {
          fileName: figma.root.name,
          currentPage: { id: figma.currentPage.id, name: figma.currentPage.name },
          pages: figma.root.children.map(p => ({ id: p.id, name: p.name })),
          artboards: figma.currentPage.children
            .filter(c => c.type === "FRAME" || c.type === "COMPONENT")
            .map(c => ({ id: c.id, name: c.name, type: c.type, x: Math.round(c.x), y: Math.round(c.y), w: Math.round(c.width), h: Math.round(c.height) }))
        };
      `;
      const res = await callPlugin("execute", { code });
      console.log(JSON.stringify(res?.value ?? res, null, 2));
      process.exit(0);
    }

    if (mode === "selection") {
      const res: any = await callPlugin("get_selection", {});
      console.log(JSON.stringify(res?.nodes ?? res, null, 2));
      process.exit(0);
    }

    if (mode === "svg") {
      let svgContent = options.svg;
      if (fs.existsSync(svgContent)) {
        svgContent = fs.readFileSync(svgContent, "utf-8");
      }
      const code = `
        const svg = ${JSON.stringify(svgContent)};
        const node = figma.createNodeFromSvg(svg);
        if (${JSON.stringify(options.name)}) node.name = ${JSON.stringify(options.name)};
        
        const parentId = ${JSON.stringify(options.parentId)};
        if (parentId) {
          const parent = await figma.getNodeByIdAsync(parentId);
          if (parent && "appendChild" in parent) parent.appendChild(node);
        } else {
          figma.currentPage.appendChild(node);
        }

        if (${options.x !== undefined}) node.x = ${options.x ?? 0};
        if (${options.y !== undefined}) node.y = ${options.y ?? 0};

        const targetW = ${options.width ?? "null"};
        const targetH = ${options.height ?? "null"};
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

        const hexColor = ${JSON.stringify(options.color ?? null)};
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
      const res = await callPlugin("execute", { code });
      console.log(JSON.stringify(res?.value ?? res, null, 2));
      process.exit(0);
    }

    if (mode === "text") {
      let fontObj: { family: string; style: string } | null = null;
      if (options.font) {
        const [fam, sty] = options.font.split(":");
        fontObj = { family: fam || "Inter", style: sty || "Regular" };
      }
      let fillPaint: any = null;
      if (options.color) {
        fillPaint = [{ type: "SOLID", color: hexToRgb(options.color) }];
      }

      const code = `
        const node = await figma.getNodeByIdAsync(${JSON.stringify(options.nodeId)});
        if (!node) throw new Error("Node not found: " + ${JSON.stringify(options.nodeId)});
        if (node.type !== "TEXT") throw new Error("Node is not a TEXT node: " + node.type);

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

        const targetFont = ${JSON.stringify(fontObj)};
        if (targetFont) {
          await figma.loadFontAsync(targetFont);
          node.fontName = targetFont;
        }

        node.characters = ${JSON.stringify(options.characters)};

        const targetSize = ${options.fontSize ?? "null"};
        if (targetSize !== null) node.fontSize = targetSize;

        const targetFills = ${JSON.stringify(fillPaint)};
        if (targetFills) node.fills = targetFills;

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
      const res = await callPlugin("execute", { code });
      console.log(JSON.stringify(res?.value ?? res, null, 2));
      process.exit(0);
    }

    if (mode === "tidy") {
      const targetMode = options.mode ?? "PIXEL_GRID";
      const code = `
        const node = await figma.getNodeByIdAsync(${JSON.stringify(options.nodeId)});
        if (!node) throw new Error("Node not found: " + ${JSON.stringify(options.nodeId)});
        if (!("children" in node)) throw new Error("Node has no children to tidy");

        let count = 0;
        if (${JSON.stringify(targetMode)} === "PIXEL_GRID") {
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
        } else if (${JSON.stringify(targetMode)} === "AUTO_LAYOUT" && "layoutMode" in node) {
          const rawDir = ${JSON.stringify(options.direction ?? "VERTICAL")};
          const dir = (rawDir === "HORIZONTAL" || rawDir === "VERTICAL") ? rawDir : "VERTICAL";
          node.layoutMode = dir;
          if (${options.spacing !== undefined}) node.itemSpacing = ${options.spacing ?? 16};
          if (${options.padding !== undefined}) {
            const p = ${options.padding ?? 24};
            node.paddingLeft = p;
            node.paddingRight = p;
            node.paddingTop = p;
            node.paddingBottom = p;
          }
          if (${options.radius !== undefined}) node.cornerRadius = ${options.radius ?? 16};
          const align = ${JSON.stringify(options.align ?? null)};
          if (align && "primaryAxisAlignItems" in node) node.primaryAxisAlignItems = align;
          const cAlign = ${JSON.stringify(options.counterAlign ?? null)};
          if (cAlign && "counterAxisAlignItems" in node) node.counterAxisAlignItems = cAlign;
          count = node.children.length;
        }

        return {
          id: node.id,
          name: node.name,
          mode: ${JSON.stringify(targetMode)},
          childrenCount: count,
          width: Math.round(node.width),
          height: Math.round(node.height)
        };
      `;
      const res = await callPlugin("execute", { code });
      console.log(JSON.stringify(res?.value ?? res, null, 2));
      process.exit(0);
    }

    if (mode === "export") {
      const format = options.format ?? "png";
      const scale = options.scale ?? 2;
      const res: any = await callPlugin("export_node", {
        nodeId: options.nodeId,
        format,
        scale,
      });

      if (res?.error) {
        console.error("Export Error:", res.error);
        process.exit(1);
      }

      if (options.out) {
        const outPath = path.resolve(options.out);
        const buf = Buffer.from(res.data, "base64");
        fs.writeFileSync(outPath, buf);
        console.log(JSON.stringify({ ok: true, file: outPath, bytes: buf.length, format, scale }, null, 2));
      } else {
        console.log(JSON.stringify({ ok: true, bytes: res.data.length, format, scale }, null, 2));
      }
      process.exit(0);
    }

    // Default: eval or file
    let code = "";
    if (mode === "file" && options.file) {
      code = fs.readFileSync(options.file, "utf-8");
    } else if (options.code) {
      code = options.code;
    } else {
      code = positional.join(" ");
    }

    const res = await callPlugin("execute", { code });
    if (res?.error) {
      console.error("Figma Plugin Error:", res.error);
      process.exit(1);
    }
    console.log(JSON.stringify(res?.value ?? res, null, 2));
    process.exit(0);
  } catch (err: any) {
    console.error("Execution failed:", err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
