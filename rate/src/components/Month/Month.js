import React from 'react';
import styles from './Month.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDDMMYY } from '../../domain/dates/formatDate';
import { getFirstMonday } from '../../domain/events/weeksByEvents';


const arrMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


export function Month({ year, month, coloredDates }) {
  const offset = firstMonthDayOffset(year, month);
  const monthDays = new Date(year, month + 1, 0).getDate()
  const navigate = useNavigate();
  
  function handleDayClick(monday) {
    const mondayStr = formatDDMMYY(monday);
    navigate(`/weeks/${mondayStr}`)
  }

  
  

  return (
    <div className={styles.month}>
      <h2 className={styles.monthName}>
        {arrMonthName[month]} {year % 100}
      </h2>

      <div className={styles.container} style={{ "--offset": offset }}>
        {Array(monthDays).fill().map((_, i) => {
          const day = i + 1;
          const date = getFirstMonday(new Date(year, month, day))

          const [background, events, title] = coloredDates[day] ?? ["#444", []];
          return (
            <div
              className={styles.square}
              style={{background}}
              title={title} 
              onDoubleClick={() => handleDayClick(date)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  )
}


function firstMonthDayOffset(year, month) {
  let firstDayOfMonth = new Date(year, month, 1).getDay();

  if (firstDayOfMonth === 0) {
    firstDayOfMonth = 7;
  }
  return firstDayOfMonth - 1;
}
