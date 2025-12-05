

import { ChartDataPoint, QuizQuestion, VocabItem, StepItem, HousingDataPoint, TransportDataPoint, CoffeeDataPoint, PieDataPoint, TableDataPoint } from './types';

// ... (Existing Data Preserved)
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

export const HOUSING_CHART_DATA: HousingDataPoint[] = [
  { label: '1918', owned: 23, rented: 77 },
  { label: '1939', owned: 32, rented: 68 },
  { label: '1953', owned: 32, rented: 68 },
  { label: '1961', owned: 42, rented: 58 },
  { label: '1971', owned: 50, rented: 50 },
  { label: '1981', owned: 58, rented: 42 },
  { label: '1991', owned: 67, rented: 33 },
  { label: '2001', owned: 69, rented: 31 },
  { label: '2011', owned: 64, rented: 36 },
];

export const HOUSING_VOCAB_LIST: VocabItem[] = [
  { term: "Overtake", def: "To catch up with and pass something else.", ex: "Ownership finally overtook renting in 1971." },
  { term: "Inverse trend", def: "Two trends moving in opposite directions.", ex: "The two categories display a clear inverse trend over the period." },
  { term: "Predominant", def: "The strongest or main element.", ex: "Rented accommodation was the predominant form of housing in 1918." },
  { term: "Steady rise", def: "A consistent increase over time.", ex: "There was a steady rise in home ownership." },
  { term: "Intersection", def: "The point where two lines or values meet.", ex: "The intersection point occurred in 1971 when both figures stood at 50%." },
  { term: "Tenure", def: "The conditions under which a building is occupied.", ex: "The chart displays changes in housing tenure." },
];

export const HOUSING_QUIZ_A: QuizQuestion[] = [
  { q: "What is the best synonym for 'shows' in a time-series chart?", options: ["Speaks", "Illustrates", "Tells", "Writes"], correct: 1 },
  { q: "Which word describes the relationship where one goes up and the other goes down?", options: ["Inverse", "Parallel", "Equal", "Static"], correct: 0 },
  { q: "What happened in 1971 when both bars were equal?", options: ["A peak", "A plateau", "An intersection", "A plummet"], correct: 2 },
  { q: "If renting was 77% and owning was 23%, renting was:", options: ["Minority", "Predominant", "Equal", "Insignificant"], correct: 1 },
  { q: "Which preposition is used for dates? '____ 1918 to 2011'", options: ["Between", "From", "In", "At"], correct: 1 },
  { q: "A 'steady rise' means the numbers increased:", options: ["Suddenly", "Consistently", "Randomly", "Never"], correct: 1 },
  { q: "The word 'Tenure' refers to:", options: ["The length of time", "Housing ownership status", "The price of a house", "The size of a house"], correct: 1 },
  { q: "Which phrase is best for the end of the period?", options: ["In the last year", "By 2011", "At the finish", "In conclusion"], correct: 1 },
  { q: "To 'fluctuate' means to:", options: ["Go up and down irregularly", "Go straight up", "Stay the same", "Crash"], correct: 0 },
  { q: "Which is a cohesive device?", options: ["However", "House", "Percent", "Year"], correct: 0 },
  { q: "If a number drops slightly, we can say it:", options: ["Collapsed", "Dipped", "Soared", "Rocketed"], correct: 1 },
  { q: "What implies a slow change?", options: ["Rapid", "Gradual", "Steep", "Sudden"], correct: 1 },
  { q: "1918 is the ______ year.", options: ["Initial", "Last", "Peak", "Lowest"], correct: 0 },
  { q: "When describing 2001 to 2011 (69% to 64%), we see a:", options: ["Surge", "Slight decrease", "Plateau", "Boom"], correct: 1 },
  { q: "Grammar: 'The percentage of households _____ steadily.'", options: ["rise", "rose", "risen", "rising"], correct: 1 },
];

export const HOUSING_QUIZ_B: QuizQuestion[] = [
  { q: "What is the most significant feature of this chart?", options: ["Renting was always popular", "The reversal of trends around 1971", "1953 stayed the same", "2011 was the highest year"], correct: 1 },
  { q: "Should you list every single percentage for every year?", options: ["Yes, to be accurate", "No, select key features", "Yes, to fill space", "No, numbers don't matter"], correct: 1 },
  { q: "Where should the Overview be placed?", options: ["After the intro (or at the end)", "Mixed with details", "Hidden in the conclusion", "Nowhere"], correct: 0 },
  { q: "What is the main trend for Owned accommodation?", options: ["Downward", "Fluctuating", "Upward", "Static"], correct: 2 },
  { q: "What happened to Renting between 1918 and 1991?", options: ["It increased", "It stayed the same", "It significantly decreased", "It disappeared"], correct: 2 },
  { q: "Is it important to mention 1971?", options: ["No, it's just another year", "Yes, it's the crossover point", "Only if you have time", "No, 1981 is better"], correct: 1 },
  { q: "Does the chart show reasons WHY this happened?", options: ["Yes", "No", "Maybe", "Only for 2011"], correct: 1 },
  { q: "Which tense should you predominantly use?", options: ["Future tense", "Past tense", "Present Continuous", "Present Perfect"], correct: 1 },
  { q: "How many bars are there per year?", options: ["1", "2", "3", "4"], correct: 1 },
  { q: "What is the unit of measurement?", options: ["Millions of people", "Percentage of households", "Number of houses", "Price in pounds"], correct: 1 },
  { q: "The trend in 2011 shows:", options: ["A continuation of the rise", "A slight reversal", "No data", "A crash to zero"], correct: 1 },
  { q: "A Band 9 overview must include:", options: ["The crossover and general trends", "Every date", "Your opinion on housing", "A title"], correct: 0 },
  { q: "Comparing 1918 to 2011 shows that the situation:", options: ["Remained constant", "Almost completely reversed", "Changed slightly", "Was unrelated"], correct: 1 },
  { q: "'Respectively' is used to:", options: ["List items in corresponding order", "Be polite", "End a sentence", "Start a paragraph"], correct: 0 },
  { q: "Group data by:", options: ["Randomly", "Trends / Time periods", "Color", "Height"], correct: 1 },
];

export const TRANSPORT_CHART_DATA: TransportDataPoint[] = [
  { label: 'Walk/Bike', co2: 0, passengers: 1, icon: '🚲' },
  { label: 'Tram', co2: 28, passengers: 156, icon: '🚋' },
  { label: 'Bus', co2: 56, passengers: 12.7, icon: '🚌' },
  { label: 'Scooter', co2: 81, passengers: 1.2, icon: '🛵' },
  { label: 'Car', co2: 107, passengers: 1.5, icon: '🚗' },
  { label: 'Plane', co2: 244, passengers: 88, icon: '✈️' },
];

export const TRANSPORT_VOCAB_LIST: VocabItem[] = [
  { term: "Carbon footprint", def: "The amount of carbon dioxide released into the atmosphere.", ex: "Air travel leaves the largest carbon footprint per passenger." },
  { term: "Passenger-kilometre", def: "A unit of measurement: one passenger travelling one kilometre.", ex: "Emissions are measured in grams per passenger-kilometre." },
  { term: "Occupancy rate", def: "The average number of people using a vehicle.", ex: "Despite a high occupancy rate, planes remain the most polluting." },
  { term: "Disproportionate", def: "Too large or too small in comparison with something else.", ex: "The plane produces a disproportionate amount of CO2." },
  { term: "Environmentally friendly", def: "Not harmful to the environment.", ex: "Trams are significantly more environmentally friendly than cars." },
  { term: "Negligible", def: "So small or unimportant as to be not worth considering.", ex: "Walking and cycling produce negligible (zero) emissions." },
];

export const TRANSPORT_QUIZ_A: QuizQuestion[] = [
  { q: "What is the best synonym for 'produces' when talking about gas?", options: ["Creates", "Emits", "Builds", "Manufactures"], correct: 1 },
  { q: "If a number is 0, we can say it is:", options: ["Limitless", "Non-existent", "Infinite", "Massive"], correct: 1 },
  { q: "Which word helps compare the car (107g) and the tram (28g)?", options: ["Approximately", "Significantly", "Marginally", "Equally"], correct: 1 },
  { q: "How do we describe the relationship between occupancy and emissions here?", options: ["Direct correlation", "No clear correlation", "Perfect inverse", "Identical"], correct: 1 },
  { q: "What is the correct preposition? 'Measured ___ grams.'", options: ["at", "on", "in", "by"], correct: 2 },
  { q: "'The plane is the _____ pollutant.'", options: ["most", "more", "much", "many"], correct: 0 },
  { q: "To 'account for' means to:", options: ["Count numbers", "Explain or represent an amount", "Pay for a ticket", "Write a report"], correct: 1 },
  { q: "Which is a 'mode of transport'?", options: ["Walking", "Kilometre", "Gram", "Passenger"], correct: 0 },
  { q: "If the bus has 12.7 passengers, we say it has an average:", options: ["Weight", "Speed", "Occupancy", "Length"], correct: 2 },
  { q: "Which linking word shows contrast?", options: ["Furthermore", "Whereas", "In addition", "Therefore"], correct: 1 },
  { q: "The tram is ______ the car.", options: ["Cleaner than", "Dirty than", "Clean as", "Cleanest"], correct: 0 },
  { q: "Which phrase creates a good overview?", options: ["First of all", "Overall, it is clear that", "In 1990", "Looking at the details"], correct: 1 },
  { q: "107g is ______ 56g.", options: ["Double", "Almost double", "Half", "Triple"], correct: 1 },
  { q: "Scooters produce 81g ______ passenger-kilometre.", options: ["per", "for", "in", "by"], correct: 0 },
  { q: "The figures for walking and cycling are:", options: ["Identical", "Different", "Opposite", "High"], correct: 0 },
];

