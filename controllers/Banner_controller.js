const Banner = require("../models/banner_model");

// Create a new banner
const createBanner = async (req, res) => {
  try {
    const { images, status } = req.body;
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "Images array is required" });
    }
    const banner = new Banner({ images, status });
    await banner.save();
    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ;
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res
        .status(404)
        .json({ status: false, message: "Banner not found" });
    }
    return res.status(200).json({
      status: true,
      message: "Banner retrieved successfully",
      data: banner,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const updateBannerById = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedBanner)
      return res
        .status(404)
        .json({ status: false, message: "Banner not found" });
    return res.status(200).json({
      status: true,
      message: "Banner updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const deleteBannerById = async (req, res) => {
  try {
    const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
    if (!deletedBanner)
      return res
        .status(404)
        .json({ status: false, message: "Banner not found" });
    return res.status(200).json({
      status: true,
      message: "Banner deleted successfully",
      data: deletedBanner,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  createBanner,
  getBanners,
  getBannerById,
  updateBannerById,
  deleteBannerById,
  //   getAllWhyChose,
  //   updateWhyChose,
};
