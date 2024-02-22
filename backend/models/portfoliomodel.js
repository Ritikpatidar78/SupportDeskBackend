const mongoose = require("mongoose")

const PortfolioSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    message:{
        type: String
    },
},
{
    timestamps :true
})

module.exports = mongoose.model("portfolios", PortfolioSchema)