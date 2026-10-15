import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { InscriptionRecord } from '../../types';

interface ImageInspectorProps {
  inscription: InscriptionRecord;
}

export const ImageInspector: React.FC<ImageInspectorProps> = ({ inscription }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="border border-heritage-border bg-stone-900 rounded-xs overflow-hidden flex flex-col h-[520px]">
      {/* Top Inspector Toolbar */}
      <div className="bg-stone-800 border-b border-stone-700/80 px-4 py-2.5 flex items-center justify-between text-stone-300 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-stone-400">EPIGRAPH IMAGE INSPECTOR</span>
          <span className="text-stone-600">|</span>
          <span className="text-stone-300 font-serif italic text-xs truncate max-w-[200px]">
            {inscription.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-xs font-mono border transition-colors ${
              showOverlays
                ? 'bg-stone-700 border-stone-600 text-stone-200'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
            title="Toggle segmented line annotations"
          >
            {showOverlays ? <Eye className="w-3.5 h-3.5 text-stone-300" /> : <EyeOff className="w-3.5 h-3.5 text-stone-500" />}
            <span>Line Bounding</span>
          </button>

          <div className="flex items-center bg-stone-900 border border-stone-700 rounded-xs">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-stone-800 text-stone-300 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono text-stone-400 select-none">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-stone-800 text-stone-300 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 border-l border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-stone-200"
              title="Reset zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Image Canvas */}
      <div className="flex-1 overflow-auto bg-stone-950 flex items-center justify-center p-4 relative">
        <div
          style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.15s ease-out' }}
          className="relative max-w-full max-h-full flex items-center justify-center origin-center"
        >
          <img
            src={inscription.imageUrl}
            alt={inscription.title}
            className="max-h-[440px] w-auto object-contain rounded-xs shadow-2xl border border-stone-800 select-none"
            draggable={false}
          />

          {/* Demonstration line overlay bounding boxes */}
          {showOverlays && (
            <div className="absolute inset-0 pointer-events-none">
              {inscription.transcription.lines.map((line, i) => (
                <div
                  key={line.lineNumber}
                  style={{
                    top: `${20 + i * 18}%`,
                    left: '12%',
                    width: '76%',
                    height: '14%'
                  }}
                  className="absolute border border-heritage-ochre/60 bg-heritage-ochre/10 rounded-xs flex items-center px-2"
                >
                  <span className="font-mono text-[9px] text-amber-200 bg-stone-900/80 px-1 py-0.5 rounded-xs border border-amber-900/50">
                    L{line.lineNumber}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stone details overlay pill */}
        <div className="absolute bottom-3 left-3 bg-stone-900/90 border border-stone-700/80 px-3 py-1.5 rounded-xs text-[11px] font-mono text-stone-400 backdrop-blur-sm flex items-center gap-2">
          <span>{inscription.substrate.replace('_', ' ').toUpperCase()}</span>
          <span>•</span>
          <span>{inscription.conditionRating.toUpperCase()}</span>
          {inscription.dimensions && (
            <>
              <span>•</span>
              <span>{inscription.dimensions.heightCm} × {inscription.dimensions.widthCm} cm</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
