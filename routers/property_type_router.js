const express = require("express");
const propertyTypeController = require("../controllers/property_type_controller");
const PropertyTypeRouter = express();
const upload = require("../service/img_service");

PropertyTypeRouter.post(
  "/",
  upload.single("image"),
  propertyTypeController.createPropertyType
);

PropertyTypeRouter.get("/", propertyTypeController.getAllPropertyTypes);
PropertyTypeRouter.get("/:id", propertyTypeController.getPropertyType);

PropertyTypeRouter.put(
  "/:id",
  upload.single("image"),
  propertyTypeController.updatePropertyType
);

PropertyTypeRouter.delete("/:id", propertyTypeController.deletePropertyType);

module.exports = PropertyTypeRouter;
