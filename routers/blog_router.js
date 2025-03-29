const express = require("express");
const BlogRouter = express();
const blogController = require("../controllers/blog_controller");

BlogRouter.post("/", blogController.createBlog);
BlogRouter.get("/", blogController.getAllBlogs);
BlogRouter.get(
  "/bloggetBycateId/:categoryId",
  blogController.getBlogsByCategoryId
);
BlogRouter.get("/seo/:seo_title", blogController.getBlogByTitle);

BlogRouter.get("/:id", blogController.getBlogById);

BlogRouter.put(
  "/:id",
  // upload.single("image"),
  blogController.updateBlogById
);

BlogRouter.delete("/:id", blogController.deleteBlogById);

module.exports = BlogRouter;
