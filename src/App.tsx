/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ToolsContainer } from './components/Tools/ToolsContainer';
import { QuoteBuilder } from './components/QuoteBuilder';
import { TaxCalendar } from './components/TaxCalendar';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { CaseManager } from './components/Forensic/CaseManager';
import { FIRM_INFO } from './data/firmData';
import { MessageCircle, ShieldCheck, CheckCircle2, ArrowRight, Scale, FileSignature, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [isAppointmentOpen, setIsAppointmentOpen] = useState<boolean>(false);
  const [appointmentService, setAppointmentService] = useState<string>('Igualas Contables y Cumplimiento DGII');
  const [appointmentNotes, setAppointmentNotes] = useState<string>('');

  const handleOpenAppointment = (contextNotes?: string, serviceName?: string) => {
    if (contextNotes) setAppointmentNotes(contextNotes);
    if (serviceName) setAppointmentService(serviceName);
    setIsAppointmentOpen(true);
  };

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setAppointmentService(serviceTitle);
    setAppointmentNotes(`Interés en el servicio: ${serviceTitle}`);
    setIsAppointmentOpen(true);
  };

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'inicio' && (
          <>
            <Hero
              onNavigate={navigateTo}
              onOpenAppointment={() => handleOpenAppointment()}
            />

            {/* Quick firm presentation banner */}
            <section className="bg-white py-12 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-base">
                        Blindaje Tributario DGII
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Envío riguroso de Formatos 606 y 607, evitando multas formales, cruces fiscales inconsistentes y moras en IT-1.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-base">
                        Nóminas y TSS al Día
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Control del sistema SUIR (SFS, AFP, SRL) y planillas DGT-3 y DGT-4 del Ministerio de Trabajo sin contingencias.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-base">
                        Estados Financieros Reales
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Informes para la banca, socios y licitaciones bajo Normas Internacionales de Información Financiera (NIIF).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Judicial & Forensic Expert Module Banner */}
            <section className="bg-slate-900 text-white py-10 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="space-y-2 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                      <Scale className="w-3.5 h-3.5" />
                      Módulo Judicial & Ministerio Público
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Dictamen e Informe Pericial Forense Irrefutable
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Generado exclusivamente a partir de la información analizada por el usuario, con análisis del <strong>Triángulo del Fraude</strong>, cotejo en <strong>Portales de Transparencia (Ley 200-04)</strong>, fundamentación en leyes dominicanas con numeral y literal exacto, y <strong>Checklist Forense 5/5</strong> con firma física o digital del equipo de peritos.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('peritaje')}
                    className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Abrir Sistema de Peritaje</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Featured Services */}
            <ServicesSection
              onSelectServiceForBooking={handleSelectServiceForBooking}
              onNavigateToTools={() => navigateTo('herramientas')}
            />

            {/* Interactive Tools Teaser */}
            <ToolsContainer initialSubTab="isr" />

            {/* Quote Builder on Homepage */}
            <QuoteBuilder
              onOpenAppointment={(notes) => handleOpenAppointment(notes, 'Iguala Contable Cotizada')}
            />

            {/* Tax Deadlines Preview */}
            <TaxCalendar />

            {/* FAQ */}
            <FaqSection />

            {/* Direct Contact */}
            <ContactSection />
          </>
        )}

        {activeTab === 'peritaje' && (
          <div>
            <CaseManager />
          </div>
        )}

        {activeTab === 'servicios' && (
          <div className="pt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button
                type="button"
                onClick={() => navigateTo('inicio')}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-4"
              >
                ← Volver a inicio
              </button>
            </div>
            <ServicesSection
              onSelectServiceForBooking={handleSelectServiceForBooking}
              onNavigateToTools={() => navigateTo('herramientas')}
            />
            <QuoteBuilder
              onOpenAppointment={(notes) => handleOpenAppointment(notes, 'Iguala Contable')}
            />
          </div>
        )}

        {activeTab === 'herramientas' && (
          <div className="pt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button
                type="button"
                onClick={() => navigateTo('inicio')}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-4"
              >
                ← Volver a inicio
              </button>
            </div>
            <ToolsContainer initialSubTab="isr" />
            <ContactSection />
          </div>
        )}

        {activeTab === 'cotizador' && (
          <div className="pt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button
                type="button"
                onClick={() => navigateTo('inicio')}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-4"
              >
                ← Volver a inicio
              </button>
            </div>
            <QuoteBuilder
              onOpenAppointment={(notes) => handleOpenAppointment(notes, 'Iguala Contable')}
            />
            <ContactSection />
          </div>
        )}

        {activeTab === 'calendario' && (
          <div className="pt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button
                type="button"
                onClick={() => navigateTo('inicio')}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-4"
              >
                ← Volver a inicio
              </button>
            </div>
            <TaxCalendar />
            <ContactSection />
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="pt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button
                type="button"
                onClick={() => navigateTo('inicio')}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-4"
              >
                ← Volver a inicio
              </button>
            </div>
            <FaqSection />
            <ContactSection />
          </div>
        )}

        {activeTab === 'contacto' && (
          <div className="pt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button
                type="button"
                onClick={() => navigateTo('inicio')}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-4"
              >
                ← Volver a inicio
              </button>
            </div>
            <ContactSection />
          </div>
        )}
      </main>

      {/* Floating WhatsApp Action Pill */}
      <aside aria-label="Contacto directo" className="fixed bottom-6 right-6 z-40">
        <a
          href={FIRM_INFO.whatsapp.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
          title="Escribir por WhatsApp a Baldera Santos & Asociados"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="text-xs font-bold hidden sm:inline">WhatsApp Directo</span>
        </a>
      </aside>

      {/* Booking / Diagnosis Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        prefillService={appointmentService}
        prefillNotes={appointmentNotes}
      />

      {/* Firm Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
