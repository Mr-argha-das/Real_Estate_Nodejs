const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    seo_title: { type: String, required: true },
    seo_description: { type: String, required: true },
    description: { type: String, required: true },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "blog-categories",
      required: true,
    },
    image: { type: String, required: true },
    status: { type: String, default: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blogs", blogSchema);
module.exports = Blog;
