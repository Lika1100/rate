import { columnBackground } from "./columnBackground";
import { GraphInner } from "./GraphInner";

export function Graph({
  weeks,
  eventsByWeeks,
  columnHeight,
  columnWidth,
  columnValueType,
  distributionType,
  defaultColor = "#fff",
  width = columnWidth * eventsByWeeks.length,
  className,
}) {
  return (
    <GraphInner
      weeks={weeks}
      eventsByWeeks={eventsByWeeks}
      columnHeight={columnHeight}
      columnWidth={columnWidth}
      columnValueType={columnValueType}
      computeBackground={(events) => columnBackground(events, columnValueType, distributionType, defaultColor)}
      width={width}
      className={className}
    />
  )
}

