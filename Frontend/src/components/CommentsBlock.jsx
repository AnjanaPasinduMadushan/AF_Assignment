import "../styles/comment.css";



import { useEffect, useState } from "react";
import swal from 'sweetalert';
import axios, { Axios } from 'axios';

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
        commentorId: "a6s5fds4f5sdf",
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

  // Pop up alert and delete comment if confirmed
  async function deleteComment(id) {
    swal({
      title: "Delete Comment?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          var deleteResponse = await axios.delete(`http://localhost:8070/comment/delete/${id}`);
          if (deleteResponse != null && deleteResponse.status == 200) {
            swal("Comment Deleted!", { buttons: false, timer: 800 });
            getComments();
          }
        } catch (e) {
          swal("Error", { buttons: false, timer: 1000 });
          console.log(e);
        }
      }
    });



  }

  // Use effect that runs on page load
  // This excutes the "getComments" function to retrieve the available comments
  useEffect(() => {
    getComments();
  }, []);


  // Display date and time correctly formatted
  function dateTimeString(unixTime) {
    const date = new Date(unixTime * 1);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateTimeString = date.toLocaleString('en-GB', options);
    return dateTimeString;
  }


  // This function handles displaying 'a' comment.
  function DisplayComments() {
    if (gotComments != null) {
      return (
        <div>
          {gotComments.slice().reverse().map((comment) => (
            <div className="m-2" key={comment._id}>
              <div>
                <div className="d-flex justify-content-between">
                  <div>
                    <b>{comment.commentorId}</b><span className="commentDateTime" > {
                      dateTimeString(comment.commentDateTime)
                    }</span>
                  </div>
                  <div>
                    <button className="btn btn-primary rounded-pill ms-1" ><i className="fa-solid fa-marker" /></button>
                    <button className="btn btn-danger rounded-pill ms-1" onClick={() => deleteComment(comment._id)}><i className="fa-solid fa-trash" /></button>
                  </div>
                </div>
                <div>
                  <p>{comment.commentText}</p>
                </div>
                <hr className="mb-0" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

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
      <DisplayComments />
    </>
  );
}