import styles from './Table.module.css';

export function TableHeader({columns, onKeyExtractorChange}) {
  return (
    <div className={styles.tableHeader}>
      {columns.map(({ title, keyExtractor, width }) => {
        if (keyExtractor !== undefined) {
          return (
            <button
              onClick={() => onKeyExtractorChange(keyExtractor)}
              className={styles.title}
              style={{ width }}
            >
              {title}
            </button>
          )
        }
        return (
          <span
            className={styles.title}
            style={{ width }}
          >
            {title}
          </span>
        )
      })}
    </div>
  );
}
