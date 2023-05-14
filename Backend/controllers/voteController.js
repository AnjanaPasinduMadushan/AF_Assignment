const Vote = require("../model/vote");
const Complaint = require("../model/complaint");
const axios = require("axios");

const addVote = async (req, res) => {
  const voterId = req.userId;
  const complaintId = req.body;

  try{
    const complaint = await Complaint.findById(complaintId);

    if(complaint == null || complaint.status != 200){
      return res.status(404).send({ message: `Complaint with id:${complaintId} cannot be found`});
    }

    let vote = new Vote({
      complaintId,
      votes: 1,
      votedUsers: [voterId]
    });
    vote = await vote.save();

    if(vote != null){
      return res.status(200).send({ message: `${voterId} voted on ${complaintId}: saved`, votes: vote});
    }else{
      return res.status(500).send({ message: `Something went wrong`});
    }
  }catch(e){
    console.log(e);
    return res.status(500).send({ message: "server Error", error: e });
  }
}
exports.addVote = addVote;