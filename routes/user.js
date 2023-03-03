const express = require("express");
const {
  register,
  activateAccount,
  login,
  auth,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
} = require("../controller/user");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.get("/auth", authUser, auth);
router.post("/findUser", findUser);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);

module.exports = router;
