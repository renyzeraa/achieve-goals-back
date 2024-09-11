/**
 * Vai popular o banco de dados com dados ficticios para nao iniciar vazio
 */
import { client, db } from "."
import { goalCompletions, goals } from "./schema"

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  await db.insert(goals).values([
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
  ])
}

seed().finally(() => {
  console.log('Seeding done')
  client.end()
})