export function getMiddleYearWeeks(weeks) {
  const weeksByYear = {};
  for (const week of weeks) {
    weeksByYear[week.getFullYear()] ??= [];
    weeksByYear[week.getFullYear()].push(week);
  }

  const maxYearWeeksCapacity = Math.max(...Object.values(weeksByYear).map(week => week.length));
  return Object.values(weeksByYear)
    .filter(weeks => weeks.length > maxYearWeeksCapacity / 2)
    .map(weeks => weeks[Math.floor(weeks.length / 2)]);
}
