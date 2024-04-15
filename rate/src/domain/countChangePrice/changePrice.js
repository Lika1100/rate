import { priceStageByEvents } from "../price/price"

export function changePrice(students) {

  return students.map(({ name, events }) => {
    const priceStages = {}
    events.forEach((event) => {
      const stage = priceStageByEvents([event])
      priceStages[stage] ??= 0
      priceStages[stage]++
    });

    const sum = Object.values(priceStages).reduce((a, b) => a + b, 0);
    const percentage = Object.fromEntries(Object.entries(priceStages).map(([k, v]) => [k, v/sum]));

    return {
      name,
      events,
      priceStages,
      str: Object.values(priceStages).sort((a, b) => b - a).toString(),
    }
  })
  .filter(x => Object.keys(x.priceStages).length > 1)
  .sort((a, b) => {
    return Object.values(a.priceStages).sort((a, b) => b - a)[1] - Object.values(b.priceStages).sort((a, b) => b - a)[1]
  })
}