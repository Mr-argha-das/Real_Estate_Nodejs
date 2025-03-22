const express = require("express")
const BlogRouter = express()
const blogController = require("../controllers/blog_controller")

BlogRouter.post("/",blogController.createBlog)
BlogRouter.get("/",blogController.getAllBlogs)
BlogRouter.get("/bloggetBycateId/:categoryId",blogController.getBlogsByCategoryId)
BlogRouter.get("/:id",blogController.getBlogById)

module.exports = BlogRouter
