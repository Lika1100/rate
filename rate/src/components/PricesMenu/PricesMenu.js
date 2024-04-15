import cn from "classnames";

import { stages, priceByStage } from "../../domain/price/price"
import priceStyles from "../../domain/price/price.module.css";
import styles from "./PricesMenu.module.css";


export function PricesMenu() {
  return (
    <div className={styles.pricesMenu}>
      {stages.map(stage => {
        return (
          <div key={stage} className={styles.pricesOption}>
            <span
              className={cn(styles.square, priceStyles.colored)}
              data-stage={stage}
            />
            <ul className={styles.pricesList}>
              {priceByStage(stage)
                .filter(([duration, prices]) => prices.length > 0)
                .map(([duration, prices]) => (
                  <li key={duration}>{duration}: {prices[0]}</li>
                ))
              }
            </ul>
          </div>
        );
      })}
    </div>
  );
}
