export interface DatabaseWorkoutSet {
  weight?: number | string | null;
  reps?: number | string | null;
  rpe?: number | string | null;
  exercise_id?: string | null;
  exercise?: { id?: string; name?: string } | null;
  exercises?: { id?: string; name?: string } | null;
}