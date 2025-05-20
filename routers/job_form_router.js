// routes/jobApplicationRoutes.js
const express = require("express");
const jobFormRouter = express();
const jobApplicationController = require("../controllers/job_form_controller");

jobFormRouter.post("/", jobApplicationController.createApplication);
jobFormRouter.get("/", jobApplicationController.getAllApplications);
jobFormRouter.delete("/:id", jobApplicationController.deleteApplicationById);

module.exports = jobFormRouter;
