import {rates} from "../../domain/price/price";
import {colorByPriceStage} from "../../domain/price/priceColors";
import {colorsByFrequency} from "../../domain/frequency/frequencyColors";
import { colorsByDuration } from "../../domain/duration/durationColors";



const keys = {
  "hours": Object.keys(colorsByDuration),
  "count": Object.keys(colorsByFrequency),
  "price": Object.keys(colorByPriceStage),
}

const colorsDict = {
  "hours": colorsByDuration,
  "count": colorsByFrequency,
  "price": colorByPriceStage,
}
export const eventValueExtractor = {
  duration: event => event.duration / 60,
  income: event => event.price,
  count: () => 1,
  rate: (event) => event.price / event.duration,
}

export const counterCollector = {
  "hours": countEventDurationTypes,
  "price": countEventPriceStageTypes,
  // "frequency": 1,
}

function countEventDurationTypes(events, columnValueType) {
  const types = keys["hours"];
  const counter = Object.fromEntries(types.map(key => [key, 0]));
  events.forEach((event) => {
    const {duration} = event;
    const key = duration in counter ? duration : "DEFAULT";
    counter[key] += eventValueExtractor[columnValueType](event);
  })
  return counter;
}

function countEventPriceStageTypes(events, columnValueType) {
  const types = keys["price"];
  const counter = Object.fromEntries(types.map(key => [key, 0]));
  events.forEach((event) => {
    const {duration, price} = event;
    const key = rates[duration]?.[price] ?? "DEFAULT"
    counter[key] += eventValueExtractor[columnValueType](event);
  })
  return counter;
}

// columnValueType === "duration" | "count" | "income"
// distributionType === "hours" | "frequency" | "price"
export function columnBackground(events, columnValueType, distributionType, defaultColor) {
  if (distributionType === "none") {
    return defaultColor;
  }

  const types = Array.from(keys[distributionType]).reverse();
  const counter = counterCollector[distributionType](events, columnValueType);
  const sum = Object.values(counter).reduce((a, b) => a + b, 0);

  const percentsByKeys = types.map((x) => sum !== 0 ? (counter[x] / sum * 100) : 0);
  const boundaries = generateGradientPartsBoundaries(percentsByKeys);
  const colors = colorsDict[distributionType];
  const colorParts = boundaries
    .map((x, i) => `${colors[types[i]]} ${x[0]}%, ${colors[types[i]]} ${x[1]}%`)

  return `linear-gradient(to top, ${colorParts.join(',')})`;
}

function generateGradientPartsBoundaries(percents) {
  let sum = 0;
  let result = []
  for (let i = 0; i < percents.length; i++) {
    result.push([sum, sum + percents[i]])
    sum += percents[i]
  }
  return result
}

