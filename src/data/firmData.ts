import { ServiceItem, TaxCalendarEvent, FaqItem } from '../types';

export const FIRM_INFO = {
  name: 'Baldera Santos & Asociados',
  legalName: 'Baldera Santos & Asociados, SRL',
  tagline: 'Firma de Asesoría Fiscal, Contable y Soluciones Corporativas',
  description:
    'Especialistas en igualas contables, cumplimiento riguroso ante la DGII, gestión integral de nóminas en la TSS y asesoría estratégica para empresas en la República Dominicana.',
  address: 'Calle Orlando Martínez No. 49, Villa Eloisa, Santo Domingo Este, República Dominicana',
  locationCity: 'Santo Domingo Este, R.D.',
  phones: [
    { label: 'Oficina Principal', number: '+1 (829) 771-7390', raw: '18297717390' },
    { label: 'Línea de Asesoría', number: '+1 (809) 697-8570', raw: '18096978570' },
  ],
  whatsapp: {
    number: '+1 (829) 771-7390',
    link: 'https://wa.me/18297717390',
    message: 'Hola, me comunico desde el portal web de Baldera Santos & Asociados. Deseo solicitar una consulta fiscal/contable.',
  },
  email: 'balderasantosyasociados@gmail.com',
  workingHours: 'Lunes a Viernes: 8:00 AM – 5:30 PM | Sábados: Previa cita',
  credentials: [
    'Miembro de Contadores Públicos Autorizados (ICPARD)',
    'Especialistas Certificados en Normativa DGII y Tributación RD',
    'Operadores Autorizados de Sistemas TSS (SUIR) y SIRLA',
    'Más de una década brindando solidez y confianza a empresas locales e internacionales',
  ],
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'fiscal-dgii',
    title: 'Servicios Fiscales e Impuestos (DGII)',
    category: 'fiscal',
    shortDesc: 'Preparación y envío oportuno de formatos tributarios y declaraciones juradas para blindar su empresa de multas y recargos.',
    fullDesc:
      'Gestionamos la totalidad de sus obligaciones con la Dirección General de Impuestos Internos (DGII). Garantizamos el cumplimiento estricto del Código Tributario Dominicano (Ley 11-92) y las normas generales aplicables, optimizando su carga impositiva mediante deducciones legales legítimas.',
    deliverables: [
      'Envío mensual puntual de Formatos 606 (compras) y 607 (ventas)',
      'Reporte de comprobantes anulados (Formato 608) y pagos al exterior (609)',
      'Declaración y liquidación del Impuesto a la Transferencia de Bienes y Servicios (ITBIS - Formulario IT-1)',
      'Declaraciones Juradas Anuales: IR-2 (Sociedades) e IR-1 (Personas Físicas)',
      'Retenciones de Renta (Formulario IR-17) y cálculo de anticipos de ISR',
      'Implementación de Facturación Electrónica (e-CF) y emisión de NCF',
      'Atención y defensa técnica ante requerimientos y fiscalizaciones de la DGII',
    ],
    idealFor: 'Empresas constituidas (SRL, EIRL, SA) y profesionales independientes sujetos a retención o fiscalización.',
    iconName: 'FileCheck',
  },
  {
    id: 'contabilidad-financiera',
    title: 'Área Contable, Igualas y Estados Financieros',
    category: 'contable',
    shortDesc: 'Organización de transacciones, libros legales, conciliaciones bancarias y estados financieros bajo normas NIIF para PYMES.',
    fullDesc:
      'Diseñamos e instalamos el sistema contable que mejor se adapte a su operativa de negocios. Llevamos sus igualas contables mes a mes con registros precisos de activos, pasivos, ingresos y costos, permitiéndole tomar decisiones fundamentadas en datos reales y confiables.',
    deliverables: [
      'Igualas contables mensuales personalizadas al volumen de su empresa',
      'Emisión de Estados Financieros: Balance General, Estado de Resultados y Flujo de Efectivo',
      'Depreciación y amortización de activos fijos según categorías fiscales de la DGII (Cat. 1, 2 y 3)',
      'Conciliaciones bancarias mensuales de cuentas corrientes y de tarjetas de crédito',
      'Cierres de período contable y asesoría en inventarios de fin de año',
      'Instalación, migración y parametrización de catálogos de cuentas en software contable',
    ],
    idealFor: 'Negocios en crecimiento que necesitan reportes financieros claros para bancos, socios y licitaciones.',
    iconName: 'LineChart',
  },
  {
    id: 'tss-laboral',
    title: 'Gestión de Nóminas, TSS y Seguridad Social',
    category: 'tss',
    shortDesc: 'Liquidación mensual en la Tesorería de la Seguridad Social (TSS) y cumplimiento riguroso del Código de Trabajo (Ley 16-92).',
    fullDesc:
      'La administración de nómina en República Dominicana requiere sincronía absoluta entre el Ministerio de Trabajo y la TSS. Baldera Santos & Asociados se encarga del cálculo de descuentos legales (AFP y SFS), aportes patronales, riesgos laborales (ARL) y prestaciones en caso de desahucio.',
    deliverables: [
      'Procesamiento mensual y quincenal de nómina salarial con desglose de deducciones',
      'Manejo del portal SUIR de la TSS: altas, bajas, novedades y autoliquidaciones mensuales',
      'Gestión ante el Ministerio de Trabajo: Planillas DGT-3 (personal fijo) y DGT-4 (novedades)',
      'Cálculo exacto de prestaciones laborales: preaviso, cesantía, vacaciones y regalía pascual',
      'Emisión de comprobantes de pago de nómina para empleados',
      'Evitación de penalizaciones, intereses por mora y recargos por registro tardío en la TSS',
    ],
    idealFor: 'Empresas con empleados que buscan evitar demandas laborales y contingencias con la seguridad social.',
    iconName: 'Users',
  },
  {
    id: 'consultoria-corporativa',
    title: 'Consultoría Corporativa y Presupuestos',
    category: 'corporativo',
    shortDesc: 'Constitución de sociedades, estructuración patrimonial, manuales de control interno y presupuestos operativos.',
    fullDesc:
      'Potenciamos la estructura legal y administrativa de su negocio. Acompañamos desde la elección del tipo societario ante la Cámara de Comercio hasta el diseño de manuales operativos y control presupuestario para blindar su flujo de caja.',
    deliverables: [
      'Constitución y registro de Sociedades de Responsabilidad Limitada (SRL), EIRL y SAS',
      'Renovación y modificación de Registro Mercantil ante la Cámara de Comercio de Santo Domingo',
      'Redacción y depósito de Asambleas Generales Ordinarias y Extraordinarias de Accionistas',
      'Elaboración de presupuestos operativos anuales y matrices de control de costos',
      'Manuales de políticas contables y procedimientos de control interno',
      'Auditorías internas preventivas para la detección oportuna de inconsistencias',
    ],
    idealFor: 'Emprendedores que van a formalizar una nueva empresa o sociedades que requieren reestructuración estatutaria.',
    iconName: 'Briefcase',
  },
];

