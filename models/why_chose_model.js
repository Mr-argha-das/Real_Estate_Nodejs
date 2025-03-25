const mongoose = require("mongoose");

const whyChoseSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    small_features: { type: Array, required: true },
    status: { type: String, default: true },
  },
  { timestamps: true }
);

const WhyChose = mongoose.model("why-choses", whyChoseSchema);
module.exports = WhyChose;
