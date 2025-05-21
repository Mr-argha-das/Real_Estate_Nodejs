const express = require("express");
const {
  createService,
  getAllServices,
  getServiceById,
  deleteServiceById,
  updateServiceById,
} = require("../controllers/ServicesPage_controller");

const ServicesPageRouter = express();

// Routes
ServicesPageRouter.post("/", createService);
ServicesPageRouter.get("/", getAllServices);
ServicesPageRouter.get("/:id", getServiceById);
ServicesPageRouter.put("/:id", updateServiceById);
ServicesPageRouter.delete("/:id", deleteServiceById);

module.exports = ServicesPageRouter;
