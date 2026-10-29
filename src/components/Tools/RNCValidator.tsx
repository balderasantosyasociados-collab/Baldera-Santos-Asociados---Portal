import React, { useState } from 'react';
import { validateDominicanRNC, validateDominicanCedula } from '../../utils/taxCalculations';
import { ShieldCheck, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

export const RNCValidator: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('131495289'); // Valid sample RNC
  const [activeNCFInfo, setActiveNCFInfo] = useState<string | null>(null);

  const clean = inputVal.replace(/[^0-9]/g, '');
  const isCedula = clean.length === 11;
  const isRNC = clean.length === 9;

  let validationResult: { isValid: boolean; message: string; formatted: string } | null = null;
  if (clean.length > 0) {
    if (isCedula) {
      validationResult = validateDominicanCedula(clean);
    } else {
      validationResult = validateDominicanRNC(clean);
    }
  }

  const ncfTypes = [
    {
      code: 'B01 / E31',
      name: 'Crédito Fiscal (Factura Electrónica e-CF E31)',
      usage: 'Obligatorio para que la empresa receptora pueda deducir costos/gastos en el IR-2 y adelantar el ITBIS en el formato 606.',
    },
    {
      code: 'B02 / E32',
      name: 'Consumidor Final (e-CF E32)',
      usage: 'Para ventas a clientes particulares que no utilizarán la factura para fines tributarios ni deducción fiscal.',
    },
    {
      code: 'B11 / E41',
      name: 'Comprobante de Compras (Informales)',
      usage: 'Emitido por la empresa cuando compra bienes o servicios a personas físicas no registradas en la DGII (requiere retención 100% ITBIS y 10% ISR).',
    },
    {
      code: 'B14 / E44',
      name: 'Regímenes Especiales',
      usage: 'Para empresas en Zonas Francas o acogidas a la Ley de Fomento Turístico (CONFOTUR), exentas de ITBIS.',
    },
    {
      code: 'B15 / E45',
      name: 'Comprobante Gubernamental',
      usage: 'Para ventas y servicios prestados a instituciones del Estado Dominicano y municipalidades.',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="border-b border-slate-200 pb-5 mb-6">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-amber-600" />
          Validador Oficial de RNC y Cédula Dominicana
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Verificación matemática del dígito de control según algoritmos oficiales de la DGII y JCE para evitar rechazos en los formatos 606 y 607.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Validator Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label htmlFor="rnc-cedula-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Ingrese RNC de Sociedad (9 dígitos) o Cédula (11 dígitos)
            </label>
            <div className="relative">
              <input
                id="rnc-cedula-input"
                type="text"
                maxLength={15}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ej: 1-31-49528-9 ó 402-0000000-0"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-base text-slate-900 font-semibold"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
              <span>Dígitos ingresados: {clean.length}</span>
              <span className="font-mono">
                {clean.length === 9 ? 'RNC Jurídico (9)' : clean.length === 11 ? 'Cédula / Persona Física (11)' : 'Incompleto'}
              </span>
            </div>
          </div>

          {/* Validation Status Card */}
          {validationResult && (
            <div
              className={`p-5 rounded-xl border transition-all ${
                validationResult.isValid
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {validationResult.isValid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-bold text-sm">
                    {validationResult.isValid ? 'Documento Válido' : 'Documento Inválido'}
                  </div>
                  <p className="text-xs leading-relaxed">{validationResult.message}</p>
                  {validationResult.isValid && (
                    <div className="pt-2 text-xs font-mono font-bold text-emerald-800">
                      Formato Normalizado: {validationResult.formatted}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick validation examples */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-slate-600 block">Probar ejemplos válidos:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => setInputVal('131495289')}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded font-mono hover:bg-slate-100 cursor-pointer"
              >
                RNC: 131495289
              </button>
              <button
                type="button"
                onClick={() => setInputVal('101001577')}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded font-mono hover:bg-slate-100 cursor-pointer"
              >
                RNC: 101001577
              </button>
              <button
                type="button"
                onClick={() => setInputVal('00100000002')}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded font-mono hover:bg-slate-100 cursor-pointer"
              >
                Cédula: 001-0000000-2
              </button>
            </div>
          </div>
        </div>

        {/* NCF Guide Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              Guía Rápida de Comprobantes Fiscales (NCF & e-CF)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Identifique el tipo correcto para sus reportes en los formatos 606 y 607:
            </p>
          </div>

          <div className="space-y-2">
            {ncfTypes.map((ncf) => (
              <div
                key={ncf.code}
                onClick={() => setActiveNCFInfo(activeNCFInfo === ncf.code ? null : ncf.code)}
                className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-xs text-slate-900 font-mono text-amber-800">
                    {ncf.code}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">{ncf.name.split('(')[0]}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ncf.usage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
