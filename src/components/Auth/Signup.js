import React, { useRef, useState, useEffect } from "react";
import "./Signup.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
//MUI IMPORTS
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box, Button, TextField, Typography } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { motion } from "framer-motion";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailEmpty, setEmailEmpty] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState("");
  const [password2Empty, setPassword2Empty] = useState("");

  useEffect(() => {
    if (emailEmpty && passwordEmpty && password2Empty) setLoading(false);
    else setLoading(true);
  }, [emailEmpty, passwordEmpty, password2Empty]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setPasswordError("Passwords do not match");
      }
      setEmailError("");
      setPasswordError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/home");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setEmailError("Invalid email address");
          break;
        case "auth/email-already-in-use":
          setEmailError("Email is already taken");
          break;
        case "auth/weak-password":
          setPasswordError("Password needs to be at least 6 characters");
          break;
        default:
          setEmailError(error.message);
          break;
      }
    }
    setLoading(false);
  }

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        width: "100vw",
        margin: 0,
      }}
    >
      <CssBaseline />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={24} square>
        <div className="card-container">
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3, ease: "linear" }}
          >
            <Box className="auth-form__card">
              <Avatar sx={{ m: 1, bgcolor: "light.main", color: "dark.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h4"
                sx={{ color: "light.main" }}
              >
                Sign Up
              </Typography>
              <Box
                className="auth-form__container"
                component="form"
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  mt: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {emailError ? (
                  <TextField
                    error
                    label="Email"
                    helperText={emailError}
                    required
                    inputRef={emailRef}
                    name="email"
                    variant="outlined"
                    type={"email"}
                    onChange={(e) => {
                      setEmailEmpty(e.target.value);
                    }}
                  />
                ) : (
                  <TextField
                    required
                    inputRef={emailRef}
                    name="email"
                    label="Email"
                    variant="outlined"
                    type={"email"}
                    InputLabelProps={{ className: "textfield__label" }}
                    onChange={(e) => {
                      setEmailEmpty(e.target.value);
                    }}
                  />
                )}

                {passwordError ? (
                  <TextField
                    error
                    label="Password"
                    helperText={passwordError}
                    required
                    inputRef={passwordRef}
                    name="password"
                    variant="outlined"
                    type={"password"}
                    onChange={(e) => {
                      setPasswordEmpty(e.target.value);
                    }}
                  />
                ) : (
                  <TextField
                    required
                    inputRef={passwordRef}
                    name="password"
                    label="Password"
                    variant="outlined"
                    type={"password"}
                    InputLabelProps={{ className: "textfield__label" }}
                    onChange={(e) => {
                      setPasswordEmpty(e.target.value);
                    }}
                  />
                )}

                {passwordError ? (
                  <TextField
                    error
                    helperText={passwordError}
                    label="Confirm Password"
                    variant="outlined"
                    type={"password"}
                    inputRef={passwordConfirmRef}
                    name="confirmpassword"
                    onChange={(e) => {
                      setPassword2Empty(e.target.value);
                    }}
                  />
                ) : (
                  <TextField
                    required
                    inputRef={passwordConfirmRef}
                    name="confirmpassword"
                    label="Confirm Password"
                    variant="outlined"
                    type={"password"}
                    InputLabelProps={{ className: "textfield__label" }}
                    onChange={(e) => {
                      setPassword2Empty(e.target.value);
                    }}
                  />
                )}

                <Button
                  endIcon={<HowToRegIcon />}
                  type="submit"
                  sx={{
                    marginTop: 3,
                    marginBottom: 3,
                    color: "light.main",
                    padding: "10px",
                  }}
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                >
                  CREATE AN ACCOUNT
                </Button>
                <Link to="/login" className="link">
                  Already have an account?{" "}
                  <span className="text-highlight__secondary">Log In</span>
                </Link>
              </Box>
            </Box>
          </motion.div>
        </div>
      </Grid>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: "url(/img/auth_screen_bg.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
