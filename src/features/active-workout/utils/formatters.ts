import { WorkoutExercise, WorkoutSet } from "../store/useActiveWorkoutStore";

export const extractExerciseNotes = (exercises: WorkoutExercise[]): Record<string, string> | null => {
    const exerciseNotes: Record<string, string> = {};
    exercises.forEach(ex => {
        if (ex.notes && ex.notes.trim() !== "") {
            exerciseNotes[ex.exerciseId] = ex.notes.trim();
        }
    });
    return Object.keys(exerciseNotes).length > 0 ? exerciseNotes : null
}

export const prepareSetsForInsert = (exercises: WorkoutExercise[], workoutId: string) => {
    const setsToInsert: {
        workout_id: string;
        exercise_id: string;
        set_number: number;
        weight: number;
        reps: number;
        rpe: number;
    }[] = [];
    exercises.forEach((ex) => {
        ex.sets.forEach((set, index) => {
            if (set.isCompleted) {
                setsToInsert.push({
                    workout_id: workoutId,
                    exercise_id: ex.exerciseId,
                    set_number: index + 1,
                    weight: typeof set.weight === 'string' ? parseFloat(set.weight) || 0 : set.weight,
                    reps: typeof set.reps === 'string' ? parseInt(set.reps) || 0 : set.reps,
                    rpe: typeof set.rpe === 'string' ? parseInt(set.rpe) || 0 : set.rpe,
                });
            }
        });
    });

    return setsToInsert;
}

export const sanitizeWorkoutInput = (field: keyof WorkoutSet, value: string, allowDecimal: boolean = false): string => {
    let sanitized = value.replace(/,/g, "."); 

    if (allowDecimal) {
      sanitized = sanitized.replace(/[^\d.]/g, ""); 
      const parts = sanitized.split(".");
      if (parts.length > 2) {
        sanitized = parts[0] + "." + parts.slice(1).join("");
      }
    } else {
      sanitized = sanitized.replace(/[^\d]/g, ""); 
    }

    if (field === "rpe" && parseFloat(sanitized) > 10) {
      sanitized = "10";
    }

    return sanitized;
};