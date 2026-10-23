export interface Ingredient {
  id: string;
  name: string;
  botanicalName?: string;
  quantity: string;
  numericValue: number;
  unit: string;
  role: string;
  color: string;
  description: string;
  scientificInsight: string;
  imageAlt: string;
}

export interface FormulationStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  duration?: string;
  criticalNotes?: string;
}

export interface ResearchPaper {
  id: string;
  citation: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  focusIngredient: string;
  summary: string;
  doiUrl: string;
  keyFinding: string;
}

export interface ObservationEntry {
  id: string;
  date: string;
  batchNumber: string;
  appearance: string;
  colour: string;
  texture: string;
  consistency: string;
  separation: string;
  odour: string;
  notes: string;
  recorder: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'video' | 'photo' | 'documentation';
  description: string;
  src?: string;
  isVideo?: boolean;
  date: string;
}
