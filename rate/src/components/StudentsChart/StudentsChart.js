import styles from './StudentsChart.module.css'
import { useState} from 'react';
import { viewTypeConfig } from './viewTypeConfig.js';
import { StudentsChartInner } from './StudentsChartInner';

export function StudentsChart({ students }) {
    const [dataType, setDataType] = useState('count'); // count | hours | income

    return (
        <div>
            <StudentsChartInner
                students={students}
                dataType={dataType}
                key={dataType}
            />
            <div className={styles.radioButtons}>
                {Object.keys(viewTypeConfig).map(value => (
                    <label
                        className={styles.dataTypeLabel}
                        style={{ background: viewTypeConfig[value].color }}
                    >
                        <input
                            className={styles.dataTypeInput}
                            checked={value === dataType}
                            type="radio"
                            name="dataType"
                            value={value}
                            onChange={() => setDataType(value)}
                        />
                        {viewTypeConfig[value].label}
                    </label>
                ))}
            </div>
        </div>
    )
}
