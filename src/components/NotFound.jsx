// src/pages/NotFound.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    // Redirect the user to the home page or any other page if they click the button
    const goHome = () => {
        navigate("/");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                404
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Oops! The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" color="primary" onClick={goHome}>
                Go to Home
            </Button>
        </Box>
    );
};

export default NotFound;
