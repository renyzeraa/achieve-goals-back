/**
 * Vai popular o banco de dados com dados ficticios para nao iniciar vazio
 */
import { client, db } from "."
import { goalCompletions, goals } from "./schema"
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db.insert(goals).values([
    {
      title: 'Acordar cedo',
      desiredWeeklyFrequency: 3
    },
    {
      title: 'Ler um livro',
      desiredWeeklyFrequency: 4
    },
    {
      title: 'Estudar Progamação',
      desiredWeeklyFrequency: 5
    }
  ]).returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values(result.map((goal, index) => {
    return {
      goalId: goal.id,
      createdAt: index ? startOfWeek.toDate() : startOfWeek.add(index, 'day').toDate()
    }
  }))
}

seed().finally(() => {
  console.log('⏰ Seeding done ⏰')
  client.end()
})