#!/usr/bin/env bun
/**
 * figma-bridge / get_selection.ts
 *
 * Mendeteksi secara presisi elemen yang sedang diseleksi oleh user di aplikasi Figma Desktop.
 * Mengembalikan informasi mendalam: ID node, nama layer, tipe, koordinat, teks, styling,
 * hirarki parent, path ancestor, dan artboard poster induk.
 *
 * Usage:
 *   bun "/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/get_selection.ts"
 */

import { callPlugin } from "./server/src/relay-client";
import * as fs from "fs";

interface SelectedNodeInfo {
  id: string;
  name: string;
  type: string;
  visible?: boolean;
  locked?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
  parentId?: string;
  parentName?: string;
  parentType?: string;
  topLevelFrame?: { id: string; name: string; type: string };
  ancestorPath?: string;
  characters?: string;
  fontSize?: number | string;
  fontName?: { family: string; style: string };
  textAlignHorizontal?: string;
  layoutMode?: string;
  cornerRadius?: number;
  fills?: any[];
  strokes?: any[];
  strokeWeight?: number;
  childrenCount?: number;
  children?: Array<{ id: string; name: string; type: string; characters?: string }>;
}

export async function detectFigmaSelection(): Promise<{
  ok: boolean;
  count: number;
  page?: string;
  nodes: SelectedNodeInfo[];
  raw?: any;
}> {
  try {
    // 1. Coba panggil handler get_selection bawaan plugin
    const res: any = await callPlugin("get_selection", {});
    if (res && typeof res.count === "number" && Array.isArray(res.nodes)) {
      return { ok: true, count: res.count, page: res.page, nodes: res.nodes, raw: res };
    }

    // 2. Fallback via execute jika plugin belum reload runtime baru
    const execRes: any = await callPlugin("execute", {
      code: `
        const sel = figma.currentPage.selection;
        function serialize(n) {
          const base = {
            id: n.id,
            name: n.name,
            type: n.type,
            visible: n.visible,
            locked: n.locked,
            x: Math.round(n.x),
            y: Math.round(n.y),
            width: Math.round(n.width),
            height: Math.round(n.height),
            rotation: Math.round(n.rotation || 0)
          };
          if (n.parent) {
            base.parentId = n.parent.id;
            base.parentName = n.parent.name;
            base.parentType = n.parent.type;
          }
          let curr = n;
          const ancestors = [];
          while (curr && curr.parent && curr.parent.type !== "DOCUMENT") {
            ancestors.unshift(curr.parent.name);
            if (curr.parent.type === "PAGE") {
              base.topLevelFrame = { id: curr.id, name: curr.name, type: curr.type };
              break;
            }
            curr = curr.parent;
          }
          base.ancestorPath = ancestors.join(" > ");
          if (n.type === "TEXT") {
            base.characters = n.characters;
            base.fontSize = n.fontSize;
            base.fontName = n.fontName;
            base.textAlignHorizontal = n.textAlignHorizontal;
          }
          if ("layoutMode" in n) {
            base.layoutMode = n.layoutMode;
          }
          if ("cornerRadius" in n && typeof n.cornerRadius === "number") {
            base.cornerRadius = n.cornerRadius;
          }
          if ("fills" in n && Array.isArray(n.fills)) {
            base.fills = n.fills;
          }
          if ("children" in n && Array.isArray(n.children)) {
            base.childrenCount = n.children.length;
            base.children = n.children.slice(0, 10).map(c => ({
              id: c.id,
              name: c.name,
              type: c.type,
              characters: c.type === "TEXT" ? c.characters : undefined
            }));
          }
          return base;
        }
        return {
          count: sel.length,
          page: figma.currentPage.name,
          nodes: sel.map(serialize)
        };
      `
    });

    if (execRes?.value) {
      return {
        ok: true,
        count: execRes.value.count,
        page: execRes.value.page,
        nodes: execRes.value.nodes || [],
        raw: execRes.value
      };
    }

    return { ok: false, count: 0, nodes: [] };
  } catch (err) {
    return { ok: false, count: 0, nodes: [], raw: String(err) };
  }
}

async function main() {
  const result = await detectFigmaSelection();
  const jsonPath = "/tmp/figma_current_selection.json";
  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2));

  console.log("=================================================");
  console.log("🎯 FIGMA SELECTION DETECTOR (figma-bridge v2.0)");
  console.log("=================================================");
  console.log(`Page: ${result.page ?? "Unknown"} | Jumlah Seleksi: ${result.count}`);

  if (result.count === 0) {
    console.log("\n⚠️ TIDAK ADA ELEMEN YANG SEDANG DISELEKSI DI FIGMA.");
    console.log("Silakan klik/pilih elemen di canvas Figma desktop, lalu jalankan kembali skrip ini.");
    return;
  }

  result.nodes.forEach((n, idx) => {
    console.log(`\n[Node #${idx + 1}]`);
    console.log(`• ID: ${n.id}`);
    console.log(`• Nama Layer: "${n.name}" (${n.type})`);
    console.log(`• Dimensi & Posisi: ${n.width}×${n.height} px di (x: ${n.x}, y: ${n.y})`);
    
    if (n.topLevelFrame) {
      console.log(`• Artboard Induk: "${n.topLevelFrame.name}" (ID: ${n.topLevelFrame.id})`);
    }
    if (n.ancestorPath) {
      console.log(`• Hirarki Path: ${n.ancestorPath} > "${n.name}"`);
    }
    if (n.type === "TEXT") {
      console.log(`• Isi Teks: "${n.characters?.replace(/\n/g, " ")}"`);
      console.log(`• Font: ${JSON.stringify(n.fontName)} | Ukuran: ${n.fontSize}px`);
    }
    if (n.layoutMode && n.layoutMode !== "NONE") {
      console.log(`• Auto Layout: ${n.layoutMode}`);
    }
    if (n.childrenCount !== undefined) {
      console.log(`• Jumlah Sub-Layer (Children): ${n.childrenCount}`);
    }
  });

  console.log("\n💾 Dump JSON tersimpan di:", jsonPath);
}

if (import.meta.main) {
  main()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
