import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    score: 0,  // Total runs scored
    wickets: 0,  // Number of wickets fallen
    isInningComplete: false,  // Whether the inning is complete
    gameId: null,  // Add gameId to the state
};

const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {
        incrementScore: (state, action) => {
            if (!state.isInningComplete) {
                state.score += action.payload;
            }
        },
        incrementWicket: (state) => {
            if (state.wickets < 5 && !state.isInningComplete) {
                state.wickets += 1;
                if (state.wickets === 5) {
                    state.isInningComplete = true;  // End the inning when 5 wickets are lost
                }
            }
        },
        resetScore: (state) => {
            state.score = 0;
            state.wickets = 0;
            state.isInningComplete = false;
        },
        setInningComplete: (state) => {
            state.isInningComplete = true;
        },
        setGameId: (state, action) => {  // Add setGameId action
            state.gameId = action.payload;
        },
    },
});

export const { incrementScore, incrementWicket, resetScore, setInningComplete, setGameId } = scoreSlice.actions;

export default scoreSlice.reducer;