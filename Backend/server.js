require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express();
const cookieParser = require("cookie-parser")

//app.use(cors({credentials: true, origin: "http://127.0.0.1:3000"}));
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(cookieParser())
//declare PORT
const PORT = process.env.PORT || 8070;



app.use(bodyParser.json());

//Routes file paths
const user_router = require("./routes/user-routes") 
const email_router = require("./routes/email-routes")



//routes are declared here
app.use('/User', user_router)
//app.use('/email', email_router)
const commentRouter = require("./routes/comment-routes");
const feedbackRouter = require("./routes/feedback-route");
app.use("/comment", commentRouter);
app.use("/feedback",feedbackRouter);



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


 