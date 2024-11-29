import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const handleTogglePassword = () => setShowPassword(!showPassword);

    // Check if the user is already logged in on initial render
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);  // User is logged in
                navigate("/Cricket"); // Redirect to /Cricket if already logged in
            } else {
                setIsLoggedIn(false); // User is not logged in
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        const email = data.email.trim();
        const password = data.password.trim();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            navigate("/Cricket"); // Redirect to /Cricket after successful login
        } catch (err) {
            setLoading(false);
            if (err.code === "auth/user-not-found") {
                setError("No user found with this email. Please sign up first.");
            } else if (err.code === "auth/wrong-password") {
                setError("Incorrect password. Please try again.");
            } else {
                setError("Invalid Credentials or user not registered yet");
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundImage: 'url("/loginImg.jpeg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <Box
                    sx={{
                        maxWidth: 400,
                        mx: "auto",
                        p: 3,
                        boxShadow: 3,
                        borderRadius: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        textAlign: "center",
                        width: "100%",
                        position: "relative",
                    }}
                >
                    {loading && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 10,
                                borderRadius: 2,
                            }}
                        >
                            <CircularProgress color="success" />
                        </Box>
                    )}
                    <Typography variant="h4" gutterBottom>
                        <SportsCricketIcon fontSize="large" sx={{ color: "green" }} /> Login
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters long" },
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button type="submit" variant="contained" color="success" fullWidth disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                    <Typography sx={{ mt: 2 }}>
                        Don't have an account?
                        <Link to="/signup">
                            <Button variant="text" color="success">
                                Signup
                            </Button>
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    );
};

export default Login;
