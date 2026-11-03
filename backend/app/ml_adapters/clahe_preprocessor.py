"""
Texture-Invariant CLAHE & Morphological Chisel Preprocessor for Epigraphy.
Engineered to break the generalization gap (overfitting) by decoupling
stone substrate grain/color from carved glyph stroke morphology.
"""

import cv2
import numpy as np
from PIL import Image
import torch
from torchvision import transforms


class TextureInvariantCLAHE:
    """
    Applies Contrast Limited Adaptive Histogram Equalization (CLAHE) combined with
    Bilateral Filtering and Morphological Top-Hat/Black-Hat transforms to isolate
    incised stone glyphs from raw granite/schist background textures.
    """

    def __init__(self, clip_limit: float = 3.5, tile_grid_size: tuple = (8, 8), preserve_channels: bool = True):
        self.clip_limit = clip_limit
        self.tile_grid_size = tile_grid_size
        self.preserve_channels = preserve_channels

    def __call__(self, img: Image.Image) -> Image.Image:
        """Process PIL image into a texture-invariant CLAHE relief image."""
        if not isinstance(img, Image.Image):
            img = Image.fromarray(img)

        rgb_np = np.array(img.convert("RGB"))
        # Convert to LAB color space to equalize Luminance while preserving chromatic tones
        lab = cv2.cvtColor(rgb_np, cv2.COLOR_RGB2LAB)
        l_channel, a_channel, b_channel = cv2.split(lab)

        # Bilateral filter on L-channel to smooth surface mineral specks without blurring carved edges
        l_smooth = cv2.bilateralFilter(l_channel, d=7, sigmaColor=50, sigmaSpace=50)

        # Multi-tile adaptive histogram equalization
        clahe = cv2.createCLAHE(clipLimit=self.clip_limit, tileGridSize=self.tile_grid_size)
        l_clahe = clahe.apply(l_smooth)

        if self.preserve_channels:
            merged_lab = cv2.merge([l_clahe, a_channel, b_channel])
            result_rgb = cv2.cvtColor(merged_lab, cv2.COLOR_LAB2RGB)
        else:
            result_rgb = cv2.cvtColor(l_clahe, cv2.COLOR_GRAY2RGB)

        return Image.fromarray(result_rgb)


class MorphologicalChiselExtractor:
    """
    Extracts deep chisel grooves and stroke skeletons using morphological gradient filters.
    Forces deep networks to focus exclusively on character anatomy rather than lithic substrate.
    """

    def __init__(self, kernel_size: int = 3):
        self.kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, kernel_size))

    def __call__(self, img: Image.Image) -> Image.Image:
        rgb_np = np.array(img.convert("RGB"))
        gray = cv2.cvtColor(rgb_np, cv2.COLOR_RGB2GRAY)

        # Morphological gradient = Dilation - Erosion (highlights chisel boundaries)
        gradient = cv2.morphologyEx(gray, cv2.MORPH_GRADIENT, self.kernel)

        # Morphological Black-Hat = Closing - Source (extracts dark grooves chiseled into stone)
        blackhat = cv2.morphologyEx(gray, cv2.MORPH_BLACKHAT, self.kernel)

        # Fused relief signature
        fused = cv2.addWeighted(gradient, 0.6, blackhat, 0.4, 0)
        fused_rgb = cv2.cvtColor(fused, cv2.COLOR_GRAY2RGB)
        return Image.fromarray(fused_rgb)


def get_epigraph_train_transforms(image_size: int = 224) -> transforms.Compose:
    """
    Training data augmentation pipeline featuring CLAHE, morphological lighting shifts,
    and elastic affine perturbations to break background texture memorization.
    """
    return transforms.Compose([
        TextureInvariantCLAHE(clip_limit=3.0, tile_grid_size=(8, 8)),
        transforms.Resize((image_size + 16, image_size + 16)),
        transforms.RandomCrop(image_size),
        transforms.RandomHorizontalFlip(p=0.0),  # Epigraphic text cannot be flipped horizontally!
        transforms.RandomRotation(degrees=(-5, 5)),  # Slight camera skew
        transforms.ColorJitter(brightness=0.25, contrast=0.3, saturation=0.1),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])


def get_epigraph_val_transforms(image_size: int = 224) -> transforms.Compose:
    """Validation / Evaluation transform with deterministic CLAHE."""
    return transforms.Compose([
        TextureInvariantCLAHE(clip_limit=3.0, tile_grid_size=(8, 8)),
        transforms.Resize((image_size, image_size)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
