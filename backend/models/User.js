const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  mobile: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['User', 'Admin'], default: 'User' },
  profilePhoto: { type: String, default: "" },
});

module.exports = mongoose.model('User', userSchema);
