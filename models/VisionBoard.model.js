const { Schema, model } = require("mongoose");

const visionSchema = new Schema(
  {
    visionOne: {
      type: String,
      default:
        "https://res.cloudinary.com/duavnrhnp/image/upload/v1662654664/5t_nn3gee.png",
    },
    visionTwo: {
      type: String,
      default:
        "https://res.cloudinary.com/duavnrhnp/image/upload/v1662654665/6t_gerhmy.png",
    },
    visionThree: {
      type: String,
      default:
        "https://res.cloudinary.com/duavnrhnp/image/upload/v1662654664/7t_g6e7li.png",
    },
    generalVision: {
      type: String,
      default:
        "Use this space to motivate yourself, add photos related to your goals and remember to edit this text for something you like to be reading to inspire you :) ",
    },
  },
  {
    timestamps: true,
  }
);

const VisionBoard = model("VisionBoard", visionSchema);
module.exports = VisionBoard;
