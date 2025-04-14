const express = require('express');
const router = express.Router();
const multer = require('multer');
const Task = require('../models/Task');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ dest: 'uploads/' }); // Configure your upload destination

router.post('/', upload.array('photos', 5), async (req, res) => {
  const { title, description, progress, deadline } = req.body;
  const photos = req.files.map((file) => file.path); // Save the file paths
  try {
    const newTask = new Task({ title, description, progress, deadline, photos });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
    try {
      const { status, user, date } = req.query;
      let filter = {};
  
      // Filter by status (approved, pending, rejected)
      if (status) {
        filter.status = status;
      }
  
      // Filter by user (if provided)
      if (user) {
        filter.user = user;
      }
  
      // Filter by date (if provided)
      if (date) {
        const startDate = new Date();
        let endDate = new Date();
  
        if (date === "today") {
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999);
        } else if (date === "this-week") {
          startDate.setDate(startDate.getDate() - startDate.getDay()); // Start of the week
          endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // End of the week
        } else if (date === "this-month") {
          startDate.setDate(1); // Start of the month
          endDate.setMonth(endDate.getMonth() + 1); // End of the month
          endDate.setDate(0); // Last day of the month
        }
  
        filter.deadline = { $gte: startDate, $lte: endDate };
      }
  
      // Find tasks with the given filter
      const tasks = await Task.find(filter);
      res.json(tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).send("Server Error");
    }
  });

router.put('/approve/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = "approved";
    await task.save();
    res.status(200).json({ message: "Task approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/reject/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = "rejected";
    await task.save();
    res.status(200).json({ message: "Task rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
