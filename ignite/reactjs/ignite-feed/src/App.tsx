import { Post } from "./components/Post"
import { Header } from "./components/Header"
import { PostProps } from "./components/Post"


import styles from "./App.module.css"
import "./global.css"
import { Sidebar } from "./components/Sidebar"

interface Post extends PostProps {
  id: number;
}

const posts: Post[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=60&w=445&h=445&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Jane Cooper",
      role: "Web Developer"
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      { type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
      { type: "link", content: "👉 jane.design/doctorcare" },
    ],
    publishedAt: new Date("2023-11-07 08:15:00")
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=60&w=445&h=445&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Devon Lane",
      role: "Front-End Developer"
    },
    content: [
      { type: "paragraph", content: "Fala pessoal 👋" },
      { type: "paragraph", content: "Finalmente finalizei meu novo site/portfólio. Foi um baita desafio criar todo o design e codar na unha, mas consegui 💪🏻" },
      { type: "paragraph", content: "Acesse e deixe seu feedback" },
      { type: "link", content: "👉 devonlane.design" },
      { type: "link", content: "#uiux #userexperience" }
    ],
    publishedAt: new Date("2023-11-10 08:15:00")
  }
]

export function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>

    </div>
  )
}

