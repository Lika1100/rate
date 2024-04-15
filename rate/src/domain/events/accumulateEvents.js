import {eventValueExtractor} from "../../components/BarGraph/columnBackground";

export function accumulateEvents(events, columnValueType) {
  if (columnValueType === "students") {
    return new Set(events.map(event => event.name)).size;
  }
  if (columnValueType === "rate") {
    const income = accumulateEvents(events, "income");
    const duration = accumulateEvents(events, "duration");
    return income === 0 ? 0 : income / duration;
  }
  return events.reduce((acc, event) => acc + eventValueExtractor[columnValueType](event), 0);
}
