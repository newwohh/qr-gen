const Qr = require("../models/qrModel");
const User = require("../models/userModel");

exports.getQr = async (req, res) => {
  try {
    const data = await Qr.find({ user: req.params.id });

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "error get failed",
    });
  }
};

exports.createQr = async (req, res) => {
  try {
    const data = {
      user: req.params.id,
      text: req.body.text,
    };

    const qrData = await Qr.create(data);

    res.status(200).json({
      status: "success",
      data: qrData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "error create failed",
    });
  }
};

exports.deleteQr = async (req, res, next) => {
  let id = req.params.id;

  const doc = await Qr.findByIdAndDelete(id);

  if (!doc) {
    return res.status(404).json({ message: "Subscription not found" });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });

  next();
};

exports.updateQr = async (req, res, next) => {
  let id = req.params.id;
  const text = req.body.text;

  try {
    const doc = await Qr.findOneAndUpdate(
      { _id: id },
      { text: text },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "success",
      data: doc,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "error get failed",
    });
  }
};
