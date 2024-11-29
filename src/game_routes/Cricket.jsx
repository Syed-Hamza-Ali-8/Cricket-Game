import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const CricketHomePage = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    const handleStartGame = () => {
        navigate("/teams");
    };

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: 'url("/loginImg.jpeg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    zIndex: 1,
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSignOut}
                    sx={{
                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                        px: { xs: 2, sm: 3, md: 4 },
                    }}
                >
                    Sign Out
                </Button>
            </Box>

            <Box
                sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    px: 2,
                }}
            >
                <SportsCricketIcon
                    sx={{
                        fontSize: { xs: 60, sm: 80, md: 100 },
                        color: "green",
                    }}
                />
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                    }}
                >
                    Welcome to the Cricket Game!
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                    }}
                >
                    Get ready for an exciting cricket match. Show your skills and compete with friends.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                            px: { xs: 2, sm: 3, md: 4 },
                        }}
                        onClick={handleStartGame}
                    >
                        Start Game
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CricketHomePage;
