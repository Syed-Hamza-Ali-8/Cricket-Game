import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import Timer from "../components/Game_Controls/Timer";
import BattingControls from "../components/Game_Controls/BattingControl";
import BowlingControls from "../components/Game_Controls/BowlingControl";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Match = () => {
    const navigate = useNavigate();
    const db = getFirestore();

    const [isBatting, setIsBatting] = useState(true);
    const [runs, setRuns] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [overs, setOvers] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState("Player 1");

    const handleEndGame = () => {
        const gameData = {
            runs: runs,
            wickets: wickets,
            overs: overs,
            result: runs > 50 ? "Won" : "Lost",
        };

        setDoc(doc(db, "games", new Date().toISOString()), gameData)
            .then(() => {
                console.log("Game data saved successfully!");
                navigate("/Cricket");
            })
            .catch((error) => {
                console.error("Error saving game data: ", error);
            });
    };

    const handleChangeOver = () => {
        setOvers((prev) => prev + 1);
        setWickets((prev) => prev + 1);
        setIsBatting(true);
    };

    const handleBattingAction = (runsScored) => {
        setRuns((prev) => prev + runsScored);
        setIsBatting(false);
    };

    const handleBowlingAction = (outcome) => {
        if (outcome === "wicket") {
            setWickets((prev) => prev + 1);
            setIsBatting(true);
        }
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                textAlign: "center",
                padding: 4,
            }}
        >
            <Box sx={{ position: "absolute", top: 20, right: 20 }}>
                <Button variant="contained" color="secondary" onClick={handleSignOut}>
                    Sign Out
                </Button>
            </Box>

            <Timer duration={10} onEnd={handleEndGame} />

            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Current Player: {currentPlayer}
                </Typography>
                <Typography variant="h6">Runs: {runs}</Typography>
                <Typography variant="h6">Wickets: {wickets}</Typography>
                <Typography variant="h6">Overs: {overs}</Typography>
            </Box>

            {isBatting ? (
                <BattingControls
                    onHit={handleBattingAction}
                    onRun={(runs) => handleBattingAction(runs)}
                />
            ) : (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h5">Bowler is bowling...</Typography>
                </Box>
            )}

            {!isBatting && (
                <BowlingControls
                    onBowl={handleBowlingAction}
                    onChangeOver={handleChangeOver}
                />
            )}

            <Button
                variant="contained"
                color="error"
                onClick={handleEndGame}
                sx={{ marginTop: 4 }}
            >
                End Game
            </Button>
        </Container>
    );
};

export default Match;