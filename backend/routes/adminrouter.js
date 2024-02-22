const express = require("express")
const { adminallticket, adminticketedit, createadminnote, getallprofile, getalladminnotes, getprofileticket, deleteticketwithnote } = require("../controllers/admincontroller")
const { adminmiddleware } = require("../middleware/adminmiddleware")
// const { createadminnote } = require("../controllers/notecontroller")
const router = express.Router()


router.get("/",adminmiddleware, adminallticket)
router.put("/:id",adminmiddleware, adminticketedit)
router.post("/",adminmiddleware, createadminnote)
router.get("/profile",adminmiddleware,getallprofile )
router.get("/note/:id",adminmiddleware,getalladminnotes )
router.get("/ticket/:id",adminmiddleware,getprofileticket)
router.delete("/:id",adminmiddleware,deleteticketwithnote)



module.exports = router