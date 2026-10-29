import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/firmData';
import { ServiceItem } from '../types';
import { FileCheck, LineChart, Users, Briefcase, ArrowRight, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
  onNavigateToTools: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onNavigateToTools,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'FileCheck':
        return FileCheck;
      case 'LineChart':
        return LineChart;
      case 'Users':
        return Users;
      case 'Briefcase':
      default:
        return Briefcase;
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
            Servicios Profesionales Especializados
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Soluciones Integrales para su Empresa en República Dominicana
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Nuestro equipo multidisciplinario combina rigor técnico contable, conocimiento profundo de la normativa tributaria de la DGII y gestión laboral estratégica.
          </p>
        </div>

        {/* 4 Core Practice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_LIST.map((service, index) => {
            const Icon = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-slate-400 font-semibold">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Top deliverables previews */}
                  <div className="pt-2 space-y-2 border-t border-slate-100">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver alcance completo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectServiceForBooking(service.title)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-amber-400 transition-colors cursor-pointer"
                  >
                    Contratar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Link to Calculators */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
              ¿Desea calcular retenciones de ISR, prestaciones laborales o ITBIS ahora?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Pruebe nuestras calculadoras tributarias interactivas sin costo y con las fórmulas oficiales de la DGII.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToTools}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
          >
            <span>Ir a Calculadoras Fiscales</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
                  Alcance Detallado
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Entregables y Obligaciones que Asume la Firma:
              </h4>
              <ul className="space-y-2">
                {selectedService.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong className="text-slate-900 block mb-1">Perfil Ideal de Empresa:</strong>
              {selectedService.idealFor}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForBooking(title);
                }}
                className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                Solicitar Propuesta para este Servicio
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
