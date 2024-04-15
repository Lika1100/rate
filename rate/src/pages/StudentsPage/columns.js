import { formatDDMMYY } from "../../domain/dates/formatDate";
import { accumulateEvents } from "../../domain/events/accumulateEvents";
import { PriceSquare } from "../EventsPage/PriceSquare";
import { StudentName } from '../../components/StudentName/StudentName';
import styles from './StudentsPage.module.css';

export const columns = [
  {
    title: "Ученик",
    width: 180,
    render({ name, events }) {
      return (
        <span style={{ display: "flex", lineHeight: 1 }}>
          <PriceSquare events={[events.at(-1)]} className={styles.square} />
          <StudentName name={name} />
        </span>
      )
    },
  },
  {
    title: "Занятия",
    width: 80,
    render({ events }) {
      return events.length
    },
    keyExtractor: a => -a.events.length,
  },
  {
    title: "Первое",
    width: 120,
    render({ events }) {
      return formatDDMMYY(events[0].start)
    },
    keyExtractor: a => a.events[0].start,
  },
  {
    title: "Последнее",
    width: 120,
    render({ events }) {
      return formatDDMMYY(events.at(-1).start)
    },
    keyExtractor: a => a.events.at(-1).start,
  },
  {
    title: "Часы",
    width: 60,
    render({ events }) {
      const totalDuration = accumulateEvents(events, "duration");
      return totalDuration.toFixed(0);
    },
    keyExtractor: a => -accumulateEvents(a.events, "duration"),
  },
  {
    title: "Доход",
    width: 80,
    render({ events }) {
      return accumulateEvents(events, "income")
    },
    keyExtractor: a => -accumulateEvents(a.events, "income"),
  },
];
