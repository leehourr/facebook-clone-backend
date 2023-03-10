const React = require("../models/React");
const mongoose = require("mongoose");

exports.reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;
    const check = await React.findOne({
      postRef: postId,
      reactBy: mongoose.Types.ObjectId(res.user.id),
    });
    if (check == null) {
      const newReact = new React({
        react: react,
        postRef: postId,
        reactBy: res.user.id,
      });
      await newReact.save();
      return res.status(200).json({ status: "ok", message: "react success" });
    } else {
      if (check.react == react) {
        await React.findByIdAndRemove(check._id);
        return res
          .status(200)
          .json({ status: "ok", message: "removed success" });
      } else {
        await React.findByIdAndUpdate(check._id, {
          react: react,
        });
        return res
          .status(200)
          .json({ status: "ok", message: "update react success" });
      }
    }
    // return res
    //   .status(400)
    //   .json({ status: "!ok", message: "update react success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getReacts = async (req, res) => {
  try {
    const reacts = await React.find({ postRef: req.params.id })
      .populate("reactBy", "first_name last_name picture username")
      .sort({ createdAt: -1 });
    /*
    const check1 = reacts.find(
      (x) => x.reactBy.toString() == req.user.id
    )?.react;
    */
    const check = await React.findOne({
      postRef: req.params.id,
      reactBy: res.user.id,
    });
    return res.json({
      status: "ok",
      reacts,
      check: check?.react,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
