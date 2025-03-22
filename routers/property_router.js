const express = require("express");
const PropertyRouter = express();
const propertyController = require("../controllers/property_controller");
const upload = require("../service/img_service");

PropertyRouter.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "video", maxCount: 5 },
    { name: "amenity_img", maxCount: 5 },
    { name: "near_by_img", maxCount: 5 },
  ]),
  propertyController.createProperty
);

PropertyRouter.get("/getOffPlan", propertyController.getOffPlanProperty);
PropertyRouter.get("/getRandom", propertyController.getRandomProperty);
PropertyRouter.get("/", propertyController.getAllProperties);
PropertyRouter.get("/:id", propertyController.getProperty);

PropertyRouter.put(
  "/:id",
  upload.array("image", 5),
  propertyController.updateProperty
);
PropertyRouter.delete("/:id", propertyController.deleteProperty);

PropertyRouter.post("/upload-file", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res
      .status(200)
      .json({ message: "File uploaded successfully", filePath: req.file.path });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = PropertyRouter;
