const mongoose = require("mongoose")

const testimonialSchema = new mongoose.Schema({
    name:{type:String,required:true},
    last_villa:{type:String,required:true},
    image:{type:String,required:true},
    profession:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,default:true}
},{timestamps:true})

const Testimonial = mongoose.model("testimonials",testimonialSchema)
module.exports = Testimonial
