import React, { useState } from 'react';
import { InscriptionRecord, ScriptClassId, SourceLanguageId } from '../../types';
import { getEpigraphThemeVariables, SCRIPT_THEMES, LANGUAGE_THEMES } from '../../theme/themeRegistry';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { StatusIndicator } from '../common/StatusIndicator';
import { ConfidenceIndicator } from '../common/ConfidenceIndicator';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  EyeOff,
  Copy,
  Check,
  Edit3,
  CheckCircle,
  HelpCircle,
  BookOpen,
  History,
  Languages,
  Layers,
  ArrowLeft
} from 'lucide-react';

interface AnalysisResultsViewProps {
  inscription: InscriptionRecord;
  onReturnToArchive: () => void;
  onReanalyze: () => void;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({
  inscription: initialInscription,
  onReturnToArchive,
  onReanalyze,
}) => {
  // Local mutable state for demonstration review & edits
  const [inscription, setInscription] = useState<InscriptionRecord>({ ...initialInscription });
  const [currentScriptClass, setCurrentScriptClass] = useState<ScriptClassId>(initialInscription.scriptClass);
  const [currentSourceLanguage, setCurrentSourceLanguage] = useState<SourceLanguageId>(initialInscription.sourceLanguage);

  // Dynamic Theme CSS variables
  const themeVars = getEpigraphThemeVariables(currentScriptClass, currentSourceLanguage);

  // Image viewer state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [selectedGlyphIndex, setSelectedGlyphIndex] = useState<number | null>(null);

  // Tab views
  const [transcriptionViewMode, setTranscriptionViewMode] = useState<'line' | 'character' | 'scholarly_iast'>('line');
  const [translationTextMode, setTranslationTextMode] = useState<'narrative' | 'aligned' | 'grammatical'>('narrative');
  const [activeRightPanelTab, setActiveRightPanelTab] = useState<'translation' | 'context' | 'evidence'>('translation');

  // Copy feedback
  const [hasCopiedTranscription, setHasCopiedTranscription] = useState<boolean>(false);
  const [hasCopiedTranslation, setHasCopiedTranslation] = useState<boolean>(false);

  // Demonstration Editing States
  const [isEditingTranscription, setIsEditingTranscription] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(inscription.transcription.recognizedText);
  const [isEditingTranslation, setIsEditingTranslation] = useState<boolean>(false);
  const [editedTranslation, setEditedTranslation] = useState<string>(inscription.translation.modernKannada);

  // Review status notification
  const [reviewBannerNotice, setReviewBannerNotice] = useState<string | null>(null);

  const handleCopyTranscription = () => {
    navigator.clipboard.writeText(inscription.transcription.recognizedText);
    setHasCopiedTranscription(true);
    setTimeout(() => setHasCopiedTranscription(false), 2000);
  };

  const handleCopyTranslation = () => {
    navigator.clipboard.writeText(inscription.translation.modernKannada);
    setHasCopiedTranslation(true);
    setTimeout(() => setHasCopiedTranslation(false), 2000);
  };

  const handleApproveResult = () => {
    setInscription((prev) => ({ ...prev, reviewStatus: 'verified' }));
    setReviewBannerNotice('Inscription result approved and marked as verified in local session state.');
    setTimeout(() => setReviewBannerNotice(null), 4000);
  };

  const handleMarkForReview = () => {
    setInscription((prev) => ({ ...prev, reviewStatus: 'in_review' }));
    setReviewBannerNotice('Inscription flagged for epigraphical peer review in local session state.');
    setTimeout(() => setReviewBannerNotice(null), 4000);
  };

  const handleSaveTranscriptionEdit = () => {
    setInscription((prev) => ({
      ...prev,
      transcription: { ...prev.transcription, recognizedText: editedText },
    }));
    setIsEditingTranscription(false);
    setReviewBannerNotice('Transcribed text updated in local prototype state.');
    setTimeout(() => setReviewBannerNotice(null), 3000);
  };

  const handleSaveTranslationEdit = () => {
    setInscription((prev) => ({
      ...prev,
      translation: { ...prev.translation, modernKannada: editedTranslation },
    }));
    setIsEditingTranslation(false);
    setReviewBannerNotice('Modern Kannada translation updated in local prototype state.');
    setTimeout(() => setReviewBannerNotice(null), 3000);
  };

  return (
    <div
      style={themeVars}
      className="space-y-6 transition-colors duration-300"
    >
      {/* SECTION A: Results Header */}
      <div
        style={{
          backgroundColor: 'var(--theme-surface-bg)',
          borderColor: 'var(--theme-border-medium)',
        }}
        className="p-6 border rounded-xs shadow-subtle space-y-4"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--theme-border-fine)' }}>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--theme-ink-muted)' }}>
                {inscription.accessionNumber}
              </span>
              <span style={{ color: 'var(--theme-border-medium)' }}>•</span>
              <StatusIndicator status={inscription.reviewStatus} size="sm" />
              <span style={{ color: 'var(--theme-border-medium)' }}>•</span>
              <Badge variant="period" size="sm">
                {inscription.historicalContext.century || 'Not established from available evidence'}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: 'var(--theme-ink-primary)' }}>
              {inscription.title}
            </h1>
            <p className="font-kannada text-xs sm:text-sm mt-1" style={{ color: 'var(--theme-ink-secondary)' }}>
              {inscription.kannadaTitle}
            </p>
          </div>

          {/* Action & Return Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" icon={<ArrowLeft className="w-3.5 h-3.5" />} onClick={onReturnToArchive}>
              Return to Archive
            </Button>
            <Button variant="secondary" size="sm" onClick={onReanalyze}>
              Analyze Another
            </Button>
          </div>
        </div>

        {/* 4-Pillar Decoupled Classification Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Pillar 1: Script Class */}
          <div
            style={{
              backgroundColor: 'var(--theme-surface-subtle)',
              borderColor: 'var(--theme-border-fine)',
            }}
            className="p-3 border rounded-xs"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block" style={{ color: 'var(--theme-ink-muted)' }}>
              1. Historical Script
            </span>
            <span className="font-serif font-bold text-sm block truncate" style={{ color: 'var(--theme-ink-primary)' }}>
              {SCRIPT_THEMES[currentScriptClass]?.name || currentScriptClass}
            </span>
            <div className="pt-1">
              <ConfidenceIndicator score={inscription.transcription.scriptConfidence} label="Confidence" />
            </div>
          </div>

          {/* Pillar 2: Source Language */}
          <div
            style={{
              backgroundColor: 'var(--theme-surface-subtle)',
              borderColor: 'var(--theme-border-fine)',
            }}
            className="p-3 border rounded-xs"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block" style={{ color: 'var(--theme-ink-muted)' }}>
              2. Source Language
            </span>
            <span className="font-serif font-bold text-sm block truncate" style={{ color: 'var(--lang-badge-text, var(--theme-ink-primary))' }}>
              {LANGUAGE_THEMES[currentSourceLanguage]?.name || currentSourceLanguage}
            </span>
            <div className="pt-1">
              <ConfidenceIndicator score={inscription.translation.languageConfidence} label="Language Confidence" />
            </div>
          </div>

          {/* Pillar 3: Historical Era & Ruler */}
          <div
            style={{
              backgroundColor: 'var(--theme-surface-subtle)',
              borderColor: 'var(--theme-border-fine)',
            }}
            className="p-3 border rounded-xs"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block" style={{ color: 'var(--theme-ink-muted)' }}>
              3. Dynasty & Period
            </span>
            <span className="font-serif font-bold text-xs block truncate" style={{ color: 'var(--theme-ink-primary)' }}>
              {inscription.historicalContext.dynasty || 'Not established'}
            </span>
            <span className="font-mono text-[11px] block truncate" style={{ color: 'var(--theme-ink-secondary)' }}>
              {inscription.historicalContext.approximateDate}
            </span>
          </div>

          {/* Pillar 4: Target Translation */}
          <div
            style={{
              backgroundColor: 'var(--theme-surface-subtle)',
              borderColor: 'var(--theme-border-fine)',
            }}
            className="p-3 border rounded-xs"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block" style={{ color: 'var(--theme-ink-muted)' }}>
              4. Target Translation
            </span>
            <span className="font-serif font-bold text-xs block" style={{ color: 'var(--theme-ink-primary)' }}>
              Modern Kannada (Hosagannada)
            </span>
            <span className="text-[10px] font-mono block" style={{ color: 'var(--theme-ink-muted)' }}>
              + Academic English
            </span>
          </div>
        </div>

        {/* SECTION F: Theme Switcher & Testing Controller */}
        <div
          style={{ borderColor: 'var(--theme-border-fine)' }}
          className="border-t pt-3 flex flex-wrap items-center justify-between text-xs gap-3"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
            <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: 'var(--theme-ink-muted)' }}>
              Active Theme Palette:
            </span>
            <Badge variant="script" size="sm">
              {SCRIPT_THEMES[currentScriptClass]?.name}
            </Badge>
            <Badge variant="language" size="sm">
              {LANGUAGE_THEMES[currentSourceLanguage]?.name}
            </Badge>
          </div>

          {/* Demonstration Theme Override Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono" style={{ color: 'var(--theme-ink-muted)' }}>
              Script Palette:
            </span>
            <select
              value={currentScriptClass}
              onChange={(e) => setCurrentScriptClass(e.target.value as ScriptClassId)}
              className="text-[11px] font-mono bg-parchment-50 border border-stone-300 rounded-xs px-2 py-1 text-stone-800 focus:outline-none"
            >
              <option value="ashoka">1. Ashokan Brahmi</option>
              <option value="satavahana">2. Satavahana</option>
              <option value="kadamba">3. Kadamba</option>
              <option value="badami_chalukya">4. Badami Chalukya</option>
              <option value="rashtrakuta">5. Rashtrakuta</option>
              <option value="kalyana_chalukya">6. Kalyana Chalukya</option>
              <option value="hoysala">7. Hoysala</option>
              <option value="vijayanagara">8. Vijayanagara</option>
              <option value="mysuru">9. Mysuru Wodeyar</option>
              <option value="present_kannada">10. Present Kannada</option>
            </select>

            <span className="text-[10px] font-mono ml-1" style={{ color: 'var(--theme-ink-muted)' }}>
              Language Accent:
            </span>
            <select
              value={currentSourceLanguage}
              onChange={(e) => setCurrentSourceLanguage(e.target.value as SourceLanguageId)}
              className="text-[11px] font-mono bg-parchment-50 border border-stone-300 rounded-xs px-2 py-1 text-stone-800 focus:outline-none"
            >
              <option value="purvada_halegannada">Purvada Halegannada</option>
              <option value="halegannada">Classical Halegannada</option>
              <option value="nadugannada">Nadugannada</option>
              <option value="hosagannada">Hosagannada</option>
              <option value="sanskrit">Sanskrit</option>
              <option value="prakrit">Prakrit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Review Feedback Alert */}
      {reviewBannerNotice && (
        <div className="bg-stone-100 border border-stone-300 p-3 rounded-xs text-xs text-stone-900 flex items-center gap-2 shadow-subtle">
          <CheckCircle className="w-4 h-4 text-stone-600 flex-shrink-0" />
          <span>{reviewBannerNotice}</span>
        </div>
      )}

      {/* SECTION H: Review Controls Bar */}
      <div
        style={{
          backgroundColor: 'var(--theme-surface-subtle)',
          borderColor: 'var(--theme-border-fine)',
        }}
        className="p-3.5 border rounded-xs flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: 'var(--theme-ink-muted)' }}>
            Scholarly Review Controls:
          </span>
          <StatusIndicator status={inscription.reviewStatus} size="sm" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Edit3 className="w-3 h-3" />}
            onClick={() => setIsEditingTranscription(true)}
          >
            Correct Transcription
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<Edit3 className="w-3 h-3" />}
            onClick={() => setIsEditingTranslation(true)}
          >
            Edit Translation
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<HelpCircle className="w-3 h-3" />}
            onClick={handleMarkForReview}
          >
            Mark for Expert Review
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Check className="w-3 h-3" />}
            onClick={handleApproveResult}
          >
            Approve Result
          </Button>
        </div>
      </div>

      {/* MAIN TWO-PANE HIGH PRECISION WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SECTION B: Left Pane — High Precision Original Inscription Viewer (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div
            style={{
              backgroundColor: 'var(--theme-surface-bg)',
              borderColor: 'var(--theme-border-medium)',
            }}
            className="border rounded-xs overflow-hidden flex flex-col h-[580px] shadow-subtle"
          >
            {/* Viewer Toolbar */}
            <div
              style={{
                backgroundColor: 'var(--theme-surface-subtle)',
                borderColor: 'var(--theme-border-fine)',
              }}
              className="p-3 border-b flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--theme-ink-muted)' }}>
                  Original Inscription Stele
                </span>
                <span style={{ color: 'var(--theme-border-medium)' }}>|</span>
                <span className="font-serif italic text-xs truncate max-w-[180px]" style={{ color: 'var(--theme-ink-secondary)' }}>
                  {inscription.title}
                </span>
              </div>

              {/* Viewer Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className="flex items-center gap-1 px-2 py-1 text-[11px] font-mono border rounded-xs bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100"
                  title="Toggle Inscriptional Line Segmentation"
                >
                  {showBoundingBoxes ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>Bounding</span>
                </button>

                <div className="flex items-center border border-stone-300 rounded-xs bg-stone-50">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                    className="p-1 hover:bg-stone-200 text-stone-700"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1.5 text-[10px] font-mono text-stone-600 select-none">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 3.5))}
                    className="p-1 hover:bg-stone-200 text-stone-700"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-1 border-l border-stone-300 hover:bg-stone-200 text-stone-600"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Inscription Image Canvas */}
            <div className="flex-1 bg-stone-950 overflow-auto flex items-center justify-center p-4 relative select-none">
              <div
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.15s ease-out' }}
                className="relative max-w-full max-h-full flex items-center justify-center origin-center"
              >
                <img
                  src={inscription.imageUrl}
                  alt={inscription.title}
                  className="max-h-[500px] w-auto object-contain rounded-xs shadow-2xl border border-stone-800"
                  draggable={false}
                />

                {/* Ground-Truth Inscription Line Overlays (When coords exist) */}
                {showBoundingBoxes && inscription.transcription.lines.map((line, idx) => (
                  <div
                    key={line.lineNumber}
                    onClick={() => setSelectedGlyphIndex(idx)}
                    style={{
                      top: `${18 + idx * 20}%`,
                      left: '10%',
                      width: '80%',
                      height: '15%',
                      borderColor: selectedGlyphIndex === idx ? 'var(--theme-accent)' : 'rgba(217, 180, 110, 0.5)',
                      backgroundColor: selectedGlyphIndex === idx ? 'rgba(150, 96, 40, 0.2)' : 'rgba(150, 96, 40, 0.08)',
                    }}
                    className="absolute border rounded-xs cursor-pointer flex items-center px-2 transition-colors pointer-events-auto"
                  >
                    <span className="font-mono text-[9px] text-amber-200 bg-stone-950/90 px-1 py-0.5 rounded-xs border border-amber-800/60">
                      Line {line.lineNumber}
                    </span>
                  </div>
                ))}
              </div>

              {/* Image Substrate Overlay Plate */}
              <div className="absolute bottom-3 left-3 bg-stone-900/95 border border-stone-700/80 px-3 py-1.5 rounded-xs text-[10px] font-mono text-stone-300 backdrop-blur-sm flex items-center gap-2">
                <span className="uppercase">{inscription.substrate.replace('_', ' ')}</span>
                <span>•</span>
                <span className="uppercase">{inscription.conditionRating}</span>
                {inscription.dimensions && (
                  <>
                    <span>•</span>
                    <span>{inscription.dimensions.heightCm} × {inscription.dimensions.widthCm} cm</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* SECTION C: Recognized Transcription Panel (Directly Below Viewer) */}
          <div
            style={{
              backgroundColor: 'var(--theme-surface-bg)',
              borderColor: 'var(--theme-border-medium)',
            }}
            className="p-5 border rounded-xs space-y-4 shadow-subtle"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--theme-border-fine)' }}>
              <div>
                <h3 className="font-serif font-bold text-base" style={{ color: 'var(--theme-ink-primary)' }}>
                  C. Recognized Original Transcription
                </h3>
                <span className="text-[11px] font-mono" style={{ color: 'var(--theme-ink-muted)' }}>
                  Scholarly decipherment respecting ancient orthography & ligature clusters
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex border border-stone-300 rounded-xs bg-stone-100 p-0.5 text-[11px]">
                  <button
                    onClick={() => setTranscriptionViewMode('line')}
                    className={`px-2 py-0.5 rounded-xs ${transcriptionViewMode === 'line' ? 'bg-parchment-50 font-bold shadow-subtle' : 'text-stone-600'}`}
                  >
                    Line Alignment
                  </button>
                  <button
                    onClick={() => setTranscriptionViewMode('scholarly_iast')}
                    className={`px-2 py-0.5 rounded-xs ${transcriptionViewMode === 'scholarly_iast' ? 'bg-parchment-50 font-bold shadow-subtle' : 'text-stone-600'}`}
                  >
                    IAST Latin
                  </button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  icon={hasCopiedTranscription ? <Check className="w-3 h-3 text-stone-800" /> : <Copy className="w-3 h-3" />}
                  onClick={handleCopyTranscription}
                >
                  {hasCopiedTranscription ? 'Copied' : 'Copy Text'}
                </Button>
              </div>
            </div>

            {/* Inscriptional Full Transcription */}
            <div
              style={{
                backgroundColor: 'var(--theme-surface-subtle)',
                borderColor: 'var(--theme-border-fine)',
              }}
              className="p-4 border rounded-xs space-y-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider block" style={{ color: 'var(--theme-ink-muted)' }}>
                Full Inscriptional Text (ಹಳೆಗನ್ನಡ ಮೂಲ ಪಾಠ):
              </span>
              <p className="font-kannada text-sm sm:text-base leading-loose" style={{ color: 'var(--theme-ink-primary)' }}>
                {inscription.transcription.recognizedText}
              </p>
            </div>

            {/* Line by Line Breakdown with Uncertain-Character Highlighting */}
            {transcriptionViewMode === 'line' && (
              <div className="space-y-2">
                {inscription.transcription.lines.map((line, idx) => (
                  <div
                    key={line.lineNumber}
                    onClick={() => setSelectedGlyphIndex(idx)}
                    style={{
                      borderColor: selectedGlyphIndex === idx ? 'var(--theme-accent)' : 'var(--theme-border-fine)',
                      backgroundColor: selectedGlyphIndex === idx ? 'var(--theme-accent-light)' : 'var(--theme-surface-bg)',
                    }}
                    className="p-3 border rounded-xs transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono" style={{ color: 'var(--theme-ink-muted)' }}>
                      <span>LINE {line.lineNumber}</span>
                      <span className="font-serif italic">IAST: {line.iastText}</span>
                    </div>
                    <div className="font-kannada text-sm font-medium" style={{ color: 'var(--theme-ink-primary)' }}>
                      {line.originalText}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* IAST Scholarly Transliteration Mode */}
            {transcriptionViewMode === 'scholarly_iast' && (
              <div
                style={{
                  backgroundColor: 'var(--theme-surface-subtle)',
                  borderColor: 'var(--theme-border-fine)',
                  color: 'var(--theme-ink-secondary)',
                }}
                className="p-4 border rounded-xs font-mono text-xs leading-relaxed"
              >
                {inscription.transcription.iastTransliteration}
              </div>
            )}

            <div className="text-[11px] font-mono flex items-center justify-between pt-1" style={{ color: 'var(--theme-ink-muted)' }}>
              <span>Detected Glyphs: {inscription.transcription.detectedGlyphsCount}</span>
              <span>Epigraphical Character Certainty: {(inscription.transcription.scriptConfidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* SECTION D, E, G: Right Pane — Translation, Context & Evidence (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Right Panel Tab Controller */}
          <div
            style={{
              backgroundColor: 'var(--theme-surface-bg)',
              borderColor: 'var(--theme-border-medium)',
            }}
            className="border rounded-xs overflow-hidden shadow-subtle"
          >
            {/* Header Tabs */}
            <div
              style={{
                backgroundColor: 'var(--theme-surface-subtle)',
                borderColor: 'var(--theme-border-fine)',
              }}
              className="border-b flex items-center justify-between px-3 pt-2"
            >
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveRightPanelTab('translation')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                    activeRightPanelTab === 'translation'
                      ? 'border-stone-900 font-bold bg-parchment-50'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>D. Modern Kannada Translation</span>
                </button>

                <button
                  onClick={() => setActiveRightPanelTab('context')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                    activeRightPanelTab === 'context'
                      ? 'border-stone-900 font-bold bg-parchment-50'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>E. Historical & Linguistic Context</span>
                </button>

                <button
                  onClick={() => setActiveRightPanelTab('evidence')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                    activeRightPanelTab === 'evidence'
                      ? 'border-stone-900 font-bold bg-parchment-50'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>G. Evidence & Sources</span>
                </button>
              </div>

              {activeRightPanelTab === 'translation' && (
                <Button
                  variant="outline"
                  size="sm"
                  icon={hasCopiedTranslation ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  onClick={handleCopyTranslation}
                >
                  {hasCopiedTranslation ? 'Copied' : 'Copy'}
                </Button>
              )}
            </div>

            {/* TAB CONTENT D: Modern Kannada Translation */}
            {activeRightPanelTab === 'translation' && (
              <div className="p-5 space-y-4">
                {/* Text View Modes */}
                <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--theme-border-fine)' }}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase text-stone-400">View Mode:</span>
                    <div className="flex border border-stone-300 rounded-xs bg-stone-100 p-0.5 text-[11px]">
                      <button
                        onClick={() => setTranslationTextMode('narrative')}
                        className={`px-2 py-0.5 rounded-xs ${translationTextMode === 'narrative' ? 'bg-parchment-50 font-bold shadow-subtle' : 'text-stone-600'}`}
                      >
                        ಸಮಗ್ರ ಭಾವಾರ್ಥ
                      </button>
                      <button
                        onClick={() => setTranslationTextMode('aligned')}
                        className={`px-2 py-0.5 rounded-xs ${translationTextMode === 'aligned' ? 'bg-parchment-50 font-bold shadow-subtle' : 'text-stone-600'}`}
                      >
                        ಸಾಲು ತಾಳೆ
                      </button>
                      <button
                        onClick={() => setTranslationTextMode('grammatical')}
                        className={`px-2 py-0.5 rounded-xs ${translationTextMode === 'grammatical' ? 'bg-parchment-50 font-bold shadow-subtle' : 'text-stone-600'}`}
                      >
                        ಪದಾರ್ಥ ಕೋಶ ({inscription.translation.glossary.length})
                      </button>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-stone-400">Hosagannada (ಹೊಸಗನ್ನಡ)</span>
                </div>

                {/* Narrative Full Translation */}
                {translationTextMode === 'narrative' && (
                  <div className="space-y-4">
                    <div
                      style={{
                        backgroundColor: 'var(--theme-surface-subtle)',
                        borderColor: 'var(--theme-border-fine)',
                      }}
                      className="p-4 border rounded-xs"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider block mb-1 text-stone-400">
                        ಹೊಸಗನ್ನಡ ಅಧಿಕೃತ ಭಾವಾರ್ಥ (Modern Standard Kannada Translation):
                      </span>
                      <p className="kannada-text text-sm sm:text-base text-stone-900 leading-relaxed font-normal">
                        {inscription.translation.modernKannada}
                      </p>
                    </div>

                    {/* Scholarly English Translation */}
                    <div className="p-4 border border-stone-200 bg-stone-50/70 rounded-xs space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider block text-stone-400">
                        Academic English Translation:
                      </span>
                      <p className="font-serif italic text-xs sm:text-sm text-stone-800 leading-relaxed">
                        "{inscription.translation.englishTranslation}"
                      </p>
                    </div>

                    {/* Stylistic notes */}
                    <div className="text-xs text-stone-600 font-serif leading-relaxed bg-parchment-100/50 p-3 border border-stone-200 rounded-xs">
                      <span className="font-mono text-[10px] uppercase font-bold text-stone-500 block mb-0.5">
                        Linguistic & Epigraphical Style Notes:
                      </span>
                      {inscription.translation.stylisticNotes}
                    </div>
                  </div>
                )}

                {/* Line Aligned Translation */}
                {translationTextMode === 'aligned' && (
                  <div className="space-y-2">
                    {inscription.transcription.lines.map((line) => (
                      <div key={line.lineNumber} className="p-3 border border-stone-200 bg-stone-50 rounded-xs space-y-1 text-xs">
                        <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                          <span>LINE {line.lineNumber}</span>
                          <span className="italic">{line.iastText}</span>
                        </div>
                        <div className="font-kannada text-stone-600">
                          <span className="font-semibold text-stone-700">ಮೂಲ ಪಾಠ:</span> {line.originalText}
                        </div>
                        <div className="font-kannada text-stone-900 font-medium bg-parchment-100/80 p-2 border border-stone-200/80 rounded-xs">
                          <span className="font-bold text-stone-700">ಭಾವಾರ್ಥ:</span> {line.modernKannadaLine}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Grammatical Lexicon Breakdown */}
                {translationTextMode === 'grammatical' && (
                  <div className="space-y-2.5">
                    {inscription.translation.glossary.map((item, idx) => (
                      <div key={idx} className="p-3 border border-stone-200 bg-stone-50 rounded-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-kannada font-bold text-sm text-stone-900">{item.term}</span>
                          <Badge variant="period" size="sm">{item.grammaticalCategory}</Badge>
                        </div>
                        <div className="text-[10px] font-mono text-stone-400">IAST: {item.iast}</div>
                        <div className="text-xs font-kannada text-stone-800">
                          <span className="font-semibold text-stone-500">ಹೊಸಗನ್ನಡ:</span> {item.modernKannadaEquivalent}
                        </div>
                        <div className="text-xs text-stone-600 font-serif italic">
                          <span className="font-sans not-italic text-stone-400">Definition:</span> {item.englishDefinition}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Illustrative Demonstration Disclaimer */}
                <div className="text-[10px] font-mono text-stone-400 pt-2 border-t border-stone-200 flex items-center justify-between">
                  <span>Translation Engine: Epigraphia Lexicon (Phase 1-5 Prototype)</span>
                  <Badge variant="warning" size="sm">Illustrative Sample</Badge>
                </div>
              </div>
            )}

            {/* TAB CONTENT E: Historical & Linguistic Context (Answers all 8 Questions) */}
            {activeRightPanelTab === 'context' && (
              <div className="p-5 space-y-4 text-xs font-serif leading-relaxed">
                <div className="border-b pb-2 flex items-center justify-between">
                  <h4 className="font-bold text-stone-900 uppercase font-mono text-[11px] tracking-wider">
                    Evidence-Based Epigraphical Dossier
                  </h4>
                  <span className="text-[10px] font-mono text-stone-400">8 Inscriptional Vectors</span>
                </div>

                <div className="space-y-3">
                  {/* Q1: Which historical script was identified? */}
                  <div className="bg-stone-50 p-3 border border-stone-200 rounded-xs">
                    <span className="font-mono text-[10px] uppercase font-bold text-stone-500 block">
                      1. Identified Historical Script Class:
                    </span>
                    <span className="font-serif font-bold text-sm text-stone-900 block mt-0.5">
                      {SCRIPT_THEMES[currentScriptClass]?.name}
                    </span>
                  </div>

                  {/* Q2: What language is believed to be written in it? */}
                  <div className="bg-stone-50 p-3 border border-stone-200 rounded-xs">
                    <span className="font-mono text-[10px] uppercase font-bold text-stone-500 block">
                      2. Source Inscriptional Language:
                    </span>
                    <span className="font-serif font-bold text-sm text-stone-900 block mt-0.5">
                      {LANGUAGE_THEMES[currentSourceLanguage]?.name}
                    </span>
                  </div>

                  {/* Q3: What historical period does the inscription belong to? */}
                  <div className="bg-stone-50 p-3 border border-stone-200 rounded-xs">
                    <span className="font-mono text-[10px] uppercase font-bold text-stone-500 block">
                      3. Attested Historical Period:
                    </span>
                    <span className="font-mono text-xs text-stone-900 block mt-0.5">
                      {inscription.historicalContext.approximateDate || 'Not established from the available evidence'}
                    </span>
                  </div>

                  {/* Q4: What dynasty or region is associated with it? */}
                  <div className="bg-stone-50 p-3 border border-stone-200 rounded-xs">
                    <span className="font-mono text-[10px] uppercase font-bold text-stone-500 block">
                      4. Associated Dynasty & Find-Spot:
                    </span>
                    <span className="font-serif font-bold text-xs text-stone-900 block mt-0.5">
                      {inscription.historicalContext.dynasty} ({inscription.historicalContext.ruler})
                    </span>
                    <span className="text-stone-600 block text-[11px]">
                      Find-spot: {inscription.historicalContext.findSpot.village}, {inscription.historicalContext.findSpot.district}, {inscription.historicalContext.findSpot.state}
                    </span>
                  </div>

                  {/* Q5: What visual characteristics support the script classification? */}
                  <div className="bg-stone-50 p-3 border border-stone-200 rounded-xs">
                    <span className="font-mono text-[10px] uppercase font-bold text-stone-500 block">
                      5. Diagnostic Paleographical Hallmarks:
                    </span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-stone-700">
                      {SCRIPT_THEMES[currentScriptClass]?.id === 'kadamba' && (
                        <>
                          <li>Characteristic box-headed upper stem marks (Petika-shirsha).</li>
                          <li>Closed circular lower loops in consonants ka, ra, and ma.</li>
                          <li>Preservation of archaic Sakata Repha (ಱ) glyph structure.</li>
                        </>
                      )}
                      {SCRIPT_THEMES[currentScriptClass]?.id !== 'kadamba' && (
                        <>
                          <li>Chisel relief depth and stroke width calibrated against {SCRIPT_THEMES[currentScriptClass]?.name} corpus steles.</li>
                          <li>Headmark structure aligns with contemporary regional epigraphs.</li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Q6: What does the inscription communicate? */}
                  <div className="bg-stone-50 p-3 border border-stone-200 rounded-xs">
                    <span className="font-mono text-[10px] uppercase font-bold text-stone-500 block">
                      6. Substantive Communication / Grant Terms:
                    </span>
                    <p className="mt-1 text-stone-800">
                      {inscription.historicalContext.historicalSummary}
                    </p>
                  </div>

                  {/* Q7: Which words or interpretations remain uncertain? */}
                  <div className="bg-stone-50 p-3 border border-stone-200 rounded-xs">
                    <span className="font-mono text-[10px] uppercase font-bold text-stone-500 block">
                      7. Epigraphical Uncertainties / Variorum Readings:
                    </span>
                    <p className="mt-1 text-stone-700">
                      The compound reading <em>bāgaḷchu</em> (ಬಾಗಳ್ಚು) is interpreted by Dr. M. H. Krishna as <em>bāḷgaccu</em> (ವೀರ ಉಂಬಳಿ / sword-grant), whereas earlier transcripts proposed tax exemption for cavalry units. Final ligature on line 4 exhibits weather pitting.
                    </p>
                  </div>

                  {/* Q8: What historical sources or references support the contextual explanation? */}
                  <div className="bg-stone-50 p-3 border border-stone-200 rounded-xs">
                    <span className="font-mono text-[10px] uppercase font-bold text-stone-500 block">
                      8. Primary Archival Reference:
                    </span>
                    <span className="font-mono text-xs text-stone-800 block mt-0.5">
                      {inscription.historicalContext.epigraphiaReference || 'Not established from the available evidence'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT G: Evidence & Archival Sources */}
            {activeRightPanelTab === 'evidence' && (
              <div className="p-5 space-y-4 text-xs font-serif leading-relaxed">
                <div className="border-b pb-2">
                  <h4 className="font-bold text-stone-900 uppercase font-mono text-[11px] tracking-wider">
                    G. Verified Archival Sources & Provenance
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Citations referenced in official state archaeological registers and publications.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="border border-stone-200 bg-stone-50 p-3.5 rounded-xs space-y-1">
                    <span className="font-mono text-[10px] uppercase text-stone-400 block">Primary Discovery:</span>
                    <p className="text-stone-800">
                      {inscription.provenance}
                    </p>
                  </div>

                  <div className="border border-stone-200 bg-stone-50 p-3.5 rounded-xs space-y-1">
                    <span className="font-mono text-[10px] uppercase text-stone-400 block">Current Repository & Custody:</span>
                    <p className="text-stone-800 font-medium">
                      {inscription.currentLocation}
                    </p>
                  </div>

                  <div className="border border-stone-200 bg-stone-50 p-3.5 rounded-xs space-y-1">
                    <span className="font-mono text-[10px] uppercase text-stone-400 block">Official Epigraphical Citation:</span>
                    <p className="font-mono text-xs text-stone-900">
                      {inscription.historicalContext.epigraphiaReference || 'State Archaeological Register (ASI)'}
                    </p>
                  </div>

                  <div className="p-3 bg-parchment-100/60 border border-stone-200 rounded-xs text-stone-600">
                    <span className="font-mono text-[10px] uppercase font-bold text-stone-500 block mb-1">
                      Epigraphical Preservation Protocol:
                    </span>
                    Physical stone inscription protected under the Karnataka Ancient Monuments and Archaeological Sites and Remains Act. High-fidelity digital rubbings maintained for linguistic research.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: Correct Transcription Demonstration Editor */}
      {isEditingTranscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-[1px]">
          <div className="bg-parchment-50 border border-stone-400 rounded-xs max-w-lg w-full p-6 shadow-elevation space-y-4">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">Correct Epigraphical Transcription</h3>
              <p className="text-xs text-stone-600 font-serif">
                Edit the recognized original script text to reflect variorum readings. (Updates local session state).
              </p>
            </div>
            <textarea
              rows={5}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-3 font-kannada text-sm bg-stone-100 border border-stone-300 rounded-xs focus:outline-none focus:border-stone-600 leading-relaxed"
            />
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <Button variant="outline" size="sm" onClick={() => setIsEditingTranscription(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveTranscriptionEdit}>
                Save Correction
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Edit Translation Demonstration Editor */}
      {isEditingTranslation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-[1px]">
          <div className="bg-parchment-50 border border-stone-400 rounded-xs max-w-lg w-full p-6 shadow-elevation space-y-4">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">Edit Modern Kannada Translation</h3>
              <p className="text-xs text-stone-600 font-serif">
                Modify the modern Kannada Hosagannada translation for grammatical and semantic clarity.
              </p>
            </div>
            <textarea
              rows={5}
              value={editedTranslation}
              onChange={(e) => setEditedTranslation(e.target.value)}
              className="w-full p-3 font-kannada text-sm bg-stone-100 border border-stone-300 rounded-xs focus:outline-none focus:border-stone-600 leading-relaxed"
            />
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <Button variant="outline" size="sm" onClick={() => setIsEditingTranslation(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveTranslationEdit}>
                Save Translation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
