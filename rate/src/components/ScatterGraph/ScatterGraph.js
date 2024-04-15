import cn from "classnames";
import React from "react";
import { coordinateAxisConfiguration } from "./coordinateAxisConfiguration";
import styles from "./ScatterGraph.module.css";
import {accumulateEvents} from "../../domain/events/accumulateEvents";

export function ScatterGraph({
  events,
  height,
  width,
  pointSize = 3,
}) {
  const points = events.map((weekEvents) => {
    const totalDuration = accumulateEvents(weekEvents, "duration");
    const totalIncome = accumulateEvents(weekEvents, "income");
    const rate = totalIncome / totalDuration;

    return { hours: totalDuration, rate };
  });

  const hours = points.map(obj => obj.hours)
  const maxHours = Math.max(...hours) + 5;
  const minHours = 0;

  const rates = points.map(obj => obj.rate)
  const maxRate = Math.max(...rates) + 100;
  const minRate = Math.min(...rates) - 200;

  const [rateSteps, actualRateStart, actualRateEnd] = coordinateAxisConfiguration(minRate, maxRate);
  const [hoursSteps, actualHoursStart, actualHoursEnd] = coordinateAxisConfiguration(minHours, maxHours, true);

  const cordinates = points.map((point, i) => {
    const nextPoint = points[i + 1] ?? points[0];
    const x = (point.hours - actualHoursStart) / (actualHoursEnd - actualHoursStart)
    const y = (point.rate - actualRateStart) / (actualRateEnd - actualRateStart)

    const nextX = (nextPoint.hours - actualHoursStart) / (actualHoursEnd - actualHoursStart)
    const nextY = (nextPoint.rate - actualRateStart) / (actualRateEnd - actualRateStart)

    const dx = (nextX - x) * width;
    const dy = -(nextY - y) * height;

    const dist = Math.hypot(dx, dy);
    const rad = Math.atan(dy / dx);

    const top = (1 - y) * height;
    const left = x * width;

    return [x, y, dist, rad, dx, top, left]
  })

  return <div className={styles.wrapper} style={{
    width,
    height,
  }}>
    {rateSteps.map(([value, topShift]) => {
      return (
        <React.Fragment>
          <div className={styles.gridLineHorizontal} style={{ top: `${topShift * 100}%`, }} />
          <div
            className={cn(styles.value, styles.vertical)}
            style={{
              top: `${topShift * 100}%`,
            }}
          >
            {value}
          </div>
        </React.Fragment>
      )
    })}

    {hoursSteps.map(([value, leftShift]) => {
      return (
        <React.Fragment>
          <div className={styles.gridLineVetical} style={{ left: `${leftShift * 100}%` }} />
          <div
            className={cn(styles.value, styles.horizontal)}
            style={{
              left: `${leftShift * 100}%`,
            }}
          >
            {value}
          </div>
        </React.Fragment>
      )
    })}

    {cordinates.map(([x, y, dist, rad, dx, top, left], i) => {
      return (
        <React.Fragment>
          <div
            className={styles.point}
            style={{ top, left, width: pointSize, height: pointSize }}
          />
          {i !== cordinates.length - 1 && (
            <div
              className={styles.edge}
              style={{
                width: dist,
                height: pointSize / 6,
                top: (1 - y) * height,
                left: x * width,
                transform: `translate(0, 0) rotate(${rad}rad) ${dx < 0 ? "scale(-1, -1)" : ""}`,
              }}
            />
          )}
        </React.Fragment>);
    })}

  </div>;
}
