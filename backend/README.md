# Kannada Heritage AI - Epigraphy Backend (ಕನ್ನಡ ಶಾಸನ ತಂತ್ರಾಂಶ ಬ್ಯಾಕೆಂಡ್)

Institutional-grade computational epigraphy and paleographical analysis backend engineered with Python 3.11+, FastAPI, and Pydantic v2.

---

## 🏛️ System Architecture

This backend serves the Kannada Heritage AI workbench, faithfully executing the **epigraphical 4-pillar separation**:
1. **Script Class (ಲಿಪಿ)**: 10 chronological epochs from Ashokan Brahmi (3rd C. BCE) to Modern Kannada.
2. **Source Language (ಮೂಲ ಭಾಷೆ)**: Historical dialect (Prakrit, Sanskrit, Purvada Halegannada, Classical Halegannada, Nadugannada, Hosagannada).
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

### Running the Server
```bash
uvicorn backend.app.main:app --reload --port 8000
```

Interactive documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- Health check: `http://localhost:8000/api/v1/health`

---

## 🧪 Running Tests
```bash
pytest backend/tests/ -v
```
