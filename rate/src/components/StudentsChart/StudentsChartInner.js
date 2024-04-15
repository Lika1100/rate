import styles from './StudentsChart.module.css'
import { useState } from 'react';
import { DoubleRange } from '../DoubleRange/DoubleRange';
import cn from 'classnames'
import { countAvaregeAndMid } from '../../domain/students/countAveregeAndMid.js'
import { viewTypeConfig } from './viewTypeConfig';


export function StudentsChartInner ({dataType, students}) {
    const {
        extractCount,
        minVal,
        formatter,
        color
    } = viewTypeConfig[dataType];

    const studentsData = students
        .map(student => ({ name: student.name, count: extractCount(student.events) }))
        .filter(student => student.count >= minVal )
        .sort((a, b) => a.count - b.count)

    const countsArray = studentsData.map(student => student.count)
    const minCount = countsArray[0];
    const maxCount = countsArray.at(-1);

    const [boundaries, setBoundaries] = useState([minCount, maxCount]) 
    const [min, max] = boundaries

    const clampedСountsArray = countsArray.filter(count => count >= min && count <= max)
    const offset = countsArray.filter(count => count < min).length
    const {
        midIndex: midActiveIndex,
        averageIndex: averageActiveIndex,
        mid,
        average
    } = countAvaregeAndMid(clampedСountsArray)

    const midIndex = midActiveIndex + offset;
    const averageIndex = averageActiveIndex + offset;
    const uniqueCountsArray = Array.from(new Set(countsArray))
    const minIndex = countsArray.indexOf(min)
    const maxIndex = countsArray.indexOf(max)

    return (
        <div>
            <div className={styles.graf}>
                {studentsData.map(({ count, name }, i) => (
                    <div
                        className={cn(
                            styles.bar,
                            i === midIndex && styles.mid,
                            i === averageIndex && styles.average,
                            (count < min || count > max) && styles.unActive,
                            i === minIndex && styles.min,
                            i === maxIndex && styles.max,
                        )}
                        style={{
                            height: `${count / maxCount * 100}%`,
                            background: color
                        }}
                        data-count={formatter(count)}
                        data-name={name}
                    />
                ))}
            </div>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <DoubleRange
                        key={dataType}
                        formatter={formatter}
                        values={uniqueCountsArray}
                        onChange={setBoundaries}
                    />
                </div>
                <div className={styles.headerRight}>
                    <p className={styles.statistics}>Mid: {formatter(mid)}</p>
                    <p className={styles.statistics}>Average: {formatter(average)}</p>
                </div>
            </div>
        </div>
    )
}