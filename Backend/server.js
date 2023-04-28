require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express();

//declare PORT
const PORT = process.env.PORT || 8070;

//routes are declared here


app.use(cors())
app.use(bodyParser.json());
//connect mongoDB
mongoose.connect(process.env.link, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 });

 
 const connection = mongoose.connection;
 connection.once("open", () => {
     console.log("MongoDB Connection Success!");
 });

app.listen(PORT, ()=>{
    console.log(`The server is running on PORT ${PORT}`)
})


 