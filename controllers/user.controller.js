const mongoose = require("mongoose");
const User = require("../models/User.model");
const { clearRes } = require("../utils/utils");

// READ profile
exports.getLoggedUser = (req, res) => {
  res.status(200).json({ user: req.user });
};

// READ other user
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({
        errorMessage: "Error",
      });

    return res.status(500).json({ errorMessage: error.message });
  }
};

// UPDATE profile
exports.editProfile = async (req, res) => {
  const { role, password, ...restUser } = req.body;
  const { _id } = req.user;
  

  try {
  const user = await User.findById(_id)
  if(!user) return res.status(400).json({
    errorMessage: "User not found"
  })

  const updateUser = await User.findByIdAndUpdate(_id, {...restUser}, {new:true})

    const cleanUser = clearRes(updateUser.toObject());
    res.status(200).json({ updateUser: cleanUser });

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({
        errorMessage: "Error",
      });
    return res.status(500).json({ errorMessage: error.message });
  }
};

// DELETE profile
exports.deleteProfile = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findByIdAndRemove(_id);
    res.clearCookie("headload");
    res.clearCookie("signature");
    res.status(200).json({ successMessage: `${user.username} removed` });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({
        errorMessage: "Error",
      });

    return res.status(500).json({ errorMessage: error.message });
  }
};
