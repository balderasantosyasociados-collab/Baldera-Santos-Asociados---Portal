import React, { useRef, useState, useEffect } from 'react';
import { SignatureType } from '../../types/forensic';
import { PenTool, Upload, FileSignature, RotateCcw, Check, Image as ImageIcon } from 'lucide-react';

interface SignaturePadProps {
  currentType: SignatureType;
  currentDataUrl?: string;
  onSaveSignature: (type: SignatureType, dataUrl?: string) => void;
  auditorName: string;
  exequatur: string;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  currentType,
  currentDataUrl,
  onSaveSignature,
  auditorName,
  exequatur,
}) => {
  const [activeTab, setActiveTab] = useState<SignatureType>(currentType || 'image');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | undefined>(currentDataUrl);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Canvas drawing handlers
  useEffect(() => {
    if (activeTab === 'canvas' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [activeTab]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setPreviewDataUrl(dataUrl);
      onSaveSignature('canvas', dataUrl);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPreviewDataUrl(undefined);
    onSaveSignature('canvas', undefined);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewDataUrl(dataUrl);
      onSaveSignature('image', dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPhysical = () => {
    setActiveTab('physical');
    onSaveSignature('physical', undefined);
  };

  return (
    <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <FileSignature className="w-4 h-4 text-amber-600" />
          Firma Oficial del Perito / Auditor
        </label>
        <span className="text-[11px] text-slate-500 font-mono">
          Válida para Dictamen Judicial
        </span>
      </div>

      {/* Tabs */}
      <div className="flex rounded-lg bg-slate-200/80 p-1 gap-1 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('image')}
          className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'image' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Cargar Imagen</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('canvas')}
          className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'canvas' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Dibujar en Línea</span>
        </button>

        <button
          type="button"
          onClick={handleSelectPhysical}
          className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'physical' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Firma Física (Impresión)</span>
        </button>
      </div>

      {/* Tab: Upload */}
      {activeTab === 'image' && (
        <div className="space-y-3">
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-amber-500 transition-colors bg-white">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id={`sig-upload-${auditorName.replace(/\s+/g, '')}`}
            />
            <label
              htmlFor={`sig-upload-${auditorName.replace(/\s+/g, '')}`}
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-700">
                <span className="font-bold text-amber-700">Haga clic para seleccionar</span> o pegue archivo de firma digital (PNG / JPG)
              </div>
              <span className="text-[10px] text-slate-400">Recomendado: fondo transparente</span>
            </label>
          </div>

          {previewDataUrl && (
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={previewDataUrl}
                  alt="Firma del auditor"
                  className="h-12 max-w-[140px] object-contain border border-slate-100 bg-slate-50 p-1 rounded"
                />
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Imagen vinculada
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPreviewDataUrl(undefined);
                  onSaveSignature('image', undefined);
                }}
                className="text-xs text-rose-600 hover:underline cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Canvas */}
      {activeTab === 'canvas' && (
        <div className="space-y-2">
          <div className="relative border border-slate-300 rounded-xl bg-white overflow-hidden shadow-inner">
            <canvas
              ref={canvasRef}
              width={420}
              height={140}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-32 cursor-crosshair touch-none"
            />
            <div className="absolute bottom-1 right-2 flex items-center gap-1 text-[10px] text-slate-400 select-none pointer-events-none">
              Dibuje su rúbrica con mouse o pantalla táctil
            </div>
          </div>
          <div className="flex justify-between items-center text-xs">
            <button
              type="button"
              onClick={clearCanvas}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 flex items-center gap-1 rounded hover:bg-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpiar trazo</span>
            </button>
            <span className="text-slate-500 text-[11px]">
              {previewDataUrl ? 'Firma capturada automáticamente' : 'Esperando trazo...'}
            </span>
          </div>
        </div>
      )}

      {/* Tab: Physical signature */}
      {activeTab === 'physical' && (
        <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2 text-center">
          <div className="font-semibold text-slate-800">
            Modo Renglón para Firma Física en Papel
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">
            Al imprimir o exportar a PDF, se generará el renglón formal para que <strong>{auditorName}</strong> estampe su firma manuscrita y sello profesional en tinta.
          </p>
          <div className="w-48 h-8 border-b-2 border-slate-800 mx-auto mt-3"></div>
          <span className="text-[10px] font-mono text-slate-400 block">{exequatur}</span>
        </div>
      )}
    </div>
  );
};
