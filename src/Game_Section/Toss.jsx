import React, { useState } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Toss = () => {
    const navigate = useNavigate();

    const [tossResult, setTossResult] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [winningTeam, setWinningTeam] = useState(null);

    const handleToss = (teamChoice) => {
        const coinFlip = Math.random() < 0.5 ? "Heads" : "Tails";

        if (teamChoice === coinFlip) {
            const teamWinner = teamChoice === "Heads" ? "Team A" : "Team B";
            setTossResult(`${teamWinner} won the toss!`);
            setWinningTeam(teamWinner);
            setShowOptions(true); 
        } else {
            const teamWinner = teamChoice === "Heads" ? "Team B" : "Team A";
            setTossResult(`${teamWinner} won the toss!`);
            setWinningTeam(teamWinner);
            setShowOptions(true);
        }
    };

    const handleBatBallChoice = (choice) => {
        alert(`${winningTeam} chose to ${choice}.`);
        navigate("/match"); 
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
