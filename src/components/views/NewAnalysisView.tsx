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
    if (uploadedFile?.previewUrl) {
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

  const handleStartAnalysis = () => {
    setIsProcessing(true);
    setProcessingStep(0);

    // Simulated 5-stage processing pipeline
    const interval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev < processingStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            // Select appropriate demonstrative record
            // If user supplied title, reflect it in the demonstrative result
            const targetSample = { ...inscriptions[0] };
            if (metadata.title.trim()) {
              targetSample.title = metadata.title.trim();
            }
            if (uploadedFile?.previewUrl) {
              targetSample.imageUrl = uploadedFile.previewUrl;
            }
            onAnalysisComplete(targetSample);
          }, 400);
          return prev;
        }
      });
    }, 450);
  };

  // Helper to load a verified sample directly into upload slot for instant researcher demonstration
  const handleLoadSample = (sample: InscriptionRecord) => {
    setUploadedFile({
      file: new File([], `${sample.id}-archival-rubbing.jpg`, { type: 'image/jpeg' }),
      previewUrl: sample.imageUrl,
      name: `${sample.accessionNumber}_rubbing.jpg`,
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
      <div className="bg-[#0F1521]/70 border border-white/10 p-4 rounded-xl flex items-start justify-between gap-3 text-xs backdrop-blur-md shadow-sm">
        <div className="flex items-start gap-3 font-serif text-stone-300 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <span>
            <strong className="text-amber-300 font-sans">Scholarly Workspace Security:</strong> Ingested rubbings and photographs 
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0F1521] border border-amber-500/30 rounded-2xl max-w-lg w-full p-7 shadow-elevation space-y-5 relative overflow-hidden">
            {/* Animated Scanning Laser Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse" />

            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin flex-shrink-0" />
                <div className="absolute inset-0 flex items-center justify-center text-amber-400 font-mono text-[10px] font-bold">
                  {processingStep + 1}
                </div>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">
                  Epigraphical Recognition Pipeline Active
                </h3>
                <span className="text-[11px] font-mono text-amber-400/90 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                  Archaeological Neural Inference Unit
                </span>
              </div>
            </div>

            <div className="space-y-4 py-2">
              <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-stone-200 font-semibold block">
                    {processingStages[processingStep]}
                  </span>
                  <span className="font-mono text-amber-400 font-bold">
                    {Math.round(((processingStep + 1) / processingStages.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-300 shadow-glow-amber"
                    style={{ width: `${((processingStep + 1) / processingStages.length) * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-stone-400 font-serif italic text-center">
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
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <span>1. Inscription Image / Rubbing</span>
            </h3>
            <span className="text-[11px] font-mono text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 font-semibold">Required</span>
          </div>

          {/* Upload Area / Dropzone */}
          {!uploadedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer relative overflow-hidden group ${
                isDragOver
                  ? 'border-amber-400 bg-amber-500/10 shadow-glow-amber'
                  : 'border-white/15 bg-[#0F1521]/70 hover:border-amber-500/40 hover:bg-[#141C2B] shadow-sm'
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
                <div className="w-14 h-14 mx-auto rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 shadow-glow-amber transition-transform">
                  <Upload className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <span className="font-serif font-bold text-base text-white block">
                    Upload ancient rubbing or stone photograph
                  </span>
                  <p className="text-xs text-stone-400 font-serif mt-1.5 max-w-sm mx-auto leading-relaxed">
                    Drop high-resolution stone photographs, estampages, paper rubbings, or copper plate squeezes.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-stone-400 uppercase pt-2">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">PNG</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">JPG</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">WEBP</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">TIFF</span>
                  <span>•</span>
                  <span className="text-amber-400/90 font-semibold">Max 25 MB</span>
                </div>
              </div>
            </div>
          ) : (
            /* Selected File State & Interactive Preview */
            <div className="border border-white/10 bg-[#0F1521]/80 rounded-2xl overflow-hidden shadow-elevation space-y-3">
              <div className="relative bg-black p-3 flex items-center justify-center max-h-[360px] overflow-hidden">
                <img
                  src={uploadedFile.previewUrl}
                  alt={uploadedFile.name}
                  className="max-h-[340px] w-auto object-contain rounded-lg select-none"
                />
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-3 right-3 bg-black/80 hover:bg-rose-900/80 text-stone-200 hover:text-white p-2 rounded-lg border border-white/20 transition-colors shadow-md backdrop-blur-md"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* File Info Bar */}
              <div className="p-5 pt-2 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3">
                  <div className="truncate pr-2">
                    <span className="font-mono text-white font-semibold block truncate text-sm">
                      {uploadedFile.name}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">
                      {uploadedFile.sizeFormatted} • {uploadedFile.type}
                    </span>
                  </div>
                  <Badge variant="status" size="sm">Ready for Analysis</Badge>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-mono text-amber-400 hover:text-amber-300 underline"
                  >
                    Replace Image
                  </button>
                  <button
                    onClick={handleRemoveFile}
                    className="text-xs font-mono text-rose-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* File Error Notice */}
          {fileError && (
            <div className="bg-amber-50 border border-amber-300 p-3 rounded-xs text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
              <span>{fileError}</span>
            </div>
          )}

          {/* Quick Demonstrator Sample Loader */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block mb-2.5 font-semibold">
              Or Benchmark With Pre-Catalogued Stone Rubbings:
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => handleLoadSample(inscriptions[0])}
                className="p-3 border border-white/10 bg-[#0F1521]/80 hover:bg-[#141C2B] hover:border-amber-500/40 text-left rounded-xl transition-all shadow-sm group"
              >
                <span className="font-serif font-bold text-white block truncate group-hover:text-amber-300">Halmidi Stele</span>
                <span className="text-[10px] font-mono text-amber-400/80">Kadamba (c. 450 CE)</span>
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample(inscriptions[2] || inscriptions[0])}
                className="p-3 border border-white/10 bg-[#0F1521]/80 hover:bg-[#141C2B] hover:border-cyan-500/40 text-left rounded-xl transition-all shadow-sm group"
              >
                <span className="font-serif font-bold text-white block truncate group-hover:text-cyan-300">Badami Cliff</span>
                <span className="text-[10px] font-mono text-cyan-400/80">Chalukya (c. 700 CE)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Optional Historical Metadata Form (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-white">
              2. Epigraphical Provenance Metadata
            </h3>
            <span className="text-[11px] font-mono text-stone-400">All Fields Optional</span>
          </div>

          <div className="border border-white/10 bg-[#0F1521]/80 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-elevation">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 border-t border-white/10">
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
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-stone-400">
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
