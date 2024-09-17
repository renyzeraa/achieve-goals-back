import fastify from "fastify"
import { createGoal } from "../functions/create-goal"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { getWeekPendingGoals } from "../functions/get-week-pending-goals"

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

app.listen({
  port: 3333
}).then(() => {
  console.log("🟢 Server is running")
})