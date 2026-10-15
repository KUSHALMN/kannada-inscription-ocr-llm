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
      <div className="bg-stone-100 border border-stone-300 p-3.5 rounded-xs flex items-start justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5 font-serif text-stone-700 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-stone-600 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Prototype Architecture Notice:</strong> Selected files remain entirely inside your browser memory 
            and are not uploaded to an external server. The analysis action triggers our verified demonstration pipeline 
            to showcase the dual-pane transcription comparator, language-aware themes, and historical context panels.
          </span>
        </div>
        <div className="flex-shrink-0">
          <Badge variant="period" size="sm">Phase 4</Badge>
        </div>
      </div>

      {/* Processing Overlay Dialog */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-[2px]">
          <div className="bg-parchment-50 border border-stone-400 rounded-xs max-w-lg w-full p-6 shadow-elevation space-y-4">
            <div className="flex items-center gap-3 border-b border-heritage-border pb-3">
              <div className="w-8 h-8 rounded-full border-2 border-stone-400 border-t-stone-900 animate-spin flex-shrink-0" />
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Epigraphical Recognition Pipeline Running
                </h3>
                <span className="text-[11px] font-mono text-stone-500">
                  Karnataka Archaeological Processing Unit
                </span>
              </div>
            </div>

            <div className="space-y-3 py-2">
              <div className="bg-stone-100 p-3 rounded-xs border border-stone-200">
                <span className="font-mono text-xs text-stone-800 font-semibold block mb-1">
                  {processingStages[processingStep]}
                </span>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-stone-800 h-full transition-all duration-300"
                    style={{ width: `${((processingStep + 1) / processingStages.length) * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-stone-500 font-serif italic text-center">
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
          <div className="border-b border-heritage-border pb-2 flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-stone-900">
              1. Inscription Image / Rubbing
            </h3>
            <span className="text-[11px] font-mono text-stone-400">Required</span>
          </div>

          {/* Upload Area / Dropzone */}
          {!uploadedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-xs p-8 text-center transition-all cursor-pointer ${
                isDragOver
                  ? 'border-stone-700 bg-stone-200/50'
                  : 'border-stone-300 bg-stone-50/70 hover:border-stone-500 hover:bg-stone-100/50'
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

              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto rounded-xs border border-stone-300 bg-parchment-100 flex items-center justify-center text-stone-600 shadow-subtle">
                  <Upload className="w-6 h-6 text-stone-700" />
                </div>
                <div>
                  <span className="font-serif font-bold text-sm text-stone-900 block">
                    Choose an image or drag & drop here
                  </span>
                  <p className="text-xs text-stone-500 font-serif mt-1">
                    Supports high-resolution stone photographs, paper rubbings, and copper plate squeezes.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-stone-400 uppercase pt-2">
                  <span>PNG</span>
                  <span>•</span>
                  <span>JPG</span>
                  <span>•</span>
                  <span>WEBP</span>
                  <span>•</span>
                  <span>TIFF</span>
                  <span>•</span>
                  <span>Max 25 MB</span>
                </div>
              </div>
            </div>
          ) : (
            /* Selected File State & Interactive Preview */
            <div className="border border-heritage-border bg-parchment-50 rounded-xs overflow-hidden shadow-subtle space-y-3">
              <div className="relative bg-stone-950 p-2 flex items-center justify-center max-h-[340px] overflow-hidden">
                <img
                  src={uploadedFile.previewUrl}
                  alt={uploadedFile.name}
                  className="max-h-[320px] w-auto object-contain rounded-xs select-none"
                />
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 bg-stone-900/80 hover:bg-stone-900 text-stone-200 p-1.5 rounded-xs border border-stone-700 transition-colors shadow-subtle"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* File Info Bar */}
              <div className="p-4 pt-1 space-y-2">
                <div className="flex items-center justify-between text-xs border-b border-heritage-border pb-2">
                  <div className="truncate pr-2">
                    <span className="font-mono text-stone-800 font-semibold block truncate">
                      {uploadedFile.name}
                    </span>
                    <span className="text-[11px] font-mono text-stone-500">
                      {uploadedFile.sizeFormatted} • {uploadedFile.type}
                    </span>
                  </div>
                  <Badge variant="period" size="sm">Ready for Analysis</Badge>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-mono text-stone-600 hover:text-stone-900 underline"
                  >
                    Replace Image
                  </button>
                  <button
                    onClick={handleRemoveFile}
                    className="text-xs font-mono text-heritage-terracotta hover:underline"
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
          <div className="pt-2 border-t border-heritage-border/70">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 block mb-2">
              Or Test With Archival Sample:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleLoadSample(inscriptions[0])}
                className="p-2 border border-stone-300 bg-stone-100 hover:bg-stone-200 text-left rounded-xs transition-colors"
              >
                <span className="font-serif font-bold text-stone-900 block truncate">Halmidi Stele</span>
                <span className="text-[10px] font-mono text-stone-500">Kadamba (c. 450 CE)</span>
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample(inscriptions[2] || inscriptions[0])}
                className="p-2 border border-stone-300 bg-stone-100 hover:bg-stone-200 text-left rounded-xs transition-colors"
              >
                <span className="font-serif font-bold text-stone-900 block truncate">Badami Cliff</span>
                <span className="text-[10px] font-mono text-stone-500">Chalukya (c. 700 CE)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Optional Historical Metadata Form (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="border-b border-heritage-border pb-2 flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-stone-900">
              2. Historical & Provenance Metadata
            </h3>
            <span className="text-[11px] font-mono text-stone-400">All Fields Optional</span>
          </div>

          <div className="border border-heritage-border bg-parchment-50 p-5 rounded-xs space-y-4 shadow-subtle">
            <FormField
              label="Inscription Title / Designation"
              hint="Descriptive name or local register title"
            >
              <Input
                value={metadata.title}
                onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                placeholder="e.g., Halmidi Hero Stone Inscription"
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                label="Known Location"
                hint="Find-spot, village, taluk, or district"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                label="Dynasty or Historical Period"
                hint="Ruling dynasty if attested"
              >
                <Input
                  value={metadata.dynasty}
                  onChange={(e) => setMetadata({ ...metadata, dynasty: e.target.value })}
                  placeholder="e.g., Kadambas of Banavasi"
                />
              </FormField>

              <FormField
                label="Source / Collection"
                hint="Museum or Epigraphia Carnatica Vol"
              >
                <Input
                  value={metadata.collectionSource}
                  onChange={(e) => setMetadata({ ...metadata, collectionSource: e.target.value })}
                  placeholder="e.g., EC Vol. XV, BL 58"
                />
              </FormField>
            </div>

            {/* Optional Pre-known Classification (Researcher never forced to guess) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-heritage-border/70">
              <FormField
                label="Known Script (Optional)"
                hint="Select only if pre-verified"
              >
                <Select
                  value={metadata.knownScript}
                  onChange={(e) => setMetadata({ ...metadata, knownScript: e.target.value as any })}
                >
                  <option value="uncertain">Uncertain (Automated Classification)</option>
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
                  <option value="uncertain">Uncertain (Automated Identification)</option>
                  <option value="prakrit">Prakrit</option>
                  <option value="sanskrit">Epigraphical Sanskrit</option>
                  <option value="purvada_halegannada">Purvada Halegannada (Early Old Kannada)</option>
                  <option value="halegannada">Classical Halegannada</option>
                  <option value="nadugannada">Nadugannada (Middle Kannada)</option>
                  <option value="hosagannada">Hosagannada (Modern Kannada)</option>
                </Select>
              </FormField>
            </div>

            <FormField
              label="Researcher Notes"
              hint="Condition notes, chisel depth, or specific research queries"
            >
              <Textarea
                rows={3}
                value={metadata.researcherNotes}
                onChange={(e) => setMetadata({ ...metadata, researcherNotes: e.target.value })}
                placeholder="e.g., Sandstone slab discovered during temple excavation. Headmark shows characteristic petika-shirsha box incision..."
              />
            </FormField>

            {/* Primary Action Button */}
            <div className="pt-3 border-t border-heritage-border flex items-center justify-between">
              <span className="text-[11px] font-mono text-stone-500">
                {uploadedFile ? 'Ready to analyze' : 'Image required'}
              </span>
              <Button
                variant="primary"
                size="md"
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
