import React from "react";
import { Box, Typography, IconButton, Container } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        py: 3,
        mt: 5,
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          {/* Left - Copyright */}
          <Typography variant="body2">© {new Date().getFullYear()} Your Company</Typography>

          {/* Center - Social Icons */}
          <Box>
            <IconButton color="inherit">
              <Facebook />
            </IconButton>
            <IconButton color="inherit">
              <Twitter />
            </IconButton>
            <IconButton color="inherit">
              <Instagram />
            </IconButton>
            <IconButton color="inherit">
              <LinkedIn />
            </IconButton>
          </Box>

          {/* Right - Extra Text */}
          <Typography variant="body2">All Rights Reserved</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
