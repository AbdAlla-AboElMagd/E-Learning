import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchOffIcon from "@mui/icons-material/SearchOff";


function NotFound (){
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
            <SearchOffIcon sx={{ fontSize: 80, color: "error.main" }} />

            <Typography variant="h3" color="textPrimary" gutterBottom>
            404 Not Found
            </Typography>
            
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
            The page you’re looking for doesn’t exist.
            </Typography>
      </Box>
    );

}
export default NotFound