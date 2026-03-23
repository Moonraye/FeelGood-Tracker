import { create } from "zustand";
import { persist } from "zustand/middleware"; // 1. Додаємо імпорт

export const useActiveWorkoutStore = create(
    persist((set) => ({
        isActive: false,
        startTime: null,
        exercises: [],
        workoutName: "New Workout",

        startWorkout: () => set({
            isActive: true,
            startTime: Date.now(),
            workoutName: "New Workout",
            exercises: []
        }),

        clearWorkout: () => set({
            isActive: false,
            startTime: null,
            workoutName: "New Workout",
            exercises: [],
        }),

        setWorkoutName: (name) => set({ workoutName: name }),

        addExercise: (exerciseDef) => set((state) => ({
            exercises: [
                ...state.exercises,
                {
                    id: crypto.randomUUID(),
                    exerciseId: exerciseDef.id,
                    name: exerciseDef.name,
                    notes: "",
                    sets: [
                        {
                            id: crypto.randomUUID(),
                            weight: "",
                            reps: "",
                            rpe: "",
                            isCompleted: false
                        }
                    ]
                }
            ]
        })),

        removeExercise: (exerciseId) => set((state) => ({
            exercises: state.exercises.filter((ex) => ex.id !== exerciseId)
        })),

        addSet: (exerciseId) => set((state) => ({
            exercises: state.exercises.map(ex => {
                if (ex.id === exerciseId) {
                    const lastSet = ex.sets[ex.sets.length - 1];
                    return {
                        ...ex,
                        sets: [
                            ...ex.sets,
                            {
                                id: crypto.randomUUID(),
                                weight: lastSet ? lastSet.weight : "",
                                reps: lastSet ? lastSet.reps : "",
                                rpe: lastSet ? lastSet.rpe : "",
                                isCompleted: false
                            }
                        ]
                    }
                }
                return ex;
            })
        })),

        updateSet: (exerciseId, setId, field, value) => set((state) => ({
            exercises: state.exercises.map(ex => {
                if (ex.id === exerciseId) {
                    return {
                        ...ex,
                        sets: ex.sets.map(set =>
                            set.id === setId ? { ...set, [field]: value } : set
                        )
                    };
                }
                return ex;
            })
        })),

        removeSet: (exerciseId, setId) => set((state) => ({
            exercises: state.exercises.map(ex => {
                if (ex.id === exerciseId) {
                    return {
                        ...ex,
                        sets: ex.sets.filter(set => set.id !== setId)
                    };
                }
                return ex;
            })
        })),

        updateExerciseNote: (exerciseId, note) => set((state) => ({
            exercises: state.exercises.map(ex =>
                ex.id === exerciseId ? { ...ex, notes: note } : ex
            )
        })),

        toggleSetCompletion: (exersiseId, setId) => set((state) => ({
            exercises: state.exercises.map(ex => {
                if (ex.id === exersiseId) {
                    return {
                        ...ex,
                        sets: ex.sets.map(set =>
                            set.id === setId ? { ...set, isCompleted: !set.isCompleted } : set
                        )
                    };
                }
                return ex;
            })
        })),
    }),
    {
        name: "active-workout-storage",
    }
    )
);
