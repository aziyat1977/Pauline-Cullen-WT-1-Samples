import { ChartDataPoint, QuizQuestion, VocabItem, StepItem } from './types';

export const CHART_DATA: ChartDataPoint[] = [
  { label: '1 Candle', f1: 14.1, f2: 15.2, f3: 14.9, avg: 14.7 },
  { label: '2 Candles', f1: 12.5, f2: 13.2, f3: 13.0, avg: 12.9 },
  { label: '3 Candles', f1: 11.2, f2: 10.3, f3: 10.0, avg: 10.5 },
];

export const VOCAB_LIST: VocabItem[] = [
  { term: "Inverse relationship", def: "When one thing goes up (candles), the other goes down (time).", ex: "There is an inverse relationship between the heat source and the flight duration." },
  { term: "Duration", def: "The length of time something lasts.", ex: "The duration of the flight." },
  { term: "Consecutive", def: "Following continuously.", ex: "With each consecutive candle added, the time dropped." },
  { term: "Diminish", def: "To make or become less.", ex: "Flight times diminished as more candles were lit." },
  { term: "Hover", def: "To stay at or near a particular level.", ex: "The average hovered around 15 seconds." },
  { term: "Setup / Conditions", def: "Used to describe the different categories.", ex: "Under the three-candle conditions..." },
];

export const QUIZ_A: QuizQuestion[] = [
  { q: "What is a synonym for 'shows' in an introduction?", options: ["Says", "Illustrates", "Speaks", "Writes"], correct: 1 },
  { q: "'Flight times' can be paraphrased as:", options: ["The speed of the flight", "The duration of the flight", "The height of the flight", "The distance of the flight"], correct: 1 },
  { q: "Which word describes the relationship: More candles = Less time?", options: ["Inverse", "Similar", "Proportional", "Equal"], correct: 0 },
  { q: "Which preposition is correct? 'Measured ____ seconds.'", options: ["on", "at", "in", "by"], correct: 2 },
  { q: "Choose the correct spelling:", options: ["Seperate", "Separate", "Sepparate", "Seperat"], correct: 1 },
  { q: "'Approximately' is used when:", options: ["The number is exact", "We are guessing randomly", "The number is not exact on the scale", "We want to use a big word"], correct: 2 },
  { q: "What is the vertical axis usually called?", options: ["The x-axis", "The y-axis", "The line axis", "The time axis"], correct: 1 },
  { q: "'The figures ______ between 10 and 15.'", options: ["ranged", "circled", "walked", "stayed"], correct: 0 },
  { q: "Which word is too dramatic for this chart?", options: ["Decreased", "Dropped", "Plummeted", "Fell"], correct: 2 },
  { q: "'Respectively' is used to:", options: ["Show respect to the examiner", "List items in the same order as previously mentioned", "End a paragraph", "Start an introduction"], correct: 1 },
];

export const QUIZ_B: QuizQuestion[] = [
  { q: "What is the first thing you should write?", options: ["The Overview", "The Introduction", "The Conclusion", "Your Opinion"], correct: 1 },
  { q: "Should you include your opinion in Task 1?", options: ["Yes, always", "Only if the data is boring", "No, never", "Only in the conclusion"], correct: 2 },
  { q: "What is an 'Overview'?", options: ["A summary of the main trends", "A list of every number", "The introduction", "A conclusion"], correct: 0 },
  { q: "Looking at the chart: Which setup had the longest flights?", options: ["1 Candle", "2 Candles", "3 Candles", "The Average"], correct: 0 },
  { q: "Looking at the chart: Which setup had the shortest flights?", options: ["1 Candle", "2 Candles", "3 Candles", "Flight #1"], correct: 2 },
  { q: "Is it necessary to quote every single number?", options: ["Yes, to be accurate", "No, only key features", "Yes, to get a long word count", "No, numbers don't matter"], correct: 1 },
  { q: "What is the trend for the 'Average'?", options: ["It goes up", "It goes down", "It fluctuates wildly", "It stays the same"], correct: 1 },
  { q: "How many specific flights are measured?", options: ["1", "2", "3", "4"], correct: 2 },
  { q: "Which flight had the absolute lowest time?", options: ["Flight #1 (3 Candles)", "Flight #2 (3 Candles)", "Flight #3 (3 Candles)", "Flight #1 (1 Candle)"], correct: 2 },
  { q: "What tense should be used for this report?", options: ["Future tense", "Past tense", "Present Continuous", "Present Perfect"], correct: 1 },
];

export const STEPS: StepItem[] = [
  { step: 1, text: "What is it?", sub: "The bar chart..." },
  { step: 2, text: "What does it do?", sub: "Compares / Illustrates..." },
  { step: 3, text: "What is the subject?", sub: "The duration of flights..." },
  { step: 4, text: "What are the categories?", sub: "Under three candle conditions..." }
];
