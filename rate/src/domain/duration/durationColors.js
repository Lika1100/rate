export const colorsByDuration = {
  "60": "#005ffb",
  "90": "#00bb00",
  "DEFAULT": "#d42111",
}


export const durationToLabel = {
  "60": "1 час",
  "90": "1.5 часа",
  "DEFAULT": "Другое",
}


export function durationByEvents(events) {
  if (events.length === 0) {
    return "NONE";
  }

  const { duration } = events[0];
  
  if (colorsByDuration[duration] === undefined) {
    return "DEFAULT";
  }
  
  return duration;
}