"""
Hierarchical CNN + Vision Transformer (ViT) Multi-Task Training Script.
Solves the Medieval Cursive Convergence and Hoysala zero-sample bottleneck
using joint Macro-Era (3 classes) and Micro-Dynasty (10 classes) multi-task learning,
Texture-Invariant CLAHE preprocessing, and synthetic soapstone data expansion.
"""

import os
import sys
import json
import time
from typing import Tuple, Dict, Any, List

import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader, random_split
from tqdm import tqdm

from dataset_loader import AncientKannadaPyTorchDataset, AncientKannadaDatasetCore
from backend.app.ml_adapters.hierarchical_model import HierarchicalCNNViT

if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")


def get_optimal_device() -> Tuple[torch.device, str]:
    if torch.cuda.is_available():
        gpu_name = torch.cuda.get_device_name(0)
        try:
            t = torch.zeros(2, 2, device="cuda") + 1.0
            torch.cuda.synchronize()
            return torch.device("cuda:0"), f"CUDA ({gpu_name})"
        except Exception:
            torch.set_num_threads(os.cpu_count() or 8)
            return torch.device("cpu"), f"CPU ({os.cpu_count()} threads)"
    else:
        torch.set_num_threads(os.cpu_count() or 8)
        return torch.device("cpu"), f"CPU ({os.cpu_count()} threads)"


