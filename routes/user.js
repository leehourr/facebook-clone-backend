const express = require("express");
const {
  register,
  activateAccount,
  login,
  auth,
  findUser,
} = require("../controller/user");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.get("/auth", authUser, auth);
router.post("/findUser", resetPass);
router.post("/sendResetPasswordCode", sendResetPasswordCode);

module.exports = router;
