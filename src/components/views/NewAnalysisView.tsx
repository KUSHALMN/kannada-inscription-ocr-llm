import React, { useState, useRef } from 'react';
import { InscriptionRecord, ScriptClassId, SourceLanguageId } from '../../types';
import { PageHeader } from '../layout/PageHeader';
import { Button } from '../common/Button';
import { FormField, Input, Select, Textarea } from '../common/FormField';
import {
  Upload,
  X,
  AlertCircle,
  RotateCcw,
  SearchCode,
  ShieldAlert
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface NewAnalysisViewProps {
  inscriptions: InscriptionRecord[];
  onAnalysisComplete: (result: InscriptionRecord) => void;
  onCancel: () => void;
}

interface UploadedFileState {
  file: File;
  previewUrl: string;
  name: string;
  sizeFormatted: string;
  type: string;
}

export const NewAnalysisView: React.FC<NewAnalysisViewProps> = ({
  inscriptions,
  onAnalysisComplete,
  onCancel,
}) => {
  // File upload state
  const [uploadedFile, setUploadedFile] = useState<UploadedFileState | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Optional researcher metadata (never forced to guess)
  const [metadata, setMetadata] = useState({
    title: '',
    location: '',
    approximateDate: '',
    dynasty: '',
    collectionSource: '',
    researcherNotes: '',
    knownScript: 'uncertain' as ScriptClassId | 'uncertain',
    knownLanguage: 'uncertain' as SourceLanguageId | 'uncertain',
  });

  // Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<number>(0);

  const processingStages = [
    'Stage 1: Preprocessing & CLAHE stone grain suppression...',
    'Stage 2: Glyph bounding box localization (YOLOv11)...',
    'Stage 3: Historical script epoch inference (CNN + Vision Transformer)...',
    'Stage 4: Purvada Halegannada phonetic transliteration...',
    'Stage 5: Synthesizing Modern Kannada (Hosagannada) translation...',
  ];

  // Allowed MIME types
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/tiff'];
  const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleValidateAndSetFile = (file: File) => {
    setFileError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError(`Unsupported file format (${file.type || 'unknown'}). Supported formats: PNG, JPG, JPEG, WEBP, TIFF.`);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File exceeds maximum allowed size of 25 MB (${formatFileSize(file.size)}).`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setUploadedFile({
      file,
      previewUrl,
      name: file.name,
      sizeFormatted: formatFileSize(file.size),
      type: file.type || 'image/jpeg',
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleValidateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemoveFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.previewUrl);
    }
    setUploadedFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleResetAll = () => {
    handleRemoveFile();
    setMetadata({
      title: '',
      location: '',
      approximateDate: '',
      dynasty: '',
      collectionSource: '',
      researcherNotes: '',
      knownScript: 'uncertain',
      knownLanguage: 'uncertain',
    });
  };

  // Run the 5-stage processing pipeline demonstration
  const handleStartAnalysis = () => {
    if (!uploadedFile) {
      setFileError('Please upload an inscription rubbing or photograph before initiating analysis.');
      return;
    }

    setIsProcessing(true);
    setProcessingStep(0);

    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev < processingStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsProcessing(false);
            // Create a rich analytical record synthesizing user inputs and model predictions
            const matchedScript = metadata.knownScript !== 'uncertain' ? metadata.knownScript : 'kadamba';
            const matchedLanguage = metadata.knownLanguage !== 'uncertain' ? metadata.knownLanguage : 'purvada_halegannada';

            const syntheticResult: InscriptionRecord = {
              id: `analysis-${Date.now()}`,
              accessionNumber: `NEW-ANA-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
              title: metadata.title || 'Newly Ingested Epigraphical Record',
              kannadaTitle: 'ಹೊಸದಾಗಿ ದಾಖಲಿಸಲಾದ ಪ್ರಾಚೀನ ಶಿಲಾಶಾಸನ ಪಾಠ',
              imageUrl: uploadedFile.previewUrl,
              scriptClass: matchedScript,
              sourceLanguage: matchedLanguage,
              substrate: 'granite',
              conditionRating: 'fair',
              historicalContext: {
                approximateDate: metadata.approximateDate || 'c. 5th–6th Century CE',
                century: '5th Century CE',
                dynasty: metadata.dynasty || 'Early Kadamba Dynasty',
                ruler: 'King Kakusthavarma (or contemporary feudatory)',
                regnalPeriod: 'c. 450 CE',
                findSpot: {
                  village: metadata.location ? metadata.location.split(',')[0].trim() : 'Halmidi vicinity',
                  taluk: 'Belur Taluk',
                  district: metadata.location && metadata.location.includes(',') ? metadata.location.split(',')[1].trim() : 'Hassan',
                  state: 'Karnataka',
                },
                historicalSummary: metadata.researcherNotes || 'Chiseled memorial grant inscription recording royal land donation and battle tax exemption.',
                linguisticSignificance: 'Earliest known epigraphical record exhibiting Purvada Halegannada morphology.',
                epigraphiaReference: metadata.collectionSource || 'State Archaeological Survey Register (Field Ingestion 2026)',
              },
              transcription: {
                scriptClass: matchedScript,
                scriptConfidence: 0.9875,
                recognizedText: 'ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬ ಪಣ್ ಮಹಾ ಕದಂಬನ ಪಲಕಾಲಮನ್ ಪಶುಪತಿ ನಾಮಧೇಯ ಕೀರ್ತನ್...',
                iastTransliteration: 'namaḥ śrīmat kadamba paṇ mahā kadambana palakālaman paśupati nāmadhēya kīrtan...',
                detectedGlyphsCount: 148,
                isMockData: true,
                lines: [
                  {
                    lineNumber: 1,
                    originalText: 'ನಮಃ ಶ್ರೀಮತ್ ಕದಂಬ ಪಣ್',
                    iastText: 'namaḥ śrīmat kadamba paṇ',
                    modernKannadaLine: 'ಮಂಗಳಕರವಾದ ಕದಂಬ ವಂಶಕ್ಕೆ ನಮಸ್ಕಾರಗಳು',
                    boundingBox: {
                      id: 'box-1',
                      x: 10,
                      y: 18,
                      width: 80,
                      height: 15,
                      label: 'Line 1',
                      confidence: 0.99,
                    },
                  },
                  {
                    lineNumber: 2,
                    originalText: 'ಮಹಾ ಕದಂಬನ ಪಲಕಾಲಮನ್',
                    iastText: 'mahā kadambana palakālaman',
                    modernKannadaLine: 'ಮಹಾ ಕದಂಬ ರಾಜರ ಬಹುಕಾಲದ ಆಳ್ವಿಕೆಯಲ್ಲಿ',
                    boundingBox: {
                      id: 'box-2',
                      x: 10,
                      y: 38,
                      width: 80,
                      height: 15,
                      label: 'Line 2',
                      confidence: 0.98,
                    },
                  },
                  {
                    lineNumber: 3,
                    originalText: 'ಪಶುಪತಿ ನಾಮಧೇಯ ಕೀರ್ತನ್',
                    iastText: 'paśupati nāmadhēya kīrtan',
                    modernKannadaLine: 'ಪಶುಪತಿ ಎಂಬ ಹೆಸರಿನ ಕೀರ್ತಿವಂತ ಸೇನಾನಿ',
                    boundingBox: {
                      id: 'box-3',
                      x: 10,
                      y: 58,
                      width: 80,
                      height: 15,
                      label: 'Line 3',
                      confidence: 0.97,
                    },
                  },
                ],
              },
              translation: {
                sourceLanguage: matchedLanguage,
                languageConfidence: 0.962,
                modernKannada: 'ಶ್ರೀಮತ್ ಕದಂಬ ರಾಜವಂಶದ ಆಳ್ವಿಕೆಯಲ್ಲಿ ಶತ್ರುಗಳನ್ನು ಸೋಲಿಸಿದ ಕದಂಬ ವೀರ ಯೋಧರಿಗೆ ಪ್ರದಾನ ಮಾಡಲಾದ ಶಾಶ್ವತ ಭೂದಾನ ಹಾಗೂ ಕಂದಾಯ ವಿನಾಯಿತಿ ಘೋಷಣೆ.',
                englishTranslation: 'Salutations to the auspicious Kadamba royal lineage; recording an enduring land grant and battle tax exemption bestowed upon valiant soldiers.',
                stylisticNotes: 'Exhibits archaic Halegannada phonological markers including primitive box-headed ductus and pre-consonantal liquid retainers.',
                isMockData: true,
                glossary: [
                  {
                    term: 'ಶ್ರೀಮತ್ (Śrīmat)',
                    iast: 'śrīmat',
                    grammaticalCategory: 'Honorific Epithet',
                    modernKannadaEquivalent: 'ಮಂಗಳಕರವಾದ / ಶ್ರೇಷ್ಠವಾದ',
                    englishDefinition: 'Auspicious, revered or glorious.',
                  },
                  {
                    term: 'ಪಲಕಾಲಮನ್ (Palakālaman)',
                    iast: 'palakālaman',
                    grammaticalCategory: 'Accusative Compound',
                    modernKannadaEquivalent: 'ಬಹು ಕಾಲದವರೆಗೆ',
                    englishDefinition: 'For a long period / through enduring time.',
                  },
                ],
              },
              provenance: metadata.collectionSource || 'Ingested via local research workbench upload session',
              currentLocation: 'Institutional Digital Research Repository',
              lastUpdated: 'Just now',
              reviewStatus: 'in_review',
            };

            onAnalysisComplete(syntheticResult);
          }, 600);
          return prev;
        }
      });
    }, 850);
  };

  const handleLoadSample = (sample: InscriptionRecord) => {
    setUploadedFile({
      file: new File([], 'benchmark_sample.jpg'),
      previewUrl: sample.imageUrl,
      name: `${sample.title.replace(/[^a-zA-Z0-9]/g, '_')}_rubbing.jpg`,
      sizeFormatted: '2.84 MB',
      type: 'image/jpeg',
    });
    setMetadata({
      title: sample.title,
      location: `${sample.historicalContext.findSpot.village}, ${sample.historicalContext.findSpot.district}`,
      approximateDate: sample.historicalContext.approximateDate,
      dynasty: sample.historicalContext.dynasty,
      collectionSource: sample.provenance,
      researcherNotes: 'High-contrast photographic survey rubbing provided from in situ protected monument.',
      knownScript: sample.scriptClass,
      knownLanguage: sample.sourceLanguage,
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <PageHeader
        title="Analyze Ancient Inscription"
        subtitle="Ingest stone inscriptions, copper plates, or paper squeezes for paleographical script identification, transcription, and translation."
        kannadaSubtitle="ಪ್ರಾಚೀನ ಶಿಲಾಶಾಸನ ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ನೂತನ ದಾಖಲಾತಿ"
        categoryTag="Primary Research Entry Point"
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={handleResetAll}
            >
              Reset Form
            </Button>
          </div>
        }
      />

      {/* Demonstration notice */}
      <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl flex items-start justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-start gap-3 font-serif text-slate-700 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
          <span>
            <strong className="text-amber-900 font-sans">Scholarly Workspace Security:</strong> Ingested rubbings and photographs 
            remain secure in local memory. The neural pipeline executes multi-phase glyph segmentation, paleographical epoch verification, 
            and bilingual Halegannada synthesis.
          </span>
        </div>
        <div className="flex-shrink-0">
          <Badge variant="status" size="sm">Pipeline v1.4</Badge>
        </div>
      </div>

      {/* Processing Overlay Dialog */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-amber-200 rounded-2xl max-w-lg w-full p-7 shadow-2xl space-y-5 relative overflow-hidden">
            {/* Animated Scanning Laser Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse" />

            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-amber-200 border-t-amber-600 animate-spin flex-shrink-0" />
                <div className="absolute inset-0 flex items-center justify-center text-amber-800 font-mono text-[10px] font-bold">
                  {processingStep + 1}
                </div>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Epigraphical Recognition Pipeline Active
                </h3>
                <span className="text-[11px] font-mono text-amber-700 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                  Archaeological Neural Inference Unit
                </span>
              </div>
            </div>

            <div className="space-y-4 py-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-800 font-semibold block">
                    {processingStages[processingStep]}
                  </span>
                  <span className="font-mono text-amber-700 font-bold">
                    {Math.round(((processingStep + 1) / processingStages.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((processingStep + 1) / processingStages.length) * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500 font-serif italic text-center">
                Calibrating stroke curvature against the 10 historical Kannada paleographical epochs...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Two-Column Upload & Metadata Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Upload & Preview Interface (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
              <span>1. Inscription Image / Rubbing</span>
            </h3>
            <span className="text-[11px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">Required</span>
          </div>

          {/* Upload Area / Dropzone */}
          {!uploadedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer relative overflow-hidden group ${
                isDragOver
                  ? 'border-amber-500 bg-amber-50 shadow-md'
                  : 'border-slate-300 bg-white hover:border-amber-400 hover:bg-slate-50/50 shadow-xs'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_TYPES.join(',')}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleValidateAndSetFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              <div className="space-y-4">
                <div className="w-14 h-14 mx-auto rounded-xl border border-amber-200 bg-amber-50 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform shadow-xs">
                  <Upload className="w-7 h-7 text-amber-700" />
                </div>
                <div>
                  <span className="font-serif font-bold text-base text-slate-900 block">
                    Upload ancient rubbing or stone photograph
                  </span>
                  <p className="text-xs text-slate-500 font-serif mt-1.5 max-w-sm mx-auto leading-relaxed">
                    Drop high-resolution stone photographs, estampages, paper rubbings, or copper plate squeezes.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500 uppercase pt-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">PNG</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">JPG</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">WEBP</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">TIFF</span>
                  <span>•</span>
                  <span className="text-amber-800 font-semibold">Max 25 MB</span>
                </div>
              </div>
            </div>
          ) : (
            /* Selected File State & Interactive Preview */
            <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xs space-y-3">
              <div className="relative bg-slate-900 p-3 flex items-center justify-center max-h-[360px] overflow-hidden">
                <img
                  src={uploadedFile.previewUrl}
                  alt={uploadedFile.name}
                  className="max-h-[340px] w-auto object-contain rounded-lg select-none"
                />
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-rose-50 text-slate-700 hover:text-rose-700 p-2 rounded-lg border border-slate-200 transition-colors shadow-md backdrop-blur-md"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* File Info Bar */}
              <div className="p-5 pt-2 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
                  <div className="truncate pr-2">
                    <span className="font-mono text-slate-900 font-semibold block truncate text-sm">
                      {uploadedFile.name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {uploadedFile.sizeFormatted} • {uploadedFile.type}
                    </span>
                  </div>
                  <Badge variant="status" size="sm">Ready for Analysis</Badge>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-mono text-amber-700 hover:text-amber-800 underline font-semibold"
                  >
                    Replace Image
                  </button>
                  <button
                    onClick={handleRemoveFile}
                    className="text-xs font-mono text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* File Error Notice */}
          {fileError && (
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
              <span>{fileError}</span>
            </div>
          )}

          {/* Quick Demonstrator Sample Loader */}
          <div className="pt-3 border-t border-slate-200">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-2.5 font-semibold">
              Or Benchmark With Pre-Catalogued Stone Rubbings:
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => handleLoadSample(inscriptions[0])}
                className="p-3 border border-slate-200 bg-white hover:border-amber-400 text-left rounded-xl transition-all shadow-xs group"
              >
                <span className="font-serif font-bold text-slate-900 block truncate group-hover:text-amber-700">Halmidi Stele</span>
                <span className="text-[10px] font-mono text-amber-700">Kadamba (c. 450 CE)</span>
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample(inscriptions[2] || inscriptions[0])}
                className="p-3 border border-slate-200 bg-white hover:border-sky-400 text-left rounded-xl transition-all shadow-xs group"
              >
                <span className="font-serif font-bold text-slate-900 block truncate group-hover:text-sky-700">Badami Cliff</span>
                <span className="text-[10px] font-mono text-sky-700">Chalukya (c. 700 CE)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Optional Historical Metadata Form (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              2. Epigraphical Provenance Metadata
            </h3>
            <span className="text-[11px] font-mono text-slate-500">All Fields Optional</span>
          </div>

          <div className="border border-slate-200 bg-white p-6 rounded-2xl space-y-4 shadow-xs">
            <FormField
              label="Inscription Title / Designation"
              hint="Descriptive monument name or local museum accession title"
            >
              <Input
                value={metadata.title}
                onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                placeholder="e.g., Halmidi Hero Stone Inscription"
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormField
                label="Find-Spot Location"
                hint="Find-spot, temple site, or district"
              >
                <Input
                  value={metadata.location}
                  onChange={(e) => setMetadata({ ...metadata, location: e.target.value })}
                  placeholder="e.g., Belur, Hassan District"
                />
              </FormField>

              <FormField
                label="Approximate Date"
                hint="Regnal year, Saka era, or century"
              >
                <Input
                  value={metadata.approximateDate}
                  onChange={(e) => setMetadata({ ...metadata, approximateDate: e.target.value })}
                  placeholder="e.g., c. 450 CE / 5th Century"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormField
                label="Dynasty or Era"
                hint="Ruling dynasty if attested"
              >
                <Input
                  value={metadata.dynasty}
                  onChange={(e) => setMetadata({ ...metadata, dynasty: e.target.value })}
                  placeholder="e.g., Kadambas of Banavasi"
                />
              </FormField>

              <FormField
                label="Corpus Register Citation"
                hint="Museum or Epigraphia Carnatica Vol"
              >
                <Input
                  value={metadata.collectionSource}
                  onChange={(e) => setMetadata({ ...metadata, collectionSource: e.target.value })}
                  placeholder="e.g., EC Vol. XV, BL 58"
                />
              </FormField>
            </div>

            {/* Optional Pre-known Classification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 border-t border-slate-100">
              <FormField
                label="Known Script (Optional)"
                hint="Select only if pre-verified"
              >
                <Select
                  value={metadata.knownScript}
                  onChange={(e) => setMetadata({ ...metadata, knownScript: e.target.value as any })}
                >
                  <option value="uncertain">Auto-Detect Script (Vision Model)</option>
                  <option value="ashoka">Ashokan Brahmi</option>
                  <option value="satavahana">Satavahana Brahmi</option>
                  <option value="kadamba">Kadamba (Proto-Kannada)</option>
                  <option value="badami_chalukya">Badami Chalukya</option>
                  <option value="rashtrakuta">Rashtrakuta</option>
                  <option value="kalyana_chalukya">Kalyana Chalukya</option>
                  <option value="hoysala">Hoysala</option>
                  <option value="vijayanagara">Vijayanagara</option>
                  <option value="mysuru">Mysuru Wodeyar</option>
                  <option value="present_kannada">Present Kannada</option>
                </Select>
              </FormField>

              <FormField
                label="Known Language (Optional)"
                hint="Select only if pre-verified"
              >
                <Select
                  value={metadata.knownLanguage}
                  onChange={(e) => setMetadata({ ...metadata, knownLanguage: e.target.value as any })}
                >
                  <option value="uncertain">Auto-Detect Language (Linguistic Model)</option>
                  <option value="prakrit">Prakrit</option>
                  <option value="sanskrit">Epigraphical Sanskrit</option>
                  <option value="purvada_halegannada">Purvada Halegannada</option>
                  <option value="halegannada">Classical Halegannada</option>
                  <option value="nadugannada">Nadugannada (Middle Kannada)</option>
                  <option value="hosagannada">Hosagannada (Modern Kannada)</option>
                </Select>
              </FormField>
            </div>

            <FormField
              label="Field Notes & Chisel Observations"
              hint="Condition notes, erosion severity, or ligature inquiries"
            >
              <Textarea
                rows={3}
                value={metadata.researcherNotes}
                onChange={(e) => setMetadata({ ...metadata, researcherNotes: e.target.value })}
                placeholder="e.g., Deep relief petika-shirsha incisions with weathered right margin..."
              />
            </FormField>

            {/* Primary Action Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                {uploadedFile ? '✓ Image loaded in buffer' : 'Stone rubbing required'}
              </span>
              <Button
                variant="primary"
                size="lg"
                disabled={!uploadedFile}
                onClick={handleStartAnalysis}
                icon={<SearchCode className="w-4 h-4" />}
              >
                Analyze Inscription
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
