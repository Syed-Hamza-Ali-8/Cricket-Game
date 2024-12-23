import React, { useState } from "react";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlagIcon from "@mui/icons-material/Flag";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

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
];

const TeamSelection = () => {
    const navigate = useNavigate();
    const [player1Team, setPlayer1Team] = useState(null);
    const [player2Team, setPlayer2Team] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState("player1");

    const handleSelectTeam = async (team) => {
        if (currentPlayer === "player1") {
            setPlayer1Team(team);
            setCurrentPlayer("player2"); // Update state immediately
            await setDoc(doc(db, "teamsCollection", team.id), {
                name: team.name,
                flagUrl: team.flagUrl,
                players: [],
            });
        } else if (currentPlayer === "player2") {
            setPlayer2Team(team);
            await setDoc(doc(db, "teamsCollection", team.id), {
                name: team.name,
                flagUrl: team.flagUrl,
                players: [],
            });
        }
    };

    const isTeamDisabled = (team) => {
        return (player1Team && player1Team.id === team.id) || (player2Team && player2Team.id === team.id);
    };

    const handleBack = () => navigate(-1);

    const handleToss = async () => {
        const tossWinner = Math.random() < 0.5 ? player1Team : player2Team; // Randomly choose toss winner
        await setDoc(doc(db, "gameData", "currentGame"), {
            battingTeam: tossWinner.name, // Store the toss winner in Firestore
        });
        navigate("/toss"); // Redirect to the Toss page
    };

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
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                    {teams.map((team) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={team.id}>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    disabled={isTeamDisabled(team)}
                                    sx={{
                                        borderColor: player1Team === team ? "blue" : player2Team === team ? "red" : "gray",
                                        backgroundColor: player1Team === team ? "lightblue" : player2Team === team ? "lightcoral" : "white",
                                        color: player1Team === team ? "blue" : player2Team === team ? "red" : "gray",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                        height: { xs: "150px", sm: "200px" },
                                    }}
                                    onClick={() => handleSelectTeam(team)}
                                >
                                    <img
                                        src={team.flagUrl}
                                        alt={team.name}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            filter: player1Team && player2Team && !(player1Team === team || player2Team === team) ? "grayscale(100%)" : "none",
                                        }}
                                    />
                                    <Typography variant="body1" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                                        {team.name}
                                    </Typography>
                                    {player1Team === team && <FlagIcon sx={{ color: "blue" }} />}
                                    {player2Team === team && <FlagIcon sx={{ color: "red" }} />}
                                </Button>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {player1Team && player2Team && (
                <Button variant="contained" color="primary" sx={{ marginTop: "20px" }} onClick={handleToss}>
                    Toss and Start Game
                </Button>
            )}
        </Container>
    );
};

export default TeamSelection;