const express = require("express");
const connectDB = require("./config/connectDB");
const { errorHandler } = require("./middleware/errorhandler");
var cors = require('cors')
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000

//db connect
connectDB()

app.use(cors())

// app.use('/static', express.static('public'))
// app.use(express.static('public'));

app.use(express.static('public'));
app.use("/uploads", express.static('uploads'));


//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//profile-router
app.use("/api/profile",require("./routes/profilerouter"))

//ticketrouter
app.use("/api/ticket", require("./routes/ticketroutes"))

//admineditrouter
app.use("/api/admin",require("./routes/adminrouter"))

//portfolio router
app.use("/api/portfolio",require("./routes/portFolioroute"))

//note router
app.use("/api/note",require("./routes/noterouter"))

//errorhandler
app.use(errorHandler)                                                                                                                                                                                       

app.get("/", (req,res)=>{
    res.json({
        msg:"Welcome to support desk API"
    }) 
})



app.listen(PORT, ()=>{
    console.log(`Server is running at port : ${PORT}`)
})