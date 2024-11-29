import React, { useState } from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Teams = () => {
    const navigate = useNavigate();
    const [selectedTeam, setSelectedTeam] = useState(null);

    const handleSelectTeam = (team) => {
        setSelectedTeam(team);
    };

    const handleNext = () => {
        if (selectedTeam) {
            navigate("/toss"); // Navigate to toss page after team selection
        } else {
            alert("Please select a team first!");
        }
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
            <Typography variant="h4">Select Your Team</Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                    variant="contained"
                    color={selectedTeam === "Team A" ? "primary" : "default"}
                    onClick={() => handleSelectTeam("Team A")}
                >
                    Team A
                </Button>
                <Button
                    variant="contained"
                    color={selectedTeam === "Team B" ? "primary" : "default"}
                    onClick={() => handleSelectTeam("Team B")}
                >
                    Team B
                </Button>
            </Box>

            <Button
                variant="contained"
                color="success"
                sx={{ mt: 4 }}
                onClick={handleNext}
            >
                Proceed to Toss
            </Button>
        </Container>
    );
};

export default Teams;
