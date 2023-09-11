const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, required: [true, "User undefined"] },
  text: {
    type: String,
    required: [true, "Text undefined"],
  },
});

const Qr = mongoose.model("qr", qrSchema);

module.exports = Qr;
