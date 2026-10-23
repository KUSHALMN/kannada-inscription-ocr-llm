# Kannada Heritage AI — Epigraphy Backend (ಕನ್ನಡ ಶಾಸನ ತಂತ್ರಾಂಶ ಬ್ಯಾಕೆಂಡ್)

Institutional-grade computational paleography and epigraphical translation workbench backend engineered with Python 3.11+, FastAPI, and Pydantic v2.

---

## 🏛️ System Architecture

This backend serves the Kannada Heritage AI workbench, faithfully executing the **epigraphical 4-pillar separation**:
1. **Script Class (ಲಿಪಿ)**: 10 chronological epochs from Ashokan Brahmi (3rd C. BCE) to Modern Kannada.
2. **Source Language (ಮೂಲ ಭಾಷೆ)**: Historical linguistic dialect (Prakrit, Sanskrit, Purvada Halegannada, Classical Halegannada, Nadugannada, Hosagannada).
3. **Transcription (ಮೂಲ ಪಾಠ)**: Character detection, bounding boxes, line segmentation, and scholarly IAST transliteration.
4. **Translation (ಅನುವಾದ)**: Modern Standard Kannada (*Hosagannada*) translation, English translation, and archaic lexical glossary.

---

## 🚀 Setup & Local Launch

### Prerequisites
- Python 3.11+
- Virtual environment (`venv` or `conda`)

### Installation
```bash
cd backend
python -m venv venv

# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

### Running with Makefile or Uvicorn
```bash
# Start development server with auto-reload:
make dev
# Or directly with uvicorn:
python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

Interactive documentation:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **Health Check & GPU Telemetry**: `http://localhost:8000/api/v1/health`

---

## 🧪 Testing, Linting & Maintenance

```bash
# Run entire test suite (67+ unit, integration, and async tests):
make test

# Run JSON Schema contract tests:
make contract-test

# Lint with ruff & type-check with mypy:
make lint

# Auto-format codebase:
make format

# Clean test caches and temporary artifacts:
make clean
```

---

## 📡 API Reference & cURL Examples for Every Endpoint

All requests automatically accept and return `X-Request-ID` correlation headers for distributed tracing.

### 1. Health & GPU Telemetry
Inspects CUDA availability, device name, VRAM allocations, and loaded adapter flags:
```bash
curl -X GET "http://localhost:8000/api/v1/health" \
  -H "Accept: application/json"
```

### 2. Paleographical Scripts (10 Historical Eras)
List all 10 script eras:
```bash
curl -X GET "http://localhost:8000/api/v1/scripts" \
  -H "Accept: application/json"
```

Get detailed script metadata for a specific era:
```bash
curl -X GET "http://localhost:8000/api/v1/scripts/kadamba" \
  -H "Accept: application/json"
```

### 3. Historical Languages (6 Epigraphical Dialects)
List all historical languages:
```bash
curl -X GET "http://localhost:8000/api/v1/languages" \
  -H "Accept: application/json"
```

Get detailed language metadata:
```bash
curl -X GET "http://localhost:8000/api/v1/languages/purvada_halegannada" \
  -H "Accept: application/json"
```

### 4. Inscription Catalog Search & Filtering
List inscriptions with multi-criteria filters:
```bash
curl -X GET "http://localhost:8000/api/v1/inscriptions?scriptClass=kadamba&sourceLanguage=purvada_halegannada&substrate=granite&reviewStatus=verified&sortBy=date_asc" \
  -H "Accept: application/json"
```

Free-text scholarly search across titles, Kannada text, rulers, and glossary terms:
```bash
curl -X GET "http://localhost:8000/api/v1/inscriptions?searchQuery=Halmidi" \
  -H "Accept: application/json"
```

### 5. Inscription Detail & Editorial Updates
Retrieve full record:
```bash
curl -X GET "http://localhost:8000/api/v1/inscriptions/ins-halmidi-001" \
  -H "Accept: application/json"
```

Update review status or transcription notes:
```bash
curl -X PUT "http://localhost:8000/api/v1/inscriptions/ins-halmidi-001" \
  -H "Content-Type: application/json" \
  -d '{
    "reviewStatus": "verified"
  }'
```

### 6. Rubbing Analysis — Synchronous Execution
Validates Pillow magic bytes and executes the 6-stage pipeline immediately via threadpool:
```bash
curl -X POST "http://localhost:8000/api/v1/analyze" \
  -F "file=@rubbing.jpg;type=image/jpeg" \
  -F "title=Halmidi Slab Rubbing" \
  -F "location=Halmidi, Hassan" \
  -F "dynasty=Kadambas of Banavasi" \
  -F "knownScript=kadamba" \
  -F "knownLanguage=purvada_halegannada"
```

### 7. Rubbing Analysis — Asynchronous Execution (GPU Queue)
Enqueues the job onto the single-worker queue (prevents concurrent GPU collisions) and immediately returns `{ jobId, status: "queued" }`:
```bash
curl -X POST "http://localhost:8000/api/v1/analyze?async=true" \
  -F "file=@rubbing.jpg;type=image/jpeg" \
  -F "title=Badami Rock Inscription" \
  -F "location=Badami, Bagalkot"
```

