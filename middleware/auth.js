const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    let tmp = req.header("Authorization");

    const token = tmp ? tmp.slice(7, tmp.length) : "";

    if (!token) {
      return res.status(400).json({ message: "Invalid Authentification" });
    }

    // return res.status(200).json({ message: token });
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Authentification" });
      }
      res.user = user;
      console.log("in middleware", user);
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
