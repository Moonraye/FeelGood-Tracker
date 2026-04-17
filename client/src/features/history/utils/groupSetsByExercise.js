export const groupSetsByExercise = (sets) => {
    if (!sets) return {};
    return sets.reduce((acc, set) => {
    const name = set.exercises?.name || "Unknown Exercise";
    if (!acc[name]) acc[name] = [];
    acc[name].push(set);
    return acc;
  }, {});
}   