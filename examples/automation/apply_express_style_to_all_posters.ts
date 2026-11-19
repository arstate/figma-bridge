import { callPlugin } from "./server/src/relay-client";

interface PosterConfig {
  id: string;
  name: string;
  categoryPill: string;
  headline1: string;
  headline2: string;
  ribbonBadge: string;
  heroLeft: {
    tab2: string;
    kicker: string;
    title: string;
    subtitle: string;
    pill1: string;
    pill2: string;
    pill3: string;
    footerQuote: string;
  };
  heroRight: {
    title: string;
    kicker: string;
    metric: string;
    button: string;
  };
  sectionTitle: string;
  tier1: {
    badge: string;
    title: string;
    price: string;
    subBadge: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
  };
  tier2: {
    badge: string;
    title: string;
    price: string;
    subBadge: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
  };
  tier3: {
    badge: string;
    title: string;
    price: string;
    subBadge: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
  };
}

const configs: PosterConfig[] = [
  {
    id: "809:9931",
    name: "POSTER_15",
    categoryPill: "VISUAL AUTHORITY & FEED 3:4",
    headline1: "FEED BERANTAKAN BIKIN BRAND",
    headline2: "DICAP MURAHAN & RAGU DIBELI!",
    ribbonBadge: "FORMAT 3:4 KUASAI LAYAR",
    heroLeft: {
      tab2: "feed-3:4",
      kicker: "FORMAT FEED RESMI · INSTAGRAM",
      title: "Desain Feed Instagram 3:4",
      subtitle: "Kuasai 80% layar ponsel, estetika visual rapi & siap closing.",
      pill1: "FEED 3:4 POTRET",
      pill2: "SAFE ZONE 1080",
      pill3: "PALET 60-30-10",
      footerQuote: "Etalase Feed Rapi Menjustifikasi Harga Produk Tinggi."
    },
    heroRight: {
      title: "Konsultasi Mas Tiar",
      kicker: "RETENSI SCROLL AUDIENS",
      metric: "Naik 3.4x Lipat",
      button: "CHAT WHATSAPP"
    },
    sectionTitle: "OPSI PAKET KONTEN FEED",
    tier1: {
      badge: "TIER 1 · FEED STARTER",
      title: "Paket 10 Desain Feed 3:4 Modern Tegas",
      price: "Mulai Rp 1.200.000",
      subBadge: "5 HARI SELESAI CEPAT",
      p1: "10 Konten Feed 3:4 Potret Kuasai 80% Layar Ponsel",
      p2: "Safe Zone 1080x1080 Terkunci Rapi di Profil Grid",
      p3: "Copywriting Hook 3 Detik Penahan Jari Audiens",
      p4: "Riset Visual Pembeda Tajam Anti-Desain Murahan"
    },
    tier2: {
      badge: "TIER 2 · FEED AUTHORITY",
      title: "Paket 20 Konten Feed & Carousel Edukasi",
      price: "Rp 2.000.000 – 2.800.000",
      subBadge: "STANDAR ETALASE BISNIS RESMI",
      p1: "20 Konten Campuran (Single Post + Multi-Slide Carousel)",
      p2: "Formula Slide 5-Lapis Edukasi Mengunci Rasa Percaya",
      p3: "Riset Tren Pasar & Copywriting Storytelling Tertarget",
      p4: "Buku Panduan Visual & Template Siap Pakai Brand Klien"
    },
    tier3: {
      badge: "TIER 3 · ALL-IN SOCIAL MEDIA",
      title: "Paket Djadi HERO Retainer (Feed + Reels + Ads)",
      price: "Rp 4.000.000 / Bulan",
      subBadge: "VOUCHER DJADICUAN500",
      p1: "20 Konten Campuran (Carousel 3:4 + Video Reels 9:16)",
      p2: "Official Website .com Custom Code Cepat (LCP < 1.5s)",
      p3: "Manajemen Iklan Meta Ads Advantage+ CBO Terarah",
      p4: "3x Private Mentoring Zoom 1-on-1 bersama Mas Tiar"
    }
  },
  {
    id: "809:10097",
    name: "POSTER_16",
    categoryPill: "BRAND IDENTITY & VECTOR HKI",
    headline1: "LOGO ASAL-ASALAN BIKIN",
    headline2: "KONSUMEN KABUR SEBELUM BELI!",
    ribbonBadge: "100% VEKTOR ASLI HKI",
    heroLeft: {
      tab2: "brand-identity",
      kicker: "STANDAR VEKTOR HKI · RESMI",
      title: "Sistem Identitas Brand Resmi",
      subtitle: "Logo filosofis berkarakter kuat, tipografi simetris & siap HKI.",
      pill1: "VEKTOR ORISINAL",
      pill2: "HKI REGISTERED",
      pill3: "PANDUAN WARNA",
      footerQuote: "Logo Vektor Orisinal Melindungi Bisnis dari Gugatan Hukum."
    },
    heroRight: {
      title: "Konsultasi Mas Tiar",
      kicker: "VALUASI EKUITAS BRAND",
      metric: "Naik 2.5x Lipat",
      button: "PESAN LOGO RESMI"
    },
    sectionTitle: "OPSI PAKET BRAND IDENTITY",
    tier1: {
      badge: "TIER 1 · LOGO EXPRESS",
      title: "Logo Simbolik Vektor & Panduan Warna Dasar",
      price: "Mulai Rp 1.000.000",
      subBadge: "3 HARI JADI CEPAT",
      p1: "3 Opsi Konsep Logo Vektor Orisinal Anti-Plagiat",
      p2: "File Master Lengkap (AI, SVG, PDF, PNG Transparan)",
      p3: "Panduan Palet 3 Warna Utama & Tipografi Resmi",
      p4: "Siap Digunakan untuk Profil Medsos & Kemasan Dasar"
    },
    tier2: {
      badge: "TIER 2 · COMPLETE BRAND IDENTITY",
      title: "Sistem Identitas Brand Menyeluruh & Aset Kantor",
      price: "Rp 2.500.000 – 3.500.000",
      subBadge: "STANDAR KORPORAT & HKI",
      p1: "5 Konsep Logo Filosofis + Monogram Ikon Khusus",
      p2: "Buku Panduan Visual Lengkap (Aturan Penggunaan Logo)",
      p3: "Desain Kartu Nama, Kop Surat, Nota & Amplop Resmi",
      p4: "Format Siap Daftarkan HKI Bebas Sengketa Hukum"
    },
    tier3: {
      badge: "TIER 3 · BRAND SUITE & PACKAGING",
      title: "Identitas Brand Premium + Desain Kemasan 3D",
      price: "Rp 4.500.000 – 6.500.000",
      subBadge: "FULL PACKAGING & 3D",
      p1: "Sistem Identitas Brand Skala Besar untuk Multi-Produk",
      p2: "Desain Kemasan Produk (Box, Pouch, Label Vektor 3D)",
      p3: "Mockup Realistis High-Res untuk Iklan & E-Commerce",
      p4: "Garansi Revisi Prioritas & Pendampingan Vendor Cetak"
    }
  },
  {
    id: "809:10425",
    name: "POSTER_17",
    categoryPill: "B2B PITCH DECK & COMPRO",
    headline1: "PROPOSAL BIASA DITOLAK TENDER?",
    headline2: "PITCH DECK MENANGKAN PROYEK!",
    ribbonBadge: "STANDAR INVESTOR & B2B",
    heroLeft: {
      tab2: "pitch-deck",
      kicker: "STANDAR TENDER B2B · KORPORAT",
      title: "Arsitektur Slide Pitch Deck B2B",
      subtitle: "Tata letak 16:9 modern tegas, visualisasi data rapi & siap tender.",
      pill1: "RASIO 16:9 HD",
      pill2: "DATA VISUAL TUFTE",
      pill3: "PDF INTERAKTIF",
      footerQuote: "Presentasi Berkelas Menjustifikasi Nilai Kontrak Ratusan Juta."
    },
    heroRight: {
      title: "Konsultasi Mas Tiar",
      kicker: "WIN-RATE TENDER PROYEK",
      metric: "Tembus 68% Win",
      button: "PESAN PITCH DECK"
    },
    sectionTitle: "OPSI FORMAT COMPRO & DECK",
    tier1: {
      badge: "TIER 1 · COMPRO DIGITAL",
      title: "Company Profile Digital 6–8 Halaman Elegan",
      price: "Mulai Rp 1.500.000",
      subBadge: "5 HARI SELESAI CEPAT",
      p1: "Struktur Standar B2B (Profil, Layanan, Portofolio, Kontak)",
      p2: "Desain Modern Tegas Menghilangkan Kesan Amatir",
      p3: "Format PDF Ringan Interaktif dengan Tombol Direct WhatsApp",
      p4: "Siap Kirim via Email & WhatsApp Sekali Klik"
    },
    tier2: {
      badge: "TIER 2 · PITCH DECK INVESTOR",
      title: "Pitch Deck Tender & Presentasi Kemitraan 12 Slide",
      price: "Rp 2.800.000 – 3.800.000",
      subBadge: "STANDAR MODAL VENTURA",
      p1: "12 Slide Persuasif (Problem, Solusi, Market, Unit Economics)",
      p2: "Infografis Data Visual & Grafik Finansial Standar Korporat",
      p3: "File Master PPTX Editable + Versi PDF Siap Tayang",
      p4: "Copywriting Penegas Value Pembeda Tajam Bisnis"
    },
    tier3: {
      badge: "TIER 3 · ENTERPRISE COMPRO SUITE",
      title: "B2B Enterprise Dossier & Cetak Hardcover Siap Tender",
      price: "Rp 4.500.000 – 6.500.000",
      subBadge: "FULL DOSSIER & CETAK",
      p1: "16–24 Halaman Mendalam untuk Tender BUMN & Korporat",
      p2: "Format Ganda: PDF Interaktif & File Cetak Separasi CMYK",
      p3: "Portofolio Studi Kasus Nyata & Testimoni Klien Resmi",
      p4: "Pendampingan Narasi Naratif Bisnis 1-on-1 Mas Tiar"
    }
  },
  {
    id: "809:10591",
    name: "POSTER_18",
    categoryPill: "EKOSISTEM DIGITAL ALL-IN-ONE",
    headline1: "CAPEK REKRUT TIM SATU PER SATU?",
    headline2: "1 INVOICE BERES SEMUA URUSAN!",
    ribbonBadge: "PILIHAN 90% KLIEN AKTIF",
    heroLeft: {
      tab2: "ekosistem-hero",
      kicker: "EKOSISTEM PERTUMBUHAN · RESMI",
      title: "Ekosistem Pertumbuhan Djadi",
      subtitle: "Website kilat + 20 konten medsos + Meta Ads dalam 1 SPK.",
      pill1: "1 INVOICE RESMI",
      pill2: "BEBAS BIAYA GAJI",
      pill3: "GARANSI HASIL",
      footerQuote: "Solusi All-In-One Tanpa Ribet Manajemen Karyawan Internal."
    },
    heroRight: {
      title: "Konsultasi Mas Tiar",
      kicker: "PENGHEMATAN BIAYA TIM",
      metric: "Hemat 15 Jt/Bln",
      button: "KLAIM DISKON 500RB"
    },
    sectionTitle: "OPSI PAKET EKOSISTEM HERO",
    tier1: {
      badge: "TIER 1 · STARTER MARKETING",
      title: "Paket Konten Sosial Media & Optimasi Akun",
      price: "Mulai Rp 2.500.000 / Bln",
      subBadge: "FOKUS BRAND ENGAGEMENT",
      p1: "15 Konten Feed & Reels Terencana Sepanjang Bulan",
      p2: "Riset Tren Industri & Copywriting Tertarget Konversi",
      p3: "Optimasi Bio Profil, Highlight, & Link WhatsApp Toko",
      p4: "Laporan Bulanan Engagement & Evaluasi Performa Akun"
    },
    tier2: {
      badge: "TIER 2 · HERO ALL-IN RETAINER",
      title: "Paket Unggulan Djadi HERO (Voucher DJADICUAN500)",
      price: "Rp 4.000.000 / Bulan (Net)",
      subBadge: "HERO OFFER PALING LARIS",
      p1: "20 Konten Campuran (Feed Carousel 3:4 + Reels 9:16)",
      p2: "Official Website .com Custom Code Cepat (LCP < 1.5s)",
      p3: "Manajemen Meta Ads CBO & Google Ads Brand Defense",
      p4: "3x Private Mentoring Zoom 1-on-1 bersama Mas Tiar"
    },
    tier3: {
      badge: "TIER 3 · GROWTH PARTNER SCALE",
      title: "Full-Funnel Growth Scale & Dedicated Account Lead",
      price: "Rp 7.500.000 / Bulan",
      subBadge: "SKALA BISNIS MENENGAH",
      p1: "30 Konten Produksi Penuh Termasuk Video Motion Remotion",
      p2: "Pengelolaan Iklan Skala Besar Multi-Channel Terpadu",
      p3: "Optimasi Landing Page A/B Testing & Tracking CAPI Riil",
      p4: "Audit Mingguan Prioritas & Akses Tim Creative 24/7"
    }
  },
  {
    id: "809:10758",
    name: "POSTER_19",
    categoryPill: "STRATEGI VIDEO KINETIK",
    headline1: "PUSING ALGORITMA BERUBAH TERUS?",
    headline2: "KUNCI RETENSI DI 3 DETIK AWAL!",
    ribbonBadge: "STOP SCROLL INSTAN",
    heroLeft: {
      tab2: "retensi-video",
      kicker: "REKAYASA VIDEO KINETIK · 9:16",
      title: "Struktur Retensi Video 9:16",
      subtitle: "Formula hook kinetik 3 detik, transisi cepat & sound design.",
      pill1: "HOOK KINETIK",
      pill2: "SUBTITLE DINAMIS",
      pill3: "SOUND DESIGN",
      footerQuote: "Drop-off 3 Detik Pertama Berkurang Hingga di Bawah 15%."
    },
    heroRight: {
      title: "Konsultasi Mas Tiar",
      kicker: "RATA-RATA WATCH-TIME",
      metric: "Naik 2.8x Lipat",
      button: "PESAN VIDEO VIRAL"
    },
    sectionTitle: "OPSI PAKET VIDEO PENDEK",
    tier1: {
      badge: "TIER 1 · REELS STARTER",
      title: "Paket 5 Video Reels/TikTok Editing Cepat",
      price: "Mulai Rp 1.500.000",
      subBadge: "5 HARI SELESAI CEPAT",
      p1: "5 Naskah Video Terstruktur dengan Formula Hook Kuat",
      p2: "Editing Cepat dengan Transisi Penahan Perhatian Audiens",
      p3: "Subtitle Dinamis Animasi Berwarna Mudah Dibaca di Layar HP",
      p4: "Format Rasio 9:16 Full HD 1080x1920 Siap Tayang"
    },
    tier2: {
      badge: "TIER 2 · VIRAL GROWTH REELS",
      title: "Paket 12 Video Pendek Edukasi & Penjualan",
      price: "Rp 2.800.000 – 3.500.000",
      subBadge: "REKOMENDASI UMKM AKTIF",
      p1: "12 Video Pendek Berbasis Riset Tren FYP Terkini",
      p2: "Sound Design Sinematik & Musik Komersial Bebas Hak Cipta",
      p3: "Cover Thumbnail Menarik Sesuai Safe Zone Profil Instagram",
      p4: "Penjadwalan Konten Otomatis & Riset Hashtag Efektif"
    },
    tier3: {
      badge: "TIER 3 · CONTENT MACHINE BULANAN",
      title: "Paket Retainer Konten Campuran (20 Konten + Ads)",
      price: "Rp 4.000.000 / Bulan",
      subBadge: "PAKET DJADI HERO ALL-IN",
      p1: "20 Konten Campuran (Video Reels 9:16 + Feed Carousel 3:4)",
      p2: "Iklan Advantage+ CBO untuk Memperluas Jangkauan Video",
      p3: "Integrasi Direct CTA Menghubungkan ke WhatsApp Toko",
      p4: "Evaluasi Metrik Save & Share Rate Setiap Hari Jumat"
    }
  },
  {
    id: "809:10921",
    name: "POSTER_20",
    categoryPill: "PROGRAMMATIC VIDEO REELS",
    headline1: "BIKIN PULUHAN VIDEO PROMOSI?",
    headline2: "REMOTION VIDEO KODE OTOMATIS!",
    ribbonBadge: "100% PROGRAMMATIC 60FPS",
    heroLeft: {
      tab2: "remotion-engine",
      kicker: "REKAYASA VIDEO KODE · 60FPS",
      title: "Mesin Video React Remotion",
      subtitle: "Render ratusan video vertikal 1080x1920 berbasis kode React.",
      pill1: "SPRING PHYSICS",
      pill2: "ZERO KEYFRAMES",
      pill3: "HEADLESS RENDER",
      footerQuote: "Gerakan Fisika Pegas Alami Tanpa CSS Keyframes Tradisional."
    },
    heroRight: {
      title: "Konsultasi Mas Tiar",
      kicker: "EFISIENSI WAKTU RENDER",
      metric: "10x Lebih Cepat",
      button: "DEMO REMOTION WA"
    },
    sectionTitle: "OPSI PAKET VIDEO REMOTION",
    tier1: {
      badge: "TIER 1 · TEMPLATE KINETIK",
      title: "1 Template Master Remotion Kustom untuk Brand",
      price: "Mulai Rp 2.000.000",
      subBadge: "KODE REACT BERSIH",
      p1: "Kode Komponen React Terstruktur Bersih & Skalabel",
      p2: "Animasi Teks & Aset Menggunakan Spring Physics Halus",
      p3: "Pengaturan Warna Brand, Logo, & Tipografi Otomatis",
      p4: "Skrip Render Headless Sederhana Sekali Klik"
    },
    tier2: {
      badge: "TIER 2 · AUTOMATED PRODUCT REELS",
      title: "Sistem Otomasi Video Katalog Multi-Produk",
      price: "Rp 3.500.000 – 4.500.000",
      subBadge: "DYNAMIC PRODUCT ADS",
      p1: "Render 20+ Video Produk Otomatis dari Spreadsheet / JSON",
      p2: "Animasi Harga Coret, Spesifikasi, & Rating Bintang Dinamis",
      p3: "Musik Latar & Efek Suara Sinkron dengan Gerakan Visual",
      p4: "Dokumentasi Lengkap & File Proyek Remotion Siap Deploy"
    },
    tier3: {
      badge: "TIER 3 · ENTERPRISE VIDEO ENGINE",
      title: "Engine Video Otomatis Terhubung API / Database",
      price: "Rp 6.000.000 – 8.500.000",
      subBadge: "ENTERPRISE PIPELINE",
      p1: "Integrasi Cloud Render untuk Ribuan Varian Video Promosi",
      p2: "Cocok untuk Marketplace, Properti, & Agensi Skala Besar",
      p3: "Template Khusus Iklan Dynamic Product Ads (DPA) Meta",
      p4: "Dukungan Teknis Penuh & Garansi Optimasi Pipeline Render"
    }
  }
];

