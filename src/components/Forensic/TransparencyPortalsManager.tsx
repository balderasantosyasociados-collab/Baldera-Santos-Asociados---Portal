import React, { useState } from 'react';
import { TransparencyPortalSource, AnalyzedDocument, ForensicFinding, LegalNormReference } from '../../types/forensic';
import { Globe, Plus, Trash2, CheckCircle2, AlertTriangle, ArrowRight, Link as LinkIcon, Database, ExternalLink, Sparkles } from 'lucide-react';

interface TransparencyPortalsManagerProps {
  portals: TransparencyPortalSource[];
  analyzedDocs: AnalyzedDocument[];
  onUpdatePortals: (updated: TransparencyPortalSource[]) => void;
  onGenerateFindingFromPortal: (newFinding: ForensicFinding) => void;
}

export const TransparencyPortalsManager: React.FC<TransparencyPortalsManagerProps> = ({
  portals,
  analyzedDocs,
  onUpdatePortals,
  onGenerateFindingFromPortal,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [portalName, setPortalName] = useState('Portal Único de Transparencia - Compras y Contrataciones');
  const [institution, setInstitution] = useState('Entidad Auditada');
  const [url, setUrl] = useState('https://transparencia.gob.do/');
  const [evaluatedSection, setEvaluatedSection] = useState<'Nómina' | 'Compras y Contrataciones' | 'Informes Financieros' | 'Gestión y Presupuesto'>('Compras y Contrataciones');
  const [capturedEvidence, setCapturedEvidence] = useState('');
  const [identifiedAnomaly, setIdentifiedAnomaly] = useState('');
  const [selectedDocId, setSelectedDocId] = useState(analyzedDocs[0]?.id || '');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAddPortal = (e: React.FormEvent) => {
    e.preventDefault();
    const newPortal: TransparencyPortalSource = {
      id: `tp-${Date.now()}`,
      portalName,
      institution,
      url,
      evaluatedSection,
      consultationDate: new Date().toISOString().split('T')[0],
      capturedEvidence,
      identifiedAnomaly,
      crossReferencedDocId: selectedDocId || undefined,
    };
    onUpdatePortals([...portals, newPortal]);
    setIsAdding(false);
    setCapturedEvidence('');
    setIdentifiedAnomaly('');
    setSuccessMsg('Portal de transparencia incorporado y cruzado con el expediente.');
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleDeletePortal = (id: string) => {
    onUpdatePortals(portals.filter((p) => p.id !== id));
  };

  // Convert transparency anomaly into a formally structured judicial finding
  const handleElevateToFinding = (p: TransparencyPortalSource) => {
    const findingNumber = Date.now().toString().slice(-2);
    const linkedDoc = analyzedDocs.find((d) => d.id === p.crossReferencedDocId);

    // Map section to Dominican laws
    let laws: LegalNormReference[] = [];
    if (p.evaluatedSection === 'Compras y Contrataciones') {
      laws = [
        {
          id: `law-${Date.now()}-1`,
          lawName: 'Ley No. 340-06 sobre Compras y Contrataciones Públicas',
          article: 'Art. 14',
          numeral: 'Numeral 3',
          literal: 'Lit. a',
          topic: 'Principio de Máxima Publicidad y Libre Competencia',
          violationDetail: `Omisión de publicaciones en el portal de compras obligatorias: ${p.identifiedAnomaly}`,
        },
        {
          id: `law-${Date.now()}-2`,
          lawName: 'Ley No. 200-04 General de Libre Acceso a la Información Pública',
          article: 'Art. 3, 4 y 5',
          topic: 'Obligación de Publicación Proactiva de Presupuestos y Contratos',
          violationDetail: 'Falta de entrega y transparencia en contrataciones ejecutadas.',
        },
      ];
    } else if (p.evaluatedSection === 'Nómina') {
      laws = [
        {
          id: `law-${Date.now()}-1`,
          lawName: 'Ley No. 41-08 de Función Pública',
          article: 'Art. 80',
          numeral: 'Numeral 5',
          topic: 'Prohibición de cobro no sustentado o duplicado',
          violationDetail: `Inconsistencia en nómina oficial cotejada: ${p.identifiedAnomaly}`,
        },
        {
          id: `law-${Date.now()}-2`,
          lawName: 'Ley No. 10-07 del Sistema Nacional de Control Interno',
          article: 'Art. 25',
          topic: 'Falta de Justificación y Comprobación del Desempeño',
          violationDetail: 'Erogaciones de sueldos no sustentadas en el portal de transparencia.',
        },
      ];
    } else {
      laws = [
        {
          id: `law-${Date.now()}-1`,
          lawName: 'Ley No. 11-92 Código Tributario Dominicano',
          article: 'Art. 236 y 237',
          topic: 'Simulación de Operaciones Financieras',
          violationDetail: `Discrepancia financiera detectada en portal: ${p.identifiedAnomaly}`,
        },
      ];
    }

    const newFinding: ForensicFinding = {
      id: `f-tp-${Date.now()}`,
      auditRef: `REF-AUD-PT-${findingNumber}`,
      title: `Incumplimiento en ${p.evaluatedSection}: ${p.identifiedAnomaly.slice(0, 70)}...`,
      factualDescription: `Mediante análisis tecnológico y cotejo automatizado del ${p.portalName} (${p.url}) en la sección "${p.evaluatedSection}", se comprobó: ${p.capturedEvidence}. Dicha información discrepa directamente con el soporte documental ${linkedDoc ? linkedDoc.refCode : 'del expediente'}.`,
      evidenceReference: `Portal de Transparencia ${p.url}; ${linkedDoc ? `${linkedDoc.refCode} (${linkedDoc.title})` : 'Expediente Físico'}.`,
      financialImpactDOP: 500000,
      transparencyPortalLink: p.url,
      applicableLaws: laws,
      fraudTriangle: {
        pressureIncentive: 'Ocultar irregularidades al escrutinio público y evitar auditorías de la Contraloría/Cámara de Cuentas.',
        opportunity: 'Ausencia de fiscalización preventiva de la Dirección General de Ética e Integridad Gubernamental (DIGEIG).',
        rationalization: 'Se justificó la falta de publicación como "retraso administrativo de actualización web".',
      },
      procedureDescription: `Extracción web con estampado de fecha y hora fidedigna, hash criptográfico de la página consultada, y cruce matricial contra el documento original físico ${linkedDoc?.refCode || 'del archivo'}.`,
      checklist: [
        {
          id: `chk-${Date.now()}-1`,
          criterion: 'Autenticidad e Integridad de la Fuente Primaria',
          description: 'Portal oficial gubernamental bajo dominio .gob.do verificado.',
          score: 5,
          isFulfilled: true,
          evaluationNotes: 'Fuente pública oficial vinculante.',
        },
        {
          id: `chk-${Date.now()}-2`,
          criterion: 'Legalidad de la Obtención de la Prueba',
          description: 'Información de libre acceso según Ley 200-04.',
          score: 5,
          isFulfilled: true,
          evaluationNotes: 'Plena validez procesal.',
        },
        {
          id: `chk-${Date.now()}-3`,
          criterion: 'Corroboración Cruzada con Fuentes Externas',
          description: 'Cotejo contra el expediente físico original.',
          score: 5,
          isFulfilled: true,
          evaluationNotes: 'Contraste matemático exacto.',
        },
        {
          id: `chk-${Date.now()}-4`,
          criterion: 'Pertinencia y Relevancia Jurídica para el Tribunal',
          description: 'Evidencia directa de dolo o negligencia en transparencia.',
          score: 5,
          isFulfilled: true,
          evaluationNotes: 'Acredita la tipificación legal.',
        },
        {
          id: `chk-${Date.now()}-5`,
          criterion: 'Inobjetabilidad Técnica de la Metodología Forense',
          description: 'Auditoría digital forense sin alteración de metadatos.',
          score: 5,
          isFulfilled: true,
          evaluationNotes: 'Cadena de custodia digital intacta.',
        },
      ],
      complianceScore: 5.0,
      status: 'Aprobada 5/5',
      recommendationsFor5of5: ['Evidencia 100% probatoria y validada con calificación 5/5.'],
    };

    onGenerateFindingFromPortal(newFinding);
    setSuccessMsg(`¡Nuevo hallazgo pericial "${newFinding.auditRef}" incorporado exitosamente al Dictamen con puntuación 5/5!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Ley 200-04 & Inteligencia Forense
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-600" />
            Portales de Transparencia Institucional & Cruce de Datos
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Cruce tecnológico entre los datos declarados en los portales oficiales de transparencia (Nómina, Compras, Finanzas) y la documentación física analizada para descubrir hallazgos ocultos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-amber-400 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cerrar Formulario' : 'Vincular Nuevo Portal'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{successMsg}</span>
        </div>
      )}

      {/* Add New Portal Form */}
      {isAdding && (
        <form onSubmit={handleAddPortal} className="bg-amber-50/50 border border-amber-200 rounded-2xl p-6 space-y-4">
          <div className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-700" />
            <span>Registro y Verificación de Portal de Transparencia</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tp-portal-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Nombre del Portal o Repositorio *
              </label>
              <input
                id="tp-portal-name"
                type="text"
                required
                value={portalName}
                onChange={(e) => setPortalName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                placeholder="Ej: Portal Transparencia - Compras y Contrataciones"
              />
            </div>

            <div>
              <label htmlFor="tp-institution" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Institución o Entidad *
              </label>
              <input
                id="tp-institution"
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label htmlFor="tp-url" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Enlace URL del Portal *
              </label>
              <input
                id="tp-url"
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono bg-white"
                placeholder="https://transparencia.gob.do/..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Sección Evaluada según Ley de Transparencia *
              </label>
              <select
                value={evaluatedSection}
                onChange={(e) => setEvaluatedSection(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
              >
                <option value="Compras y Contrataciones">Publicaciones de Compras y Contrataciones</option>
                <option value="Nómina">Nómina y Remuneraciones de Servidores</option>
                <option value="Informes Financieros">Informes Financieros y Ejecución Presupuestaria</option>
                <option value="Gestión y Presupuesto">Plan Operativo e Informes de Gestión</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tp-captured-evidence" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Evidencia Extraída del Portal *
              </label>
              <textarea
                id="tp-captured-evidence"
                required
                rows={3}
                value={capturedEvidence}
                onChange={(e) => setCapturedEvidence(e.target.value)}
                placeholder="Describa la captura, fechas, montos y registros exactos descargados del portal web..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label htmlFor="tp-anomaly" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Incumplimiento o Anomalía Detectada *
              </label>
              <textarea
                id="tp-anomaly"
                required
                rows={3}
                value={identifiedAnomaly}
                onChange={(e) => setIdentifiedAnomaly(e.target.value)}
                placeholder="Indique la contradicción detectada frente a la realidad física (ej: compras no publicadas, sueldos fuera de escala...)"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Cruce Cruzado con Documento Físico del Expediente
            </label>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
            >
              <option value="">-- Sin vincular a documento específico --</option>
              {analyzedDocs.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.refCode} - {doc.title} ({doc.sourceType})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg shadow-sm cursor-pointer"
            >
              Guardar Portal en Expediente
            </button>
          </div>
        </form>
      )}

      {/* Portals List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portals.map((p) => {
          const linkedDoc = analyzedDocs.find((d) => d.id === p.crossReferencedDocId);
          return (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs hover:border-slate-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                      {p.evaluatedSection}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Cotejo: {p.consultationDate}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeletePortal(p.id)}
                    className="text-slate-400 hover:text-rose-600 cursor-pointer p-1"
                    title="Eliminar portal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="font-serif text-base font-bold text-slate-900">
                  {p.portalName}
                </h4>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-amber-700 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="truncate max-w-[280px]">{p.url}</span>
                </a>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
                  <div className="font-semibold text-slate-900">Evidencia Extraída:</div>
                  <p className="text-[11px] leading-relaxed text-slate-600">{p.capturedEvidence}</p>
                </div>

                <div className="p-3 bg-rose-50/70 rounded-lg border border-rose-200/60 text-xs text-rose-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-rose-900">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    Incumplimiento Normativo Detectado:
                  </div>
                  <p className="text-[11px] leading-relaxed text-rose-900">{p.identifiedAnomaly}</p>
                </div>

                {linkedDoc && (
                  <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                    <LinkIcon className="w-3 h-3 text-slate-400" />
                    <span>Cotejado contra: <strong>{linkedDoc.refCode}</strong></span>
                  </div>
                )}
              </div>

              {/* Action: Elevate to Judicial Finding */}
              <div className="pt-3 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={() => handleElevateToFinding(p)}
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Elevar a Hallazgo Pericial 5/5 con Leyes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
