"""
High-Variance Medieval Glyph Synthesizer for Hoysala & Kalyana Chalukya Classes.
Generates realistic morphological variations, weathering erosion, and 3D relief
shadowing to overcome the Hoysala zero-sample bottleneck and medieval cursive convergence.
"""

import os
import sys
import json
import random
import numpy as np
import cv2
from PIL import Image, ImageEnhance, ImageFilter

# Output directory for synthetic dataset
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "synthetic_glyphs")
SOURCE_BASE = r"c:\Users\Kushal M N\Downloads\Ancient Kannada DATA"
FALLBACK_BASE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "glyphs")

TARGET_CLASSES = {
    "6_KalyanChalukya": "kalyana_chalukya",
    "7_Hoysala": "hoysala"
}


def add_soapstone_texture(img_np: np.ndarray) -> np.ndarray:
    """Simulates the fine chlorite-schist / soapstone grain typical of Hoysala temples."""
    h, w = img_np.shape[:2]
    # Generate Perlin-like low frequency noise
    noise = np.random.normal(loc=0, scale=12, size=(h // 4, w // 4)).astype(np.float32)
    noise = cv2.resize(noise, (w, h), interpolation=cv2.INTER_CUBIC)
    
    noisy_img = img_np.astype(np.float32)
    if len(noisy_img.shape) == 3:
        for c in range(3):
            noisy_img[:, :, c] += noise
    else:
        noisy_img += noise
    return np.clip(noisy_img, 0, 255).astype(np.uint8)


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
    """Simulates 800+ years of natural rain, wind, and mineral erosion on stone glyphs."""
    kernel_size = random.choice([2, 3])
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (kernel_size, kernel_size))
    
    mode = random.choice(["erode", "dilate", "open"])
    if mode == "erode":
        return cv2.erode(img_np, kernel, iterations=1)
    elif mode == "dilate":
        return cv2.dilate(img_np, kernel, iterations=1)
    else:
        return cv2.morphologyEx(img_np, cv2.MORPH_OPEN, kernel)


def generate_synthetic_crops(num_per_class: int = 40):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    metadata = []
    
    for class_folder, fallback_name in TARGET_CLASSES.items():
        class_out_dir = os.path.join(OUTPUT_DIR, class_folder)
        os.makedirs(class_out_dir, exist_ok=True)
        
        # Collect source seed images
        src_dir = os.path.join(SOURCE_BASE, class_folder)
        if not os.path.exists(src_dir):
            src_dir = os.path.join(FALLBACK_BASE, fallback_name)
            
        seed_files = [
            os.path.join(src_dir, f) for f in os.listdir(src_dir)
            if f.lower().endswith((".png", ".jpg", ".jpeg"))
        ]
        
        if not seed_files:
            print(f"[!] No seed images found for {class_folder} in {src_dir}")
            continue
            
        print(f"[*] Found {len(seed_files)} seed images for {class_folder}. Generating {num_per_class} variants...")
        
        for idx in range(num_per_class):
            seed_path = random.choice(seed_files)
            try:
                with Image.open(seed_path) as pil_img:
                    img = pil_img.convert("RGB")
                    
                    # 1. Subtle elastic perspective distortion
                    w, h = img.size
                    angle = random.uniform(-6, 6)
                    img = img.rotate(angle, resample=Image.BICUBIC, expand=False)
                    
                    # 2. Convert to numpy for OpenCV stone/shadow filters
                    img_np = np.array(img)
                    
                    # 3. Apply soapstone mineral noise
                    img_np = add_soapstone_texture(img_np)
                    
                    # 4. Apply directional chisel relief
                    light_deg = random.choice([30, 45, 120, 225, 315])
                    img_np = apply_chisel_shadows(img_np, light_deg)
                    
                    # 5. Apply weathering erosion
                    if random.random() > 0.4:
                        img_np = apply_weathering_erosion(img_np)
                        
                    # Save synthetic file
                    out_fname = f"synth_{class_folder}_{idx:03d}.png"
                    out_path = os.path.join(class_out_dir, out_fname)
                    Image.fromarray(img_np).save(out_path, format="PNG")
                    
                    metadata.append({
                        "filename": out_fname,
                        "class_name": class_folder,
                        "source_seed": os.path.basename(seed_path),
                        "light_angle": light_deg,
                        "relative_path": os.path.join("data", "synthetic_glyphs", class_folder, out_fname)
                    })
            except Exception as e:
                print(f"[!] Error augmenting {seed_path}: {e}")

    meta_path = os.path.join(OUTPUT_DIR, "metadata.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"[+] Successfully generated {len(metadata)} synthetic medieval glyphs in {OUTPUT_DIR}")


if __name__ == "__main__":
    generate_synthetic_crops(num_per_class=45)
