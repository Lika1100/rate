import React, { useLayoutEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./Graph.module.css";
import { accumulateEvents } from "../../domain/events/accumulateEvents";
import { getMiddleYearWeeks } from "./getMiddleYearWeeks";
import { inflationByMonth } from "../../domain/inflation/inflation";
import { formatDDMMYY } from "../../domain/dates/formatDate";

const INFLATION_APPLICABLE_COLUMNS = ["rate", "income"]

function calcLevelsCount(maxGraphValue) {
  let divisor = maxGraphValue / 10;
  if (maxGraphValue < 100) {
    divisor = 10;
  } else if (maxGraphValue < 300) {
    divisor = 40;
  } else if (maxGraphValue < 3_000) {
    divisor = 200;
  } else if (maxGraphValue < 100_000) {
    divisor = 10_000;
  } else if (maxGraphValue < 200_000) {
    divisor = 20_000;
  } else if (maxGraphValue < 500_000) {
    divisor = 50_000;
  }
  
  const levels = Math.ceil(maxGraphValue / divisor);
  return [levels, levels * divisor];
}

export function GraphInner({
  onColumnClick,
  weeks,
  eventsByWeeks,
  columnHeight,
  columnWidth,
  columnValueType,
  computeBackground = () => "white",
  width = columnWidth * eventsByWeeks.length,
  className,
  calculateColumnValue,
}) {
  const [inflationAdjusted, setInflationAdjusted] = useState(false);

  const columnsValues = eventsByWeeks
    .map(events => calculateColumnValue ? calculateColumnValue(events) : accumulateEvents(events, columnValueType))
    .map((val, i) => {
      const week = weeks[i];
      const inflation = inflationByMonth[`${week.getFullYear()}.${week.getMonth()}`] ?? 1;
      return !inflationAdjusted || !INFLATION_APPLICABLE_COLUMNS.includes(columnValueType) ? val : val / inflation;
    });

  const maxColumnValue = Math.max(...columnsValues);
  const [levelsCount, maxGraphValue] = calcLevelsCount(maxColumnValue)

  const levels = Array(levelsCount - 1)
    .fill()
    .map((_, i) => [(levelsCount - i - 1) * maxGraphValue / levelsCount, (i + 1) / levelsCount * columnHeight]);

  const innerWidth = columnWidth * eventsByWeeks.length;
  const columnsHeights = eventsByWeeks
    .map((events) => (calculateColumnValue ? calculateColumnValue(events) : accumulateEvents(events, columnValueType)) / maxGraphValue * columnHeight)
    .map((val, i) => {
      const week = weeks[i];
      const inflation = inflationByMonth[`${week.getFullYear()}.${week.getMonth()}`] ?? 1;
      return !inflationAdjusted || !INFLATION_APPLICABLE_COLUMNS.includes(columnValueType) ? val : val / inflation;
    });

  const wrapperRef = useRef();
  useLayoutEffect(() => {
    wrapperRef.current.scrollLeft = 100000;
  }, []);

  const middleYearWeeks = getMiddleYearWeeks(weeks);

  return (
    <div className={cn(styles.wrapper, className)} style={{ width }}>
      {INFLATION_APPLICABLE_COLUMNS.includes(columnValueType) && (
        <button className={styles.inflation} onClick={() => setInflationAdjusted(p => !p)}>
          {inflationAdjusted ? "👿" : "🙄"}
        </button>
      )}
      {levels.reverse().map(([value, top]) => (
        <React.Fragment>
          <div className={styles.levelLine} style={{ top }} />
          <div className={styles.levelValue} style={{ top }}>{value}</div>
        </React.Fragment>
      ))}
      <div className={styles.graphWrapperInner} style={{ width }} ref={wrapperRef}>
        <div style={{
          width: innerWidth,
          display: 'flex',
          position: 'static',
        }}>
          {eventsByWeeks.map((events, index) => {
            const week = weeks[index];
            const fullYear = week.getFullYear();
            const month = week.getMonth() % 6 < 3;
            const isOddYear = fullYear % 2 === 1;

            const border = `10px solid ${isOddYear ? "#113" : "white"}`;
            const style = {
              height: columnHeight,
              width: columnWidth,
              backgroundColor: month ? "rgba(0, 0, 0, 0.1)" : undefined,
              borderBottom: border,
              boxSizing: "content-box",
              zIndex: 1,
            };
            const innerStyle = {
              marginTop: columnHeight - columnsHeights[index],
              height: columnsHeights[index],
              outline: columnsHeights[index] > 0 ? `0.1px solid rgba(0, 0, 0, 0.2)` : undefined,
              background: computeBackground(events, index),
            };

            return (
              <React.Fragment>
                <div style={style} title={formatDDMMYY(week)}>
                  <div style={innerStyle} onClick={() => onColumnClick(index)}/>
                </div>
                {middleYearWeeks.includes(week) && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: index * columnWidth,
                      color: !isOddYear ? "#113" : "white",
                      transform: "translateX(-50%)",
                      zIndex: 1000,
                      fontSize: 8,
                      lineHeight: "10px",
                      fontWeight: "bold",
                    }}
                  >{fullYear}</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
