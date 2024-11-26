import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
    create: async (answer: Answer) => {
        return
    }
}

test('create an answer', async () => {
    const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository)

    const answer = await answerQuestionUseCase.execute({
        content: 'Nova Resposta',
        questionId: '1',
        instructorId: '4'
    })

    expect(answer.content).toEqual('Nova Resposta')
})