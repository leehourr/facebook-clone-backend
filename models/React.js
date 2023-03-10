const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const reactionShema = new mongoose.Schema(
  {
    react: {
      type: String,
      enum: ["Haha", "Laugh", "Sad", "Like", "Angry", "Wow"],
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
