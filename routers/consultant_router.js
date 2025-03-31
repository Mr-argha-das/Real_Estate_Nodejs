const express = require("express");
const ConsultantRouter = express();
const consultantController = require("../controllers/consultant_controller");
const upload = require("../service/img_service");

ConsultantRouter.post("/", consultantController.createConsultant);

ConsultantRouter.get("/:id", consultantController.getConsultant);
ConsultantRouter.get("/", consultantController.getAllConsultants);
ConsultantRouter.put(
  "/:id",
  upload.single("profile_pic"),
  consultantController.updateConsultant
);
ConsultantRouter.delete("/:id", consultantController.deleteConsultant);

module.exports = ConsultantRouter;
