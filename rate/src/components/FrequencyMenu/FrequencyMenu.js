import { colorsByFrequency } from "../../domain/frequency/frequencyColors";
import styles from "./FrequencyMenu.module.css";
import countStyles from '../../domain/frequency/frequency.module.css'
import cn from "classnames";


const stages = Object.keys(colorsByFrequency).filter(value => value !== "DEFAULT");
const words = ['занятие', 'занятия']

export function FrequencyMenu() {
    return (
        <div className={styles.frequenciesMenu}>
            {stages.map(stage => {
                return (
                    <div key={stage} className={styles.frequenciesOption}>
                        <span
                            className={cn(styles.square, countStyles.colored)}
                            data-length={stage}
                        />
                        {stage} {declOfNum(stage, words)}
                    </div>
                );
            })}
        </div>
    );
}


function declOfNum(number, words) {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2
           : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}
