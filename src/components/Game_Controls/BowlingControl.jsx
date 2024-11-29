import React, { useState } from "react";

const BowlingControls = ({ onBowl, onChangeOver }) => {
    const [overs, setOvers] = useState(0);

    const handleBowl = () => {
        const ballOutcome = Math.random(); // Random outcome (1 or 0 - hit or miss)

        if (ballOutcome < 0.2) {
            // Let's assume 20% chance for getting a wicket
            alert("Wicket!");
            onBowl("wicket");
        } else {
            onBowl("ball");
        }

        if (overs >= 6) {
            setOvers(0);
            onChangeOver(); // Change over after 6 balls
        } else {
            setOvers(overs + 1);
        }
    };

    return (
        <div>
            <h3>Bowling Controls</h3>
            <button onClick={handleBowl}>Bowl</button>
            <div>Overs: {overs}</div>
        </div>
    );
};

export default BowlingControls;
