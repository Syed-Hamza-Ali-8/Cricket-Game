import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SportsCricketIcon from "@mui/icons-material/SportsCricket"; // Cricket Icon
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee"; // Coin Icon for Toss
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore"; // Firestore Functions
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { v4 as uuidv4 } from "uuid"; // UUID for generating unique gameRoomId

const Toss = () => {
    const [tossResult, setTossResult] = useState(null);
    const [userChoice, setUserChoice] = useState("");
    const [tossWinner, setTossWinner] = useState(null); // Initialize tossWinner as null
    const [modalOpen, setModalOpen] = useState(false);
    const [batOrBallChoice, setBatOrBallChoice] = useState(null);
    const [waitingForOpponent, setWaitingForOpponent] = useState(false);
    const navigate = useNavigate();
    const db = getFirestore(); // Initialize Firestore
    const auth = getAuth(); // Firebase Authentication instance
    const currentUser = auth.currentUser;
    const gameRoomId = uuidv4(); // Generate a unique gameRoomId using uuid

    // Listen for changes in Firestore (real-time)
    useEffect(() => {
        const gameDocRef = doc(db, "gamesCollection", gameRoomId);
        const unsubscribe = onSnapshot(gameDocRef, (docSnapshot) => {
            const data = docSnapshot.data();
            if (data) {
                setTossResult(data.tossResult);
                setTossWinner(data.tossWinner);
                if (data.batOrBallChoice) {
                    setBatOrBallChoice(data.batOrBallChoice);
                }
                if (data.tossWinner === "player2") {
                    setWaitingForOpponent(true);
                }
            }
        });

        return () => unsubscribe(); // Clean up listener
    }, [db, gameRoomId]);

    // Handle toss and update Firestore
    const handleToss = (choice) => {
        setUserChoice(choice);
        const randomToss = Math.random() < 0.5 ? "HEAD" : "TAIL";
        setTossResult(randomToss);

        const winner = randomToss === choice ? "player1" : "player2";  // Corrected winner logic
        setTossWinner(winner);

        // Update Firestore with toss result
        const gameDocRef = doc(db, "gamesCollection", gameRoomId);
        setDoc(gameDocRef, {
            tossResult: randomToss,
            tossWinner: winner,
            player1Choice: choice,
            player2Choice: randomToss === "HEAD" ? "TAIL" : "HEAD", // Assuming the opponent picks the opposite
            timestamp: new Date(),
        }, { merge: true });

        if (winner === "player1") {
            setModalOpen(true);
        } else {
            setWaitingForOpponent(true);
        }
    };

    const handleBatOrBall = (choice) => {
        setBatOrBallChoice(choice);
        setModalOpen(false);

        // Update Firestore with Bat or Ball choice
        const gameDocRef = doc(db, "gamesCollection", gameRoomId);
        setDoc(gameDocRef, {
            batOrBallChoice: choice,
        }, { merge: true });

        if (tossWinner === "player1") {
            alert(`You won the toss and chose to ${choice}.`);
            navigate("/game");  // Redirect to game page
        } else {
            alert(`Opponent won the toss. They chose to ${choice}.`);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f0f0f0", position: "relative" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Toss Time: Choose HEAD or TAIL
                </Typography>
                <Box sx={{ display: "flex", gap: 4 }}>
                    {/* Toss Buttons with Icons */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleToss("HEAD")}
                        sx={{
                            width: 150,
                            height: 150,
                            fontSize: 24,
                            borderRadius: "50%",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        <SportsCricketIcon sx={{ fontSize: 40 }} />
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleToss("TAIL")}
                        sx={{
                            width: 150,
                            height: 150,
                            fontSize: 24,
                            borderRadius: "50%",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        <CurrencyRupeeIcon sx={{ fontSize: 40 }} />
                    </Button>
                </Box>

                {tossResult && (
                    <Typography variant="h5" sx={{ mt: 3 }}>
                        Toss Result: {tossResult}
                    </Typography>
                )}

                {/* Modal for Toss Winner and Bat/Ball Choice */}
                {tossWinner && tossWinner === "player1" && (
                    <Modal open={modalOpen} onClose={handleCloseModal}>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "white",
                                padding: 3,
                                borderRadius: 2,
                                textAlign: "center",
                                boxShadow: 24,
                            }}
                        >
                            <Typography variant="h6">You won the toss!</Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>What do you want to do?</Typography>
                            <Box sx={{ display: "flex", gap: 4 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleBatOrBall("Bat")}
                                    sx={{ width: 150, height: 60 }}
                                >
                                    Bat
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleBatOrBall("Ball")}
                                    sx={{ width: 150, height: 60 }}
                                >
                                    Ball
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                )}

                {/* Waiting for Opponent Modal */}
                {waitingForOpponent && (
                    <Modal open={waitingForOpponent} onClose={handleCloseModal}>
                        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: 3, borderRadius: 2, textAlign: "center", boxShadow: 24 }}>
                            <Typography variant="h6">Opponent won the toss!</Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>Wait for their decision...</Typography>
                            <Box sx={{ display: "flex", gap: 4 }}>
                                <Button variant="contained" color="primary" disabled sx={{ width: 150, height: 60 }}>
                                    Bat
                                </Button>
                                <Button variant="contained" color="secondary" disabled sx={{ width: 150, height: 60 }}>
                                    Ball
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                )}
            </Box>
        </Container>
    );
};

export default Toss;