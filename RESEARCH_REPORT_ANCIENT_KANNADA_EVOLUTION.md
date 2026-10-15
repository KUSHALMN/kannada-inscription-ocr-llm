# Comprehensive Paleographic & Computational Research Report: Ancient Kannada Script Evolution Dataset

**Principal Investigator / Senior Research Fellow Assessment**  
**Archival Corpus:** `Ancient Kannada DATA` & Experimental Benchmark Suite (`results1.docx`)  
**Domain:** Epigraphy, Dravidian Paleography, Computational Archeology, and Deep Vision Architectures  

---

## Executive Summary

The investigated repository comprises an **end-to-end epigraphical and computational dataset** tracking the paleographical evolution of the **Kannada script across ten distinct historical epochs** spanning over **2,300 years** (from the 3rd Century BCE Mauryan Empire to 21st Century Contemporary Kannada). 

Accompanying the raw glyph corpus of **473 curated character images** across 10 chronological stages is a comprehensive deep learning benchmark suite (`results1.docx`) validating a novel **Hybrid CNN + Vision Transformer (ViT)** architecture with **Adaptive Feature Fusion**, achieving a state-of-the-art recognition accuracy of **98.75%**, outperforming conventional HOG+SVM (87.5%), ResNet50 (94.10%), DenseNet121 (96.04%), and standalone Vision Transformers (97.32%).

