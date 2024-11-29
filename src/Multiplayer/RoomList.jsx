import React, { useEffect, useState } from "react";
import { db } from "../config/firebase"; // Firebase DB
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            const roomCollection = await getDocs(collection(db, "rooms"));
            setRooms(roomCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchRooms();
    }, []);

    const joinRoom = (roomId) => {
        navigate(`/match/${roomId}`);
    };

    return (
        <div>
            <h2>Available Rooms</h2>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        <button onClick={() => joinRoom(room.id)}>{room.roomName}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;
