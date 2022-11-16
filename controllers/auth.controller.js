const User = require("../models/User.model");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { clearRes, createJWT } = require("../utils/utils");

// signup controller
exports.signupProcess = async (req, res) => {
  const {
    username,
    password,
    confirmPassword,
    email,
    role,
    firstName,
    lastName,
    visionOne,
    generalVision
  } = req.body;

  try {
    if (
      !username.length ||
      !email.length ||
      !password.length ||
      !confirmPassword.length ||
      !firstName.length ||
      !lastName.length
    )
      return res.status(400).json({ errorMessage: "don't send empty fields" });

    if (password != confirmPassword)
      return res.status(400).json({
        errorMessage: "password and confirm password must match",
      });

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!regex.test(password))
      return res.status(400).json({
        errorMessage:
          "password must contain at least 8 characters, one uppercase letter one lowercase letter and one digit",
      });

    const foundUsername = await User.findOne({ username });
    if (foundUsername)
      return res.status(400).json({ errorMessage: "username not available" });

    const foundEmail = await User.findOne({ email });
    if (foundEmail)
      return res.status(400).json({ errorMessage: "email already exists" });

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      visionOne,
      generalVision
    });

    const [header, payload, signature] = createJWT(user);

    res.cookie("headload", `${header}.${payload}`, {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.cookie("signature", signature, {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    const cleanUser = clearRes(user.toObject());
    res.status(201).json({ user: cleanUser });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage: "username need to be unique!!",
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
};

// login controller
exports.loginProcess = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password || !username.length || !password.length)
      return res.status(400).json({
        errorMessage: "don't send empty fields",
      });

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!regex.test(password))
      return res.status(400).json({
        errorMessage:
          "password must contain at least 8 characters, one uppercase letter one lowercase letter and one digit",
      });

    const user = await User.findOne({ username });
    if (!user || !bcryptjs.compareSync(password, user.password))
      return res.status(400).json({
        errorMessage: "wrong credentials: invalid username or password",
      });

    const [header, payload, signature] = createJWT(user);
    res.cookie("headload", `${header}.${payload}`, {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.cookie("signature", signature, {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const clearUser = clearRes(user.toObject());
    res.status(200).json({ user: clearUser });
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

// logout controller\
exports.logoutProcess = (req, res) => {
  res.clearCookie("headload");
  res.clearCookie("signature");
  res.status(200).json({
    successMessage: "logout success, see you again soon!",
  });
};
