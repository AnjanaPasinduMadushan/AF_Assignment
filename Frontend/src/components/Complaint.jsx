import "../assets/Complaint.css";

import { useEffect, useState } from "react";
import CommentsBlock from "./CommentsBlock";

export default function Complaint(props) {
  // Take data from props
  const date = props.date ?? "date not defined"
  const title = props.title ?? "Title Not Defined!";
  const description = props.description ?? "Description Not Defined!";
  const image = props.image;
  const feedback = props.feedback;


  // set initial values of states
  const [viewDescription, setViewDescription] = useState(false);
  const [viewComments, setViewComments] = useState(false);
  const [descriptionBtnText, setDescriptionBtnText] = useState("View Description");
  const [vote, setVote] = useState(props.vote ?? 0);

  // used to toggle the description Btn and data
  function toggleDescription() {
    setViewDescription(!viewDescription);
  }

  // used to toggle comments area in and out of view
  function toggleComments() {
    setViewComments(!viewComments);
  }

  // Render the image and description Btn only if image exists.
  // Else Directly render the description only
  function DescriptionBlock() {
    if (image) {
      return (
        <>
          <img src={image} className="card-img-top complaintMedia" />

          {
            viewDescription ?
              <div className="card-body" onClick={toggleDescription}>
                <p className="card-text complaintDescription">{description}</p>
              </div> :
              ""
          }
          <button type="button" className="btn btn-outline-dark my-2" onClick={toggleDescription} >{descriptionBtnText}</button>
        </>
      );
    } else {
      return (
        <div className="card-body">
          <p className="card-text noImageComplaintDescription">{description}</p>
        </div>
      );
    }
  };

  // function CommentsBlock() {
  //   if (viewComments) {
  //     return (
  //       <>
  //         <div className="input-group complaintAddComment">
  //           <input type="text" className="form-control commentInput shadow-none" placeholder="Add a comment..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
  //           <div className="input-group-append">
  //             <button className="btn commentInputBtn brown-outline-Btn" type="button">Add Comment</button>
  //           </div>
  //         </div>
  //       </>
  //     );
  //   }
  // }

  // Render the feedback block only if a feedback exists
  function FeedbackBlock() {
    if (feedback) {
      return (
        <>
          <hr />
          <b className="complaintFeedback">{feedback}</b>
          <hr />
        </>
      );
    }
  };

  // Change Description Btn label
  useEffect(() => {
    if (!viewDescription)
      setDescriptionBtnText("View Description ...");
    else
      setDescriptionBtnText("Hide Description");
  }, [viewDescription]);

  return (
    <>
      <div className="card complaintCard mx-auto mb-4" >
        <div className="complaintBody">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <div className="complaintDate">
                {date}
              </div>
              <h4 className="complaintTitle" >{title}</h4>
            </div>

            <div>
              {/* TODO: Edit button must only be visible within 24hrs of creating the complaint
                      and only to the complaint creator
            */}
              <button type="button" className="brown-btn btn" >Edit Complaint 🖉</button>
            </div>

          </div>

          {/**Renders the Description and image depending on if image exists */}
          <DescriptionBlock />
          <FeedbackBlock />

          <div className="d-flex justify-content-between my-2">
            <div className="d-flex align-items-center">
              {/**TODO: must include functionality for voting btns */}
              <button type="button" className="btn btn-success me-2" onClick={() => { setVote(vote + 1) }} >▲</button>
              <button type="button" className="btn btn-danger me-2" onClick={() => { setVote(vote - 1) }} >▼</button>
              <div id="complaintVote">
                <b>{vote} votes</b>
              </div>
            </div>
            <div>
              <button type="button" className="btn btn-outline-dark me-2" >Feedback</button>
              <button type="button" className="btn btn-outline-dark" onClick={toggleComments}>Comments</button>
            </div>
          </div>
        </div>

        {viewComments ? <CommentsBlock /> : ""}

      </div>
    </>
  );
}