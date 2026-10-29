import React, { useState } from 'react';
import { formatDOP, formatUSD } from '../utils/taxCalculations';
import { FIRM_INFO } from '../data/firmData';
import { Calculator, CheckCircle2, MessageCircle, Calendar, Sparkles, Building2, Users, FileText } from 'lucide-react';

interface QuoteBuilderProps {
  onOpenAppointment: (contextNotes?: string) => void;
}

export const QuoteBuilder: React.FC<QuoteBuilderProps> = ({ onOpenAppointment }) => {
  const [companyType, setCompanyType] = useState<'fisica' | 'pyme_srl' | 'mediana_corp'>('pyme_srl');
  const [invoiceBracket, setInvoiceBracket] = useState<number>(1); // 0: <30, 1: 31-100, 2: 101-250, 3: >250
  const [employeeBracket, setEmployeeBracket] = useState<number>(1); // 0: 0, 1: 1-5, 2: 6-15, 3: 16-35, 4: >35
  const [addons, setAddons] = useState<Record<string, boolean>>({
    annualDeclaration: true,
    bankReconcile: true,
    ecfConsulting: false,
    legalAssemblies: false,
  });

  // Base pricing
  const basePrices = {
    fisica: 12500,
    pyme_srl: 18500,
    mediana_corp: 32000,
  };

  const invoicePrices = [0, 4500, 9000, 15000];
  const employeePrices = [0, 3500, 6500, 11000, 18000];

  const addonPrices: Record<string, { label: string; price: number; desc: string }> = {
    annualDeclaration: {
      label: 'Preparación de Declaración Jurada Anual (IR-2 / IR-1)',
      price: 4000,
      desc: 'Incluye anexos DGII, cálculo de anticipos e informe fiscal.',
    },
    bankReconcile: {
      label: 'Conciliación Bancaria Mensual de Cuentas y Tarjetas',
      price: 2500,
      desc: 'Control estricto de ingresos y egresos bancarios contra contabilidad.',
    },
    ecfConsulting: {
      label: 'Acompañamiento en Facturación Electrónica (e-CF)',
      price: 3000,
      desc: 'Supervisión de emisores electrónicos y validación de XML/TrackID DGII.',
    },
    legalAssemblies: {
      label: 'Asambleas Corporativas y Registro Mercantil',
      price: 2500,
      desc: 'Redacción de asambleas ordinarias anuales para la Cámara de Comercio.',
    },
  };

  const toggleAddon = (key: string) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateTotal = () => {
    let sum = basePrices[companyType];
    sum += invoicePrices[invoiceBracket];
    sum += employeePrices[employeeBracket];

    Object.keys(addons).forEach((k) => {
      if (addons[k]) {
        sum += addonPrices[k].price;
      }
    });

    return sum;
  };

  const totalDOP = calculateTotal();
  const totalUSD = formatUSD(totalDOP);

  const getCompanyTypeName = () => {
    if (companyType === 'fisica') return 'Persona Física con Negocio de Único Dueño';
    if (companyType === 'pyme_srl') return 'PYME / Sociedad SRL o EIRL';
    return 'Empresa Mediana / Corporación SA o SAS';
  };

  const getInvoiceText = () => {
    const labels = ['Hasta 30 comprobantes/mes', '31 a 100 comprobantes/mes', '101 a 250 comprobantes/mes', 'Más de 250 comprobantes/mes'];
    return labels[invoiceBracket];
  };

  const getEmployeeText = () => {
    const labels = ['Sin empleados en TSS', '1 a 5 empleados en nómina TSS', '6 a 15 empleados en nómina TSS', '16 a 35 empleados en nómina TSS', 'Más de 35 empleados en nómina TSS'];
    return labels[employeeBracket];
  };

  const handleWhatsAppQuote = () => {
    const selectedAddonsList = Object.keys(addons)
      .filter((k) => addons[k])
      .map((k) => `• ${addonPrices[k].label}`)
      .join('\n');

    const msg = `*Cotización de Iguala Contable y Fiscal - Baldera Santos & Asociados*
Tipo de Contribuyente: ${getCompanyTypeName()}
Volumen de Facturas: ${getInvoiceText()}
Nómina TSS: ${getEmployeeText()}
Servicios Especiales:
${selectedAddonsList || '• Servicios base 606/607/IT-1'}

*Tarifa Mensual Estimada:* ${formatDOP(totalDOP)} (${totalUSD})

Deseo coordinar una reunión diagnóstica para formalizar la propuesta de iguala.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/18297717390?text=${encoded}`, '_blank');
  };

  const handleBookWithContext = () => {
    const context = `Cotización preliminar de Iguala: ${getCompanyTypeName()} | ${getInvoiceText()} | ${getEmployeeText()} | Estimado: ${formatDOP(
      totalDOP
    )}`;
    onOpenAppointment(context);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
            Tarifas Transparentes para su Negocio
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
            Cotizador Inteligente de Igualas Contables y Fiscales
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Configure las características de su empresa y obtenga una estimación transparente de la inversión mensual para su tranquilidad contable ante la DGII y la TSS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
            {/* Step 1: Company Type */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                  Tipo de Contribuyente o Estructura Societaria
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setCompanyType('fisica')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    companyType === 'fisica'
                      ? 'border-amber-500 bg-white shadow-sm ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white/70 hover:bg-white'
                  }`}
                >
                  <Building2 className={`w-5 h-5 mb-2 ${companyType === 'fisica' ? 'text-amber-600' : 'text-slate-400'}`} />
                  <div className="font-bold text-xs text-slate-900">Persona Física</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Profesionales o negocio único dueño</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCompanyType('pyme_srl')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    companyType === 'pyme_srl'
                      ? 'border-amber-500 bg-white shadow-sm ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white/70 hover:bg-white'
                  }`}
                >
                  <Building2 className={`w-5 h-5 mb-2 ${companyType === 'pyme_srl' ? 'text-amber-600' : 'text-slate-400'}`} />
                  <div className="font-bold text-xs text-slate-900">PYME / SRL o EIRL</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Sociedad comercial estándar</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCompanyType('mediana_corp')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    companyType === 'mediana_corp'
                      ? 'border-amber-500 bg-white shadow-sm ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white/70 hover:bg-white'
                  }`}
                >
                  <Building2 className={`w-5 h-5 mb-2 ${companyType === 'mediana_corp' ? 'text-amber-600' : 'text-slate-400'}`} />
                  <div className="font-bold text-xs text-slate-900">Corporación / SA</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Múltiples socios y alta operativa</div>
                </button>
              </div>
            </div>

            {/* Step 2: Invoice Volume */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                  Volumen Promedio de Comprobantes Fiscales Mensuales (Compras + Ventas)
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 0, label: 'Hasta 30', sub: 'Microempresa' },
                  { id: 1, label: '31 a 100', sub: 'Moderado' },
                  { id: 2, label: '101 a 250', sub: 'Activo' },
                  { id: 3, label: 'Más de 250', sub: 'Alto volumen' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setInvoiceBracket(item.id)}
                    className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      invoiceBracket === item.id
                        ? 'border-amber-500 bg-amber-50/70 text-slate-900 font-bold ring-1 ring-amber-500'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-semibold">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Employees / TSS */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                  Empleados en Nómina y Autoliquidación TSS (SUIR)
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 0, label: '0 empl.' },
                  { id: 1, label: '1 a 5' },
                  { id: 2, label: '6 a 15' },
                  { id: 3, label: '16 a 35' },
                  { id: 4, label: '35+' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEmployeeBracket(item.id)}
                    className={`py-2 px-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                      employeeBracket === item.id
                        ? 'border-amber-500 bg-slate-900 text-amber-400 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Addons */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                  Servicios y Reportes Adicionales Deseados
                </h3>
              </div>

              <div className="space-y-2.5">
                {Object.keys(addonPrices).map((key) => {
                  const item = addonPrices[key];
                  const isChecked = addons[key];
                  return (
                    <label
                      key={key}
                      onClick={() => toggleAddon(key)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-amber-400 bg-amber-50/40'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent onClick
                        className="mt-1 text-amber-600 rounded focus:ring-amber-500 w-4 h-4 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{item.label}</span>
                          <span className="text-xs font-mono font-semibold text-slate-700">
                            +{formatDOP(item.price)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Summary Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Propuesta de Iguala Personalizada
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  Inversión Mensual Estimada
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Incluye atención directa de consultor fiscal asignado.
                </p>
              </div>

              {/* Price Display */}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 tabular-nums">
                    {formatDOP(totalDOP)}
                  </span>
                  <span className="text-xs text-slate-400 uppercase">/ mes</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  Aprox. {totalUSD} USD (Tasa de referencia 60.50)
                </div>
              </div>

              {/* What is included */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                  Lo que incluye su iguala contable:
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Envío mensual puntual de Formatos 606 y 607 a la DGII.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Preparación y liquidación del IT-1 (ITBIS) e IR-17 (Retenciones).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Gestión de novedades salariales y liquidación en TSS (SUIR).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Emisión mensual de Balance General y Estado de Resultados.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Asesoría continua telefónica y por WhatsApp con Baldera Santos.</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Solicitar Propuesta vía WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleBookWithContext}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Diagnóstico Gratuito</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Sin contratos de permanencia forzosa. Respaldado por el Instituto de Contadores Públicos Autorizados (ICPARD).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
