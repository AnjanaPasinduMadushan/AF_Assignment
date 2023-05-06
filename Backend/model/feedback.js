const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema ({
    commentorId: {
		type: String,
		required: true
	},
	complaintId: {
		type: String,
		required: true
	},
    feedback:{
        type :String,
        required: true
    }

})
const Feedback = mongoose.model("Feedbcak", FeedbackSchema);
module.exports = Feedback;

