"""
End-to-End Ancient Kannada Multimodal Epigraphical Translation Engine
Fine-Tuning Script with LoRA / Seq2Seq Architecture
Outputs structured JSON with Script, Kingdom, Ruler, Halegannada, Hosagannada, and English.
Includes live tqdm progress bar for real-time monitoring.
"""

import os
import sys
import json
import time
from pathlib import Path

import torch
from torch.utils.data import Dataset, DataLoader
from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
    DataCollatorForSeq2Seq,
    get_cosine_schedule_with_warmup
)
from peft import LoraConfig, get_peft_model, TaskType
from tqdm import tqdm

# Windows UTF-8 console output fix
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")


def get_safe_device():
    if torch.cuda.is_available():
        try:
            t = torch.zeros(1, 1, device="cuda")
            _ = t + 1
            torch.cuda.synchronize()
            gpu_name = torch.cuda.get_device_name(0)
            return torch.device("cuda:0"), f"CUDA ({gpu_name})"
        except Exception:
            return torch.device("cpu"), f"CPU Multi-thread ({os.cpu_count()} threads)"
    return torch.device("cpu"), f"CPU ({os.cpu_count()} threads)"


class EpigraphParallelDataset(Dataset):
    """
    Dataset loader for Halegannada epigraph records.
    Produces structured JSON targets matching results1.docx.
    """
    def __init__(self, json_path: str, tokenizer, max_input_len=128, max_target_len=256):
        self.tokenizer = tokenizer
        self.max_input_len = max_input_len
        self.max_target_len = max_target_len

        with open(json_path, "r", encoding="utf-8") as f:
            self.raw_data = json.load(f)

        self.samples = []
        for item in self.raw_data:
            ancient = item.get("source_ancient", "")
            modern = item.get("target_modern", "")
            english = item.get("target_english", "")
            dynasty = item.get("dynasty", "Unknown Dynasty")
            era = item.get("era", "Historical")
            title = item.get("source_title", "Inscription")

            # Input prompt
            input_text = f"Analyze and translate ancient Kannada epigraph: {ancient}"

            # Structured target output
            target_obj = {
                "kingdom": dynasty,
                "era": era,
                "source": title,
                "halegannada": ancient,
                "hosagannada": modern,
                "english": english
            }
            target_text = json.dumps(target_obj, ensure_ascii=False)
            self.samples.append((input_text, target_text))

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        input_text, target_text = self.samples[idx]

        model_inputs = self.tokenizer(
            input_text,
            max_length=self.max_input_len,
            padding="max_length",
            truncation=True,
            return_tensors="pt"
        )
        labels = self.tokenizer(
            target_text,
            max_length=self.max_target_len,
            padding="max_length",
            truncation=True,
            return_tensors="pt"
        )

        labels_ids = labels["input_ids"].squeeze(0)
        labels_ids[labels_ids == self.tokenizer.pad_token_id] = -100

        return {
            "input_ids": model_inputs["input_ids"].squeeze(0),
            "attention_mask": model_inputs["attention_mask"].squeeze(0),
            "labels": labels_ids
        }


