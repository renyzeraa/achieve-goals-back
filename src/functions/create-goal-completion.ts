import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import dayjs from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { AppError } from "@/utils/app-error";

dayjs.extend(weekOfYear)

interface CreateGoalCompletionRequest {
  goalId: string
}

export async function createGoalCompletion({ goalId }: CreateGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const hasGoal = await db.select().from(goals).where(eq(goals.id, goalId)).limit(1)
  if (!hasGoal.length) {
    throw new AppError('Meta não encontrada!', 404);
  }
  const goalsCompletionCounts = db.$with('goals_completion_count').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount')
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const result = await db
    .with(goalsCompletionCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql/*sql*/`
        COALESCE(${goalsCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(goalsCompletionCounts, eq(goalsCompletionCounts.goalId, goals.id))
    .where(eq(goals.id, goalId))
    .limit(1)

  const { completionCount, desiredWeeklyFrequency } = result[0]
  // se eu ja completei esta meta
  if (completionCount >= desiredWeeklyFrequency) {
    throw new AppError('Esta meta já foi completada está semana !', 409)
  }
  const insertResult = await db.insert(goalCompletions).values({ goalId }).returning()
  const goalCompletion = insertResult[0];
  return { goalCompletion }

}