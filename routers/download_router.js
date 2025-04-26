const express = require("express");
const DownloadRouter = express();

const {
  createBrochureRequest,
  getAllBrochureRequests,
  deleteBrochureRequestById,
} = require("../controllers/download_controller");

// Routes
DownloadRouter.post("/", createBrochureRequest);
DownloadRouter.get("/", getAllBrochureRequests);
DownloadRouter.delete("/:id", deleteBrochureRequestById);

module.exports = DownloadRouter;
