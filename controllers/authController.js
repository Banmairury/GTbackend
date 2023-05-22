const expressJWT = require("express-jwt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ token, username });
  } else {
    return res.status(400).json({ error: "รหัสผ่านไม่ถูกต้อง" });
  }
};

//ตรวจสอบ token
exports.requireLogin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.auth = decoded;
    next();
  });
};
