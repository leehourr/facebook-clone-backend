const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const reactionShema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Haha", "Laugh", "Sad", "Like", "Angry"],
      default: null,
    },

    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    background: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reaction", reactionShema);
