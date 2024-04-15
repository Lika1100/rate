import { Link, useParams } from 'react-router-dom';
import styles from "./WeekPage.module.css";
import { priceStageByEvents } from "../../domain/price/price.js"
import colorsStyle from '../../domain/price/price.module.css';
import cn from 'classnames'
import React, { useEffect, useState } from 'react';
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { getFirstMonday } from '../../domain/events/weeksByEvents';
import { formatDDMMYY } from "../../domain/dates/formatDate";
import { convertToDate } from "../../domain/dates/convertToDate";
import { getWeekDays } from "../../domain/dates/getWeekDays";
import { isSameDay } from "../../domain/dates/isSameDay";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { StudentName } from '../../components/StudentName/StudentName';
import { formatPrice } from '../../domain/formatters/formatPrice';

const START_HOUR = 8;
const FINISH_HOUR = 24;
const DAY_LENGTH = FINISH_HOUR - START_HOUR;

const WeekIncome = ({events}) => {
  const income = events.reduce((acc, { price }) => acc + price, 0)
  const hours = events.reduce((acc, { duration }) => acc + duration, 0) / 60
  return (
    <div>
      {formatPrice(income.toString())} ₽ / {hours} ч.
    </div>
  )
}

export function WeekPage() {
  const events = useSelector((state) => state.events);
  const navigate = useNavigate();
  const { date: dateStr } = useParams();
  const date = convertToDate(dateStr);
  const [chosenEvents, setChosenEvents] = useState([])

  function toggleEvent(oneEvent) {
    setChosenEvents((prev) => {
      if (!prev.includes(oneEvent)) {
        return [...prev, oneEvent]
      }
      return prev.filter((x) => x !== oneEvent)
    });
  }

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        setChosenEvents([])
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  useEffect(() => {
    const handler = (event) => {
      if (event.metaKey) {
        return;
      }
      if (event.key === 'ArrowRight') {
        navigate(nextWeekUrl);
      }
      if (event.key === 'ArrowLeft') {
        navigate(prevWeekUrl);
      }
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    }
  }, [dateStr]);

  function handleStudentClick(name) {
    navigate(`/students/${name}`)
  }

  if (date === null) {
    return (
      <PageHeader>
        <div className={styles.nav}>
          <h1
            className={cn(
              styles.weekTitle,
              styles.error,
            )}
          >
            Error 404
          </h1>
        </div>
      </PageHeader>
    )
  }

  const weekDays = getWeekDays(date);

  const hoursCount = [];
  for (let i = START_HOUR + 1; i <= FINISH_HOUR - 1; i++) {
    hoursCount.push([i.toString().padStart(2, "0"), (i - START_HOUR) / DAY_LENGTH * 100 + "%"])
  }

  const nextMonday = new Date(date);
  nextMonday.setDate(nextMonday.getDate() + 7);
  const formatedNextMonday = formatDDMMYY(nextMonday)
  const nextWeekUrl = `/weeks/${formatedNextMonday}`

  const prevMonday = new Date(date)
  prevMonday.setDate(prevMonday.getDate() - 7);
  const formatedprevMonday = formatDDMMYY(prevMonday)
  const prevWeekUrl = `/weeks/${formatedprevMonday}`

  const today = new Date();
  const thisWeekMonday = getFirstMonday(today);
  thisWeekMonday.setHours(thisWeekMonday.getHours() + 3);

  const eventsByWeek = events.filter(({ start }) => start >= date && start < nextMonday)
  const currentWeekFormatted = formatDDMMYY(thisWeekMonday)
  const isCurrentWeek = +thisWeekMonday === +date
  const isFutureWeek = +thisWeekMonday < +date;

  return (
    <React.Fragment>
      <PageHeader>
        <div className={styles.nav}>
          <div className={styles.weekNavigation}>
            <Link className={styles.weekUrl} to={prevWeekUrl}>←</Link>
            <h1
              className={cn(
                styles.weekTitle,
                isCurrentWeek && styles.currentWeekTitle,
                isFutureWeek && styles.futureWeekTitle,
              )}
            >
              {formatDDMMYY(date)}
            </h1>
            <Link className={styles.weekUrl} to={nextWeekUrl}>→</Link>
          </div>
          <div className={styles.weekInfo}>
            <WeekIncome events={chosenEvents.length > 0 ? chosenEvents : eventsByWeek}/>
            {chosenEvents.length > 0 && (
              <button
                className={styles.resetButton}
                onClick={() => setChosenEvents([])}
              >
                ×
              </button>
            )}
          </div>
          <div className={styles.currentWeekButtonWrapper}>
            {!isCurrentWeek && (
              <button
                className={styles.curWeek}
                onClick={() => navigate(`/weeks/${currentWeekFormatted}`)}
              >
                Текущая неделя
              </button>
            )}
          </div>
        </div>
      </PageHeader>
      <div className={styles.wrapper}>
        <div className={styles.hoursColumn}>
          {hoursCount.map(([hour, top]) => {
            return (<div
              className={styles.hour}
              style={{ top }}
              data-hour={hour} />)
          })}
        </div>
        {weekDays.map(day => {
          const dayEvents = events
            .filter((event) => isSameDay(event.start, day))
            .map(event => {
              const { start, duration, name, price } = event
              const startTime = start.getHours() + start.getMinutes() / 60;
              const top = (startTime - START_HOUR) / DAY_LENGTH * 100 + "%"
              return {
                event,
                top,
                start,
                height: duration / 60 / DAY_LENGTH * 100 + "%",
                name,
                price,
                stage: priceStageByEvents([event]),
              }
            })

          return <div className={styles.dayColumn}>
            <div className={cn(styles.dayHeader, isSameDay(day, today) && styles.dayHeaderToday)}>
              {`${day.getDate().toString().padStart(2, "0")}.${(day.getMonth() + 1).toString().padStart(2, "0")}`}
            </div>
            {dayEvents.map(({ start, height, top, name, price, stage, event}) => {
              return (
                <div
                  className={cn(styles.event, chosenEvents.includes(event) && styles.chosenEvent)}
                  onClick={() => toggleEvent(event)}
                  onDoubleClick={() => handleStudentClick(name)}
                  style={{
                    top,
                    height: `calc(${height} - 2px)`,
                  }
                  }>
                  <div className={styles.time}>
                    {`${start.getHours().toString().padStart(2, "0")}:${start.getMinutes().toString().padStart(2, "0")}`}
                  </div>
                  <div className={styles.name}>
                    <StudentName name={name} />
                  </div>
                  <div
                    className={cn(styles.price, colorsStyle.colored)}
                    data-stage={stage}
                  >
                    {price}
                  </div>
                </div>
              )
            })}
          </div>
        })}
      </div>
    </React.Fragment>
  );
}
