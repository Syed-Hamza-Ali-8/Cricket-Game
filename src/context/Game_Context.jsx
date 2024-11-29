import React, { createContext, useContext, useReducer } from "react";

const initialState = {
    score: 0,
    wickets: 0,
    overs: 0,
    target: null,
    isGameOver: false,
};

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

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
