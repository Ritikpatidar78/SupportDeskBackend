const express = require("express")
const { authmiddleware } = require("../middleware/authmiddleware")
const { createnote, getallnote, createadminnote } = require("../controllers/notecontroller")
// const { adminmiddleware } = require("../middleware/adminmiddleware")
const router = express.Router()

router.post("/",authmiddleware,createnote)
router.get("/:id",authmiddleware,getallnote)

module.exports = router