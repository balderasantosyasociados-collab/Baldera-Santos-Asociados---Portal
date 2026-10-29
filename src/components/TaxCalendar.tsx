import React, { useState } from 'react';
import { TAX_CALENDAR_EVENTS } from '../data/firmData';
import { TaxCalendarEvent } from '../types';
import { Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle, ShieldAlert, Download } from 'lucide-react';

export const TaxCalendar: React.FC = () => {
  const [selectedAgency, setSelectedAgency] = useState<string>('all');

  const filteredEvents = TAX_CALENDAR_EVENTS.filter((e) => {
    if (selectedAgency === 'all') return true;
    return e.agency === selectedAgency;
  });

  const handleDownloadCalendarGuide = () => {
    const content = `CALENDARIO TRIBUTARIO Y VENCIMIENTOS DGII / TSS - BALDERA SANTOS & ASOCIADOS
Oficina: Calle Orlando Martínez No. 49, Villa Eloisa, Santo Domingo Este
Tel: +1 (829) 771-7390 | Email: balderasantosyasociados@gmail.com

OBLIGACIONES MENSUALES RECURRENTES EN REPÚBLICA DOMINICANA:

1. DÍA 03 DE CADA MES:
   - Tesorería de la Seguridad Social (TSS - SUIR): Pago de coberturas SFS, AFP y SRL.
   - Consecuencia de mora: 5% recargo primer mes + 1% progresivo mensual y suspensión médica a empleados.

2. DÍA 15 DE CADA MES:
   - Formatos Informativos DGII: Formato 606 (Compras), Formato 607 (Ventas), Formato 608 (Anulados).
   - Consecuencia de incumplimiento: Multas de 5 a 30 salarios mínimos (Art. 257 Código Tributario).

3. DÍA 20 DE CADA MES:
   - Declaración de ITBIS (Formulario IT-1).
   - Declaración de Retenciones en la Fuente y Retribuciones Complementarias (Formulario IR-17).
   - Consecuencia de atraso: 10% recargo primer mes + 4% indemnizatorio acumulativo + 1.10% interés mensual.

4. DECLARACIONES ANUALES:
   - IR-2 (Sociedades Comerciales): A más tardar 120 días después del cierre contable (30 de abril para cierre 31 dic).
   - IR-1 (Personas Físicas): A más tardar el último día laborable de febrero de cada año.

Baldera Santos & Asociados se encarga de que su empresa cumpla puntualmente con cada uno de estos plazos.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Calendario_Fiscal_RD_Baldera_Santos.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
            Plazos y Vencimientos Oficiales
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
            Calendario Fiscal Dominicano 2025 – 2026
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Mantenga su empresa protegida de recargos e intereses indemnizatorios conociendo los hitos críticos de la DGII y la TSS.
          </p>
        </div>

        {/* Agency Filter + Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
            {[
              { id: 'all', label: 'Todos los Vencimientos' },
              { id: 'DGII', label: 'Impuestos Internos (DGII)' },
              { id: 'TSS', label: 'Seguridad Social (TSS)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedAgency(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedAgency === f.id
                    ? 'bg-slate-900 text-amber-400 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleDownloadCalendarGuide}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 hover:border-slate-400 text-slate-800 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>Descargar Guía de Vencimientos</span>
          </button>
        </div>

        {/* Events Cards */}
        <div className="max-w-5xl mx-auto space-y-4">
          {filteredEvents.map((evt, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                {/* Date Badge */}
                <div className="w-16 h-16 rounded-xl bg-slate-900 text-amber-400 flex flex-col items-center justify-center shrink-0 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    DÍA
                  </span>
                  <span className="font-serif text-2xl font-bold leading-none">
                    {evt.day.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-mono text-amber-300">
                    {evt.type}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      {evt.agency}
                    </span>
                    {evt.code && (
                      <span className="font-mono text-xs text-amber-700 font-semibold">
                        [{evt.code}]
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex items-start gap-1.5 text-xs text-rose-700 bg-rose-50/60 p-2 rounded-lg mt-2 border border-rose-100">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>
                      <strong>Sanción por mora:</strong> {evt.consequence}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status pill */}
              <div className="shrink-0 w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Obligatorio
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Supervisado por BS&A
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Warning Notice */}
        <div className="max-w-5xl mx-auto bg-amber-50/80 border border-amber-200/90 rounded-xl p-5 flex items-start gap-3 text-xs text-amber-950">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-900">
              Régimen Sancionatorio de la DGII (Artículos 251 y 252 del Código Tributario):
            </h4>
            <p className="leading-relaxed">
              El atraso en el pago de tributos como el ITBIS conlleva un recargo del <strong>10% por el primer mes</strong> o fracción de mes de atraso, sumado a un <strong>4% mensual adicional progresivo</strong> y un interés indemnizatorio del <strong>1.10% acumulativo mensual</strong>. En Baldera Santos & Asociados blindamos a nuestros clientes realizando cierres con días de antelación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
