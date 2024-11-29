import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBbaiWRc3EXWoBHcKzjUbjaniVQqlWMguQ",
    authDomain: "cricket-game-4268e.firebaseapp.com",
    projectId: "cricket-game-4268e",
    storageBucket: "cricket-game-4268e.firebasestorage.app",
    messagingSenderId: "1050553254015",
    appId: "1:1050553254015:web:0f410f4c46898fe5a5bf4a",
    measurementId: "G-6TQRR5NNY1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };