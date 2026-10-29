import React from 'react';
import { FIRM_INFO } from '../data/firmData';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center font-serif text-slate-950 font-bold text-lg">
                BS&A
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white block">
                  Baldera Santos & Asociados
                </span>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-medium">
                  Consultoría Fiscal · Contable · TSS
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Firma profesional dedicada a la gestión fiscal, igualas contables, autoliquidación de nómina en la TSS y asesoría corporativa integral para personas físicas y jurídicas en la República Dominicana.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Miembros certificados conforme a las normativas del ICPARD y DGII.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Página Principal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('servicios')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Servicios Fiscales y Contables
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('herramientas')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Calculadoras de ISR, Prestaciones e ITBIS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('cotizador')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Cotizador Inteligente de Igualas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('calendario')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Calendario Oficial DGII & TSS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('faq')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Preguntas Frecuentes Tributarias
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Coordinates */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Información de Contacto
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Calle Orlando Martínez No. 49, Villa Eloisa, Santo Domingo Este, República Dominicana.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="font-mono text-slate-300">
                  <div>+1 (829) 771-7390 (WhatsApp)</div>
                  <div>+1 (809) 697-8570</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a
                  href="mailto:balderasantosyasociados@gmail.com"
                  className="font-mono text-slate-300 hover:text-amber-300"
                >
                  balderasantosyasociados@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Baldera Santos & Asociados. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px]">Ley 11-92 Código Tributario · Ley 16-92 Laboral</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
