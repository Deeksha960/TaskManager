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
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "react-toastify";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import API from "../services/api";

const UserCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await API.get("/tasks", {
          params: { status: statusFilter },
        });
        setTasks(response.data);
      } catch {
        toast.error("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [statusFilter]);

  const getEvents = () =>
    tasks.map((task) => ({
      title: task.title,
      date: task.deadline,
      color:
        task.status === "approved"
          ? "#4caf50"
          : task.status === "rejected"
          ? "#f44336"
          : "#ff9800",
      textColor: "#fff",
    }));

  return (
    <Container maxWidth="lg" sx={{ pb: 5 }}>
      {/* HEADER */}
      <Box
        sx={{
          mt: 4,
          mb: 3,
          borderRadius: 3,
          p: 4,
          background: "linear-gradient(135deg, #42a5f5, #478ed1)",
          color: "white",
          boxShadow: 3,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          📅 My Tasks Calendar
        </Typography>
        <Typography variant="subtitle1">
          View your tasks by status...
        </Typography>
      </Box>

      {/* FILTER SECTION */}
      <Paper
  elevation={2}
  sx={{
    borderRadius: 2,
    p: 2,
    mb: 4,
    backgroundColor: "#ffffffee",
    backdropFilter: "blur(4px)",
  }}
>
  <Grid container spacing={2} alignItems="center">
    <Grid item>
      <FilterAltIcon color="primary" />
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <FormControl fullWidth size="medium" sx={{ minWidth: 220 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          label="Status"
          MenuProps={{ PaperProps: { style: { maxHeight: 250 } } }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="approved">✅ Approved</MenuItem>
          <MenuItem value="rejected">❌ Rejected</MenuItem>
          <MenuItem value="pending">🕒 Pending</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
</Paper>


      {/* CALENDAR OR LOADING */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress size={50} sx={{ color: "#42a5f5" }} />
        </Box>
      ) : tasks.length > 0 ? (
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 3,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={getEvents()}
            eventClick={(info) => {
              toast.info(`📝 Task: ${info.event.title}`, {
                position: "bottom-right",
              });
            }}
            height="650px"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
          />
        </Box>
      ) : (
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 4, color: "#666", fontStyle: "italic" }}
        >
          😕 No tasks found for the selected status.
        </Typography>
      )}
    </Container>
  );
};

export default UserCalendar;
