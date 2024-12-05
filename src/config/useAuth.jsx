import { useContext, createContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

// Create an Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Optionally, add a spinner or placeholder
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access Auth Context
export const useAuth = () => useContext(AuthContext);