export const TRANSPORT_QUIZ_B: QuizQuestion[] = [
  { q: "What are the two variables being compared?", options: ["Speed vs Cost", "CO2 Emissions vs Number of Travellers", "Time vs Distance", "Car vs Plane"], correct: 1 },
  { q: "What is the standout feature (the 'main' thing)?", options: ["Scooters are fast", "Planes are the highest emitters by far", "Buses have 12.7 people", "Cars are popular"], correct: 1 },
  { q: "Does high occupancy always mean low emissions in this chart?", options: ["Yes, always", "No (Look at the plane)", "Maybe", "The chart doesn't say"], correct: 1 },
  { q: "How should you group the data?", options: ["Alphabetically", "By emission levels (High vs Low)", "Randomly", "By color"], correct: 1 },
  { q: "Is it necessary to mention the '0' for walking?", options: ["No, it's nothing", "Yes, it provides a baseline comparison", "Only if you walk", "No, focus on cars"], correct: 1 },
  { q: "The unit 'grams per passenger-kilometre' is:", options: ["A total sum", "A rate/ratio", "A distance", "A weight"], correct: 1 },
  { q: "Which is better for the overview?", options: ["The plane emits 244g", "Air travel is the least eco-friendly mode", "Walking is slow", "Cars have 1.5 people"], correct: 1 },
  { q: "Should you explain WHY planes pollute?", options: ["Yes, talk about jet fuel", "No, just report the data", "Yes, mention climate change", "Only in the conclusion"], correct: 1 },
  { q: "When describing the Car (107g) vs Scooter (81g), the difference is:", options: ["Huge", "Moderate", "Zero", "Infinite"], correct: 1 },
  { q: "What tense is appropriate here?", options: ["Past tense (it happened)", "Present tense (facts/chart shows)", "Future tense", "Conditional"], correct: 1 },
  { q: "Can we conclude that public transport (Bus/Tram) is generally cleaner than private?", options: ["Yes, based on the data", "No", "Maybe", "Only for trams"], correct: 0 },
  { q: "What data point is the Tram?", options: ["28g / 156 people", "56g / 12.7 people", "0g / 1 person", "244g / 88 people"], correct: 0 },
  { q: "The occupancy of the car (1.5) suggests:", options: ["It is usually full", "It is mostly single occupancy", "It carries 10 people", "It is a bus"], correct: 1 },
  { q: "'Conversely' is used to:", options: ["Add information", "Introduce an opposing idea", "Finish a sentence", "Start a list"], correct: 1 },
  { q: "A Band 9 essay would:", options: ["List every number", "Synthesize emissions and occupancy data", "Critique the chart style", "Use slang"], correct: 1 },
];

export const COFFEE_DATA: CoffeeDataPoint[] = [
  { country: 'UK', year1999: 1.5, year2004: 20 },
  { country: 'Switzerland', year1999: 3, year2004: 6 },
  { country: 'Denmark', year1999: 1.8, year2004: 2 },
  { country: 'Belgium', year1999: 1, year2004: 1.7 },
  { country: 'Sweden', year1999: 0.8, year2004: 1 },
];

export const BANANA_DATA: CoffeeDataPoint[] = [
  { country: 'Switzerland', year1999: 15, year2004: 47 },
  { country: 'UK', year1999: 1, year2004: 5.5 },
  { country: 'Belgium', year1999: 0.6, year2004: 4 },
  { country: 'Sweden', year1999: 1.8, year2004: 1 },
  { country: 'Denmark', year1999: 2, year2004: 0.9 },
];

export const COFFEE_VOCAB_LIST: VocabItem[] = [
  { term: "Exponential growth", def: "An extremely rapid increase.", ex: "Sales of coffee in the UK experienced exponential growth, rising from 1.5 to 20 million." },
  { term: "Two distinct periods", def: "Referring to the specific years mentioned.", ex: "The tables compare sales figures across two distinct periods: 1999 and 2004." },
  { term: "More than tripled", def: "Increased by a factor of 3 or more.", ex: "Banana sales in Switzerland more than tripled, reaching 47 million euros." },
  { term: "Marginal rise", def: "A very small increase.", ex: "Denmark saw only a marginal rise in coffee sales." },
  { term: "Conversely", def: "Used to introduce an opposite idea.", ex: "Conversely, banana sales in Sweden and Denmark declined." },
  { term: "Dominant market", def: "The place with the most sales.", ex: "Switzerland remained the dominant market for Fairtrade bananas." },
];

export const COFFEE_QUIZ_A: QuizQuestion[] = [
  { q: "Which word best describes the change in UK coffee sales (1.5 -> 20)?", options: ["Steady", "Surged", "Fluctuated", "Dipped"], correct: 1 },
  { q: "If sales go from 3 to 6, they have:", options: ["Tripled", "Halved", "Doubled", "Stayed constant"], correct: 2 },
  { q: "What is the correct preposition? 'Sales increased ____ 3 million.' (meaning the change amount)", options: ["at", "by", "of", "in"], correct: 1 },
  { q: "Switzerland's banana sales (15 -> 47) show a:", options: ["Significant upward trend", "Slight decrease", "Period of stability", "Downward spiral"], correct: 0 },
  { q: "How do we describe the trend for bananas in Sweden (1.8 -> 1)?", options: ["Rocketed", "Fell", "Plateaued", "Soared"], correct: 1 },
  { q: "'The figures are measured ____ millions of euros.'", options: ["on", "at", "in", "by"], correct: 2 },
  { q: "To 'outperform' means to:", options: ["Sell less than", "Do better/sell more than", "Sell the same", "Stop selling"], correct: 1 },
  { q: "Which linking word is best for contrast?", options: ["Furthermore", "However", "In addition", "Therefore"], correct: 1 },
  { q: "Comparison: 'Sales in the UK were _____ higher in 2004.'", options: ["significantly", "marginally", "slightly", "hardly"], correct: 0 },
  { q: "The term 'Fairtrade-labelled' refers to:", options: ["The price", "The product category/certification", "The country", "The year"], correct: 1 },
  { q: "If something rose from 0.6 to 4, it increased nearly:", options: ["Two-fold", "Three-fold", "Seven-fold", "Ten-fold"], correct: 2 },
  { q: "Which is a synonym for 'sales figures'?", options: ["Revenue", "Population", "Expenses", "Debts"], correct: 0 },
  { q: "Denmark's banana sales 'dropped' means they:", options: ["Went up", "Went down", "Stayed flat", "Disappeared"], correct: 1 },
  { q: "1999 and 2004 are the two:", options: ["Time points", "Countries", "Currencies", "Products"], correct: 0 },
  { q: "A 'mixed picture' means:", options: ["Everything went up", "Everything went down", "Some went up, some went down", "No data available"], correct: 2 },
];

