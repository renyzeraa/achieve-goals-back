import z from "zod"
import { createGoal } from "../../functions/create-goal"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
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
}