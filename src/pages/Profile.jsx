import { Box, Paper, Typography } from "@mui/material"
import { useLogoutMutation } from "../features/auth/hooks/useAuthMutation"
import { useAuthStore } from "../store/useAuthStore"
import { AppButton } from "../components/ui/AppButton"
import App from "../App"

export const Profile = () => {
    const logoutMutation = useLogoutMutation()
    const user = useAuthStore((state) => state.user)
    
    const handleLogout = () => {
        logoutMutation.mutate();
    }
    
    return (
        <Box>
            <Typography>
                Profile
            </Typography>

            {user && (
                <Paper>
                    <Typography>
                        {user.email}
                    </Typography>
                </Paper>
            )}

            <AppButton onClick={handleLogout} color="error" isLoading={logoutMutation.isPending} disabled={logoutMutation.isPending}> 
                Logout
            </AppButton>
        </Box>
    )
}