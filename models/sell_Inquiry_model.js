const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    countryCode: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    query: { type: String, required: true },
  },
  { timestamps: true }
);
const Inquiry = mongoose.model("Sell_Inquiry", inquirySchema);

module.exports = Inquiry;
