const mongoose = require("mongoose");

const contactQuerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    nationality: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    property_type: {
      type: [String],
      required: false,
    },
    bedroom: {
      type: [String],
      required: false,
    },
    investment_reason: {
      type: [String],
      required: false,
    },
    live_in_uae: {
      type: Boolean,
      required: false,
    },
    resident_uae: {
      type: Boolean,
      required: false,
    },
    acceptedPrivacy: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const ContactQuery = mongoose.model("ContactQuery", contactQuerySchema);
module.exports = ContactQuery;
