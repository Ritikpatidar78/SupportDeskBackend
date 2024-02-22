const expressAsyncHandler = require("express-async-handler")
const portfolios = require("../models/portfoliomodel")

const createport = expressAsyncHandler(async(req,res)=> {
    const {name,email,message} = req.body

    await portfolios.create({
        name,email,message
    })

    res.status(200).json({
        msg:"success"
    })
})

const getport = expressAsyncHandler(async(req,res)=> {
    const data = await portfolios.find()

    res.status(200).json(data)
})

module.exports = {createport , getport}