def train_hierarchical_model(
    data_dir: str = r"c:\Users\Kushal M N\Downloads\Ancient Kannada DATA",
    output_dir: str = "./saved_models",
    epochs: int = 15,
    batch_size: int = 16,
    lr: float = 1e-4,
    macro_weight: float = 0.8
):
    print("=" * 80)
    print("  HIERARCHICAL 2-STAGE EPIGRAPHICAL PALEOGRAPHY TRAINING ENGINE")
    print("  Joint Optimization: Macro-Era (3 Classes) + Micro-Dynasty (10 Classes)")
    print("=" * 80)

    device, device_name = get_optimal_device()
    print(f"[*] Target Compute Device: {device_name}")

    os.makedirs(output_dir, exist_ok=True)

    # 1. Load Hierarchical Dataset (with synthetic crops & CLAHE)
    full_dataset = AncientKannadaPyTorchDataset(
        root_dir=data_dir,
        is_training=True,
        include_synthetic=True
    )
    total_len = len(full_dataset)
    train_size = int(0.80 * total_len)
    val_size = int(0.10 * total_len)
    test_size = total_len - train_size - val_size

    generator = torch.Generator().manual_seed(42)
    train_ds, val_ds, test_ds = random_split(
        full_dataset, [train_size, val_size, test_size], generator=generator
    )

    print(f"[*] Dataset Partitions: Train={len(train_ds)}, Val={len(val_ds)}, Test={len(test_ds)} (Total={total_len})")

    train_loader = DataLoader(train_ds, batch_size=batch_size, shuffle=True, drop_last=True)
    val_loader = DataLoader(val_ds, batch_size=batch_size, shuffle=False)
    test_loader = DataLoader(test_ds, batch_size=batch_size, shuffle=False)

    # 2. Instantiate Hierarchical Model
    model = HierarchicalCNNViT(
        num_micro_classes=10,
        num_macro_classes=3,
        embed_dim=256,
        num_transformer_layers=2,
        pretrained=False
    ).to(device)

    optimizer = torch.optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-2)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs, eta_min=1e-6)

    micro_criterion = nn.CrossEntropyLoss(label_smoothing=0.05)
    macro_criterion = nn.CrossEntropyLoss()

    best_val_acc = 0.0
    checkpoint_path = os.path.join(output_dir, "hierarchical_cnn_vit_best.pth")
    history = []

    # 3. Training Loop
    start_time = time.time()
    for epoch in range(1, epochs + 1):
        model.train()
        running_loss = 0.0
        correct_micro = 0
        correct_macro = 0
        total_train = 0

        for imgs, micro_labels, macro_labels in train_loader:
            imgs = imgs.to(device)
            micro_labels = micro_labels.to(device)
            macro_labels = macro_labels.to(device)

            optimizer.zero_grad()
            micro_logits, macro_logits = model(imgs)

            loss_micro = micro_criterion(micro_logits, micro_labels)
            loss_macro = macro_criterion(macro_logits, macro_labels)
            loss = loss_micro + macro_weight * loss_macro

            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.5)
            optimizer.step()

            running_loss += loss.item() * imgs.size(0)
            preds_micro = micro_logits.argmax(dim=-1)
            preds_macro = macro_logits.argmax(dim=-1)
            correct_micro += (preds_micro == micro_labels).sum().item()
            correct_macro += (preds_macro == macro_labels).sum().item()
            total_train += imgs.size(0)

        scheduler.step()
        train_loss = running_loss / total_train
        train_micro_acc = (correct_micro / total_train) * 100
        train_macro_acc = (correct_macro / total_train) * 100

        # Validation
        model.eval()
        val_micro_corr = 0
        val_macro_corr = 0
        val_total = 0
        with torch.no_grad():
            for imgs, micro_labels, macro_labels in val_loader:
                imgs = imgs.to(device)
                micro_labels = micro_labels.to(device)
                macro_labels = macro_labels.to(device)
                micro_logits, macro_logits = model(imgs)

                preds_micro = micro_logits.argmax(dim=-1)
                preds_macro = macro_logits.argmax(dim=-1)
                val_micro_corr += (preds_micro == micro_labels).sum().item()
                val_macro_corr += (preds_macro == macro_labels).sum().item()
                val_total += imgs.size(0)

        val_micro_acc = (val_micro_corr / val_total) * 100
        val_macro_acc = (val_macro_corr / val_total) * 100

        print(
            f"Epoch [{epoch:02d}/{epochs:02d}] "
            f"Train Loss: {train_loss:.4f} | "
            f"Train Micro: {train_micro_acc:.1f}% Macro: {train_macro_acc:.1f}% | "
            f"Val Micro: {val_micro_acc:.1f}% Macro: {val_macro_acc:.1f}%"
        )

        history.append({
            "epoch": epoch,
            "train_loss": round(train_loss, 4),
            "train_micro_acc": round(train_micro_acc, 2),
            "train_macro_acc": round(train_macro_acc, 2),
            "val_micro_acc": round(val_micro_acc, 2),
            "val_macro_acc": round(val_macro_acc, 2)
        })

        if val_micro_acc > best_val_acc:
            best_val_acc = val_micro_acc
            torch.save({
                "model_state_dict": model.state_dict(),
                "val_micro_acc": val_micro_acc,
                "val_macro_acc": val_macro_acc,
                "epoch": epoch,
                "classes": AncientKannadaDatasetCore.CLASS_NAMES,
                "macro_classes": AncientKannadaDatasetCore.MACRO_NAMES
            }, checkpoint_path)

    # 4. Final Evaluation on Holdout Test Set
    print("\n[*] Evaluating Best Checkpoint on Test Set...")
    checkpoint = torch.load(checkpoint_path, map_location=device)
    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()

    test_micro_corr = 0
    test_macro_corr = 0
    class_correct = {c: 0 for c in range(10)}
    class_total = {c: 0 for c in range(10)}

    with torch.no_grad():
        for imgs, micro_labels, macro_labels in test_loader:
            imgs = imgs.to(device)
            micro_labels = micro_labels.to(device)
            macro_labels = macro_labels.to(device)
            micro_logits, macro_logits = model(imgs)

            preds_micro = micro_logits.argmax(dim=-1)
            preds_macro = macro_logits.argmax(dim=-1)

            test_micro_corr += (preds_micro == micro_labels).sum().item()
            test_macro_corr += (preds_macro == macro_labels).sum().item()

            for p, l in zip(preds_micro, micro_labels):
                class_total[l.item()] += 1
                if p == l:
                    class_correct[l.item()] += 1

    final_micro_acc = (test_micro_corr / len(test_ds)) * 100
    final_macro_acc = (test_macro_corr / len(test_ds)) * 100

    print("=" * 80)
    print(f"  FINAL HIERARCHICAL BENCHMARK RESULTS")
    print(f"  Holdout Test Micro-Dynasty Accuracy : {final_micro_acc:.2f}%")
    print(f"  Holdout Test Macro-Era Accuracy     : {final_macro_acc:.2f}%")
    print("=" * 80)

    class_report = {}
    for idx, cname in enumerate(AncientKannadaDatasetCore.CLASS_NAMES):
        tot = class_total[idx]
        cor = class_correct[idx]
        pct = (cor / tot * 100) if tot > 0 else 0.0
        class_report[cname] = {
            "total_test_samples": tot,
            "correct": cor,
            "accuracy_pct": round(pct, 2)
        }
        print(f"  [{cname:20s}] : {cor}/{tot} ({pct:.1f}%)")

    # Persist benchmark results
    results_payload = {
        "architecture": "Hierarchical CNN + Vision Transformer (ViT)",
        "preprocessing": "Texture-Invariant CLAHE & Bilateral Filtering",
        "synthetic_medieval_data_augmented": True,
        "test_micro_accuracy": f"{final_micro_acc:.2f}%",
        "test_macro_accuracy": f"{final_macro_acc:.2f}%",
        "best_val_micro_accuracy": f"{best_val_acc:.2f}%",
        "device": device_name,
        "training_time_seconds": round(time.time() - start_time, 2),
        "class_breakdown": class_report,
        "history": history
    }

    results_path = os.path.join(output_dir, "hierarchical_training_results.json")
    with open(results_path, "w", encoding="utf-8") as f:
        json.dump(results_payload, f, indent=2)

    print(f"[+] Hierarchical benchmark saved to {results_path}")
    print(f"[+] Model checkpoint saved to {checkpoint_path}")


if __name__ == "__main__":
    train_hierarchical_model(epochs=12, batch_size=16)
