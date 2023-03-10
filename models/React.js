const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const reactionShema = new mongoose.Schema(
  {
    react: {
      type: String,
      enum: ["haha", "laugh", "sad", "like", "angry", "wow"],
      require: true,
    },
    postRef: {
      type: ObjectId,
      ref: "Post",
    },

    reactBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("React", reactionShema);
