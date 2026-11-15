"""
High-Variance Epigraphical Glyph Synthesizer
Generates realistic morphological variations, weathering erosion, directional chisel relief,
and stone lithology textures (Hoysala Soapstone, Vijayanagara Hard Granite, Mysuru Palm-Leaf)
to eliminate class imbalances and drive model classification accuracy toward 95%+.
"""

import os
import sys
import json
import random
import numpy as np
import cv2
from PIL import Image

# Output directory for synthetic dataset
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "synthetic_glyphs")
SOURCE_BASE = r"c:\Users\Kushal M N\Downloads\Ancient Kannada DATA"
FALLBACK_BASE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "glyphs")

# Target classes with emphasis on underrepresented medieval and early-modern epochs
TARGET_CLASSES = {
    "3_Kadamba": "kadamba",
    "4_BadamiChalukyas": "badami_chalukya",
    "5_Rashtrakuta": "rashtrakuta",
    "6_KalyanChalukya": "kalyana_chalukya",
    "7_Hoysala": "hoysala",
    "8_Vijayanagara": "vijayanagara",
    "9_Mysuru": "mysuru",
}


def add_soapstone_texture(img_np: np.ndarray) -> np.ndarray:
    """Simulates the fine chlorite-schist / soapstone grain typical of Hoysala temples."""
    h, w = img_np.shape[:2]
    noise = np.random.normal(loc=0, scale=12, size=(h // 4, w // 4)).astype(np.float32)
    noise = cv2.resize(noise, (w, h), interpolation=cv2.INTER_CUBIC)
    noisy_img = img_np.astype(np.float32)
    if len(noisy_img.shape) == 3:
        for c in range(3):
            noisy_img[:, :, c] += noise
    else:
        noisy_img += noise
    return np.clip(noisy_img, 0, 255).astype(np.uint8)


def add_granite_peck_texture(img_np: np.ndarray) -> np.ndarray:
    """Simulates coarse hard granite with quartz specks & chisel peck marks (Vijayanagara/Hampi)."""
    h, w = img_np.shape[:2]
    specks = np.zeros((h, w), dtype=np.float32)
    num_specks = random.randint(40, 90)
    for _ in range(num_specks):
        rx = random.randint(0, w - 1)
        ry = random.randint(0, h - 1)
        val = random.choice([-35.0, 45.0])
        cv2.circle(specks, (rx, ry), random.randint(1, 2), val, -1)

    noisy = img_np.astype(np.float32)
    if len(noisy.shape) == 3:
        for c in range(3):
            noisy[:, :, c] += specks
    else:
        noisy += specks
    return np.clip(noisy, 0, 255).astype(np.uint8)


def add_palm_leaf_fiber_texture(img_np: np.ndarray) -> np.ndarray:
    """Simulates linear fibrous grain of palm-leaf manuscripts and soft stone (Mysuru Wodeyars)."""
    h, w = img_np.shape[:2]
    lines = np.zeros((h, w), dtype=np.float32)
    for y in range(0, h, random.randint(3, 6)):
        alpha = random.uniform(-15.0, 15.0)
        lines[y:y+1, :] = alpha

    noisy = img_np.astype(np.float32)
    if len(noisy.shape) == 3:
        for c in range(3):
            noisy[:, :, c] += lines
    else:
        noisy += lines
    return np.clip(noisy, 0, 255).astype(np.uint8)


def apply_chisel_shadows(img_np: np.ndarray, light_angle_deg: float) -> np.ndarray:
    """Simulates directional oblique sunlight carving relief shadows into stone incisions."""
    rad = np.radians(light_angle_deg)
    dx = int(round(np.cos(rad) * 2))
    dy = int(round(np.sin(rad) * 2))

    kernel = np.zeros((5, 5), dtype=np.float32)
    cy, cx = 2, 2
    kernel[cy, cx] = 1.0
    if 0 <= cy - dy < 5 and 0 <= cx - dx < 5:
        kernel[cy - dy, cx - dx] = -0.5

    shadowed = cv2.filter2D(img_np, -1, kernel)
    return cv2.addWeighted(img_np, 0.75, shadowed, 0.25, 0)


def apply_weathering_erosion(img_np: np.ndarray) -> np.ndarray:
    """Simulates natural rain, wind, and mineral erosion on stone glyphs."""
    kernel_size = random.choice([2, 3])
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (kernel_size, kernel_size))
    mode = random.choice(["erode", "dilate", "open"])
    if mode == "erode":
        return cv2.erode(img_np, kernel, iterations=1)
    elif mode == "dilate":
        return cv2.dilate(img_np, kernel, iterations=1)
    else:
        return cv2.morphologyEx(img_np, cv2.MORPH_OPEN, kernel)


def generate_synthetic_crops(num_per_class: int = 75):
    """
    Generates 500+ high-variance synthetic crops across targeted epigraph classes.
    """
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    metadata = []

    for class_folder, fallback_name in TARGET_CLASSES.items():
        class_out_dir = os.path.join(OUTPUT_DIR, class_folder)
        os.makedirs(class_out_dir, exist_ok=True)

        src_dir = os.path.join(SOURCE_BASE, class_folder)
        if not os.path.exists(src_dir):
            src_dir = os.path.join(FALLBACK_BASE, fallback_name)

        if not os.path.exists(src_dir):
            print(f"[!] Neither {SOURCE_BASE} nor {FALLBACK_BASE} found for {class_folder}")
            continue

        seed_files = [
            os.path.join(src_dir, f) for f in os.listdir(src_dir)
            if f.lower().endswith((".png", ".jpg", ".jpeg"))
        ]

        if not seed_files:
            print(f"[!] No seed images found for {class_folder} in {src_dir}")
            continue

        # Allocate extra samples to Vijayanagara and Mysuru to balance dataset
        actual_samples = num_per_class + (25 if "Vijayanagara" in class_folder or "Mysuru" in class_folder else 0)
        print(f"[*] Found {len(seed_files)} seed images for {class_folder}. Generating {actual_samples} variants...")

        for idx in range(actual_samples):
            seed_path = random.choice(seed_files)
            try:
                with Image.open(seed_path) as pil_img:
                    img = pil_img.convert("RGB")

                    # 1. Subtle elastic perspective distortion & rotation
                    angle = random.uniform(-7, 7)
                    img = img.rotate(angle, resample=Image.BICUBIC, expand=False)

                    img_np = np.array(img)

                    # 2. Apply dynasty-specific lithology texture
                    if "Hoysala" in class_folder or "Kalyan" in class_folder:
                        img_np = add_soapstone_texture(img_np)
                    elif "Vijayanagara" in class_folder:
                        img_np = add_granite_peck_texture(img_np)
                    elif "Mysuru" in class_folder:
                        img_np = add_palm_leaf_fiber_texture(img_np)
                    else:
                        img_np = add_soapstone_texture(img_np)

                    # 3. Apply directional chisel relief shadows
                    light_deg = random.choice([30, 45, 90, 120, 225, 315])
                    img_np = apply_chisel_shadows(img_np, light_deg)

                    # 4. Apply weathering erosion
                    if random.random() > 0.35:
                        img_np = apply_weathering_erosion(img_np)

                    out_fname = f"synth_{class_folder}_{idx:03d}.png"
                    out_path = os.path.join(class_out_dir, out_fname)
                    Image.fromarray(img_np).save(out_path, format="PNG")

                    metadata.append({
                        "filename": out_fname,
                        "class_name": class_folder,
                        "source_seed": os.path.basename(seed_path),
                        "light_angle": light_deg,
                        "relative_path": os.path.join("data", "synthetic_glyphs", class_folder, out_fname),
                    })
            except Exception as e:
                print(f"[!] Error augmenting {seed_path}: {e}")

    meta_path = os.path.join(OUTPUT_DIR, "metadata.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    print(f"\n[+] Successfully generated {len(metadata)} high-variance synthetic epigraph glyphs in {OUTPUT_DIR}")


if __name__ == "__main__":
    generate_synthetic_crops(num_per_class=75)
