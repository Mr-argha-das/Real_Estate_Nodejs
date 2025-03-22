const mongoose = require("mongoose")

const aboutUsSchema = new mongoose.Schema({
    long_description:{type:String,required:true},
    first_dec:{type:String,required:true},
    second_dec:{type:String,required:true},
    third_dec:{type:String,required:false},
    fourth_dec:{type:String,required:false},
    status:{type:String,default:true}
},{timestamps:true})

const AboutUs = mongoose.model("about-us",aboutUsSchema)
module.exports = AboutUs
