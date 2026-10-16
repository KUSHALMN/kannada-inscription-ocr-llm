import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Sparkles, Sliders } from 'lucide-react';
import { InscriptionRecord } from '../../types';

interface ImageInspectorProps {
  inscription: InscriptionRecord;
}

export const ImageInspector: React.FC<ImageInspectorProps> = ({ inscription }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [invertContrast, setInvertContrast] = useState<boolean>(false);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setActiveLine(null);
  };

  return (
    <div className="border border-white/10 bg-[#0B0F17] rounded-2xl overflow-hidden flex flex-col h-[540px] shadow-elevation">
      {/* Top Inspector Floating Glass Toolbar */}
      <div className="bg-[#0F1521]/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between text-stone-300 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Stone Glyph Canvas
          </span>
          <span className="text-white/20">|</span>
          <span className="text-white font-serif italic text-xs truncate max-w-[200px]">
            {inscription.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Contrast Invert Button */}
          <button
            onClick={() => setInvertContrast(!invertContrast)}
            className={`p-1.5 rounded-lg border text-xs font-mono transition-colors ${
              invertContrast
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-glow-amber'
                : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
            }`}
            title="Invert Estampage Contrast"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          {/* Line Overlays Toggle */}
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-mono border transition-all ${
              showOverlays
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-glow-amber'
                : 'bg-white/5 border-white/10 text-stone-400 hover:text-stone-200'
            }`}
            title="Toggle segmented glyph bounding boxes"
          >
            {showOverlays ? <Eye className="w-3.5 h-3.5 text-amber-400" /> : <EyeOff className="w-3.5 h-3.5 text-stone-500" />}
            <span>Glyph Halos</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center bg-black/40 border border-white/15 rounded-lg overflow-hidden">
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-white/10 text-stone-300 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-xs font-mono text-amber-300 font-bold select-none min-w-[45px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-white/10 text-stone-300 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 border-l border-white/10 hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
              title="Reset zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Image Canvas */}
      <div className="flex-1 overflow-auto bg-[#070A10] flex items-center justify-center p-6 relative select-none">
        <div
          style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
          className="relative max-w-full max-h-full flex items-center justify-center origin-center"
        >
          <img
            src={inscription.imageUrl}
            alt={inscription.title}
            className={`max-h-[420px] w-auto object-contain rounded-lg shadow-elevation border border-white/15 select-none transition-all duration-300 ${
              invertContrast ? 'filter invert contrast-125 brightness-90' : ''
            }`}
            draggable={false}
          />

          {/* Interactive glowing bounding boxes */}
          {showOverlays && (
            <div className="absolute inset-0 pointer-events-none">
              {inscription.transcription.lines.map((line, i) => {
                const isSelected = activeLine === line.lineNumber;
                return (
                  <div
                    key={line.lineNumber}
                    onClick={() => setActiveLine(isSelected ? null : line.lineNumber)}
                    style={{
                      top: `${20 + i * 18}%`,
                      left: '12%',
                      width: '76%',
                      height: '14%'
                    }}
                    className={`absolute rounded-md flex items-center px-2.5 transition-all duration-200 pointer-events-auto cursor-pointer ${
                      isSelected
                        ? 'border-2 border-amber-400 bg-amber-400/25 shadow-glow-amber ring-2 ring-amber-400/40'
                        : 'border border-amber-400/60 bg-amber-500/10 hover:border-amber-300 hover:bg-amber-400/20 hover:shadow-glow-amber'
                    }`}
                  >
                    <span className="font-mono text-[9px] text-stone-950 font-bold bg-amber-400 px-1.5 py-0.5 rounded shadow-sm">
                      L{line.lineNumber}
                    </span>
                    <span className="ml-2 text-xs font-kannada text-amber-200 truncate drop-shadow-sm font-medium">
                      {line.originalText}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Stone details overlay pill */}
        <div className="absolute bottom-4 left-4 bg-black/85 border border-white/15 px-3.5 py-1.5 rounded-lg text-xs font-mono text-stone-300 backdrop-blur-md flex items-center gap-2.5 shadow-lg">
          <span className="text-amber-300 font-semibold">{inscription.substrate.replace('_', ' ').toUpperCase()}</span>
          <span className="text-white/20">•</span>
          <span className="text-emerald-400">{inscription.conditionRating.toUpperCase()}</span>
          {inscription.dimensions && (
            <>
              <span className="text-white/20">•</span>
              <span className="text-stone-400">{inscription.dimensions.heightCm} × {inscription.dimensions.widthCm} cm</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
