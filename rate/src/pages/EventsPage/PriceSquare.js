import cn from "classnames";

import { priceStageByEvents } from "../../domain/price/price"
import priceStyles from "../../domain/price/price.module.css";

export function PriceSquare({ events, isFutureEvent, className, title }) {
  const stage = priceStageByEvents(events)
  const opacity = isFutureEvent ? 0.4 : 1;

  return (
    <span
      className={cn(className, priceStyles.colored)}
      style={{ opacity }}
      data-stage={stage}
      title={title}
    />
  );
}
