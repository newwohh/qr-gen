const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please type name"],
  },
  email: {
    type: String,
    required: [true, "Please type E-Mail"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please type password"],
    minlength: 8,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
