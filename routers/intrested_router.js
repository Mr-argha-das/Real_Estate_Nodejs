const express = require("express");
const IntrestRouter = express();
const intrestController = require("../controllers/intrested_controller");
const upload = require("../service/img_service");

IntrestRouter.post(
  "/",
  upload.single("image"),
  intrestController.createIntrested
);
IntrestRouter.get("/", intrestController.getAllIntresteds);
IntrestRouter.get("/:id", intrestController.getInterestById);
IntrestRouter.put("/:id", intrestController.updateInterestById);
IntrestRouter.delete("/:id", intrestController.deleteIntrested);

module.exports = IntrestRouter;
