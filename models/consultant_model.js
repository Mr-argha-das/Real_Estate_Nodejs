const mongoose = require("mongoose");

const consultantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    email: {
      type: String,
      unique: true,
      trime: true,
      required: true,
    },
    country_code: { type: String, required: true },
    phone: { type: Number, required: true },
    whatapp_number: { type: String, required: false },
    profile_pic: { type: String, required: false },
    status: { type: String, default: true },
  },
  { timestamps: true }
);

const Consultant = mongoose.model("consultants", consultantSchema);
module.exports = Consultant;
