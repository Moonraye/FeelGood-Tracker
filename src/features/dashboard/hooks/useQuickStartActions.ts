import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActiveWorkoutStore } from "../../active-workout/store/useActiveWorkoutStore";
import { useTemplatesQuery } from "../../templates/hooks/useTemplatesQuery";
import { useWorkoutHistoryQuery } from "../../history/hooks/useWorkoutHistoryQuery";
import { DatabaseWorkoutSet } from "@/types/workout";


export interface QuickStartWorkout {
    name: string;
    sets?: DatabaseWorkoutSet[] | null;
}

export const useQuickStartActions = () => {
    const navigate = useNavigate();
    const startWorkout = useActiveWorkoutStore((state) => state.startWorkout);
    const loadWorkoutFromHistory = useActiveWorkoutStore((state) => state.loadWorkoutFromHistory);

    const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const { data: templates, isLoading: isTemplatesLoading } = useTemplatesQuery();
    const { data: history, isLoading: isHistoryLoading } = useWorkoutHistoryQuery();

    const startEmptyWorkout = () => {
        startWorkout();
        navigate("/active");
    }

    const handleStartSelectedWorkout = (workout: QuickStartWorkout) => {
        if (!workout || !workout.sets) return;

        setIsTemplatesOpen(false);
        setIsHistoryOpen(false);

        const cleanName = workout.name.replace(" (Template)", "");
        loadWorkoutFromHistory(cleanName, workout.sets);
        navigate("/active");
    };

    return {
        isTemplatesOpen,
        isHistoryOpen,
        setIsTemplatesOpen,
        setIsHistoryOpen,
        isTemplatesLoading,
        isHistoryLoading,
        templates,
        history,
        startEmptyWorkout,
        handleStartSelectedWorkout,
    };
};

