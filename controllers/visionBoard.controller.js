const mongoose = require("mongoose");
const VisionBoard = require("../models/VisionBoard.model");
const { clearRes } = require("../utils/utils");

// CREATE community board
exports.createBoard = async (req, res) => {
  const { visionOne, visionTwo, visionThree, generalVision } = req.body;
  try {
    if (!generalVision.length)
      return res.status(400).json({
        errorMessage: "don't send empty fields",
      });

    if (generalVision.length < 50)
      return res.status(400).json({
        errorMessage:
          "Please explain the vision board with at least 50 characters",
      });

    const board = await VisionBoard.create({
      generalVision,
      visionOne,
      visionTwo,
      visionThree,
    });

    const cleanBoard = clearRes(board.toObject());

    res.status(200).json({
      board: cleanBoard,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });
    return res.status(500).json({ errorMessage: error.message });
  }
};

// READ community board
exports.getBoard = async (req, res) => {
  const { id } = req.params;

  try {
    const board = await VisionBoard.findById(id);

    if (!board)
      return res.status(400).json({
        errorMessage: "Vision Board not found",
      });

    const cleanBoard = clearRes(board.toObject());
    return res.status(200).json({
      board: cleanBoard,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Update community board
exports.updateBoard = async (req, res) => {
  const { visionOne, visionTwo, visionThree, generalVision } = req.body;
  const { id } = req.params;
  try {
    const visionBoard = await VisionBoard.findById(id);

    if (!visionBoard)
      return res.status(400).json({
        errorMessage: "Vision Board not found",
      });

    if (
      !visionOne.length ||
      !visionTwo.length ||
      !visionThree.length ||
      !generalVision.length
    )
      return res.status(400).json({
        errorMessage: "don't send empty fields",
      });

    if (generalVision.length < 50)
      return res.status(400).json({
        errorMessage:
          "Please explain the vision board with at least 50 characters",
      });

    const updateBoard = await VisionBoard.findByIdAndUpdate(
      id,
      {
        visionOne,
        visionTwo,
        visionThree,
        generalVision,
      },
      { new: true }
    );

    const cleanBoard = clearRes(updateBoard.toObject());
    res.status(200).json({ updateBoard: cleanBoard });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    return res.status(500).json({ errorMessage: error.message });
  }
};
