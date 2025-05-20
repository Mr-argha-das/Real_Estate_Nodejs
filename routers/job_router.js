const express = require("express");
const JobRouter = express();
const jobController = require("../controllers/job_controller");

JobRouter.post("/", jobController.createJob);
JobRouter.get("/", jobController.getJobs);
JobRouter.get("/:id", jobController.getJobById);
JobRouter.put("/:id", jobController.updateJob);
JobRouter.delete("/:id", jobController.deleteJob);

module.exports = JobRouter;
