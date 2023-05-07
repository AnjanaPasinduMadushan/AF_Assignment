require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express();
const cookieParser = require("cookie-parser")


app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(bodyParser.json());
app.use(cookieParser())

const multer = require('multer');
//declare PORT
const PORT = process.env.PORT || 8070;

//Routes file paths
const user_router = require("./routes/user-routes");
// const email_router = require("./routes/email-routes")
const commentRouter = require("./routes/comment-routes");
const complaintRouter = require("./routes/complaint-routes");
const feedbackRouter = require("./routes/feedback-route");
//routes are declared here
app.use('/User', user_router)
//app.use('/email', email_router)

app.use("/comment", commentRouter);
app.use("/feedback",feedbackRouter);
app.use("/complaint", complaintRouter);



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


 