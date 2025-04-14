const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);


const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// ✅ Add this line to fix the PORT error
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://deeksha:taskmonitor@cluster.8d58phr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("✅ Task Manager API is running");
});