"""
Interactive Ancient Kannada (Halegannada) Translation CLI & Tester
Translates Halegannada epigraph text or images into:
1. Hosagannada (ಹೊಸಗನ್ನಡ - Modern Contemporary Kannada)
2. English Translation
3. Dynasty & Kingdom Attribution (via Proposed CNN+ViT)
4. Historical Inscriptional Glossary

Powered by your NVIDIA GeForce RTX 5050 GPU!
"""

import os
import sys
import argparse
import warnings
import logging

warnings.filterwarnings("ignore")
logging.getLogger("transformers").setLevel(logging.ERROR)
logging.getLogger("torch").setLevel(logging.ERROR)
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

from PIL import Image

# Fix Windows console UTF-8 output
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

from backend.app.ml_adapters.neural_adapters import NeuralTranslator, NeuralScriptClassifier
from backend.app.schemas import ScriptClassId, SourceLanguageId


def translate_text(halegannada_text: str, script_hint: str = "kadamba"):
    print("=" * 75)
    print("  ANCIENT KANNADA NEURAL TRANSLATION ENGINE (RTX 5050 ACCELERATED)")
    print("=" * 75)
    print(f"[*] Input Halegannada Text: {halegannada_text}")

    translator = NeuralTranslator()
    try:
        script_enum = ScriptClassId(script_hint)
    except ValueError:
        script_enum = ScriptClassId.KADAMBA

    result = translator.translate(
        text=halegannada_text,
        script=script_enum,
        language=SourceLanguageId.PURVADA_HALEGANNADA
    )

    print("\n" + "-" * 75)
    print("  TRANSLATION RESULTS")
    print("-" * 75)
    print(f"  [ಹೊಸಗನ್ನಡ (Modern Kannada)]:")
    print(f"  👉 {result.modern_kannada}\n")
    print(f"  [English Translation]:")
    print(f"  👉 {result.english_translation}\n")
    print(f"  [Confidence Score]       : {result.language_confidence * 100:.1f}%")
    print(f"  [Linguistic/Epoch Notes] : {result.stylistic_notes}")

    if result.glossary:
        print("\n" + "-" * 75)
        print("  ARCHAIC INSCRIPTIONAL GLOSSARY")
        print("-" * 75)
        for item in result.glossary:
            print(f"  • {item.term} ({item.iast})")
            print(f"    - Kannada: {item.modern_kannada_equivalent}")
            print(f"    - English: {item.english_definition}")
    print("=" * 75)


def translate_image(image_path: str):
    print("=" * 75)
    print("  EPIGRAPHICAL IMAGE ANALYSIS & TRANSLATION (RTX 5050)")
    print("=" * 75)
    if not os.path.exists(image_path):
        print(f"[!] Error: Image file '{image_path}' not found.")
        return

    print(f"[*] Analyzing Inscription Rubbing: {image_path}")
    img = Image.open(image_path).convert("RGB")

    classifier = NeuralScriptClassifier()
    prediction = classifier.predict([img])

    print(f"[+] Predicted Historical Script : {prediction.script_class.value.upper()}")
    print(f"[+] Classification Confidence   : {prediction.confidence * 100:.2f}%")

    # Sample canonical lines for this script
    from backend.app.services.analysis_service import AnalysisService
    profile = AnalysisService.KINGDOM_PROFILES.get(prediction.script_class, AnalysisService.KINGDOM_PROFILES[ScriptClassId.KADAMBA])

    print(f"[+] Dynasty Attribution         : {profile.get('dynasty', '')}")
    print(f"[+] Reigning Monarch            : {profile.get('ruler', '')}")
    print(f"[+] Historical Era              : {profile.get('approximate_date', '')}")

    canonical_lines = profile.get("canonical_lines", [])
    if canonical_lines:
        first_line = canonical_lines[0][0]
        translate_text(first_line, script_hint=prediction.script_class.value)


def interactive_mode():
    print("=" * 75)
    print("  ANCIENT KANNADA INTERACTIVE TRANSLATOR")
    print("  Trained Neural Models Active on NVIDIA GeForce RTX 5050")
    print("=" * 75)
    print("Options:")
    print("  1. Halmidi Inscription (ಹಲ್ಮಿಡಿ ಶಾಸನ - 5th C. CE)")
    print("  2. Kappe Arabhatta Badami Inscription (ಕಪ್ಪೆ ಅರಭಟ್ಟನ ಶಾಸನ - 7th C. CE)")
    print("  3. Kavirajamarga Rashtrakuta Verse (ಕವಿರಾಜಮಾರ್ಗ - 9th C. CE)")
    print("  4. Atakur Inscription Ganga Dynasty (ಆತಕೂರು ಶಾಸನ - 10th C. CE)")
    print("  5. Belur Hoysala Inscription (ಬೇಲೂರು ಹೊಯ್ಸಳ ಶಾಸನ - 12th C. CE)")
    print("  6. Custom Halegannada text input")
    print("=" * 75)

    samples = {
        "1": ("ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬಪನ್ ಕಾಗುಸ್ಥಭಟ್ಟೋರನ್ ಆಳೆ", "kadamba"),
        "2": ("ಸಾಧುಗೆ ಸಾಧು ಮಾಧುರ್ಯಂಗೆ ಮಾಧುರ್ಯಂ ಬಾಧಿಪ್ಪ ಕಲಿಗೆ ಕಲಿಯುಗ ವಿಪರೀತನ್", "badami_chalukya"),
        "3": ("ಕಾವೇರಿಯಿಂದಂ ಗೋದಾವರಿವರಮಿರ್ಪ ನಾಡದಾ ಕನ್ನಡದೊಳ್ ಭಾವಿಸಿದ ಜನಪದಂ", "rashtrakuta"),
        "4": ("ಗಂಗರ ಬಂಟನ್ ಬೂತುಗಂ ಚೋಳನಂ ಕಾಳಗದೊಳ್ ಇರಿದು ಕೊಂದನ್", "rashtrakuta"),
        "5": ("ಶ್ರೀ ಬಿಟ್ಟಿದೇವ ಮಹಾರಾಯರ್ ಬೇಲೂರಿನೊಳ್ ಶ್ರೀ ವಿಜಯನಾರಾಯಣ ದೇವರಂ ಪ್ರತಿಷ್ಠೆ ಗೆಯ್ದು", "hoysala"),
    }

    choice = input("\nSelect sample (1-6) or press Enter for default [1]: ").strip() or "1"
    if choice in samples:
        text, script = samples[choice]
        translate_text(text, script_hint=script)
    elif choice == "6":
        custom_text = input("Enter Halegannada text: ").strip()
        if custom_text:
            translate_text(custom_text)
    else:
        text, script = samples["1"]
        translate_text(text, script_hint=script)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Translate Ancient Halegannada Text or Image")
    parser.add_argument("text", nargs="?", help="Halegannada text to translate")
    parser.add_argument("--image", "-i", help="Path to rubbing or inscription image")
    parser.add_argument("--script", "-s", default="kadamba", help="Script dynasty hint")
    args = parser.parse_args()

    if args.image:
        translate_image(args.image)
    elif args.text:
        translate_text(args.text, script_hint=args.script)
    else:
        interactive_mode()
