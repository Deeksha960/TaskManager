const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User');

const upload = multer({ dest: 'uploads/' });

router.put("/:id", upload.single("profilePhoto"), async (req, res) => {
  try {
    const { fullName, mobile, email } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.file) {
      user.profilePhoto = req.file.path;
    }

    user.fullName = fullName || user.fullName;
    user.mobile = mobile || user.mobile;
    user.email = email || user.email;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
