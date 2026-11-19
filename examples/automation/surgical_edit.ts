#!/usr/bin/env bun
/**
 * figma-bridge / surgical_edit.ts
 *
 * Mesin Revisi Bedah Presisi (Surgical Targeted Revision Engine):
 * Mengedit elemen Figma yang sedang diseleksi user secara in-place tanpa merusak,
 * menggeser, atau me-reset elemen-elemen lain yang sudah diatur manual oleh user.
 *
 * Usage:
 *   import { mutateSelection } from "./surgical_edit";
 *   await mutateSelection({
 *     action: "update_text", // atau "update_style", "custom_code"
 *     characters: "Teks Baru Yang Diinginkan",
 *     fillColor: { r: 1, g: 0.839, b: 0.039 }
 *   });
 */

import { callPlugin } from "./server/src/relay-client";
import { detectFigmaSelection } from "./get_selection";

export interface SurgicalMutationParams {
  nodeId?: string; // Jika kosong, otomatis ambil dari selection aktif
  characters?: string; // Untuk teks
  fontSize?: number;
  fills?: Array<{ type: "SOLID"; color: { r: number; g: number; b: number }; opacity?: number }>;
  strokes?: Array<{ type: "SOLID"; color: { r: number; g: number; b: number } }>;
  strokeWeight?: number;
  cornerRadius?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  customCode?: string; // Kode JS bebas yang dijalankan dengan variabel `targetNode`
}

export async function mutateSelection(params: SurgicalMutationParams): Promise<{
  ok: boolean;
  targetId?: string;
  targetName?: string;
  targetType?: string;
  changes?: Record<string, unknown>;
  error?: string;
}> {
  // 1. Tentukan target node: jika nodeId tidak di-pass, deteksi selection aktif
  let targetId = params.nodeId;
  let targetName = "";
  let targetType = "";

  if (!targetId) {
    const sel = await detectFigmaSelection();
    if (!sel.ok || sel.count === 0) {
      return {
        ok: false,
        error: "Tidak ada elemen yang sedang diseleksi di Figma. Silakan klik elemen target di canvas terlebih dahulu."
      };
    }
    targetId = sel.nodes[0].id;
    targetName = sel.nodes[0].name;
    targetType = sel.nodes[0].type;
  }

  // 2. Jalankan mutasi presisi secara in-place
  const code = `
    const targetNode = await figma.getNodeByIdAsync("${targetId}");
    if (!targetNode) return { error: "Node ID ${targetId} tidak ditemukan di dokumen" };

    const originalName = targetNode.name;
    const originalType = targetNode.type;
    const appliedChanges = {};

    // A. Preload font jika node berupa teks
    if (targetNode.type === "TEXT") {
      if (typeof targetNode.fontName === "object" && targetNode.fontName !== null && "family" in targetNode.fontName) {
        await figma.loadFontAsync(targetNode.fontName);
      } else {
        await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
        await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
        await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });
      }
    }

    // B. Mutasi Teks
    ${params.characters !== undefined ? `
      if (targetNode.type === "TEXT") {
        targetNode.characters = ${JSON.stringify(params.characters)};
        appliedChanges.characters = ${JSON.stringify(params.characters)};
      }
    ` : ""}

    // C. Mutasi Font Size
    ${params.fontSize !== undefined ? `
      if (targetNode.type === "TEXT") {
        targetNode.fontSize = ${params.fontSize};
        appliedChanges.fontSize = ${params.fontSize};
      }
    ` : ""}

    // D. Mutasi Fills
    ${params.fills ? `
      if ("fills" in targetNode) {
        targetNode.fills = ${JSON.stringify(params.fills)};
        appliedChanges.fills = ${JSON.stringify(params.fills)};
      }
    ` : ""}

    // E. Mutasi Strokes
    ${params.strokes ? `
      if ("strokes" in targetNode) {
        targetNode.strokes = ${JSON.stringify(params.strokes)};
        appliedChanges.strokes = ${JSON.stringify(params.strokes)};
      }
    ` : ""}

    ${params.strokeWeight !== undefined ? `
      if ("strokeWeight" in targetNode) {
        targetNode.strokeWeight = ${params.strokeWeight};
        appliedChanges.strokeWeight = ${params.strokeWeight};
      }
    ` : ""}

    // F. Mutasi Corner Radius
    ${params.cornerRadius !== undefined ? `
      if ("cornerRadius" in targetNode) {
        targetNode.cornerRadius = ${params.cornerRadius};
        appliedChanges.cornerRadius = ${params.cornerRadius};
      }
    ` : ""}

    // G. Mutasi Posisi & Dimensi
    ${params.x !== undefined ? `targetNode.x = ${params.x}; appliedChanges.x = ${params.x};` : ""}
    ${params.y !== undefined ? `targetNode.y = ${params.y}; appliedChanges.y = ${params.y};` : ""}
    ${params.width !== undefined && params.height !== undefined ? `
      if ("resize" in targetNode) {
        targetNode.resize(${params.width}, ${params.height});
        appliedChanges.dimensions = { width: ${params.width}, height: ${params.height} };
      }
    ` : ""}

    // H. Custom Code Block (Jika Ada)
    ${params.customCode || ""}

    // I. Viewport Focus & Figma Toast
    figma.notify("✅ Berhasil Revisi: " + originalName);
    figma.viewport.scrollAndZoomIntoView([targetNode]);

    return {
      ok: true,
      targetId: targetNode.id,
      targetName: originalName,
      targetType: originalType,
      changes: appliedChanges
    };
  `;

  const res: any = await callPlugin("execute", { code });
  if (res?.value?.ok) {
    return res.value;
  }
  if (res?.value?.error) {
    return { ok: false, error: res.value.error };
  }
  if (res?.error) {
    return { ok: false, error: res.error };
  }
  return { ok: true, targetId, targetName, targetType };
}

// CLI Tester
async function main() {
  const args = process.argv.slice(2);
  console.log("=================================================");
  console.log("⚡ FIGMA SURGICAL REVISION ENGINE (In-Place Edit)");
  console.log("=================================================");

  const sel = await detectFigmaSelection();
  if (!sel.ok || sel.count === 0) {
    console.log("⚠️ Tidak ada elemen yang sedang diseleksi di Figma.");
    console.log("Pilih sebuah layer/elemen di Figma, lalu jalankan perintah ini.");
    return;
  }

  const target = sel.nodes[0];
  console.log(`Target Seleksi: "${target.name}" (${target.type}) [ID: ${target.id}]`);
  console.log(`Artboard: "${target.topLevelFrame?.name ?? "Root"}"`);

  if (args.length > 0) {
    const newText = args.join(" ");
    console.log(`\nMengubah teks menjadi: "${newText}"...`);
    const res = await mutateSelection({
      nodeId: target.id,
      characters: target.type === "TEXT" ? newText : undefined
    });
    console.log("Hasil:", res);
  } else {
    console.log("\n💡 Mode Standby: Gunakan `bun surgical_edit.ts \"Teks Baru\"` untuk langsung merevisi teks elemen yang dipilih.");
  }
}

if (import.meta.main) {
  main()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
