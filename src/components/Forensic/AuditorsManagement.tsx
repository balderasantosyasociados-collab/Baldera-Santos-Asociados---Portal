import React, { useState } from 'react';
import { AuditorProfile, AuditorRole, SignatureType } from '../../types/forensic';
import { SignaturePad } from './SignaturePad';
import { Users, UserPlus, Edit3, Trash2, ShieldCheck, Check, Sparkles, Award, FileSpreadsheet, Download } from 'lucide-react';

interface AuditorsManagementProps {
  auditors: AuditorProfile[];
  onUpdateAuditors: (updated: AuditorProfile[]) => void;
  onAssignToAllCases?: (auditorId: string) => void;
}

export const AuditorsManagement: React.FC<AuditorsManagementProps> = ({
  auditors,
  onUpdateAuditors,
  onAssignToAllCases,
}) => {
  const [editingAuditor, setEditingAuditor] = useState<AuditorProfile | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [assignedMessage, setAssignedMessage] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [rnc, setRnc] = useState('');
  const [exequatur, setExequatur] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [role, setRole] = useState<AuditorRole>('Auditor Forense Líder');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signatureType, setSignatureType] = useState<SignatureType>('image');
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | undefined>(undefined);
  const [isMasterAdmin, setIsMasterAdmin] = useState(false);

  const startCreate = () => {
    setEditingAuditor(null);
    setName('');
    setCedula('');
    setRnc('');
    setExequatur('');
    setSpecialty('Auditor Forense & Perito Contable');
    setRole('Auditor Forense Líder');
    setEmail('');
    setPhone('');
    setSignatureType('image');
    setSignatureDataUrl(undefined);
    setIsMasterAdmin(false);
    setIsCreatingNew(true);
  };

  const startEdit = (aud: AuditorProfile) => {
    setIsCreatingNew(false);
    setEditingAuditor(aud);
    setName(aud.name);
    setCedula(aud.cedula);
    setRnc(aud.rnc || '');
    setExequatur(aud.exequatur);
    setSpecialty(aud.specialty);
    setRole(aud.role);
    setEmail(aud.email);
    setPhone(aud.phone);
    setSignatureType(aud.signatureType);
    setSignatureDataUrl(aud.signatureDataUrl);
    setIsMasterAdmin(aud.isMasterAdmin);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAuditor) {
      // Update existing
      const updated = auditors.map((a) =>
        a.id === editingAuditor.id
          ? {
              ...a,
              name,
              cedula,
              rnc,
              exequatur,
              specialty,
              role,
              email,
              phone,
              signatureType,
              signatureDataUrl,
              isMasterAdmin,
            }
          : a
      );
      onUpdateAuditors(updated);
      setEditingAuditor(null);
    } else {
      // Create new
      const newAud: AuditorProfile = {
        id: `aud-${Date.now()}`,
        name,
        cedula,
        rnc,
        exequatur,
        specialty,
        role,
        email,
        phone,
        signatureType,
        signatureDataUrl,
        isMasterAdmin,
        active: true,
      };
      onUpdateAuditors([...auditors, newAud]);
      setIsCreatingNew(false);
    }
  };

  const handleDelete = (id: string) => {
    if (auditors.length <= 1) {
      alert('Debe existir al menos un auditor o perito registrado en el sistema.');
      return;
    }
    if (confirm('¿Está seguro de eliminar a este auditor de la nómina de peritos?')) {
      onUpdateAuditors(auditors.filter((a) => a.id !== id));
      if (editingAuditor?.id === id) {
        setEditingAuditor(null);
      }
    }
  };

  const handleAssignToAll = (auditor: AuditorProfile) => {
    if (onAssignToAllCases) {
      onAssignToAllCases(auditor.id);
      setAssignedMessage(`Perito "${auditor.name}" asignado a todas las auditorías en curso.`);
      setTimeout(() => setAssignedMessage(null), 3000);
    }
  };

  const handleExportAuditorsList = () => {
    const header = 'Nombre,Rol,Cédula,Exequátur/Colegiatura,Especialidad,Correo,Teléfono,TipoFirma\n';
    const rows = auditors
      .map(
        (a) =>
          `"${a.name}","${a.role}","${a.cedula}","${a.exequatur}","${a.specialty}","${a.email}","${a.phone}","${a.signatureType}"`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'banco_auditores_peritos_bsa.csv';
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Cuerpo Pericial & Firmas Oficiales
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Gestión de Auditores, Peritos Judiciales y Administrador Master
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Administre credenciales oficiales (ICPARD, Colegiaturas, Decretos), cargos y firmas digitales o físicas que estamparán la fe pública en el dictamen pericial.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportAuditorsList}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Exportar Banco (.CSV)</span>
          </button>

          <button
            type="button"
            onClick={startCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Agregar Nuevo Perito</span>
          </button>
        </div>
      </div>

      {assignedMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{assignedMessage}</span>
        </div>
      )}

      {/* Main Grid: List of Auditors & Form Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* List of Auditors Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Peritos y Auditores Registrados ({auditors.length})</span>
            <span>Estatus y Credenciales</span>
          </div>

          <div className="space-y-3">
            {auditors.map((aud) => {
              const isSelected = editingAuditor?.id === aud.id;
              return (
                <div
                  key={aud.id}
                  className={`bg-white rounded-xl border p-5 transition-all shadow-xs ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-serif text-base font-bold text-slate-900">
                          {aud.name}
                        </span>
                        {aud.isMasterAdmin && (
                          <span className="text-[10px] bg-slate-900 text-amber-400 font-mono px-2 py-0.5 rounded font-bold">
                            MASTER ADMIN
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-amber-700 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>{aud.role}</span>
                      </div>

                      <p className="text-xs text-slate-600">{aud.specialty}</p>

                      <div className="pt-2 text-[11px] text-slate-500 font-mono space-y-0.5 border-t border-slate-100 mt-2">
                        <div>
                          <strong>Cédula:</strong> {aud.cedula}
                          {aud.rnc ? ` | RNC: ${aud.rnc}` : ''}
                        </div>
                        <div>
                          <strong>Exequátur / Colegiatura:</strong> {aud.exequatur}
                        </div>
                        <div>
                          <strong>Contacto:</strong> {aud.phone} · {aud.email}
                        </div>
                      </div>
                    </div>

                    {/* Signature Preview Thumbnail */}
                    <div className="shrink-0 text-center">
                      <div className="w-24 h-14 bg-slate-50 border border-slate-200 rounded flex items-center justify-center overflow-hidden">
                        {aud.signatureType === 'physical' ? (
                          <span className="text-[9px] text-slate-400 text-center px-1 font-mono">
                            Firma Física Manuscrita
                          </span>
                        ) : aud.signatureDataUrl ? (
                          <img
                            src={aud.signatureDataUrl}
                            alt="Firma"
                            className="max-h-12 max-w-[90px] object-contain"
                          />
                        ) : (
                          <span className="text-[9px] text-slate-400">Sin firma</span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase mt-1 block">
                        {aud.signatureType}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => handleAssignToAll(aud)}
                      className="text-amber-800 hover:text-amber-950 font-medium hover:underline cursor-pointer"
                    >
                      + Asignar a todas las auditorías
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(aud)}
                        className="px-2.5 py-1 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3 text-slate-600" />
                        <span>Editar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(aud.id)}
                        className="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                        title="Eliminar del banco"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Edit / Create Form Column */}
        <div className="lg:col-span-6 sticky top-28 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="border-b border-slate-200 pb-4 mb-5">
            <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>
                {editingAuditor
                  ? `Editar Perito: ${editingAuditor.name}`
                  : isCreatingNew
                  ? 'Registrar Nuevo Perito / Auditor'
                  : 'Seleccione un Perito para Editar'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Todos los datos ingresados se imprimirán con validez legal en la hoja de firmas del dictamen pericial.
            </p>
          </div>

          {(editingAuditor || isCreatingNew) ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label htmlFor="aud-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Nombre Completo con Grados y Título Profesional *
                  </label>
                  <input
                    id="aud-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Lic. Rafael Baldera Santos, CPA"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="aud-cedula" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Cédula de Identidad *
                  </label>
                  <input
                    id="aud-cedula"
                    type="text"
                    required
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="001-XXXXXXX-X"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="aud-rnc" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    RNC Profesional (Opcional)
                  </label>
                  <input
                    id="aud-rnc"
                    type="text"
                    value={rnc}
                    onChange={(e) => setRnc(e.target.value)}
                    placeholder="1-31-XXXXX-X"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="aud-exequatur" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Número de Exequátur, Colegiatura o Decreto *
                  </label>
                  <input
                    id="aud-exequatur"
                    type="text"
                    required
                    value={exequatur}
                    onChange={(e) => setExequatur(e.target.value)}
                    placeholder="Ej: Decreto Núm. 482-08 / ICPARD No. 12845"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Rol Pericial en el Caso *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as AuditorRole)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Perito Judicial Principal">Perito Judicial Principal</option>
                    <option value="Auditor Forense Líder">Auditor Forense Líder</option>
                    <option value="Supervisor de Evidencias">Supervisor de Evidencias</option>
                    <option value="Consultor Legal & Tributario">Consultor Legal & Tributario</option>
                    <option value="Auditor Actuante">Auditor Actuante</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="aud-specialty" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Especialidad Pericial
                  </label>
                  <input
                    id="aud-specialty"
                    type="text"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="Ej: Auditoría Forense y Peritaje Judicial"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="aud-phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Teléfono
                  </label>
                  <input
                    id="aud-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (829) 000-0000"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="aud-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    id="aud-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="perito@balderasantos.com"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Master Admin toggle */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={isMasterAdmin}
                    onChange={(e) => setIsMasterAdmin(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-900">
                    Otorgar Privilegios de Administrador Master del Sistema
                  </span>
                </label>
              </div>

              {/* Signature configuration */}
              <div className="pt-2">
                <SignaturePad
                  currentType={signatureType}
                  currentDataUrl={signatureDataUrl}
                  auditorName={name || 'Perito'}
                  exequatur={exequatur || 'ICPARD'}
                  onSaveSignature={(type, dataUrl) => {
                    setSignatureType(type);
                    setSignatureDataUrl(dataUrl);
                  }}
                />
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingAuditor(null);
                    setIsCreatingNew(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-sm cursor-pointer"
                >
                  {editingAuditor ? 'Guardar Cambios de Perito' : 'Registrar Perito en el Sistema'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-3">
              <Users className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-xs">
                Seleccione un auditor de la lista para modificar sus credenciales y firma, o haga clic en{' '}
                <strong className="text-slate-700">"Agregar Nuevo Perito"</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
