const express = require("express");
const qrController = require("../controllers/qrController");

const qrRouter = express.Router();

qrRouter.post("/create/:id", qrController.createQr);
qrRouter.get("/:id", qrController.getQr);
qrRouter.put("/:id", qrController.updateQr);
qrRouter.delete("/:id", qrController.deleteQr);

module.exports = qrRouter;
