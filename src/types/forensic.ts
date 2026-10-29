/**
 * Types for Judicial Expert Witness & Forensic Audit System
 * Baldera Santos & Asociados - Dictamen e Informe Pericial Forense
 */

export type AuditorRole =
  | 'Perito Judicial Principal'
  | 'Auditor Forense Líder'
  | 'Supervisor de Evidencias'
  | 'Consultor Legal & Tributario'
  | 'Auditor Actuante';

export type SignatureType = 'image' | 'canvas' | 'physical';

export interface AuditorProfile {
  id: string;
  name: string;
  cedula: string;
  rnc?: string;
  exequatur: string; // Exequátur o Colegiatura (ICPARD / CARD)
  specialty: string;
  role: AuditorRole;
  email: string;
  phone: string;
  signatureType: SignatureType;
  signatureDataUrl?: string; // Base64 image of signature if electronic
  isMasterAdmin: boolean;
  active: boolean;
}

export interface AnalyzedDocument {
  id: string;
  refCode: string; // e.g. "DOC-NOM-01", "FOLIO-124"
  title: string;
  sourceType: 'Nómina Oficial' | 'Compras y Contrataciones' | 'Extracto Bancario' | 'Facturas / NCF' | 'Contrato' | 'Acta Administrativa' | 'Otro';
  institutionOrOrigin: string;
  documentDate: string;
  pagesCount: number;
  digitalHashSha256?: string; // Digital fingerprint of analyzed original document
  contentSummary: string; // Strictly analyzed factual content
}

export interface TransparencyPortalSource {
  id: string;
  portalName: string; // e.g. "Portal Transparencia Institucional - Nómina y Compras"
  institution: string;
  url: string;
  evaluatedSection: 'Nómina' | 'Compras y Contrataciones' | 'Informes Financieros' | 'Gestión y Presupuesto';
  consultationDate: string;
  capturedEvidence: string;
  identifiedAnomaly: string;
  crossReferencedDocId?: string; // Link to an analyzed document
}

export interface LegalNormReference {
  id: string;
  lawName: string; // e.g. "Ley No. 340-06 sobre Compras y Contrataciones Públicas"
  article: string; // e.g. "Art. 14"
  numeral?: string; // e.g. "Num. 3"
  literal?: string; // e.g. "Lit. a"
  topic: string; // e.g. "Inhabilidades para contratar con el Estado"
  violationDetail: string; // Factual breach detected
}

export interface FraudTriangle {
  pressureIncentive: string; // Presión o Incentivo financiero/personal
  opportunity: string; // Oportunidad por falta de control interno / segregación de funciones
  rationalization: string; // Racionalización o Justificación moral del autor
}

export interface ForensicChecklistItem {
  id: string;
  criterion: string; // e.g. "Autenticidad e Integridad de la Fuente Primaria"
  description: string;
  score: number; // 1 to 5
  isFulfilled: boolean; // true if score === 5
  evaluationNotes: string;
}

export interface ForensicFinding {
  id: string;
  auditRef: string; // e.g. "REF-AUD-PT-01"
  title: string;
  factualDescription: string; // Strictly based on analyzed case documents
  evidenceReference: string; // Folios, annexes, specific pages
  financialImpactDOP: number;
  transparencyPortalLink?: string;
  applicableLaws: LegalNormReference[];
  fraudTriangle: FraudTriangle;
  procedureDescription: string; // How evidence was retrieved, tested & verified for tribunal unassailability
  checklist: ForensicChecklistItem[];
  complianceScore: number; // 1.0 to 5.0
  status: 'Aprobada 5/5' | 'Pendiente' | 'Requiere Subsanación';
  recommendationsFor5of5: string[];
}

export interface ForensicCase {
  id: string;
  caseNumber: string; // e.g. "EXP-2026-0842-PJ"
  title: string;
  auditedEntity: string;
  auditedRNC: string;
  targetCourtOrFiscalia: string; // Tribunal o Fiscalía requirente
  caseType: 'Peritaje Judicial' | 'Auditoría Forense' | 'Investigación de Fraude' | 'Dictamen Pericial Contable';
  periodStart: string;
  periodEnd: string;
  expertObjective: string;
  scopeAndMethodology: string;
  oathDeclaration: string; // Juramento de estricta veracidad y neutralidad pericial
  team: AuditorProfile[];
  documentsAnalyzed: AnalyzedDocument[];
  transparencyPortals: TransparencyPortalSource[];
  findings: ForensicFinding[];
  totalDamageDOP: number;
  pericialConclusion: string;
  finalLegalVerdict: string;
  createdAt: string;
  updatedAt: string;
}
