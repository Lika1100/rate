import React from 'react'
import { useSelector } from 'react-redux';
import { monthByEvents } from '../../domain/events/weeksByEvents';
import styles from './Calendar.module.css'
import { Month } from '../../components/Month/Month';
import { formatDDMMYY } from '../../domain/dates/formatDate'; 

export function groupEventsByDay(events) {
    const obj = {}
    events.forEach(event => {
        const key = formatDDMMYY(event.start);
        obj[key] ??= []
        obj[key].push(event)
    });
    return obj;
}

export function CalendarPage() {
    const events = useSelector((state) => state.events);
    const monthsFull = monthByEvents(events)
    const eventsByMonthsFull = monthsFull.map(currentMonday => {
        const nextMonday = new Date(currentMonday);
        nextMonday.setMonth(nextMonday.getMonth() + 1);
        return {
            start: currentMonday,
            events: events.filter((x) => x.start >= currentMonday && x.start < nextMonday),
        }
    });
    const eventsByMonths = eventsByMonthsFull; //.slice(0, lastNonEmptyIndex + 1);


    const eventsByDays = groupEventsByDay(events);
    const daysHours = Object.values(eventsByDays)
        .map(events => events.reduce((acc, { duration }) => acc + duration, 0) / 60);
    const maxDayHours = Math.max(...daysHours);

    
    const monthsData = eventsByMonths.map(({ start, events }) => {
        const eventsByDay = groupEventsByDay(events)
        const entries = Object.entries(eventsByDay).map(([fullDate, events]) => {
            const hoursForDay = events.reduce((acc, { duration }) => acc + duration, 0) / 60;
            const percentage = Math.floor(hoursForDay / maxDayHours * 5) / 5 * 80 + 20;
            const background = `hsl(25, 100%, ${percentage}%)`;
            const title = hoursForDay + " ч.";
            const value = [background, events, title];
            return [+fullDate.slice(0, 2), value];
        });

        return {
            start,
            events,
            coloredDates: Object.fromEntries(entries),
        }
    })

    return (
        <div style={{width: '1200px', marginLeft: '40px'}}>
        <div className={styles.year}>
            {monthsData.map(({ events, start, coloredDates }) => {
                const currMonth = start.getMonth()
                const currYear = start.getFullYear()
                return <Month year={currYear} month={currMonth} coloredDates={coloredDates}/>
            })}
            </div>
        </div>
    )
}

// 1 1,5 другое
// добавить переключатель по времени 
// редакс для таблицы
