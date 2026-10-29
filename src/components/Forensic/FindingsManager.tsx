import React, { useState } from 'react';
import { ForensicFinding, LegalNormReference, ForensicChecklistItem } from '../../types/forensic';
import { formatDOP } from '../../utils/taxCalculations';
import { AlertCircle, CheckCircle2, Plus, Trash2, Edit3, Scale, ShieldCheck, Triangle, Award, FileText, ChevronRight, X } from 'lucide-react';

interface FindingsManagerProps {
  findings: ForensicFinding[];
  onUpdateFindings: (updated: ForensicFinding[]) => void;
}

export const FindingsManager: React.FC<FindingsManagerProps> = ({
  findings,
  onUpdateFindings,
}) => {
  const [selectedFinding, setSelectedFinding] = useState<ForensicFinding | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [auditRef, setAuditRef] = useState('');
  const [title, setTitle] = useState('');
  const [factualDescription, setFactualDescription] = useState('');
  const [evidenceReference, setEvidenceReference] = useState('');
  const [financialImpactDOP, setFinancialImpactDOP] = useState('0');
  const [transparencyPortalLink, setTransparencyPortalLink] = useState('');
  const [procedureDescription, setProcedureDescription] = useState('');

  // Fraud triangle
  const [pressureIncentive, setPressureIncentive] = useState('');
  const [opportunity, setOpportunity] = useState('');
  const [rationalization, setRationalization] = useState('');

  // Laws
  const [laws, setLaws] = useState<LegalNormReference[]>([]);
  const [newLawName, setNewLawName] = useState('Ley No. 340-06 sobre Compras y Contrataciones Públicas');
  const [newLawArt, setNewLawArt] = useState('Art. 14');
  const [newLawNum, setNewLawNum] = useState('Num. 3');
  const [newLawLit, setNewLawLit] = useState('Lit. a');
  const [newLawTopic, setNewLawTopic] = useState('Incompatibilidad y Fraccionamiento');
  const [newLawDetail, setNewLawDetail] = useState('');

  // Checklist 5 criteria
  const defaultCriteria: ForensicChecklistItem[] = [
    {
      id: 'c-1',
      criterion: '1. Autenticidad e Integridad de la Fuente Primaria',
      description: 'Documento original extraído con soporte físico, foliatura y firma verificada.',
      score: 5,
      isFulfilled: true,
      evaluationNotes: 'Constatado en original foliado con sello institucional.',
    },
    {
      id: 'c-2',
      criterion: '2. Legalidad de la Obtención de la Prueba',
      description: 'Obtenida mediante orden judicial y cadena de custodia ininterrumpida.',
      score: 5,
      isFulfilled: true,
      evaluationNotes: 'Amparada en auto judicial y acta notarial de entrega.',
    },
    {
      id: 'c-3',
      criterion: '3. Corroboración Cruzada con Fuentes Externas',
      description: 'Verificación contra bases de datos de DGII, TSS, DGCP o bancos.',
      score: 5,
      isFulfilled: true,
      evaluationNotes: 'Cotejo coincidente al 100% con registros bancarios y fiscales.',
    },
    {
      id: 'c-4',
      criterion: '4. Pertinencia y Relevancia Jurídica para el Tribunal',
      description: 'Prueba idónea para tipificar la infracción procesal o daño patrimonial.',
      score: 5,
      isFulfilled: true,
      evaluationNotes: 'Imprescindible para la demostración del dolo o negligencia.',
    },
    {
      id: 'c-5',
      criterion: '5. Inobjetabilidad Técnica de la Metodología Forense',
      description: 'Procedimiento auditable, replicable y sustentado en normas NAF / NIIF.',
      score: 5,
      isFulfilled: true,
      evaluationNotes: 'Aplicación estricta de estándares internacionales de auditoría forense.',
    },
  ];

  const [checklist, setChecklist] = useState<ForensicChecklistItem[]>(defaultCriteria);

  const calculateScore = (items: ForensicChecklistItem[]) => {
    if (!items.length) return 5;
    const sum = items.reduce((acc, curr) => acc + curr.score, 0);
    return +(sum / items.length).toFixed(1);
  };

  const currentScore = calculateScore(checklist);

  const startCreate = () => {
    const nextNum = (findings.length + 1).toString().padStart(2, '0');
    setAuditRef(`REF-AUD-PT-${nextNum}`);
    setTitle('');
    setFactualDescription('');
    setEvidenceReference('Folios XX al XX del Expediente Pericial');
    setFinancialImpactDOP('0');
    setTransparencyPortalLink('');
    setProcedureDescription('Extracción formal bajo cadena de custodia y cotejo pericial directo.');
    setPressureIncentive('');
    setOpportunity('');
    setRationalization('');
    setLaws([
      {
        id: `law-${Date.now()}`,
        lawName: 'Ley No. 340-06 sobre Compras y Contrataciones Públicas',
        article: 'Art. 14',
        numeral: 'Numeral 3',
        literal: 'Literal a',
        topic: 'Fraccionamiento de Compras',
        violationDetail: 'División del objeto de contratación para evitar licitación pública obligatoria.',
      },
    ]);
    setChecklist(defaultCriteria);
    setSelectedFinding(null);
    setIsCreating(true);
    setIsEditing(true);
  };

  const startEdit = (f: ForensicFinding) => {
    setSelectedFinding(f);
    setAuditRef(f.auditRef);
    setTitle(f.title);
    setFactualDescription(f.factualDescription);
    setEvidenceReference(f.evidenceReference);
    setFinancialImpactDOP(f.financialImpactDOP.toString());
    setTransparencyPortalLink(f.transparencyPortalLink || '');
    setProcedureDescription(f.procedureDescription);
    setPressureIncentive(f.fraudTriangle.pressureIncentive);
    setOpportunity(f.fraudTriangle.opportunity);
    setRationalization(f.fraudTriangle.rationalization);
    setLaws(f.applicableLaws);
    setChecklist(f.checklist && f.checklist.length === 5 ? f.checklist : defaultCriteria);
    setIsCreating(false);
    setIsEditing(true);
  };

  const handleScoreChange = (index: number, score: number) => {
    const updated = [...checklist];
    updated[index].score = score;
    updated[index].isFulfilled = score === 5;
    setChecklist(updated);
  };

  const handleNotesChange = (index: number, notes: string) => {
    const updated = [...checklist];
    updated[index].evaluationNotes = notes;
    setChecklist(updated);
  };

  const handleAddLaw = () => {
    if (!newLawDetail.trim()) return;
    const newLaw: LegalNormReference = {
      id: `law-${Date.now()}`,
      lawName: newLawName,
      article: newLawArt,
      numeral: newLawNum || undefined,
      literal: newLawLit || undefined,
      topic: newLawTopic,
      violationDetail: newLawDetail,
    };
    setLaws([...laws, newLaw]);
    setNewLawDetail('');
  };

  const handleRemoveLaw = (id: string) => {
    setLaws(laws.filter((l) => l.id !== id));
  };

  const handleSaveFinding = (e: React.FormEvent) => {
    e.preventDefault();

    const score = calculateScore(checklist);
    const isApproved5of5 = score === 5.0;

    const recommendations: string[] = [];
    if (!isApproved5of5) {
      checklist.forEach((item) => {
        if (item.score < 5) {
          recommendations.push(
            `Para el criterio "${item.criterion}": Subsanar calificación actual (${item.score}/5) aportando soporte adicional y certificando la fuente original ante notario u órgano emisor para alcanzar el 5/5 obligatorio.`
          );
        }
      });
    } else {
      recommendations.push('Evidencia con integridad máxima 5/5 validada por el perito y apta para tribunal.');
    }

    const findingData: ForensicFinding = {
      id: selectedFinding ? selectedFinding.id : `finding-${Date.now()}`,
      auditRef,
      title,
      factualDescription,
      evidenceReference,
      financialImpactDOP: parseFloat(financialImpactDOP) || 0,
      transparencyPortalLink: transparencyPortalLink || undefined,
      applicableLaws: laws,
      fraudTriangle: {
        pressureIncentive,
        opportunity,
        rationalization,
      },
      procedureDescription,
      checklist,
      complianceScore: score,
      status: isApproved5of5 ? 'Aprobada 5/5' : 'Requiere Subsanación',
      recommendationsFor5of5: recommendations,
    };

    if (selectedFinding && !isCreating) {
      onUpdateFindings(findings.map((f) => (f.id === selectedFinding.id ? findingData : f)));
    } else {
      onUpdateFindings([...findings, findingData]);
    }

    setIsEditing(false);
    setSelectedFinding(findingData);
  };

  const handleDeleteFinding = (id: string) => {
    if (confirm('¿Está seguro de eliminar este hallazgo del dictamen pericial?')) {
      onUpdateFindings(findings.filter((f) => f.id !== id));
      if (selectedFinding?.id === id) {
        setSelectedFinding(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Evidencia Inobjetable & Rigor Judicial
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-600" />
            Hallazgos Periciales, Triángulo del Fraude & Checklist 5/5
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Cada hallazgo debe sustentarse exclusivamente en documentos analizados, normas precisas con numeral y literal, análisis del triángulo del fraude y validación probatoria 5/5 para tribunales.
          </p>
        </div>

        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Hallazgo Pericial</span>
        </button>
      </div>

      {/* Main Layout: List of Findings & Detailed Inspector/Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List of Findings */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
            Puntos e Incidencias Analizadas ({findings.length})
          </div>

          <div className="space-y-3">
            {findings.map((f) => {
              const isSelected = selectedFinding?.id === f.id;
              const isScore5 = f.complianceScore === 5;
              return (
                <div
                  key={f.id}
                  onClick={() => {
                    setSelectedFinding(f);
                    setIsEditing(false);
                  }}
                  className={`bg-white rounded-xl border p-4 transition-all cursor-pointer shadow-xs ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {f.auditRef}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        isScore5
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {isScore5 ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>5/5 Aprobada</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 text-rose-600" />
                          <span>{f.complianceScore}/5 Revisión</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-slate-900 mt-2 line-clamp-2">
                    {f.title}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {f.factualDescription}
                  </p>

                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-700 font-semibold">
                      Perjuicio: {formatDOP(f.financialImpactDOP)}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {f.applicableLaws.length} norma(s)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right View / Edit Panel */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {isEditing ? (
            /* Editing / Creating Form */
            <form onSubmit={handleSaveFinding} className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h4 className="font-serif text-lg font-bold text-slate-900">
                  {isCreating ? 'Nuevo Hallazgo Pericial Forense' : `Editar ${auditRef}`}
                </h4>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Basic References */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hf-audit-ref" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Referencia de Auditoría (Punto de Incidencia) *
                  </label>
                  <input
                    id="hf-audit-ref"
                    type="text"
                    required
                    value={auditRef}
                    onChange={(e) => setAuditRef(e.target.value)}
                    placeholder="REF-AUD-PT-01"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono font-bold text-amber-900"
                  />
                </div>

                <div>
                  <label htmlFor="hf-financial-impact" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Perjuicio Económico / Monto Involucrado (RD$)
                  </label>
                  <input
                    id="hf-financial-impact"
                    type="number"
                    value={financialImpactDOP}
                    onChange={(e) => setFinancialImpactDOP(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="hf-title" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Título Concluyente del Hallazgo *
                  </label>
                  <input
                    id="hf-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Fraccionamiento de Compras Públicas para Evadir Licitación"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="hf-evidence-ref" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Referencia de Folios y Documentos Fuente *
                  </label>
                  <input
                    id="hf-evidence-ref"
                    type="text"
                    required
                    value={evidenceReference}
                    onChange={(e) => setEvidenceReference(e.target.value)}
                    placeholder="Ej: Folios 12 al 48; Anexo C; Órdenes OCM-2025-019 a 034"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="hf-factual-desc" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Descripción Fáctica (Estrictamente basada en los documentos del expediente) *
                  </label>
                  <textarea
                    id="hf-factual-desc"
                    required
                    rows={4}
                    value={factualDescription}
                    onChange={(e) => setFactualDescription(e.target.value)}
                    placeholder="Describa los hechos comprobados con fechas, montos y personas involucradas sin suposiciones..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="hf-proc-desc" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Procedimiento de Obtención y Trazabilidad (Inobjetable ante Tribunales) *
                  </label>
                  <textarea
                    id="hf-proc-desc"
                    required
                    rows={2}
                    value={procedureDescription}
                    onChange={(e) => setProcedureDescription(e.target.value)}
                    placeholder="Explique cómo fue extraída la prueba original, firmas constatadas y cadena de custodia..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              {/* Triángulo del Fraude */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Triangle className="w-4 h-4 text-amber-600" />
                  <h5 className="font-serif text-sm font-bold text-slate-900">
                    Triángulo del Fraude Aplicado al Hallazgo
                  </h5>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="tf-pressure" className="block text-[11px] font-bold text-slate-700">
                      1. Presión o Incentivo (Móvil del Autor)
                    </label>
                    <input
                      id="tf-pressure"
                      type="text"
                      value={pressureIncentive}
                      onChange={(e) => setPressureIncentive(e.target.value)}
                      placeholder="Ej: Presión por compromisos económicos personales o cuotas políticas..."
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="tf-opportunity" className="block text-[11px] font-bold text-slate-700">
                      2. Oportunidad (Brecha en el Control Interno)
                    </label>
                    <input
                      id="tf-opportunity"
                      type="text"
                      value={opportunity}
                      onChange={(e) => setOpportunity(e.target.value)}
                      placeholder="Ej: Ausencia de segregación de funciones entre compras y tesorería..."
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="tf-rationalization" className="block text-[11px] font-bold text-slate-700">
                      3. Racionalización (Justificación Moral del Autor)
                    </label>
                    <input
                      id="tf-rationalization"
                      type="text"
                      value={rationalization}
                      onChange={(e) => setRationalization(e.target.value)}
                      placeholder="Ej: 'Todos lo hacen' o 'era para agilizar el servicio a la comunidad'..."
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Legal Norms Section */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-600" />
                    <h5 className="font-serif text-sm font-bold text-slate-900">
                      Normativa y Leyes Violadas (Con Numeral y Literal Exacto)
                    </h5>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {laws.length} ley(es) agregadas
                  </span>
                </div>

                {/* Laws List */}
                <div className="space-y-2">
                  {laws.map((l) => (
                    <div
                      key={l.id}
                      className="p-3 bg-white rounded-lg border border-slate-200 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">
                          {l.lawName} — <span className="text-amber-800 font-mono">{l.article} {l.numeral || ''} {l.literal || ''}</span>
                        </div>
                        <div className="text-[11px] text-slate-600">{l.violationDetail}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveLaw(l.id)}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Law Sub-form */}
                <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={newLawName}
                    onChange={(e) => setNewLawName(e.target.value)}
                    placeholder="Ley aplicable"
                    className="text-xs px-2 py-1.5 border border-slate-300 rounded bg-white"
                  />
                  <input
                    type="text"
                    value={newLawArt}
                    onChange={(e) => setNewLawArt(e.target.value)}
                    placeholder="Art. (ej: Art. 14)"
                    className="text-xs px-2 py-1.5 border border-slate-300 rounded bg-white font-mono"
                  />
                  <input
                    type="text"
                    value={newLawNum}
                    onChange={(e) => setNewLawNum(e.target.value)}
                    placeholder="Numeral/Literal (ej: Num. 3 Lit. a)"
                    className="text-xs px-2 py-1.5 border border-slate-300 rounded bg-white font-mono"
                  />
                  <div className="sm:col-span-3 flex gap-2">
                    <input
                      type="text"
                      value={newLawDetail}
                      onChange={(e) => setNewLawDetail(e.target.value)}
                      placeholder="Detalle exacto de la violación jurídica probada..."
                      className="text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleAddLaw}
                      className="px-3 py-1.5 bg-slate-900 text-amber-400 text-xs font-bold rounded cursor-pointer shrink-0"
                    >
                      + Agregar Ley
                    </button>
                  </div>
                </div>
              </div>

              {/* Checklist 5/5 Forensic Scale */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <h5 className="font-serif text-sm font-bold text-slate-900">
                      Checklist Forense y Criterios del Ministerio Público (Escala 1 al 5)
                    </h5>
                  </div>
                  <div
                    className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full ${
                      currentScore === 5
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    Puntuación: {currentScore} / 5.0
                  </div>
                </div>

                <div className="space-y-3">
                  {checklist.map((item, idx) => (
                    <div key={item.id} className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{item.criterion}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => handleScoreChange(idx, val)}
                              className={`w-7 h-6 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                                item.score === val
                                  ? val === 5
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-amber-600 text-white'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500">{item.description}</p>

                      <input
                        type="text"
                        value={item.evaluationNotes}
                        onChange={(e) => handleNotesChange(idx, e.target.value)}
                        placeholder="Nota de soporte o folio que sustenta este criterio..."
                        className="w-full px-2 py-1 text-[11px] rounded border border-slate-200 bg-slate-50 text-slate-700"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-sm cursor-pointer"
                >
                  Guardar Hallazgo Pericial
                </button>
              </div>
            </form>
          ) : selectedFinding ? (
            /* Detailed View of Selected Finding */
            <div className="space-y-6">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      {selectedFinding.auditRef}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        selectedFinding.complianceScore === 5
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      Calificación: {selectedFinding.complianceScore} / 5.0 ({selectedFinding.status})
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                    {selectedFinding.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(selectedFinding)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                    title="Editar hallazgo"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteFinding(selectedFinding.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="Eliminar hallazgo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Factual Description & Evidence */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
                    Descripción Fáctica Comprobada:
                  </span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    {selectedFinding.factualDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-0.5">Soporte Documental:</span>
                    <span className="font-mono text-slate-600">{selectedFinding.evidenceReference}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-0.5">Perjuicio Cuantificado:</span>
                    <span className="font-mono font-bold text-rose-700 text-sm">
                      {formatDOP(selectedFinding.financialImpactDOP)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fraud Triangle Display */}
              <div className="p-4 bg-amber-50/50 border border-amber-200/80 rounded-xl space-y-3">
                <div className="font-serif text-sm font-bold text-amber-950 flex items-center gap-2">
                  <Triangle className="w-4 h-4 text-amber-700" />
                  <span>Análisis del Triángulo del Fraude</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-amber-200/60">
                    <strong className="text-amber-900 block mb-1">Presión / Incentivo:</strong>
                    <span className="text-slate-600 text-[11px]">{selectedFinding.fraudTriangle.pressureIncentive}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-amber-200/60">
                    <strong className="text-amber-900 block mb-1">Oportunidad:</strong>
                    <span className="text-slate-600 text-[11px]">{selectedFinding.fraudTriangle.opportunity}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-amber-200/60">
                    <strong className="text-amber-900 block mb-1">Racionalización:</strong>
                    <span className="text-slate-600 text-[11px]">{selectedFinding.fraudTriangle.rationalization}</span>
                  </div>
                </div>
              </div>

              {/* Laws Violated */}
              <div className="space-y-2">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900 block">
                  Fundamento Jurídico Violado:
                </span>
                <div className="space-y-2">
                  {selectedFinding.applicableLaws.map((law) => (
                    <div
                      key={law.id}
                      className="p-3 rounded-lg border border-slate-200 bg-white text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{law.lawName}</span>
                        <span className="font-mono text-amber-800 font-bold">
                          {law.article} {law.numeral || ''} {law.literal || ''}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">{law.violationDetail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist evaluation details */}
              <div className="space-y-2">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900 block">
                  Criterios de Admisibilidad Forense y Ministerial:
                </span>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden text-xs">
                  {selectedFinding.checklist?.map((chk) => (
                    <div key={chk.id} className="p-3 flex items-center justify-between bg-white">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-800">{chk.criterion}</span>
                        <p className="text-[11px] text-slate-500">{chk.evaluationNotes}</p>
                      </div>
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                          chk.score === 5
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {chk.score} / 5
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-2">
                <span className="font-bold text-amber-400 block uppercase tracking-wider text-[11px]">
                  Dictamen de Integridad Procesal:
                </span>
                <ul className="space-y-1 text-slate-300">
                  {selectedFinding.recommendationsFor5of5?.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <FileText className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-xs">
                Seleccione un hallazgo de la columna izquierda para inspeccionarlo o haga clic en{' '}
                <strong className="text-slate-700">"Agregar Hallazgo Pericial"</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
