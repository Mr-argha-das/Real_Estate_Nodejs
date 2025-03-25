const WhyChose = require("../models/why_chose_model");

const createWhyChose = async (req, res) => {
  try {
    if (req.files) {
      req.body.small_features = req.files.map((file) => file.path); // Store multiple image paths
    }
    const whyChose = new WhyChose(req.body);
    await whyChose.save();
    return res.status(201).send({
      status: true,
      message: "WhyChose entry created successfully",
      data: whyChose,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getAllWhyChose = async (req, res) => {
  try {
    const whyChoseEntries = await WhyChose.findOne({ status: true });
    if (!whyChoseEntries)
      return res
        .status(404)
        .send({ status: false, message: "WhyChooseUs  not found" });
    return res.status(200).send({
      status: true,
      message: "WhyChooseUs retrieved successfully",
      data: whyChoseEntries,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const updateWhyChose = async (req, res) => {
  try {
    if (req.files) {
      req.body.small_features = req.files.map((file) => file.path); // Update image paths
    }
    const updatedWhyChose = await WhyChose.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWhyChose)
      return res
        .status(404)
        .send({ status: false, message: "Entry not found" });
    return res.status(200).send({
      status: true,
      message: "Entry updated successfully",
      data: updatedWhyChose,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createWhyChose,
  getAllWhyChose,
  updateWhyChose,
};
