import { ThumbsUp, Trash } from "@phosphor-icons/react";
import styles from "./Comment.module.css"
import { Avatar } from "./Avatar";

export function Comment() {
    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/matheushfp.png" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Jake Cooper</strong>
                            <time title="7 de Novembro às 08h15min" dateTime="2023-11-07 08:15:00">Cerca de 1h atrás</time>
                        </div>

                        <button title="Apagar comentário">
                            <Trash size={24} />
                        </button>

                    </header>
                    <p>Muito bom Devon, parabéns!! 👏👏</p>
                </div>

                <footer>
                    <button>
                        <ThumbsUp />
                        Aplaudir <span>20</span>
                    </button>
                </footer>
            </div>


        </div>
    );
}