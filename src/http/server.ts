import fastify from "fastify"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import { createGoalRoute } from "./routes/create-goal"
import { createCompletionRoute } from "./routes/create-goal-completion"
import { getPendingGoalsRoute } from "./routes/get-pending-goals"
import { getWeekSummaryRoute } from "./routes/get-week-summary"
import fastifyCors from "@fastify/cors"
import { AppError } from "@/utils/app-error"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

// Manipulador de erros global
app.setErrorHandler((error, request, reply) => {
  console.error(error); // Log do erro no console

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  const statusCode = error.statusCode || 500
  const message = error.message || "Internal Server Error"

  reply.status(statusCode).send({
    statusCode,
    message,
  });
});

app.listen({ port: 3333 }).then(() => console.log("🟢 Server is running"))