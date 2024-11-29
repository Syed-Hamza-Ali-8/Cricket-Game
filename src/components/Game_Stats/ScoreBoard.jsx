import React from "react";
import { useGame } from "../context/GameContext";

const Scoreboard = () => {
    const { state } = useGame();

    return (
        <div>
            <h3>Score: {state.score}/{state.wickets}</h3>
            <h4>Overs: {state.overs}</h4>
            {state.target && <h4>Target: {state.target}</h4>}
        </div>
    );
};

export default Scoreboard;
