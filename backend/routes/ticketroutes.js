const express = require("express")
const { getallticket, getticket, createticket, updateticket, deleteticket } = require("../controllers/ticketcontroller")
const { authmiddleware } = require("../middleware/authmiddleware")
const uploads = require("../middleware/multer")
const router = express.Router()



router.get("/",authmiddleware,  getallticket)
router.get("/:id",authmiddleware,  getticket)

router.post("/",authmiddleware,uploads.single("coverimg"), createticket)
router.put("/:id",authmiddleware,updateticket)
router.delete("/:id",authmiddleware, deleteticket)

module.exports = router