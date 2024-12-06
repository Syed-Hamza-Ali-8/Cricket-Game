import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Container,
    Fade,
    CircularProgress,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    incrementScore,
    incrementWicket,
    resetScore,
    setInningComplete,
    setGameId,
} from "../Redux/scoreSlice";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import { db, doc, getDoc, updateDoc, collection, onSnapshot, addDoc } from "../config/firebase";

const Game = () => {
    const dispatch = useDispatch();
    const { score, wickets, isInningComplete, gameId } = useSelector((state) => state.score);
    const [ball, setBall] = useState(0);
    const [isWicket, setIsWicket] = useState(false);
    const [battingTeam, setBattingTeam] = useState("");
    const [loading, setLoading] = useState(true);

    const MAX_WICKETS = 5;

    // Fetch or Initialize Game State
    useEffect(() => {
        const fetchGameState = async () => {
            try {
                if (!gameId) {
                    const newGameRef = await addDoc(collection(db, "gamesCollection"), {
                        score: 0,
                        wickets: 0,
                        ball: 0,
                        isWicket: false,
                        battingTeam: "No team",
                        isInningComplete: false,
                    });
                    dispatch(setGameId(newGameRef.id));
                } else {
                    const gameRef = doc(db, "gamesCollection", gameId);
                    const gameSnap = await getDoc(gameRef);
                    if (gameSnap.exists()) {
                        const gameData = gameSnap.data();
                        updateLocalState(gameData);
                    }
                }
            } catch (error) {
                console.error("Error fetching game data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameState();
    }, [gameId, dispatch]);

    // Real-time Listener for Game Updates
    useEffect(() => {
        if (gameId) {
            const unsubscribe = onSnapshot(doc(db, "gamesCollection", gameId), (docSnap) => {
                if (docSnap.exists()) {
                    updateLocalState(docSnap.data());
                }
            });

            return () => unsubscribe();
        }
    }, [gameId]);

    const updateLocalState = (data) => {
        setBattingTeam(data.battingTeam);
        setBall(data.ball);
        setIsWicket(data.isWicket);
        dispatch(incrementScore(data.score));
        dispatch(incrementWicket(data.wickets));
        if (data.isInningComplete) {
            dispatch(setInningComplete());
        }
    };

    const getRandomWicketChance = () => Math.random() < 0.2;

    const updateFirestore = async (updates) => {
        if (gameId) {
            const gameRef = doc(db, "gamesCollection", gameId);
            try {
                await updateDoc(gameRef, updates);
            } catch (error) {
                console.error("Error updating Firestore:", error);
            }
        }
    };

    const handleScore = (runs) => {
        if (isInningComplete || loading) return;

        const newScore = score + runs;
        const newBall = ball + 1;
        let newWickets = wickets;
        const isOut = getRandomWicketChance();

        if (isOut) {
            newWickets += 1;
        }

        const inningComplete = newWickets >= MAX_WICKETS;

        dispatch(incrementScore(runs));
        setBall(newBall);
        setIsWicket(isOut);
        if (inningComplete) dispatch(setInningComplete());

        updateFirestore({
            score: newScore,
            wickets: newWickets,
            ball: newBall,
            isWicket: isOut,
            isInningComplete: inningComplete,
        });
    };

    const handleReset = () => {
        dispatch(resetScore());
        setBall(0);
        setIsWicket(false);

        updateFirestore({
            score: 0,
            wickets: 0,
            ball: 0,
            isWicket: false,
            isInningComplete: false,
        });
    };

    const handleToss = (team) => {
        setBattingTeam(team);
        updateFirestore({ battingTeam: team });
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(to right, #2193b0, #6dd5ed)",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
        >
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" sx={{ color: "#fff", mb: 2 }}>
                    Cricket Game
                </Typography>

                {loading ? (
                    <CircularProgress sx={{ color: "#fff" }} />
                ) : (
                    <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                        {battingTeam ? `${battingTeam} is Batting` : "Select a Team to Start"}
                    </Typography>
                )}

                <FormControl fullWidth sx={{ mb: 3, color: "#fff" }}>
                    <InputLabel sx={{ color: "#fff" }}>Select Team</InputLabel>
                    <Select
                        value={battingTeam}
                        onChange={(e) => handleToss(e.target.value)}
                        disabled={loading || isInningComplete}
                        sx={{ color: "#fff" }}
                    >
                        <MenuItem value="Team A">Team A</MenuItem>
                        <MenuItem value="Team B">Team B</MenuItem>
                    </Select>
                </FormControl>

                <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                    Score: {score} | Wickets: {wickets} | Balls: {ball}
                </Typography>

                <Fade in={isWicket} timeout={500}>
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <SportsCricketIcon sx={{ fontSize: 60, color: "red" }} />
                        <Typography variant="body1" sx={{ color: "red" }}>
                            Wicket!
                        </Typography>
                    </Box>
                </Fade>

                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Button variant="contained" onClick={() => handleScore(1)} disabled={isInningComplete}>
                        1 Run
                    </Button>
                    <Button variant="contained" onClick={() => handleScore(4)} disabled={isInningComplete}>
                        4 Runs
                    </Button>
                    <Button variant="contained" onClick={() => handleScore(6)} disabled={isInningComplete}>
                        6 Runs
                    </Button>
                </Box>

                <Button variant="contained" color="warning" onClick={() => dispatch(setInningComplete())}>
                    End Inning
                </Button>

                {isInningComplete && (
                    <Typography variant="h6" sx={{ color: "#fff", mt: 3 }}>
                        Innings Complete! Target for opponent: {score + 1}
                    </Typography>
                )}

                <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="info" onClick={handleReset}>
                        Reset Game
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Game;