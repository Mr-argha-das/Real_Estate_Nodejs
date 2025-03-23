const mongoose = require("mongoose");

const communitiesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    sub_title: { type: String, required: true },
    logo_image: { type: String, required: false },
    image: [
      {
        image: { type: String, required: true },
      },
    ],
    amenities: [
      {
        title: { type: String, required: true },
        amenities_img: { type: String },
      },
    ],
    highlights: [
      {
        title: { type: String, required: true },
        highlights_img: { type: String },
      },
    ],
    description: { type: String, required: true },
    status: { type: String, default: true },
  },
  { timestamps: true }
);

const Communities = mongoose.model("communities", communitiesSchema);
module.exports = Communities;
