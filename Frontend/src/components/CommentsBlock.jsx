import "../styles/comment.css";

import { useEffect, useState } from "react";
import swal from 'sweetalert';
import axios, { Axios } from 'axios';
import SingleComment from "./SingleComment";

export default function CommentsBlock(props) {
  const complaintID = props.complaintID;
  const [newComment, setNewComment] = useState("");
  const [gotComments, setGotComments] = useState();

  // Function to add comment to the database
  async function submit() {
    if (newComment == "") {
      swal("", "Enter comment first!", "error", { buttons: false, timer: 1000 });
    } else {
      const commentData = {
        complaintId: complaintID,
        commentText: newComment
      };

      try {
        var commentRes = await axios.post("http://localhost:8070/comment/addComment", commentData);
      } catch (e) {
        swal("Internal Error", "Please try again later", "error", { buttons: false, timer: 1200 });
        return;
      }

      if (commentRes.status == 201) {
        swal("Success", "Comment was added successfully!", "success", { timer: 1000, buttons: false })
          .then(() => {
            setNewComment("");
            getComments();
          });
      } else {
        swal("Error", commentRes.message, "error", { buttons: false, timer: 1000 });
      }
    }
  }

  // Call axios and retrieve comments of this complaint
  // Then store the comments in "gotComments"
  async function getComments() {
    try {
      var receivedComments = await axios.get(`http://localhost:8070/comment/complaint/${complaintID}`);
      if (receivedComments != null && receivedComments.data != null)
        setGotComments(receivedComments.data.comments);
    } catch (e) {
      console.log(`No comments for complaint Id: ${complaintID}`);
      // swal("Error", "Could not load comments! Try again later.", "error");
    }
  }

  // Use effect that runs on page load
  // This excutes the "getComments" function to retrieve the available comments
  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <div className="input-group complaintAddComment">
        <input
          type="text"
          className="form-control commentInput shadow-none"
          placeholder="Add a comment..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={newComment}
          onChange={(e) => { setNewComment(e.target.value) }}
        />
        <div className="input-group-append">
          <button className="btn commentInputBtn brown-outline-Btn" type="button" onClick={submit}>Add Comment</button>
        </div>
      </div>
      {
        gotComments != null ?
          <div>
            {gotComments.slice().reverse().map((comment) => (
              <SingleComment
                key={comment._id}
                id={comment._id}
                commentor={comment.commentorId}
                commentDateTime={comment.commentDateTime}
                commentText={comment.commentText}
                refreshCommentList={getComments}
              />
            ))}
          </div> : <></>
      }
    </>
  );
}