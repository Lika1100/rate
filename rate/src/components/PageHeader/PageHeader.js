import styles from './PageHeader.module.css';

export function PageHeader({ children }) {
  return (
    <div className={styles.header}>
      {children}
    </div>
  )
}