import { AuditorProfile, ForensicCase } from '../types/forensic';

export const INITIAL_AUDITORS: AuditorProfile[] = [
  {
    id: 'aud-01',
    name: 'Lic. Rafael Baldera Santos, CPA',
    cedula: '001-0894215-3',
    rnc: '1-31-49528-9',
    exequatur: 'Decreto Núm. 482-08 / ICPARD No. 12845',
    specialty: 'Perito Judicial Contable & Auditor Forense Certificado',
    role: 'Perito Judicial Principal',
    email: 'balderasantosyasociados@gmail.com',
    phone: '+1 (829) 771-7390',
    signatureType: 'image',
    signatureDataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="70" viewBox="0 0 220 70"><path d="M15,45 Q40,15 65,40 T110,30 T160,50 T200,25" fill="none" stroke="%231e293b" stroke-width="2.5" stroke-linecap="round"/><path d="M40,55 Q80,20 130,45" fill="none" stroke="%231e293b" stroke-width="1.8"/><path d="M25,58 L190,52" fill="none" stroke="%23334155" stroke-width="1.2"/></svg>',
    isMasterAdmin: true,
    active: true,
  },
  {
    id: 'aud-02',
    name: 'Licda. Carmen Milagros Santos Peña, CPA',
    cedula: '001-1452984-7',
    exequatur: 'Decreto Núm. 215-12 / ICPARD No. 15920',
    specialty: 'Auditoría Forense Gubernamental & Control Interno',
    role: 'Auditor Forense Líder',
    email: 'carmen.santos@balderasantos.com',
    phone: '+1 (809) 697-8570',
    signatureType: 'image',
    signatureDataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="70" viewBox="0 0 220 70"><path d="M20,38 Q50,10 75,35 T125,25 T175,45" fill="none" stroke="%231e293b" stroke-width="2.2" stroke-linecap="round"/><path d="M30,48 Q70,55 180,48" fill="none" stroke="%23334155" stroke-width="1.5"/></svg>',
    isMasterAdmin: false,
    active: true,
  },
  {
    id: 'aud-03',
    name: 'Dr. Alejandro Méndez Rosario, Abog.',
    cedula: '402-2309148-2',
    exequatur: 'CARD Núm. 28941 / Suprema Corte de Justicia',
    specialty: 'Derecho Penal Económico, Administrativo y Tributario',
    role: 'Consultor Legal & Tributario',
    email: 'legal@balderasantos.com',
    phone: '+1 (829) 554-1120',
    signatureType: 'image',
    signatureDataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="70" viewBox="0 0 220 70"><path d="M15,48 Q45,20 80,40 T130,20 T180,45 T205,35" fill="none" stroke="%230f172a" stroke-width="2.2" stroke-linecap="round"/><path d="M35,60 L185,55" fill="none" stroke="%23475569" stroke-width="1.2"/></svg>',
    isMasterAdmin: false,
    active: true,
  },
  {
    id: 'aud-04',
    name: 'Lic. José Alberto Tejeda, CFE',
    cedula: '001-1987452-1',
    exequatur: 'ICPARD No. 18450 / Certified Fraud Examiner',
    specialty: 'Investigación de Fraudes & Cadena de Custodia Digital',
    role: 'Supervisor de Evidencias',
    email: 'jose.tejeda@balderasantos.com',
    phone: '+1 (809) 512-8874',
    signatureType: 'physical',
    isMasterAdmin: false,
    active: true,
  },
];

