import React, { useState } from 'react';
import { FIRM_INFO } from '../data/firmData';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hola Baldera Santos & Asociados, mi nombre es ${name || 'un cliente'}. Mensaje: ${message || 'Deseo solicitar información sobre sus servicios contables y fiscales.'}`;
    window.open(`https://wa.me/18297717390?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
            Atención Personalizada
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Comuníquese con Baldera Santos & Asociados
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Estamos listos para atender sus consultas fiscales, contables o corporativas de forma presencial o remota.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl border border-slate-800">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Sede Central
              </h3>
              <p className="text-xs text-amber-400 font-mono mt-1">
                Santo Domingo Este, República Dominicana
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Dirección Física:</span>
                  <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">
                    Calle Orlando Martínez No. 49, Villa Eloisa, Santo Domingo Este, República Dominicana.
                  </p>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Fácil acceso y parqueo para clientes.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-amber-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Teléfonos de Oficina:</span>
                  <div className="flex flex-col gap-1 text-xs font-mono text-amber-300 mt-1">
                    <a href="tel:+18297717390" className="hover:underline flex items-center gap-1.5">
                      <span>+1 (829) 771-7390</span>
                      <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.2 rounded font-sans">
                        WhatsApp
                      </span>
                    </a>
                    <a href="tel:+18096978570" className="hover:underline">
                      +1 (809) 697-8570 (Línea directa)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Correo Electrónico Oficial:</span>
                  <a
                    href="mailto:balderasantosyasociados@gmail.com"
                    className="text-xs font-mono text-amber-300 hover:underline block mt-0.5"
                  >
                    balderasantosyasociados@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Horario de Servicio:</span>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Lunes a Viernes: 8:00 AM – 5:30 PM
                  </p>
                  <p className="text-slate-400 text-xs">
                    Sábados: Sesiones previa coordinación
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-2 border-t border-slate-800">
              <a
                href={FIRM_INFO.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir Chat Directo en WhatsApp (+1 829-771-7390)</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">
              Envíenos un Mensaje Inmediato
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Complete los campos a continuación y responderemos con una propuesta personalizada.
            </p>

            {sent ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-emerald-950">
                  Mensaje Enviado Correctamente
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Hemos recibido su comunicación. Nuestro equipo revisará sus requerimientos y se comunicará a la brevedad posible.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Nombre y Apellidos *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Lic. Manuel Peña"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (809) 000-0000"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-white font-mono focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@suempresa.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Detalle de su Consulta o Solicitud de Iguala *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Explique qué servicios necesita (Formatos 606/607, declaración anual IR-2, nóminas en TSS, apertura de compañía...)"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Enviar también por WhatsApp</span>
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Mensaje</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
