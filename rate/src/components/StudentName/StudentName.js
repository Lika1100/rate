import styles from "./StudentName.module.css";

export function StudentName({ name }) {
  const [firstName, nickname] = name.split("|")

  return (
    <>
      {firstName} {nickname && <span className={styles.nickname}>{nickname}</span>}
    </>
  )
}