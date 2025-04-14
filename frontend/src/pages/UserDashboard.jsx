import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Box,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import {
  Logout,
  CalendarMonth,
  AccountCircle,
  AddCircleOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await API.get(`/tasks/user/${user._id}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error loading tasks:", err);
      }
    };
    fetchUserTasks();
  }, []);

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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          background: "linear-gradient(to right, #fdfbfb, #ebedee)",
          borderRadius: 4,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          flexWrap="wrap"
        >
          <Typography variant="h4" color="primary.dark" gutterBottom>
            📋 Your Tasks
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            onClick={() => (window.location.href = "/logout")}
          >
            Logout
          </Button>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          mb={3}
          useFlexGap
          flexWrap="wrap"
        >
          <Button
            variant="contained"
            startIcon={<CalendarMonth />}
            component={Link}
            to="/user-calendar"
          >
            View Calendar
          </Button>
          <Button
            variant="outlined"
            startIcon={<AccountCircle />}
            component={Link}
            to="/profile"
          >
            View Profile
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            component={Link}
            to="/create-task"
          >
            Create New Task
          </Button>
        </Stack>

        {tasks.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            No tasks found. Create a new one to get started!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task._id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    background: "#fff",
                    boxShadow: 3,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.description}
                    </Typography>
                    <Box mt={2}>
                      <LinearProgress
                        variant="determinate"
                        value={task.progress || 0}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor:
                              task.progress < 50
                                ? "#f39c12"
                                : task.progress < 100
                                ? "#3498db"
                                : "#2ecc71",
                          },
                        }}
                      />
                      <Typography variant="caption">
                        Progress: {task.progress || 0}%
                      </Typography>
                    </Box>
                    <Box mt={1}>
                      <Chip
                        label={`Status: ${task.status}`}
                        color={getStatusColor(task.status)}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
}
