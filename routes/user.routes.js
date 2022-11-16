const router = require("express").Router();

// User controllers
const {
  getLoggedUser,
  getUserById,
  editProfile,
  deleteProfile
} = require("../controllers/user.controller");

// middlewares
const { verifyToken } = require("../middlewares/index");

// read user route
router.get("/profile", verifyToken, getLoggedUser);

// read other user route
router.get('/:id/profile',verifyToken, getUserById)

// update user route
router.patch('/edit-profile',verifyToken, editProfile)

// delete user route
router.delete('/delete-profile', verifyToken , deleteProfile)

module.exports = router;
