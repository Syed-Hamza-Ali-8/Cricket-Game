import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import Timer from "../components/Game_Controls/Timer";
import BattingControls from "../components/Game_Controls/BattingControl";
import BowlingControls from "../components/Game_Controls/BowlingControl";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../config/firebase"; // Firebase configuration for auth
import { signOut } from "firebase/auth";

const Match = () => {
    const navigate = useNavigate();
    const db = getFirestore();

    // Game state
    const [isBatting, setIsBatting] = useState(true); // Start with batting
    const [runs, setRuns] = useState(0); // Track runs scored
    const [wickets, setWickets] = useState(0); // Track number of wickets
    const [overs, setOvers] = useState(0); // Track overs bowled
    const [currentPlayer, setCurrentPlayer] = useState("Player 1"); // Player at bat

    const handleEndGame = () => {
        // End game logic, save score to Firestore, and navigate
        const gameData = {
            runs: runs,
            wickets: wickets,
            overs: overs,
            result: runs > 50 ? "Won" : "Lost", // Example result based on score
        };

        setDoc(doc(db, "games", new Date().toISOString()), gameData)
            .then(() => {
                console.log("Game data saved successfully!");
                navigate("/Cricket"); // Redirect to the home page after game ends
            })
            .catch((error) => {
                console.error("Error saving game data: ", error);
            });
    };

    const handleChangeOver = () => {
        setOvers((prev) => prev + 1); // Increase overs after every 6 balls
        setWickets((prev) => prev + 1); // Example of incrementing wickets (can modify logic based on real outcomes)
        setIsBatting(true); // Change to batting after each over
    };

    const handleBattingAction = (runsScored) => {
        setRuns((prev) => prev + runsScored); // Update score based on hit/run outcome
        setIsBatting(false); // End batting action
    };

    const handleBowlingAction = (outcome) => {
        if (outcome === "wicket") {
            setWickets((prev) => prev + 1); // Increment wickets on a wicket
            setIsBatting(true); // Change to batting after wicket
        }
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/"); // Redirect to login page after sign-out
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
            {/* Sign-out Button */}
            <Box sx={{ position: "absolute", top: 20, right: 20 }}>
                <Button variant="contained" color="secondary" onClick={handleSignOut}>
                    Sign Out
                </Button>
            </Box>

            {/* Timer */}
            <Timer duration={10} onEnd={handleEndGame} /> {/* Set timer to 2 minutes */}

            {/* Game Info */}
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Current Player: {currentPlayer}
                </Typography>
                <Typography variant="h6">Runs: {runs}</Typography>
                <Typography variant="h6">Wickets: {wickets}</Typography>
                <Typography variant="h6">Overs: {overs}</Typography>
            </Box>

            {/* Batting Controls */}
            {isBatting ? (
                <BattingControls
                    onHit={handleBattingAction} // Handle run on batting action
                    onRun={(runs) => handleBattingAction(runs)} // Handle running action
                />
            ) : (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h5">Bowler is bowling...</Typography>
                </Box>
            )}

            {/* Bowling Controls */}
            {!isBatting && (
                <BowlingControls
                    onBowl={handleBowlingAction} // Pass ball outcome to handle actions
                    onChangeOver={handleChangeOver} // Change over after 6 balls
                />
            )}

            {/* End Game Button (for demonstration) */}
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