export const extractExerciseNotes = (exercises) => {
    const exerciseNotes = {};
    exercises.forEach(ex => {
        if (ex.notes && ex.notes.trim() !== "") {
            exerciseNotes[ex.exerciseId] = ex.notes.trim();
        }
    });
    return Object.keys(exerciseNotes).length > 0 ? exerciseNotes : null
}

export const prepareSetsForInsert = (exercises, workoutId) => {
    const setsToInsert = [];
    exercises.forEach((ex) => {
        ex.sets.forEach((set, index) => {
            if (set.isCompleted) {
                setsToInsert.push({
                    workout_id: workoutId,
                    exercise_id: ex.exerciseId,
                    set_number: index + 1,
                    weight: parseFloat(set.weight) || 0,
                    reps: parseInt(set.reps) || 0,
                    rpe: parseFloat(set.rpe) || 0,
                });
            }
        });
    });

    return setsToInsert;
}