import styles from './Task.module.css'

interface TaskProps {
  title: string
}

export function Task({ title }: TaskProps) {
  return (
    <div className={styles.task}>
      <input type="checkbox" name="taskName" id="taskName" />
      <label htmlFor="taskName">{title}</label>
    </div>
  )
}
