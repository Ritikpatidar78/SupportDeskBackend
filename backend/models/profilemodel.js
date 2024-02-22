const mongoose = require("mongoose")

const profileschema = new mongoose.Schema({
    name:{
        type: String,
        require: [true,"Please fill the name"]
    },
    email:{
        type: String,
        require: [true,"Please fill the email"],
        unique: true
    },
    password:{
        type: String,
        require: [true,"Please fill the password"]
    },
    isadmin:{
        type: Boolean,
        require: true,
        default: "false",
    },  
},
{
    timestamps:true
}
)

module.exports = mongoose.model("profiles",profileschema);