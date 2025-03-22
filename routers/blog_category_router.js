const express = require("express")
const BlogCategoryRouter = express()
const blogCategoryController = require("../controllers/blog_category_controller")

BlogCategoryRouter.post("/",blogCategoryController.createBlogCategory)
BlogCategoryRouter.get("/",blogCategoryController.getAllBlogCategories)
 
module.exports = BlogCategoryRouter
