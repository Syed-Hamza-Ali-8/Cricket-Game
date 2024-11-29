import React, { useState } from "react";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateRoom = ({ onRoomCreated }) => {
    const [roomName, setRoomName] = useState("");

    const handleCreateRoom = async () => {
        if (!roomName) return alert("Room name is required!");

        try {
            const docRef = await addDoc(collection(db, "rooms"), {
                roomName,
                players: [],
                createdAt: new Date(),
            });
            onRoomCreated(docRef.id);
        } catch (error) {
            console.error("Error creating room:", error);
        }
    };

    return (
        <div>
            <h2>Create a Game Room</h2>
            <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
            />
            <button onClick={handleCreateRoom}>Create Room</button>
        </div>
    );
};

export default CreateRoom;
