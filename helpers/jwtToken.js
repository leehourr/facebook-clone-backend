const jwt = required("jsonwebtoken");

exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expired });
};
