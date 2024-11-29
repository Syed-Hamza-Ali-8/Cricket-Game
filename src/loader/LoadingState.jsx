import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";

const LoadingState = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setLoading(false);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundImage: 'url("/cricketBackground.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            {loading ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box
                        sx={{
                            animation: "rotate 2s linear infinite",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 2,
                        }}
                    >
                        <SportsCricketIcon sx={{ fontSize: 50, color: "#388e3c" }} />
                    </Box>

                    <LinearProgress sx={{ width: "80%", marginBottom: 2 }} variant="determinate" value={progress} />
                    <Typography variant="h6" color="white">
                        Loading... {progress}%
                    </Typography>
                </Box>
            ) : (
                <Typography variant="h4" color="white">
                    Welcome to Cricket Page!
                </Typography>
            )}
        </Box>
    );
};

export default LoadingState;
