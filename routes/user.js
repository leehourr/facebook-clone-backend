const express = require("express");
const {
  register,
  activateAccount,
  login,
  auth,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  getProfile,
  updateProfilePicture,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  acceptRequest,
  deleteRequest,
  unFriend,
  search,
  addToSearchHistory,
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
router.post("/newpassword", changePassword);
router.get("/:username", authUser, getProfile);
router.put("/updateProfilePicture", authUser, updateProfilePicture);
router.put("/addFriend/:id", authUser, addFriend);
router.put("/cancelRequest/:id", authUser, cancelRequest);
router.put("/follow/:id", authUser, follow);
router.put("/unfollow/:id", authUser, unfollow);
router.put("/acceptRequest/:id", authUser, acceptRequest);
router.put("/unfriend/:id", authUser, unFriend);
router.put("/deleteRequest/:id", authUser, deleteRequest);
router.post("/search/:searchTerm", authUser, search);
router.put("/addToSearchHistory", authUser, addToSearchHistory);

module.exports = router;
