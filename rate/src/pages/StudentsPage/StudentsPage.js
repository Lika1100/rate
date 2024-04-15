import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { groupStudents } from "../../domain/events/groupStudents";
import { TableHeader } from "../../components/Table/TableHeader";
import { Table } from "../../components/Table/Table";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { StudentsChart } from "../../components/StudentsChart/StudentsChart";
import { setSorting } from "../../redux/studentsPage"
import { columns } from "./columns";
import styles from './StudentsPage.module.css';
import { getNewStudents } from "../../domain/countMoreThenHalfOfYear/newStudents";
import { changePrice } from "../../domain/countChangePrice/changePrice";

export function StudentsPage() {
  
  const events = useSelector(state => state.events);
  const minLessonsNum = useSelector(state => state.studentsPage.counter);
  const sorting = useSelector(state => state.studentsPage.sorting)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scroll(0, 10000);
  }, [events]);

  const eventsGroupeByStudents = groupStudents(events)
  //console.table(getNewStudents(eventsGroupeByStudents))
  console.table(changePrice(eventsGroupeByStudents))


  const students = groupStudents(events)
    .filter(({ events }) => events.length >= minLessonsNum);

  function handleRowClick(row) {
      const name = row.name
      navigate(`/students/${name}`)
  }

  function handleKeyExtractorChange (keyExtractor) {
    dispatch(setSorting(keyExtractor))
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
            data={students}
            sorting={sorting}
            isStarredRow={row => row.events.some(e => Date.now() - e.start < 7 * 24 * 60 * 60 * 1000)}
            onRowClick={handleRowClick}
          />
        </div>
        <div className={styles.right}>
          <div style={{width: 500 }}>
            <StudentsChart students={students} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
