import React, { useState } from "react";

const BattingControls = ({ onHit, onRun }) => {
    const [runs, setRuns] = useState(0);

    const handleHit = () => {
        const hitResult = Math.floor(Math.random() * 6); // Random hit outcome (0-6)
        onHit(hitResult); // Pass result to parent (game logic)
        setRuns(runs + hitResult);
    };

    const handleRun = () => {
        onRun(1); // Each run increments score by 1 (can be changed)
        setRuns(runs + 1);
    };

    return (
        <div>
            <h3>Batting Controls</h3>
            <button onClick={handleHit}>Hit</button>
            <button onClick={handleRun}>Run</button>
            <div>Runs: {runs}</div>
        </div>
    );
};

export default BattingControls;
