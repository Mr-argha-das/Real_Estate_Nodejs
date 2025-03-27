const express = require("express");
const {
  createService,
  getAllServices,
  getServiceById,
  deleteServiceById,
} = require("../controllers/service_controllers");

const ServieRouter = express();

// Routes
ServieRouter.post("/", createService);
ServieRouter.get("/", getAllServices);
ServieRouter.get("/:id", getServiceById);
ServieRouter.delete("/:id", deleteServiceById);

module.exports = ServieRouter;
