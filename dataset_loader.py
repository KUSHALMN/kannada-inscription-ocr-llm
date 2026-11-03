import os
import sys
from PIL import Image

try:
    import torch
    from torch.utils.data import Dataset, DataLoader
    from torchvision import transforms
    from backend.app.ml_adapters.clahe_preprocessor import (
        TextureInvariantCLAHE,
        get_epigraph_train_transforms,
        get_epigraph_val_transforms
    )
except ImportError:
    torch = None


class AncientKannadaDatasetCore:
    """
    10-Class Ancient Kannada Script Evolution Dataset Analyzer & Hierarchical Loader.
    Supports both canonical steles and synthetic soapstone/chlorite crops.

    Macro-Era Buckets:
      0: Ancient Brahmi (AshokScript, SatavahanaScript, Kadamba)
      1: Medieval Cursive (BadamiChalukyas, Rashtrakuta, KalyanChalukya, Hoysala)
      2: Post-Medieval / Modern (Vijayanagara, Mysuru, PresentKannada)
    """
    CLASS_NAMES = [
        '1_AshokScript',
        '2_SatavahanaScript',
        '3_Kadamba',
        '4_BadamiChalukyas',
        '5_Rashtrakuta',
        '6_KalyanChalukya',
        '7_Hoysala',
        '8_Vijayanagara',
        '9_Mysuru',
        '10_PresentKannada'
    ]

    MACRO_MAP = {
        '1_AshokScript': 0,
        '2_SatavahanaScript': 0,
        '3_Kadamba': 0,
        '4_BadamiChalukyas': 1,
        '5_Rashtrakuta': 1,
        '6_KalyanChalukya': 1,
        '7_Hoysala': 1,
        '8_Vijayanagara': 2,
        '9_Mysuru': 2,
        '10_PresentKannada': 2
    }

    MACRO_NAMES = [
        "Ancient Brahmi (3rd C. BCE - 6th C. CE)",
        "Medieval Cursive (6th C. - 14th C. CE)",
        "Post-Medieval & Modern (14th C. - 21st C. CE)"
    ]

    def __init__(
        self,
        root_dir=r"c:\Users\Kushal M N\Downloads\Ancient Kannada DATA",
        include_synthetic: bool = True,
        synthetic_dir=None
    ):
        self.root_dir = root_dir
        self.include_synthetic = include_synthetic
        self.synthetic_dir = synthetic_dir or os.path.join(
            os.path.dirname(__file__), "data", "synthetic_glyphs"
        )
        self.samples = []
        self.class_to_idx = {name: idx for idx, name in enumerate(self.CLASS_NAMES)}
        self.idx_to_class = {idx: name for idx, name in enumerate(self.CLASS_NAMES)}
        self._load_samples()

    def _load_samples(self):
        # 1. Load canonical primary dataset
        for cls_name, cls_idx in self.class_to_idx.items():
            cls_path = os.path.join(self.root_dir, cls_name)
            if os.path.isdir(cls_path):
                files = [f for f in os.listdir(cls_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
                for fname in sorted(files, key=lambda x: int(os.path.splitext(x)[0]) if os.path.splitext(x)[0].isdigit() else x):
                    macro_idx = self.MACRO_MAP[cls_name]
                    self.samples.append((os.path.join(cls_path, fname), cls_idx, macro_idx, fname, False))

        # 2. Optionally load high-variance synthetic samples (Hoysala & KalyanChalukya)
        if self.include_synthetic and os.path.isdir(self.synthetic_dir):
            for cls_name in ["6_KalyanChalukya", "7_Hoysala"]:
                synth_cls_dir = os.path.join(self.synthetic_dir, cls_name)
                if os.path.isdir(synth_cls_dir):
                    cls_idx = self.class_to_idx[cls_name]
                    macro_idx = self.MACRO_MAP[cls_name]
                    files = [f for f in os.listdir(synth_cls_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
                    for fname in files:
                        self.samples.append((os.path.join(synth_cls_dir, fname), cls_idx, macro_idx, fname, True))

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        path, micro_label, macro_label, fname, is_synthetic = self.samples[idx]
        image = Image.open(path).convert('RGB')
        return image, micro_label, macro_label, fname

    def summary(self):
        print("=" * 75)
        print("ANCIENT KANNADA SCRIPT DATASET: HIERARCHICAL & SYNTHETIC SUMMARY")
        print("=" * 75)
        counts = {cls_name: 0 for cls_name in self.CLASS_NAMES}
        synth_counts = {cls_name: 0 for cls_name in self.CLASS_NAMES}
        for _, micro, _, _, is_synth in self.samples:
            cls_name = self.idx_to_class[micro]
            counts[cls_name] += 1
            if is_synth:
                synth_counts[cls_name] += 1
        for cls_name, cnt in counts.items():
            synth_info = f" (+{synth_counts[cls_name]} synthetic)" if synth_counts[cls_name] > 0 else ""
            print(f"  [{cls_name:20s}] : {cnt:2d} character glyphs{synth_info}")
        print("-" * 75)
        print(f"  TOTAL GLYPH IMAGES    : {len(self.samples)}")
        print("=" * 75)


class AncientKannadaPyTorchDataset(Dataset):
    """
    PyTorch Dataset returning both micro-dynasty label (0-9) and macro-era label (0-2)
    with Texture-Invariant CLAHE preprocessing.
    """
    def __init__(
        self,
        root_dir=r"c:\Users\Kushal M N\Downloads\Ancient Kannada DATA",
        transform=None,
        is_training: bool = True,
        include_synthetic: bool = True
    ):
        self.core = AncientKannadaDatasetCore(root_dir=root_dir, include_synthetic=include_synthetic)
        if transform:
            self.transform = transform
        else:
            self.transform = (
                get_epigraph_train_transforms(224) if is_training
                else get_epigraph_val_transforms(224)
            )

    def __len__(self):
        return len(self.core)

    def __getitem__(self, idx):
        img, micro_label, macro_label, _ = self.core[idx]
        if self.transform:
            img = self.transform(img)
        return (
            img,
            torch.tensor(micro_label, dtype=torch.long),
            torch.tensor(macro_label, dtype=torch.long)
        )


if __name__ == "__main__":
    dataset = AncientKannadaDatasetCore(include_synthetic=True)
    dataset.summary()
