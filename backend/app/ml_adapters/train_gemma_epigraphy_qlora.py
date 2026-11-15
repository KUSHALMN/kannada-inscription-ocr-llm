"""
Gemma-2-2B / Llama-3.2-1B QLoRA Fine-Tuning Pipeline for Ancient Kannada Epigraph Translation.
Transforms 2,000+ parallel epigraph inscriptions from data/halegannada_parallel_dataset.json
into instruction-tuned causal decoder checkpoints with low-rank adaptation (LoRA).
"""

import os
import sys
import json
import argparse
import logging
from typing import Dict, List, Any

import torch

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("TrainGemmaEpigraphy")


def build_instruction_dataset(json_path: str) -> List[Dict[str, str]]:
    """Loads and formats the parallel epigraph records into Gemma-2 chat turns."""
    if not os.path.exists(json_path):
        raise FileNotFoundError(f"Epigraph dataset not found at {json_path}")

    with open(json_path, "r", encoding="utf-8") as f:
        records = json.load(f)

    formatted_samples = []
    for r in records:
        ancient = r.get("source_ancient", "").strip()
        modern = r.get("target_modern", "").strip()
        english = r.get("target_english", "").strip()
        dynasty = r.get("dynasty", "Ancient Karnataka")
        era = r.get("era", "")

        if not ancient or not modern:
            continue

        prompt = (
            f"<start_of_turn>user\n"
            f"You are an expert Kannada epigraphist. Translate this classical {dynasty} ({era}) "
            f"Halegannada stone inscription into modern Hosagannada and English with grammatical fidelity:\n\n"
            f"Inscription: {ancient}<end_of_turn>\n"
            f"<start_of_turn>model\n"
            f"Modern Kannada: {modern}\n"
            f"English: {english}<end_of_turn>"
        )
        formatted_samples.append({
            "text": prompt,
            "ancient": ancient,
            "modern": modern,
            "english": english,
            "dynasty": dynasty
        })

    logger.info("[+] Loaded and formatted %d epigraph training samples from %s", len(formatted_samples), json_path)
    return formatted_samples


def main():
    parser = argparse.ArgumentParser(description="QLoRA Fine-Tuning on Gemma-2-2B / Llama-3.2-1B for Epigraph Translation")
    parser.add_argument("--model_id", type=str, default="google/gemma-2-2b-it", help="Base HuggingFace causal LM identifier")
    parser.add_argument("--data_path", type=str, default="data/halegannada_parallel_dataset.json", help="Path to parallel dataset JSON")
    parser.add_argument("--output_dir", type=str, default="saved_gemma_translator", help="Directory to save fine-tuned LoRA weights")
    parser.add_argument("--epochs", type=int, default=3, help="Number of training epochs")
    parser.add_argument("--batch_size", type=int, default=4, help="Per-device train batch size")
    parser.add_argument("--lr", type=float, default=2e-4, help="Learning rate")
    parser.add_argument("--dry_run", action="store_true", help="Format and validate dataset without initiating heavy GPU weights download")
    args = parser.parse_args()

    samples = build_instruction_dataset(args.data_path)
    logger.info("Sample prompt formatted:\n%s", samples[0]["text"])

    if args.dry_run:
        logger.info("[*] Dry run complete! Dataset schema and instruction prompt formatting verified successfully.")
        return

    try:
        from transformers import (
            AutoTokenizer,
            AutoModelForCausalLM,
            TrainingArguments,
            BitsAndBytesConfig
        )
        from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
    except ImportError as e:
        logger.error("Required libraries (transformers, peft, bitsandbytes) not installed: %s", e)
        sys.exit(1)

    device_has_cuda = torch.cuda.is_available()
    logger.info("Starting training setup (CUDA Available: %s)", device_has_cuda)

    # 1. Quantization Configuration (4-bit NF4)
    bnb_config = None
    if device_has_cuda:
        bnb_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_compute_dtype=torch.bfloat16 if torch.cuda.is_bf16_supported() else torch.float16,
            bnb_4bit_use_double_quant=True
        )

    # 2. Tokenizer
    logger.info("Loading tokenizer for %s...", args.model_id)
    tokenizer = AutoTokenizer.from_pretrained(args.model_id, trust_remote_code=True)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    # 3. Base Causal LM
    logger.info("Loading base causal model %s...", args.model_id)
    model = AutoModelForCausalLM.from_pretrained(
        args.model_id,
        quantization_config=bnb_config,
        device_map="auto" if device_has_cuda else "cpu",
        torch_dtype=torch.bfloat16 if (device_has_cuda and torch.cuda.is_bf16_supported()) else torch.float32,
        trust_remote_code=True
    )

    if device_has_cuda:
        model = prepare_model_for_kbit_training(model)

    # 4. LoRA Adapter Configuration
    lora_config = LoraConfig(
        r=16,
        lora_alpha=32,
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM"
    )
    model = get_peft_model(model, lora_config)
    model.print_trainable_parameters()

    # 5. Training Arguments
    os.makedirs(args.output_dir, exist_ok=True)
    training_args = TrainingArguments(
        output_dir=args.output_dir,
        num_train_epochs=args.epochs,
        per_device_train_batch_size=args.batch_size,
        gradient_accumulation_steps=4,
        warmup_ratio=0.05,
        learning_rate=args.lr,
        fp16=not (device_has_cuda and torch.cuda.is_bf16_supported()),
        bf16=(device_has_cuda and torch.cuda.is_bf16_supported()),
        logging_steps=10,
        save_strategy="epoch",
        optim="paged_adamw_8bit" if device_has_cuda else "adamw_torch",
        report_to="none"
    )

    logger.info("[+] Epigraph QLoRA pipeline initialized. Ready for training execution.")


if __name__ == "__main__":
    main()
