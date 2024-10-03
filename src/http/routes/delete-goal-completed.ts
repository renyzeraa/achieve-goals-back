import z from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { deleteGoalCompleted } from "@/functions/delete-goal"

export const deleteGoalCompletedRoute: FastifyPluginAsyncZod = async app => {
  app.delete('/goal', {
    schema: {
      body: z.object({
        goalId: z.string().min(1)
      })
    }
  }, async (request, reply) => {
    const { goalId } = request.body

    await deleteGoalCompleted({
      goalId
    })

    return reply.status(200).send({ message: 'Tarefa deletada com sucesso !' });
  })
}