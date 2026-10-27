import sys
import json
import requests

sys.stdout.reconfigure(encoding='utf-8')

url = "http://127.0.0.1:8000/api/v1/analyze"
file_path = r"C:\Users\Kushal M N\.gemini\antigravity-ide\brain\3035b9d9-328a-498f-8c52-93008037b849\.user_uploaded\media_1793109059191.jpg"

print(f"Uploading user stone inscription {file_path} to {url}...")
with open(file_path, "rb") as f:
    files = {"file": ("user_stone_inscription.jpg", f, "image/jpeg")}
    data = {
        "title": "Ancient Kannada Epigraph Stone Slab",
        "dynasty": "Kadamba",
        "location": "Banavasi, Uttara Kannada"
    }
    response = requests.post(url, files=files, data=data)

print(f"HTTP Status: {response.status_code}")
if response.status_code == 200:
    res = response.json()
    print("\n--- INFERRED EPIGRAPHICAL METADATA ---")
    print("Inferred Script  :", res.get("inferredScript"))
    print("Inferred Language:", res.get("inferredLanguage"))
    print("Image URL        :", res.get("imageUrl"))
    print("Relief Image URL :", res.get("reliefImageUrl"))
    print("Rubbing Image URL:", res.get("rubbingImageUrl"))
    
    transcription = res.get("transcription", {})
    lines = transcription.get("lines", [])
    print(f"\n--- DETECTED STONE CARVED LINES ({len(lines)} lines) ---")
    for l in lines:
        bbox = l.get("boundingBox", {})
        print(f"  Line {l.get('lineNumber')}: Y={bbox.get('y')}%, Height={bbox.get('height')}%")
        print(f"    Text: {l.get('originalText')}")
        print(f"    Hosagannada: {l.get('modernKannadaLine')}")

    print("\n--- SYNTHESIZED TRANSLATIONS ---")
    print("Modern Kannada (Hosagannada):\n", res.get("translation", {}).get("modernKannada"))
    print("\nEnglish Translation:\n", res.get("translation", {}).get("englishTranslation"))
    print("\nTimings:\n", json.dumps(res.get("timings"), indent=2))
else:
    print(response.text)
