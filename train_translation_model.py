"""
Train an Ancient Kannada (Halegannada) -> Modern Current Kannada (Hosagannada) & English Translation Model.
Uses Hugging Face Transformers + PyTorch with Seq2Seq / mT5 architecture.
Can be executed locally (if PyTorch is installed) or run on Google Colab (Free GPU T4).
"""

import os
import sys

# Windows UTF-8 stdout fix
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

def check_dependencies():
    missing = []
    for pkg in ["torch", "transformers", "datasets", "accelerate"]:
        try:
            __import__(pkg)
        except ImportError:
            missing.append(pkg)
    if missing:
        print("[!] Missing required training packages: " + ", ".join(missing))
        print("To install, run:")
        print(f"  pip install {' '.join(missing)}")
        print("\nTip: For fast free GPU training, open Google Colab and run:")
        print("  !pip install torch transformers datasets accelerate sentencepiece")
        return False
    return True


def train(data_path="data/halegannada_parallel_dataset.json", model_name="google/mt5-small", epochs=10, batch_size=4):
    if not check_dependencies():
        return

    import torch
    from datasets import load_dataset
    from transformers import (
        AutoTokenizer,
        AutoModelForSeq2SeqLM,
        DataCollatorForSeq2Seq,
        Seq2SeqTrainer,
        Seq2SeqTrainingArguments,
    )

    print(f"[*] Loading dataset from {data_path}...")
    dataset = load_dataset("json", data_files=data_path)["train"]
    dataset = dataset.train_test_split(test_size=0.1, seed=42)
    print(f"[*] Train samples: {len(dataset['train'])}, Eval samples: {len(dataset['test'])}")

    print(f"[*] Loading Tokenizer and Base Model: {model_name}...")
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

    def preprocess_fn(batch):
        # Prefix guiding the translation task
        inputs = ["translate Halegannada to Hosagannada: " + text for text in batch["source_ancient"]]
        targets = batch["target_modern"]

        model_inputs = tokenizer(inputs, max_length=128, truncation=True, padding="max_length")
        labels = tokenizer(targets, max_length=128, truncation=True, padding="max_length")

        # Replace padding token id with -100 so it is ignored in loss calculation
        labels["input_ids"] = [
            [(l if l != tokenizer.pad_token_id else -100) for l in label]
            for label in labels["input_ids"]
        ]
        model_inputs["labels"] = labels["input_ids"]
        return model_inputs

    print("[*] Tokenizing dataset...")
    tokenized_train = dataset["train"].map(preprocess_fn, batched=True, remove_columns=dataset["train"].column_names)
    tokenized_eval = dataset["test"].map(preprocess_fn, batched=True, remove_columns=dataset["test"].column_names)

    output_dir = "./saved_halegannada_translator"
    training_args = Seq2SeqTrainingArguments(
        output_dir=output_dir,
        eval_strategy="epoch",
        save_strategy="epoch",
        learning_rate=3e-4,
        per_device_train_batch_size=batch_size,
        per_device_eval_batch_size=batch_size,
        weight_decay=0.01,
        save_total_limit=2,
        num_train_epochs=epochs,
        predict_with_generate=True,
        fp16=torch.cuda.is_available(),
        logging_steps=20,
        report_to="none"
    )

    trainer = Seq2SeqTrainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_train,
        eval_dataset=tokenized_eval,
        tokenizer=tokenizer,
        data_collator=DataCollatorForSeq2Seq(tokenizer, model=model),
    )

    print("[*] Commencing training...")
    trainer.train()

    print(f"[+] Model successfully trained and saved to {output_dir}")
    model.save_pretrained(output_dir)
    tokenizer.save_pretrained(output_dir)


if __name__ == "__main__":
    data_file = sys.argv[1] if len(sys.argv) > 1 else "data/halegannada_parallel_dataset.json"
    train(data_path=data_file)
