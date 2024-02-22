const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asynchandler = require("express-async-handler")
const profiles = require("../models/profilemodel")

const registerprofile = asynchandler(async(req,res) => {

    const {name , email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please Fill All Details")
    }

    const userexist = await profiles.findOne({email:email})
    if(userexist){
        res.status(400)
        throw new Error("User Already Exists")
    }

    const salt = await bcrypt.genSalt(10);
    const hasedpassword = await bcrypt.hash(password, salt);

    const user = await profiles.create({
        name : name,
         email : email,
         password : hasedpassword,
    })

    if(!user){
        res.status(401)
        throw new Error("Invalid Data")
    }

   
    res.status(200).json({
        name: user.name,
        email: user.email,
        isadmin: user.isadmin,
        token: generatetoken(user._id),
    })

})

const loginprofile = asynchandler(async(req,res) => {
    const {email,password } = req.body

    if(!email || !password){
        res.status(400)
        throw new Error("Please Fill All Details")
    }

    const user = await profiles.findOne({email:email})

    if(user && (await bcrypt.compare(password,user.password))){
    
        res.status(200).json({
            name: user.name,
            email: user.email,
            isadmin: user.isadmin,
            token: generatetoken(user.id)
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }

})

const generatetoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

module.exports = {registerprofile,loginprofile}