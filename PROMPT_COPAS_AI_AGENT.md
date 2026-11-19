# 🤖 PROMPT SEKALI COPAS UNTUK AI AGENT (Figma Bridge MCP Setup)

Salin seluruh teks di dalam blok kode di bawah ini, lalu kirimkan langsung ke AI Agent Anda (Antigravity CLI, Claude Code, Cursor, Windsurf, atau Claude Desktop). AI Agent akan otomatis menyiapkan seluruh environment dan memandu Anda mengaktifkan plugin di Figma!

```markdown
Halo AI Agent! Saya ingin kamu mengintegrasikan dan mengaktifkan Figma MCP Bridge (`arstate/figma-bridge`) di sistem ini agar kamu bisa langsung membaca, mendesain, membuat layout, mengedit teks, dan memodifikasi kanvas Figma Desktop saya secara real-time.

Tolong lakukan langkah-langkah berikut secara berurutan dan mandiri:

### Langkah 1: Clone Repositori (Jika Belum Ada)
Periksa apakah repositori `figma-bridge` sudah ada di sistem. Jika belum, clone repositori resmi ke folder kerja:
```bash
git clone https://github.com/arstate/figma-bridge.git "$HOME/figma-bridge"
cd "$HOME/figma-bridge"
```
*(Atau gunakan direktori aktif saat ini jika sudah berada di dalam folder figma-bridge).*

### Langkah 2: Verifikasi Bun & Jalankan Setup
Pastikan runtime `bun` sudah terpasang. Jika belum terpasang, pasang Bun:
```bash
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"
```
Kemudian jalankan skrip setup otomatis:
```bash
chmod +x setup.sh && ./setup.sh
```
Skrip ini akan menginstall dependensi server, memverifikasi build plugin, memastikan relay WebSocket port `4395` aktif di background, dan menjalankan smoke test.

### Langkah 3: Daftarkan MCP Server ke Konfigurasi Agent
Tambahkan server `figma-bridge` ke file konfigurasi MCP kamu.
Path absolut script server adalah: `<PATH_REPOSITORI>/server/index.ts`.

Contoh konfigurasi JSON:
```json
{
  "mcpServers": {
    "figma-bridge": {
      "command": "bun",
      "args": ["<PATH_REPOSITORI_ABSOLUT>/server/index.ts"]
    }
  }
}
```
- Jika kamu adalah **Google Antigravity**: daftarkan ke file `~/.gemini/antigravity/mcp_config.json`.
- Jika kamu adalah **Claude Desktop (Linux)**: `~/.config/Claude/claude_desktop_config.json`.
- Jika kamu adalah **Claude Desktop (macOS)**: `~/Library/Application Support/Claude/claude_desktop_config.json`.
- Jika kamu adalah **Cursor / Windsurf**: `~/.cursor/mcp.json` atau `./.cursor/mcp.json`.

### Langkah 4: Pandu User Mengimpor Plugin di Figma Desktop
Setelah relay berjalan dan MCP terdaftar, berikan instruksi singkat kepada saya:
1. Buka aplikasi **Figma Desktop** dan buka file desain mana pun.
2. Klik ikon Figma (kiri atas) -> **Plugins** -> **Development** -> **Import plugin from manifest...**.
3. Pilih file manifest: `<PATH_REPOSITORI_ABSOLUT>/plugin/manifest.json`.
4. Jalankan plugin tersebut di kanvas (status window plugin akan berubah menjadi "Connected to relay").

### Langkah 5: Uji Koneksi Dua Arah
Setelah saya mengonfirmasi plugin sudah dibuka di Figma:
Panggil tool MCP `get_basic_info` atau `get_selection` untuk memverifikasi bahwa kamu sudah terhubung langsung ke kanvas Figma aktif saya. Tampilkan informasi file, nama page aktif, dan artboard yang terdeteksi!
```

---

## 🛠️ Ringkasan Tools Utama untuk AI Agent

Setelah terhubung, AI Agent memiliki 30 tools MCP:

| Tool | Fungsi Utama |
| :--- | :--- |
| `get_basic_info` | Mengambil info file, list page, dan artboard aktif untuk orientasi awal. |
| `get_selection` | Membaca node yang sedang dipilih/diklik oleh user di kanvas Figma. |
| `find_nodes` | Mencari node berdasarkan nama, tipe (`FRAME`, `TEXT`), atau regex. |
| `get_node` | Membaca detail hierarki, properti, padding, fills, dan ukuran node spesifik. |
| `get_layout` | Memeriksa koordinat box, absolute render bounds, dan deteksi tabrakan. |
| `get_screenshot` | Mengambil screenshot raster PNG dari node/frame tertentu di kanvas. |
| `create_frame` | Membuat Frame / Auto Layout baru dengan layoutMode (HORIZONTAL/VERTICAL). |
| `create_text` | Membuat teks baru dengan font otomatis preloaded. |
| `update_text` | Memperbarui isi teks pada node teks tanpa merusak styling. |
| `create_svg` | Merender ikon atau shape vektor dari raw string SVG. |
| `set_fills` | Mengubah background color, solid hex, gradient, atau opacity. |
| `set_strokes` | Menambahkan border/outline tebal dan warna. |
| `set_effects` | Menambahkan Drop Shadow, Inner Shadow, atau Blur. |
| `set_properties` | Mengubah width, height, cornerRadius, padding, itemSpacing, dll. |
| `tidy_layout` | Merapikan susunan child nodes Auto Layout secara instan. |
| `execute` | Menjalankan kode JavaScript arbitrer langsung di konteks Figma Plugin API. |
