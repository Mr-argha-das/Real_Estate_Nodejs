const Communities = require("../models/commuinities_model");

const createCommunities = async (req, res) => {
  try {
    console.log(res);
    if (req.file) {
      req.body.image = req.file.path;
    }
    const communities = new Communities(req.body);

    await communities.save();

    return res.status(201).json({
      status: true,
      message: "Communities  created successfully",
      data: communities,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const getAllCommunities = async (req, res) => {
  try {
    const communities = await Communities.find().sort({ createdAt: -1 });
    if (communities.length === 0)
      return res
        .status(404)
        .send({ status: false, message: "Communities not found" });
    return res.status(200).json({
      status: true,
      message: "Communities retrieved successfully",
      data: communities,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const getCommunitie = async (req, res) => {
  try {
    const communitie = await Communities.findById(req.params.id);
    if (!communitie) {
      return res
        .status(404)
        .json({ status: false, message: "Communities not found" });
    }
    return res.status(200).json({
      status: true,
      message: "Communities retrieved successfully",
      data: communitie,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const updateCommunitie = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const communitie = await Communities.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!communitie)
      return res
        .status(404)
        .json({ status: false, message: "Communitie not found" });
    return res.status(200).json({
      status: true,
      message: "Communitie updated successfully",
      data: communitie,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const deleteCommunitie = async (req, res) => {
  try {
    const deletedcommunitie = await Communities.findByIdAndDelete(
      req.params.id
    );
    if (!deletedcommunitie)
      return res
        .status(404)
        .json({ status: false, message: "Communities not found" });
    return res.status(200).json({
      status: true,
      message: "Communities deleted successfully",
      data: deletedcommunitie,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  createCommunities,
  getAllCommunities,
  getCommunitie,
  updateCommunitie,
  deleteCommunitie,
};
