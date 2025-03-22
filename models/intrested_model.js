const mongoose = require("mongoose")

const intrestedSchema = new mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:false},
    status:{type:String,default:true}
},{timestamps:true})

const Intrested = mongoose.model("intresteds",intrestedSchema)
module.exports = Intrested
