import { ThumbsUp, Trash } from "@phosphor-icons/react";
import styles from "./Comment.module.css"
import { Avatar } from "./Avatar";
import { useState } from "react";

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment() {
        onDeleteComment(content)
    }

    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        })
    }

    return (

        <div className={styles.comment}>
            <Avatar
                hasBorder={false}
                src="https://github.com/matheushfp.png"
            />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Matheus Ferreira</strong>
                            <time title="7 de Novembro às 08h15min" dateTime="2023-11-07 08:15:00">Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title="Apagar comentário">
                            <Trash size={24} />
                        </button>

                    </header>
                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>

        </div>

    );
}