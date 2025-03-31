const mongoose = require("mongoose");

const preBookSchema = new mongoose.Schema(
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
    property_id: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country_code: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PerBook = mongoose.model("pre_book", preBookSchema);
module.exports = PerBook;
