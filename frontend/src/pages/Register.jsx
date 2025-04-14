import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  Avatar,
} from "@mui/material";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    role: "User",
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("mobile", form.mobile);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("role", form.role);
    if (form.profilePhoto) formData.append("profilePhoto", form.profilePhoto);

    try {
      await API.post("/auth/register", formData);
      alert("Registered successfully! Please login.");
      window.location.href = "/";
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ffecd2, #fcb69f)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            🎉 Create Your Account
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" mb={3}>
            Fill in your details to register
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              margin="normal"
              value={form.fullName}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              fullWidth
              margin="normal"
              value={form.mobile}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
            />
            <TextField
              label="Role"
              name="role"
              select
              fullWidth
              margin="normal"
              value={form.role}
              onChange={handleChange}
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>

            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: "bold",
                background: "linear-gradient(to right, #ff758c, #ff7eb3)",
                color: "#fff",
                '&:hover': {
                  background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                }
              }}
            >
              Upload Profile Photo
              <input
                type="file"
                name="profilePhoto"
                hidden
                accept="image/*"
                onChange={handleChange}
              />
            </Button>

            {form.profilePhoto && (
              <Avatar
                src={URL.createObjectURL(form.profilePhoto)}
                alt="Preview"
                sx={{ width: 64, height: 64, mt: 2, mx: "auto" }}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                background: "linear-gradient(to right, #43cea2, #185a9d)",
                color: "#fff",
                '&:hover': {
                  background: "linear-gradient(to right, #11998e, #38ef7d)",
                }
              }}
            >
              Register
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <a
                href="/"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Login here
              </a>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
