import React, { createContext, useContext, useReducer } from "react";

// Initial game state
const initialState = {
    score: 0,
    wickets: 0,
    overs: 0,
    target: null,
    isGameOver: false,
};

// Reducer to handle state updates
const gameReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_SCORE":
            return { ...state, score: state.score + action.payload };
        case "ADD_WICKET":
            return { ...state, wickets: state.wickets + 1 };
        case "END_GAME":
            return { ...state, isGameOver: true };
        default:
            return state;
    }
};

// Create Context
const GameContext = createContext();

// Provide Context to Components
export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

// Custom Hook for Context
export const useGame = () => useContext(GameContext);
