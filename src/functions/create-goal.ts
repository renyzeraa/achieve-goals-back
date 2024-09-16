import { db } from "../db";
import { goals } from "../db/schema";

interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal({ desiredWeeklyFrequency, title }: CreateGoalRequest) {
  const result = await db.insert(goals).values({ desiredWeeklyFrequency, title }).returning()
  const goal = result[0];
  return {
    goal,
  }
}