import React from 'react'
import styles from "./DurationMenu.module.css";
import cn from "classnames";
import durationStyles from '../../domain/duration/duration.module.css';
import { durationToLabel } from '../../domain/duration/durationColors';

const durations = Object.keys(durationToLabel);

export function DurationMenu() {
    return (
        <div className={styles.durationsMenu}>
            {durations.map(duration => {
                return (
                    <div key={duration} className={styles.durationsOption}>
                        <span
                            className={cn(styles.square, durationStyles.colored)}
                            data-duration={duration}
                        />
                        {durationToLabel[duration]}
                    </div>
                );
            })}
        </div>
    );
}
