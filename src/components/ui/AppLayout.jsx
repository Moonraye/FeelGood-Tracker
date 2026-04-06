import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export const AppLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        bgcolor: { xs: "background.default", sm: "background.paper" },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "600px", md: "768px" },
          bgcolor: "background.default",
          position: "relative",
          boxShadow: { xs: "none", sm: 3 },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "action.disabledBackground",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Outlet /> 
      </Box>
    </Box>
  );
};
