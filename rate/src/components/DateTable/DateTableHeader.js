import styles from "./DateTable.module.css";

export function DateTableHeader({headers}) {
  return (
    <div className={styles.tableHeader}>
      {headers.map(header => (
        <span className={styles.col}>{header}</span>
      ))}
    </div>
  )
}
