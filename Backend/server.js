const express = require('express');
const multer = require('multer');
const path = require('path');



// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies

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



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  res.send('File uploaded successfully');
});


















app.use(cors());






