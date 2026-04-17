export const prepareTemplateSets = (originalSets, newWorkoutId) => {
    if (!originalSets || !Array.isArray(originalSets) || originalSets.length === 0) return [];

    return originalSets.map((set) => ({
        workout_id: newWorkoutId,
        exercise_id: set.exercise_id || set.exercises?.id,
        weight: set.weight || 0,
        reps: set.reps || 0,
        rpe: set.rpe || 0,
        set_number: set.set_number || 0,
    })); 
}