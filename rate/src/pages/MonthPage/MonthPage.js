import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { groupByStudents } from "../../domain/events/groupByStudents";
import { accumulateEvents } from '../../domain/events/accumulateEvents'
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { TableHeader } from "../../components/Table/TableHeader";
import { Table } from "../../components/Table/Table";
import styles from "./MonthPage.module.css"
import { columns } from "./columns"

const MILLISECONDS_IN_WEEK = 1000 * 60 * 60 * 24 * 7

export function MonthPage() {
    const navigate = useNavigate();
    const events = useSelector((state) => state.events)

    const [sorting, setSorting] = useState({
        keyExtractor: columns[2].keyExtractor,
        desc: true,
    });

    const { date: dateStr } = useParams();
    const [dateMonth, dateYear] = dateStr.split('.').map(Number);

    const firstCurrentMonthDate = new Date(dateYear, dateMonth - 1, 1)
    const firstNextMonthDate = new Date(dateYear, dateMonth, 1)

    const filteredEvents = events.filter(event => event.start > firstCurrentMonthDate && event.start < firstNextMonthDate)

    const currentMonthStudents = groupByStudents(filteredEvents)
    const students = groupByStudents(events)

    const tableData = Object.entries(currentMonthStudents).map(([name, monthEvents]) => {
        const studentEvents = students[name]
        const isNew = studentEvents[0].start === monthEvents[0].start;
        const courseDuration = Math.floor((monthEvents.at(-1).start - studentEvents[0].start) / MILLISECONDS_IN_WEEK)

        return {
            name,
            count: monthEvents.length,
            hours: accumulateEvents(monthEvents, 'duration'),
            income: accumulateEvents(monthEvents, 'income'),
            isNew,
            courseDuration,
            events: studentEvents,
        }
    })

    function handleKeyExtractorChange(keyExtractor) {
        setSorting(prev => ({
            keyExtractor,
            desc: prev.keyExtractor === keyExtractor ? !prev.desc : true,
        }))
    }

    function handleRowClick(row) {
        const name = row.name
        navigate(`/students/${name}`)
    }

    return (
        <React.Fragment>
            <PageHeader>
                <TableHeader
                    columns={columns}
                    onKeyExtractorChange={handleKeyExtractorChange}
                />
            </PageHeader>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <Table
                        columns={columns}
                        data={tableData}
                        sorting={sorting}
                        onRowClick={handleRowClick}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
