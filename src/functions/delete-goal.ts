import { db } from '@/db'
import { goalCompletions } from '@/db/schema'
import { AppError } from '@/utils/app-error'
import { eq } from 'drizzle-orm'

interface DeleteGoalRequest {
  goalId: string
}

export async function deleteGoalCompleted({
  goalId
}: DeleteGoalRequest) {
  const goal = await db.select().from(goalCompletions).where(eq(goalCompletions.id, goalId)).limit(1);
  if (!goal.length) {
    throw new AppError('Esta tafera não existe!', 404)
  }
  try {
    await db
      .delete(goalCompletions).where(eq(goalCompletions.id, goalId))
      .returning()
    return { success: true }
  } catch (error) {
    throw new AppError('Não foi possível deletar está tafera', 400)
  }
}