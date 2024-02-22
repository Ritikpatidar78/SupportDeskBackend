const mongoose = require("mongoose")
const profilemodel = require("./profilemodel")

const ticketschema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: profilemodel
    },
    name:{
        type:String,
        require: [true,"Please give the name"],
    },
    product:{
        type: String,
        require: [true,"Please give the product"],
        enums: ["Laptop" , "Tablet" , "Phone" ,"Computer"]
    },
    description:{
        type: String,
        require: [true,"Please give the description"]},
    status:{
        type: String,
        require: [true,"Please give the status"],
        enums:["New","Solved","Closed"],
    },
    coverimg:{
        type: String,
        require: [true,"Please give the img"]},

},{
    timestamps:true
})

module.exports = mongoose.model("tickets", ticketschema)