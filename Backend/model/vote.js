const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VoteSchema = new Schema({
	complaintId: {
		type: String,
		required: true
	},
	votes: {
		type: Number,
		default: 0
	},
  votedUsers: {
    type: [String],
    default: []
  }
},{
	versionKey: false
})

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;