export const INITIAL_CASES: ForensicCase[] = [
  {
    id: 'case-01',
    caseNumber: 'EXP-2026-0842-PJ',
    title: 'Dictamen Pericial Contable y Auditoría Forense Especial sobre Adquisiciones, Nómina y Formatos Fiscales',
    auditedEntity: 'Corporación de Servicios y Suministros Hospitalarios Dominicana, SRL',
    auditedRNC: '1-31-49528-9',
    targetCourtOrFiscalia: 'Segunda Sala de la Cámara Penal del Distrito Nacional / Procuraduría Especializada de Persecución de la Corrupción Administrativa (PEPCA)',
    caseType: 'Peritaje Judicial',
    periodStart: '2024-01-01',
    periodEnd: '2025-12-31',
    expertObjective:
      'Determinar con certeza matemática y sustento documental primario inobjetable la existencia de fraccionamiento en compras públicas, pagos salariales no justificados en el portal de transparencia institucional, e inconsistencias de comprobantes fiscales frente a las declaraciones juradas de la DGII.',
    scopeAndMethodology:
      'El presente dictamen e informe pericial se fundamenta ÚNICA Y EXCLUSIVAMENTE en los documentos originales, expedientes de compras, nóminas oficiales de la institución, declaraciones juradas en DGII (Formatos 606 y 607) y descargas directas certificadas del Portal de Transparencia de la entidad. No se admitieron conjeturas, fuentes secundarias ni estimaciones no respaldadas en foliatura física y huella digital verificada.',
    oathDeclaration:
      'Los peritos y auditores actuantes declaramos bajo juramento legal que hemos actuado con estricta independencia, imparcialidad, apego a las normas internacionales de auditoría forense y a las leyes de la República Dominicana, limitando nuestras conclusiones a los hechos fidedignos examinados en el expediente pericial.',
    team: [INITIAL_AUDITORS[0], INITIAL_AUDITORS[1], INITIAL_AUDITORS[2]],
    documentsAnalyzed: [
      {
        id: 'doc-01',
        refCode: 'FOLIO-01-45',
        title: 'Expediente Físico y Digital de Órdenes de Compra Menores (OCM-2025)',
        sourceType: 'Compras y Contrataciones',
        institutionOrOrigin: 'Departamento de Compras de la Entidad Auditada',
        documentDate: '2025-06-18',
        pagesCount: 45,
        digitalHashSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        contentSummary:
          'Contiene 14 órdenes de compra emitidas consecutivamente en menos de 5 días hábiles al mismo proveedor, todas por montos de RD$ 185,000.00 a RD$ 195,000.00, situándose deliberadamente justo por debajo del umbral de compras por debajo de licitación.',
      },
      {
        id: 'doc-02',
        refCode: 'FOLIO-46-88',
        title: 'Planillas Salariales Oficiales DGT-3 y Reporte SUIR de la TSS',
        sourceType: 'Nómina Oficial',
        institutionOrOrigin: 'Dirección de Gestión Humana y Tesorería de la Seguridad Social',
        documentDate: '2025-09-30',
        pagesCount: 43,
        digitalHashSha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        contentSummary:
          'Nómina mensual correspondiente al período de análisis donde se detectan 6 colaboradores activos con cobro mensual simultáneo bajo idéntica cédula en otra institución pública sin compatibilidad horaria.',
      },
      {
        id: 'doc-03',
        refCode: 'FOLIO-89-130',
        title: 'Certificación de Formato 606 y Comprobantes Fiscales B01',
        sourceType: 'Facturas / NCF',
        institutionOrOrigin: 'Dirección General de Impuestos Internos (DGII)',
        documentDate: '2025-11-20',
        pagesCount: 42,
        digitalHashSha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
        contentSummary:
          'Reporte transaccional de compras donde figuran comprobantes NCF B01 emitidos por un contribuyente con estatus "Suspendido por Falta de Localización" en la DGII y sin actividad económica real.',
      },
    ],
    transparencyPortals: [
      {
        id: 'tp-01',
        portalName: 'Portal Único de Transparencia del Estado Dominicano',
        institution: 'Entidad Auditada',
        url: 'https://transparencia.gob.do/instituciones/entidad-auditada',
        evaluatedSection: 'Compras y Contrataciones',
        consultationDate: '2026-02-14',
        capturedEvidence:
          'Descarga certificada de la pestaña "Compras Menores Realizadas en el Trimestre II-2025". Se verificó la omisión deliberada de publicación de los contratos de adjudicación directa.',
        identifiedAnomaly:
          'Incumplimiento de la obligación de máxima publicidad establecida en la Ley 200-04 y Ley 340-06.',
        crossReferencedDocId: 'doc-01',
      },
      {
        id: 'tp-02',
        portalName: 'Portal de Transparencia Institucional - Nómina Pública',
        institution: 'Entidad Auditada',
        url: 'https://entidad-auditada.gob.do/transparencia/nomina',
        evaluatedSection: 'Nómina',
        consultationDate: '2026-02-15',
        capturedEvidence:
          'Comparación entre el archivo público mensual publicado en Excel (.xlsx) y la liquidación bancaria del Banco de Reservas.',
        identifiedAnomaly:
          'Diferencia no conciliada de RD$ 845,000.00 en desembolsos no reflejados en la lista de colaboradores del portal de transparencia.',
        crossReferencedDocId: 'doc-02',
      },
    ],
    findings: [
      {
        id: 'f-01',
        auditRef: 'REF-AUD-PT-01',
        title: 'Fraccionamiento Ilegítimo de Adquisiciones Públicas para Evadir Proceso Licitatorio',
        factualDescription:
          'Durante el período analizado, se comprobó que la entidad emitió 14 órdenes de compra consecutivas en favor de un mismo suplidor (RNC 1-31-XXXXX-X) entre el 10 y el 15 de mayo de 2025, por un monto agregado de RD$ 2,680,000.00. Cada orden fue emitida por un valor inferior a RD$ 200,000.00 con la finalidad demostrada de eludir el procedimiento de Comparación de Precios o Licitación Pública exigido para suministros hospitalarios de idéntico objeto.',
        evidenceReference: 'Folios 01 al 45 del Expediente Pericial; Órdenes de Compra OCM-2025-019 a 034; Portal Transparencia Captura PT-COMP-2025.',
        financialImpactDOP: 2680000,
        transparencyPortalLink: 'https://transparencia.gob.do/instituciones/compras-menores',
        applicableLaws: [
          {
            id: 'law-01',
            lawName: 'Ley No. 340-06 sobre Compras y Contrataciones de Bienes, Servicios, Obras y Concesiones',
            article: 'Art. 14',
            numeral: 'Numeral 3',
            literal: 'Literal a',
            topic: 'Prohibición de Fraccionamiento',
            violationDetail:
              'División fraudulenta del objeto de contratación para evitar la aplicación de los procedimientos de selección obligatorios.',
          },
          {
            id: 'law-02',
            lawName: 'Ley No. 340-06',
            article: 'Art. 65',
            topic: 'Nulidad y Responsabilidad Administrativa y Penal de Funcionarios Actuantes',
            violationDetail:
              'Los contratos suscritos con violación a los preceptos de esta ley son nulos de pleno derecho y generan responsabilidad solidaria.',
          },
          {
            id: 'law-03',
            lawName: 'Código Penal de la República Dominicana',
            article: 'Art. 175',
            topic: 'Concusión y Desvío de Fondos Públicos',
            violationDetail:
              'Uso de facultades del cargo para otorgar beneficios indebidos en perjuicio del erario público.',
          },
        ],
        fraudTriangle: {
          pressureIncentive:
            'Presión para ejecutar el presupuesto antes del cierre trimestral y favorecer financieramente a un proveedor específico vinculado a la administración.',
          opportunity:
            'Ausencia de controles cruzados en el sistema ERP entre el Departamento de Compras y la Contraloría Interna, permitiendo emitir órdenes múltiples el mismo día sin alerta automática de consolidación.',
          rationalization:
            'Los directivos argumentaron "urgencia administrativa de insumos médicos", a pesar de que los materiales eran de consumo recurrente y no de emergencia sanitaria imprevista.',
        },
        procedureDescription:
          'Se procedió a la extracción física de las 14 órdenes de pago originales, cotejo de firmas autorizantes, trazabilidad bancaria de cheques/transferencias liquidadas en el Banco de Reservas, y comparación digital de la fecha y hora de registro en el Portal Transaccional de la DGCP. La prueba física original se encuentra sellada, foliada y lacrada bajo estricta cadena de custodia pericial.',
        checklist: [
          {
            id: 'chk-01',
            criterion: 'Autenticidad e Integridad de la Fuente Primaria',
            description: 'Documento original extraído con soporte físico y firma autógrafa.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Constatado en original foliado con sello institucional.',
          },
          {
            id: 'chk-02',
            criterion: 'Legalidad de la Obtención de la Prueba',
            description: 'Obtenida mediante orden judicial y entrega formal con acuse de recibo.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Amparada en auto de designación pericial y cadena de custodia.',
          },
          {
            id: 'chk-03',
            criterion: 'Corroboración Cruzada con Fuentes Externas',
            description: 'Verificación en Portal de Compras DGCP y estados bancarios del proveedor.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Coincidencia al 100% en montos, fechas y beneficiarios.',
          },
          {
            id: 'chk-04',
            criterion: 'Pertinencia y Relevancia Jurídica para el Tribunal',
            description: 'Prueba idónea para tipificar la infracción del Art. 14 Ley 340-06.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Imprescindible para el esclarecimiento de los hechos procesales.',
          },
          {
            id: 'chk-05',
            criterion: 'Inobjetabilidad Técnica de la Metodología Forense',
            description: 'Procedimiento auditable, trazable y no basado en conjeturas.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Aplicación de Normas Internacionales de Auditoría Forense (NAF).',
          },
        ],
        complianceScore: 5.0,
        status: 'Aprobada 5/5',
        recommendationsFor5of5: [
          'La evidencia cumple con el estándar de certeza máxima 5/5 exigido por el Ministerio Público y tribunales.',
        ],
      },
      {
        id: 'f-02',
        auditRef: 'REF-AUD-PT-02',
        title: 'Desembolsos por Personal sin Prestación Efectiva de Servicios e Inconsistencia en Portal de Transparencia',
        factualDescription:
          'Se identificaron 4 colaboradores en la nómina bancaria con asignaciones salariales mensuales de RD$ 65,000.00 cada uno (totalizando RD$ 1,560,000.00 en el año), los cuales no cuentan con registro de asistencia biométrica, no figuran en las publicaciones del Portal de Transparencia Institucional y mantienen simultáneamente jornada laboral a tiempo completo en otra dependencia del Estado.',
        evidenceReference: 'Folios 46 al 88 del Expediente; Planillas DGT-3; Reportes SUIR de TSS; Registros de Control Biométrico.',
        financialImpactDOP: 1560000,
        transparencyPortalLink: 'https://entidad-auditada.gob.do/transparencia/nomina',
        applicableLaws: [
          {
            id: 'law-04',
            lawName: 'Ley No. 41-08 de Función Pública',
            article: 'Art. 80',
            numeral: 'Numeral 5',
            topic: 'Incompatibilidad de Cargos y Cobro Múltiple',
            violationDetail:
              'Prohibición expresa a todo servidor público de prestar servicios y recibir remuneración de más de un cargo público remunerado.',
          },
          {
            id: 'law-05',
            lawName: 'Ley No. 10-07 que instituye el Sistema Nacional de Control Interno y de la Contraloría General',
            article: 'Art. 25',
            topic: 'Obligación de Evidencia de Desempeño Laboral',
            violationDetail:
              'No podrá efectuarse ningún pago de nómina sin la previa constatación del servicio prestado conforme al manual de puestos.',
          },
        ],
        fraudTriangle: {
          pressureIncentive:
            'Compromisos políticos y pago de favores personales ajenos a la función de la institución.',
          opportunity:
            'La Dirección de Gestión Humana no auditaba los cruces con la TSS ni cotejaba los listados biométricos antes de autorizar el archivo de dispersión bancaria.',
          rationalization:
            'Se alegó que los empleados realizaban "asesorías externas sin necesidad de presencialidad", sin existir contratos de consultoría ni un solo informe entregable que lo avale.',
        },
        procedureDescription:
          'Se efectuó el cruce cruzado entre la nómina dispersada por el Banco de Reservas, la planilla DGT-3 del Ministerio de Trabajo, los datos del sistema SUIR de la TSS y la relación de colaboradores del Portal de Transparencia. Asimismo, se inspeccionó el servidor biométrico de acceso.',
        checklist: [
          {
            id: 'chk-06',
            criterion: 'Autenticidad e Integridad de la Fuente Primaria',
            description: 'Archivos bancarios y biométricos certificados por el oficial de cumplimiento.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Registros exportados directamente de la base de datos de control de asistencia.',
          },
          {
            id: 'chk-07',
            criterion: 'Legalidad de la Obtención de la Prueba',
            description: 'Inspección ocular realizada con presencia de notario público y peritos.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Acta notarial de comprobación de inasistencia levantada.',
          },
          {
            id: 'chk-08',
            criterion: 'Corroboración Cruzada con Fuentes Externas',
            description: 'Consulta oficial al padrón de servidores de la Contraloría General.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Confirmada duplicidad de nómina en Ministerio de Educación y Salud.',
          },
          {
            id: 'chk-09',
            criterion: 'Pertinencia y Relevancia Jurídica para el Tribunal',
            description: 'Acredita el perjuicio económico directo y desvío intencional de fondos.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Soporte fehaciente para la acusación penal.',
          },
          {
            id: 'chk-10',
            criterion: 'Inobjetabilidad Técnica de la Metodología Forense',
            description: 'Algoritmo de cruce por número de cédula verificado.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Cero margen de error por homonimia.',
          },
        ],
        complianceScore: 5.0,
        status: 'Aprobada 5/5',
        recommendationsFor5of5: [
          'Evidencia 100% blindada e irrebatible.',
        ],
      },
      {
        id: 'f-03',
        auditRef: 'REF-AUD-PT-03',
        title: 'Inconsistencias en Formatos 606 ante DGII y Comprobantes Fiscales NCF B01 No Deducibles',
        factualDescription:
          'El análisis pericial de los comprobantes de compra remitidos a la DGII en el Formato 606 del ejercicio fiscal 2024 evidenció la inclusión de facturas con valor de crédito fiscal (B01) por valor de RD$ 1,840,000.00 provenientes de un suplidor fantasma cuyo RNC se encontraba suspendido al momento de la supuesta transacción, deduciendo ilegalmente RD$ 331,200.00 de ITBIS.',
        evidenceReference: 'Folios 89 al 130 del Expediente; Formato 606 DGII de fechas Mayo a Octubre 2024; Certificación DGII.',
        financialImpactDOP: 2171200, // Costo + ITBIS evadido
        applicableLaws: [
          {
            id: 'law-06',
            lawName: 'Ley No. 11-92 Código Tributario de la República Dominicana',
            article: 'Art. 236 y 237',
            numeral: 'Numeral 1',
            literal: 'Literal b',
            topic: 'Defraudación Tributaria y Uso de Comprobantes Inexistentes',
            violationDetail:
              'Deducción indebida de gastos simulados para reducir la base imponible del Impuesto Sobre la Renta (IR-2).',
          },
          {
            id: 'law-07',
            lawName: 'Ley No. 155-17 contra el Lavado de Activos y el Financiamiento del Terrorismo',
            article: 'Art. 3',
            numeral: 'Numeral 1',
            topic: 'Delito Tributario Calificado como Delito Precedente',
            violationDetail:
              'Ocultamiento del origen ilícito de fondos provenientes de maniobras fraudulentas con comprobantes fiscales.',
          },
        ],
        fraudTriangle: {
          pressureIncentive:
            'Abaratar artificialmente el pago de impuesto sobre la renta corporativo (27%) y apropiarse indebidamente del crédito del ITBIS.',
          opportunity:
            'Falta de verificación previa del estado del RNC del proveedor en la consulta pública de la Oficina Virtual de la DGII.',
          rationalization:
            'La administración pretendió desligarse alegando que "el suplidor les entregó la factura impresa y no estaban obligados a investigar su situación tributaria".',
        },
        procedureDescription:
          'Se descargó el reporte 606 validado ante los servidores de la DGII, se cotejó contra las facturas físicas originales y se solicitó certificación formal de estatus tributario a la administración local de la DGII.',
        checklist: [
          {
            id: 'chk-11',
            criterion: 'Autenticidad e Integridad de la Fuente Primaria',
            description: 'Certificación oficial emitida por la DGII anexada al expediente.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Firma y sello de la administración tributaria.',
          },
          {
            id: 'chk-12',
            criterion: 'Legalidad de la Obtención de la Prueba',
            description: 'Obtenida en cumplimiento de la orden de auxilio judicial.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Total validez conforme al Código Procesal Penal.',
          },
          {
            id: 'chk-13',
            criterion: 'Corroboración Cruzada con Fuentes Externas',
            description: 'Cotejo contra la cuenta bancaria donde no existen pagos reales al proveedor.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Facturas pagadas supuestamente en efectivo sin comprobante de egreso bancario.',
          },
          {
            id: 'chk-14',
            criterion: 'Pertinencia y Relevancia Jurídica para el Tribunal',
            description: 'Prueba el dolo y la simulación contractual.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Configura defraudación tributaria flagrante.',
          },
          {
            id: 'chk-15',
            criterion: 'Inobjetabilidad Técnica de la Metodología Forense',
            description: 'Análisis pericial basado en normas NIIF y Código Tributario.',
            score: 5,
            isFulfilled: true,
            evaluationNotes: 'Dictamen contable riguroso y cuantitativo.',
          },
        ],
        complianceScore: 5.0,
        status: 'Aprobada 5/5',
        recommendationsFor5of5: [
          'Evidencia 100% probatoria y apta para sustentar acusación formal.',
        ],
      },
    ],
    totalDamageDOP: 6411200,
    pericialConclusion:
      'Sobre la base exclusiva de los documentos originales analizados y las verificaciones en los portales oficiales de transparencia y la DGII, este cuerpo pericial concluye de manera concluyente que se configuraron maniobras lesivas al patrimonio institucional por un monto consolidado de SEIS MILLONES CUATROCIENTOS ONCE MIL DOSCIENTOS PESOS DOMINICANOS CON 00/100 (RD$ 6,411,200.00), mediante fraccionamiento de compras, pagos no justificados en nómina y uso indebido de comprobantes fiscales.',
    finalLegalVerdict:
      'Las evidencias recabadas cumplen de forma unánime con la calificación 5/5 en la escala de idoneidad y rigor forense, no siendo descartables ni refutables ante ningún tribunal de la República Dominicana por sustentarse en documentos originales, foliados, cruzados y con cadena de custodia ininterrumpida.',
    createdAt: '2026-02-10T09:00:00Z',
    updatedAt: '2026-02-18T16:30:00Z',
  },
];

export function getStoredAuditors(): AuditorProfile[] {
  try {
    const raw = localStorage.getItem('bsa_forensic_auditors');
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_AUDITORS;
}

export function saveStoredAuditors(auditors: AuditorProfile[]) {
  try {
    localStorage.setItem('bsa_forensic_auditors', JSON.stringify(auditors));
  } catch {}
}

export function getStoredCases(): ForensicCase[] {
  try {
    const raw = localStorage.getItem('bsa_forensic_cases');
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_CASES;
}

export function saveStoredCases(cases: ForensicCase[]) {
  try {
    localStorage.setItem('bsa_forensic_cases', JSON.stringify(cases));
  } catch {}
}
