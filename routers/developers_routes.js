const express = require("express");
const developersController = require("../controllers/developers_controller");
const DeveloperRouter = express();
const upload = require("../service/img_service");

DeveloperRouter.post(
  "/",
  upload.single("image"),
  developersController.createDeveloper
);

DeveloperRouter.get("/", developersController.getAllDevelopers);
DeveloperRouter.get("/:id", developersController.getDeveloper);

DeveloperRouter.put(
  "/:id",
  upload.single("image"),
  developersController.updateDeveloper
);

DeveloperRouter.delete("/:id", developersController.deleteDeveloper);

module.exports = DeveloperRouter;
