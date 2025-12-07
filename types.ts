
export interface ChartDataPoint {
  label: string;
  f1: number;
  f2: number;
  f3: number;
  avg: number;
}

export interface HousingDataPoint {
  label: string;
  owned: number;
  rented: number;
}

export interface TransportDataPoint {
  label: string;
  co2: number;
  passengers: number;
  icon: string;
}

export interface CoffeeDataPoint {
  country: string;
  year1999: number;
  year2004: number;
}

export interface PieDataPoint {
  label: string;
  value: number;
  color: string;
  pieColor: string;
}

export interface TableDataPoint {
  region: string;
  trees: number;
  crops: number;
  animals: number;
  total: number;
}

export interface VocabItem {
  term: string;
  def: string;
  ex: string;
  translations?: {
    ru: { term: string; def: string };
    uz: { term: string; def: string };
  };
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export interface AppState {
  xp: number;
  completedSections: string[];
}

export interface StepItem {
  step: number;
  text: string;
  sub: string;
}
