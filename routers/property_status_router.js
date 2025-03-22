const express = require("express");
const propertyStatusController = require("../controllers/property_status_controller");
const PropertyStatusRouter = express();
const upload = require("../service/img_service");

PropertyStatusRouter.post(
  "/",
  upload.single("image"),
  propertyStatusController.createPropertyStatus
);
PropertyStatusRouter.get("/", propertyStatusController.getAllPropertyStatuses);
PropertyStatusRouter.get("/:id", propertyStatusController.getPropertyStatus);

PropertyStatusRouter.put(
  "/:id",
  upload.single("image"),
  propertyStatusController.updatePropertyStatus
);
PropertyStatusRouter.delete(
  "/:id",
  propertyStatusController.deletePropertyStatus
);

module.exports = PropertyStatusRouter;
