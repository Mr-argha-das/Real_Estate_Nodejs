const mongoose = require("mongoose");

const developersSchema = new mongoose.Schema(
  {
    image: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: true },
  },
  { timestamps: true }
);

const Developers = mongoose.model("developers", developersSchema);
module.exports = Developers;
