import { DashboardSet, DashboardWorkout } from "../types/dashboard.types";

export const calculateMonthlyVolume = (monthWorkouts : DashboardWorkout[] ) => {
    let monthlyVolume = 0;
    if (!monthWorkouts) return monthlyVolume;

    monthWorkouts.forEach((workout) => {
        workout.sets?.forEach(set => {
            const weightVal = typeof set.weight === 'string' ? parseFloat(set.weight) : (set.weight || 0);
            const repsVal = typeof set.reps === 'string' ? parseInt(set.reps, 10) : (set.reps || 0);
            monthlyVolume += (weightVal || 0) * (repsVal || 0);
        })
    });

    return monthlyVolume;
}
export const getFavoriteExercise = (allSets: DashboardSet[] | null | undefined) => {
    if (!allSets || allSets.length === 0) return "N/A";

    const exerciseCounts: Record<string, number> = {};

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
