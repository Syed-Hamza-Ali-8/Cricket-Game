import React, { useState } from "react";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleTogglePassword = () => setShowPassword(!showPassword);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            // Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                username: data.name,  // Save the name from the form
                email: user.email,
            });

            navigate("/");  // Redirect to the homepage or another page
        } catch (err) {
            console.log(err);
            setError("Signup failed. Email might already be in use or invalid.");
        } finally {
            setLoading(false);
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
                    backgroundImage: 'url("/signupImg.jpg")',
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
                        <SportsCricketIcon fontSize="large" sx={{ color: "green" }} /> Signup
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            {...register("name", { required: "Name is required" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

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
                            {loading ? "Signing up..." : "Signup"}
                        </Button>
                    </form>
                    <Typography sx={{ mt: 2 }}>
                        Already have an account?
                        <Link to="/">
                            <Button variant="text" color="success">
                                Login
                            </Button>
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    );
};

export default Signup;
