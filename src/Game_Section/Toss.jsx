import React, { useState } from "react";
import { Box, Typography, Button, Modal, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Toss = () => {
    const [tossResult, setTossResult] = useState(null);
    const [userChoice, setUserChoice] = useState("");
    const [tossWinner, setTossWinner] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [batOrBallChoice, setBatOrBallChoice] = useState(null);
    const [waitingForOpponent, setWaitingForOpponent] = useState(false);
    const navigate = useNavigate();

    const handleToss = (choice) => {
        setUserChoice(choice);
        const randomToss = Math.random() < 0.5 ? "HEAD" : "TAIL";
        setTossResult(randomToss);
        if (randomToss === choice) {
            setTossWinner("player1");
            setModalOpen(true);
        } else {
            setTossWinner("player2");
            setWaitingForOpponent(true);
        }
    };

    const handleBatOrBall = (choice) => {
        setBatOrBallChoice(choice);
        setModalOpen(false);
        if (tossWinner === "player1") {
            alert(`You won the toss and chose to ${choice}.`);
        } else {
            alert(`Opponent won the toss. They chose to ${choice}.`);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        navigate("/game");  // Adjust this route as per your game setup
    };

    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f0f0f0" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Toss Time: Choose HEAD or TAIL
                </Typography>
                <Box sx={{ display: "flex", gap: 4 }}>
                    <Button variant="contained" color="primary" onClick={() => handleToss("HEAD")} sx={{ width: 150, height: 100, fontSize: 18 }}>HEAD</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleToss("TAIL")} sx={{ width: 150, height: 100, fontSize: 18 }}>TAIL</Button>
                </Box>

                {tossResult && (
                    <Typography variant="h5" sx={{ mt: 3 }}>
                        Toss Result: {tossResult}
                    </Typography>
                )}

                {tossWinner && tossWinner === "player1" && (
                    <Modal open={modalOpen} onClose={handleCloseModal}>
                        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: 3, borderRadius: 2, textAlign: "center", boxShadow: 24 }}>
                            <Typography variant="h6">You won the toss!</Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>What do you want to do?</Typography>
                            <Box sx={{ display: "flex", gap: 4 }}>
                                <Button variant="contained" color="primary" onClick={() => handleBatOrBall("Bat")} sx={{ width: 150, height: 60 }}>Bat</Button>
                                <Button variant="contained" color="secondary" onClick={() => handleBatOrBall("Ball")} sx={{ width: 150, height: 60 }}>Ball</Button>
                            </Box>
                        </Box>
                    </Modal>
                )}

                {waitingForOpponent && (
                    <Modal open={waitingForOpponent} onClose={handleCloseModal}>
                        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: 3, borderRadius: 2, textAlign: "center", boxShadow: 24 }}>
                            <Typography variant="h6">Opponent won the toss!</Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>Wait for their decision...</Typography>
                            <Box sx={{ display: "flex", gap: 4 }}>
                                <Button variant="contained" color="primary" disabled sx={{ width: 150, height: 60 }}>Bat</Button>
                                <Button variant="contained" color="secondary" disabled sx={{ width: 150, height: 60 }}>Ball</Button>
                            </Box>
                        </Box>
                    </Modal>
                )}
            </Box>

            {/* Background Animation for HEAD and TAIL */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: "url('/path/to/your/background.jpg')",
                    backgroundSize: "cover",
                    animation: "fadeIn 3s ease-in-out infinite",
                    zIndex: -1,
                }}
            ></Box>
        </Container>
    );
};

export default Toss;