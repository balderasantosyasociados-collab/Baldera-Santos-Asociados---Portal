import React, { useState } from 'react';
import { ISRCalculator } from './ISRCalculator';
import { LaborSeveranceCalculator } from './LaborSeveranceCalculator';
import { ITBISCalculator } from './ITBISCalculator';
import { RNCValidator } from './RNCValidator';
import { Format606Helper } from './Format606Helper';
import { Calculator, Briefcase, Receipt, ShieldCheck, FileSpreadsheet } from 'lucide-react';

interface ToolsContainerProps {
  initialSubTab?: string;
}

export const ToolsContainer: React.FC<ToolsContainerProps> = ({ initialSubTab = 'isr' }) => {
  const [activeTool, setActiveTool] = useState<string>(initialSubTab);

  const tools = [
    { id: 'isr', label: 'Retención de ISR', icon: Calculator, desc: 'DGII Art. 296 & TSS' },
    { id: 'prestaciones', label: 'Prestaciones Laborales', icon: Briefcase, desc: 'Ley 16-92 RD' },
    { id: 'itbis', label: 'ITBIS y Retenciones', icon: Receipt, desc: 'Norma 02-05 & Art. 309' },
    { id: 'rnc', label: 'Validador RNC / Cédula', icon: ShieldCheck, desc: 'Control oficial DGII' },
    { id: 'f606', label: 'Asistente Formato 606', icon: FileSpreadsheet, desc: 'Compras y gastos' },
  ];

  return (
    <section className="py-12 bg-slate-100/60 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
            Herramientas Fiscales y Laborales Interactivas
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
            Centro de Cálculos Tributarios de la República Dominicana
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Diseñadas por los especialistas de <strong>Baldera Santos & Asociados</strong> para que empresarios y contribuyentes estimen retenciones y obligaciones con precisión matemática.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-xs max-w-4xl mx-auto">
          {tools.map((t) => {
            const Icon = t.icon;
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-amber-400 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tool Rendering */}
        <div className="transition-opacity duration-200">
          {activeTool === 'isr' && <ISRCalculator />}
          {activeTool === 'prestaciones' && <LaborSeveranceCalculator />}
          {activeTool === 'itbis' && <ITBISCalculator />}
          {activeTool === 'rnc' && <RNCValidator />}
          {activeTool === 'f606' && <Format606Helper />}
        </div>
      </div>
    </section>
  );
};
