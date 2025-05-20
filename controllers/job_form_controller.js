// controller/jobApplicationController.js
const JobApplication = require("../models/job_form_model");

const createApplication = async (req, res) => {
  try {
    const application = new JobApplication(req.body);
    await application.save();
    res
      .status(201)
      .json({ message: "Application submitted", data: application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.status(200).json({ data: applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    await JobApplication.findByIdAndDelete(id);
    res.status(200).json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  deleteApplicationById,
};
