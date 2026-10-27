import json
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open("data/halegannada_parallel_dataset.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Total dataset entries: {len(data)}")
for i, item in enumerate(data[:8]):
    print(f"\n--- Entry {i+1} [{item.get('dynasty', '')}] ---")
    print(f"Ancient: {item.get('source_ancient')}")
    print(f"Modern : {item.get('target_modern')}")
    print(f"English: {item.get('target_english')}")
