const Developers = require("../models/developers_model");

const createDeveloper = async (req, res) => {
  try {
    console.log(res);
    if (req.file) {
      req.body.image = req.file.path;
    }
    const developers = new Developers(req.body);

    await developers.save();

    return res.status(201).json({
      status: true,
      message: "Developers  created successfully",
      data: developers,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const getAllDevelopers = async (req, res) => {
  try {
    const developer = await Developers.find().sort({ createdAt: -1 });
    if (developer.length === 0)
      return res
        .status(404)
        .send({ status: false, message: "Developers not found" });
    return res.status(200).json({
      status: true,
      message: "Developer retrieved successfully",
      data: developer,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const getDeveloper = async (req, res) => {
  try {
    const developer = await Developers.findById(req.params.id);
    if (!developer) {
      return res
        .status(404)
        .json({ status: false, message: "Developer not found" });
    }
    return res.status(200).json({
      status: true,
      message: "Developer retrieved successfully",
      data: developer,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const updateDeveloper = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const updatedDeveloper = await Developers.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDeveloper)
      return res
        .status(404)
        .json({ status: false, message: "Developer not found" });
    return res.status(200).json({
      status: true,
      message: "Developer updated successfully",
      data: updatedDeveloper,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const deleteDeveloper = async (req, res) => {
  try {
    const deletedDeveloper = await Developers.findByIdAndDelete(req.params.id);
    if (!deletedDeveloper)
      return res
        .status(404)
        .json({ status: false, message: "Developers not found" });
    return res.status(200).json({
      status: true,
      message: "Developers deleted successfully",
      data: deletedDeveloper,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  createDeveloper,
  getAllDevelopers,
  getDeveloper,
  updateDeveloper,
  deleteDeveloper,
};
