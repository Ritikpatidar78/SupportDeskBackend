const express = require("express");
const { registerprofile, loginprofile } = require("../controllers/profilecontroller");
const router  = express.Router();

router.post("/register",registerprofile)
router.post("/login",loginprofile)

module.exports = router