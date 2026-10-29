/**
 * Data structures for Baldera Santos & Asociados portal
 */

export interface ServiceItem {
  id: string;
  title: string;
  category: 'fiscal' | 'contable' | 'tss' | 'corporativo';
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  idealFor: string;
  iconName: string;
}

export interface TaxCalendarEvent {
  day: number;
  month: number; // 1-12
  year: number;
  title: string;
  agency: 'DGII' | 'TSS' | 'Ministerio de Trabajo' | 'Cámara de Comercio';
  type: 'Mensual' | 'Anual' | 'Trimestral';
  description: string;
  code?: string; // e.g. "IT-1", "606", "IR-2"
  consequence: string;
}

export interface QuoteState {
  companyType: 'fisica' | 'pyme_srl' | 'mediana_corp';
  monthlyInvoices: number;
  employeesCount: number;
  selectedServices: string[];
  needAnnualDeclaration: boolean;
  notes: string;
}

export interface AppointmentData {
  id: string;
  clientName: string;
  companyName: string;
  rncOrCedula: string;
  phone: string;
  email: string;
  serviceCategory: string;
  preferredDate: string;
  preferredTime: string;
  modality: 'presencial' | 'virtual';
  notes: string;
  createdAt: string;
}

export interface FaqItem {
  question: string;
  category: string;
  answer: string;
  reference?: string;
}
