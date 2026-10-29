import React, { useState } from 'react';
import { calculateDominicanSeverance, formatDOP } from '../../utils/taxCalculations';
import { Briefcase, AlertCircle, Copy, Check } from 'lucide-react';

export const LaborSeveranceCalculator: React.FC = () => {
  const [monthlySalary, setMonthlySalary] = useState<string>('45000');
  const [startDate, setStartDate] = useState<string>('2023-02-01');
  const [endDate, setEndDate] = useState<string>('2026-10-15');
  const [terminationType, setTerminationType] = useState<'desahucio' | 'renuncia' | 'despido_justificado'>('desahucio');
  const [preavisoGiven, setPreavisoGiven] = useState<boolean>(false);
  const [vacationsTaken, setVacationsTaken] = useState<boolean>(false);
  const [monthsWorkedThisYear, setMonthsWorkedThisYear] = useState<string>('10');
  const [copied, setCopied] = useState(false);

  const parsedSalary = parseFloat(monthlySalary) || 0;
  const parsedMonthsYear = parseInt(monthsWorkedThisYear, 10) || 0;

  const includePreavisoAndCesantia = terminationType === 'desahucio';
  const shouldPayPreaviso = includePreavisoAndCesantia && !preavisoGiven;

  const rawResult = calculateDominicanSeverance(
    parsedSalary,
    startDate,
    endDate,
    shouldPayPreaviso,
    vacationsTaken,
    parsedMonthsYear
  );

  // If voluntary resignation or justified dismissal, cesantia is 0
  const finalPreavisoAmount = includePreavisoAndCesantia ? rawResult.preavisoAmount : 0;
  const finalCesantiaAmount = includePreavisoAndCesantia ? rawResult.cesantiaAmount : 0;
  const finalPreavisoDays = includePreavisoAndCesantia ? rawResult.preavisoDays : 0;
  const finalCesantiaDays = includePreavisoAndCesantia ? rawResult.cesantiaDays : 0;

  const grandTotal = +(
    finalPreavisoAmount +
    finalCesantiaAmount +
    rawResult.vacationAmount +
    rawResult.regaliaNavidadAmount
  ).toFixed(2);

  const handleCopy = () => {
    const text = `Liquidación de Prestaciones Laborales (Ley 16-92) - Baldera Santos & Asociados
Salario Mensual: ${formatDOP(parsedSalary)}
Salario Diario Promedio: ${formatDOP(rawResult.dailySalary)}
Antigüedad: ${rawResult.summaryDetails.workedYears} años, ${rawResult.summaryDetails.workedMonths} meses, ${rawResult.summaryDetails.workedDays} días
Causa: ${
      terminationType === 'desahucio'
        ? 'Desahucio Patronal'
        : terminationType === 'renuncia'
        ? 'Renuncia Voluntaria'
        : 'Despido Justificado'
    }
Preaviso (${finalPreavisoDays} días): ${formatDOP(finalPreavisoAmount)}
Cesantía (${finalCesantiaDays} días): ${formatDOP(finalCesantiaAmount)}
Vacaciones no tomadas (${rawResult.vacationDays} días): ${formatDOP(rawResult.vacationAmount)}
Regalía Pascual (Salario Navidad): ${formatDOP(rawResult.regaliaNavidadAmount)}
TOTAL PRESTACIONES Y DERECHOS ADQUIRIDOS: ${formatDOP(grandTotal)}`;

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
              <Briefcase className="w-6 h-6 text-amber-600" />
              Calculadora de Prestaciones Laborales (Ley 16-92 RD)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Liquidación de preaviso, auxilio de cesantía, vacaciones y regalía pascual conforme al Código de Trabajo.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Liquidación Copiada' : 'Copiar Liquidación'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label htmlFor="sev-salary-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Salario Ordinario Mensual (RD$)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                RD$
              </span>
              <input
                id="sev-salary-input"
                type="number"
                min="0"
                step="500"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                className="w-full pl-14 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-slate-900 font-semibold"
                placeholder="45000"
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Salario diario de cálculo (dividido entre 23.83):{' '}
              <strong className="text-slate-700 font-mono">{formatDOP(rawResult.dailySalary)}</strong>
            </span>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="sev-start-date" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Fecha de Ingreso
              </label>
              <input
                id="sev-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label htmlFor="sev-end-date" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Fecha de Salida
              </label>
              <input
                id="sev-end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Termination reason */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Causa de Terminación del Contrato
            </label>
            <div className="space-y-2">
              <label className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="terminationType"
                  value="desahucio"
                  checked={terminationType === 'desahucio'}
                  onChange={() => setTerminationType('desahucio')}
                  className="mt-0.5 text-amber-600 focus:ring-amber-500"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">Desahucio por el Empleador</span>
                  <span className="text-slate-500">Aplica Preaviso + Cesantía + Vacaciones + Regalía.</span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="terminationType"
                  value="renuncia"
                  checked={terminationType === 'renuncia'}
                  onChange={() => setTerminationType('renuncia')}
                  className="mt-0.5 text-amber-600 focus:ring-amber-500"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">Renuncia Voluntaria (Dimisión sin justa causa)</span>
                  <span className="text-slate-500">No aplica preaviso ni cesantía. Solo derechos adquiridos.</span>
                </div>
              </label>
            </div>
          </div>

          {/* Toggles */}
          {terminationType === 'desahucio' && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span className="text-slate-700 font-medium">¿El empleador notificó el preaviso para trabajarlo?</span>
                <input
                  type="checkbox"
                  checked={preavisoGiven}
                  onChange={(e) => setPreavisoGiven(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
              </label>
              {preavisoGiven && (
                <p className="text-[11px] text-amber-800">
                  * Si el colaborador laboró su período de preaviso, este monto no se abona en dinero.
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <label className="block text-xs text-slate-700 font-medium mb-1">
                ¿Tomó vacaciones este año?
              </label>
              <select
                value={vacationsTaken ? 'yes' : 'no'}
                onChange={(e) => setVacationsTaken(e.target.value === 'yes')}
                className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white"
              >
                <option value="no">No las ha tomado (pagar)</option>
                <option value="yes">Sí, ya las disfrutó</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <label htmlFor="sev-regalia-months" className="block text-xs text-slate-700 font-medium mb-1">
                Meses laborados año actual:
              </label>
              <input
                id="sev-regalia-months"
                type="number"
                min="0"
                max="12"
                value={monthsWorkedThisYear}
                onChange={(e) => setMonthsWorkedThisYear(e.target.value)}
                className="w-full text-xs p-1.5 border border-slate-300 rounded font-mono bg-white"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
              Total Liquidación / Prestaciones
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 mt-1 tabular-nums">
              {formatDOP(grandTotal)}
            </div>
            <div className="text-xs text-slate-300 mt-2 flex items-center justify-between border-t border-slate-800 pt-2">
              <span>Tiempo de servicio computado:</span>
              <span className="font-semibold text-white">
                {rawResult.summaryDetails.workedYears} años, {rawResult.summaryDetails.workedMonths} meses, {rawResult.summaryDetails.workedDays} días
              </span>
            </div>
          </div>

          {/* Breakdown table */}
          <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 text-sm overflow-hidden">
            <div className="p-3.5 flex justify-between items-center">
              <div>
                <span className="font-medium text-slate-900 block">Preaviso (Art. 76)</span>
                <span className="text-xs text-slate-500 font-mono">
                  {finalPreavisoDays} días × {formatDOP(rawResult.dailySalary)}
                </span>
              </div>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {formatDOP(finalPreavisoAmount)}
              </span>
            </div>

            <div className="p-3.5 flex justify-between items-center">
              <div>
                <span className="font-medium text-slate-900 block">Auxilio de Cesantía (Art. 80)</span>
                <span className="text-xs text-slate-500 font-mono">
                  {finalCesantiaDays} días acumulados
                </span>
              </div>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {formatDOP(finalCesantiaAmount)}
              </span>
            </div>

            <div className="p-3.5 flex justify-between items-center">
              <div>
                <span className="font-medium text-slate-900 block">Vacaciones Pendientes (Art. 177)</span>
                <span className="text-xs text-slate-500 font-mono">
                  {rawResult.vacationDays} días compensables
                </span>
              </div>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {formatDOP(rawResult.vacationAmount)}
              </span>
            </div>

            <div className="p-3.5 flex justify-between items-center bg-amber-50/30">
              <div>
                <span className="font-medium text-slate-900 block">Salario de Navidad / Regalía Pascual (Art. 219)</span>
                <span className="text-xs text-slate-500 font-mono">
                  {parsedMonthsYear} meses trabajados en el año actual (exenta de ISR y TSS)
                </span>
              </div>
              <span className="font-mono font-bold text-amber-700 tabular-nums">
                {formatDOP(rawResult.regaliaNavidadAmount)}
              </span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Importante para empleadores en RD:</strong> El pago de las prestaciones laborales debe realizarse dentro de los 10 días siguientes a la terminación del contrato, so pena de pagar un día de salario por cada día de retardo (Art. 86).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
