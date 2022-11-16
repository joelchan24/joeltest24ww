const { Schema, model } = require("mongoose");

const habitSchema = new Schema(
  {
    title: {
      type: String,
      uppercase: true,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      minLength: [40, "add at least 40 characters of description"],
      required: [true, "description is required"],
    },
    reason: {
      type: String,
      required: [true, "please describe a reason to do it"],
    },
    created: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: String,
      default: "Anonymous",
      // type: Schema.Types.ObjectId,
      // ref: "User",
    },
    timeSuggestion:{
      type: String,
      default: "Any Time"
    }
  },
  {
    timestamps: true,
  }
);

const Habit = model("Habit", habitSchema);
module.exports = Habit;
