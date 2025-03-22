const mongoose = require("mongoose")

const blogCategorySchema = new mongoose.Schema({
    title:{type:String,required:true},
    status:{type:String,default:true}
},{timestamps:true})

const BlogCategory = mongoose.model("blog-categories",blogCategorySchema)
module.exports = BlogCategory
