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

## 🏛️ Sacred Temples & Epigraphical Atlas of Karnataka

The platform integrates an institutional photographic atlas featuring verified UNESCO World Heritage and state-protected archaeological monuments that cradle Karnataka's epigraphical heritage:

- **Maski & Kanaganahalli Stupa (3rd C. BCE, Maurya Empire):** The historic discovery site where Emperor Ashoka was explicitly named by title (*Devanampriyasa Asoka*), featuring early Brahmi rock edicts.
- **Halmidi & Banavasi Madhukeshwara Temple (c. 450 CE, Kadambas):** The earliest confirmed stone inscription in classical Kannada prose (*Halmidi Stele*) and stepped stone Kadamba shikhara architecture in the Western Ghats.
- **Badami Cave Temples & Cliffside (c. 700 CE, Badami Chalukyas):** Early Chalukyan red sandstone caves chiseled into towering cliffs and the world-renowned Kappe Arabhatta Tripadi metre poetic inscription.
- **Aihole Meguti Temple & Durga Temple (634 CE, Badami Chalukyas):** The landmark Aihole Prashasti by court poet Ravikirti recording Pulakeshin II's triumph over Emperor Harsha.
- **Pattadakal UNESCO Complex (7th–8th C. CE, Badami Chalukyas):** Royal coronation grounds (*Kisuvolal*) synthesizing Nagara and Dravida styles, honoring master architect Gundan Anivaritachari.
- **Kailasa Monolithic Temple & Manyakheta (8th–10th C. CE, Rashtrakuta Empire):** Monumental rock-cut monoliths with colossal elephant friezes, marking the golden era of *Kavirajamarga*.
- **Belur Chennakeshava Temple (1117 CE, Hoysala Empire):** Ornate Hoysala chloritic schist plinths with Old Kannada consecration inscriptions and master sculptor signatures (Dasoja, Mallitamma).
- **Halebidu Hoysaleswara Temple (1121 CE, Hoysala Empire):** 35,000 soapstone sculptures and epigraphs recording mercantile guild grants in Dwarasamudra.
- **Shravanabelagola Vindhyagiri (981 CE, Western Ganga Dynasty):** 57-foot monolithic colossus of Bahubali Gommateshwara with ancient Kannada rock inscriptions celebrating minister Chavundaraya.
- **Hampi Vittala & Virupaksha Temples (1509 CE, Vijayanagara Empire):** Imperial Vijayanagara granite steles, the iconic Stone Chariot (ಗರುಡ ರಥ), and Emperor Krishnadevaraya's coronation decrees.
- **Ikkeri Aghoreshwara & Keladi Rameshwara (16th C. CE, Keladi Nayakas):** Dark granite Dravidian-Nayaka architecture with ornate pillared Nandi pavilions and royal Kannada grants.

---

## 🔬 Interactive Features on Landing Page

1. **Live Archaeological Decipherment Sandbox:** Switch between natural stone, CLAHE high-contrast relief, and inverted ink rubbing modes with interactive YOLO character segmentation bounding boxes and audio recitation.
2. **2,300-Year Script Paleography Viewer:** Dynamic character morphing engine tracking the anatomical evolution of characters (ಕ, ಅ, ಗ, ರ) across 10 historical dynasties.
3. **Karnataka Temple & Epigraph Atlas:** Interactive dynasty filters, high-resolution photo galleries, architectural classifications, and instant dossier inspection.
4. **UNESCO World Heritage Carousel:** Curated spotlight on Belur-Halebidu, Hampi, and Pattadakal with epigraph counts and canonical charters.
5. **Epigraphical Discovery Quiz:** Interactive trivia with historical grammar insights (P-to-H shift, Sakata Repha ಱ, Halmidi 450 CE chronology).

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

## 📂 Project Architecture & Folder Structure

