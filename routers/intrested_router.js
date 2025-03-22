const express = require("express");
const IntrestRouter = express();
const intrestController = require("../controllers/intrested_controller");
const upload = require("../service/img_service")



IntrestRouter.post("/", upload.single("image"),intrestController.createIntrested);
IntrestRouter.get("/", intrestController.getAllIntresteds);
IntrestRouter.put("/:id",upload.single("image"), intrestController.updateIntrested);
IntrestRouter.delete("/:id", intrestController.deleteIntrested);

module.exports = IntrestRouter