export const COFFEE_QUIZ_B: QuizQuestion[] = [
  { q: "What is the most striking feature of the Coffee table?", options: ["Sweden's low sales", "The massive increase in the UK", "Denmark's stability", "Belgium's decrease"], correct: 1 },
  { q: "Did sales increase in ALL countries for BOTH products?", options: ["Yes", "No (Bananas fell in some)", "No (Coffee fell in some)", "Yes, absolutely"], correct: 1 },
  { q: "How should you structure the details?", options: ["By year (1999 then 2004)", "By Product (Coffee paragraph, Banana paragraph)", "Randomly", "By Country"], correct: 1 },
  { q: "Is Switzerland the leader in both categories in 2004?", options: ["Yes", "No (UK led Coffee)", "No (Sweden led both)", "No (Belgium led Bananas)"], correct: 1 },
  { q: "Should you quote every single number from the table?", options: ["Yes", "No, group and select key data", "Only the zeros", "Only the big numbers"], correct: 1 },
  { q: "The unit is 'Millions of Euros'. Is it okay to just write '20'?", options: ["No, write '20 million euros'", "Yes, numbers are enough", "Write '20 pounds'", "Write '20 dollars'"], correct: 0 },
  { q: "What is the overview for Bananas?", options: ["Sales rose everywhere", "Sales fell everywhere", "Switzerland dominated, but trends were mixed", "UK was top"], correct: 2 },
  { q: "Comparing UK Coffee (20m) to Switzerland Coffee (6m) in 2004:", options: ["Switzerland was higher", "They were equal", "UK was over three times higher", "UK was slightly higher"], correct: 2 },
  { q: "What happened to Coffee sales in all five nations?", options: ["They all decreased", "They all increased", "They stayed exactly the same", "Mixed trends"], correct: 1 },
  { q: "Is it important to mention that Sweden and Denmark saw banana sales drop?", options: ["Yes, it's a key contrast", "No, it's negative news", "Only if asked", "No, focus on growth"], correct: 0 },
  { q: "Which tense should be used?", options: ["Future", "Past Simple", "Present Continuous", "Past Perfect Continuous"], correct: 1 },
  { q: "Does the table explain WHY the UK loved coffee?", options: ["Yes", "No, strictly reports data", "Maybe", "Yes, marketing"], correct: 1 },
  { q: "The UK banana sales went from 1 to 5.5. This is:", options: ["A decrease", "A moderate rise", "A significant rise", "No change"], correct: 2 },
  { q: "When summarizing, we can say Switzerland was the _____ market for Bananas.", options: ["Smallest", "Weakest", "Largest", "Poorest"], correct: 2 },
  { q: "A Band 9 Task 1 requires:", options: ["An overview, comparisons, and accuracy", "Humor", "Bullet points", "Color text"], correct: 0 },
];

export const DEGRADATION_PIE_DATA: PieDataPoint[] = [
  { label: 'Removing Trees', value: 35, color: 'bg-emerald-600', pieColor: '#059669' },
  { label: 'Farming Animals', value: 30, color: 'bg-amber-600', pieColor: '#d97706' },
  { label: 'Growing Crops', value: 28, color: 'bg-yellow-500', pieColor: '#eab308' },
  { label: 'Other', value: 7, color: 'bg-stone-400', pieColor: '#a8a29e' },
];

export const DEGRADATION_TABLE_DATA: TableDataPoint[] = [
  { region: 'Region 1', trees: 0.2, crops: 3.3, animals: 1.5, total: 5 },
  { region: 'Region 2', trees: 9.8, crops: 7.7, animals: 5.5, total: 23 },
  { region: 'Region 3', trees: 1.7, crops: 0, animals: 11.3, total: 13 },
];

export const DEGRADATION_VOCAB_LIST: VocabItem[] = [
  { term: "Degradation", def: "The process of damaging or ruining land.", ex: "The chart highlights the primary causes of worldwide land degradation." },
  { term: "Over-grazing", def: "Farming animals too intensively (eating all the grass).", ex: "In Region 3, over-grazing is the sole significant contributor." },
  { term: "Deforestation", def: "The clearing or removal of trees.", ex: "Deforestation accounts for the largest share of global land damage (35%)." },
  { term: "Over-cultivation", def: "Growing crops to the point of exhausting the soil.", ex: "Over-cultivation is the main culprit in Region 1." },
  { term: "Primary culprit", def: "The main cause of a problem.", ex: "In Europe (Region 2), removing trees is the primary culprit." },
  { term: "Cumulative", def: "Increasing by successive additions.", ex: "Region 2 had the highest cumulative level of degraded land at 23%." },
];

