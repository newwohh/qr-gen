const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

function validateUser(user) {
  if (
    !user.username ||
    !user.email ||
    !user.password ||
    !user.password.length > 8 ||
    !/^(?=.*[A-Z])(?=.*\d)/.test(user.password) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)
  ) {
    return false;
  }

  return true;
}

exports.signup =
  ("/signup",
  async (req, res) => {
    const { username, email, password } = req.body;

    try {
      if (!validateUser(req.body)) {
        return res.status(400).json({ error: "Invalid user data" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      const newUser = { username, email, password };

      const userToDb = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      let id = userToDb._id;

      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
      });

      res.status(201).json({
        message: "User signed up successfully",
        token: token,
        user: userToDb,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({
        message: "User signed up failed",
      });
    }
  });

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loggedUser = await User.findOne({ email });

    if (!loggedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (loggedUser.password === password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res
      .status(200)
      .json({ message: "User logged in successfully", user: loggedUser });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      message: "User not found",
    });
  }
};