```
   CHRONOLOGICAL TIMELINE OF KANNADA SCRIPT PALEOGRAPHY
   ════════════════════════════════════════════════════════════════════════════════════════════════════════════
   c. 3rd C. BCE       c. 1st-3rd C. CE     c. 4th-6th C. CE     c. 6th-8th C. CE     c. 8th-10th C. CE
   ┌──────────────┐    ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
   │ 1. ASHOKA    │───>│ 2. SATAVAHANA│────>│  3. KADAMBA  │────>│  4. BADAMI   │────>│5. RASHTRAKUTA│
   │   (Brahmi)   │    │   (Brahmi)   │     │ (Box-headed) │     │   CHALUKYA   │     │(Middle Old)  │
   └──────────────┘    └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                                             │
   c. Present          c. 16th-19th C.      c. 14th-16th C.      c. 11th-14th C.      c. 10th-12th C.
   ┌──────────────┐    ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
   │ 10. PRESENT  │<───│  9. MYSURU   │<────│8.VIJAYANAGARA│<────│  7. HOYSALA  │<────│  6. KALYANA  │
   │   KANNADA    │    │   WODEYAR    │     │(Pre-Modern)  │     │(Florid/Soap) │     │   CHALUKYA   │
   └──────────────┘    └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

---

## Section 1: In-Depth Epigraphical & Paleographical Analysis by Historical Era

Each subfolder represents a foundational epoch in South Indian epigraphy. Below is the historical, linguistic, and morphological breakdown of all 10 script stages:

---

### 1. Ashoka Script (`1_AshokScript`)
* **Time Period:** c. 3rd Century BCE (c. 273 – 232 BCE)
* **Historical & Dynastic Context:** Mauryan Empire under Emperor Ashoka. Notable Karnataka sites include the **Maski Minor Rock Edict** (Raichur district—first edict identifying Ashoka by name), **Brahmagiri & Siddapura Edicts** (Chitradurga), and **Koppal/Nittur Edicts**.
* **Medium & Substrate:** Unpolished granite boulders, cliff faces, sandstone pillars.
* **Glyph Count in Dataset:** **41 characters** (`1.png` to `41.png`).
* **Paleographic Anatomy:**
  * **Geometry:** Highly geometric, austere, and rectilinear. Built from primary circles, semicircles, right angles, and straight vertical/horizontal strokes.
  * **Headmark (Talakattu):** Entirely absent. Characters terminate sharply at the upper boundary.
  * **Stroke Execution:** Chiseled deeply into coarse granitic surfaces; lines are uniform in width with zero calligraphic modulation.
  * **Phonological Scope:** Represents Early Southern Ashokan Brahmi adapted for Prakrit inscriptions. Lacks complex aspirated conjuncts common in later classical Sanskrit/Kannada.

---

### 2. Satavahana Script (`2_SatavahanaScript`)
* **Time Period:** c. 1st Century BCE – 3rd Century CE
* **Historical & Dynastic Context:** Satavahana Dynasty (Simuka, Gautamiputra Satakarni, Vashishtiputra Pulumavi) and successor Chutus in Banavasi/Sannati (Kalaburagi).
* **Medium & Substrate:** Limestone slabs (notably Sannati Buddhist stupas), rock-cut caves, lead/potin/bronze coins, and early pillar inscriptions.
* **Glyph Count in Dataset:** **43 characters** (`1.png` to `43.png`).
* **Paleographic Anatomy:**
  * **Geometry:** Transition from rigid linearity to subtle curvilinearity. Basal strokes begin to bend, and vertical stems develop slight base curves.
  * **Headmark:** Genesis of structural headmarks. Early serif-like thickening or small triangular incisions appear at top terminals.
  * **Modulation:** Noticeable pressure variation in engraving. Vowel signs (*matras*) extend diagonally and horizontally from the upper body rather than strictly orthogonal stems.
  * **Phonological Scope:** Early expansion of vowel ligatures and dental-retroflex distinctions reflecting the bilingual Prakrit-Dravidian administrative environment.

---

### 3. Kadamba Script (`3_Kadamba`)
* **Time Period:** c. 4th Century – 6th Century CE (c. 345 – 525 CE)
* **Historical & Dynastic Context:** Kadambas of Banavasi (founded by Mayurasharma). This era marks the **birth of Kannada epigraphy**; the iconic **Halmidi Inscription (c. 450 CE)** in Hassan district constitutes the oldest attested formal Kannada epigraph.
* **Medium & Substrate:** Sandstone pillars, chlorite schist slabs, early copper-plate charters (*tamrashasana*).
* **Glyph Count in Dataset:** **46 characters** (`1.png` to `46.png`).
* **Paleographic Anatomy:**
  * **Box-Headed Character (*Petika-shirsha*):** The most diagnostic hallmark of Kadamba script. The top of vertical stems features an engraved hollow or solid square/box, formed by crosscut chiseling.
  * **Curvature:** Base of letters like *ka*, *ra*, *ma* becomes rounded. Letter forms begin to resemble closed loops.
  * **Proto-Kannada Division:** Branching point where the Southern Brahmi branch definitively separates into Proto-Kannada-Telugu script.
  * **Phonological Scope:** Formal inclusion of Sanskrit loan phonemes alongside native Dravidian consonants, including early representations of *Sakata Repha* (ಱ) and *Kula Repha* (ೞ).

---

### 4. Badami Chalukya Script (`4_BadamiChalukyas`)
* **Time Period:** c. 6th Century – 8th Century CE (c. 543 – 753 CE)
* **Historical & Dynastic Context:** Early Western Chalukyas of Vatapi (Badami), under Pulakeshin I, Pulakeshin II, and Vikramaditya I. Famous epigraphs include the **Aihole Inscription of Ravikirti (634 CE)**, Badami cliff inscriptions, and Mahakuta pillar.
* **Medium & Substrate:** Red sandstone temples, cliff walls, rock-cut shrines, and copper-plate grants.
* **Glyph Count in Dataset:** **46 characters** (`1.png` to `46.png`).
* **Paleographic Anatomy:**
  * **Headmark Transition:** The Kadamba box-head begins morphing into a wedge or broad hooked horizontal bar, heralding the proto-*talakattu*.
  * **Loop Formation:** Characters like *ba*, *bha*, *ya*, and *ma* develop pronounced inner loops. Vowel markers curve dramatically upward and over glyph bodies.
  * **Symmetry:** Strong bilateral symmetry with balanced sweeping vertical tails.

---

### 5. Rashtrakuta Script (`5_Rashtrakuta`)
* **Time Period:** c. 8th Century – 10th Century CE (c. 753 – 982 CE)
* **Historical & Dynastic Context:** Imperial Rashtrakutas of Manyakheta (Malkhed), under Amoghavarsha I Nrupatunga, Krishna I, and Indra III. Era of **Kavirajamarga (c. 850 CE)**, the foundational literary treatise establishing Kannada poetics.
* **Medium & Substrate:** Basalt, granite slabs, hero stones (*veeragallu*), Jain temple pediments, and multi-plate copper charters.
* **Glyph Count in Dataset:** **46 characters** (`1.png` to `46.png`).
* **Paleographic Anatomy:**
  * **Flattening and Broadening:** Letters become broader along the horizontal axis with a compressed vertical aspect ratio.
  * **Definite Talakattu:** Headmark stabilizes into a distinct arched curve/hook.
  * **Complex Conjuncts:** Subjoined consonants (*vattakshara*) move distinctly beneath the base consonant rather than being fused laterally.

---

### 6. Kalyana Chalukya Script (`6_KalyanChalukya`)
* **Time Period:** c. 10th Century – 12th Century CE (c. 973 – 1198 CE)
* **Historical & Dynastic Context:** Western Chalukyas of Kalyana (Basavakalyan), under Tailapa II, Someshvara I, and Vikramaditya VI (Vikrama era). Era of celebrated Kannada poets Ranna and Nagavarma I.
* **Medium & Substrate:** **Chloritic schist (green soapstone)**, enabling micro-detailed calligraphic carving.
* **Glyph Count in Dataset:** **50 characters** (`1.png` to `50.png`).
* **Paleographic Anatomy:**
  * **Circular Calligraphy:** Introduction of fine-grained soapstone revolutionized Kannada paleography, sparking circular, spiral, and looping contours.
  * **Decorative Finials:** Terminal strokes flare gracefully. Matras for *i*, *ee*, *u*, *oo* curl cleanly around the body.
  * **Phonological Expansion:** Full classical syllabary representing 50 characters, including explicit differentiation of long and short vowels and Sanskrit conjunct clusters.

---

### 7. Hoysala Script (`7_Hoysala`)
* **Time Period:** c. 11th Century – 14th Century CE (c. 1026 – 1343 CE)
* **Historical & Dynastic Context:** Hoysala Empire of Belur, Halebidu (Dwarasamudra), and Sosevuru under Vishnuvardhana and Ballala II. Iconic temples of Chennakeshava (Belur) and Hoysaleshwara (Halebidu).
* **Medium & Substrate:** Ultra-fine chloritic schist stone panels, stele records (*shasana*), and ornate lintels.
* **Glyph Count in Dataset:** **49 characters** (`1.png` to `49.png`).
* **Paleographic Anatomy:**
  * **Peak Aesthetic Floridity:** Renowned among epigraphists as the most artistically intricate script in Indian epigraphical history.
  * **Double Curvature & Spirals:** Strokes loop inward and outward with floral, curly flourishes.
  * **Standardized Talakattu:** The downward-slanting V-shaped or curved *talakattu* (T-bar/check-mark) becomes uniform across consonants.
  * **Conjunct Stacking:** Multi-tier vertical stacking of consonant markers beneath the main glyph body.

---

### 8. Vijayanagara Script (`8_Vijayanagara`)
* **Time Period:** c. 14th Century – 16th Century CE (c. 1336 – 1646 CE)
* **Historical & Dynastic Context:** Vijayanagara Empire (Sangama, Saluva, Tuluva, Aravidu dynasties) from Hampi/Vijayanagara under Devaraya II and Krishnadevaraya.
* **Medium & Substrate:** Hard granite stone steles, monumental temple pillars, copper-plate grants (*Nandi-Nagari* and Kannada scripts).
* **Glyph Count in Dataset:** **50 characters** (`1.png` to `50.png`).
* **Paleographic Anatomy:**
  * **Pragmatic Simplification:** Transitioning from soft soapstone back to hard crystalline granite forced sculptors to abandon excessive ornamental spirals in favor of bolder, simplified circular curves.
  * **Independent Character Isolation:** Characters separate cleanly with standard kerning.
  * **Kannada-Telugu Differentiation:** Complete divergence of Telugu and Kannada glyph forms into independent regional scripts.

---

### 9. Mysuru Script (`9_Mysuru`)
* **Time Period:** c. 16th Century – 19th Century CE
* **Historical & Dynastic Context:** Kingdom of Mysore under the Wodeyar Dynasty (Raja Wodeyar, Kanteerava Narasaraja, Chikka Devaraja, and Mummadi Krishnaraja Wodeyar).
* **Medium & Substrate:** Paper manuscripts, palm leaf records (*talagari*), copper plates, temple donor inscriptions.
* **Glyph Count in Dataset:** **49 characters** (`1.png` to `49.png`).
* **Paleographic Anatomy:**
  * **Cursive Flow:** Influenced heavily by iron-stylus writing on dried palm leaves (*talagari*), requiring rounded loops to avoid tearing the leaf along its horizontal veins.
  * **Modern Precursor:** Direct morphological ancestor of 20th-century print typography. The circular body and top loop of letters like *ka*, *ra*, *la*, *da* closely mirror modern type.

---

### 10. Present Kannada (`10_PresentKannada`)
* **Time Period:** 19th Century – 21st Century CE (Contemporary)
* **Historical & Dynastic Context:** Post-printing press standardization initiated by the Basel Mission Press (Hermann Mögling, Rev. Ferdinand Kittel in Mangaluru) and standardized by the Kannada Sahitya Parishat and Mysore University.
* **Medium & Substrate:** Moveable metal type, modern lithography, offset printing, and Unicode-standard digital typography.
* **Glyph Count in Dataset:** **53 characters** (`1.png` to `53.png`).
* **Paleographic Anatomy:**
  * **Full Kannada Varnamale (Alphasyllabary):**
    * 14 Swaras (Vowels): ಅ, ಆ, ಇ, ಈ, ಉ, ಊ, ಋ, ೠ, ಎ, ಏ, ಐ, ಒ, ಓ, ಔ
    * 2 Yogavahas: ಅಂ (Anusvara), ಅಃ (Visarga)
    * 25 Vargeeya Vyanjanas (Categorized Consonants: Ka to Ma)
    * 9 Avargeeya Vyanjanas: ಯ, ರ, ಲ, ವ, ಶ, ಷ, ಸ, ಹ, ಳ
    * Archaic/Special Characters: ಱ (Sakata Repha), ೞ (Kula Repha), and conjunct ligatures (e.g., ಕ್ಷ / ಜ್ಞ).
  * **Morphology:** Closed, uniform circular curves, standardized open top *talakattu* (✓), and systematically detached lower subjoined subscripts (*ottu*).

---

## Section 2: Comparative Paleographic Evolution Matrix

| Script Class | Historical Era | Diagnostic Headmark | Stroke Curvature | Typical Engraving Medium | Dataset Samples | Primary Distinctive Feature |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Ashoka** | 3rd C. BCE | Absent (flat/open) | Rectilinear, angular (0% curves) | Coarse Granite | 41 | Pure geometric lines, crosses, circles |
| **2. Satavahana** | 1st C. BCE–3rd C. CE | Incipient serif / wedge | Semi-angular, slight base curve | Limestone / Potin coins | 43 | Rounded base stems, thickened upper tips |
| **3. Kadamba** | 4th–6th C. CE | Box-headed (*Petika-shirsha*) | Moderate loops, square frames | Sandstone / Copper plates | 46 | Hollow/solid square box on character tops |
| **4. Badami Chalukya** | 6th–8th C. CE | Hooked horizontal bar | Pronounced loops, sweeping curves | Red Sandstone / Granite | 46 | Transition from box-head to curved canopy |
| **5. Rashtrakuta** | 8th–10th C. CE | Curved top-hook | Horizontally expanded, flat | Granite / Basalt / Copper | 46 | Broad, compressed glyph aspect ratio |
| **6. Kalyana Chalukya** | 10th–12th C. CE | Distinct arched notch | Circular, fluid, swirling | Chloritic Schist (Soapstone) | 50 | High circularity enabled by soft soapstone |
| **7. Hoysala** | 11th–14th C. CE | Fully formed *Talakattu* | Ornate, recursive double-loops | Fine Chlorite Schist | 49 | Decorative curls, maximum visual complexity |
| **8. Vijayanagara** | 14th–16th C. CE | Standard T-hook | Simplified circular, bold | Hard Granite / Copper | 50 | Removal of floral curls; sturdy architecture |
| **9. Mysuru** | 16th–19th C. CE | Modern check-bar | Smooth cursive, continuous | Palm Leaf / Paper / Copper | 49 | Palm-leaf curve adaptation; precursor to print |
| **10. Present Kannada** | 19th–21st C. CE | Standardized *Talakattu* | Uniform, standardized typography | Digital / Metal Type / Print | 53 | High-precision geometry; isolated subscripts |

---

## Section 3: Dataset Architecture & Image Metrics

```
DATASET DISTRIBUTION PER SCRIPT CLASS (Total: 473 segmented glyphs)
┌────────────────────────┬───────┬────────────────────────────────────────────────────────┐
│ Script Class           │ Count │ Format & Typical Resolutions                           │
├────────────────────────┼───────┼────────────────────────────────────────────────────────┤
│ 10_PresentKannada      │  53   │ RGB PNG (56x52, 71x74, 95x71, 116x70, 74x83)           │
│ 1_AshokScript          │  41   │ Indexed/P PNG (57x75, 64x75, 48x86, 33x75, 50x65)      │
│ 2_SatavahanaScript     │  43   │ RGBA/RGB PNG (84x104, 115x87, 94x126, 60x89, 76x102)   │
│ 3_Kadamba              │  46   │ RGB PNG (58x69, 76x65, 58x81, 74x70, 87x78)           │
│ 4_BadamiChalukyas      │  46   │ RGB PNG (83x64, 59x63, 66x67, 46x73, 62x69)           │
│ 5_Rashtrakuta          │  46   │ RGB PNG (51x60, 60x72, 69x61, 54x62, 42x65)           │
│ 6_KalyanChalukya       │  50   │ RGB PNG (71x61, 46x61, 60x58, 63x55, 66x72)           │
│ 7_Hoysala              │  49   │ RGB PNG (50x62, 72x57, 50x51, 73x51, 57x56)           │
│ 8_Vijayanagara         │  50   │ RGB PNG (58x50, 79x69, 60x50, 64x58, 47x54)           │
│ 9_Mysuru               │  49   │ RGB PNG (44x62, 57x59, 56x52, 74x70, 65x64)           │
└────────────────────────┴───────┴────────────────────────────────────────────────────────┘
```

### Morphological Analysis & Preprocessing Pipeline
1. **Isolated Glyph Cropping:** Characters are individual segmented glyph binarized matrices representing specific aksharas (vowels, consonants, ligatures).
2. **Dimension Variations:** Raw glyphs range from $33 \times 29$ px up to $116 \times 70$ px. Standardized input requires aspect-ratio preserving padding or bilinear interpolation up to $224 \times 224$ pixels.
3. **Color Space Harmonization:** Images exist as a mix of 8-bit palette (indexed), RGBA (with alpha channels), and 3-channel RGB. Conversion to single-channel normalized grayscale or 3-channel normalized RGB ($[0, 1]$ range with ImageNet or empirical normalization) is mandatory for neural backbone ingestion.

---

## Section 4: Machine Learning Benchmarks & Computational Architecture

Extracted from the empirical research document `results1.docx`, the dataset was rigorously benchmarked across traditional machine learning, convolutional neural networks, transformer backbones, and a **novel proposed CNN + Vision Transformer (ViT) Hybrid with Adaptive Feature Fusion**.

### 1. Experimental Setup
* **Input Resolution:** $224 \times 224$ pixels
* **Train / Validation / Test Split:** 70% : 15% : 15%
* **Compute Infrastructure:** NVIDIA RTX 4090 / A100 GPU
* **Optimization:** Adam Optimizer ($\text{lr} = 10^{-4}$), Batch Size = 32, Epochs = 100
* **Objective Function:** Categorical Cross-Entropy Loss

---

### 2. Comprehensive Model Comparison

```
CLASSIFICATION PERFORMANCE COMPARISON
┌─────────────────────────────────┬──────────┬───────────┬────────┬──────────┬──────────────┐
│ Model Architecture              │ Accuracy │ Precision │ Recall │ F1-Score │ Training (m) │
├─────────────────────────────────┼──────────┼───────────┼────────┼──────────┼──────────────┤
│ Traditional HOG + SVM           │  87.50%  │   0.871   │  0.869 │  0.870   │      --      │
│ VGG16                           │  91.80%  │   0.916   │  0.914 │  0.915   │      --      │
│ ResNet50                        │  94.10%  │   0.941   │  0.939 │  0.940   │     120      │
│ EfficientNet-B0                 │  95.25%  │   0.952   │  0.951 │  0.951   │     108      │
│ DenseNet121                     │  96.04%  │   0.960   │  0.959 │  0.959   │     132      │
│ CNN + SVM                       │  96.48%  │   0.965   │  0.964 │  0.964   │     145      │
│ Vision Transformer (ViT)        │  97.32%  │   0.973   │  0.972 │  0.972   │     155      │
│ Proposed CNN + ViT (Hybrid)     │  98.75%  │   0.988   │  0.987 │  0.987   │     148      │
└─────────────────────────────────┴──────────┴───────────┴────────┴──────────┴──────────────┘
```

---

### 3. Per-Script Class Classification Accuracy

```
SCRIPT CLASS ACCURACY BREAKDOWN (Proposed CNN + ViT)
┌───────────────────────┬──────────────┬─────────────────────────────────────────────────┐
│ Script Class          │ Accuracy (%) │ Paleographic Explanation                        │
├───────────────────────┼──────────────┼─────────────────────────────────────────────────┤
│ 10_PresentKannada     │    99.4%     │ Highest consistency; standard modern typography │
│ 7_Hoysala             │    99.2%     │ Highly unique floral loops; distinctive shape   │
│ 9_Mysuru              │    99.1%     │ Mature rounded loops, minimal stone degradation │
│ 3_Kadamba             │    99.0%     │ Box-headed top serves as a salient diagnostic   │
│ 5_Rashtrakuta         │    98.9%     │ Broad horizontal stems; well-defined hook       │
│ 8_Vijayanagara        │    98.8%     │ Clean geometric separation and standard t-hook  │
│ 6_Kalyana Chalukya    │    98.7%     │ High circularity; slight overlap with Hoysala   │
│ 2_Satavahana          │    98.6%     │ Distinct curved bases on Ashokan roots          │
│ 4_Badami Chalukya     │    98.4%     │ Transitional traits between Kadamba & Rashtrak. │
│ 1_Ashoka              │    98.2%     │ High simplicity; occasional overlap with early  │
│                       │              │ geometric strokes of Satavahana                 │
└───────────────────────┴──────────────┴─────────────────────────────────────────────────┘
```

---

### 4. Ablation & Architectural Analysis

#### A. Architectural Component Ablation
```
┌──────────────────────────────────────┬──────────┬───────────┬────────┬──────────┐
│ Model Configuration                  │ Accuracy │ Precision │ Recall │ F1-Score │
├──────────────────────────────────────┼──────────┼───────────┼────────┼──────────┤
│ CNN Only                             │  95.82%  │   0.957   │  0.956 │  0.956   │
│ Vision Transformer Only              │  97.18%  │   0.972   │  0.971 │  0.971   │
│ CNN + Attention                      │  97.95%  │   0.979   │  0.978 │  0.978   │
│ CNN + ViT Feature Fusion             │  98.42%  │   0.984   │  0.983 │  0.983   │
│ Proposed Framework (Adaptive Fusion) │  98.75%  │   0.988   │  0.987 │  0.987   │
└──────────────────────────────────────┴──────────┴───────────┴────────┴──────────┘
```

#### B. Fusion Strategy Comparison
* **CNN Features Alone:** 95.82% (learns localized stroke curvature and chisel edge marks well, but struggles with global script layout).
* **ViT Features Alone:** 97.18% (captures multi-head global self-attention across character proportions, but misses fine stroke junctures).
* **Early Fusion (Concatenation):** 97.64%
* **Late Fusion (Decision Level):** 98.10%
* **Adaptive Feature Fusion (Proposed Gated Mechanism):** **98.75%** (dynamically weights localized CNN stroke tokens against ViT global spatial tokens).

#### C. Computational Complexity & Latency
```
┌─────────────────────────┬────────────────┬───────────┬──────────────────────┐
│ Model                   │ Parameters (M) │ FLOPs (G) │ Inference Time (ms)  │
├─────────────────────────┼────────────────┼───────────┼──────────────────────┤
│ EfficientNet-B0         │      5.3       │   0.39    │        15 ms         │
│ ResNet50                │     25.6       │   4.10    │        18 ms         │
│ Proposed Hybrid Model   │     48.7       │   8.90    │        21 ms         │
│ DenseNet121             │      8.0       │   2.90    │        22 ms         │
│ Vision Transformer      │     86.0       │  17.60    │        29 ms         │
└─────────────────────────┴────────────────┴───────────┴──────────────────────┘
```
*The proposed model achieves nearly 43% parameter reduction and half the FLOPs of a monolithic ViT (48.7M vs 86.0M, 8.9G vs 17.6G) while delivering lower inference latency (21 ms vs 29 ms) and higher accuracy.*

#### D. 5-Fold Cross Validation & Training Data Scalability
* **5-Fold Cross Validation:** Fold 1 (98.31%), Fold 2 (98.54%), Fold 3 (98.82%), Fold 4 (98.67%), Fold 5 (98.75%) $\rightarrow$ **Average: 98.62%** (demonstrating high generalizability across splits).
* **Data Volume vs. Accuracy:**
  * 30% data: 84.62%
  * 50% data: 91.43%
  * 70% data: 97.42%
  * 90% data: **98.75%**

---

## Section 5: Senior Researcher Recommendations & Implementation Blueprint

### 1. Recommended Production Architecture: End-to-End Epigraphical Pipeline
To transform this dataset and classifier into a functional full-system application for translating ancient Kannada stone inscriptions:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          END-TO-END TRANSLATION PIPELINE                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
             [ Step 1: Raw Inscription Preprocessing & Enhancement ]
             - Adaptive Bilateral Filtering (removes stone grain noise)
             - Contrast Limited Adaptive Histogram Equalization (CLAHE)
             - Otsu / Sauvola Local Binarization
                                      │
                                      ▼
             [ Step 2: Line & Character Segmentation ]
             - YOLOv11-OBB / Mask R-CNN for damaged glyph boundary detection
             - Bounding box extraction with aspect ratio preserved padding
                                      │
                                      ▼
             [ Step 3: Script Epoch & Akshara Classification ]
             - Proposed CNN + ViT Hybrid Model (224x224 input)
             - Predicts Epoch (1 of 10) + Glyph Character Class
             - Confidence Scoring & Top-K candidate extraction
                                      │
                                      ▼
             [ Step 4: Halegannada (Old Kannada) Lexical Parsing ]
             - Reconstructs text string in Halegannada phonetics
             - Morphological Sandhi splitter (splitting compound Sanskrit/Old Kannada words)
                                      │
                                      ▼
             [ Step 5: Semantic Translation Engine ]
             - Historical Kannada Domain LLM (Trained on Epigraphia Carnatica)
             - Outputs: Modern Standard Kannada (Hosagannada) + English Translation
```

