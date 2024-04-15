export function groupByMonth(weeks) {
  const weeksInMonth = [[weeks[0]]];
  for (const week of weeks.slice(1)) {
    if (weeksInMonth.at(-1).at(-1).getMonth() !== week.getMonth()) {
      weeksInMonth.push([]);
    }
    weeksInMonth.at(-1).push(week);
  }
  return weeksInMonth;
}
