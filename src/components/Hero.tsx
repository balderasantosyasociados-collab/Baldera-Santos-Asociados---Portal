import React from 'react';
import { ArrowRight, Calculator, FileCheck, MapPin, Phone, Building2 } from 'lucide-react';
import { FIRM_INFO } from '../data/firmData';

interface HeroProps {
  onNavigate: (tab: string) => void;
  onOpenAppointment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenAppointment }) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      {/* Background subtle architectural pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Firma de Consultoría y Servicios Profesionales · RD
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5.5xl font-bold tracking-tight text-white leading-tight">
              Precisión Contable, Estrategia Fiscal y Solidez Empresarial
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              En <strong className="text-white font-semibold">Baldera Santos & Asociados</strong> acompañamos a
              empresarios, sociedades y profesionales de la República Dominicana en su cumplimiento tributario
              ante la <strong className="text-amber-300 font-semibold">DGII</strong>, liquidaciones puntuales en la{' '}
              <strong className="text-amber-300 font-semibold">TSS</strong> e igualas contables diseñadas para
              potenciar su rentabilidad y tranquilidad jurídica.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('cotizador')}
                className="px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Cotizar Iguala Contable</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('herramientas')}
                className="px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-white font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer hover:border-slate-500"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Calculadoras Fiscales</span>
              </button>

              <button
                onClick={onOpenAppointment}
                className="px-5 py-3.5 rounded-lg text-slate-300 hover:text-white font-medium text-sm transition-colors hover:underline cursor-pointer"
              >
                Agendar Asesoría →
              </button>
            </div>

            {/* Quick credentials row */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <div className="font-serif text-2xl font-bold text-white flex items-center gap-1">
                  100%
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Cumplimiento en DGII y TSS</div>
              </div>

              <div>
                <div className="font-serif text-2xl font-bold text-amber-400 flex items-center gap-1">
                  606 / 607
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Envíos y comprobantes NCF</div>
              </div>

              <div>
                <div className="font-serif text-2xl font-bold text-white flex items-center gap-1">
                  Ley 11-92
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Blindaje y defensa tributaria</div>
              </div>
            </div>
          </div>

          {/* Quick Consultation & Coordinates Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
              <div className="border-b border-slate-700/60 pb-4">
                <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase block mb-1">
                  Atención Directa & Sede
                </span>
                <h2 className="font-serif text-xl font-bold text-white">
                  Baldera Santos & Asociados
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Consultoría Tributaria, Financiera y Auditoría
                </p>
              </div>

              {/* Coordinates list */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="font-medium text-white block">Ubicación de Oficina:</span>
                    <span className="text-slate-300 text-xs leading-relaxed">
                      Calle Orlando Martínez No. 49, Villa Eloisa, Santo Domingo Este, República Dominicana.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="font-medium text-white block">Líneas de Atención:</span>
                    <div className="flex flex-col gap-0.5 font-mono text-xs text-amber-200">
                      <a href="tel:+18297717390" className="hover:underline">
                        +1 (829) 771-7390 (WhatsApp disponible)
                      </a>
                      <a href="tel:+18096978570" className="hover:underline">
                        +1 (809) 697-8570
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="font-medium text-white block">Especialidades Centrales:</span>
                    <span className="text-slate-300 text-xs">
                      Igualas Contables · IR-2 · IR-1 · IT-1 · TSS · Nóminas · Formatos 606 y 607.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action pill inside card */}
              <div className="pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Solicitar Diagnóstico Fiscal Gratuito</span>
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Respuesta garantizada en menos de 24 horas laborables
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
