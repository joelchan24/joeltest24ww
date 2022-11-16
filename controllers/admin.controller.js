const mongoose = require("mongoose");
const User = require("../models/User.model");
const { clearRes } = require("../utils/utils");

// read all users
exports.allUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "Admin" } }, {password:0});
    res.status(200).json({users})
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage: "username need to be unique",
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
};

