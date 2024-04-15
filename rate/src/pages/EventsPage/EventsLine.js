import styles from "./EventsPage.module.css";
import {getFirstMonday} from "../../domain/events/weeksByEvents"

import {CountSquare} from "./CountSquare"
import {HoursSquare} from "./HoursSquare"
import {PriceSquare} from "./PriceSquare"
import { DurationSquare } from "./DurationSquare";
import {formatDDMMYY} from "../../domain/dates/formatDate";
import { useNavigate } from "react-router-dom";
import { StudentName } from "../../components/StudentName/StudentName";

const squares = {
  count: CountSquare,
  hours: HoursSquare,
  price: PriceSquare,
  duration: DurationSquare,
}

export function EventsLine({ name, events, weeks, viewKey }) {
  const navigate = useNavigate();

  function handleStudentClick() {
    navigate(`/students/${name}`)
  }

  const nextMonday = getFirstMonday(new Date())
  nextMonday.setDate(nextMonday.getDate() + 7);


  return <div className={styles.eventLine}>
    <div className={styles.name} onDoubleClick={handleStudentClick}>
      <StudentName name={name} />
    </div>
    <div className={styles.weeks}>
      {weeks.map(weekStart => {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);

        const studentEvents = events.filter(event => event.start >= weekStart && event.start < weekEnd);
        const isFutureEvent = studentEvents.length > 0 && studentEvents[0].start >= nextMonday;

        const title = studentEvents.map(e => {
          const date = formatDDMMYY(e.start);
          return date + " " + e.price + "/" + e.duration;
        }).join("\n")

        const SquareComponent = squares[viewKey];
        return (
          <SquareComponent
            events={studentEvents}
            isFutureEvent={isFutureEvent}
            className={styles.week}
            title={title}
            key={weekStart.toString()}
          />
        );
      })}
    </div>
  </div>
}


