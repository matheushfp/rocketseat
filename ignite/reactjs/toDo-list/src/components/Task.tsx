import { Trash } from '@phosphor-icons/react'
import styles from './Task.module.css'

interface TaskProps {
  id: string
  title: string
  onDeleteTask: (taskId: string) => void
  handleTaskIsCompleted: (taskId: string) => void
}

export function Task({
  title,
  id,
  onDeleteTask,
  handleTaskIsCompleted,
}: TaskProps) {
  return (
    <div className={styles.task}>
      <label htmlFor={id}>
        <input
          type="checkbox"
          name={id}
          id={id}
          onChange={() => handleTaskIsCompleted(id)}
        />
        <span>{title}</span>
      </label>
      <button>
        <Trash size={24} onClick={() => onDeleteTask(id)} />
      </button>
    </div>
  )
}
