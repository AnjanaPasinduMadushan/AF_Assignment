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
  const { title, body, date } = req.body;

  // Create a complaint with it
  const complaint = await Complaint.create({
    title,
    body,
    date : Date.now(),
  });

  // respond with the new complaint
  res.json({ complaint });
};

const updateComplaint = async (req, res) => {
  // Get the id off the url
  const complaintId = req.params.id;

  // Get the data off the req body
  const { title, body, date } = req.body;

  // Find and update the record
  await Complaint.findByIdAndUpdate(complaintId, {
    title,
    body,
    date,
  });

  // Find updated complaint
  const complaint = await Complaint.findById(complaintId);

  // Respond with it
  res.json({ complaint });
};

const deleteComplaint = async (req, res) => {
  // Get id from URL
  const complaintId = req.params.id;

  try {
    // Delete the record
    await Complaint.deleteOne({ _id: complaintId });

    // Respond
    res.json({ success: "Record deleted" });
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).json({ error: "An error occurred while deleting the record" });
  }
};


module.exports = {
  fetchComplaints,
  fetchComplaint,
  createComplaint,
  updateComplaint,
  deleteComplaint,
};
