import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PageHeader } from "../../components/PageHeader/PageHeader"
import styles from "./StudentPage.module.css";
import { priceStageByEvents } from '../../domain/price/price';
import { colorByPriceStage } from '../../domain/price/priceColors';
import { Month } from '../../components/Month/Month';
import { formatDDMMYY } from '../../domain/dates/formatDate';
import { groupEventsByDay } from '../CalendarPage/CalendarPage';
import { padMonths } from '../../domain/dates/padMonths';
import { viewKeyStudentPageSlice } from '../../redux/studentPage';
import { colorsByDuration } from '../../domain/duration/durationColors';
import { PricesMenu } from '../../components/PricesMenu/PricesMenu';
import { DurationMenu } from '../../components/DurationMenu/DurationMenu';
import { StudentName } from '../../components/StudentName/StudentName';
import { formatPrice } from '../../domain/formatters/formatPrice';
import { adjustEventsIncomeForInflation } from '../../domain/inflation/adjustForInflation';


function monthsFromDateRange(start, end) {
  const firstYear = start.getFullYear()
  const firstMonth = start.getMonth()
  const lastYear = end.getFullYear()
  const lastMonth = end.getMonth()

  const months = []

  let month = firstMonth;
  let year = firstYear;

  while (month !== lastMonth || year !== lastYear) {
    months.push({ month, year });
    month++;
    if (month === 12) {
      month = 0;
      year++;
    }
  }
  months.push({ month, year });

  return months;
}

const eventUiDataExtractors = {
  price: {
    background(events) {
      const stage = priceStageByEvents(events);
      return colorByPriceStage[stage];

    }
  },
  hours: {
    background(events) {
      const { duration } = events[0];
      const actualDuration = duration in colorsByDuration ? duration : "DEFAULT"
      return colorsByDuration[actualDuration]
    }
  }
}

const years = [2019, 2020, 2021, 2022, 2023, 2024]


export function StudentPage() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const studentEvents = events.filter((event) => event.name === name);
  const viewKey = useSelector((state) => state.setViewKey.type)
  const firstLessonYear = studentEvents[0].start.getFullYear()
  const [currencyYear, setCurrencyYear] = useState(firstLessonYear)

  const firstEvent = studentEvents[0].start;
  const lastEvent = studentEvents.at(-1).start;
  const months = monthsFromDateRange(firstEvent, lastEvent);
  const extendedMonths = padMonths(months)
  const totalIncome = studentEvents.reduce((acc, { price }) => price + acc, 0).toFixed(0)

  const totalIncomeInflationAdjusted = adjustEventsIncomeForInflation(studentEvents, 0, currencyYear)
  
  const monthsData = extendedMonths.map(({ year, month }) => {
    const eventsByMonth = studentEvents.filter(({ start }) => start.getMonth() === month && start.getFullYear() === year)
    const eventsByDay = groupEventsByDay(eventsByMonth);
    const entries = Object.entries(eventsByDay).map(([fullDate, events]) => {
      const background = eventUiDataExtractors[viewKey].background(events)
      const value = [background, events]
      return [+fullDate.slice(0, 2), value]
    })

    return {
      year,
      month,
      coloredDates: Object.fromEntries(entries)
    }
  })

  return (
    <div>
      <PageHeader>
        <h1 className={styles.header}>
          <StudentName name={name} />
        </h1>
      </PageHeader>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {studentEvents.length > 1
            ? <>{studentEvents.length} занятия, {formatDDMMYY(firstEvent)} — {formatDDMMYY(lastEvent)}</>
            : <>1 занятие {formatDDMMYY(firstEvent)}</>
          }
          <div>
            <label>
              <select
                onChange={(e) => setCurrencyYear(+e.target.value)}
                value={currencyYear}
              >
                {years.map((year) => <option value={year}>{year}</option>)}
              </select>
            </label>
          </div>
          <div>Номинальная сумма: {totalIncome} ₽</div>
          <div>Сумма в рублях 1 января {currencyYear} года: {totalIncomeInflationAdjusted.toFixed(0)} ₽</div>
        </div>
        <div className={styles.yearContainer}>
          <div className={styles.buttonWrap}>
            {viewKey === 'price' && <PricesMenu />}
            {viewKey === 'hours' && <DurationMenu />}
            <button
              onClick={() => dispatch(viewKeyStudentPageSlice.actions.setViewKey())}
              className={styles.viewButton}
            >
              {viewKey}
            </button>
          </div>
          {monthsData.map(({ year, month, coloredDates }) =>
            <Month
              year={year}
              coloredDates={coloredDates}
              month={month}
            />
          )}
        </div>
      </div>
    </div>
  )
}
