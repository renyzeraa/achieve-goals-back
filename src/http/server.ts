import fastify from "fastify"
import { createGoal } from "../functions/create-goal"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { getWeekPendingGoals } from "../functions/get-week-pending-goals"
import { createGoalCompletion } from "../functions/create-goal-completion"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/pending-goals', async () => {
  return await getWeekPendingGoals()
})

app.post('/goals', {
  schema: {
    body: z.object({
      desiredWeeklyFrequency: z.number().positive(),
      title: z.string().min(1)
    })
  }
}, async (request) => {
  const { desiredWeeklyFrequency, title } = request.body

  await createGoal({
    desiredWeeklyFrequency,
    title
  })
})

app.post('/completions', {
  schema: {
    body: z.object({
      goalId: z.string(),
    })
  }
}, async (request) => {
  const { goalId } = request.body

  const { goalCompletion } = await createGoalCompletion({ goalId })
  return goalCompletion
})

app.listen({
  port: 3333
}).then(() => {
  console.log("🟢 Server is running")
})