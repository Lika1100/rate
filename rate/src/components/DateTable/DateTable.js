import React, { useState } from "react";
import cn from "classnames";
import { getFirstMonday } from "../../domain/events/weeksByEvents";
import styles from "./DateTable.module.css";
import { accumulateEvents } from "../../domain/events/accumulateEvents";
import { formatPrice } from "../../domain/formatters/formatPrice";

function isClamped(index, startIndex, endIndex) {
  if (startIndex === null || endIndex === null) {
    return false;
  }
  if (startIndex > endIndex) {
    [startIndex, endIndex] = [endIndex, startIndex];
  }
  return startIndex <= index && index <= endIndex
}

export function DateTable({
  data,
  formatter,
  isHighlightedRow,
  onRowClick,
}) {
  const [startIndex, setStartIndex] = useState(null);
  const [endIndex, setEndIndex] = useState(null);

  function handleMouseDown(e) {
    const tr = e.target.closest("tr");
    const { index } = tr.dataset;
    setStartIndex(+index)
  }

  function handleMouseUp(e) {
    setStartIndex(null);
    setEndIndex(null);
  }

  function handleMouseMove(e) {
    const tr = e.target.closest("tr");
    const { index } = tr.dataset;
    setEndIndex(+index)
  }

  function normalizeBoundaries(startIndex, endIndex, length) {
    if (startIndex === null || endIndex === null) {
      return [0, length - 1];
    }
    if (startIndex > endIndex) {
      return [endIndex, startIndex];
    }

    return [startIndex, endIndex]
  }

  const [start, end] = normalizeBoundaries(startIndex, endIndex, data.length);
  const selectedEvents = data.slice(start, end + 1).flatMap(({ events }) => events)

  const selectedWeeksNumber = end - start + 1;
  const selectedEventsTotalDuration = accumulateEvents(selectedEvents, "duration");
  const selectedEventsTotalIncome = accumulateEvents(selectedEvents, "income");
  const selectedEventsRate = accumulateEvents(selectedEvents, "rate");

  const selectedEventsAveregelDuration = selectedEventsTotalDuration / selectedWeeksNumber;
  const selectedEventsAveregeIncome = selectedEventsTotalIncome / selectedWeeksNumber;

  const isBottomStatisticsHidden = start === 0 && end === data.length - 1 || start === end;
  return (
    <React.Fragment>
      <table
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={cn(styles.table, styles.mainTable)}
      >
        {data.map(({ firstDay, events }, i) => {
          const isCurrentWeek = firstDay - getFirstMonday(new Date()) === 0;
          const isEvenMonth = isHighlightedRow(firstDay);

          const totalDuration = accumulateEvents(events, "duration");
          const totalIncome = accumulateEvents(events, "income");
          const rate = totalIncome / totalDuration;

          const mondayStr = formatter(firstDay);

          const isSelected = isClamped(i, startIndex, endIndex);

          return (
            <tr
              data-index={i}
              onDoubleClick={onRowClick ? () => onRowClick(firstDay) : undefined}
              className={cn(
                styles.row,
                isCurrentWeek && styles.currentWeek,
                isEvenMonth && styles.evenMonth,
                isSelected && styles.selectedWeek,
                i === start && styles.firstSelectedWeek,
                i === end && styles.lastSelectedWeek
              )}
            >
              <td className={styles.col}>{mondayStr}</td>
              <td className={styles.col}>{totalDuration.toFixed(0)}</td>
              <td className={styles.col}>{formatPrice(totalIncome.toFixed(0))}</td>
              <td className={styles.col}>{rate.toFixed(0)}</td>
            </tr>
          )
        })}

      </table>
      <div
        className={styles.tableBottom}
        style={{ opacity: isBottomStatisticsHidden ? 0 : 1 }}
      >
        <table className={styles.table}>
          <tr className={styles.row}>
            <td className={styles.col}><b>total</b></td>
            <td className={styles.col}>{selectedEventsTotalDuration.toFixed(0)}</td>
            <td className={styles.col}>{formatPrice(selectedEventsTotalIncome.toFixed(0))}</td>
            <td className={styles.col}></td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.col}><b>average</b></td>
            <td className={styles.col}>{selectedEventsAveregelDuration.toFixed(0)}</td>
            <td className={styles.col}>{formatPrice(selectedEventsAveregeIncome.toFixed(0))}</td>
            <td className={styles.col}>{selectedEventsRate.toFixed(0)}</td>
          </tr>
        </table>
      </div>
    </React.Fragment>
  );
}
