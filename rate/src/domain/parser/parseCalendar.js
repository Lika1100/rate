import {parseDate} from "../dates/parseDate";

export function parseCalendar (content) {
  const rawEvents = content.split('BEGIN:VEVENT\r\n').slice(1)
  const events = [];

  for(const rawEvent of rawEvents) {
      const lines = rawEvent.trim().split("\r\n");
      const entries = lines.map(line => line.split(":") )
      const obj = Object.fromEntries(entries);
      
      const dtEnd = obj['DTEND;TZID=Europe/Moscow']
      const dtStart = obj['DTSTART;TZID=Europe/Moscow']

      const start = parseDate(dtStart)
      const end = parseDate(dtEnd)
      const duration = (end - start) / 60_000;

      const price = Number(obj['LOCATION']);
      const name = obj['SUMMARY'];

      events.push({
          start,
          duration,
          name,
          price,
      });
  }
  return events
}


