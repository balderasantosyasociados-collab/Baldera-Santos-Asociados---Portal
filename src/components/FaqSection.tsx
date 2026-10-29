import React, { useState } from 'react';
import { FREQUENT_QUESTIONS } from '../data/firmData';
import { ChevronDown, HelpCircle, BookOpen } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
            Orientación Profesional
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Preguntas Frecuentes Tributarias y Contables
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Respuestas fundamentadas en la legislación dominicana y las normas generales de la Dirección General de Impuestos Internos (DGII).
          </p>
        </div>

        <div className="space-y-3">
          {FREQUENT_QUESTIONS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-slate-50/50 hover:bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span className="font-serif text-base sm:text-lg font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-sm leading-relaxed border-t border-slate-200/60 space-y-3">
                    <p>{faq.answer}</p>
                    {faq.reference && (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200/50">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Fundamento Jurídico: {faq.reference}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
