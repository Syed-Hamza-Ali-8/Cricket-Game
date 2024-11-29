import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

// LoginChecker will redirect logged-in users to "/Cricket" 
// and logged-out users will remain on the current page (Login/Signup).
const LoginChecker = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const location = useLocation(); // To preserve the current page URL

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    if (isLoggedIn === null) {
        return <CircularProgress />; // Display loading spinner while checking authentication status
    }

    // If the user is logged in, redirect them to the Cricket page
    if (isLoggedIn) {
        return <Navigate to="/Cricket" state={{ from: location }} />;
    }

    return children; // If the user is not logged in, render children (Login or Signup page)
};

// RouteProtected will redirect non-authenticated users to the Login page ("/").
const RouteProtected = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    if (isLoggedIn === null) {
        return <CircularProgress />; // Display loading spinner while checking authentication status
    }

    if (!isLoggedIn) {
        return <Navigate to="/" />; // Redirect non-logged-in users to the login page
    }

    return children; // Render protected content only if logged in (like Cricket page)
};

export { LoginChecker, RouteProtected };
