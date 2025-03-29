const express = require("express");
const BlogCategoryRouter = express();
const blogCategoryController = require("../controllers/blog_category_controller");

BlogCategoryRouter.post("/", blogCategoryController.createBlogCategory);
BlogCategoryRouter.get("/", blogCategoryController.getAllBlogCategories);
BlogCategoryRouter.get("/:id", blogCategoryController.getBlogCategory);
BlogCategoryRouter.put("/:id", blogCategoryController.updateBlogCategory);
BlogCategoryRouter.delete("/:id", blogCategoryController.deleteBlogCategory);

module.exports = BlogCategoryRouter;