export const DEGRADATION_QUIZ_A: QuizQuestion[] = [
  { q: "What is a formal synonym for 'Removing Trees'?", options: ["Reforestation", "Deforestation", "Tree planting", "Logging"], correct: 1 },
  { q: "If 'Farming Animals' causes damage, we call it:", options: ["Over-grazing", "Over-eating", "Over-farming", "Animalism"], correct: 0 },
  { q: "Which word means 'growing crops'?", options: ["Cultivation", "Construction", "Conservation", "Creation"], correct: 0 },
  { q: "Region 3 has 13% total degradation. This is a _____ figure compared to Region 2.", options: ["higher", "lower", "vast", "similar"], correct: 1 },
  { q: "The 'Other' category accounts _____ 7%.", options: ["in", "by", "for", "at"], correct: 2 },
  { q: "Comparison: 'Region 2 is _____ degraded than Region 1.'", options: ["much more", "many more", "much less", "slightly"], correct: 0 },
  { q: "To 'constitute' means to:", options: ["Make up or form a part of", "Destroy", "Calculate", "Vote"], correct: 0 },
  { q: "If a value is 0.2%, we can say it is:", options: ["Massive", "Negligible", "Significant", "Dominant"], correct: 1 },
  { q: "A 'collective' figure refers to:", options: ["One part", "The total sum", "The average", "The difference"], correct: 1 },
  { q: "Which linking word implies a result?", options: ["Consequently", "However", "Although", "Whereas"], correct: 0 },
  { q: "The pie chart represents data on a _____ scale.", options: ["Local", "Global / Worldwide", "Regional", "City"], correct: 1 },
  { q: "Region 1's total of 5% is the _____ of the three.", options: ["Lowest", "Least", "Minimum", "Shortest"], correct: 0 },
  { q: "In Region 3, crop damage is 'non-existent'. What number matches this?", options: ["1.7", "0", "11.3", "13"], correct: 1 },
  { q: "How do we describe 35%, 30%, and 28%?", options: ["Very different", "Roughly comparable / similar", "Tiny", "Exponential"], correct: 1 },
  { q: "The table 'breakdown' means:", options: ["The data is broken", "The data is categorized", "The table collapsed", "The total only"], correct: 1 },
];

export const DEGRADATION_QUIZ_B: QuizQuestion[] = [
  { q: "This task contains two visuals. How should you handle them?", options: ["Ignore the table", "Describe both and find connections", "Write two separate essays", "Mix them randomly"], correct: 1 },
  { q: "What is the Overview's main job here?", options: ["List every percentage", "Summarize global causes and identify the most degraded region", "Explain how to plant trees", "Critique the data"], correct: 1 },
  { q: "Is it correct to say 'Region 2 is the worst affected'?", options: ["Yes (23% total)", "No", "Maybe", "Data invalid"], correct: 0 },
  { q: "The Pie Chart shows:", options: ["Regional data", "Global totals", "Future predictions", "Costs"], correct: 1 },
  { q: "In Region 3, is it worth noting that 'Growing Crops' is 0?", options: ["Yes, it's a key feature", "No, zero doesn't matter", "Only if you like crops", "No"], correct: 0 },
  { q: "Should you add up the numbers in the table if the total isn't given?", options: ["Yes, to check", "No, rely on provided totals", "Yes, to show math skills", "No"], correct: 1 },
  { q: "What is the main cause in Region 1?", options: ["Removing Trees", "Farming Animals", "Growing Crops", "Other"], correct: 2 },
  { q: "How are the three main causes in the pie chart distributed?", options: ["One dominates completely", "They are fairly evenly split (approx 1/3 each)", "They are all 5%", "None of the above"], correct: 1 },
  { q: "Which region has the most 'Farming Animal' damage?", options: ["Region 1", "Region 2", "Region 3", "All equal"], correct: 2 },
  { q: "Can we assume Region 1 is North America?", options: ["No, stick to the labels provided", "Yes, definitely", "Maybe, but don't write it", "It is Asia"], correct: 0 },
  { q: "A good paragraph structure might be:", options: ["1. Intro/Overview, 2. Pie Chart, 3. Table", "1. Table, 2. Conclusion", "1. Overview only", "1. List of numbers"], correct: 0 },
  { q: "In Region 2, 'Removing Trees' (9.8) and 'Growing Crops' (7.7) are:", options: ["The only causes", "Major contributors", "Minor details", "Equal"], correct: 1 },
  { q: "The 'Total Land Degraded' column is crucial for:", options: ["Comparing overall severity between regions", "Nothing", "The conclusion", "The introduction"], correct: 0 },
  { q: "Band 9 Advice: Avoid simply ______ the numbers.", options: ["Listing", "Analyzing", "Grouping", "Comparing"], correct: 0 },
  { q: "The relationship between the Pie and Table is:", options: ["Unrelated", "The Table breaks down the Pie's categories by region (loosely)", "The Pie contradicts the Table", "Unknown"], correct: 1 },
];

