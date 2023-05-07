const Comment = require("../model/comment");
const router = require("../routes/comment-routes");

//add products
const addComment = async (req, res, next) => {
  const {
    commentorId,
    complaintId,
    commentText
  } = req.body;

  let comment;
  try {
    comment = new Comment({
      commentorId,
      complaintId,
      commentDateTime: Date.now(),
      commentText
    });
    await comment.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add", error: err });
  }
  if (!comment) {
    return res.status(500).json({ message: "Unable to create new Comment" });
  }
  return res.status(201).json(comment);
};
exports.addComment = addComment;


// get single comment
const readSingleComment = async (req, res) => {
  const commentId = req.params.id;
  let comment;
  try {
    comment = await Comment.findById(commentId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error", error: err });
  }
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  return res.status(200).json({ comment: comment });
}
exports.readSingleComment = readSingleComment;


// get all comments of a complaint
const getByComplaint = async (req, res) => {
  const complaintId = req.params.complaintId;

  const query = { complaintId: complaintId };

  let comments;
  try {
    comments = await Comment.find(query);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", error: err });
  }
  if (!comments || comments.length < 1) {
    return res.status(404).json({ message: "Comments not found" });
  }
  return res.status(200).json({ comments: comments });
}
exports.getByComplaint = getByComplaint;


// get all comments of a user
const getByUser = async (req, res) => {
  const userId = req.params.userId;

  const query = { commentorId: userId };

  let comments;
  try {
    comments = await Comment.find(query);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", error: err });
  }
  if (!comments || comments.length < 1) {
    return res.status(404).json({ message: "Comments not found" });
  }
  return res.status(200).json({ comments: comments });
}
exports.getByUser = getByUser;


// Update comment
const updateComment = async (req, res) => {
  const commentId = req.params.commentId;
  const newText = req.body.commentText;
  const time = Date.now();

  const newData = {commentText: newText, commentDateTime: time};

  try {
    const comment = await Comment.findById(commentId);
    if (!comment)
      return res.status(404).send({ message: "Comment not found" });

    Object.assign(comment, newData);
    await comment.save();
    return res.status(200).send({message: "Comment updated!", comment: comment});
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: "Error in updating message", error: e });
  }
}
exports.updateComment = updateComment;


// Delete Comment
const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  let comment;
  try{
    comment = await Comment.findByIdAndDelete(commentId)
    if(!comment || comment.length < 1)
      return res.status(404).send({message: "comment not found!"});

    return res.status(200).send({message: "Succesfully deleted!", comment: comment});
  }catch(err){
    console.error(err);
    return res.status(500).send({message: "Delete comment failed!", error: err});
  }
}
exports.deleteComment = deleteComment;