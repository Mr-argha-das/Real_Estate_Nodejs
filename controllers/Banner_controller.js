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

// findOne({ status: true });
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getAllWhyChose = async (req, res) => {
//   try {
//     const whyChoseEntries = await WhyChose.findOne({ status: true });
//     if (!whyChoseEntries)
//       return res
//         .status(404)
//         .send({ status: false, message: "WhyChooseUs  not found" });
//     return res.status(200).send({
//       status: true,
//       message: "WhyChooseUs retrieved successfully",
//       data: whyChoseEntries,
//     });
//   } catch (error) {
//     console.error("Fetch error:", error);
//     res.status(400).send({ status: false, message: error.message });
//   }
// };

// const updateWhyChose = async (req, res) => {
//   try {
//     if (req.files) {
//       req.body.small_features = req.files.map((file) => file.path); // Update image paths
//     }
//     const updatedWhyChose = await WhyChose.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedWhyChose)
//       return res
//         .status(404)
//         .send({ status: false, message: "Entry not found" });
//     return res.status(200).send({
//       status: true,
//       message: "Entry updated successfully",
//       data: updatedWhyChose,
//     });
//   } catch (error) {
//     console.error("Update error:", error);
//     res.status(400).send({ status: false, message: error.message });
//   }
// };

module.exports = {
  createBanner,
  getBanners,
  //   getAllWhyChose,
  //   updateWhyChose,
};
