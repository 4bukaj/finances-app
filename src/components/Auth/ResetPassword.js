import React, { useRef, useState, useEffect } from "react";
import "./Signup.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
//MUI IMPORTS
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Box, Button, TextField, Typography } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { motion } from "framer-motion";

export default function Signup() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [inputEmpty, setInputEmpty] = useState("");

  useEffect(() => {
    if (inputEmpty) setLoading(false);
    else setLoading(true);
  }, [inputEmpty]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage(
        "Link to reset the password was sent to your email.  Check your inbox for further instructions"
      );
      setTimeout(function () {
        setMessage("");
      }, 5000);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("User not found");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        default:
          setError(error.message);
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
                Forgot your password?
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "light.main",
                  maxWidth: "350px",
                  marginTop: "20px",
                }}
              >
                Enter your email address used to register and we'll send you a
                link to reset your password.
              </Typography>
              {message && (
                <Alert variant="success" className="reset-password__success">
                  {message}
                </Alert>
              )}
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
                {error ? (
                  <TextField
                    error
                    id="outlined-error-helper-text"
                    label="Email"
                    helperText={error}
                    required
                    inputRef={emailRef}
                    name="email"
                    variant="outlined"
                    type={"email"}
                    onChange={(e) => {
                      setInputEmpty(e.target.value);
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
                      setInputEmpty(e.target.value);
                    }}
                  />
                )}

                <Button
                  endIcon={<RestartAltIcon />}
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
                  RESET PASSWORD
                </Button>
                <Link to="/login" className="link">
                  Already have an account?{" "}
                  <span className="text-highlight__secondary">Log In</span>
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
