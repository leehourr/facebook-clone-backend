const express = require("express");

const router = express.Router();

router.get("/user", (res, req) => {
  res.send("welcome from user");
});

module.exports = router;
