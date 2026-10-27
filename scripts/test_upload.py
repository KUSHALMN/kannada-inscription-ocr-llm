import sys
import json
import requests

sys.stdout.reconfigure(encoding='utf-8')

url = "http://127.0.0.1:8000/api/v1/analyze"
file_path = "public/analysis-halmidi-stele.jpg"

print(f"Uploading {file_path} to {url}...")
with open(file_path, "rb") as f:
    files = {"file": ("analysis-halmidi-stele.jpg", f, "image/jpeg")}
    data = {
        "title": "Halmidi Inscription Stele",
        "dynasty": "Kadamba",
        "location": "Halmidi, Hassan"
    }
    response = requests.post(url, files=files, data=data)

print(f"HTTP Status: {response.status_code}")
if response.status_code == 200:
    res = response.json()
    print("Inferred Script:", res.get("inferredScript"))
    print("Inferred Language:", res.get("inferredLanguage"))
    print("Recognized Halegannada:", res.get("transcription", {}).get("recognizedText"))
    print("\nModern Kannada (Hosagannada):", res.get("translation", {}).get("modernKannada"))
    print("\nEnglish Translation:", res.get("translation", {}).get("englishTranslation"))
    print("\nTimings:", json.dumps(res.get("timings"), indent=2))
else:
    print(response.text)
