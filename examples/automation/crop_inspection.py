from PIL import Image
import os

img_path = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/crops/borang_a3_retina_2x.png"
out_dir = "/home/arya/.gemini/antigravity-cli/brain/7594ec33-d293-4fb4-8cca-5cb404427595/crops_detailed"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(img_path)
W, H = img.size
scale = W / 1754.0

# Exact containers in 851:16993
containers = [
    ("01_header_full", 20, 15, 1714, 92),
    ("02_header_logo_dock", 32, 22, 220, 78),
    ("03_ekosistem_4_brand", 1312, 118, 420, 50),
    ("04_p1_profil_kredibilitas", 32, 176, 410, 220),
    ("05_p2_swot_tows", 452, 176, 410, 220),
    ("06_p4_roadmap_kpi", 872, 176, 420, 220),
    ("07_p5_value_ladder", 1302, 176, 420, 220),
    ("08_c1_bmc_9_blok", 32, 404, 545, 195),
    ("09_c2_errc_grid", 587, 404, 545, 195),
    ("10_c3_7_area_marketing", 1142, 404, 580, 195),
    ("11_c4_5_alasan_customer", 32, 607, 410, 175),
    ("12_c5_12_step_assessment", 452, 607, 410, 175),
    ("13_c6_market_size", 872, 607, 420, 175),
    ("14_c7_buyer_value", 1302, 607, 420, 175),
    ("15_c9_customer_journey", 32, 790, 545, 140),
    ("16_c10_wow_wom", 587, 790, 545, 140),
    ("17_c11_seven_strata", 1142, 790, 580, 140),
    ("18_c16_winning_zone", 32, 938, 405, 278),
    ("19_c17_audit_5m", 447, 938, 415, 278),
    ("20_c18_action_engine", 872, 938, 400, 278),
    ("21_c19_pengesahan_eksekutif", 1282, 938, 440, 278),
    ("22_gold_seal_stamp_zoom", 1380, 1070, 120, 120),
    ("23_founder_signature_zoom", 1520, 1070, 190, 120),
]

for name, x, y, w, h in containers:
    pad = 4
    x0 = max(0, int((x - pad) * scale))
    y0 = max(0, int((y - pad) * scale))
    x1 = min(W, int((x + w + pad) * scale))
    y1 = min(H, int((y + h + pad) * scale))
    cropped = img.crop((x0, y0, x1, y1))
    out_file = os.path.join(out_dir, f"{name}.png")
    cropped.save(out_file)
    print(f"Saved {out_file} ({cropped.size[0]}x{cropped.size[1]})")

print("Exact container crops completed!")
