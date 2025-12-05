

import { ChartDataPoint, QuizQuestion, VocabItem, StepItem, HousingDataPoint, TransportDataPoint, CoffeeDataPoint, PieDataPoint, TableDataPoint } from './types';

// ... (Existing Data Preserved and Fixed)
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
// 150 NEW QUESTIONS GENERATED FOR NEXUS ARENA

export const KAHOOT_QUIZ_1: QuizQuestion[] = Array.from({length: 15}, (_, i) => ({
  q: `Trend Analysis Protocol ${i+1}: Identify the correct verb form for a rapid upward movement.`,
  options: ["Rocketed", "Decreased", "Stabilized", "Fluctuated"],
  correct: 0
})).map((q, i) => {
    // Customizing the massive quiz set procedurally to ensure variety without 1000 lines of manual entry in this constrained view
    const scenarios = [
        { q: "A rapid increase.", opts: ["Rocketed", "Plummeted", "Plateaued", "Dipped"], c: 0 },
        { q: "A slow decrease.", opts: ["Gradual decline", "Sharp fall", "Sudden drop", "Steep decrease"], c: 0 },
        { q: "No change.", opts: ["Remained constant", "Fluctuated", "Peaked", "Surged"], c: 0 },
        { q: "Up and down movement.", opts: ["Fluctuated", "Stabilized", "Leveled off", "Rose"], c: 0 },
        { q: "The highest point.", opts: ["Peak", "Bottom", "Trough", "Plateau"], c: 0 },
        { q: "The lowest point.", opts: ["Lowest point / Trough", "Peak", "Summit", "Ceiling"], c: 0 },
        { q: "To stay flat after a rise.", opts: ["Plateaued", "Crashed", "Rocketed", "Dived"], c: 0 },
        { q: "A very small change.", opts: ["Marginal", "Significant", "Dramatic", "Exponential"], c: 0 },
        { q: "A very large change.", opts: ["Substantial", "Minimal", "Slight", "Tiny"], c: 0 },
        { q: "Future prediction verb.", opts: ["Is predicted to", "Has predicted", "Was predicted", "Predicting"], c: 0 },
        { q: "To go past another line.", opts: ["Overtake", "Undertake", "Meet", "Crash"], c: 0 },
        { q: "Noun for 'grow'.", opts: ["Growth", "Grew", "Grown", "Growing"], c: 0 },
        { q: "Adverb for 'fast'.", opts: ["Rapidly", "Slowly", "Steady", "Flat"], c: 0 },
        { q: "Adverb for 'slow'.", opts: ["Gradually", "Sharply", "Steeply", "Suddenly"], c: 0 },
        { q: "Preposition: An increase ___ 10%.", opts: ["of", "in", "at", "on"], c: 0 }
    ];
    return { ...q, ...scenarios[i] };
});

export const KAHOOT_QUIZ_2: QuizQuestion[] = Array.from({length: 15}, (_, i) => ({
    q: "Placeholder", options: [], correct: 0
})).map((q, i) => {
    const scenarios = [
        { q: "Comparisons: X is _____ larger than Y.", opts: ["significantly", "more", "very", "too"], c: 0 },
        { q: "X is twice _____ big as Y.", opts: ["as", "so", "than", "more"], c: 0 },
        { q: "X is the _____ popular option.", opts: ["most", "more", "much", "many"], c: 0 },
        { q: "X has _____ number of cars.", opts: ["the same", "as same", "same", "likewise"], c: 0 },
        { q: "More people drove cars _____ rode bikes.", opts: ["than", "then", "that", "as"], c: 0 },
        { q: "The figure for X was higher _____ Y.", opts: ["than that for", "than", "that", "as"], c: 0 },
        { q: "Which word means 'about'?", opts: ["Approximately", "Exactly", "Precisely", "Definitely"], c: 0 },
        { q: "Just under 50% can be called:", opts: ["Nearly half", "Over half", "A quarter", "A small minority"], c: 0 },
        { q: "75% is equivalent to:", opts: ["Three quarters", "Two thirds", "A half", "One quarter"], c: 0 },
        { q: "33% is roughly:", opts: ["One third", "One quarter", "Half", "All"], c: 0 },
        { q: "10% is a:", opts: ["Small minority", "Vast majority", "Half", "Quarter"], c: 0 },
        { q: "X is _____ double the size of Y.", opts: ["almost", "quite", "near", "closely"], c: 0 },
        { q: "In comparison _____ X, Y is small.", opts: ["with", "to", "at", "on"], c: 0 },
        { q: "X is different _____ Y.", opts: ["from", "than", "to", "by"], c: 0 },
        { q: "Unlike X, Y is...", opts: ["large", "larger", "largest", "largely"], c: 0 }
    ];
    return { ...q, ...scenarios[i] };
});

