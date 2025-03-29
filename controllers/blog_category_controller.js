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

const getBlogCategory = async (req, res) => {
  try {
    const blogCategory = await BlogCategory.findById(req.params.id);
    if (!blogCategory) {
      return res
        .status(404)
        .json({ status: false, message: "BlogCategory not found" });
    }
    return res.status(200).json({
      status: true,
      message: "BlogCategory retrieved successfully",
      data: blogCategory,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const updateBlogCategory = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBlogCategory)
      return res
        .status(404)
        .json({ status: false, message: "BlogCategory not found" });
    return res.status(200).json({
      status: true,
      message: "BlogCategory updated successfully",
      data: updatedBlogCategory,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};

const deleteBlogCategory = async (req, res) => {
  try {
    const deletedBlogCategory = await BlogCategory.findByIdAndDelete(
      req.params.id
    );
    if (!deletedBlogCategory)
      return res
        .status(404)
        .json({ status: false, message: "BlogCategory not found" });
    return res.status(200).json({
      status: true,
      message: "BlogCategory deleted successfully",
      data: deletedBlogCategory,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  createBlogCategory,
  getAllBlogCategories,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
