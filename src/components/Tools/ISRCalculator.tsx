import React, { useState } from 'react';
import { calculateDominicanISR, formatDOP } from '../../utils/taxCalculations';
import { Calculator, Info, Check, Copy } from 'lucide-react';

export const ISRCalculator: React.FC = () => {
  const [salaryInput, setSalaryInput] = useState<string>('65000');
  const [period, setPeriod] = useState<'monthly' | 'biweekly'>('monthly');
  const [copied, setCopied] = useState(false);

  const parsedSalary = parseFloat(salaryInput.replace(/[^0-9.]/g, '')) || 0;
  const monthlySalary = period === 'biweekly' ? parsedSalary * 2 : parsedSalary;

  const result = calculateDominicanISR(monthlySalary);

  const presets = [35000, 50000, 65000, 85000, 120000, 180000];

  const handleCopy = () => {
    const text = `Cálculo de Retención ISR - Baldera Santos & Asociados
Sueldo Bruto Mensual: ${formatDOP(result.monthlyGrossSalary)}
Descuento AFP (2.87%): ${formatDOP(result.tssAFP)}
Descuento SFS (3.04%): ${formatDOP(result.tssSFS)}
Total Retención TSS (5.91%): ${formatDOP(result.totalTSS)}
Sueldo Gravable ISR: ${formatDOP(result.taxableMonthlySalary)}
Retención ISR Mensual: ${formatDOP(result.monthlyISR)}
Sueldo Neto a Recibir: ${formatDOP(result.netMonthlySalary)}
Tramo DGII: ${result.bracketDescription}`;

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
              <Calculator className="w-6 h-6 text-amber-600" />
              Calculadora de ISR para Asalariados (DGII & TSS)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Escala oficial de retención salarial según el Art. 296 del Código Tributario y Ley 87-01 de Seguridad Social.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Cálculo Copiado' : 'Copiar Resumen'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Período de Pago
            </label>
            <div className="flex rounded-lg bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setPeriod('monthly')}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  period === 'monthly'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mensual
              </button>
              <button
                type="button"
                onClick={() => setPeriod('biweekly')}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  period === 'biweekly'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Quincenal
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="salary-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              {period === 'monthly' ? 'Salario Bruto Mensual (RD$)' : 'Salario Bruto Quincenal (RD$)'}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                RD$
              </span>
              <input
                id="salary-input"
                type="number"
                min="0"
                step="500"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                className="w-full pl-14 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono text-base text-slate-900 font-semibold"
                placeholder="65000"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <span className="block text-xs text-slate-500 mb-2">Montos habituales de referencia:</span>
            <div className="flex flex-wrap gap-2">
              {presets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setPeriod('monthly');
                    setSalaryInput(val.toString());
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors cursor-pointer ${
                    monthlySalary === val
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {formatDOP(val).replace('.00', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Explanatory notes */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 text-xs text-amber-900 space-y-2">
            <div className="font-semibold flex items-center gap-1.5 text-amber-950">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              Base Legal Dominicana:
            </div>
            <p className="leading-relaxed">
              El Impuesto Sobre la Renta (ISR) grava el sueldo bruto luego de deducir el aporte del trabajador a la TSS (2.87% AFP + 3.04% SFS). La escala anual exime los primeros RD$ 416,220.00 (RD$ 34,685.00 al mes).
            </p>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 bg-slate-50 rounded-xl p-6 border border-slate-200/90 space-y-6">
          {/* Main Net Pay Banner */}
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
              {period === 'monthly' ? 'Salario Neto Mensual a Pagar' : 'Salario Neto Quincenal'}
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 mt-1 tabular-nums">
              {formatDOP(period === 'monthly' ? result.netMonthlySalary : result.netMonthlySalary / 2)}
            </div>
            <div className="text-xs text-slate-300 mt-2 flex items-center justify-between border-t border-slate-800 pt-2">
              <span>Tasa efectiva de retención ISR:</span>
              <span className="font-mono font-semibold text-white">{result.effectiveTaxRate}%</span>
            </div>
          </div>

          {/* Detailed Deductions Breakdown Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Desglose Oficial de Deducciones Mensuales
            </h4>

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden divide-y divide-slate-100 text-sm">
              <div className="p-3 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Salario Bruto Evaluado</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {formatDOP(result.monthlyGrossSalary)}
                </span>
              </div>

              <div className="p-3 flex justify-between items-center text-slate-700 bg-slate-50/50">
                <div>
                  <span className="block font-medium">Aporte AFP (Pensiones)</span>
                  <span className="text-xs text-slate-500 font-mono">2.87% del salario (Tope 20 SM)</span>
                </div>
                <span className="font-mono font-semibold text-rose-600 tabular-nums">
                  - {formatDOP(result.tssAFP)}
                </span>
              </div>

              <div className="p-3 flex justify-between items-center text-slate-700 bg-slate-50/50">
                <div>
                  <span className="block font-medium">Aporte SFS (Salud)</span>
                  <span className="text-xs text-slate-500 font-mono">3.04% del salario (Tope 10 SM)</span>
                </div>
                <span className="font-mono font-semibold text-rose-600 tabular-nums">
                  - {formatDOP(result.tssSFS)}
                </span>
              </div>

              <div className="p-3 flex justify-between items-center bg-slate-100/60 font-medium">
                <span className="text-slate-800">Total Deducciones TSS (5.91%)</span>
                <span className="font-mono font-bold text-rose-700 tabular-nums">
                  - {formatDOP(result.totalTSS)}
                </span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <div>
                  <span className="text-slate-700 font-medium">Salario Gravable para ISR</span>
                  <span className="block text-xs text-slate-500">Base mensual computable por DGII</span>
                </div>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {formatDOP(result.taxableMonthlySalary)}
                </span>
              </div>

              <div className="p-3 flex justify-between items-center bg-amber-50/40">
                <div>
                  <span className="text-slate-900 font-bold">Retención Mensual de ISR</span>
                  <span className="block text-xs text-amber-800">Remitido a la DGII en formulario IR-17</span>
                </div>
                <span className="font-mono font-bold text-rose-700 text-base tabular-nums">
                  - {formatDOP(result.monthlyISR)}
                </span>
              </div>
            </div>
          </div>

          {/* Bracket explanation */}
          <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700">
            <span className="font-semibold block text-slate-900 mb-0.5">Clasificación Tributaria:</span>
            <p>{result.bracketDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
