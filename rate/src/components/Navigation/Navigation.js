import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export function Navigation() {
  return (
    <ul className={styles.navigation}>
      <li className={styles.section}>
        <NavLink className={({isActive}) => isActive ? styles.activeLink : undefined} to="/" end>Занятия</NavLink>
      </li>
      <li className={styles.section}>
        <NavLink className={({isActive}) => isActive ? styles.activeLink : undefined} to="/weeks" end>Недели</NavLink>
      </li>
      <li className={styles.section}>
        <NavLink className={({isActive}) => isActive ? styles.activeLink : undefined} to="/months" end>Месяцы</NavLink>
      </li>
      <li className={styles.section}>
        <NavLink className={({isActive}) => isActive ? styles.activeLink : undefined} to="/students" end>Ученики</NavLink>
      </li>
    </ul>
  )
}
