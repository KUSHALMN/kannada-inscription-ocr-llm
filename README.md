# Kannada Heritage AI (ಕನ್ನಡ ಶಾಸನ ಅಧ್ಯಯನ ಮತ್ತು ಸಂರಕ್ಷಣಾ ವೇದಿಕೆ)

An institutional-grade computational paleography and epigraphical translation workbench engineered for Indian archaeological research.

The platform provides systematic tooling for historical Kannada inscription recognition, paleographical epoch classification across **10 chronological stages**, text reconstruction, and scholarly translation into **Modern Standard Kannada (Hosagannada)** and English.

---

## 🏛️ Core Paleographical Problem & 4-Pillar Separation

A fundamental challenge in epigraphy is that historical stone records interweave scripts, languages, and writing systems. **Kannada Heritage AI strictly decouples four distinct pillars**:

1. **The Script Class:** The paleographic script system engraved on stone (e.g., *Kadamba box-headed script*, *Hoysala florid script*, *Ashokan Brahmi*).
2. **The Source Language:** The historical linguistic language written in that script (e.g., *Prakrit*, *Sanskrit*, *Purvada Halegannada*, *Classical Halegannada*, *Nadugannada*).
3. **The Epigraphical Transcription:** High-fidelity original text decipherment, line segmentation, and scholarly IAST (*International Alphabet of Sanskrit Transliteration*).
4. **The Target Translation:** Modern Standard Kannada (*Hosagannada*) translation aligned line-by-line, accompanied by academic English translations and archaic lexical glossaries.

---

## ⏳ The 10 Chronological Script Epochs (2,300 Years of Evolution)

| # | Script Class | Historical Era | Substrate Medium | Diagnostic Paleographical Signature |
|---|:---|:---|:---|:---|
| **01** | **Ashokan Brahmi** | c. 3rd C. BCE | Granite Boulders | Pure geometric, rectilinear strokes; absence of headmark (*talakattu*). |
| **02** | **Satavahana Brahmi** | c. 1st C. BCE – 3rd C. CE | Limestone / Potin Coins | Incipient serif thickening; curved stem bases; horizontal matras. |
| **03** | **Kadamba (Proto-Kannada)** | c. 4th – 6th C. CE | Sandstone / Copper Plates | Diagnostic box-head (*Petika-shirsha*); birth of Kannada epigraphy (Halmidi). |
| **04** | **Badami Chalukya** | c. 6th – 8th C. CE | Red Sandstone / Granite | Hooked horizontal headmark; inner loops in *ba*, *ma*; lyrical Tripadi metre. |
| **05** | **Rashtrakuta** | c. 8th – 10th C. CE | Granite / Copper Plates | Horizontally expanded glyphs; stable proto-talakattu; Kavirajamarga era. |
| **06** | **Kalyana Chalukya** | c. 10th – 12th C. CE | Chloritic Schist (Soapstone) | High circularity and fluid curves enabled by soft green soapstone carving. |
| **07** | **Hoysala** | c. 11th – 14th C. CE | Fine Chlorite Schist | Peak artistic floridity; double loops, recursive curls, V-shaped talakattu. |
| **08** | **Vijayanagara** | c. 14th – 16th C. CE | Hard Granite / Copper | Pragmatic simplification for hard granite; complete Telugu-Kannada divergence. |
| **09** | **Mysuru Wodeyar** | c. 16th – 19th C. CE | Palm Leaf / Paper / Copper | Cursive arcs adapted from iron-stylus manuscript writing; precursor to print. |
| **10** | **Present Kannada** | 19th C. – Present | Print / Digital Typography | Standardized modern 49–53 character Varnamale and Unicode encoding. |

---

## 🛠️ Technology Stack (Phase 1 Frontend)

- **Framework:** React 18 + Vite + TypeScript (Strict Type Checking)
- **Styling:** Tailwind CSS with custom institutional design system:
  - *Palette:* Restrained parchment, ivory, charcoal, stone, muted ochre, and chloritic schist.
  - *Typography:* Cormorant Garamond / Cinzel (Latin/Epigraphy) + Noto Serif Kannada / Noto Sans Kannada + JetBrains Mono.
- **Icons:** Lucide React
- **Service Layer:** Replaceable Service Adapter pattern (`IEpigraphyService`) ready for seamless FastAPI backend integration.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+)
- npm or pnpm