export const KAHOOT_QUIZ_3: QuizQuestion[] = Array.from({length: 15}, (_, i) => ({
    q: "Placeholder", options: [], correct: 0
})).map((q, i) => {
    const scenarios = [
        { q: "Map: To remove a building.", opts: ["Demolish", "Build", "Construct", "Erect"], c: 0 },
        { q: "Map: To make something new.", opts: ["Construct", "Demolish", "Clear", "Cut"], c: 0 },
        { q: "Map: To change the use of a room.", opts: ["Convert", "Move", "Build", "Plant"], c: 0 },
        { q: "Map: Trees were ____ down.", opts: ["Chopped", "Cutted", "Move", "Kill"], c: 0 },
        { q: "Map: The school is located ____ the north.", opts: ["to", "in", "at", "on"], c: 0 },
        { q: "Map: The houses are ____ the river.", opts: ["along", "between", "among", "through"], c: 0 },
        { q: "Map: A road ____ the park.", opts: ["passes through", "jumps", "walks", "goes"], c: 0 },
        { q: "Map: The size of the park was ____.", opts: ["reduced", "small", "less", "short"], c: 0 },
        { q: "Map: The car park was ____ to make room.", opts: ["expanded", "big", "more", "large"], c: 0 },
        { q: "Map: The town ____ significant changes.", opts: ["underwent", "did", "made", "saw"], c: 0 },
        { q: "Map: Passive: A bridge _____ built.", opts: ["was", "is", "were", "has"], c: 0 },
        { q: "Map: Passive: Trees _____ cut down.", opts: ["were", "was", "is", "has"], c: 0 },
        { q: "Map: Passive: The area _____ modernized.", opts: ["has been", "was be", "is be", "had"], c: 0 },
        { q: "Map: 'Parallel to' means:", opts: ["Running alongside", "Crossing", "Meeting", "Opposite"], c: 0 },
        { q: "Map: 'Intersection' means:", opts: ["Where roads meet", "A dead end", "A bridge", "A tunnel"], c: 0 }
    ];
    return { ...q, ...scenarios[i] };
});

// Cloning structure for Quizzes 4-10 with placeholder logic for brevity in this response but ensuring 15 distinct questions per drill
const createDrill = (topic: string, items: {q: string, o: string[]}[]): QuizQuestion[] => {
    return items.map((item) => ({
        q: `${topic}: ${item.q}`,
        options: item.o,
        correct: 0 
    }));
};

export const KAHOOT_QUIZ_4 = createDrill("Grammar", [
    { q: "Past Tense of 'Rise'", o: ["Rose", "Rised", "Risen", "Rising"] },
    { q: "Past Participle of 'Fall'", o: ["Fallen", "Fell", "Falled", "Falling"] },
    { q: "Past Tense of 'Shrink'", o: ["Shrank", "Shrunk", "Shrinked", "Shrunken"] },
    { q: "Passive voice check: The data ____ collected.", o: ["was", "were", "is", "had"] },
    { q: "Subject-Verb Agreement: The number of cars ____.", o: ["increases", "increase", "increasing", "are increasing"] },
    { q: "Article check: ____ United Kingdom.", o: ["The", "A", "An", "-"] },
    { q: "Preposition: Increase ____ 5%.", o: ["by", "of", "in", "at"] },
    { q: "Preposition: An increase ____ 5%.", o: ["of", "by", "in", "at"] },
    { q: "Preposition: Peaked ____ 100.", o: ["at", "in", "on", "to"] },
    { q: "Preposition: Between 1990 ____ 2000.", o: ["and", "to", "or", "with"] },
    { q: "Preposition: From 1990 ____ 2000.", o: ["to", "until", "and", "by"] },
    { q: "Adverb position: It ____ increased.", o: ["dramatically", "dramatic", "more", "big"] },
    { q: "Relative Clause: The car, ____ was red.", o: ["which", "who", "that", "where"] },
    { q: "Connector: ____, sales fell.", o: ["However", "But", "And", "So"] },
    { q: "Connector: ____ sales fell, profits rose.", o: ["Although", "However", "But", "Despite"] },
]);

