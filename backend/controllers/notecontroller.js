const expressAsyncHandler = require("express-async-handler")
const tickets = require("../models/ticketmodel")
const profiles = require("../models/profilemodel")
const notes = require("../models/notemodel")

const createnote = expressAsyncHandler(async(req,res)=>{

    
    const user = await profiles.findById(req.auth._id)

    if(!user){
        res.status(401)
        throw new Error("User Not Found")
    }

    const {ticketid,note} = req.body

    if(!ticketid , !note) {
        res.status(400)
        throw new Error("Please Fill All Details")
    }

    const ticket = await tickets.findById(ticketid)

    if(!ticket){
        res.status(400)
        throw new Error("Ticket Not Exists")
    }

    const data = await notes.create({
        user: user._id,
        ticketid: ticketid,
        note: note,
    })

    if(!data){
        res.status(400)
        throw new Error("Can't Create Note")
    }

    res.status(200).json(data)


})

const getallnote = expressAsyncHandler(async(req,res)=>{

      
    const user = await profiles.findById(req.auth._id)

    if(!user){
        res.status(401)
        throw new Error("User Not Found")
    }

    const ticketid = req.params.id

    const ticket = await tickets.findById(ticketid)

    if(!ticket){
        res.status(400)
        throw new Error("Ticket Not Exists")
    }

    const data = await notes.find({
        ticketid: ticketid 
    })

    if(!data){
        res.status(400)
        throw new Error("No Notes Here")
    }

    res.status(200).json(data)

})




module.exports = {createnote, getallnote}