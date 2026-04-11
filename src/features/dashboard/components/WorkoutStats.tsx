import { Paper, Box, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const WorkoutStats = ({ streak = 0, volume = 0 }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 2,
        mt: 2,
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          gap: 3,
        }}
      >
        <WhatshotIcon color="error" sx={{ fontSize: 40, bgcolor: '#fdebdf', p:1, borderRadius: '30%'}} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="overline" color="text.secondary">
            Streak
          </Typography>
          <Typography variant="inherit" fontWeight="bold">
            {streak} days
          </Typography>
        </Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          gap: 3,
        }}
      >
        <TrendingUpIcon sx={{ fontSize: 40, bgcolor: '#f5fddf', p:1, borderRadius: '30%', color: 'green'}}/>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="overline" color="text.secondary">
            Volume
          </Typography>
          <Typography variant="inherit" fontWeight="bold">
            {volume} kg
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
