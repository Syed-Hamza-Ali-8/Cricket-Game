import React, { useState, useEffect } from "react";

const Timer = ({ duration = 120, onEnd }) => { // Default to 120 seconds (2 minutes)
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) {
            onEnd(); // Call onEnd when timer reaches 0
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [timeLeft, onEnd]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div>
            <h3>Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
        </div>
    );
};

export default Timer;
