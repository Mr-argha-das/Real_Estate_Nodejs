const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    code: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String },
    resume: { type: String },
    coverLetter: { type: String },
  },
  { timestamps: true }
);

const JobForm = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobForm;