```
kannada-inscription-ocr-llm/
├── index.html                     # Scholarly typography & font configuration
├── package.json                   # React, Vite, Tailwind, Lucide dependencies
├── tailwind.config.js             # Archaeological color tokens (parchment, stone, charcoal)
├── tsconfig.json                  # Strict TypeScript configuration
├── vite.config.ts                 # Path aliases & dev server config
├── dataset_loader.py              # Pure Python / PyTorch loader for 10-era dataset
├── RESEARCH_REPORT_ANCIENT_...md  # Senior research report & paleographical matrix
├── public/
│   └── glyphs/                    # Authentic character rubbings across 10 script eras
│       ├── ashoka/                # Ashokan Brahmi glyphs (1.png, 2.png, 3.png)
│       ├── satavahana/            # Satavahana Brahmi glyphs
│       ├── kadamba/               # Kadamba box-headed glyphs
│       ├── badami_chalukya/       # Badami Chalukya glyphs
│       ├── rashtrakuta/           # Rashtrakuta glyphs
│       ├── kalyana_chalukya/      # Kalyana Chalukya soapstone glyphs
│       ├── hoysala/               # Hoysala ornate double-loop glyphs
│       ├── vijayanagara/          # Vijayanagara granite glyphs
│       ├── mysuru/                # Mysuru Wodeyar cursive glyphs
│       └── present_kannada/       # Standardized modern Unicode typography
└── src/
    ├── types/
    │   ├── epigraphy.ts           # Domain models: Scripts, Languages, Transcription, Translation, Rules
    │   └── index.ts
    ├── theme/
    │   └── themeRegistry.ts       # Centralized 10-script CSS variables & language theme tokens
    ├── data/
    │   └── mockInscriptions.ts    # Canonical corpus & rules across 10 chronological epochs
    ├── services/
    │   ├── epigraphyService.ts    # Service Registry & Singleton Adapter
    │   └── mockEpigraphyService.ts# Decoupled mock demonstration adapter
    ├── components/
    │   ├── common/
    │   │   ├── Badge.tsx          # Institutional badges (Script, Language, Period, Substrate, Status, Rule)
    │   │   ├── Button.tsx         # Scholarly buttons with tactile focus states
    │   │   ├── ConfidenceIndicator.tsx # Visual confidence dial (OCR & Language prediction)
    │   │   ├── Divider.tsx        # Fine academic dividers
    │   │   ├── EmptyState.tsx     # Archival empty states with primary & secondary actions
    │   │   ├── FormField.tsx      # Labeled inputs, selects, and textareas
    │   │   ├── MetadataRow.tsx    # Compact key-value display rows
    │   │   └── StatusIndicator.tsx# Live review status pills
    │   ├── layout/
    │   │   ├── Sidebar.tsx        # Carved Kadamba emblem, wordmark, navigation tabs
    │   │   ├── PageHeader.tsx     # Archival heading, Kannada sub-headings, category badges
    │   │   ├── AppFooter.tsx      # Epigraphia citations, copyright, and research notices
    │   │   └── MainLayout.tsx     # Institutional responsive layout shell
    │   ├── explorer/
    │   │   ├── InscriptionCard.tsx# Catalog stele record cards
    │   │   ├── InscriptionFilterBar.tsx # Multi-tier filter, period selection, and sorting engine
    │   │   └── ScriptTimeline.tsx # 10-epoch timeline, evolutionary lineage & glyph showcase
    │   └── views/
    │       ├── OverviewView.tsx   # Dashboard with editorial showcase, recent steles, and activity
    │       ├── NewAnalysisView.tsx# Drag-and-drop upload & 5-stage simulated analysis workspace
    │       ├── AnalysisResultsView.tsx # 4-pillar results workspace with dynamic historical themes
    │       ├── ArchiveView.tsx    # Searchable archive register with grid and table modes
    │       ├── ScriptsLanguagesView.tsx # Paleographic explorer & script vs language decoupling
    │       ├── HistoricalRulesView.tsx # Administrative rules engine with drawer & local editor
    │       └── SettingsView.tsx   # Institutional preferences, OCR thresholds, and model selection
    ├── App.tsx                    # Root application state & navigation router
    ├── index.css                  # Custom scrollbar, parchment tokens, typography rules
    └── main.tsx                   # React root entry
```

---

## 🖥️ Catalog of Implemented Screens

1. **Overview Dashboard (`OverviewView.tsx`)**:
   - Institutional banner: *"Kannada Heritage AI — Explore inscriptions. Understand their script. Preserve their meaning."*
   - Archival feature showcase centered on the iconic **Halmidi Inscription (c. 450 CE)**.
   - Recent Inscriptions table with direct link to individual result pages.
   - Live research activity stream logging epigraphical verifications, lexical annotations, and rubbing ingestion.
   - Quick Action cards for direct navigation to New Analysis, Inscription Archive, and Script Typology.

