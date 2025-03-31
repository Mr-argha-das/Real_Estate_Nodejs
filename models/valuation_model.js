const mongoose = require("mongoose");

const valuationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Valuation = mongoose.model("valuation", valuationSchema);
module.exports = Valuation;
