const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/jwtToken");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address is already existed, Try with a different email address",
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must between 3 and 30 characters.",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "last name must between 3 and 30 characters.",
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be atleast 6 characters.",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    // console.log(cryptedPassword);
    let tempUsername = first_name + last_name;
    let userName = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: userName,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user.id.toString() },
      "1d"
    );
    //   console.log(emailVerificationToken);
    //   res.json(user);
    // } catch (error) {
    //   res.status(500).json({ message: error.message });
    // }
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.SECRET_KEY);
  const check = await User.findById(user.id);
  if (check.verified === true) {
    return res.status(400).json({ message: "This email is already activated" });
  }
  await User.findByIdAndUpdate(user.id, { verified: true });
  return res
    .status(200)
    .json({ message: "Account has been activated successfully." });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "the email address you entered is not connected to an account.",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials.Please try again.",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserData = async (req, res) => {
  try {
    // let tmp = req.header("Authorization");
    return res.status(200).json({ message: "yes" });

    // const token = tmp ? tmp.slice(7, tmp.length) : "";
    // if (!token) {
    //   return res.status(400).json({ message: "Invalid Authentification" });
    // }
    // jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    //   if (err) {
    //     return res.status(400).json({ message: "Invalid Authentification" });
    //   }
    //   req.user = user;
    //   next();
    // });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.auth = async (req, res) => {
  // console.log(res.locals.user);
  // console.log(res.user.id);
  // return res.status(200).json({ uid: res.user.id, token: req.body.token });
  try {
    const id = res.user.id;
    const user = await User.findById(id);
    if (id) return res.status(200).json({ user_data: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.resetPass = async (req, res) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(200).json({ data: foundUser });
    }
    return res.status(400).json({ message: "No Search Results" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
