const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description:  {
    type: String,
    required: true
  },
  date: Number,
  image: String,
  vote: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "Pending"
  },
  isApproved: {
    type: Boolean,
    default: false
  }
},{
	versionKey: false
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;