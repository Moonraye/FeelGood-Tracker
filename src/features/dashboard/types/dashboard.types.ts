export interface DashboardSet {
  weight?: string | number | null;
  reps?: string | number | null;
  exercises?: {
    name?: string;
  } | null;
}

export interface DashboardWorkout {
  sets?: DashboardSet[] | null;
}