async function main() {
  console.log("Applying refined typography, auto-fit containers, and precise alignments...");

  for (const cfg of configs) {
    console.log(`Polishing ${cfg.name} (${cfg.id})...`);

    const code = `
      await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "Bold" });
      await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
      await figma.loadFontAsync({ family: "Space Mono", style: "Regular" });
      await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });

      const target = await figma.getNodeByIdAsync("${cfg.id}");
      const master = await figma.getNodeByIdAsync("795:273");
      if (!target || !master) return { error: "target or master not found" };

      // Reset target to fresh clone of master
      const old = [...target.children];
      for (const c of old) c.remove();

      target.resize(1080, 1440);
      target.fills = master.fills;

      for (const c of master.children) {
        target.appendChild(c.clone());
      }

      // =========================================================================
      // 1. TOP HEADER (Category Pill)
      // =========================================================================
      const headerGroup = target.findOne(n => n.name === "Group" && n.y < 150 && n.x < 150);
      if (headerGroup) {
        const catText = headerGroup.findOne(n => n.type === "TEXT" && n.characters.includes("WEB ARCHITECTURE"));
        if (catText) {
          catText.characters = "${cfg.categoryPill}";
        }
      }

      // =========================================================================
      // 2. RIBBON & HEADLINE
      // =========================================================================
      const ribbonGroup = target.findOne(n => n.name === "Group 64" || (n.type === "GROUP" && n.y > 150 && n.y < 250));
      if (ribbonGroup) {
        // Hide small .com white rectangle
        const rectSmall = ribbonGroup.findOne(n => n.name === "Rectangle 48");
        if (rectSmall) {
          rectSmall.visible = false;
        }

        // Line 1 Headline
        const t1 = ribbonGroup.findOne(n => n.type === "TEXT" && n.characters.includes("BIKIN WEBSITE"));
        if (t1) {
          t1.characters = "${cfg.headline1}";
          if (t1.width > 820) {
            t1.fontSize = Math.floor(t1.fontSize * 820 / t1.width);
          }
          t1.x = Math.round((1080 - t1.width) / 2);
        }

        // Line 2 Headline & White Rounded Container
        const gLine2 = ribbonGroup.findOne(n => n.name === "Group" && n.y > 240 && n.y < 340);
        if (gLine2) {
          const t2 = gLine2.findOne(n => n.type === "TEXT" && n.characters.includes("MULAI 1.5 JUTA"));
          const rectWhite = gLine2.findOne(n => n.name === "Rounded rectangle" || (n.type === "RECTANGLE" && n.fills && n.fills[0]?.color?.r === 1 && n.fills[0]?.color?.g === 1));
          const rectShadow = gLine2.findOne(n => n.name === "Rectangle 47" || (n.type === "RECTANGLE" && n !== rectWhite));

          if (t2) {
            t2.characters = "${cfg.headline2}";
            t2.fontSize = 36;
            if (t2.width > 600) {
              t2.fontSize = Math.floor(t2.fontSize * 580 / t2.width);
            }

            const boxW = Math.max(620, Math.round(t2.width + 56));
            const boxX = Math.round((1080 - boxW) / 2);

            if (rectWhite) {
              rectWhite.resize(boxW, rectWhite.height);
              rectWhite.x = boxX;
            }
            if (rectShadow) {
              rectShadow.resize(boxW, rectShadow.height);
              rectShadow.x = boxX + 3;
            }

            t2.x = Math.round(boxX + (boxW - t2.width) / 2);
            if (rectWhite) {
              t2.y = Math.round(rectWhite.y + (rectWhite.height - t2.height) / 2);
            }
          }
        }

        // Tilted Crimson Red Pill Badge
        const gBadge = ribbonGroup.findOne(n => n.name === "Group 63" || (n.type === "GROUP" && n.y > 300));
        if (gBadge) {
          const tBadge = gBadge.findOne(n => n.type === "TEXT");
          const rBadge = gBadge.findOne(n => n.type === "RECTANGLE");
          if (tBadge) {
            tBadge.characters = "${cfg.ribbonBadge}";
            if (rBadge) {
              rBadge.resize(Math.round(tBadge.width + 40), rBadge.height);
              tBadge.x = Math.round(rBadge.x + (rBadge.width - tBadge.width) / 2);
            }
          }
        }
      }

      // =========================================================================
      // 3. DECOUPLED KINETIC HERO (Mockup Left & Telemetry Right)
      // =========================================================================
      const g69 = target.findOne(n => n.name === "Group 69" || (n.type === "GROUP" && n.y > 390 && n.y < 450));
      if (g69) {
        // Left Card
        const heroLeft = g69.children.find(c => c.x < 300);
        if (heroLeft) {
          const tab2 = heroLeft.findOne(n => n.type === "TEXT" && n.characters.includes("web-express"));
          if (tab2) tab2.characters = "${cfg.heroLeft.tab2}";

          const kick = heroLeft.findOne(n => n.type === "TEXT" && n.characters.includes("PRODUKSI LIVE"));
          if (kick) kick.characters = "${cfg.heroLeft.kicker}";

          const tit = heroLeft.findOne(n => n.type === "TEXT" && n.fontSize > 18);
          if (tit) {
            tit.characters = "${cfg.heroLeft.title}";
            if (tit.width > 380) {
              tit.fontSize = Math.floor(tit.fontSize * 380 / tit.width);
            }
          }

          const sub = heroLeft.findOne(n => n.type === "TEXT" && n.characters.includes("Landing page kilat"));
          if (sub) sub.characters = "${cfg.heroLeft.subtitle}";

          const p1 = heroLeft.findOne(n => n.type === "TEXT" && n.characters.includes("NEXT.JS"));
          if (p1) p1.characters = "${cfg.heroLeft.pill1}";

          const p2 = heroLeft.findOne(n => n.type === "TEXT" && n.characters.includes("STICKY WA"));
          if (p2) p2.characters = "${cfg.heroLeft.pill2}";

          const p3 = heroLeft.findOne(n => n.type === "TEXT" && n.characters.includes("PIXEL"));
          if (p3) p3.characters = "${cfg.heroLeft.pill3}";

          const quot = heroLeft.findOne(n => n.type === "TEXT" && n.characters.includes("Bebas Template"));
          if (quot) {
            quot.characters = "${cfg.heroLeft.footerQuote}";
            if (quot.width > 390) {
              quot.fontSize = Math.floor(quot.fontSize * 390 / quot.width);
            }
          }
        }

        // Right Card
        const heroRight = g69.children.find(c => c.x > 500);
        if (heroRight) {
          const tit = heroRight.findOne(n => n.type === "TEXT" && n.characters.includes("Checkout Langsung"));
          if (tit) tit.characters = "${cfg.heroRight.title}";

          const kick = heroRight.findOne(n => n.type === "TEXT" && n.characters.includes("TOTAL INVESTASI"));
          if (kick) kick.characters = "${cfg.heroRight.kicker}";

          const met = heroRight.findOne(n => n.type === "TEXT" && n.characters.includes("Mulai Rp"));
          if (met) {
            met.characters = "${cfg.heroRight.metric}";
            if (met.width > 240) {
              met.fontSize = Math.floor(met.fontSize * 240 / met.width);
            }
          }

          const btn = heroRight.findOne(n => n.type === "TEXT" && n.characters.includes("BELI VIA"));
          if (btn) btn.characters = "${cfg.heroRight.button}";
        }
      }

      // =========================================================================
      // 4. SECTION TITLE & 3 TIERED NAVY CARDS
      // =========================================================================
      const secGroup = target.findOne(n => n.name === "Group" && n.y > 640 && n.y < 700);
      if (secGroup) {
        const yellowBar = secGroup.findOne(n => n.name === "Rectangle 49" || (n.type === "RECTANGLE" && n.height > 45 && n.height < 65));
        const secText = secGroup.findOne(n => n.type === "TEXT" && n.characters.includes("OPSI PAKET"));

        if (secText && yellowBar) {
          secText.characters = "${cfg.sectionTitle}";
          if (secText.width > 680) {
            secText.fontSize = Math.floor(secText.fontSize * 680 / secText.width);
          }
          secText.x = Math.round(yellowBar.x + (yellowBar.width - secText.width) / 2);
        }

        const cards = secGroup.children.filter(c => c.type === "GROUP" && c.height > 150);

        // Tier 1 Card
        if (cards[0]) {
          const c = cards[0];
          const b = c.findOne(n => n.type === "TEXT" && n.characters.includes("TIER 1"));
          if (b) b.characters = "${cfg.tier1.badge}";

          const tit = c.findOne(n => n.type === "TEXT" && n.characters.includes("One-Page"));
          if (tit) tit.characters = "${cfg.tier1.title}";

          const pr = c.findOne(n => n.type === "TEXT" && n.characters.includes("Mulai Rp"));
          if (pr) pr.characters = "${cfg.tier1.price}";

          const sb = c.findOne(n => n.type === "TEXT" && n.characters.includes("5 HARI JADI"));
          if (sb) sb.characters = "${cfg.tier1.subBadge}";

          const pt1 = c.findOne(n => n.type === "TEXT" && n.characters.includes("1 Halaman Fokus"));
          if (pt1) pt1.characters = "${cfg.tier1.p1}";

          const pt2 = c.findOne(n => n.type === "TEXT" && n.characters.includes("Tombol Sticky"));
          if (pt2) pt2.characters = "${cfg.tier1.p2}";

          const pt3 = c.findOne(n => n.type === "TEXT" && n.characters.includes("Arsitektur Next.js"));
          if (pt3) pt3.characters = "${cfg.tier1.p3}";

          const pt4 = c.findOne(n => n.type === "TEXT" && n.characters.includes("Gratis Setup"));
          if (pt4) pt4.characters = "${cfg.tier1.p4}";
        }

        // Tier 2 Card
        if (cards[1]) {
          const c = cards[1];
          const b = c.findOne(n => n.type === "TEXT" && n.characters.includes("TIER 2"));
          if (b) b.characters = "${cfg.tier2.badge}";

          const tit = c.findOne(n => n.type === "TEXT" && n.characters.includes("Website Multi-Halaman"));
          if (tit) tit.characters = "${cfg.tier2.title}";

          const pr = c.findOne(n => n.type === "TEXT" && n.characters.includes("2.500.000"));
          if (pr) pr.characters = "${cfg.tier2.price}";

          const sb = c.findOne(n => n.type === "TEXT" && n.characters.includes("STANDAR COMPANY"));
          if (sb) sb.characters = "${cfg.tier2.subBadge}";

          const pt1 = c.findOne(n => n.type === "TEXT" && n.characters.includes("3–5 Halaman"));
          if (pt1) pt1.characters = "${cfg.tier2.p1}";

          const pt2 = c.findOne(n => n.type === "TEXT" && n.characters.includes("Form Lead Capture"));
          if (pt2) pt2.characters = "${cfg.tier2.p2}";

          const pt3 = c.findOne(n => n.type === "TEXT" && n.characters.includes("Desain Modern"));
          if (pt3) pt3.characters = "${cfg.tier2.p3}";

          const pt4 = c.findOne(n => n.type === "TEXT" && n.characters.includes("SEO On-Page"));
          if (pt4) pt4.characters = "${cfg.tier2.p4}";
        }

        // Tier 3 Card
        if (cards[2]) {
          const c = cards[2];
          const b = c.findOne(n => n.type === "TEXT" && n.characters.includes("TIER 3"));
          if (b) b.characters = "${cfg.tier3.badge}";

          const tit = c.findOne(n => n.type === "TEXT" && n.characters.includes("Website Katalog"));
          if (tit) tit.characters = "${cfg.tier3.title}";

          const pr = c.findOne(n => n.type === "TEXT" && n.characters.includes("3.500.000"));
          if (pr) pr.characters = "${cfg.tier3.price}";

          const sb = c.findOne(n => n.type === "TEXT" && n.characters.includes("FULL ARCHITECTURE"));
          if (sb) sb.characters = "${cfg.tier3.subBadge}";

          const pt1 = c.findOne(n => n.type === "TEXT" && n.characters.includes("5–7 Halaman"));
          if (pt1) pt1.characters = "${cfg.tier3.p1}";

          const pt2 = c.findOne(n => n.type === "TEXT" && n.characters.includes("Fitur Stepper"));
          if (pt2) pt2.characters = "${cfg.tier3.p2}";

          const pt3 = c.findOne(n => n.type === "TEXT" && n.characters.includes("Setup Tracking"));
          if (pt3) pt3.characters = "${cfg.tier3.p3}";

          const pt4 = c.findOne(n => n.type === "TEXT" && n.characters.includes("Optimasi Skor"));
          if (pt4) pt4.characters = "${cfg.tier3.p4}";
        }
      }

      return { success: true, poster: "${cfg.name}" };
    `;

    try {
      const res = await callPlugin("execute", { code });
      console.log(`Polished ${cfg.name}:`, res);
    } catch (e: any) {
      console.error(`Error polishing ${cfg.name}:`, e.message);
    }
  }

  console.log("All posters 15 to 20 perfectly polished!");
}

main().catch(console.error);
