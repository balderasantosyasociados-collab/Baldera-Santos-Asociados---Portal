import React, { useState } from 'react';
import { calculateDominicanITBIS, formatDOP } from '../../utils/taxCalculations';
import { Receipt, FileSpreadsheet, Copy, Check, Info } from 'lucide-react';

interface RetentionPreset {
  id: string;
  name: string;
  description: string;
  itbisRate: number;
  itbisWithholding: number;
  isrWithholding: number;
  recommendedNCF: string;
}

const PRESETS: RetentionPreset[] = [
  {
    id: 'profesionales',
    name: 'Servicios Profesionales (Persona Física a Jurídica)',
    description: 'Abogados, contadores, médicos, ingenieros, consultores independientes.',
    itbisRate: 18,
    itbisWithholding: 30, // 30% del ITBIS
    isrWithholding: 10, // 10% del monto facturado
    recommendedNCF: 'B01 (Crédito Fiscal) o B11 (Comprobante de Compras)',
  },
  {
    id: 'alquileres',
    name: 'Alquiler Comercial (Persona Física a Jurídica)',
    description: 'Arrendamiento de locales comerciales, oficinas y bodegas.',
    itbisRate: 18,
    itbisWithholding: 100, // 100% del ITBIS
    isrWithholding: 10, // 10% ISR
    recommendedNCF: 'B01 (Crédito Fiscal) o B11',
  },
  {
    id: 'seguridad',
    name: 'Servicios de Seguridad Física y Vigilancia',
    description: 'Empresas de seguridad y guardianes (Norma 07-2009).',
    itbisRate: 18,
    itbisWithholding: 100, // 100% del ITBIS
    isrWithholding: 0,
    recommendedNCF: 'B01 (Crédito Fiscal)',
  },
  {
    id: 'tecnicos',
    name: 'Servicios Técnicos y Oficios Varios',
    description: 'Mantenimiento, carpintería, fontanería, albañilería.',
    itbisRate: 18,
    itbisWithholding: 30,
    isrWithholding: 2, // 2% ISR
    recommendedNCF: 'B01 o B11',
  },
  {
    id: 'corporativo',
    name: 'Transacción B2B Ordinaria (Entre Sociedades Jurídicas)',
    description: 'Compra de bienes o servicios entre dos personas jurídicas (SRL, SA, SAS).',
    itbisRate: 18,
    itbisWithholding: 0,
    isrWithholding: 0,
    recommendedNCF: 'B01 (Crédito Fiscal) o e-CF E31',
  },
];

