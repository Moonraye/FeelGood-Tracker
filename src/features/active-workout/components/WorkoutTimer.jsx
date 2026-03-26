import { useState, useEffect } from "react";
import { useActiveWorkoutStore } from "../store/useActiveWorkoutStore";
import { Typography } from "@mui/material";

export const WorkoutTimer = () => {
  const startTime = useActiveWorkoutStore((state) => state.startTime);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!startTime) {
      setElapsedTime(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Typography variant="h6" fontWeight="bold" color="primary">
        {formatTime(elapsedTime)}
    </Typography>
  )
};