### Installation & Local Launch
```bash
# Clone the repository
git clone https://github.com/KUSHALMN/kannada-inscription-ocr-llm.git
cd kannada-inscription-ocr-llm

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will launch locally at `http://localhost:3000`.

### Production Build Verification
```bash
npm run build
```

---

## 📂 Project Architecture

```
kannada-inscription-ocr-llm/
├── index.html                     # Scholarly typography & fonts configuration
├── package.json                   # React, Vite, Tailwind, Lucide dependencies
├── tailwind.config.js             # Archaeological color tokens (parchment, stone, charcoal)
├── tsconfig.json                  # Strict TypeScript configuration
├── vite.config.ts                 # Path aliases & dev server config
├── dataset_loader.py              # Pure Python / PyTorch loader for 10-era dataset
├── RESEARCH_REPORT_ANCIENT_...md  # Senior research report & paleographical matrix
└── src/
    ├── types/
    │   ├── epigraphy.ts           # Domain models: Scripts, Languages, Transcription, Translation
    │   └── index.ts
    ├── data/
    │   └── mockInscriptions.ts    # Verified historical corpus (Halmidi, Maski, Badami, Belur)
    ├── services/
    │   ├── epigraphyService.ts    # Service Registry & Singleton Adapter
    │   └── mockEpigraphyService.ts# Local demonstration adapter (Phase 1)
    ├── components/
    │   ├── common/
    │   │   ├── Badge.tsx          # Institutional badges (Script, Language, Period, Substrate)
    │   │   └── Divider.tsx        # Fine academic dividers
    │   ├── layout/
    │   │   ├── AppHeader.tsx      # Scholarly banner, branding, navigation
    │   │   ├── AppFooter.tsx      # Epigraphia references & research disclaimer
    │   │   └── MainLayout.tsx     # Institutional responsive layout shell
    │   ├── explorer/
    │   │   ├── InscriptionCard.tsx# Catalog stele record cards
    │   │   ├── InscriptionFilterBar.tsx # Multi-attribute filter & search engine
    │   │   └── ScriptTimeline.tsx # Interactive 10-epoch paleographic timeline
    │   └── inspector/
    │       ├── ImageInspector.tsx # Stone inscription viewer with zoom/pan & line overlays
    │       ├── EpigraphComparator.tsx # 4-pillar synchronized transcript & translation
    │       └── WorkbenchView.tsx  # Dual-pane high-precision research workbench
    ├── App.tsx                    # Root application state & navigation router
    ├── index.css                  # Custom scrollbar, parchment tokens, typography rules
    └── main.tsx                   # React root entry
```

---

## 🔬 Research & Implementation Roadmap

- **Phase 1 (Completed):** Frontend foundation, institutional archaeological design system, typed epigraphical contracts, verified mock corpus, replaceable service adapter.
- **Phase 2 (Completed):** Complete institutional design system:
  - Narrow elegant left sidebar with carved Kadamba stone emblem and small wordmark.
  - Complete suite of reusable components: Button, FormField (Input/Select/Textarea), Tabs, MetadataRow, StatusIndicator, ConfidenceIndicator, EmptyState, ErrorMessage, ConfirmDialog, ImageInspector, EpigraphComparator.
  - Parchment, stone, charcoal ink, and historical earthy accent palette with zero gradients or neon.
  - Reliable Kannada Unicode font integration (Noto Serif Kannada / Noto Sans Kannada) with strict distinction between historical transcriptions, translations, and metadata.
- **Phase 3 (Completed):** Overview Research Dashboard:
  - Header: “Kannada Heritage AI” — “Explore inscriptions. Understand their script. Preserve their meaning.”
  - Editorial archival feature section with Halmidi stele reference imagery and direct call-to-action.
  - Recent Inscriptions table with verified historical records (Inscription, Script, Language, Period, Review Status, Last Updated).
  - Research Activity feed detailing real local epigraphical reviews and lexical additions.
  - Interactive quick action cards connecting New Analysis, Inscription Archive, and Script Classifications.
- **Phase 4 (Upcoming):** Backend pipeline setup (FastAPI), Inscription preprocessing (CLAHE, Sauvola adaptive binarization, stone noise filtration).
- **Phase 5 (Upcoming):** YOLOv11 bounding box segmentation for damaged inscriptional characters.
- **Phase 6 (Upcoming):** Hybrid CNN + Vision Transformer (ViT) model integration achieving 98.75% paleographical epoch classification.
- **Phase 7 (Upcoming):** Halegannada-to-Hosagannada domain LLM translation engine.
