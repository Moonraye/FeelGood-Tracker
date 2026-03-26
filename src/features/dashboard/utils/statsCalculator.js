export const calculateMonthlyVolume = (monthWorkouts) => {
    let monthlyVolume = 0;
    if (!monthWorkouts) return monthlyVolume;

    monthWorkouts.forEach((workout) => {
        workout.sets?.forEach(set => {
            const weight = parseFloat(set.weight) || 0;
            const reps = parseInt(set.reps) || 0;
            monthlyVolume += weight * reps;
        })
    });

    return monthlyVolume;
}
export const getFavoriteExercise = (allSets) => {
    if (!allSets || allSets.length === 0) return "N/A";

    const exerciseCounts = {};

    allSets.forEach(set => {
        const name = set.exercises?.name;
        if (name) {
            exerciseCounts[name] = (exerciseCounts[name] || 0) + 1;
        }
    });

    if (Object.keys(exerciseCounts).length === 0) return "N/A";

    return Object.keys(exerciseCounts).reduce((a, b) =>
        exerciseCounts[a] > exerciseCounts[b] ? a : b
    );
};