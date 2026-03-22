import { create } from "zustand";

export const useActiveWorkoutStore = create((set) => ({
    isActive: false,
    startTime: null,
    exercises: [],

    startWorkout: () => set({
        isActive: true,
        startTime: Date.now(),
        exercises: []
    }),

    clearWorkout: () => set({
        isActive: false,
        startTime: null,
        exercises: [],
    }),

    addExercise: (exerciseDef) => set((state) => ({
        exercises: [
            ...state.exercises,
            {
                id: crypto.randomUUID(),
                exerciseId: exerciseDef.id,
                name: exerciseDef.name,
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
}));