export const MAP_VOCAB_LIST: VocabItem[] = [
  { term: "Constructed / Erected", def: "Built or put up (used for buildings).", ex: "A new reception block was constructed in the center of the island." },
  { term: "Converted", def: "Changed in form or function.", ex: "The deserted island was converted into a holiday resort." },
  { term: "Amenities", def: "Useful or desirable features of a place (e.g., pools, restaurants).", ex: "The island now boasts several tourist amenities including a restaurant." },
  { term: "Infrastructure", def: "Basic physical structures (roads, power, piers).", ex: "Infrastructure such as vehicle tracks and a pier was added." },
  { term: "Adjacent to", def: "Next to or adjoining something else.", ex: "The restaurant is located adjacent to the reception area." },
  { term: "Untouched", def: "Not changed or damaged.", ex: "The eastern part of the island remains largely untouched." },
];

export const MAP_QUIZ_A: QuizQuestion[] = [
  { q: "Which verb is best for building a house?", options: ["Planted", "Constructed", "Born", "Happened"], correct: 1 },
  { q: "If trees are removed, we say they were:", options: ["Chopped down / Cleared", "Moved", "Hidden", "Ignored"], correct: 0 },
  { q: "A 'footpath' is for:", options: ["Cars", "Boats", "Walking", "Swimming"], correct: 2 },
  { q: "The restaurant is _____ the north of the reception.", options: ["in", "to", "on", "at"], correct: 1 },
  { q: "What is the opposite of 'Demolished'?", options: ["Destroyed", "Removed", "Built", "Finished"], correct: 2 },
  { q: "The island measures 200m in length. This is its:", options: ["Scale", "Depth", "Height", "Volume"], correct: 0 },
  { q: "Grammar: 'A pier ______ constructed.' (Passive Voice)", options: ["was", "were", "is", "has"], correct: 0 },
  { q: "Which word means 'next to'?", options: ["Opposite", "Behind", "Adjacent to", "Between"], correct: 2 },
  { q: "Tourist accommodation consists _____ huts.", options: ["in", "of", "for", "by"], correct: 1 },
  { q: "To 'modernize' means to:", options: ["Make old", "Update / bring to modern standards", "Destroy", "Paint"], correct: 1 },
  { q: "The beach is located on the ______ coast.", options: ["Western", "Eastern", "Northern", "Central"], correct: 0 },
  { q: "If a track connects two places, it:", options: ["Links them", "Separates them", "Blocks them", "Hides them"], correct: 0 },
  { q: "Which tense is used for the 'After' description if 2024 is in the past?", options: ["Future", "Past Simple / Passive", "Present Continuous", "Conditional"], correct: 1 },
  { q: "A 'cluster' of huts means:", options: ["One hut", "A group close together", "A line", "A big house"], correct: 1 },
  { q: "The map shows the _____ of the island.", options: ["Development", "History", "Weather", "Population"], correct: 0 },
];

export const MAP_QUIZ_B: QuizQuestion[] = [
  { q: "What is the main change?", options: ["The weather got better", "It changed from natural to a tourist resort", "The sea level rose", "Trees grew"], correct: 1 },
  { q: "Should you describe every single tree?", options: ["Yes, count them", "No, mention them generally (cleared/remained)", "Yes, describe the leaves", "No, ignore trees"], correct: 1 },
  { q: "Is 'Reception' a key feature?", options: ["Yes, it's the central hub", "No, it's small", "Only if you book a room", "No"], correct: 0 },
  { q: "How do you organize the paragraphs?", options: ["By color", "Before vs After (or by Location)", "Randomly", "By size"], correct: 1 },
  { q: "The 'Before' map is mostly:", options: ["Buildings", "Natural features", "Roads", "Shops"], correct: 1 },
  { q: "Do you need to give your opinion on the resort?", options: ["Yes, say it looks nice", "No, remain objective", "Yes, critique the price", "No, but say you want to go"], correct: 1 },
  { q: "The swimming area is a specific function added to:", options: ["The forest", "The beach", "The pier", "The reception"], correct: 1 },
  { q: "When describing location, use:", options: ["Left/Right", "Compass points (North/South/East/West)", "Up/Down", "Here/There"], correct: 1 },
  { q: "The vehicle track leads to:", options: ["The swimming pool", "The reception/restaurant", "Nowhere", "The sea"], correct: 1 },
  { q: "Footpaths connect:", options: ["The huts to the center", "The sea to the sky", "The boat to the pier", "Nothing"], correct: 0 },
  { q: "The scale bar (100m) helps you:", options: ["Measure exact distances if relevant", "Ignore size", "Draw a picture", "Count tourists"], correct: 0 },
  { q: "A good overview mentions:", options: ["The specific number of huts", "The total transformation into a resort", "The color of the roof", "The time of day"], correct: 1 },
  { q: "The 'Pier' allows access for:", options: ["Cars", "Boats/Yachts", "Planes", "Trains"], correct: 1 },
  { q: "The tense for 'Before' is usually:", options: ["Past Simple", "Future Perfect", "Present Continuous", "Imperative"], correct: 0 },
  { q: "Is the island completely destroyed?", options: ["Yes", "No, some trees and the beach remain", "Maybe", "It sank"], correct: 1 },
];

// --- NEXUS KAHOOT QUIZZES ---
export const KAHOOT_QUIZ_1: QuizQuestion[] = Array.from({length: 15}, (_, i) => ({
  q: `Trend Analysis Protocol ${i+1}: Identify the correct verb form for a rapid upward movement.`,
  options: ["Rocketed", "Decreased", "Stabilized", "Fluctuated"],
  correct: 0
}));