export const TAX_CALENDAR_EVENTS: TaxCalendarEvent[] = [
  {
    day: 3,
    month: 11,
    year: 2026,
    agency: 'TSS',
    type: 'Mensual',
    title: 'Pago y Notificación de la TSS (Seguridad Social)',
    code: 'TSS-SUIR',
    description: 'Fecha límite mensual para pagar las cotizaciones del Seguro Familiar de Salud (SFS), Fondos de Pensiones (AFP) y Seguro de Riesgos Laborales (SRL).',
    consequence: 'El atraso genera un recargo del 5% durante el primer mes y 1% mensual adicional, además del bloqueo de coberturas médicas para empleados.',
  },
  {
    day: 15,
    month: 11,
    year: 2026,
    agency: 'DGII',
    type: 'Mensual',
    title: 'Envío de Formatos Informativos 606, 607 y 608',
    code: 'Formatos 606/607/608',
    description: 'Envío a través de la Oficina Virtual de los reportes detallados de compras de bienes y servicios (606), ventas (607) y comprobantes anulados (608) del mes anterior.',
    consequence: 'Incumplir genera multas automáticas de deberes formales (Art. 257 Código Tributario) desde 5 a 30 salarios mínimos.',
  },
  {
    day: 20,
    month: 11,
    year: 2026,
    agency: 'DGII',
    type: 'Mensual',
    title: 'Declaración y Pago de ITBIS (IT-1)',
    code: 'IT-1',
    description: 'Declaración jurada y liquidación del Impuesto sobre Transferencias de Bienes Industrializados y Servicios (ITBIS) del mes precedente.',
    consequence: 'Mora del 10% el primer mes + 4% mensual acumulativo de indemnizatorio, más un 1.10% de interés indemnizatorio mensual.',
  },
  {
    day: 20,
    month: 11,
    year: 2026,
    agency: 'DGII',
    type: 'Mensual',
    title: 'Declaración de Otras Retenciones y Retribuciones (IR-17)',
    code: 'IR-17',
    description: 'Pago de retenciones efectuadas a asalariados, profesionales independientes (10%), personas físicas, pagos al exterior y retribuciones complementarias.',
    consequence: 'Penalidad idéntica a IT-1 (10% primer mes + intereses indemnizatorios acumulados).',
  },
  {
    day: 30,
    month: 4,
    year: 2027,
    agency: 'DGII',
    type: 'Anual',
    title: 'Declaración Jurada Anual de Sociedades (IR-2)',
    code: 'IR-2',
    description: 'Presentación formal de los Estados Financieros auditados y liquidación del Impuesto Sobre la Renta (27%) para empresas con fecha de cierre al 31 de diciembre.',
    consequence: 'Sanciones severas, pérdida de crédito fiscal y multas proporcionales a las rentas generadas.',
  },
];

