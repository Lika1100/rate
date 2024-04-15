import cn from "classnames";
import countStyles from "../../domain/frequency/frequency.module.css";

export function CountSquare({ events, isFutureEvent, className, title }) {
  const opacity = isFutureEvent ? 0.4 : 1;
  
  return (
    <span
      className={cn(className, countStyles.colored)}
      style={{ opacity }}
      data-length={Math.min(events.length, 3)}
      title={title}
    />
  );
}
