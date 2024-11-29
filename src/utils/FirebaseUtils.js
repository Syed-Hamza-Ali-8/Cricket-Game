import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

// Update game state
export const updateGameState = async (roomId, newState) => {
    try {
        const roomRef = doc(db, "rooms", roomId);
        await updateDoc(roomRef, { ...newState });
    } catch (error) {
        console.error("Error updating game state:", error);
    }
};
