const express = require("express");
const {
  createService,
  getAllServices,
  getServiceById,
  deleteServiceById,
  updateServiceById,
} = require("../controllers/service_controllers");

const ServieRouter = express();

// Routes
ServieRouter.post("/", createService);
ServieRouter.get("/", getAllServices);
ServieRouter.get("/:id", getServiceById);
ServieRouter.put("/:id", updateServiceById);
ServieRouter.delete("/:id", deleteServiceById);

module.exports = ServieRouter;
