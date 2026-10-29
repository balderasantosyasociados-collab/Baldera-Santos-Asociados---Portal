import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, Menu, X, ShieldCheck } from 'lucide-react';
import { FIRM_INFO } from '../data/firmData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAppointment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAppointment,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'peritaje', label: 'Dictamen & Peritaje Judicial', badge: 'Nuevo' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'herramientas', label: 'Herramientas Fiscales' },
    { id: 'cotizador', label: 'Cotizador de Igualas' },
    { id: 'calendario', label: 'Calendario DGII' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all">
      {/* Top micro-bar */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs border-b border-slate-850/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Santo Domingo Este, R.D.
            </span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Especialistas en DGII · TSS · Contabilidad e Igualas</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="tel:+18297717390"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-slate-400" />
              +1 (829) 771-7390
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href="mailto:balderasantosyasociados@gmail.com"
              className="hidden sm:inline hover:text-amber-300 transition-colors"
            >
              balderasantosyasociados@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center">
                <span className="font-serif text-amber-400 font-bold text-lg tracking-wider">
                  BS&A
                </span>
              </div>
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                Baldera Santos & Asociados
              </span>
              <span className="block text-xs uppercase tracking-widest text-slate-400 font-medium">
                Consultoría Fiscal · Contable · TSS
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                    isActive
                      ? 'text-amber-400 bg-slate-800/80 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={FIRM_INFO.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-700/80 hover:bg-emerald-600 text-white transition-all shadow-sm"
              title="Escribir por WhatsApp directo"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={onOpenAppointment}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-sm cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Consulta</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAppointment}
              className="sm:hidden px-2.5 py-1.5 rounded-md text-xs font-semibold bg-amber-500 text-slate-950"
            >
              Agendar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-amber-500/10 text-amber-400 font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={FIRM_INFO.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold bg-emerald-600 text-white"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Directo (+1 829-771-7390)
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold bg-amber-500 text-slate-950"
            >
              <Calendar className="w-4 h-4" />
              Agendar Asesoría Presencial o Virtual
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
