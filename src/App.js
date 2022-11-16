import React from "react";
import "./App.css";
import Signup from "./components/Auth/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ResetPassword from "./components/Auth/ResetPassword";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChartsDashboard from "./components/Charts/ChartsDashboard";
import About from "./components/About/About";
import Home from "./components/Home/Home";

const theme = createTheme({
  palette: {
    primary: {
      main: "#204254",
    },
    secondary: {
      main: "#B94A3E",
    },
    dark: {
      main: "#121B22",
    },
    light: {
      main: "#E1E7FD",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/charts" element={<ChartsDashboard />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
