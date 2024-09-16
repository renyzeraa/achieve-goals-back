import fastify from "fastify"
import { createGoal } from "../functions/create-goal"
import z from "zod"

const app = fastify()

app.post('/goals', async (request) => {
  const goalSchema = z.object({
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
    title: z.string()
  })
  const { desiredWeeklyFrequency, title } = goalSchema.parse(request.body)
  await createGoal({
    desiredWeeklyFrequency,
    title
  })
})

app.listen({
  port: 3333
}).then(() => {
  console.log("🟢 Server is running")
})