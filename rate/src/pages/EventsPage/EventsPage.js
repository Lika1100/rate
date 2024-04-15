import { Fragment, useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import cn from "classnames";
import { getFirstMonday, weeksByEvents } from '../../domain/events/weeksByEvents'
import { PricesMenu } from '../../components/PricesMenu/PricesMenu'
import styles from "./EventsPage.module.css";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import {EventsUploader} from '../../components/EventsUploader/EventsUploader';
import { EventsLine } from './EventsLine'
import { groupByStudents } from "../../domain/events/groupByStudents";
import { groupByMonth } from "../../domain/events/groupByMonth";
import { views } from "../../domain/eventsPage/eventsPageView";
import { comparators } from "../../domain/eventsPage/eventsPageSort";
import { viewKeySlice } from "../../redux/eventsPage";
import { FrequencyMenu } from "../../components/FrequencyMenu/FrequencyMenu";
import { DurationMenu } from "../../components/DurationMenu/DurationMenu";



export function EventsPage() {
  const events = useSelector((state) => state.events);
  const viewKey = useSelector((state) => state.viewKey.view) // "price" | "count" | "hours"
  const sortKey = useSelector((state) => state.viewKey.sort) // "first" | "last"
  const dispatch = useDispatch()

  const weeks = useMemo(() => weeksByEvents(events), [events]);
  const students = useMemo(() => groupByStudents(events), [events]);
  const studentNames = useMemo(() => Object.keys(students)
    .filter(name => students[name].length >= 0)
    .sort(comparators[sortKey].comparator(students)), [sortKey, students])
    .slice(-38);
  const months = useMemo(() => groupByMonth(weeks), [weeks]);

  useLayoutEffect(() => {
    const nameWidth = 180;
    const eventWidth = 17;

    const lastEvent = events.reduce((a, b) => a > b ? a : b, new Date(2019, 0, 1));
    const lastWeekIndex = weeks.findIndex(w => w > lastEvent.start);

    const contentWidth = nameWidth + eventWidth * lastWeekIndex;
    const rightOffset = eventWidth * 3;

    const scrollX = contentWidth + rightOffset - window.innerWidth;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scroll(scrollX, 10000);
  }, [events]);

  if (events.length === 0) {
    return (
      <div>
        <h1>Загрузить данные</h1>
        <EventsUploader/>
      </div>
    )
  }

  return (<Fragment>
    <PageHeader>
      <div className={styles.buttons}>
        <button className={cn(styles.menuButton, styles.sortMenu)}
                onClick={() => dispatch(viewKeySlice.actions.rotateSort())}>🔄 {comparators[sortKey].title}</button>
        <button className={cn(styles.menuButton, styles.viewMenu)}
                onClick={() => dispatch(viewKeySlice.actions.rotateView())}>🎨 {views[viewKey].title}</button>
      </div>
      <div style={{marginLeft: 16}}>
        {viewKey === 'hours' && <PricesMenu />}
        {viewKey === 'price' && <PricesMenu />}
        {viewKey === 'count' && <FrequencyMenu />}
        {viewKey === 'duration' && <DurationMenu />}
      </div>
    </PageHeader>
    <div className={styles.wrapper}>
      <div className={styles.lines} id="lines">
        {studentNames.map(name => {
          return <EventsLine
            key={name}
            name={name}
            events={students[name]}
            weeks={weeks}
            viewKey={viewKey}
          />
        })}
        <div className={styles.months}>
          {months.map(month => (<div key={month[0]} className={styles.month} data-length={month.length}>
            {month[0].toLocaleString('RU', {month: 'long'})} {month[0].getFullYear()}
          </div>))}
        </div>
      </div>
    </div>
  </Fragment>);
}

