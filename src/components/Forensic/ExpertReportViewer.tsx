import React, { useRef, useState } from 'react';
import { ForensicCase } from '../../types/forensic';
import { formatDOP } from '../../utils/taxCalculations';
import { Printer, Download, Copy, Check, ShieldCheck, Scale, Award, Triangle, CheckCircle2 } from 'lucide-react';

interface ExpertReportViewerProps {
  currentCase: ForensicCase;
}

export const ExpertReportViewer: React.FC<ExpertReportViewerProps> = ({ currentCase }) => {
  const [copied, setCopied] = useState(false);
  const printAreaRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    if (!printAreaRef.current) return;
    navigator.clipboard.writeText(printAreaRef.current.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadDoc = () => {
    if (!printAreaRef.current) return;
    const content = printAreaRef.current.innerText;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DICTAMEN_PERICIAL_${currentCase.caseNumber}.txt`;
    link.click();
  };

  const allApproved5 = currentCase.findings.every((f) => f.complianceScore === 5);

  return (
    <div className="space-y-6">
      {/* Top Action Bar (hidden on print) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-4 bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
        <div>
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
            Expediente: {currentCase.caseNumber}
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
            Vista Previa de Dictamen e Informe Pericial Oficial
          </h3>
          <p className="text-xs text-slate-400">
            Listo para impresión judicial física con rúbrica autógrafa o digitalización full con firma electrónica.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado' : 'Copiar Texto'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadDoc}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Archivo</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Dictamen Oficial</span>
          </button>
        </div>
      </div>

      {/* Official Legal Document Container */}
      <div
        ref={printAreaRef}
        className="bg-white border border-slate-300 rounded-2xl p-8 sm:p-14 shadow-lg text-slate-900 max-w-5xl mx-auto space-y-8 font-serif print:border-none print:shadow-none print:p-0 print:m-0"
      >
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-6 text-center space-y-2">
          <div className="font-sans text-[11px] uppercase tracking-widest text-slate-500 font-bold">
            República Dominicana · Auxilio Judicial & Auditoría Forense
          </div>
          <div className="w-12 h-12 rounded-lg bg-slate-900 text-amber-400 font-bold text-lg flex items-center justify-center mx-auto my-1">
            BS&A
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 uppercase">
            Baldera Santos & Asociados
          </h1>
          <div className="text-xs font-sans text-slate-600">
            Firma de Peritaje Judicial, Auditoría Forense y Consultoría Tributaria
          </div>
          <div className="text-[11px] font-mono text-slate-500">
            Sede: Calle Orlando Martínez No. 49, Villa Eloisa, Santo Domingo Este | Tel: +1 (829) 771-7390
          </div>
        </div>

        {/* Case Metadata Box */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs font-sans space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <strong className="text-slate-900">NÚMERO DE EXPEDIENTE:</strong>{' '}
              <span className="font-mono font-bold text-amber-900">{currentCase.caseNumber}</span>
            </div>
            <div>
              <strong className="text-slate-900">TIPO DE DICTAMEN:</strong>{' '}
              <span className="font-bold text-slate-800 uppercase">{currentCase.caseType}</span>
            </div>
            <div>
              <strong className="text-slate-900">DESTINO JUDICIAL / FISCALÍA:</strong>{' '}
              <span className="text-slate-700">{currentCase.targetCourtOrFiscalia}</span>
            </div>
            <div>
              <strong className="text-slate-900">PERÍODO AUDITADO:</strong>{' '}
              <span className="font-mono text-slate-700">{currentCase.periodStart} al {currentCase.periodEnd}</span>
            </div>
            <div className="sm:col-span-2">
              <strong className="text-slate-900">ENTIDAD O SUJETO AUDITADO:</strong>{' '}
              <span className="font-bold text-slate-900">{currentCase.auditedEntity} (RNC: {currentCase.auditedRNC})</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 uppercase underline tracking-wide">
            INFORME PERICIAL FORENSE Y DICTAMEN CONCLUYENTE
          </h2>
          <p className="text-xs font-sans italic text-slate-600">
            Emitido en virtud de designación pericial y conforme al ordenamiento procesal vigente
          </p>
        </div>

        {/* 1. Declaración de Imparcialidad y Origen Estricto de la Información */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase text-slate-900 tracking-wider flex items-center gap-2">
            <span>I. DECLARACIÓN JURADA DE FUENTE CERRADA E IMPARCIALIDAD PERICIAL</span>
          </h3>
          <p className="text-xs leading-relaxed text-slate-800 text-justify">
            Los suscritos peritos y auditores forenses certifican solemnemente bajo la gravedad del juramento que el presente dictamen ha sido elaborado <strong>ÚNICA Y EXCLUSIVAMENTE a partir de los documentos originales físicos, expedientes administrativos, registros contables y certificaciones de portales oficiales analizados formalmente en la entidad auditada</strong>. En estricto cumplimiento del mandato pericial, no se ha incorporado ninguna información externa, conjetura, presunción no documentada ni dato proveniente de fuentes secundarias no corroboradas.
          </p>
          <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 text-[11px] font-sans text-amber-950">
            {currentCase.oathDeclaration}
          </div>
        </div>

        {/* 2. Metodología y Documentos Analizados */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
            II. RELACIÓN DE DOCUMENTOS ORIGINALES ANALIZADOS Y TRAZABILIDAD
          </h3>
          <div className="border border-slate-200 rounded-lg overflow-hidden font-sans text-xs">
            <table className="w-full text-left divide-y divide-slate-200">
              <thead className="bg-slate-100 text-[10px] font-bold text-slate-700 uppercase">
                <tr>
                  <th className="p-2.5">Código / Folio</th>
                  <th className="p-2.5">Título del Documento</th>
                  <th className="p-2.5">Origen / Custodia</th>
                  <th className="p-2.5">Fecha</th>
                  <th className="p-2.5">Huella Digital (SHA-256)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {currentCase.documentsAnalyzed.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono font-bold text-amber-900">{doc.refCode}</td>
                    <td className="p-2.5 font-medium">{doc.title}</td>
                    <td className="p-2.5 text-slate-600">{doc.institutionOrOrigin}</td>
                    <td className="p-2.5 font-mono text-slate-600">{doc.documentDate}</td>
                    <td className="p-2.5 font-mono text-[9px] text-slate-500">
                      {doc.digitalHashSha256 ? `${doc.digitalHashSha256.slice(0, 16)}...` : 'Verificado físico'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Portales de Transparencia Evaluados */}
        {currentCase.transparencyPortals.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
              III. COTEJO EN PORTALES DE TRANSPARENCIA (LEY 200-04 Y LEY 340-06)
            </h3>
            <div className="space-y-2 text-xs font-sans">
              {currentCase.transparencyPortals.map((tp) => (
                <div key={tp.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{tp.portalName} — Sección: {tp.evaluatedSection}</span>
                    <span className="font-mono text-slate-500">{tp.consultationDate}</span>
                  </div>
                  <div className="text-[11px] text-slate-700"><strong>Evidencia Extraída:</strong> {tp.capturedEvidence}</div>
                  <div className="text-[11px] text-rose-800"><strong>Inconsistencia Probada:</strong> {tp.identifiedAnomaly}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Hallazgos Periciales con Leyes y Triángulo del Fraude */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
            IV. CUERPO PERICIAL DE HALLAZGOS Y CALIFICACIÓN TÉCNICO-LEGAL
          </h3>

          <div className="space-y-6">
            {currentCase.findings.map((f, idx) => (
              <div
                key={f.id}
                className="p-5 rounded-xl border border-slate-300 bg-white space-y-4 page-break-inside-avoid"
              >
                {/* Finding Header */}
                <div className="flex items-start justify-between border-b border-slate-200 pb-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded">
                      {f.auditRef}
                    </span>
                    <h4 className="text-base font-bold text-slate-950 mt-1">
                      {idx + 1}. {f.title}
                    </h4>
                  </div>
                  <div className="text-right font-sans">
                    <span className="text-[10px] text-slate-500 uppercase block">Perjuicio Patrimonial</span>
                    <span className="font-mono font-bold text-rose-700 text-sm">
                      {formatDOP(f.financialImpactDOP)}
                    </span>
                  </div>
                </div>

                {/* Factual Description */}
                <div className="text-xs text-justify leading-relaxed text-slate-800">
                  <strong className="block text-[11px] uppercase tracking-wider text-slate-600 font-sans mb-1">
                    Descripción Fáctica Comprobada:
                  </strong>
                  {f.factualDescription}
                </div>

                <div className="text-xs font-sans bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-700">
                  <strong>Referencia de Folios y Expediente:</strong> {f.evidenceReference}
                </div>

                {/* Normativa Legal Violada */}
                <div className="space-y-1.5 font-sans">
                  <strong className="block text-[11px] uppercase tracking-wider text-slate-600">
                    Preceptos Legales Vulnerados (Leyes Dominicanas Aplicables):
                  </strong>
                  <div className="space-y-1 text-xs">
                    {f.applicableLaws.map((law) => (
                      <div key={law.id} className="p-2 bg-slate-100/70 rounded border border-slate-200">
                        <div className="font-bold text-slate-900">
                          {law.lawName} — <span className="font-mono text-amber-800">{law.article} {law.numeral || ''} {law.literal || ''}</span>
                        </div>
                        <div className="text-[11px] text-slate-600">{law.violationDetail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Triángulo del Fraude */}
                <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 font-sans text-xs space-y-1.5">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5 text-[11px] uppercase">
                    <Triangle className="w-3.5 h-3.5 text-amber-700" />
                    <span>Constatación del Triángulo del Fraude:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                    <div><strong>Presión / Incentivo:</strong> {f.fraudTriangle.pressureIncentive}</div>
                    <div><strong>Oportunidad:</strong> {f.fraudTriangle.opportunity}</div>
                    <div><strong>Racionalización:</strong> {f.fraudTriangle.rationalization}</div>
                  </div>
                </div>

                {/* Checklist Forense 5/5 */}
                <div className="p-3 bg-slate-900 text-white rounded-lg font-sans text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold">Checklist Forense y Criterios del Ministerio Público:</span>
                  </div>
                  <span className="font-mono font-bold text-amber-300">
                    Calificación de Evidencia: {f.complianceScore} / 5.0 (Aprobada)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Cuantificación Consolidada del Daño */}
        <div className="space-y-3 font-sans">
          <h3 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
            V. CUANTIFICACIÓN CONSOLIDADA DEL PERJUICIO ECONÓMICO AL PATRIMONIO
          </h3>

          <div className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs">
            <div className="bg-slate-900 text-white p-3 flex justify-between items-center font-bold">
              <span>RESUMEN CONSOLIDADO DEL PERJUICIO DETERMINADO</span>
              <span className="font-mono text-base text-amber-400">
                TOTAL: {formatDOP(currentCase.totalDamageDOP)}
              </span>
            </div>
            <div className="p-4 bg-slate-50 space-y-2">
              {currentCase.findings.map((f) => (
                <div key={f.id} className="flex justify-between items-center border-b border-slate-200 pb-1 text-slate-700">
                  <span>{f.auditRef} - {f.title}</span>
                  <span className="font-mono font-bold text-slate-900">{formatDOP(f.financialImpactDOP)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Conclusión y Dictamen Pericial Concluyente */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
            VI. CONCLUSIÓN PERICIAL CONCLUYENTE
          </h3>
          <p className="text-xs leading-relaxed text-justify text-slate-800">
            {currentCase.pericialConclusion}
          </p>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 font-sans text-xs text-emerald-950 space-y-1">
            <strong>DICTAMEN DE IRREFUTABILIDAD PROBATORIA:</strong>
            <p className="text-[11px] leading-relaxed">
              {currentCase.finalLegalVerdict}
            </p>
          </div>
        </div>

        {/* 7. Relación Final de Auditores y Peritos Actuantes con Firmas Físicas / Electrónicas */}
        <div className="space-y-6 pt-6 border-t-2 border-slate-900 page-break-inside-avoid">
          <div className="text-center space-y-1">
            <h3 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
              VII. RELACIÓN Y FIRMA DE PERITOS Y AUDITORES ACTUANTES
            </h3>
            <p className="text-xs font-sans text-slate-500">
              En fe de lo cual se firma, sella y rubrica el presente informe pericial a los efectos legales correspondientes.
            </p>
          </div>

          {/* Signatures Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-4 font-sans text-xs">
            {currentCase.team.map((auditor) => (
              <div
                key={auditor.id}
                className="flex flex-col items-center text-center space-y-2 border border-slate-200 p-4 rounded-xl bg-slate-50/50"
              >
                {/* Signature slot */}
                <div className="w-full h-24 flex items-center justify-center border-b border-slate-400 pb-1">
                  {auditor.signatureType === 'physical' ? (
                    <div className="w-full text-center">
                      <div className="h-14"></div>
                      <span className="text-[10px] text-slate-400 font-mono">(Firma Física y Sello)</span>
                    </div>
                  ) : auditor.signatureDataUrl ? (
                    <img
                      src={auditor.signatureDataUrl}
                      alt={`Firma de ${auditor.name}`}
                      className="max-h-20 max-w-[180px] object-contain"
                    />
                  ) : (
                    <div className="h-14 border-b border-slate-400 w-36 mx-auto"></div>
                  )}
                </div>

                {/* Perito info */}
                <div className="space-y-0.5">
                  <span className="font-serif text-xs font-bold text-slate-900 block">
                    {auditor.name}
                  </span>
                  <span className="text-[11px] text-amber-800 font-semibold block">
                    {auditor.role}
                  </span>
                  <span className="text-[10px] text-slate-600 block">
                    Cédula: {auditor.cedula}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    {auditor.exequatur}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center font-sans text-[10px] text-slate-400 pt-6">
            Documento pericial oficial registrado y foliado bajo custodia de <strong>Baldera Santos & Asociados</strong> · Santo Domingo, República Dominicana.
          </div>
        </div>
      </div>
    </div>
  );
};
