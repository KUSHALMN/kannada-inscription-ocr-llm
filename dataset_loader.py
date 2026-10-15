import os
from PIL import Image

class AncientKannadaDatasetCore:
    """
    10-Class Ancient Kannada Script Evolution Dataset Analyzer & Loader
    Chronological Classes:
      0: 1_AshokScript (3rd C. BCE)
      1: 2_SatavahanaScript (1st C. BCE - 3rd C. CE)
      2: 3_Kadamba (4th - 6th C. CE)
      3: 4_BadamiChalukyas (6th - 8th C. CE)
      4: 5_Rashtrakuta (8th - 10th C. CE)
      5: 6_KalyanChalukya (10th - 12th C. CE)
      6: 7_Hoysala (11th - 14th C. CE)
      7: 8_Vijayanagara (14th - 16th C. CE)
      8: 9_Mysuru (16th - 19th C. CE)
      9: 10_PresentKannada (19th - 21st C. CE)
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

    def __init__(self, root_dir=r"c:\Users\Kushal M N\Downloads\Ancient Kannada DATA"):
        self.root_dir = root_dir
        self.samples = []
        self.class_to_idx = {name: idx for idx, name in enumerate(self.CLASS_NAMES)}
        self.idx_to_class = {idx: name for idx, name in enumerate(self.CLASS_NAMES)}
        self._load_samples()

    def _load_samples(self):
        for cls_name, cls_idx in self.class_to_idx.items():
            cls_path = os.path.join(self.root_dir, cls_name)
            if os.path.isdir(cls_path):
                files = [f for f in os.listdir(cls_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
                for fname in sorted(files, key=lambda x: int(os.path.splitext(x)[0]) if os.path.splitext(x)[0].isdigit() else x):
                    self.samples.append((os.path.join(cls_path, fname), cls_idx, fname))

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        path, label, fname = self.samples[idx]
        image = Image.open(path).convert('RGB')
        return image, label, fname

    def summary(self):
        print("=" * 65)
        print("ANCIENT KANNADA SCRIPT DATASET SUMMARY")
        print("=" * 65)
        counts = {cls_name: 0 for cls_name in self.CLASS_NAMES}
        for _, label, _ in self.samples:
            counts[self.idx_to_class[label]] += 1
        for cls_name, cnt in counts.items():
            print(f"  [{cls_name:20s}] : {cnt:2d} character glyphs")
        print("-" * 65)
        print(f"  TOTAL GLYPH IMAGES    : {len(self.samples)}")
        print("=" * 65)

# Optional PyTorch Integration
try:
    import torch
    from torch.utils.data import Dataset, DataLoader
    from torchvision import transforms

    class AncientKannadaPyTorchDataset(Dataset):
        def __init__(self, root_dir=r"c:\Users\Kushal M N\Downloads\Ancient Kannada DATA", transform=None):
            self.core = AncientKannadaDatasetCore(root_dir)
            self.transform = transform or transforms.Compose([
                transforms.Resize((224, 224)),
                transforms.RandomRotation(degrees=7),
                transforms.RandomAffine(degrees=0, translate=(0.05, 0.05)),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
            ])

        def __len__(self):
            return len(self.core)

        def __getitem__(self, idx):
            img, label, _ = self.core[idx]
            if self.transform:
                img = self.transform(img)
            return img, torch.tensor(label, dtype=torch.long)

except ImportError:
    pass

if __name__ == "__main__":
    dataset = AncientKannadaDatasetCore()
    dataset.summary()
