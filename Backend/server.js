require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express();
const multer = require('multer');
//declare PORT
const PORT = process.env.PORT || 8070;

app.use(cors())
app.use(bodyParser.json());

//routes are declared here
const commentRouter = require("./routes/comment-routes");
app.use("/comment", commentRouter);;


// Import dependencies


const complaintsController = require("./controllers/complaintsController"); 
// Routing

app.get("/complaints", complaintsController.fetchComplaints);
app.get("/complaints/:id", complaintsController.fetchComplaint);
app.post("/complaints", complaintsController.createComplaint);
app.put("/complaints/:id", complaintsController.updateComplaint);
app.delete("/complaints/:id", complaintsController.deleteComplaint);



//connect mongoDB
mongoose.connect(process.env.link, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 });

 

 const upload = multer({ dest: 'uploads/' });
 app.use(cors());

 app.post('/upload', upload.single('file'), (req, res) => {
   // do something with the file
   res.send('File uploaded successfully');
 });


 const connection = mongoose.connection;
 connection.once("open", () => {
     console.log("MongoDB Connection Success!");
 });

app.listen(PORT, ()=>{
    console.log(`The server is running on PORT ${PORT}`)
})


 