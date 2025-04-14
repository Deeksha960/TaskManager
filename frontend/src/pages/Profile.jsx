import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "",
    mobile: "",
    email: "",
    profilePhoto: "",
  });
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setProfile({
      fullName: user.fullName,
      mobile: user.mobile,
      email: user.email,
      profilePhoto: user.profilePhoto,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setNewProfilePhoto(e.target.files[0]);
  };

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();
    formData.append("fullName", profile.fullName);
    formData.append("mobile", profile.mobile);
    formData.append("email", profile.email);

    if (newProfilePhoto) formData.append("profilePhoto", newProfilePhoto);

    try {
      await API.put(`/users/${user._id}`, formData);
      alert("Profile updated successfully!");
      user.fullName = profile.fullName;
      user.mobile = profile.mobile;
      user.profilePhoto = newProfilePhoto ? URL.createObjectURL(newProfilePhoto) : user.profilePhoto;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/user");
    } catch (err) {
      alert("Error updating profile: " + err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #90caf9, #e1bee7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(to bottom right, #ffffff, #f3f3f3)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#1976d2",
            textShadow: "1px 1px #eee",
          }}
        >
          Edit Profile
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            src={profile.profilePhoto || "/default-avatar.png"}
            sx={{
              width: 100,
              height: 100,
              mb: 2,
              border: "3px solid #1976d2",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />
          <Button
            variant="outlined"
            component="label"
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Change Profile Photo
            <input
              type="file"
              hidden
              onChange={handlePhotoChange}
              accept="image/*"
            />
          </Button>
        </Box>

        <TextField
          label="Full Name"
          name="fullName"
          fullWidth
          margin="normal"
          value={profile.fullName}
          onChange={handleChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <TextField
          label="Mobile"
          name="mobile"
          fullWidth
          margin="normal"
          value={profile.mobile}
          onChange={handleChange}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={profile.email}
          disabled
          sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
        />

        <Button
          variant="contained"
          onClick={handleSave}
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: "bold",
            background: "linear-gradient(to right, #2196f3, #9c27b0)",
            ":hover": {
              background: "linear-gradient(to right, #1e88e5, #8e24aa)",
            },
          }}
        >
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
}
