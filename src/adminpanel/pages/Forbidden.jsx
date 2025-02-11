import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BlockIcon from "@mui/icons-material/Block";


function Forbidden(){
    return(
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
            <BlockIcon sx={{ fontSize: 80, color: "error.main" }} />

            <Typography variant="h3" color="textPrimary" gutterBottom>
            403 Forbidden
            </Typography>
      
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
            You do not have permission to access this resource.
            </Typography>
      </Box>
    );

}
export default Forbidden 