export const ITBISCalculator: React.FC = () => {
  const [subtotalInput, setSubtotalInput] = useState<string>('50000');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('profesionales');
  const [itbisRate, setItbisRate] = useState<number>(18);
  const [itbisWithholding, setItbisWithholding] = useState<number>(30);
  const [isrWithholding, setIsrWithholding] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  const parsedSubtotal = parseFloat(subtotalInput) || 0;

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = PRESETS.find((p) => p.id === presetId);
    if (found) {
      setItbisRate(found.itbisRate);
      setItbisWithholding(found.itbisWithholding);
      setIsrWithholding(found.isrWithholding);
    }
  };

  const result = calculateDominicanITBIS(parsedSubtotal, itbisRate, itbisWithholding, isrWithholding);
  const currentPreset = PRESETS.find((p) => p.id === selectedPresetId);

  const handleCopy = () => {
    const text = `Desglose de ITBIS y Retenciones DGII - Baldera Santos & Asociados
Subtotal Facturado: ${formatDOP(result.subtotal)}
ITBIS (${result.itbisRate}%): ${formatDOP(result.itbisAmount)}
Total Factura Bruto: ${formatDOP(result.totalWithTax)}
Retención ITBIS (${result.itbisWithholdingRate}%): -${formatDOP(result.itbisWithheld)}
Retención ISR (${result.isrWithholdingRate}%): -${formatDOP(result.isrWithheld)}
Total Retenciones a pagar a la DGII: ${formatDOP(result.totalWithholdings)}
Monto Neto a Pagar al Proveedor: ${formatDOP(result.netPayableToVendor)}
NCF Sugerido: ${currentPreset?.recommendedNCF || 'B01'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="border-b border-slate-200 pb-5 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Receipt className="w-6 h-6 text-amber-600" />
              Calculadora de ITBIS y Retenciones Tributarias (DGII)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Desglose exacto de retención de ITBIS (Norma 02-05) y retención en la fuente de ISR (Art. 309).
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Desglose Copiado' : 'Copiar Desglose'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Parameters */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label htmlFor="itbis-subtotal-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Subtotal del Servicio o Compra (RD$)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                RD$
              </span>
              <input
                id="itbis-subtotal-input"
                type="number"
                min="0"
                step="1000"
                value={subtotalInput}
                onChange={(e) => setSubtotalInput(e.target.value)}
                className="w-full pl-14 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-slate-900 font-semibold"
                placeholder="50000"
              />
            </div>
          </div>

          {/* Preset Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Régimen de Operación / Tipo de Proveedor
            </label>
            <div className="space-y-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetChange(preset.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedPresetId === preset.id
                      ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-semibold text-xs text-slate-900">{preset.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{preset.description}</div>
                  <div className="mt-1 flex items-center gap-2 text-[10px] font-mono text-amber-800">
                    <span>Ret. ITBIS: {preset.itbisWithholding}%</span>
                    <span>·</span>
                    <span>Ret. ISR: {preset.isrWithholding}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rates adjustment */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-medium">Tasa de ITBIS:</span>
              <div className="flex gap-1">
                {[18, 16, 0].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setItbisRate(rate)}
                    className={`px-2 py-0.5 text-xs rounded border font-mono ${
                      itbisRate === rate
                        ? 'bg-amber-600 text-white font-bold border-amber-600'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-medium">Retención ITBIS:</span>
              <div className="flex gap-1">
                {[0, 30, 100].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setItbisWithholding(rate)}
                    className={`px-2 py-0.5 text-xs rounded border font-mono ${
                      itbisWithholding === rate
                        ? 'bg-amber-600 text-white font-bold border-amber-600'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-medium">Retención ISR:</span>
              <div className="flex gap-1">
                {[0, 2, 5, 10, 27].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setIsrWithholding(rate)}
                    className={`px-2 py-0.5 text-xs rounded border font-mono ${
                      isrWithholding === rate
                        ? 'bg-amber-600 text-white font-bold border-amber-600'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
              Monto Líquido a Pagar al Proveedor
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-emerald-400 mt-1 tabular-nums">
              {formatDOP(result.netPayableToVendor)}
            </div>
            <div className="text-xs text-slate-300 mt-2 flex items-center justify-between border-t border-slate-800 pt-2">
              <span>Total Retenciones retenidas a remitir a la DGII:</span>
              <span className="font-mono font-bold text-amber-300">
                {formatDOP(result.totalWithholdings)}
              </span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 text-sm overflow-hidden">
            <div className="p-3.5 flex justify-between items-center">
              <span className="text-slate-600 font-medium">Monto Facturado (Subtotal)</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {formatDOP(result.subtotal)}
              </span>
            </div>

            <div className="p-3.5 flex justify-between items-center bg-slate-50/50">
              <div>
                <span className="text-slate-700 font-medium block">ITBIS Facturado ({result.itbisRate}%)</span>
                <span className="text-xs text-slate-500">Monto total de impuesto generado</span>
              </div>
              <span className="font-mono font-semibold text-slate-800 tabular-nums">
                + {formatDOP(result.itbisAmount)}
              </span>
            </div>

            <div className="p-3.5 flex justify-between items-center bg-slate-100/70 font-semibold">
              <span className="text-slate-800">Total Factura Bruto</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {formatDOP(result.totalWithTax)}
              </span>
            </div>

            <div className="p-3.5 flex justify-between items-center text-rose-700 bg-rose-50/30">
              <div>
                <span className="font-medium block">Retención de ITBIS ({result.itbisWithholdingRate}%)</span>
                <span className="text-xs text-rose-600">Declarar en IT-1 / IR-17 mes siguiente</span>
              </div>
              <span className="font-mono font-bold tabular-nums">
                - {formatDOP(result.itbisWithheld)}
              </span>
            </div>

            <div className="p-3.5 flex justify-between items-center text-rose-700 bg-rose-50/30">
              <div>
                <span className="font-medium block">Retención de ISR ({result.isrWithholdingRate}%)</span>
                <span className="text-xs text-rose-600">Declarar en IR-17 a más tardar el día 20</span>
              </div>
              <span className="font-mono font-bold tabular-nums">
                - {formatDOP(result.isrWithheld)}
              </span>
            </div>
          </div>

          {/* Formato 606 & NCF advice */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/90 rounded-lg text-xs space-y-2 text-amber-950">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <FileSpreadsheet className="w-4 h-4 text-amber-700" />
              Impacto en Formatos DGII de su Empresa:
            </div>
            <p className="leading-relaxed">
              En el <strong>Formato 606</strong> (columna 8), declare el subtotal{' '}
              <strong className="font-mono">{formatDOP(result.subtotal)}</strong>; en la columna 11 reporte{' '}
              <strong className="font-mono">{formatDOP(result.itbisAmount)}</strong>; y en la columna de ITBIS Retenido{' '}
              <strong className="font-mono">{formatDOP(result.itbisWithheld)}</strong>.
            </p>
            <div className="text-[11px] text-amber-800 pt-1">
              NCF recomendado: <strong>{currentPreset?.recommendedNCF}</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
