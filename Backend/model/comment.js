const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	commentorId: {
		type: String,
		required: true
	},
	complaintId: {
		type: String,
		required: true
	},
	commentDateTime: {
		type: String,
		required: true
	},
  commentText: {
		type: String,
		required: true
	},
},{
	versionKey: false
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;