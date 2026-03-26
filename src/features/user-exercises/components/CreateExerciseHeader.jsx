import { Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const CreateExerciseHeader = ({ onBackClick}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: 0,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <IconButton onClick={onBackClick} sx={{ ml: -1 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
        Create Custom Exercise
      </Typography>
    </Paper>
  );
};
