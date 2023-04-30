const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
