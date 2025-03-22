const mongoose = require("mongoose");

const consultantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    email: {
      type: String,
      unique: true,
      trime: true,
      // validate: {
      //   validator: function (v) {
      //     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      //   },
      //   message: "Please enter a valid email",
      // },
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
