import { Task } from './Task'

import styles from './TaskList.module.css'

import clipboard from '../assets/clipboard.svg'
import { ITask } from './Form'

interface TaskListProps {
  tasks: ITask[]
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

export function TaskList({ tasks, setTasks }: TaskListProps) {
  const completedTasks = tasks.filter(
    (task) => task.isCompleted === true,
  ).length

  function handleTaskIsCompleted(taskId: string) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          task.isCompleted = !task.isCompleted
        }

        return task
      }),
    )
  }

  function deleteTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== taskId)

    setTasks(tasksWithoutDeletedOne)
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <p className={styles.created}>
          Tarefas criadas
          <span>{tasks.length}</span>
        </p>

        <p className={styles.done}>
          Concluídas
          {tasks.length === 0 ? (
            <span>{tasks.length}</span>
          ) : (
            <span>{`${completedTasks} de ${tasks.length}`}</span>
          )}
        </p>
      </header>

      <main>
        {tasks.length === 0 ? (
          <div>
            <img src={clipboard} alt="clipboard" />
            <p className={styles.bold}>
              Você ainda não tem tarefas cadastradas
            </p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          tasks.map((task) => (
            <Task
              key={task.id}
              title={task.title}
              id={task.id}
              onDeleteTask={deleteTask}
              handleTaskIsCompleted={handleTaskIsCompleted}
            />
          ))
        )}
      </main>
    </div>
  )
}
