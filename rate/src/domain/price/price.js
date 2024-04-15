export const rates = {
  60: {
    '1300': "STAGE_1",
    '1800': "STAGE_2",
    '1900': "STAGE_3",
    '2000': "STAGE_4",
    '2200': "STAGE_5",
    '2300': "STAGE_6",
    '2500': "STAGE_7",
  },
  90: {
    '2000': "STAGE_1",
    '2300': "STAGE_2",
    '2500': "STAGE_2",
    '2700': "STAGE_3",
    '2900': "STAGE_4",
    '3000': "STAGE_4",
    '3100': "STAGE_5",
    '3300': "STAGE_6",
    '3700': "STAGE_7",
  },
  120: {
    '4000': "STAGE_5",
  }
}

export const stages = Array.from(new Set(Object.values(rates).flatMap(obj => Object.values(obj))));


export function priceByStage(stage) {
  return Object.keys(rates)
    .map(
      rate => [rate, Object.keys(rates[rate]).filter(price => rates[rate][price] === stage)]
    )
}

export function priceStageByEvents(events) {
  if (events.length === 0) {
    return "NONE";
  }
  const { price, duration } = events[0];
  return rates?.[duration]?.[price] ?? "DEFAULT"
}
