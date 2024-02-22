const expressAsyncHandler = require("express-async-handler");
const tickets = require("../models/ticketmodel")
const profiles = require("../models/profilemodel")

const getallticket = expressAsyncHandler(async(req,res) =>{
    //user from jwt
    const user = await profiles.findById(req.auth._id)

    if(!user ){
        res.status(401)
        throw new Error("User Not Found")
    }

    //get ticket by userid
    const ticket = await tickets.find({user: req.auth._id})

    if(!ticket){
        res.status(400)
        throw new Error("No ticket raised")
    }

    res.status(200).json(ticket)
    

})
const getticket = expressAsyncHandler(async(req,res) =>{
    //user from jwt
    const user = await profiles.findById(req.auth._id)

    if(!user ){
        res.status(404)
        throw new Error("User Not Found")
    }
 
    //get ticket by id
    const ticket = await tickets.findById(req.params.id)

    if(!ticket || ticket.user.toString() !== user._id.toString()){
        res.status(404)
        throw new Error("Ticket not Found")
    }

    res.status(200).json(ticket)
    

})
const createticket = expressAsyncHandler(async(req,res) =>{

    const {product , description , status } = req.body

    if(!product || !description || !status) {
        res.status(400)
        throw new Error("Please Fill All Details")
    }

    //get user
    const user = await profiles.findById(req.auth._id)

    if(!user){
        res.status(404)
        throw new Error("User Not Found")
    }


    const ticket = await tickets.create({
        name: req.auth.name,
        product,
        description,
        coverimg: req.file.path,
        user: req.auth._id,
        status,
    })
    if(!ticket){
        res.status(400)
        throw new Error("Invalid Data")
}

res.status(200).json(ticket)

})
const updateticket = expressAsyncHandler(async(req,res) =>{

    const user = await profiles.findById(req.auth._id)

    if(!user){
        res.status(401)
        throw new Error("User Not Found")
    }

    const data = await tickets.findById(req.params.id)

    if(!data){
        res.status(400)
        throw new Error("Ticket not found")
    }

 
    if(user._id.toString() !== data.user.toString()){
        res.status(400)
        throw new Error("Unauthorized")
    }

    const ticket =  await tickets.findByIdAndUpdate(data._id, req.body ,{new:true})

    if(!ticket){
        res.status(400)
        throw new Error("Invalid Credentials")
    }

    res.status(200).json(ticket)


})
const deleteticket = expressAsyncHandler(async(req,res) =>{

    const user = await profiles.findById(req.auth._id)

    if(!user){
        res.status(401)
        throw new Error("User Not Found")
    }

    const data = await tickets.findById(req.params.id)

    if(!data){
        res.status(400)
        throw new Error("Ticket not found")
    }

    if(user._id.toString() !== data.user.toString()){
        res.status(400)
        throw new Error("Unauthorized")
    }

    const ticket = await tickets.findByIdAndDelete(data._id)

    res.status(200).json({msg:"Success"})


})

module.exports = {getallticket, getticket ,createticket , updateticket, deleteticket}