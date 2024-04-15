export function getWeekDays(monday) {
  const weekDays = []

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(monday)
    currentDay.setDate(currentDay.getDate() + i)
    weekDays.push(currentDay)
  }

  return weekDays
}
