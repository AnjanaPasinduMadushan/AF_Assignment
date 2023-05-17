const Vote = require("../model/vote");
const Complaint = require("../model/complaint");

// add or remove vote depending if user has placed a vote before
const vote = async (req, res) => {
  const voterId = req.userId;
  const complaintId = req.body.complaintId;
  const voteType = req.body.type;

  try {
    // check if votes document for the complaint already exists
    let vote = await Vote.findOne({ complaintId: complaintId });
    if (vote == null) {
      // no document on MongoDB

      // check if complaintID is valid
      const complaint = await Complaint.findById(complaintId);
      if (complaint == null) {
        // return if not valid
        return res.status(404).json({ message: `Complaint with id:${complaintId} not found` });
      }

      // create new vote document if valid
      vote = new Vote({
        complaintId,
        votes: 1,
        votedUsers: [{ user: voterId, type: voteType }]
      });
      vote = await vote.save();
      return res.status(200).json({ message: `${voteType} vote added`, vote });
    } else {
      // already have a document on mongoDB

      // check if current user has placed a vote for this complaint
      if (!vote.votedUsers.some(obj => obj.user == voterId)) {
        // place vote cause user has not placed vote
        if (voteType == "+")
          vote.votes++;
        else
          vote.votes--;

        vote.votedUsers.push({ user: voterId, type: voteType });
        vote = await vote.save();
        return res.status(200).json({ message: `${voteType} vote added`, vote });
      } else {
        // user already has a vote on complaint
        const index = vote.votedUsers.findIndex(item => item.user === voterId);
        if (index !== -1) {
          const existingVote = vote.votedUsers.splice(index, 1);

          if (existingVote[0].type == "+")
            vote.votes--;
          else
            vote.votes++;

          vote = await vote.save();
          return res.status(200).json({ message: "Vote removed", vote });
        } else {
          return res.status(404).json({ message: "Error, vote not found" });
        }
      }
    }
  } catch (e) {
    if (e.name == "CastError")
      return res.status(404).json({ message: `ComplaintID format error. Check if the ID is valid` });
    else {
      console.log(e);
      return res.status(500).send({ message: "server Error", error: e });
    }
  }
}
exports.vote = vote;

const checkVote = async (req, res) =>{
  const userId = req.userId;
  const complaintId = req.params.complaintId;
  
  try {
    let vote = await Vote.findOne({ complaintId: complaintId });
    if (vote == null) {
      return res.status(200).json({ vote: null, message: "no votes found in database for this complaint" });
    }else{
      const index = vote.votedUsers.findIndex(item => item.user === userId);
      if (index != -1) {
        let placedVote = vote.votedUsers[index].type;
        return res.status(200).json({vote: placedVote, message: "vote found"});
      }else{
        return res.status(200).json({vote: null, message: "User has not placed vote for this complaint"});
      }
      
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: e});
  }
}
exports.checkVote = checkVote;