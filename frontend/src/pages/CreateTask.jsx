import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  LinearProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import API from "../services/api";

export default function CreateTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    progress: 0,
    deadline: "",
  });
  const [photos, setPhotos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (acceptedFiles) => {
    setPhotos((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: handleDrop,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("description", task.description);
    formData.append("progress", task.progress);
    formData.append("deadline", task.deadline);
    formData.append("userId", user._id);
    photos.forEach((photo) => formData.append("photos", photo));

    try {
      await API.post("/tasks", formData);
      alert("🎉 Task created successfully!");
      window.location.href = user?.role === "Admin" ? "/admin" : "/user";
    } catch (err) {
      alert("❌ Error creating task: " + err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(to right, #fceabb, #f8b500)",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#3c3c3c",
            textShadow: "1px 1px #ffffff",
          }}
        >
          ✨ Create New Task
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={task.title}
            onChange={handleChange}
            variant="outlined"
            sx={{ backgroundColor: "#fff", borderRadius: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={task.description}
            onChange={handleChange}
            variant="outlined"
            sx={{ backgroundColor: "#fff", borderRadius: 2 }}
          />
          <TextField
            label="Progress (%)"
            name="progress"
            type="number"
            fullWidth
            margin="normal"
            inputProps={{ min: 0, max: 100 }}
            value={task.progress}
            onChange={handleChange}
            variant="outlined"
            sx={{ backgroundColor: "#fff", borderRadius: 2 }}
          />

          <LinearProgress
            variant="determinate"
            value={Number(task.progress)}
            sx={{
              mt: 1,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#ddd",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(to right, #00c6ff, #0072ff)",
              },
            }}
          />

          <TextField
            label="Deadline"
            name="deadline"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={task.deadline}
            onChange={handleChange}
            variant="outlined"
            sx={{ backgroundColor: "#fff", borderRadius: 2 }}
          />

          {/* Dropzone */}
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #333",
              bgcolor: "#fff",
              padding: "20px",
              mt: 3,
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "#f0f0f0",
              },
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="body1" color="text.secondary">
              📂 Drag & drop photos here, or click to browse
            </Typography>
          </Box>

          {/* Photo preview */}
          {photos.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Selected Photos:</Typography>
              {photos.map((file, index) => (
                <Typography key={index} variant="body2">
                  📷 {file.name}
                </Typography>
              ))}
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "16px",
              background: "linear-gradient(to right, #36d1dc, #5b86e5)",
              color: "#fff",
              borderRadius: 3,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "linear-gradient(to right, #5b86e5, #36d1dc)",
              },
            }}
          >
            🚀 Submit Task
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
