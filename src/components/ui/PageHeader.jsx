// src/components/ui/PageHeader.jsx
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export const PageHeader = ({ title, subtitle, showBack = true, children }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 32,
        display: "flex",
        alignItems: "center",
        bgcolor: "background.default",
        zIndex: 10,
        py: 2,
        mx: -2,
        px: 2,
      }}
    >
      {showBack && (
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      {children}
    </Box>
  );
};
