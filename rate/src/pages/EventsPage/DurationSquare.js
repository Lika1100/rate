import cn from "classnames";
import countStyles from "../../domain/duration/duration.module.css";
import { durationByEvents } from "../../domain/duration/durationColors";

export function DurationSquare({ events, isFutureEvent, className, title }) {
  const opacity = isFutureEvent ? 0.4 : 1;
  const duration = durationByEvents(events)

  return (
    <span
      className={cn(className, countStyles.colored)}
      data-duration={duration}
      style={{ opacity }}
      title={title}
    />
  );
}