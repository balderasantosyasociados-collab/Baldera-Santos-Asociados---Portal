import React, { useState } from 'react';
import { formatDOP } from '../../utils/taxCalculations';
import { FileText, Copy, Check, Download, AlertCircle } from 'lucide-react';

export const Format606Helper: React.FC = () => {
  const [rnc, setRnc] = useState('131495289');
  const [costType, setCostType] = useState('02'); // Gastos por trabajos y servicios
  const [ncf, setNcf] = useState('B0100000452');
  const [docDate, setDocDate] = useState('20261015');
  const [serviceAmount, setServiceAmount] = useState('25000');
  const [goodsAmount, setGoodsAmount] = useState('0');
  const [itbisAmount, setItbisAmount] = useState('4500');
  const [itbisWithheld, setItbisWithheld] = useState('1350'); // 30%
  const [isrType, setIsrType] = useState('01'); // 10% honorarios profesionales
  const [isrWithheld, setIsrWithheld] = useState('2500'); // 10%
  const [copied, setCopied] = useState(false);

  const parsedService = parseFloat(serviceAmount) || 0;
  const parsedGoods = parseFloat(goodsAmount) || 0;
  const totalBilled = parsedService + parsedGoods;
  const parsedItbis = parseFloat(itbisAmount) || 0;
  const parsedItbisWithheld = parseFloat(itbisWithheld) || 0;
  const parsedIsrWithheld = parseFloat(isrWithheld) || 0;

  // Auto-calculate ITBIS and withholdings when service changes
  const handleAutoFillService = (val: string) => {
    setServiceAmount(val);
    const num = parseFloat(val) || 0;
    const itbis = +(num * 0.18).toFixed(2);
    setItbisAmount(itbis.toString());
    setItbisWithheld((itbis * 0.3).toFixed(2));
    setIsrWithheld((num * 0.1).toFixed(2));
  };

  // Formato 606 Tab-delimited row (standard DGII format)
  // Col 1: RNC/Cedula
  // Col 2: Tipo Id (1 Cedula, 2 RNC)
  // Col 3: Tipo Gasto
  // Col 4: NCF
  // Col 5: NCF Modificado
  // Col 6: Fecha Comprobante
  // Col 7: Fecha Pago
  // Col 8: Monto Facturado en Servicios
  // Col 9: Monto Facturado en Bienes
  // Col 10: Total Monto Facturado
  // Col 11: ITBIS Facturado
  // Col 12: ITBIS Retenido
  // Col 13: ITBIS Proporcionalidad
  // Col 14: ITBIS Costo
  // Col 15: ITBIS por Adelantar
  // Col 16: ITBIS Percibido
  // Col 17: Tipo Retencion ISR
  // Col 18: Retencion Renta
  const idType = rnc.length === 11 ? '1' : '2';
  const itbisAdelantar = Math.max(0, parsedItbis - parsedItbisWithheld).toFixed(2);

  const tsvRow = [
    rnc,
    idType,
    costType,
    ncf,
    '', // NCF modificado
    docDate,
    docDate,
    parsedService.toFixed(2),
    parsedGoods.toFixed(2),
    totalBilled.toFixed(2),
    parsedItbis.toFixed(2),
    parsedItbisWithheld.toFixed(2),
    '0.00',
    '0.00',
    itbisAdelantar,
    '0.00',
    isrType,
    parsedIsrWithheld.toFixed(2),
  ].join('\t');

  const handleCopyTSV = () => {
    navigator.clipboard.writeText(tsvRow);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'RNC,TipoID,TipoGasto,NCF,NCFMod,FechaComp,FechaPago,Servicios,Bienes,Total,ITBIS,ITBISRet,ITBISProp,ITBISCosto,ITBISAdelantar,ITBISPerc,TipoRetISR,ISRRet\n' +
      tsvRow.replace(/\t/g, ',');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `registro_606_${ncf || 'dgii'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="border-b border-slate-200 pb-5 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-amber-600" />
              Asistente de Registro para Formato 606 (DGII)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Genere y valide la estructura exacta de compras y servicios requerida mensualmente por la Dirección General de Impuestos Internos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Fila Copiada' : 'Copiar para Excel DGII'}</span>
            </button>
            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form fields */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="f606-rnc" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                1. RNC o Cédula Proveedor
              </label>
              <input
                id="f606-rnc"
                type="text"
                value={rnc}
                onChange={(e) => setRnc(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-sm focus:ring-2 focus:ring-amber-500"
                placeholder="131495289"
              />
            </div>

            <div>
              <label htmlFor="f606-ncf" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                2. NCF Comprobante Fiscal
              </label>
              <input
                id="f606-ncf"
                type="text"
                value={ncf}
                onChange={(e) => setNcf(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-sm focus:ring-2 focus:ring-amber-500"
                placeholder="B0100000001"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                3. Tipo de Bienes y Servicios (DGII)
              </label>
              <select
                value={costType}
                onChange={(e) => setCostType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-amber-500"
              >
                <option value="01">01 - Gastos de Personal</option>
                <option value="02">02 - Gastos por Trabajos, Suministros y Servicios</option>
                <option value="03">03 - Arrendamientos</option>
                <option value="04">04 - Gastos de Activos Fijo</option>
                <option value="05">05 - Gastos de Representación</option>
                <option value="06">06 - Otras Deducciones Admitidas</option>
                <option value="07">07 - Gastos Financieros</option>
                <option value="09">09 - Compras que forman parte del Costo de Venta</option>
                <option value="11">11 - Gastos de Seguros</option>
              </select>
            </div>

            <div>
              <label htmlFor="f606-doc-date" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                4. Fecha Factura (AAAAMMDD)
              </label>
              <input
                id="f606-doc-date"
                type="text"
                maxLength={8}
                value={docDate}
                onChange={(e) => setDocDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-sm focus:ring-2 focus:ring-amber-500"
                placeholder="20261015"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <div>
              <label htmlFor="f606-services" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                5. Monto en Servicios (RD$)
              </label>
              <input
                id="f606-services"
                type="number"
                value={serviceAmount}
                onChange={(e) => handleAutoFillService(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-sm focus:ring-2 focus:ring-amber-500"
                placeholder="25000"
              />
            </div>

            <div>
              <label htmlFor="f606-goods" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                6. Monto en Bienes (RD$)
              </label>
              <input
                id="f606-goods"
                type="number"
                value={goodsAmount}
                onChange={(e) => setGoodsAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-sm focus:ring-2 focus:ring-amber-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="f606-itbis" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                ITBIS Facturado
              </label>
              <input
                id="f606-itbis"
                type="number"
                value={itbisAmount}
                onChange={(e) => setItbisAmount(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs"
              />
            </div>

            <div>
              <label htmlFor="f606-itbis-ret" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                ITBIS Retenido
              </label>
              <input
                id="f606-itbis-ret"
                type="number"
                value={itbisWithheld}
                onChange={(e) => setItbisWithheld(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs"
              />
            </div>

            <div>
              <label htmlFor="f606-isr-ret" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                ISR Retenido
              </label>
              <input
                id="f606-isr-ret"
                type="number"
                value={isrWithheld}
                onChange={(e) => setIsrWithheld(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Generated 606 Preview */}
        <div className="lg:col-span-5 bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Vista Previa de la Fila (Formato 606)
            </span>
            <span className="text-[11px] font-mono text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded">
              Norma 07-2018
            </span>
          </div>

          {/* Raw string preview in code block */}
          <div className="bg-slate-900 text-amber-300 p-3 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
            {tsvRow}
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Monto Total Facturado:</span>
              <span className="font-mono font-bold text-slate-900">{formatDOP(totalBilled)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">ITBIS por Adelantar:</span>
              <span className="font-mono font-bold text-emerald-700">{formatDOP(parseFloat(itbisAdelantar))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Retenciones Reportadas:</span>
              <span className="font-mono font-bold text-rose-700">
                {formatDOP(parsedItbisWithheld + parsedIsrWithheld)}
              </span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-950 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              En <strong>Baldera Santos & Asociados</strong> preparamos, validamos y enviamos mensualmente sus formatos 606, 607 y 608 antes del día 15 para garantizar cero inconsistencias con los reportes cruzados de sus suplidores ante la DGII.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
