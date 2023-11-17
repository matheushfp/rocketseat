import { Header } from './components/Header'
import { Form, ITask } from './components/Form'

import './global.css'
import { TaskList } from './components/TaskList'
import { useState } from 'react'

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])

  return (
    <>
      <Header />
      <main>
        <Form setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </main>
    </>
  )
}
