import React, { useState } from 'react';
import { AppointmentData } from '../types';
import { FIRM_INFO } from '../data/firmData';
import { X, Calendar, MapPin, Video, CheckCircle2, MessageCircle, Phone } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillService?: string;
  prefillNotes?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  prefillService = 'Igualas Contables y Cumplimiento DGII',
  prefillNotes = '',
}) => {
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [rncOrCedula, setRncOrCedula] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceCategory, setServiceCategory] = useState(prefillService);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [modality, setModality] = useState<'presencial' | 'virtual'>('presencial');
  const [notes, setNotes] = useState(prefillNotes);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const appointment: AppointmentData = {
      id: `apt-${Date.now()}`,
      clientName,
      companyName,
      rncOrCedula,
      phone,
      email,
      serviceCategory,
      preferredDate: preferredDate || 'A coordinar',
      preferredTime,
      modality,
      notes,
      createdAt: new Date().toISOString(),
    };

    // Save in local storage
    try {
      const existingRaw = localStorage.getItem('bsa_appointments');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push(appointment);
      localStorage.setItem('bsa_appointments', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const text = `*Solicitud de Consulta - Baldera Santos & Asociados*
Cliente: ${clientName}
Empresa: ${companyName || 'Persona Física'}
RNC / Cédula: ${rncOrCedula || 'Pendiente'}
Teléfono: ${phone}
Correo: ${email}
Servicio: ${serviceCategory}
Modalidad: ${modality === 'presencial' ? 'Presencial (Sede Santo Domingo Este)' : 'Virtual (Google Meet/Zoom)'}
Fecha / Hora deseada: ${preferredDate} a las ${preferredTime}
Detalles: ${notes || 'Solicitud inicial'}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/18297717390?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
              Diagnóstico y Consultoría
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Agendar Asesoría con Baldera Santos
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Atención presencial en nuestra sede de Villa Eloisa o mediante videoconferencia nacional.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-2xl font-bold text-slate-900">
                ¡Solicitud Registrada con Éxito!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Gracias, <strong className="text-slate-900">{clientName}</strong>. Uno de nuestros consultores fiscales se comunicará con usted a su teléfono <strong>{phone}</strong> en menos de 24 horas.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 text-left space-y-1.5 font-mono">
              <div><strong>Modalidad:</strong> {modality === 'presencial' ? 'Presencial (Calle Orlando Martínez #49, Villa Eloisa)' : 'Reunión Virtual'}</div>
              <div><strong>Servicio:</strong> {serviceCategory}</div>
              <div><strong>Fecha sugerida:</strong> {preferredDate || 'Por coordinar'} ({preferredTime})</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmar Inmediatamente vía WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
              >
                Finalizar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Modality Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Modalidad de la Asesoría
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setModality('presencial')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    modality === 'presencial'
                      ? 'border-amber-500 bg-amber-50/60 font-semibold text-slate-900 ring-1 ring-amber-500'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <MapPin className={`w-4 h-4 ${modality === 'presencial' ? 'text-amber-600' : 'text-slate-400'}`} />
                  <div className="text-xs">
                    <span className="block font-bold">Presencial</span>
                    <span className="text-[10px] text-slate-500">Villa Eloisa, SDE</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setModality('virtual')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    modality === 'virtual'
                      ? 'border-amber-500 bg-amber-50/60 font-semibold text-slate-900 ring-1 ring-amber-500'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Video className={`w-4 h-4 ${modality === 'virtual' ? 'text-amber-600' : 'text-slate-400'}`} />
                  <div className="text-xs">
                    <span className="block font-bold">Virtual</span>
                    <span className="text-[10px] text-slate-500">Google Meet / Zoom</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="apt-client-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Nombre Completo *
                </label>
                <input
                  id="apt-client-name"
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej: Lic. Carlos Baldera"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor="apt-company-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Empresa o Razón Social
                </label>
                <input
                  id="apt-company-name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ej: Constructora del Caribe SRL"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="apt-rnc" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  RNC o Cédula
                </label>
                <input
                  id="apt-rnc"
                  type="text"
                  value={rncOrCedula}
                  onChange={(e) => setRncOrCedula(e.target.value)}
                  placeholder="1-31-XXXXX-X"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor="apt-phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  id="apt-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (829) 000-0000"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor="apt-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Correo Electrónico *
                </label>
                <input
                  id="apt-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contacto@empresa.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Servicio Principal de Consulta
              </label>
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500"
              >
                <option value="Igualas Contables y Cumplimiento DGII">Iguala Contable Mensual Completa</option>
                <option value="Declaraciones Anuales IR-2 e IR-1">Declaración Jurada Anual (IR-2 / IR-1)</option>
                <option value="Nómina y Tesorería de la Seguridad Social (TSS)">Gestión de Nóminas, TSS y Contratos Laborales</option>
                <option value="Formatos 606, 607 e ITBIS">Formatos DGII 606/607 y Corrección de Inconsistencias</option>
                <option value="Constitución y Modificación de Sociedades">Constitución de SRL / EIRL y Registro Mercantil</option>
                <option value="Defensa ante Requerimientos DGII">Fiscalización o Notificación de la DGII</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="apt-date" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Fecha Preferida
                </label>
                <input
                  id="apt-date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Horario de Preferencia
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="9:00 AM">Mañana: 9:00 AM</option>
                  <option value="10:30 AM">Mañana: 10:30 AM</option>
                  <option value="2:30 PM">Tarde: 2:30 PM</option>
                  <option value="4:00 PM">Tarde: 4:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="apt-notes" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Comentarios Adicionales o Situación Actual
              </label>
              <textarea
                id="apt-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describa brevemente la situación de su empresa o las dudas específicas..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer"
              >
                Confirmar Solicitud de Cita
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
