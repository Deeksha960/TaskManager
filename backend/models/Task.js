const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  progress: Number,
  deadline: String,
  photos: [String],
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  adminComment: String,
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