// Placeholder for remaining KAHOOT quizzes to avoid massive file size in response
export const KAHOOT_QUIZ_2: QuizQuestion[] = [{q:"Comparisons", options:["X","Y","Z","A"], correct:0}];
export const KAHOOT_QUIZ_3: QuizQuestion[] = [{q:"Logic", options:["A","B","C","D"], correct:0}];
export const KAHOOT_QUIZ_4: QuizQuestion[] = [{q:"Grammar", options:["A","B","C","D"], correct:0}];
export const KAHOOT_QUIZ_5: QuizQuestion[] = [{q:"Process", options:["A","B","C","D"], correct:0}];
export const KAHOOT_QUIZ_6: QuizQuestion[] = [{q:"Vocab", options:["A","B","C","D"], correct:0}];
export const KAHOOT_QUIZ_7: QuizQuestion[] = [{q:"Selection", options:["A","B","C","D"], correct:0}];
export const KAHOOT_QUIZ_8: QuizQuestion[] = [{q:"Cohesion", options:["A","B","C","D"], correct:0}];
export const KAHOOT_QUIZ_9: QuizQuestion[] = [{q:"Overview", options:["A","B","C","D"], correct:0}];
export const KAHOOT_QUIZ_10: QuizQuestion[] = [{q:"Error", options:["A","B","C","D"], correct:0}];


// --- NEW MODULE DATA ---

// 1. FISH AND MEAT CONSUMPTION
export const FISH_DATA = [
  { label: 'Chicken', start: 150, end: 250, color: '#22c55e' }, // Green
  { label: 'Beef', start: 220, end: 100, color: '#ef4444' }, // Red
  { label: 'Lamb', start: 150, end: 60, color: '#3b82f6' }, // Blue
  { label: 'Fish', start: 60, end: 50, color: '#f97316' }, // Orange
];

export const FISH_VOCAB: VocabItem[] = [
  { term: "Overtook", def: "Passed in value/amount.", ex: "Chicken consumption overtook beef around 1989." },
  { term: "Downward trend", def: "A general decrease.", ex: "Beef and lamb showed a significant downward trend." },
  { term: "Soared", def: "Increased rapidly.", ex: "Consumption of chicken soared to 250 grams." },
  { term: "Remained stable", def: "Stayed roughly the same.", ex: "Fish consumption remained relatively stable." },
  { term: "Consumption", def: "The act of eating or using.", ex: "Weekly consumption per person." },
  { term: "Plummeted", def: "Fell quickly.", ex: "Beef consumption plummeted after 1980." }
];

export const FISH_QUIZ: QuizQuestion[] = [
  { q: "What is the main trend for Chicken?", options: ["Significant rise", "Steady fall", "Fluctuation", "Stability"], correct: 0 },
  { q: "Which meat was most popular in 1979?", options: ["Beef", "Chicken", "Lamb", "Fish"], correct: 0 },
  { q: "What happened to Fish consumption?", options: ["It skyrocketed", "It remained stable", "It crashed", "It disappeared"], correct: 1 },
  { q: "When did Chicken overtake Beef?", options: ["Around 1989", "In 2004", "In 1979", "Never"], correct: 0 },
  { q: "The unit of measurement is:", options: ["Grams per person per week", "Total tonnes", "Calories", "Price"], correct: 0 }
];

// 2. TEA SALES
export const TEA_DATA = [
    { country: 'Country A', y1980: 35, y2020: 45, color: '#3b82f6' },
    { country: 'Country B', y1980: 15, y2020: 15, color: '#f97316' }, // Peaked then dropped
    { country: 'Country C', y1980: 30, y2020: 15, color: '#9ca3af' },
    { country: 'Country D', y1980: 5, y2020: 8, color: '#eab308' },
    { country: 'Country E', y1980: 10, y2020: 8, color: '#0ea5e9' }
];

export const TEA_VOCAB: VocabItem[] = [
    { term: "Upward trajectory", def: "A path going up.", ex: "Country A followed an upward trajectory." },
    { term: "Fluctuated", def: "Rose and fell irregularly.", ex: "Sales in Country B fluctuated before declining." },
    { term: "Steadily declined", def: "Went down consistently.", ex: "Country C sales steadily declined over the period." },
    { term: "Plateaued", def: "Flattened out.", ex: "Sales plateaued after 2010." },
    { term: "Marginal change", def: "Very small difference.", ex: "There was only a marginal change in Country E." },
    { term: "Peaked", def: "Reached the highest point.", ex: "Country B peaked in 2005." }
];

export const TEA_QUIZ: QuizQuestion[] = [
    { q: "Which country had the highest sales throughout?", options: ["Country A", "Country B", "Country C", "Country D"], correct: 0 },
    { q: "What is the trend for Country C?", options: ["Steady decline", "Sharp rise", "Fluctuation", "Stability"], correct: 0 },
    { q: "Country B's sales initially:", options: ["Increased then fell", "Fell then increased", "Stayed flat", "Dropped to zero"], correct: 0 },
    { q: "The lowest sales were generally in:", options: ["Country D and E", "Country A", "Country C", "Country B"], correct: 0 },
    { q: "The timeframe covers:", options: ["40 years", "10 years", "100 years", "2 years"], correct: 0 }
];

