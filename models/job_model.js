const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: String,
  location: String,
  experience: String,
  description: String,
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
