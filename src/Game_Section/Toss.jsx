import React, { useState } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Toss = () => {
    const navigate = useNavigate();

    // State to store toss result and toss outcome
    const [tossResult, setTossResult] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [winningTeam, setWinningTeam] = useState(null);

    // Function to handle coin flip (Heads or Tails)
    const handleToss = (teamChoice) => {
        const coinFlip = Math.random() < 0.5 ? "Heads" : "Tails"; // Randomly choose between Heads or Tails

        // Determine the winner based on the coin flip and user choice
        if (teamChoice === coinFlip) {
            const teamWinner = teamChoice === "Heads" ? "Team A" : "Team B";
            setTossResult(`${teamWinner} won the toss!`);
            setWinningTeam(teamWinner);
            setShowOptions(true); // Show Bat/Ball options after the toss
        } else {
            const teamWinner = teamChoice === "Heads" ? "Team B" : "Team A";
            setTossResult(`${teamWinner} won the toss!`);
            setWinningTeam(teamWinner);
            setShowOptions(true);
        }
    };

    // Function to handle Bat/Ball choice
    const handleBatBallChoice = (choice) => {
        alert(`${winningTeam} chose to ${choice}.`);
        navigate("/match"); // Navigate to match page
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                mt: 5,
            }}
        >
            <Typography variant="h4">Toss</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
                Flip the coin to decide who bats first!
            </Typography>

            {!tossResult ? (
                // Show Heads/Tails buttons if the toss has not been decided yet
                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleToss("Heads")}
                    >
                        Heads
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleToss("Tails")}
                    >
                        Tails
                    </Button>
                </Box>
            ) : (
                // Show the toss result and options if the toss is decided
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {tossResult}
                    </Typography>

                    {showOptions && (
                        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleBatBallChoice("bat")}
                            >
                                Choose Bat
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleBatBallChoice("ball")}
                            >
                                Choose Ball
                            </Button>
                        </Box>
                    )}
                </Box>
            )}
        </Container>
    );
};

export default Toss;
