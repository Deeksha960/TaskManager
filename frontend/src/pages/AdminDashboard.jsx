import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  InputLabel, // ✅ This one was missing
  TextField,
  Chip,
  Tooltip,
  Avatar,
  Menu,
  Switch
} from "@mui/material";

import { Link } from "react-router-dom";
import {
  Delete,
  CheckCircle,
  Cancel,
  AccountCircle,
  Logout,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import API from "../services/api";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks", {
          params: {
            status: statusFilter,
            user: userFilter,
            date: dateFilter,
          },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [statusFilter, userFilter, dateFilter]);

  const handleApprove = async (taskId) => {
    try {
      await API.put(`/tasks/approve/${taskId}`);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: "approved" } : task
        )
      );
      toast.success("Task approved!");
    } catch {
      toast.error("Error approving task");
    }
  };

  const handleReject = async (taskId) => {
    try {
      await API.put(`/tasks/reject/${taskId}`);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: "rejected" } : task
        )
      );
      toast.error("Task rejected!");
    } catch {
      toast.error("Error rejecting task");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.success("Task deleted!");
    } catch {
      toast.error("Error deleting task");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
    // Here you can add logic to switch themes (e.g., add a theme provider if needed)
  };

  return (
    <Container sx={{ py: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          background: darkMode ? "#2c2c2c" : "linear-gradient(135deg, #f0f4ff, #ffffff)",
        }}
      >
        {/* Top-right icons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          {/* Dark Mode Toggle (Small switch) */}
          <Tooltip title="Toggle Dark Mode">
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                  name="darkMode"
                  color="default"
                />
              }
              label=""
            />
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton component={Link} to="/profile" sx={{ color: "#1976d2" }}>
              <AccountCircle />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              onClick={() => (window.location.href = "/logout")}
              sx={{ color: "#1976d2" }}
            >
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 4, fontWeight: "bold", color: darkMode ? "#fff" : "#1976d2" }}
        >
          Admin Dashboard
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>User</InputLabel>
            <Select
              value={userFilter}
              label="User"
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="date"
            label="Date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />
        </Box>
 {/* Navigation */}
 <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}>
          <Button variant="contained" color="primary" component={Link} to="/admin-calendar">Calendar View</Button>
          <Button variant="contained" color="secondary" component={Link} to="/create-task">Create Task</Button>
        </Box>
        {/* Task List */}
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: darkMode ? "#444" : "#f9f9f9",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  borderLeft: `6px solid ${
                    task.status === "approved"
                      ? "#4caf50"
                      : task.status === "rejected"
                      ? "#f44336"
                      : "#ff9800"
                  }`,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {task.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {task.description}
                </Typography>
                <Chip
                  label={task.status.toUpperCase()}
                  color={getStatusColor(task.status)}
                />

                <Box
                  sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}
                >
                  {task.status === "pending" && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<CheckCircle />}
                        onClick={() => handleApprove(task._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<Cancel />}
                        onClick={() => handleReject(task._id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(task._id)}
                    sx={{ ml: "auto" }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
