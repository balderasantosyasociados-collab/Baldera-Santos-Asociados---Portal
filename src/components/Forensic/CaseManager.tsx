import React, { useState, useEffect } from 'react';
import { ForensicCase, AuditorProfile, AnalyzedDocument, ForensicFinding, TransparencyPortalSource } from '../../types/forensic';
import {
  getStoredCases,
  saveStoredCases,
  getStoredAuditors,
  saveStoredAuditors,
} from '../../data/forensicData';
import { ExpertReportViewer } from './ExpertReportViewer';
import { FindingsManager } from './FindingsManager';
import { TransparencyPortalsManager } from './TransparencyPortalsManager';
import { AuditorsManagement } from './AuditorsManagement';
import {
  Briefcase,
  FileText,
  Users,
  Globe,
  Scale,
  Plus,
  Edit2,
  Trash2,
  FileCheck2,
  FolderOpen,
  CheckCircle2,
  Building,
  Calendar,
} from 'lucide-react';

export const CaseManager: React.FC = () => {
  const [cases, setCases] = useState<ForensicCase[]>(() => getStoredCases());
  const [auditors, setAuditors] = useState<AuditorProfile[]>(() => getStoredAuditors());
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [subTab, setSubTab] = useState<'report' | 'findings' | 'transparency' | 'documents' | 'auditors'>('report');
  const [isEditingCaseInfo, setIsEditingCaseInfo] = useState(false);

  // Active case
  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  // Sync to storage
  useEffect(() => {
    saveStoredCases(cases);
  }, [cases]);

  useEffect(() => {
    saveStoredAuditors(auditors);
  }, [auditors]);

  const handleUpdateActiveCase = (updater: (prev: ForensicCase) => ForensicCase) => {
    setCases((prevCases) =>
      prevCases.map((c) => (c.id === activeCase.id ? updater(c) : c))
    );
  };

  const handleUpdateFindings = (updatedFindings: ForensicFinding[]) => {
    handleUpdateActiveCase((c) => {
      const totalDamage = updatedFindings.reduce((sum, f) => sum + (f.financialImpactDOP || 0), 0);
      return {
        ...c,
        findings: updatedFindings,
        totalDamageDOP: totalDamage,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const handleUpdatePortals = (updatedPortals: TransparencyPortalSource[]) => {
    handleUpdateActiveCase((c) => ({
      ...c,
      transparencyPortals: updatedPortals,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleAddFindingFromPortal = (newFinding: ForensicFinding) => {
    handleUpdateActiveCase((c) => {
      const newFindings = [...c.findings, newFinding];
      const totalDamage = newFindings.reduce((sum, f) => sum + (f.financialImpactDOP || 0), 0);
      return {
        ...c,
        findings: newFindings,
        totalDamageDOP: totalDamage,
        updatedAt: new Date().toISOString(),
      };
    });
    setSubTab('findings');
  };

  const handleUpdateAuditorsBank = (updatedBank: AuditorProfile[]) => {
    setAuditors(updatedBank);
    // Also update in active case if assigned
    handleUpdateActiveCase((c) => ({
      ...c,
      team: c.team.map((assigned) => {
        const found = updatedBank.find((b) => b.id === assigned.id);
        return found || assigned;
      }),
    }));
  };

  const handleAssignAuditorToAllCases = (auditorId: string) => {
    const auditor = auditors.find((a) => a.id === auditorId);
    if (!auditor) return;

    setCases((prev) =>
      prev.map((c) => {
        const alreadyIn = c.team.some((t) => t.id === auditor.id);
        if (alreadyIn) return c;
        return {
          ...c,
          team: [...c.team, auditor],
        };
      })
    );
  };

  const handleToggleAuditorInCase = (auditor: AuditorProfile) => {
    handleUpdateActiveCase((c) => {
      const exists = c.team.some((t) => t.id === auditor.id);
      if (exists) {
        if (c.team.length <= 1) {
          alert('Debe quedar al menos un perito asignado a la auditoría.');
          return c;
        }
        return {
          ...c,
          team: c.team.filter((t) => t.id !== auditor.id),
        };
      } else {
        return {
          ...c,
          team: [...c.team, auditor],
        };
      }
    });
  };

  // Create new case
  const handleCreateCase = () => {
    const caseNum = `EXP-2026-${Math.floor(1000 + Math.random() * 9000)}-PJ`;
    const newCase: ForensicCase = {
      id: `case-${Date.now()}`,
      caseNumber: caseNum,
      title: 'Dictamen Pericial Contable y Auditoría Forense Especial',
      auditedEntity: 'Nueva Entidad Auditada SRL',
      auditedRNC: '1-31-00000-0',
      targetCourtOrFiscalia: 'Procuraduría Especializada de Persecución de la Corrupción Administrativa (PEPCA)',
      caseType: 'Peritaje Judicial',
      periodStart: '2025-01-01',
      periodEnd: '2025-12-31',
      expertObjective: 'Verificar la legalidad de las operaciones y determinar perjuicio patrimonial.',
      scopeAndMethodology: 'Generado ÚNICA Y EXCLUSIVAMENTE a partir de los documentos examinados en el expediente pericial.',
      oathDeclaration: 'Declaramos bajo juramento legal independencia pericial y neutralidad técnica.',
      team: auditors.slice(0, 2),
      documentsAnalyzed: [],
      transparencyPortals: [],
      findings: [],
      totalDamageDOP: 0,
      pericialConclusion: 'Pendiente de formalización pericial.',
      finalLegalVerdict: 'Evidencias sujetas al protocolo de validación 5/5.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCases([...cases, newCase]);
    setSelectedCaseId(newCase.id);
    setIsEditingCaseInfo(true);
  };

  // Document management in active case
  const [newDocRef, setNewDocRef] = useState('FOLIO-');
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState<any>('Compras y Contrataciones');
  const [newDocOrigin, setNewDocOrigin] = useState('');
  const [newDocSummary, setNewDocSummary] = useState('');

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    const newDoc: AnalyzedDocument = {
      id: `doc-${Date.now()}`,
      refCode: newDocRef || `DOC-${Date.now().toString().slice(-4)}`,
      title: newDocTitle,
      sourceType: newDocType,
      institutionOrOrigin: newDocOrigin || activeCase.auditedEntity,
      documentDate: new Date().toISOString().split('T')[0],
      pagesCount: 1,
      contentSummary: newDocSummary,
    };

    handleUpdateActiveCase((c) => ({
      ...c,
      documentsAnalyzed: [...c.documentsAnalyzed, newDoc],
    }));

    setNewDocTitle('');
    setNewDocOrigin('');
    setNewDocSummary('');
  };

  const handleDeleteDocument = (docId: string) => {
    handleUpdateActiveCase((c) => ({
      ...c,
      documentsAnalyzed: c.documentsAnalyzed.filter((d) => d.id !== docId),
    }));
  };

  return (
    <div className="py-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Case Selector & Top Status Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                  {activeCase.caseNumber}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeCase.caseType}
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900 line-clamp-1 mt-0.5">
                {activeCase.title}
              </h2>
              <div className="text-xs text-slate-600 flex items-center gap-2">
                <span>Entidad: <strong>{activeCase.auditedEntity}</strong></span>
                <span>·</span>
                <span>Peritos Asignados: <strong>{activeCase.team.length}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            {/* Switcher dropdown */}
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="text-xs font-mono font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.caseNumber} - {c.auditedEntity.slice(0, 25)}...
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setIsEditingCaseInfo(!isEditingCaseInfo)}
              className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Editar datos del caso"
            >
              <Edit2 className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Detalles Caso</span>
            </button>

            <button
              type="button"
              onClick={handleCreateCase}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Caso</span>
            </button>
          </div>
        </div>

        {/* Edit Case Info Drawer / Panel */}
        {isEditingCaseInfo && (
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <h4 className="font-serif text-base font-bold text-slate-900">
                Información Procesal del Caso y Tribunal
              </h4>
              <button
                type="button"
                onClick={() => setIsEditingCaseInfo(false)}
                className="text-xs text-slate-500 hover:underline cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Número de Caso / Expediente</label>
                <input
                  type="text"
                  value={activeCase.caseNumber}
                  onChange={(e) => handleUpdateActiveCase((c) => ({ ...c, caseNumber: e.target.value }))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Entidad Auditada</label>
                <input
                  type="text"
                  value={activeCase.auditedEntity}
                  onChange={(e) => handleUpdateActiveCase((c) => ({ ...c, auditedEntity: e.target.value }))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">RNC de la Entidad</label>
                <input
                  type="text"
                  value={activeCase.auditedRNC}
                  onChange={(e) => handleUpdateActiveCase((c) => ({ ...c, auditedRNC: e.target.value }))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 uppercase mb-1">Tribunal / Fiscalía Requirente</label>
                <input
                  type="text"
                  value={activeCase.targetCourtOrFiscalia}
                  onChange={(e) => handleUpdateActiveCase((c) => ({ ...c, targetCourtOrFiscalia: e.target.value }))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Tipo de Dictamen</label>
                <select
                  value={activeCase.caseType}
                  onChange={(e) => handleUpdateActiveCase((c) => ({ ...c, caseType: e.target.value as any }))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                >
                  <option value="Peritaje Judicial">Peritaje Judicial</option>
                  <option value="Auditoría Forense">Auditoría Forense</option>
                  <option value="Investigación de Fraude">Investigación de Fraude</option>
                  <option value="Dictamen Pericial Contable">Dictamen Pericial Contable</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block font-bold text-slate-700 uppercase mb-1">Título del Dictamen</label>
                <input
                  type="text"
                  value={activeCase.title}
                  onChange={(e) => handleUpdateActiveCase((c) => ({ ...c, title: e.target.value }))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-medium"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Equipo de Peritos Asignados a este Caso:
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {auditors.map((aud) => {
                    const isAssigned = activeCase.team.some((t) => t.id === aud.id);
                    return (
                      <button
                        key={aud.id}
                        type="button"
                        onClick={() => handleToggleAuditorInCase(aud)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          isAssigned
                            ? 'bg-slate-900 text-amber-400 border-slate-900 font-bold'
                            : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isAssigned ? 'text-amber-400' : 'text-slate-300'}`} />
                        <span>{aud.name} ({aud.role.split(' ')[0]})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sub-navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-xs text-xs font-semibold">
          {[
            { id: 'report', label: 'Dictamen e Informe Pericial Oficial', icon: FileCheck2 },
            { id: 'findings', label: 'Hallazgos, Triángulo del Fraude & Leyes', icon: Scale },
            { id: 'transparency', label: 'Portales de Transparencia (Ley 200-04)', icon: Globe },
            { id: 'documents', label: 'Documentos Originales Analizados', icon: FolderOpen },
            { id: 'auditors', label: 'Banco de Auditores, Peritos & Firmas', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-amber-400 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Official Legal Report Viewer */}
        {subTab === 'report' && <ExpertReportViewer currentCase={activeCase} />}

        {/* Tab 2: Findings & Fraud Triangle */}
        {subTab === 'findings' && (
          <FindingsManager
            findings={activeCase.findings}
            onUpdateFindings={handleUpdateFindings}
          />
        )}

        {/* Tab 3: Transparency Portals */}
        {subTab === 'transparency' && (
          <TransparencyPortalsManager
            portals={activeCase.transparencyPortals}
            analyzedDocs={activeCase.documentsAnalyzed}
            onUpdatePortals={handleUpdatePortals}
            onGenerateFindingFromPortal={handleAddFindingFromPortal}
          />
        )}

        {/* Tab 4: Analyzed Original Documents */}
        {subTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Fuente Estricta & Cadena de Custodia
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-amber-600" />
                  Documentos Originales Analizados de la Entidad
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  El dictamen pericial se apoya única y exclusivamente en los folios y archivos registrados en este inventario probatorio.
                </p>
              </div>
            </div>

            {/* Document Intake Form */}
            <form onSubmit={handleAddDocument} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <h4 className="font-serif text-base font-bold text-slate-900">
                Incorporar Nuevo Documento Fuente al Expediente
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Folio / Referencia *</label>
                  <input
                    type="text"
                    required
                    value={newDocRef}
                    onChange={(e) => setNewDocRef(e.target.value)}
                    placeholder="FOLIO-124-180"
                    className="w-full px-3 py-2 border border-slate-300 rounded font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase mb-1">Título del Documento *</label>
                  <input
                    type="text"
                    required
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="Ej: Libro Mayor Contable / Extracto de Cuenta Banco de Reservas"
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Tipo de Evidencia</label>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  >
                    <option value="Compras y Contrataciones">Compras y Contrataciones</option>
                    <option value="Nómina Oficial">Nómina Oficial</option>
                    <option value="Extracto Bancario">Extracto Bancario</option>
                    <option value="Facturas / NCF">Facturas / NCF Formato 606</option>
                    <option value="Contrato">Contrato Administrativo</option>
                    <option value="Acta Administrativa">Acta Administrativa</option>
                    <option value="Otro">Otro Soporte Físico</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase mb-1">Origen / Custodia</label>
                  <input
                    type="text"
                    value={newDocOrigin}
                    onChange={(e) => setNewDocOrigin(e.target.value)}
                    placeholder="Ej: Archivo Central de Contabilidad de la Entidad"
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-bold text-slate-700 uppercase mb-1">Resumen del Contenido Factual Analizado</label>
                  <textarea
                    rows={2}
                    value={newDocSummary}
                    onChange={(e) => setNewDocSummary(e.target.value)}
                    placeholder="Describa brevemente qué hechos o cifras comprueba este documento..."
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-amber-400 text-xs font-bold rounded-lg shadow-xs hover:bg-slate-800 cursor-pointer"
                >
                  + Agregar al Inventario Probatorio
                </button>
              </div>
            </form>

            {/* Documents List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs text-xs">
              <table className="w-full text-left divide-y divide-slate-200">
                <thead className="bg-slate-100 text-[10px] font-bold text-slate-700 uppercase">
                  <tr>
                    <th className="p-3">Referencia</th>
                    <th className="p-3">Título y Resumen Fáctico</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3">Origen</th>
                    <th className="p-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  {activeCase.documentsAnalyzed.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-amber-900">{doc.refCode}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{doc.title}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">{doc.contentSummary}</div>
                      </td>
                      <td className="p-3 text-slate-600">{doc.sourceType}</td>
                      <td className="p-3 text-slate-600">{doc.institutionOrOrigin}</td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="Eliminar documento"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Auditors Bank & Signatures */}
        {subTab === 'auditors' && (
          <AuditorsManagement
            auditors={auditors}
            onUpdateAuditors={handleUpdateAuditorsBank}
            onAssignToAllCases={handleAssignAuditorToAllCases}
          />
        )}
      </div>
    </div>
  );
};
