import React, { useRef, useState } from "react";
import "./Signup.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Incorrect password");
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
        <Box className="auth-form__card">
          <Avatar sx={{ m: 1, bgcolor: "light.main", color: "dark.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ color: "light.main" }}>
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
            <TextField
              required
              inputRef={emailRef}
              name="email"
              label="Email"
              variant="outlined"
              type={"email"}
              InputLabelProps={{ className: "textfield__label" }}
            />

            {error ? (
              <TextField
                error
                id="outlined-error-helper-text"
                label="Password"
                helperText={error}
                required
                inputRef={passwordRef}
                name="password"
                variant="outlined"
                type={"password"}
              />
            ) : (
              <TextField
                required
                id="outlined-basic"
                inputRef={passwordRef}
                name="password"
                label="Password"
                variant="outlined"
                type={"password"}
                InputLabelProps={{ className: "textfield__label" }}
              />
            )}

            <Button
              endIcon={<LoginIcon />}
              type="submit"
              sx={{ marginTop: 3, marginBottom: 3, color: "light.main", padding: "10px" }}
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              LOG IN
            </Button>
            <Link to="/reset-password" className="link">
              Forgot your password? <span className="text-highlight__secondary">Reset</span>
            </Link>
            <Link to="/signup" className="link">
              Need an account? <span className="text-highlight__secondary">Sign Up</span>
            </Link>
          </Box>
        </Box>
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