### 2. PyTorch Dataset Loader Template (`dataset_loader.py`)
```python
import os
import torch
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from PIL import Image

class AncientKannadaDataset(Dataset):
    """
    10-Class Ancient Kannada Script Evolution Dataset Loader
    Classes:
      0: 1_AshokScript
      1: 2_SatavahanaScript
      2: 3_Kadamba
      3: 4_BadamiChalukyas
      4: 5_Rashtrakuta
      5: 6_KalyanChalukya
      6: 7_Hoysala
      7: 8_Vijayanagara
      8: 9_Mysuru
      9: 10_PresentKannada
    """
    def __init__(self, root_dir, transform=None):
        self.root_dir = root_dir
        self.transform = transform
        self.samples = []
        self.class_to_idx = {
            '1_AshokScript': 0,
            '2_SatavahanaScript': 1,
            '3_Kadamba': 2,
            '4_BadamiChalukyas': 3,
            '5_Rashtrakuta': 4,
            '6_KalyanChalukya': 5,
            '7_Hoysala': 6,
            '8_Vijayanagara': 7,
            '9_Mysuru': 8,
            '10_PresentKannada': 9
        }
        
        for cls_name, cls_idx in self.class_to_idx.items():
            cls_path = os.path.join(root_dir, cls_name)
            if os.path.isdir(cls_path):
                for fname in os.listdir(cls_path):
                    if fname.lower().endswith(('.png', '.jpg', '.jpeg')):
                        self.samples.append((os.path.join(cls_path, fname), cls_idx))

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        path, label = self.samples[idx]
        image = Image.open(path).convert('RGB')
        if self.transform:
            image = self.transform(image)
        return image, torch.tensor(label, dtype=torch.long)

# Standard Training & Evaluation Transforms (224x224 input)
train_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomRotation(degrees=7),
    transforms.RandomAffine(degrees=0, translate=(0.05, 0.05)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])
```
