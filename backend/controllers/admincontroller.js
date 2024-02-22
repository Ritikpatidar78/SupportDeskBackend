const tickets = require("../models/ticketmodel")
const profiles = require("../models/profilemodel")
const expressAsyncHandler = require("express-async-handler")
const notes = require("../models/notemodel")


const adminallticket = expressAsyncHandler(async(req,res)=>{

    //verify admin
    const profile = await profiles.findById(req.auth._id)

    if(!profile || !profile.isadmin){
        res.status(400)
        throw new Error("Admin not found")
    }

    const ticket = await tickets.find()

    if(!ticket){
        res.status(400)
        throw new Error("No tickets here")
    }
    res.status(200).json(ticket)
})
const adminticketedit = expressAsyncHandler(async(req,res)=>{

    //verify admin
    const profile = await profiles.findById(req.auth._id)

    if(!profile || !profile.isadmin){
        res.status(400)
        throw new Error("Admin not found")
    }

    //find ticket
    const ticket = await tickets.findById(req.params.id)

    if(!ticket){
        res.status(400)
        throw new Error("Ticket not found")
    }

    const data = await tickets.findByIdAndUpdate(ticket._id, req.body , {new:true})

    if(!data){
        res.status(400)
        throw new Error("Can't Update")
    }

    res.status(200).json(data)


})
const createadminnote = expressAsyncHandler(async(req,res)=>{
    const profile = await profiles.findById(req.auth._id)

    if(!profile || !profile.isadmin){
        res.status(400)
        throw new Error("Admin not found")

    }

    const {userid, ticketid , note} = req.body

    if(!userid, !ticketid , !note){
        res.status(400)
        throw new Error("Please Give All Data")
    }

    const user = await profiles.findById(userid)

    if(!user || user.isadmin){
        res.status(400)
        throw new Error("User Not Exists")
    }

    
    const ticket = await tickets.findById(ticketid)
    
    if(!ticket){
        res.status(400)
        throw new Error("Ticket Not Exists")
    }

  

    const data = await notes.create({
        user: userid,
        ticketid: ticketid,
        note: note,
        isstaff: true,
        staffid: profile._id,
    })

    if(!data){
        res.status(400)
        throw new Error("Can't Create Note")
    }

    res.status(200).json(data)

})
const getallprofile = expressAsyncHandler(async(req,res)=>{
    const profile = await profiles.findById(req.auth._id)

    if(!profile || !profile.isadmin){
        res.status(400)
        throw new Error("Admin not found")
    }

    const data = await profiles.find({isadmin: false}).select("-password")

    if(!data){
        res.status(404)
        throw new Error("No User Found")
    }

    res.status(200).json(data)
})
const getalladminnotes = expressAsyncHandler(async(req,res)=>{
    const profile = await profiles.findById(req.auth._id)

    if(!profile || !profile.isadmin){
        res.status(400)
        throw new Error("Admin not found")
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

const getprofileticket = expressAsyncHandler(async(req,res)=>{
    const profile = await profiles.findById(req.auth._id)

    if(!profile || !profile.isadmin){
        res.status(400)
        throw new Error("Admin not found")
    }
    
    const userid = req.params.id

    const user = await profiles.findById(userid)

    if(!user || user.isadmin){
        res.status(400)
        throw new Error("User Not Exists")
    }


    const ticket = await tickets.find({user:userid})

    if(!ticket){
        res.status(404)
        throw new Error("Tickets Not Found")
    }


    res.status(200).json(ticket)

})

const deleteticketwithnote = expressAsyncHandler(async(req,res)=>{
    const profile = await profiles.findById(req.auth._id)

    if(!profile || !profile.isadmin){
        res.status(400)
        throw new Error("Admin not found")
    }
    const ticketid = req.params.id

    const ticket = await tickets.findById(ticketid)

    if(!ticket){
        res.status(400)
        throw new Error("Ticket Not Exists")
    }

    const note = await notes.find({ticketid:ticket._id})

    await tickets.findByIdAndDelete(ticket._id)

    if(!note || !note.length){
        res.status(200).json({msg:dlt})
    }

    note.map(async(item)=>{
        await notes.findByIdAndDelete(item._id)
    })

    res.status(200).json({msg:dlt})
    
})



module.exports = {adminticketedit,adminallticket,createadminnote,getallprofile,getalladminnotes,getprofileticket,deleteticketwithnote}