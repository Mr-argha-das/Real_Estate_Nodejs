const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
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
    subject: {
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
    acceptedPrivacy: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Query = mongoose.model("Query", querySchema);
module.exports = Query;
