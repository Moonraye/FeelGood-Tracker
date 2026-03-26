import { Box } from "@mui/material"
import { CreateExerciseHeader } from "../features/user-exercises/components/CreateExerciseHeader"
import { CreateExerciseForm } from "../features/user-exercises/components/CreateExerciseForm"
import { useNavigate } from "react-router-dom"

export const UserExercises = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
            <CreateExerciseHeader onBackClick={() => navigate(-1)} />
            <CreateExerciseForm />
        </Box>
    )
}