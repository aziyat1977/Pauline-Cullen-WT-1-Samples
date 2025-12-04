export interface ChartDataPoint {
  label: string;
  f1: number;
  f2: number;
  f3: number;
  avg: number;
}

export interface VocabItem {
  term: string;
  def: string;
  ex: string;
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