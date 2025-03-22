const AboutUs = require("../models/about_us_model");

const createAboutUs = async (req, res) => {
  try {
    const aboutUs = new AboutUs(req.body);
    await aboutUs.save();
    return res.status(201).send({
      status: true,
      message: "About Us created successfully",
      data: aboutUs,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getAllAboutUs = async (req, res) => {
  try {
    const aboutUsEntries = await AboutUs.findOne({ status: true });
    if (!aboutUsEntries)
      return res
        .status(404)
        .send({ status: false, message: "About Us  not found" });
    return res.status(200).send({
      status: true,
      message: "About Us  retrieved successfully",
      data: aboutUsEntries,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findById(req.params.id);
    if (!aboutUs)
      return res
        .status(404)
        .send({ status: false, message: "About Us entry not found" });
    return res.status(200).send({
      status: true,
      message: "About Us entry retrieved successfully",
      data: aboutUs,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const updateAboutUs = async (req, res) => {
  try {
    const updatedAboutUs = await AboutUs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAboutUs)
      return res
        .status(404)
        .send({ status: false, message: "About Us entry not found" });
    return res.status(200).send({
      status: true,
      message: "About Us updated successfully",
      data: updatedAboutUs,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createAboutUs,
  getAllAboutUs,
  getAboutUs,
  updateAboutUs,
};