2. **New Inscription Analysis Workspace (`NewAnalysisView.tsx`)**:
   - Drag-and-drop and native file selection for PNG, JPG, JPEG, WEBP, and TIFF images (up to 25 MB).
   - In-browser local processing and high-fidelity image preview.
   - Optional archaeological metadata inputs: Inscription Title, Known Location, Approximate Date, Dynasty / Era, Substrate Material, Script Hint, and Researcher Notes.
   - Simulated 5-stage epigraphical processing pipeline: Image Ingestion -> Bounding Box Localization -> CNN+ViT Epoch Inference -> Halegannada Transcription -> Hosagannada Translation.

3. **High-Precision Inscription Results Workspace (`AnalysisResultsView.tsx`)**:
   - Strict 4-pillar separation: Script Class vs. Source Language vs. Original Transcription vs. Target Translation.
   - Interactive stone image viewer with pan, zoom (up to 400%), line bounding box overlays, and character coordinate selection.
   - Three transcription modes: Original Script characters, Scholarly IAST Romanization, and Segmented line-by-line view.
   - Three translation modes: Modern Standard Kannada (*Hosagannada*) narrative, Aligned bilingual lines, and Archaic Lexicon Glossary.
   - Evidence-based historical dossier answering 8 epigraphical questions with official citations (*Epigraphia Carnatica*, *Indian Antiquary*).
   - Dynamic typed theme switcher injecting authentic historical palettes for all 10 eras in real time.
   - Epigraphist review controls: Correct Transcription modal, Edit Translation modal, Mark for Peer Review, and Final Verification.

4. **Searchable Inscription Archive (`ArchiveView.tsx`)**:
   - Catalog of authentic research epigraphs (Halmidi, Maski, Badami, Belur, Aihole, Dharwad, Hampi, Srirangapatna).
   - Five multi-tier filter dropdowns: Historical Script Class, Source Language, Substrate Material, Historical Period / Century, and Review Status.
   - Full text search across title, ruler, dynasty, accession number, and find-spot.
   - Sorting options: Chronological (Oldest / Newest), Title (A–Z / Z–A), and Recently Catalogued.
   - Dual View Mode switcher: Visual Stele Cards Grid vs. Dense Archival Register Table.
   - Retains active filter state and selected result when returning from the detail inspector.

5. **Historical Scripts & Languages Explorer (`ScriptsLanguagesView.tsx`)**:
   - Interactive 10-epoch stepper with diagnostic paleographical characteristics, typical medium, and dynastic history.
   - Direct genealogical relationships panel: Direct Ancestors, Descendant Scripts, Contemporary Parallel Scripts, and Evolutionary Branch Name.
   - Authentic In-Project Glyph Corpus Showcase: Renders genuine character rubbings directly from `public/glyphs/<script_id>/` with Kannada phoneme, IAST transliteration, and chisel anatomy notes.
   - Dedicated **Script vs. Language Decoupling Subtab** illustrating the fundamental epigraphical separation principle with historical case studies.

6. **Historical Rules Engine Administrative Workbench (`HistoricalRulesView.tsx`)**:
   - Structured administrative workbench displaying 10 authenticated computational rules across phonological, morphological, orthographical, metric, and paleographical categories.
   - Clear institutional disclaimer distinguishing prototype sample rules from authoritative peer-reviewed edicts.
   - Multi-attribute filtering by Rule Category and Review Status with keyword search.
   - Slide-out inspection drawer detailing canonical modern directives, grammatical explanations, stone examples, and applicability.
   - Interactive Local Session Editor: Allows updating rule parameters in local prototype state with a prominent banner confirming separation from persistent server data.

7. **Institutional Settings & Configuration (`SettingsView.tsx`)**:
   - Epigraphical display preferences (default transliteration scheme, font sizes, high-contrast rubbing filter).
   - Replaceable model configuration (CNN+ViT epoch detector, OCR confidence threshold, domain LLM temperature).

---

## 🎨 Dynamic Historical Theme Switching Architecture

The user interface uses a **centralized Theme Registry** (`src/theme/themeRegistry.ts`) that maps every historical script class and source language to CSS custom properties injected dynamically at the container level:

