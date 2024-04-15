export function readEventsFromLocalStorage() {
  const eventsJSON = localStorage.getItem('events');
  const events = eventsJSON !== null ? JSON.parse(eventsJSON) : [];

  for (const event of events) {
    event.start = new Date(event.start);
  }

  return events
}
