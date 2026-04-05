import { Box } from "@mui/material"
import { CreateExerciseForm } from "../features/user-exercises/components/CreateExerciseForm"
import { useNavigate } from "react-router-dom"
import { PageHeader } from "../components/ui/PageHeader"

export const CreateUserExercise = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.default', p: 2 }}>
            <PageHeader title="Create Exercise" />
            <CreateExerciseForm onSuccess={() => navigate(-1)} />
        </Box>
    )
}