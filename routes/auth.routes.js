const router = require("express").Router();

// Auth controllers
const {
  signupProcess,
  loginProcess,
  logoutProcess,
} = require("../controllers/auth.controller");

// Middlewares

//Signup route
router.post("/signup", signupProcess);

//Login route
router.post("/login", loginProcess);

//Logout route
router.get("/logout", logoutProcess);

module.exports = router;
