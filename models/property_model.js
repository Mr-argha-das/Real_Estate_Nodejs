const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    seo_title: { type: String, required: true },
    seo_description: { type: String, required: true },
    description: { type: String, required: true },
    refernce_number: { type: String, required: true },
    permit_number: { type: String, required: true },
    property_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property-types",
      required: true,
    },
    property_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property-status",
      required: true,
    },
    consultant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consultants",
      required: true,
    },
    price: { type: String, required: true },
    features: { type: Array, required: true },
    amenities: [
      {
        title: { type: String, required: true },
        amenities_img: { type: String },
      },
    ],
    near_by: [
      {
        title: { type: String, required: true },
        near_by_img: { type: String },
      },
    ],
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    old_permit_number: { type: String, required: true },
    old_permit_description: { type: String, required: true },
    comerical: { type: Boolean, required: true },
    off_plan: { type: Boolean, required: false },
    image: [
      {
        image: { type: String, required: true },
        // video: { type: String },
      },
    ],
    location: { type: String, required: true },

    status: { type: String, default: true },
  },
  { timestamps: true }
);

const Property = mongoose.model("property", propertySchema);
module.exports = Property;
