import { Post } from "./components/Post"
import { Header } from "./components/Header"


import styles from "./App.module.css"
import "./global.css"
import { Sidebar } from "./components/Sidebar"

export function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post
            author="Matheus"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo id facere possimus voluptatibus aspernatur necessitatibus architecto, iure vel tempora soluta eligendi ea quo nesciunt, sint molestias sit quos, optio molestiae."
          />

          <Post
            author="Teste"
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat vitae voluptatem voluptatum nihil nostrum dolorem, harum quibusdam praesentium aspernatur."
          />
        </main>
      </div>

    </div>
  )
}

