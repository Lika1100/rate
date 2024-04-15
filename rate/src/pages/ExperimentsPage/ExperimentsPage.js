import { useSelector } from "react-redux";
import { GraphInner } from "../../components/BarGraph/GraphInner";
import { weeksByEvents } from "../../domain/events/weeksByEvents";
import { useState } from "react";
import { groupStudents } from "../../domain/events/groupStudents";
import { accumulateEvents } from "../../domain/events/accumulateEvents";
import { formatDDMMYY } from "../../domain/dates/formatDate";
import styles from "./ExperimentsPage.module.css";
import { getNextValue } from "../../domain/utils/getNextValue";
import { groupByStudents } from '../../domain/events/groupByStudents';


export function ExperimentsPage() {
  const columnValueTypes = ["students", "income", "duration"]
  const events = useSelector((state) => state.events);
  const [index, setIndex] = useState(0)
  const [columnValueType, setColumnValueType] = useState(columnValueTypes[0])

  function handleClick() {
    setColumnValueType(prev => {
      return getNextValue(columnValueTypes, prev)
    })
  }
  
  const weeksFull = weeksByEvents(events)
  const eventsByWeeksFull = weeksFull.map(currentMonday => {
    const nextMonday = new Date(currentMonday);
    nextMonday.setDate(nextMonday.getDate() + 7);
    return events.filter((x) => x.start >= currentMonday && x.start < nextMonday);
  });
  
  const lastNonEmptyIndex = eventsByWeeksFull.findLastIndex(x => x.length > 0);
  const eventsByWeeks = eventsByWeeksFull.slice(0, lastNonEmptyIndex + 1);
  
  const eventsByStudents = groupByStudents(events)
  
  const calculateMedianByEvents = weekEvents => {
    if (weekEvents.length === 0) {
      return 0;
    }
    const currentWeekNames = Object.keys(groupByStudents(weekEvents))
    const eventsByStudentsSoFar = currentWeekNames
      .filter(name => eventsByStudents[name].length >= 0)
      .map(name => eventsByStudents[name].filter(({ start }) => start <= weekEvents.at(-1).start))
  
    const eventsSoFar = eventsByStudentsSoFar.map(event => event.length).sort((a, b) => a - b)
    return eventsSoFar.reduce((a, b) => a + b, 0) / eventsSoFar.length;
  };


  const students = groupStudents(events)
  const currentDate = eventsByWeeks[index][0].start

  // туду: считать новым, если на момент возвращения человека не было больше полугода
  // тесты
  const student2isNew = Object.fromEntries(students.map(({ name, events }) => {
    const firstLesson = events[0].start
    return [name, firstLesson > currentDate]
  }));

  function generateGradient(events) {
    const oldStudentsEvents = events.filter(({ name }) => !student2isNew[name])
    const newStudentsEvents = events.filter(({ name }) => student2isNew[name])
    const oldStudentsAmount = accumulateEvents(oldStudentsEvents, columnValueType)
    const newStudentsAmount = accumulateEvents(newStudentsEvents, columnValueType)
    const oldStudentsPercentage = oldStudentsAmount / (oldStudentsAmount + newStudentsAmount) * 100;

    return `linear-gradient(to top, skyblue ${oldStudentsPercentage}%, yellowgreen ${oldStudentsPercentage}%)`;
  }

  const newStudents = students
    .filter(({ name }) => student2isNew[name])
    .map(({ name, events }) => ({ name, amount: accumulateEvents(events, columnValueType) }))
    .sort((a, b) => b.amount - a.amount);
  const total = newStudents.reduce((acc, s) => acc + s.amount, 0);

  return (
    <div className={styles.wrapper}>
      <GraphInner
        width={eventsByWeeksFull.length * 4}
        weeks={weeksFull}
        eventsByWeeks={eventsByWeeksFull}
        columnWidth={4}
        columnHeight={160}
        columnValueType={columnValueType}
        computeBackground={() => "orange"}
        calculateColumnValue={calculateMedianByEvents}
      />
      <GraphInner
        onColumnClick={setIndex}
        width={eventsByWeeksFull.length * 4}
        weeks={weeksFull}
        eventsByWeeks={eventsByWeeksFull}
        columnWidth={4}
        columnHeight={160}
        columnValueType={columnValueType}
        computeBackground={generateGradient}
      />
      <div className={styles.buttonWrap}>
        <button onClick={handleClick} className={styles.switchButton}>
          {columnValueType}
        </button>
      </div>
      <div>
        <p>Date: {formatDDMMYY(currentDate)} Total: {total}</p>
        <div>Students: {
          newStudents.map(({ name, amount }) => (
            <div>
              <strong>{name}:</strong> {amount}
            </div>
          ))
        }</div>
      </div>
    </div>
  )
}