- **Ashokan Brahmi (`ashoka`):** Cool austere granitic grey (`#f0f1f2`), deep charcoal ink, slate stone borders.
- **Kadamba (`kadamba`):** Warm sandstone ochre (`#faf6ec`), box-head terracotta accents, warm ivory background.
- **Badami Chalukya (`badami_chalukya`):** Red sandstone hues (`#fbf5ee`), cinnabar highlights, rustic borders.
- **Rashtrakuta (`rashtrakuta`):** Imperial basalt parchment (`#f7f4ec`), deep bronze-brown accents.
- **Kalyana Chalukya (`kalyana_chalukya`):** Soft chloritic soapstone tint (`#f4f6f2`), muted moss-green slate accents.
- **Hoysala (`hoysala`):** Ultra-fine chloritic schist (`#f5f7f4`), deep soapstone green, ornate border styling.
- **Vijayanagara (`vijayanagara`):** Crystalline grey granite (`#f5f5f4`), bold ironstone accents.
- **Mysuru Wodeyar (`mysuru`):** Aged palm-leaf parchment (`#fcf8ed`), antique umber accents.
- **Present Kannada (`present_kannada`):** Crisp museum archival paper (`#faf9f7`), high-contrast ink.

---

## 🔌 FastAPI Future Backend Integration Interface

The frontend architecture strictly enforces the **Adapter Pattern** via `IEpigraphyService` (`src/types/epigraphy.ts`). Currently, `MockEpigraphyService` satisfies this contract. In future phases, a remote HTTP client adapter (`FastAPIEpigraphyService`) will be registered in `serviceRegistry` without changing a single React view:

```typescript
export interface IEpigraphyService {
  /** Retrieve metadata for the 10 historical script epochs */
  getScriptClasses(): Promise<ScriptClassMetadata[]>;

  /** Retrieve classification for the historical source languages */
  getSourceLanguages(): Promise<SourceLanguageMetadata[]>;

  /** Query the catalogued inscriptional archive with multi-tier filters */
  getInscriptions(filter?: InscriptionFilter): Promise<InscriptionRecord[]>;

  /** Retrieve full details and annotations for a specific accession ID */
  getInscriptionById(id: string): Promise<InscriptionRecord | null>;

  /** Stream recent scholarly activities and epigraphical verifications */
  getRecentActivity(): Promise<ResearchActivityItem[]>;

  /** Query the historical grammar and paleographic rules registry */
  getHistoricalRules(): Promise<HistoricalRuleItem[]>;

  /**
   * Submit an inscription rubbing for analysis
   * Future endpoint: POST /api/v1/inscriptions/analyze
   */
  analyzeInscriptionImage(file: File | Blob): Promise<AnalysisJobResult>;
}
```

### Future FastAPI Endpoint Mapping
- `GET /api/v1/scripts` -> `getScriptClasses()`
- `GET /api/v1/languages` -> `getSourceLanguages()`
- `GET /api/v1/inscriptions` -> `getInscriptions(filter)`
- `GET /api/v1/inscriptions/{id}` -> `getInscriptionById(id)`
- `GET /api/v1/rules` -> `getHistoricalRules()`
- `POST /api/v1/inscriptions/analyze` (multipart/form-data) -> `analyzeInscriptionImage(file)`

---

## ⚠️ Current Prototype & Mock-Data Limitations

1. **No Live Model Inference:** Analysis uploads run in-browser simulated inference using verified canonical epigraphical records (e.g. Halmidi Stele). All outputs carry explicit `isMockData: true` flags.
2. **In-Memory Local Session Edits:** Edits made to transcription readings, translations, or historical rules update local prototype state only. No persistent backend database (PostgreSQL/SQLite) is connected.
3. **Curated Inscription Corpus:** The archive contains 8 curated, historically authenticated inscriptions representing canonical epigraphs rather than a complete digitized epigraphia corpus.
4. **Selective Glyph Previews:** Genuine glyph images are rendered from `public/glyphs/` for curated samples (`1.png`, `2.png`, `3.png`) present in the project repository.

---

## 🚦 Verification Commands

```bash
# 1. Verify TypeScript types and compile project
npm run build

# 2. Start local research development server
npm run dev
```
