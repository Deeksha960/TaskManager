import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import AdminCalendar from "./pages/AdminCalendar";
import UserCalendar from "./pages/UserCalendar";
import CreateTask from "./pages/CreateTask";
import Logout from "./pages/Logout";

import {
  CssBaseline,
  IconButton,
  Tooltip,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#121212" : "#f4f7fa",
        paper: darkMode ? "#1e1e1e" : "#fff",
      },
    },
    typography: {
      fontFamily: `'Inter', 'Roboto', sans-serif`,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "all 0.3s ease-in-out",
            background: darkMode
              ? "linear-gradient(135deg, #1f1f1f, #121212)"
              : "linear-gradient(135deg, #f0f4ff, #ffffff)",
          },
        },
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Toast Container Styling */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />

      {/* Glowing Mode Toggle */}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
          backdropFilter: "blur(8px)",
          borderRadius: "50%",
          boxShadow: darkMode
            ? "0 0 12px rgba(255,255,255,0.2)"
            : "0 0 10px rgba(0,0,0,0.1)",
          backgroundColor: darkMode ? "#2c2c2c" : "#ffffffcc",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Tooltip
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          arrow
        >
          <IconButton onClick={toggleDarkMode} color="primary">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Router Pages */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-calendar" element={<AdminCalendar />} />
          <Route path="/user-calendar" element={<UserCalendar />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
