const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    seo_title: { type: String, required: true },
    seo_description: { type: String, required: true },
    description: { type: String, required: true },
    table_content: { type: String, required: true },
    refernce_number: { type: String, required: true },
    permit_number: { type: String, required: true },
    property_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property-type",
      required: true,
    },
    property_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property-status",
      required: true,
    },
    developers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "developers",
      required: false,
      default: null,
    },
    communities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "communities",
      required: false,
      default: null,
    },

    consultant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consultants",
      required: true,
    },
    price: { type: String, required: true },
    features: [
      {
        title: { type: String, required: true },
        features_img: { type: String },
      },
    ],
    amenities: [
      {
        title: { type: String, required: true },
        amenities_img: { type: String },
      },
    ],
    near_by: [
      {
        title: { type: String, required: true },
        sub_title: { type: String, required: true },
        near_by_img: { type: String },
      },
    ],
    beds: { type: String, required: true },
    shower: { type: String, required: true },
    sqr_foot: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },

    old_permit_image: { type: String, required: true },
    old_permit_number: { type: String, required: true },
    old_permit_description: { type: String, required: true },
    comerical: { type: Boolean, required: false },
    metro: { type: Boolean, required: false },
    off_plan: { type: Boolean, required: false },
    video: { type: String, required: false },
    image: [
      {
        image: { type: String, required: true },
      },
    ],
    location: { type: String, required: true },

    status: { type: String, default: true },
  },
  { timestamps: true }
);

const Property = mongoose.model("property", propertySchema);
module.exports = Property;
