const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VoteSchema = new Schema({
	complaintId: {
		type: String,
		required: true,
    unique: true
	},
	votes: {
		type: Number,
		default: 0
	},
  votedUsers: [{
    user: {
      type: String,
      required: true,
      unique: true,
      sparse: true // allow null value to bypass unique test
    },
    type:{
      type: String,
      enum: ['+', '-'],
      required: true
    },
    _id: false
  }]
},{
	versionKey: false
})

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;