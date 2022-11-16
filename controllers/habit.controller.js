const mongoose = require("mongoose");
const Habit = require("../models/Habit.model");
const User = require("../models/Habit.model");
const { clearRes } = require("../utils/utils");

// READ all Habits
exports.allHabits = async (req, res) => {
  try {
    const habits = await Habit.find();

    if (!habits) {
      res.status(400).json({ errorMessage: "Habits not found" });
    }
    res.status(200).json({ habits });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    return res.status(500).json({ errorMessage: error.message });
  }
};

// CREATE Habit
exports.addingHabit = async (req, res) => {
  const { title, description, reason, timeSuggestion } = req.body;
  const { username } = req.user;
  try {
    if (!title.length || !description.length || !reason.length)
      return res.status(400).json({
        errorMessage: "don't sent empy fields",
      });

    if (description.length < 40)
      return res.status(400).json({
        errorMessage: "please add at least 40 characters of description",
      });

    const habit = await Habit.create({
      title,
      description,
      reason,
      timeSuggestion,
      author: username,
    });

    const clearHabit = clearRes(habit.toObject());
    res.status(201).json({ habit: clearHabit });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    return res.status(500).json({ errorMessage: error.message });
  }
};

// UPDATE Habit
exports.updateHabit = async (req, res) => {
  const { author, created, ...restHabit } = req.body;
  const { id } = req.params;
  try {
    const habit = await Habit.findById(id);
    if (!habit)
      return res.status(400).json({ errorMessage: "Habit not found" });

    const updatedHabit = await Habit.findByIdAndUpdate(
      id,
      { ...restHabit },
      { new: true }
    );
    const cleanHabit = clearRes(updatedHabit.toObject());
    res.status(200).json({ updatedHabit: cleanHabit });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    return res.status(500).json({ errorMessage: error.message });
  }
};

// DELETE Habit
exports.deleteHabit = async (req, res) => {
  const { id } = req.params;

  try {
    const habit = await Habit.findById(id);
    if (!habit)
      return res.status(400).json({ errorMessage: "habit not found" });

    await habit.remove();
    res.status(200).json({ successMessage: "habit deleted" });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    return res.status(500).json({ errorMessage: error.message });
  }
};
