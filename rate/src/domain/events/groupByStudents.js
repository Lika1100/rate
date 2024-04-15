export function groupByStudents(events) {
  const eventsByStudents = {}

  for (const event of events) {
    eventsByStudents[event.name] ??= []
    eventsByStudents[event.name].push(event)
  }

  return eventsByStudents
}
