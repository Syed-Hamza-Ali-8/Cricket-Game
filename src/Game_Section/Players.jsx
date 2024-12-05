import React, { useState } from "react";
import { Box, Typography, Button, Container, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

// Define the team players data
const teamPlayers = {
    team1: ["Rohit Sharma", "KL Rahul", "Virat Kohli", "Suryakumar Yadav", "Hardik Pandya", "Ravindra Jadeja", "Dinesh Karthik", "Bhuvneshwar Kumar", "Jasprit Bumrah", "Yuzvendra Chahal", "Arshdeep Singh"],
    team2: ["David Warner", "Mitchell Marsh", "Steve Smith", "Glenn Maxwell", "Marcus Stoinis", "Matthew Wade", "Mitchell Starc", "Pat Cummins", "Adam Zampa", "Josh Hazlewood", "Cameron Green"],
    team3: [
        "Jos Buttler", "Jonny Bairstow", "Ben Stokes", "Harry Brook", "Liam Livingstone",
        "Moeen Ali", "Sam Curran", "Chris Woakes", "Adil Rashid", "Mark Wood", "Reece Topley"
    ],
    team4: [
        "Babar Azam", "Mohammad Rizwan", "Shan Masood", "Iftikhar Ahmed", "Shadab Khan",
        "Mohammad Nawaz", "Haider Ali", "Shaheen Shah Afridi", "Haris Rauf", "Naseem Shah", "Usman Qadir"
    ],
    team5: [
        "Temba Bavuma", "Quinton de Kock", "Rassie van der Dussen", "Aiden Markram", "David Miller",
        "Heinrich Klaasen", "Dwaine Pretorius", "Kagiso Rabada", "Lungi Ngidi", "Tabraiz Shamsi", "Marco Jansen"
    ],
    team6: [
        "Kane Williamson", "Devon Conway", "Martin Guptill", "Daryl Mitchell", "Glenn Phillips",
        "James Neesham", "Mitchell Santner", "Lockie Ferguson", "Trent Boult", "Kyle Jamieson", "Ish Sodhi"
    ],
    team7: [
        "Dasun Shanaka", "Kusal Mendis", "Pathum Nissanka", "Charith Asalanka", "Bhanuka Rajapaksa",
        "Wanindu Hasaranga", "Dhananjaya de Silva", "Mahesh Theekshana", "Chamika Karunaratne", "Lahiru Kumara", "Hasitha Fernando"
    ],
    team8: [
        "Shakib Al Hasan", "Tamim Iqbal", "Mushfiqur Rahim", "Mahmudullah", "Litton Das",
        "Afif Hossain", "Mohammad Saifuddin", "Mustafizur Rahman", "Taskin Ahmed", "Shariful Islam", "Nasum Ahmed"
    ],
    team9: [
        "Shai Hope", "Nicholas Pooran", "Chris Gayle", "Kieron Pollard", "Dwayne Bravo",
        "Jason Holder", "Andre Russell", "Alzarri Joseph", "Oshane Thomas", "Kemar Roach", "Obed McCoy"
    ],
    team10: [
        "Hashmatullah Shahidi", "Rahmat Shah", "Asghar Afghan", "Najibullah Zadran", "Mohammad Nabi",
        "Rashid Khan", "Mujeeb Ur Rahman", "Dawlat Zadran", "Fareed Ahmad", "Karim Janat", "Ibrahim Zadran"
    ],
    team11: [
        "Craig Ervine", "Sean Williams", "Sikandar Raza", "Brendan Taylor", "Richmond Mutumbami",
        "Wellington Masakadza", "Kyle Jarvis", "Tendai Chatara", "Regis Chakabva", "Tinashe Kamunhukamwe", "Donald Tiripano"
    ]
};

const Playing11 = () => {
    const location = useLocation();
    const { player1Team, player2Team } = location.state || {};

    const [team1EditIndex, setTeam1EditIndex] = useState(null);
    const [team2EditIndex, setTeam2EditIndex] = useState(null);

    const [team1PlayerName, setTeam1PlayerName] = useState("");
    const [team2PlayerName, setTeam2PlayerName] = useState("");

    const navigate = useNavigate();

    const handleEditPlayer = (teamNumber, index) => {
        if (teamNumber === 1) {
            setTeam1EditIndex(index);
            setTeam1PlayerName(teamPlayers[`team${player1Team.id}`]?.[index] || "");
        } else if (teamNumber === 2) {
            setTeam2EditIndex(index);
            setTeam2PlayerName(teamPlayers[`team${player2Team.id}`]?.[index] || "");
        }
    };

    const handleSavePlayer = (teamNumber, index) => {
        if (teamNumber === 1) {
            const updatedPlayers = [...teamPlayers[`team${player1Team.id}`]];
            updatedPlayers[index] = team1PlayerName;
            setTeam1EditIndex(null);
        } else if (teamNumber === 2) {
            const updatedPlayers = [...teamPlayers[`team${player2Team.id}`]];
            updatedPlayers[index] = team2PlayerName;
            setTeam2EditIndex(null);
        }
    };

    const handleGoToToss = () => {
        navigate("/toss");  // Adjust the URL to your toss page route
    };

    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {player1Team?.name} vs {player2Team?.name}
            </Typography>

            {/* Team 1 Players */}
            {player1Team && (
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        {player1Team.name}
                    </Typography>
                    {teamPlayers[`team${player1Team.id}`]?.map((player, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                            {team1EditIndex === index ? (
                                <Box>
                                    <TextField
                                        value={team1PlayerName}
                                        onChange={(e) => setTeam1PlayerName(e.target.value)}
                                        variant="outlined"
                                        size="small"
                                        sx={{ mr: 1 }}
                                    />
                                    <Button variant="contained" color="primary" onClick={() => handleSavePlayer(1, index)}>
                                        Save
                                    </Button>
                                </Box>
                            ) : (
                                <>
                                    <Typography variant="body1">{player}</Typography>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        sx={{ ml: 1 }}
                                        onClick={() => handleEditPlayer(1, index)}
                                    >
                                        Edit
                                    </Button>
                                </>
                            )}
                        </Box>
                    ))}
                </Box>
            )}

            {/* Team 2 Players */}
            {player2Team && (
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        {player2Team.name}
                    </Typography>
                    {teamPlayers[`team${player2Team.id}`]?.map((player, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                            {team2EditIndex === index ? (
                                <Box>
                                    <TextField
                                        value={team2PlayerName}
                                        onChange={(e) => setTeam2PlayerName(e.target.value)}
                                        variant="outlined"
                                        size="small"
                                        sx={{ mr: 1 }}
                                    />
                                    <Button variant="contained" color="primary" onClick={() => handleSavePlayer(2, index)}>
                                        Save
                                    </Button>
                                </Box>
                            ) : (
                                <>
                                    <Typography variant="body1">{player}</Typography>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        sx={{ ml: 1 }}
                                        onClick={() => handleEditPlayer(2, index)}
                                    >
                                        Edit
                                    </Button>
                                </>
                            )}
                        </Box>
                    ))}
                </Box>
            )}

            {/* Toss Time Section */}
            <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>
                It's toss time
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoToToss}>
                Go to Toss
            </Button>
        </Container>
    );
};

export default Playing11;