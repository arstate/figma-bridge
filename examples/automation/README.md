# Figma Bridge — Automation Examples & Script Archive

Kumpulan skrip automasi, pengujian canvas Figma, dan inspeksi layout nyata menggunakan WebSocket bridge.

## Daftar Kategori:
1. **Poster Automation & Remastering (`remaster_*.ts`, `build_*.ts`):**
   - Contoh pembuatan poster dinamis feed Instagram 3:4 & 4:5 via WebSocket relay.
   - Mengatur Auto Layout, styling solid shadows, border radius, dan text preloading.
2. **Borang & Layout Audit (`borang_code.js`, `polish_borang_*.ts`):**
   - Script penyusunan form dan infografis A3 tanpa overlap elemen.
3. **Canvas Inspection & QA (`inspect_*.ts`, `check_*.ts`, `verify_final.ts`):**
   - Tool CLI cepat untuk mengecek tabrakan elemen (`check_real_collisions.ts`), hirarki node (`inspect_cards.ts`), dan dump tree node (`poster_dump.json`).
4. **Eksekusi Langsung (`figma-exec.ts`, `call_figma.ts`):**
   - Contoh pengiriman raw Figma JavaScript snippet langsung ke canvas via WebSocket bridge.

## Cara Menjalankan Contoh:
Pastikan Figma Desktop aktif dengan plugin running dan relay server berjalan di port `4395`:
```bash
bun examples/automation/inspect_poster_structure.ts
```
