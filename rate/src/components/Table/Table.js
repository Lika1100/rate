import styles from './Table.module.css';
import cn from "classnames";

export function Table({
  columns,
  data,
  sorting,
  isHighlightedRow = () => false,
  isStarredRow = () => false,
  onRowClick,

}) {
  let sortedData = data;
  if (sorting !== undefined) {
    const { keyExtractor, desc } = sorting;
    sortedData = data.sort((a, b) => (desc ? 1 : -1) * (keyExtractor(a) - keyExtractor(b)));
  }
  

  return (
    <table className={styles.table}>
      <tbody>
      {sortedData.map((row) => {
        const isHighlighted = isHighlightedRow(row);
        const starred = isStarredRow(row);
        return (
          <tr className={cn(styles.row, starred && styles.starred, isHighlighted && styles.highlighted)}
          onDoubleClick={onRowClick ? () => onRowClick(row) : undefined}
          >
            {columns.map(({ render, width }) => (
              <td
                className={styles.cell}
                style={{ width }}
              >
                {render(row)}
              </td>
            ))}
          </tr>
        );
      })}
      </tbody>
    </table>
  )
}
