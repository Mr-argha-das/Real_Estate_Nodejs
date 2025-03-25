const Blog = require("../models/blog_model");

const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    return res
      .status(201)
      .send({ status: true, message: "Blog created successfully", data: blog });
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("category_id");
    if (!blogs)
      return res
        .status(404)
        .send({ status: false, message: "Blogs not found" });
    return res.status(200).send({
      status: true,
      message: "Blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getBlogByTitle = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      seo_title: req.params.seo_title,
    }).populate("category_id");

    if (!blog)
      return res.status(404).send({ status: false, message: "Blog not found" });

    return res.status(200).send({
      status: true,
      message: "Blog retrieved successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

const getBlogsByCategoryId = async (req, res) => {
  try {
    const blogs = await Blog.findOne({
      category_id: req.params.categoryId,
    }).populate("category_id");
    if (!blogs)
      return res
        .status(404)
        .send({ status: false, message: "No blogs found for this category" });
    return res.status(200).send({
      status: true,
      message: "Blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogByTitle,
  getBlogsByCategoryId,
};
