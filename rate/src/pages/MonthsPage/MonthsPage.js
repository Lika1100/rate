import React, { useLayoutEffect } from "react";
import styles from "../WeeksPage/WeeksPage.module.css";
import { monthByEvents } from "../../domain/events/weeksByEvents";
import { Graph } from "../../components/BarGraph/Graph";
import { ScatterGraph } from "../../components/ScatterGraph/ScatterGraph";
import {PageHeader} from "../../components/PageHeader/PageHeader"
import {formatMMYYYY} from "../../domain/dates/formatDate";
import {DateTable} from "../../components/DateTable/DateTable";
import {DateTableHeader} from "../../components/DateTable/DateTableHeader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export function MonthsPage() {
  const navigate = useNavigate();
  const events = useSelector((state) => state.events);
  const monthsFull = monthByEvents(events)
  const eventsByMonthsFull = monthsFull.map(firstMonthDay => {
    const nextMonthFirstDay = new Date(firstMonthDay);
    nextMonthFirstDay.setMonth(nextMonthFirstDay.getMonth() + 1);
    return {
      firstDay: firstMonthDay,
      events: events.filter((x) => x.start >= firstMonthDay && x.start < nextMonthFirstDay),
    };
  });

  const lastNonEmptyIndex = eventsByMonthsFull.findLastIndex(({ events }) => events.length > 0);
  const eventsByMonths = eventsByMonthsFull.slice(0, lastNonEmptyIndex + 1)

  useLayoutEffect(() => {
    window.scroll(0, 10000);
  }, []);

  function handleRowClick(row) {
    const monthStr = formatMMYYYY(row);
    navigate(`/months/${monthStr}`);
  }

  return (
    <React.Fragment>
      <PageHeader>
        <DateTableHeader headers={["Месяц", "Часы", "Доход", "Рейт"]} />
      </PageHeader>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <DateTable
            data={eventsByMonths}
            formatter={formatMMYYYY}
            isHighlightedRow={date => date.getFullYear() % 2 === 0}
            onRowClick={handleRowClick}
          />
        </div>
        <div className={styles.right}>
          <div style={{
            marginBottom: 32,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}>
            <Graph
              weeks={eventsByMonthsFull.map(x => x.firstDay)}
              eventsByWeeks={eventsByMonthsFull.map(x => x.events)}
              columnWidth={6}
              width={390}
              columnHeight={240}
              columnValueType={"income"}
              distributionType={"none"}
              defaultColor={"#4caf50"}
              className={styles.monthGraphWrapper}
            />
            <Graph
              weeks={eventsByMonthsFull.map(x => x.firstDay)}
              eventsByWeeks={eventsByMonthsFull.map(x => x.events)}
              columnWidth={6}
              columnHeight={240}
              width={390}
              columnValueType={"duration"}
              distributionType={"none"}
              defaultColor={"#03a9f4"}
              className={styles.monthGraphWrapper}
            />
            <Graph
              weeks={eventsByMonthsFull.map(x => x.firstDay)}
              eventsByWeeks={eventsByMonthsFull.map(x => x.events)}
              columnWidth={6}
              columnHeight={240}
              width={390}
              columnValueType={"rate"}
              distributionType={"none"}
              defaultColor={"orange"}
              className={styles.monthGraphWrapper}
            />
            <ScatterGraph
              events={eventsByMonths.map(x => x.events)}
              height={248}
              width={390}
              pointSize={6}
            />
          </div>
        </div>
      </div>
    </React.Fragment >
  );
}
