import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "react-toastify";
import API from "../services/api";

const AdminCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await API.get("/tasks", {
          params: { status: statusFilter, user: userFilter, date: dateFilter },
        });
        setTasks(response.data);
      } catch {
        toast.error("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [statusFilter, userFilter, dateFilter]);

  const getEvents = () => {
    return tasks.map((task) => ({
      title: task.title,
      date: task.deadline,
      color:
        task.status === "approved"
          ? "#81c784"
          : task.status === "rejected"
          ? "#e57373"
          : "#fff176",
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #42a5f5, #7e57c2)",
          color: "white",
          textAlign: "center",
          boxShadow: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          🎯 Admin Task Calendar
        </Typography>
        <Typography variant="subtitle1">
          Track, filter, and explore user tasks visually.
        </Typography>
      </Box>

      {/* Filters */}
      <Paper
  elevation={4}
  sx={{
    p: 4,
    mb: 4,
    borderRadius: 4,
    backgroundColor: "#f5f7fb",
    boxShadow: 3,
  }}
>
  <Grid container spacing={4} justifyContent="center">
    {/* STATUS FILTER */}
    <Grid item xs={12} md={4}>
      <FormControl fullWidth>
        <InputLabel sx={{ fontSize: "1.1rem" }}>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          label="Status"
          sx={{
            height: 70,
            fontSize: "1.1rem",
            padding: "22px",
          }}
        >
          <MenuItem value="" sx={{ fontSize: "1.1rem" }}>All</MenuItem>
          <MenuItem value="approved" sx={{ fontSize: "1.1rem" }}>✅ Approved</MenuItem>
          <MenuItem value="rejected" sx={{ fontSize: "1.1rem" }}>❌ Rejected</MenuItem>
          <MenuItem value="pending" sx={{ fontSize: "1.1rem" }}>⏳ Pending</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    {/* USER FILTER */}
    <Grid item xs={12} md={4}>
      <FormControl fullWidth>
        <InputLabel sx={{ fontSize: "1.1rem" }}>User</InputLabel>
        <Select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          label="User"
          sx={{
            height: 70,
            fontSize: "1.1rem",
            padding: "16px",
          }}
        >
          <MenuItem value="" sx={{ fontSize: "1.1rem" }}>All Users</MenuItem>
          <MenuItem value="user1" sx={{ fontSize: "1.1rem" }}>👤 User 1</MenuItem>
          <MenuItem value="user2" sx={{ fontSize: "1.1rem" }}>👤 User 2</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    {/* DATE FILTER */}
    <Grid item xs={12} md={4}>
      <FormControl fullWidth>
        <InputLabel sx={{ fontSize: "1.1rem" }}>Date</InputLabel>
        <Select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          label="Date"
          sx={{
            height: 70,
            fontSize: "1.1rem",
            padding: "16px",
          }}
        >
          <MenuItem value="" sx={{ fontSize: "1.1rem" }}>All Dates</MenuItem>
          <MenuItem value="today" sx={{ fontSize: "1.1rem" }}>📅 Today</MenuItem>
          <MenuItem value="this-week" sx={{ fontSize: "1.1rem" }}>🗓️ This Week</MenuItem>
          <MenuItem value="this-month" sx={{ fontSize: "1.1rem" }}>📆 This Month</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
</Paper>


      {/* Calendar Display */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Paper
          elevation={5}
          sx={{
            p: 3,
            borderRadius: 4,
            backgroundColor: "white",
            boxShadow: 3,
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={getEvents()}
            height="650px"
            eventClick={(info) => {
              toast.info(`📌 Task: ${info.event.title}`);
            }}
          />
        </Paper>
      )}
    </Container>
  );
};

export default AdminCalendar;
