import fastify from "fastify"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import { createGoalRoute } from "./routes/create-goal"
import { createCompletionRoute } from "./routes/create-completion"
import { getPendingGoalsRoute } from "./routes/get-pending-goals"

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)

app.listen({
  port: 3333
}).then(() => {
  console.log("🟢 Server is running")
})