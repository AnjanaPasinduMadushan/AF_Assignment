// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const complaintsController = require("./controllers/complaintsController");


// Create an express app
const app = express();

// Configure express app
app.use(express.json());
// app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Connect to database
const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
}

// module.exports = connectToDb;

connectToDb();

// Routing

app.get("/complaints", complaintsController.fetchComplaints);
app.get("/complaints/:id", complaintsController.fetchComplaint);
app.post("/complaints", complaintsController.createComplaint);
app.put("/complaints/:id", complaintsController.updateComplaint);
app.delete("/complaints/:id", complaintsController.deleteComplaint);

const PORT = process.env.PORT;
// Start our server
app.listen(process.env.PORT);
console.log(PORT)

















app.use(cors());






