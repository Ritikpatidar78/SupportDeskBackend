const mongoose = require("mongoose")
const profilemodel = require("./profilemodel")
const ticketmodel = require("./ticketmodel")

const ticketschema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: profilemodel
    },
    ticketid:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: ticketmodel
    },
    note:{
        type: String,
        require: [true,"Please Give The Note"]
    },
    isstaff:{
        type: Boolean,
        require: true,
        default: false,
    },
    staffid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: profilemodel
    },


},{
    timestamps:true
})

module.exports = mongoose.model("notes", ticketschema)