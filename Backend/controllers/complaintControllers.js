const Complaint = require("../model/complaint");

const fetchComplaints = async (req, res) => {
  // Find the complaints   
  const complaints = await Complaint.find();

  // Respond with them
  res.json({ complaints });
};

const fetchComplaint = async (req, res) => {
  // Get id off the url
  const complaintId = req.params.id;

  // Find the complaint using that id
  const complaint = await Complaint.findById(complaintId);

  // Respond with the complaint
  res.json({ complaint });
};

const createComplaint = async (req, res) => {
  // Get the sent in data off request body
  const { title, description, image } = req.body;
  const userId = "asd5f5as1df";

  // Create a complaint with it
  const complaint = await Complaint.create({
    userId,
    title,
    description,
    date: Date.now(),
    image,
    vote: 0,
    status: "pending",
    feedback: "",
    isApproved: false
  });

  // respond with the new complaint
  res.json({ complaint });
};


// Complaint creator update complaint
const updateComplaint = async (req, res) => {
  // Get the id off the url
  const complaintId = req.params.id;

  // Get the data off the req body
  const { title, description, image } = req.body;

  // Find and update the record
  const updatedComplaint = await Complaint.findByIdAndUpdate(complaintId, {
    title,
    description,
    image,
  }, { new: true });

  // Respond with it
  res.json({ updatedComplaint });
};

const deleteComplaint = async (req, res) => {
  // get id off url
  const complaintId = req.params.id;

  // Delete the record
  try {
    await Complaint.deleteOne({ _id: complaintId });
    res.status(200).json({ success: "Record deleted" });
  } catch (e) {
    res.status(500).json({ error: "Could not delete" });
  }
};

module.exports = {
  fetchComplaints,
  fetchComplaint,
  createComplaint,
  updateComplaint,
  deleteComplaint,
};