export const KAHOOT_QUIZ_5 = createDrill("Process", [
    { q: "First step connector", o: ["Firstly", "At first", "In the beginning", "Start"] },
    { q: "Next step connector", o: ["Subsequently", "Second", "After", "Before"] },
    { q: "Last step connector", o: ["Finally", "At last", "End", "Finish"] },
    { q: "Passive: The tea ____ picked.", o: ["is", "are", "was", "were"] },
    { q: "Passive: The boxes ____ packed.", o: ["are", "is", "was", "has"] },
    { q: "Verb: To grind coffee.", o: ["Ground", "Grinded", "Grand", "Grind"] },
    { q: "Verb: To weave cloth.", o: ["Woven", "Weaved", "Wove", "Weaven"] },
    { q: "Connector: ____ the tea is dried.", o: ["Once", "Before", "While", "During"] },
    { q: "Connector: ____ being dried, it is packed.", o: ["After", "Before", "While", "Once"] },
    { q: "Cyclical Process: It repeats.", o: ["Cycle", "Circle", "Line", "Square"] },
    { q: "Man-made vs Natural", o: ["Artificial", "Nature", "Real", "Fake"] },
    { q: "Verb: To heat up.", o: ["Heated", "Hot", "Heat", "Hotten"] },
    { q: "Verb: To cool down.", o: ["Cooled", "Cold", "Cool", "Colden"] },
    { q: "Preposition: Put ____ the box.", o: ["into", "onto", "at", "by"] },
    { q: "Preposition: Take ____ of the box.", o: ["out", "off", "from", "away"] },
]);

export const KAHOOT_QUIZ_6 = createDrill("Vocab Power", [
    { q: "Synonym for 'Big'", o: ["Substantial", "Nice", "Good", "Bad"] },
    { q: "Synonym for 'Small'", o: ["Negligible", "Little", "Few", "Short"] },
    { q: "Synonym for 'Important'", o: ["Significant", "Main", "Big", "Cool"] },
    { q: "Synonym for 'Show'", o: ["Depict", "Say", "Tell", "Speak"] },
    { q: "Synonym for 'Change'", o: ["Alteration", "Move", "Jump", "Run"] },
    { q: "Synonym for 'Stop'", o: ["Cease", "End", "Finish", "Done"] },
    { q: "Synonym for 'Start'", o: ["Commence", "Go", "Begin", "Play"] },
    { q: "Synonym for 'Money'", o: ["Expenditure", "Cash", "Bucks", "Coin"] },
    { q: "Synonym for 'People'", o: ["Inhabitants", "Guys", "Folks", "Men"] },
    { q: "Synonym for 'Students'", o: ["Pupils", "Kids", "Learners", "Boys"] },
    { q: "Synonym for 'Old People'", o: ["The elderly", "Olds", "Grandpas", "Seniors"] },
    { q: "Synonym for 'Job'", o: ["Occupation", "Work", "Gig", "Task"] },
    { q: "Synonym for 'School'", o: ["Educational Institution", "Place", "Room", "Hall"] },
    { q: "Synonym for 'Car'", o: ["Vehicle", "Ride", "Motor", "Wheel"] },
    { q: "Synonym for 'House'", o: ["Residential dwelling", "Home", "Place", "Room"] },
]);

export const KAHOOT_QUIZ_7 = createDrill("Data Selection", [
    { q: "Do you report everything?", o: ["No", "Yes", "Maybe", "Sometimes"] },
    { q: "What is a 'Main Feature'?", o: ["High/Low/Trend", "Random number", "The title", "The year"] },
    { q: "How many numbers should you write?", o: ["Enough to support points", "All of them", "None", "50"] },
    { q: "Grouping data helps to:", o: ["Compare", "Confuse", "Fill space", "Write more"] },
    { q: "Exceptions are:", o: ["Important", "Bad", "Wrong", "Useless"] },
    { q: "If data is constant:", o: ["Mention stability", "Ignore it", "Panic", "Guess"] },
    { q: "If lines cross:", o: ["Mention the intersection", "Ignore", "Erase it", "Stop"] },
    { q: "If a chart is complex:", o: ["Simplify/Group", "Write everything", "Cry", "Skip"] },
    { q: "The 'Others' category:", o: ["Mention if significant", "Always ignore", "Write first", "Delete"] },
    { q: "Rounding numbers:", o: ["Is good (approx)", "Is bad", "Is lazy", "Is illegal"] },
    { q: "Exact numbers:", o: ["Use sparingly", "Use always", "Never use", "Only for 0"] },
    { q: "Unit of measurement:", o: ["Check axis", "Guess", "Dollars", "Percent"] },
    { q: "Time period:", o: ["Check title/axis", "Guess", "Now", "Future"] },
    { q: "Legend key:", o: ["Identifies categories", "Is useless", "Is decoration", "Is wrong"] },
    { q: "Footnotes:", o: ["Read them", "Ignore them", "Delete them", "Hide them"] },
]);

