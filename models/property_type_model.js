const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:false},
    description:{type:String,required:true},
    status:{type:String,default:true}
},{timestamps:true})

const PropertyStatus = mongoose.model("property-type",propertySchema)
module.exports = PropertyStatus
