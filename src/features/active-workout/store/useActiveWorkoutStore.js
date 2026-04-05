import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useActiveWorkoutStore = create(
    persist(
        immer((set) => ({
            isActive: false,
            startTime: Date.now(),
            exercises: [],
            workoutName: "New Workout",

            startWorkout: () => set((state) => {
                state.isActive = true;
                state.startTime = Date.now();
                state.workoutName = "New Workout";
                state.exercises = [];
            }),

            clearWorkout: () => set((state) => {
                state.isActive = false;
                state.startTime = Date.now()
                state.workoutName = "New Workout";
                state.exercises = [];
            }),

            setWorkoutName: (name) => set((state) => {
                state.workoutName = name;
            }),

            addExercise: (exerciseDef) => set((state) => {
                state.exercises.push({
                    id: crypto.randomUUID(),
                    exerciseId: exerciseDef.id,
                    name: exerciseDef.name,
                    notes: "",
                    sets: [{
                        id: crypto.randomUUID(),
                        weight: "",
                        reps: "",
                        rpe: "",
                        isCompleted: false
                    }]
                });
            }),

            removeExercise: (exerciseId) => set((state) => {
                const index = state.exercises.findIndex(ex => ex.id === exerciseId);
                if (index !== -1) state.exercises.splice(index, 1)
            }),

            addSet: (exerciseId) => set((state) => {
                const exercise = state.exercises.find(ex => ex.id === exerciseId);
                if (exercise) {
                    const lastSet = exercise.sets[exercise.sets.length - 1];
                    exercise.sets.push({
                        id: crypto.randomUUID(),
                        weight: lastSet ? lastSet.weight : "",
                        reps: lastSet ? lastSet.reps : "",
                        rpe: lastSet ? lastSet.rpe : "",
                        isCompleted: false
                    });
                }
            }),

            updateSet: (exerciseId, setId, field, value) => set((state) => {
                const exercise = state.exercises.find(ex => ex.id === exerciseId);
                if (exercise) {
                    const targetSet = exercise.sets.find(s => s.id === setId);
                    if (targetSet) targetSet[field] = value;
                }
            }),

            removeSet: (exerciseId, setId) => set((state) => {
                const exercise = state.exercises.find(ex => ex.id === exerciseId);
                if (exercise) {
                    const setIndex = exercise.sets.findIndex(s => s.id === setId);
                    if (setIndex !== -1) exercise.sets.splice(setIndex, 1);
                }
            }),

            updateExerciseNote: (exerciseId, note) => set((state) => {
                const exercise = state.exercises.find(ex => ex.id === exerciseId);
                if (exercise) exercise.notes = note;
            }),

            toggleSetCompletion: (exerciseId, setId) => set((state) => {
                const exercise = state.exercises.find(ex => ex.id === exerciseId);
                if (exercise) {
                    const targetSet = exercise.sets.find(s => s.id === setId);
                    if (targetSet) targetSet.isCompleted = !targetSet.isCompleted;
                }
            }),
            loadWorkoutFromHistory: (workoutName, dbSets) => set((state) => {
                const exercisesMap = {};

                dbSets.forEach((dbSet) => {
                    const dbExercise = dbSet.exercises || dbSet.exercise || {};
                    const exerciseId = dbSet.exercise_id || dbSet.exercise?.id || dbExercise.name || "Unknown";
                    const exerciseName = dbExercise.name || "Unknown Exercise";

                    if (!exercisesMap[exerciseId]) {
                        exercisesMap[exerciseId] = {
                            id: crypto.randomUUID(),
                            exercise_id: exerciseId,
                            name: exerciseName,
                            sets: [],
                            notes: "",
                        };
                    }

                    exercisesMap[exerciseId].sets.push({
                        id: crypto.randomUUID(),
                        weight: dbSet.weight || "",
                        reps: dbSet.reps || "",
                        rpe: dbSet.rpe || "",
                        isCompleted: false
                    });
                });

                state.exercises = Object.values(exercisesMap);
                state.workoutName = workoutName;
                state.startTime = Date.now();
            })
        })),
        {
            name: "active-workout-storage",
        }
    )
);
