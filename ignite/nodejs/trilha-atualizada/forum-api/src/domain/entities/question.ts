import { randomUUID } from "node:crypto"

interface QuestionProps {
    title: string
    content: string
    authorId: string
}

export class Question {
    public id: string
    public title: string
    public content: string
    public authorId: string

    constructor(props: QuestionProps,  id?: string) {
        Object.assign(this, props)
        this.id = id ?? randomUUID()
    }
}