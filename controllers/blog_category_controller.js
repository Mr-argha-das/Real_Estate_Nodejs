const BlogCategory = require("../models/blog_category_model");

const createBlogCategory = async (req, res) => {
  try {
    const blogCategory = new BlogCategory(req.body);
    await blogCategory.save();
    return res.status(201).send({
      status: true,
      message: "Blog category created successfully",
      data: blogCategory,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getAllBlogCategories = async (req, res) => {
  try {
    const blogCategories = await BlogCategory.find().sort({ createdAt: -1 });
    if (!blogCategories)
      return res
        .status(404)
        .send({ status: false, message: "Blog categories not found" });
    return res.status(200).send({
      status: true,
      message: "Blog categories retrieved successfully",
      data: blogCategories,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createBlogCategory,
  getAllBlogCategories,
};