### 8. Asynchronous Job Polling
Polls real-time progress (0–100), currentStep, and the full decipherment result when completed:
```bash
curl -X GET "http://localhost:8000/api/v1/jobs/job-65c9dccf4885" \
  -H "Accept: application/json"
```

### 9. Convert Completed Job to Permanent Catalog Record
Converts a finished or partial analysis job into an `InscriptionRecord` with `reviewStatus="pending_verification"`:
```bash
curl -X POST "http://localhost:8000/api/v1/analyze/job-65c9dccf4885/save" \
  -H "Accept: application/json"
```

### 10. Research Activity Feed & Archaic Lexicon
```bash
curl -X GET "http://localhost:8000/api/v1/activity?limit=10"
curl -X GET "http://localhost:8000/api/v1/lexicon"
```

---

## 🔒 Operational Safeguards

- **Request ID Tracking**: All incoming requests receive or generate an `X-Request-ID` header for end-to-end tracing across services.
- **Rate Limiting**: The `/analyze` endpoint enforces an in-memory sliding window rate limit (`RATE_LIMIT_ANALYZE_PER_MINUTE=60`). Exceeding it returns `429 Too Many Requests` with a `Retry-After` header.
- **Pillow Magic Bytes Validation**: Uploaded files are decoded via binary headers and pixel integrity (`img.load()`), rejecting spoofed MIME types.
- **Storage Cleanup**: `StorageCleanupService` automatically purges uploads older than `UPLOAD_RETENTION_DAYS` (default 7 days).
- **Restart Survival**: Jobs are atomically persisted to `backend/storage/jobs/{jobId}.json`, enabling them to survive server restarts.

---

## 🧠 Training Your Own ML Models Locally (Zero External API Keys)

You do **not** need proprietary paid external APIs (OpenAI, Anthropic, Gemini). This system was built using the **Adapter Pattern** specifically so you can train and run open-source models completely on your own machine.

### Model Architecture Roadmap

```
Raw Rubbing Image
       │
       ▼
[1. Preprocessor] ──> OpenCV / Albumentations (CLAHE, Otsu Binarization, Deskewing)
       │
       ▼
[2. Segmenter]    ──> YOLOv8-Detection / UNet (detects Line and Akshara Bounding Boxes)
       │
       ▼
[3. Classifier]   ──> ResNet-50 / EfficientNet (Classifies among 10 Script Eras)
       │
       ▼
[4. Recognizer]   ──> TrOCR / CRNN (Vision Transformer decoding Akshara crops to Kannada Unicode)
       │
       ▼
[5. Transliterator]─> Deterministic Rule-Based Akshara Algorithm (Kannada Unicode -> IAST)
       │
       ▼
[6. Translator]   ──> Local LLM / Seq2Seq (Fine-tuned IndicBART or Qwen2.5-7B / Llama-3-8B via LoRA)
```

### How to Train Each Component Locally

1. **Step 1: Character Segmentation (YOLOv8)**:
   - Tool: `pip install ultralytics`
   - Data: Label 200–500 rubbing crops with bounding boxes using LabelImg or CVAT.
   - Training Command: `yolo detect train data=kannada_rubbings.yaml model=yolov8n.pt epochs=100 imgsz=640`

2. **Step 2: Script Era Classification (ResNet/ConvNeXt)**:
   - Tool: `pip install timm torch torchvision`
   - Data: 10 folders (one per era: `ashoka/`, `kadamba/`, `badami_chalukya/`, etc.) with 50–200 glyph crops per folder.
   - Train a standard transfer learning classifier on Kaggle/Colab free GPU.

3. **Step 3: Character Recognition (TrOCR)**:
   - Base Model: `microsoft/trocr-base-stage1`
   - Fine-tune on Kannada Akshara crops with HuggingFace Transformers.

4. **Step 4: Translation (Local Open-Source LLM)**:
   - Base Model: `Qwen/Qwen2.5-7B-Instruct` or `meta-llama/Llama-3.1-8B-Instruct` or `ai4bharat/IndicBART`.
   - Tool: Unsloth / Hugging Face PEFT with QLoRA (4-bit quantization fits in 6GB VRAM!).
   - Train on parallel pairs of Halegannada epigraph text -> Hosagannada -> English (from Epigraphia Carnatica).

### Activating Local Models in this Backend

Once your model weights (`.pt`, `.onnx`, or HuggingFace checkpoint) are saved in `backend/models/`:
1. Implement your classes in `backend/app/ml_adapters/local_adapters.py` inheriting from Protocols in `backend/app/ml_adapters/interfaces.py`.
2. Set `ADAPTER_MODE=local` in your `.env` file or `backend/app/config.py`.
3. The system will automatically run your weights directly on your local GPU/CPU with zero external API calls!
