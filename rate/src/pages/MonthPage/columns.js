import { PriceSquare } from "../EventsPage/PriceSquare";
import styles from './MonthPage.module.css';

export const columns = [
  {
    title: "Ученик",
    width: 120,
    render({ name, events }) {
      return (
        <span style={{ display: "flex", lineHeight: 1 }}>
          <PriceSquare events={[events.at(-1)]} className={styles.square} />
          {name.split("|")[0]}
        </span>
      )
    },
  },
  {
    title: "Занятия",
    width: 80,
    render({ count }) {
      return count
    },
    keyExtractor: a => -a.count,
  },
  {
    title: "Часы",
    width: 60,
    render({ hours }) {
      return hours.toFixed(0);
    },
    keyExtractor: a => -a.hours,
  },
  {
    title: "Доход",
    width: 80,
    render({ income }) {
      return income
    },
    keyExtractor: a => -a.income,
  },
  {
    title: "Недели",
    width: 80,
    render({ courseDuration }) {
      return courseDuration
    },
    keyExtractor: a => -a.courseDuration,
  },
  {
    title: "",
    width: 30,
    render({ isNew }) {
      return isNew ? "✓" : null
    },
    keyExtractor: a => a.isNew ? 1 : 0,
  },
];