def train_epigraph_translator(
    data_path: str = "data/halegannada_parallel_dataset.json",
    base_model_name: str = "google/mt5-small",
    output_dir: str = "./saved_multimodal_translator",
    epochs: int = 5,
    batch_size: int = 4,
    lr: float = 3e-4,
    use_lora: bool = True
):
    print("=" * 75)
    print("  ANCIENT KANNADA MULTIMODAL TRANSLATOR FINE-TUNING")
    print(f"  Base Model: {base_model_name} | LoRA: {use_lora}")
    print("=" * 75)

    device, device_name = get_safe_device()
    print(f"[*] Compute Device: {device_name}")

    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Dataset not found at {data_path}")

    print(f"[*] Loading Tokenizer and Base Model: {base_model_name}...")
    tokenizer = AutoTokenizer.from_pretrained(base_model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(base_model_name)

    if use_lora:
        print("[*] Injecting Parameter-Efficient LoRA Adapters...")
        peft_config = LoraConfig(
            task_type=TaskType.SEQ_2_SEQ_LM,
            inference_mode=False,
            r=8,
            lora_alpha=32,
            lora_dropout=0.1,
            target_modules=["q", "v"]
        )
        model = get_peft_model(model, peft_config)
        model.print_trainable_parameters()

    model.to(device)

    dataset = EpigraphParallelDataset(data_path, tokenizer)
    total_len = len(dataset)
    train_len = int(0.9 * total_len)
    val_len = total_len - train_len
    train_data, val_data = torch.utils.data.random_split(dataset, [train_len, val_len])

    print(f"[*] Dataset split -> Train: {len(train_data)} | Validation: {len(val_data)}")

    train_loader = DataLoader(train_data, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_data, batch_size=batch_size, shuffle=False)

    total_steps = len(train_loader) * epochs
    optimizer = torch.optim.AdamW(model.parameters(), lr=lr, weight_decay=0.01)
    scheduler = get_cosine_schedule_with_warmup(optimizer, num_warmup_steps=int(0.1 * total_steps), num_training_steps=total_steps)

    os.makedirs(output_dir, exist_ok=True)
    best_val_loss = float("inf")

    print("\nStarting Training with Live Progress Bar...\n")
    start_time = time.time()

    for epoch in range(1, epochs + 1):
        model.train()
        total_train_loss = 0.0

        pbar = tqdm(
            train_loader,
            desc=f"Epoch [{epoch:02d}/{epochs:02d}]",
            unit="batch",
            dynamic_ncols=True,
            bar_format="{l_bar}{bar:25}{r_bar}"
        )

        for step, batch in enumerate(pbar, 1):
            input_ids = batch["input_ids"].to(device)
            attention_mask = batch["attention_mask"].to(device)
            labels = batch["labels"].to(device)

            optimizer.zero_grad()
            outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
            loss = outputs.loss

            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            optimizer.step()
            scheduler.step()

            total_train_loss += loss.item()
            running_loss = total_train_loss / step

            pbar.set_postfix({
                "loss": f"{running_loss:.4f}",
                "lr": f"{optimizer.param_groups[0]['lr']:.2e}"
            })

        # Validation
        model.eval()
        total_val_loss = 0.0
        with torch.no_grad():
            for batch in val_loader:
                input_ids = batch["input_ids"].to(device)
                attention_mask = batch["attention_mask"].to(device)
                labels = batch["labels"].to(device)
                outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
                total_val_loss += outputs.loss.item()

        avg_val_loss = total_val_loss / max(len(val_loader), 1)
        tqdm.write(f"  --> Epoch {epoch:02d} Finished: Train Loss={running_loss:.4f}, Val Loss={avg_val_loss:.4f}")

        if avg_val_loss < best_val_loss:
            best_val_loss = avg_val_loss
            tqdm.write(f"  --> Saving Best Model Checkpoint to {output_dir}...")
            model.save_pretrained(output_dir)
            tokenizer.save_pretrained(output_dir)

    elapsed = time.time() - start_time
    print("\n" + "=" * 75)
    print(f"[+] Multimodal Translator Training Complete in {elapsed:.1f}s ({elapsed/60:.2f} min)")
    print(f"[+] Best Validation Loss: {best_val_loss:.4f}")
    print(f"[+] Model saved to: {os.path.abspath(output_dir)}")
    print("=" * 75)


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Train Epigraph Multimodal Translator")
    parser.add_argument("--epochs", type=int, default=3, help="Training epochs")
    parser.add_argument("--batch-size", type=int, default=4, help="Batch size")
    parser.add_argument("--lr", type=float, default=3e-4, help="Learning rate")
    args = parser.parse_args()

    train_epigraph_translator(epochs=args.epochs, batch_size=args.batch_size, lr=args.lr)
