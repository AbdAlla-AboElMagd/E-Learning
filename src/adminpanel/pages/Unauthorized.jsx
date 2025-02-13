import { Box, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "#f8f9fa",
      }}
    >
      <LockOutlinedIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />

      <Typography variant="h3" color="textPrimary" gutterBottom>
        403 Unauthorized
      </Typography>

      <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
        Sorry, you cannot access this page! Please log in or check your
        permissions.
      </Typography>
    </Box>
  );
}

export default Unauthorized;
