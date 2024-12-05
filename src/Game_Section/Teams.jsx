import React, { useState } from "react";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlagIcon from "@mui/icons-material/Flag";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

const teams = [
    { id: "team1", name: "India", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/in.svg" },
    { id: "team2", name: "Australia", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/au.svg" },
    { id: "team3", name: "England", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/gb-eng.svg" },
    { id: "team4", name: "Pakistan", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/pk.svg" },
    { id: "team5", name: "South Africa", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/za.svg" },
    { id: "team6", name: "New Zealand", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/nz.svg" },
    { id: "team7", name: "Sri Lanka", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/lk.svg" },
    { id: "team8", name: "Bangladesh", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/bd.svg" },
    { id: "team9", name: "West Indies", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/jm.svg" },
    { id: "team10", name: "Afghanistan", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/af.svg" },
    { id: "team11", name: "Zimbabwe", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/zw.svg" },
    { id: "team12", name: "Ireland", flagUrl: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/ie.svg" },
];

const TeamSelection = () => {
    const navigate = useNavigate();
    const [player1Team, setPlayer1Team] = useState(null);
    const [player2Team, setPlayer2Team] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState("player1");

    const handleSelectTeam = (teamId) => {
        if (currentPlayer === "player1") {
            setPlayer1Team(teamId);
            setCurrentPlayer("player2");
        } else if (currentPlayer === "player2") {
            setPlayer2Team(teamId);
        }
    };

    const isTeamDisabled = (teamId) => {
        return player1Team === teamId || player2Team === teamId || (player1Team && player2Team);
    };

    const handleBack = () => navigate(-1);

    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Button variant="outlined" sx={{ marginBottom: "20px" }} onClick={handleBack}>
                <ArrowBackIcon /> Back
            </Button>
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ mb: 3 }}>
                    <SportsCricketIcon sx={{ fontSize: "3rem", color: "green" }} />
                    {currentPlayer === "player1" ? "Choose Your Team" : "Choose Opponent Team"}
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                    {teams.map((team) => (
                        <Grid item xs={12} sm={4} md={3} key={team.id}>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    disabled={isTeamDisabled(team.id)}
                                    sx={{
                                        borderColor:
                                            team.id === player1Team
                                                ? "blue"
                                                : team.id === player2Team
                                                    ? "red"
                                                    : "gray",
                                        backgroundColor:
                                            team.id === player1Team
                                                ? "lightblue"
                                                : team.id === player2Team
                                                    ? "lightcoral"
                                                    : "white",
                                        color:
                                            team.id === player1Team
                                                ? "blue"
                                                : team.id === player2Team
                                                    ? "red"
                                                    : "gray",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                        height: "200px",
                                        "&:hover": {
                                            backgroundColor:
                                                team.id === player1Team
                                                    ? "lightblue"
                                                    : team.id === player2Team
                                                        ? "lightcoral"
                                                        : "lightgreen",
                                            color:
                                                team.id === player1Team
                                                    ? "blue"
                                                    : team.id === player2Team
                                                        ? "red"
                                                        : "green",
                                        },
                                    }}
                                    onClick={() => handleSelectTeam(team.id)}
                                >
                                    <img
                                        src={team.flagUrl}
                                        alt={team.name}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            filter:
                                                player1Team && player2Team && !(player1Team === team.id || player2Team === team.id)
                                                    ? "grayscale(100%)"
                                                    : "none",
                                        }}
                                    />
                                    <Typography variant="body1">{team.name}</Typography>
                                    {team.id === player1Team && <FlagIcon sx={{ color: "blue" }} />}
                                    {team.id === player2Team && <FlagIcon sx={{ color: "red" }} />}
                                </Button>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default TeamSelection;