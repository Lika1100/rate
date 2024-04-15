import { parseCalendar } from "./parseCalendar";

export function file2text(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.readAsText(file);
  })
}

export function text2events(text) {
  const START = new Date(2019, 0, 1, 3, 0, 0);

  const events = parseCalendar(text)
    .filter(event => event.start >= START)
    .map(event => {
      event.name = event.name.replace(/[^а-яёa-z0-9|]/ig, "")
      return event;
    })
    .sort((a, b) => a.start - b.start);

  return events;
}
