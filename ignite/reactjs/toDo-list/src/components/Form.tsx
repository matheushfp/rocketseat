import { ChangeEvent, FormEvent, useState } from 'react'
import { PlusCircle } from '@phosphor-icons/react'
import { v4 as uuidV4 } from 'uuid'
import styles from './Form.module.css'

export interface ITask {
  id: string
  title: string
  isCompleted: boolean
}

interface FormProps {
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

export function Form({ setTasks }: FormProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const task = {
      id: uuidV4(),
      title: newTaskTitle,
      isCompleted: false,
    }

    setTasks((previous) => [...previous, task])

    setNewTaskTitle('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value)
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask} className={styles.wrapper}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskChange}
          value={newTaskTitle}
        />
        <button type="submit">
          Criar
          <PlusCircle size={16} />
        </button>
      </form>
    </>
  )
}
