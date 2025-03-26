const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    images: { type: [String], required: true },
    status: { type: Boolean, default: true }, // Changed to Boolean
  },
  { timestamps: true }
);

const Banner = mongoose.model("banner", BannerSchema); // Capitalized model name for consistency
module.exports = Banner;
