import React, { useLayoutEffect } from "react";
import { Graph } from "../../components/BarGraph/Graph";
import styles from "./WeeksPage.module.css";
import { PricesMenu } from "../../components/PricesMenu/PricesMenu";
import { weeksByEvents } from "../../domain/events/weeksByEvents";
import { ScatterGraph } from "../../components/ScatterGraph/ScatterGraph";
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { formatDDMMYY } from "../../domain/dates/formatDate";
import { DateTable } from "../../components/DateTable/DateTable";
import { DateTableHeader } from "../../components/DateTable/DateTableHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { distributionTypeSlice } from "../../redux/weeksPage";
import { DurationMenu } from "../../components/DurationMenu/DurationMenu";



export function WeeksPage() {
  const events = useSelector((state) => state.events);
  const navigate = useNavigate();
  const distributionType = useSelector((state) => state.distributionType.type) // "none" | "hours" | "frequency" | "price"
  const dispatch = useDispatch()

  const weeksFull = weeksByEvents(events)
  const eventsByWeeksFull = weeksFull.map(currentMonday => {
    const nextMonday = new Date(currentMonday);
    nextMonday.setDate(nextMonday.getDate() + 7);
    return events.filter((x) => x.start >= currentMonday && x.start < nextMonday);
  });

  const lastNonEmptyIndex = eventsByWeeksFull.findLastIndex(x => x.length > 0);
  const weeks = weeksFull.slice(0, lastNonEmptyIndex + 1);
  const eventsByWeeks = eventsByWeeksFull.slice(0, lastNonEmptyIndex + 1);

  const tableData = weeks.map((week, i) => {
    return {
      firstDay: week,
      events: eventsByWeeks[i],
    }
  })

  useLayoutEffect(() => {
    window.scroll(0, 10000);
  }, []);

  function handleRowClick(row) {
    const mondayStr = formatDDMMYY(row);
    navigate(`/weeks/${mondayStr}`);
  }


  return (
    <React.Fragment>
      <PageHeader>
        <DateTableHeader headers={["Неделя", "Часы", "Доход", "Рейт"]} />
      </PageHeader>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <DateTable
            data={tableData}
            formatter={formatDDMMYY}
            isHighlightedRow={date => date.getMonth() % 2}
            onRowClick={handleRowClick}
          />
        </div>
        <div className={styles.right}>
          <Graph
            width={800}
            weeks={weeksFull}
            eventsByWeeks={eventsByWeeksFull}
            columnWidth={3}
            columnHeight={160}
            columnValueType={"income"}
            distributionType={distributionType}
            defaultColor={"#4caf50"}
          />
          <div className={styles.menu}>
            {distributionType === 'price' && <PricesMenu />}
            {distributionType === 'none' && <PricesMenu />}
            {distributionType === 'hours' && <DurationMenu />}
            <button
              className={styles.switchButton}
              onClick={() => dispatch(distributionTypeSlice.actions.setDistributionType())}
            >
              {distributionType}
            </button>
          </div>
          <Graph
            width={800}
            weeks={weeksFull}
            eventsByWeeks={eventsByWeeksFull}
            columnWidth={3}
            columnHeight={160}
            columnValueType={"duration"}
            distributionType={"none"}
            defaultColor={"#03a9f4"}
          />
          <div className={styles.block}>
            <Graph
              width={weeksFull.length * 1.5}
              weeks={weeksFull}
              eventsByWeeks={eventsByWeeksFull}
              columnWidth={1.5}
              columnHeight={200}
              columnValueType={"rate"}
              distributionType={"price"}
              defaultColor={"orange"}
            />
            <ScatterGraph
              events={eventsByWeeks}
              height={208}
              width={390}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

