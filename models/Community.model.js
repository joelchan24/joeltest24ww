const { Schema, model } = require("mongoose");

const communitySchema = new Schema(
  {
    author: {
      type: String,
      default: "anonymous",
    },
    comment: {
      type: String,
      required: [true, "comment is required"],
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Community = model("Community", communitySchema);
module.exports = Community;
