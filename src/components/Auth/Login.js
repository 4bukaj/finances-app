import React, { useRef, useState, useEffect } from "react";
import "./Signup.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
//MUI IMPORTS
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box, Button, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailEmpty, setEmailEmpty] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState("");

  useEffect(() => {
    if (emailEmpty && passwordEmpty) setLoading(false);
    else setLoading(true);
  }, [emailEmpty, passwordEmpty]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setEmailError("");
      setPasswordError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/home");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          setEmailError("Wrong email format");
          break;
        case "auth/user-not-found":
          setEmailError("User not found");
          break;
        case "auth/wrong-password":
          setPasswordError("Wrong password");
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
                Log In
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

                <Button
                  endIcon={<LoginIcon />}
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
                  className="submit-btn"
                >
                  LOG IN
                </Button>
                <Link to="/reset-password" className="link">
                  Forgot your password?{" "}
                  <span className="text-highlight__secondary">Reset</span>
                </Link>
                <Link to="/signup" className="link">
                  Need an account?{" "}
                  <span className="text-highlight__secondary">Sign Up</span>
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
