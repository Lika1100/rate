import { useRoutes } from "react-router-dom";
import { DropZone } from "../DropZone/DropZone";
import { Navigation } from "../Navigation/Navigation";
import { EventsPage } from "../../pages/EventsPage/EventsPage";
import { WeeksPage } from "../../pages/WeeksPage/WeeksPage";
import { MonthsPage } from "../../pages/MonthsPage/MonthsPage";
import { WeekPage } from "../../pages/WeekPage/WeekPage";
import styles from "./Layout.module.css";
import { StudentsPage } from "../../pages/StudentsPage/StudentsPage";
import { StudentPage } from "../../pages/StudentPage/StudentPage";
import { CalendarPage } from "../../pages/CalendarPage/CalendarPage";
import { MonthPage } from "../../pages/MonthPage/MonthPage";
import { ExperimentsPage } from "../../pages/ExperimentsPage/ExperimentsPage";

export const routes = [
  {
    path: "/",
    element: <EventsPage />,
  },
  {
    path: "weeks",
    element: <WeeksPage />,
  },
  {
    path: "weeks/:date",
    element: <WeekPage />,
  },
  {
    path: "months",
    element: <MonthsPage />
  },
  {
    path: "students",
    element: <StudentsPage />,
  },
  {
    path: "students/:name",
    element: <StudentPage />
  },
  {
    path: "calendar",
    element: <CalendarPage />
  },
  {
    path: "months/:date",
    element: <MonthPage />
  },
  {
    path: "experiments",
    element: <ExperimentsPage />
  },
];

export function Layout() {
  const layout = useRoutes(routes);

  return (
    <div className={styles.main}>
      <DropZone />
      <div className={styles.header}>
        <Navigation />
      </div>
      {layout}
    </div>
  );
}
