import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './scoreSlice';

const store = configureStore({
    reducer: {
        score: scoreReducer,
    },
});

export default store;