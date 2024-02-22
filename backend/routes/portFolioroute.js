const express = require("express")
const { createport, getport } = require("../controllers/portfoliocontroller")

const router = express.Router()

router.post("/", createport)
router.get("/", getport)

module.exports = router