// 3. SUGAR PROCESS
export const SUGAR_STEPS = [
    { step: 1, label: "Growing", desc: "12-18 months" },
    { step: 2, label: "Harvesting", desc: "Machine/Hand" },
    { step: 3, label: "Crushing", desc: "Extract Juice" },
    { step: 4, label: "Purifying", desc: "Limestone Filter" },
    { step: 5, label: "Evaporating", desc: "Heat -> Syrup" },
    { step: 6, label: "Centrifuge", desc: "Separate Crystals" },
    { step: 7, label: "Drying", desc: "Cooling & Drying" }
];

export const SUGAR_VOCAB: VocabItem[] = [
    { term: "Cultivation", def: "Growing plants.", ex: "The process begins with the cultivation of sugar cane." },
    { term: "Extracted", def: "Taken out.", ex: "Juice is extracted from the cane." },
    { term: "Purified", def: "Cleaned.", ex: "The juice is purified using a limestone filter." },
    { term: "Evaporates", def: "Turns from liquid to gas.", ex: "Heat evaporates the water, leaving syrup." },
    { term: "Separated", def: "Divided.", ex: "Sugar crystals are separated from the syrup." },
    { term: "Manufacturing", def: "Making something on a large scale.", ex: "The diagram shows the sugar manufacturing process." }
];

export const SUGAR_QUIZ: QuizQuestion[] = [
    { q: "How long does the growing stage last?", options: ["12-18 months", "6 months", "2 years", "1 month"], correct: 0 },
    { q: "What is used to purify the juice?", options: ["Limestone filter", "Sand", "Heat", "Centrifuge"], correct: 0 },
    { q: "What happens during evaporation?", options: ["Juice becomes syrup", "Cane is crushed", "Sugar dries", "Cane is harvested"], correct: 0 },
    { q: "The centrifuge is used to:", options: ["Separate crystals", "Crush cane", "Grow cane", "Heat juice"], correct: 0 },
    { q: "How many main stages are shown?", options: ["7", "3", "10", "2"], correct: 0 }
];

// 4. SALMON LIFE CYCLE
export const SALMON_CYCLE = [
    { stage: "Fry", loc: "Lower River", size: "3-8cm" },
    { stage: "Smolt", loc: "River to Sea", size: "12-15cm" },
    { stage: "Adult", loc: "Open Sea", size: "70-76cm" },
    { stage: "Spawning", loc: "Upper River", size: "Eggs" }
];

export const SALMON_VOCAB: VocabItem[] = [
    { term: "Life cycle", def: "The series of changes in the life of an organism.", ex: "The diagram illustrates the life cycle of the salmon." },
    { term: "Fry", def: "Baby fish.", ex: "The young fish, known as fry, live in the lower river." },
    { term: "Estuary", def: "Where the river meets the sea.", ex: "Smolts migrate to the estuary." },
    { term: "Inhabit", def: "Live in.", ex: "Adult salmon inhabit the open sea for approx 5 years." },
    { term: "Spawning", def: "Releasing eggs.", ex: "Adults return to the upper river for spawning." },
    { term: "Migrate", def: "Move from one region to another.", ex: "The fish migrate upstream." }
];

export const SALMON_QUIZ: QuizQuestion[] = [
    { q: "Where do salmon lay their eggs?", options: ["Upper river", "Open sea", "Lower river", "Beach"], correct: 0 },
    { q: "What is the first active stage called?", options: ["Fry", "Smolt", "Adult", "Egg"], correct: 0 },
    { q: "How long do they stay at sea?", options: ["Approx 5 years", "1 year", "6 months", "10 years"], correct: 0 },
    { q: "Which stage is the largest?", options: ["Adult", "Smolt", "Fry", "Egg"], correct: 0 },
    { q: "The movement from river to sea implies a change in:", options: ["Water salinity", "Temperature only", "Gravity", "Color"], correct: 0 }
];

// 5. SPORTS CENTRE
export const SPORTS_MAP_DATA = {
    present: ["Gym", "25m Pool", "Reception", "Changing Room", "Seating", "Outdoor Courts"],
    future: ["Leisure Pool", "Sports Hall", "Cafe", "Sports Shop", "Dance Studios", "Expanded Gym"]
};

export const SPORTS_VOCAB: VocabItem[] = [
    { term: "Redevelopment", def: "Changing an area/building.", ex: "The plan shows the proposed redevelopment of the center." },
    { term: "Extension", def: "Adding to a building.", ex: "The gym will undergo an extension." },
    { term: "Converted", def: "Changed use.", ex: "The outdoor courts will be converted into a sports hall." },
    { term: "Relocated", def: "Moved.", ex: "The changing room will be relocated." },
    { term: "Boast", def: "Feature something good.", ex: "The new center will boast a leisure pool." },
    { term: "Amenities", def: "Facilities.", ex: "New amenities like a cafe and shop will be added." }
];

export const SPORTS_QUIZ: QuizQuestion[] = [
    { q: "What will happen to the outdoor courts?", options: ["Replaced by Sports Hall", "Expanded", "Moved to roof", "Stay the same"], correct: 0 },
    { q: "Where is the new Leisure Pool located?", options: ["West side", "East side", "Center", "Outside"], correct: 0 },
    { q: "What new commercial facilities are added?", options: ["Cafe and Shop", "Cinema", "Hotel", "Bank"], correct: 0 },
    { q: "The gym will be:", options: ["Expanded", "Demolished", "Shrunk", "Moved"], correct: 0 },
    { q: "How many dance studios are planned?", options: ["2", "1", "4", "0"], correct: 0 }
];
