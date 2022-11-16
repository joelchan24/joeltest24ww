const router = require("express").Router();
const { verifyToken } = require("../middlewares/index");
const {
  createBoard,
  getBoard,
  updateBoard
} = require("../controllers/visionBoard.controller");

// create vision board route
router.post("/createVision", verifyToken, createBoard);

// read visiopn board route
router.get("/myVision/:id", verifyToken, getBoard);

// update vision board rout
router.patch("/updateMyBoard/:id",verifyToken, updateBoard)

module.exports = router;
