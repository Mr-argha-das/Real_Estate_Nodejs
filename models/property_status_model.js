const mongoose = require("mongoose");

const propertyStatusSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, default: true },
  },
  { timestamps: true }
);

const PropertyStatus = mongoose.model("property-status", propertyStatusSchema);
module.exports = PropertyStatus;