export const KAHOOT_QUIZ_8 = createDrill("Cohesion", [
    { q: "Linking similar ideas", o: ["Similarly", "But", "However", "So"] },
    { q: "Linking opposite ideas", o: ["In contrast", "And", "Also", "Plus"] },
    { q: "Adding a point", o: ["Furthermore", "But", "Yet", "Or"] },
    { q: "Concluding", o: ["Overall", "In end", "Lastly", "Bye"] },
    { q: "Giving an example", o: ["For instance", "Like", "As", "Such"] },
    { q: "Sequencing", o: ["Then", "And", "Or", "So"] },
    { q: "Referencing back", o: ["This figure", "That thing", "It", "He"] },
    { q: "Referencing forward", o: ["The following", "Next", "Go", "See"] },
    { q: "Highlighting", o: ["Notably", "Cool", "Look", "See"] },
    { q: "Generalizing", o: ["Generally", "Always", "Never", "Exact"] },
    { q: "Specifying", o: ["Specifically", "General", "About", "Around"] },
    { q: "Clarifying", o: ["In other words", "So", "Like", "As"] },
    { q: "Emphasizing", o: ["Clearly", "Maybe", "Sort of", "Kind of"] },
    { q: "Comparing", o: ["Compared to", "With", "At", "On"] },
    { q: "Contrasting", o: ["While", "When", "As", "So"] },
]);

export const KAHOOT_QUIZ_9 = createDrill("Overview Logic", [
    { q: "Does Overview need numbers?", o: ["No", "Yes", "Maybe", "Always"] },
    { q: "Where does Overview go?", o: ["After Intro or End", "Middle", "Start", "Nowhere"] },
    { q: "What goes in Overview?", o: ["General trends", "Specifics", "Opinion", "Name"] },
    { q: "How long is Overview?", o: ["2-3 sentences", "10 sentences", "1 word", "1 page"] },
    { q: "Does Overview interpret why?", o: ["No", "Yes", "Sometimes", "Maybe"] },
    { q: "Can you list items?", o: ["No, summarize", "Yes", "Maybe", "Always"] },
    { q: "Start with:", o: ["Overall", "So", "Then", "Next"] },
    { q: "Identify:", o: ["Highest/Lowest", "Middle", "Random", "Colors"] },
    { q: "Identify:", o: ["Growth/Decline", "Static", "Nothing", "Paper"] },
    { q: "Identify:", o: ["Major changes", "Minor details", "Typos", "Ink"] },
    { q: "Identify:", o: ["Exceptions", "Rules", "Laws", "Time"] },
    { q: "Identify:", o: ["Stages (Process)", "Dates", "Names", "Places"] },
    { q: "Identify:", o: ["Total change", "Partial change", "No change", "Fun"] },
    { q: "Avoid:", o: ["Specific data", "Trends", "Summaries", "English"] },
    { q: "Focus on:", o: ["Big Picture", "Small details", "Pixels", "Font"] },
]);

export const KAHOOT_QUIZ_10 = createDrill("Error Correction", [
    { q: "Correct: 'The data is...'", o: ["The data are", "The data is", "The datas are", "The date is"] },
    { q: "Correct: 'The percent of...'", o: ["percentage", "percent", "percents", "percentile"] },
    { q: "Correct: 'In 2024, it will rise.'", o: ["is predicted to rise", "will rise", "rose", "rises"] },
    { q: "Correct: 'Prices cheapened.'", o: ["decreased", "cheapened", "lowered", "felled"] },
    { q: "Correct: 'Numbers got big.'", o: ["increased", "got big", "larged", "up"] },
    { q: "Correct: 'Kids went to school.'", o: ["Children attended", "Kids went", "Boys went", "Small humans"] },
    { q: "Correct: 'It went up and down.'", o: ["Fluctuated", "Waved", "Shook", "Jumped"] },
    { q: "Correct: 'To sum up...'", o: ["Overall", "To sum up", "In end", "Finish"] },
    { q: "Correct: 'See the chart.'", o: ["As shown in the chart", "See chart", "Look chart", "Watch chart"] },
    { q: "Correct: '50 percents'", o: ["percent", "percents", "percentage", "per"] },
    { q: "Correct: 'Informations'", o: ["Information", "Informations", "Infos", "Data's"] },
    { q: "Correct: 'A few amount'", o: ["A small amount", "A few amount", "A little number", "A less"] },
    { q: "Correct: 'Much people'", o: ["Many people", "Much people", "Lot people", "Big people"] },
    { q: "Correct: 'Less cars'", o: ["Fewer cars", "Less cars", "Small cars", "Low cars"] },
    { q: "Correct: 'More faster'", o: ["Faster", "More faster", "Fastest", "Much fast"] },
]);