export const FREQUENT_QUESTIONS: FaqItem[] = [
  {
    question: '¿Qué es una iguala contable y qué incluye el servicio de Baldera Santos & Asociados?',
    category: 'Contabilidad',
    answer:
      'Una iguala contable es un contrato de servicios profesionales mensuales donde nuestro equipo asume la contabilidad integral de su empresa: registro de facturas, conciliaciones de bancos, elaboración de estados financieros, envío mensual de formatos a la DGII (606, 607) y liquidación de impuestos (IT-1, IR-17, TSS). Le permite contar con un departamento contable de primer nivel sin asumir costos de nómina fija.',
    reference: 'Código Tributario y NIIF para PYMES',
  },
  {
    question: '¿Cuáles son los requisitos y formatos que debo enviar a la DGII cada mes?',
    category: 'Fiscal DGII',
    answer:
      'Toda persona jurídica o persona física con actividad comercial debe remitir a más tardar el día 15 de cada mes: el Formato 606 (compras con comprobante fiscal), el Formato 607 (ventas e ingresos reportados) y el Formato 608 (comprobantes que hayan sido cancelados). Posteriormente, a más tardar el día 20, debe presentarse el formulario IT-1 para pagar el ITBIS correspondiente.',
    reference: 'Norma General 07-2018 DGII',
  },
  {
    question: '¿Cuándo se debe aplicar la retención del 30% del ITBIS y el 10% del ISR?',
    category: 'Retenciones',
    answer:
      'Cuando una empresa constituida (persona jurídica) contrata los servicios profesionales independientes de una persona física (abogados, contadores, consultores, médicos, diseñadores), la ley exige retener el 10% del monto bruto por concepto de Impuesto Sobre la Renta (Art. 309 del Código Tributario) y el 30% del ITBIS facturado (Norma General 02-05). En Baldera Santos calculamos y preparamos el reporte IR-17 para que su empresa cumpla sin tropiezos.',
    reference: 'Art. 309 Código Tributario & Norma 02-05',
  },
  {
    question: '¿Cómo se calculan las prestaciones laborales en caso de despido de un colaborador?',
    category: 'Laboral & TSS',
    answer:
      'Bajo el Código de Trabajo de la República Dominicana (Ley 16-92), cuando el empleador ejerce el desahucio patronal (despido sin causa justificada), debe liquidar: Preaviso (hasta 28 días si supera el año), Auxilio de Cesantía (21 o 23 días por año según la antigüedad), Vacaciones no disfrutadas y la proporción de la Regalía Pascual (Salario de Navidad). El salario diario se calcula dividiendo el salario mensual entre 23.83.',
    reference: 'Ley 16-92 Código de Trabajo de la República Dominicana',
  },
  {
    question: '¿Por qué es arriesgado no afiliar a mis empleados a la TSS o pagar fuera de fecha?',
    category: 'TSS & Riesgos',
    answer:
      'No afiliar o reportar salarios inferiores en la TSS expone al negocio a demandas laborales millonarias por falta de cobertura médica o de riesgos laborales ante un accidente de trabajo. Además, el sistema SUIR aplica un recargo automático del 5% en el primer mes de mora y 1% mensual sucesivo, suspendiendo el carnet del Seguro Familiar de Salud (SFS) del empleado de inmediato.',
    reference: 'Ley 87-01 de Seguridad Social',
  },
  {
    question: '¿Cómo puedo agendar una consulta o diagnóstico fiscal con Baldera Santos & Asociados?',
    category: 'Contacto',
    answer:
      'Puede agendar directamente a través de nuestro cotizador y formulario en este portal, llamarnos a nuestros teléfonos (+1 829-771-7390 / +1 809-697-8570) o escribirnos directamente a nuestro WhatsApp o correo electrónico balderasantosyasociados@gmail.com. Atendemos de forma presencial en nuestra sede de Villa Eloisa, Santo Domingo Este, o mediante videoconferencia.',
    reference: 'Atención al Cliente Baldera Santos',
  },
];
