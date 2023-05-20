import "../styles/complaint.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentsBlock from "./CommentsBlock";
import axios from "axios";

export default function Complaint(props) {
  const navigate = useNavigate();

  // Take data from props
  const date = props.date ?? "date not defined";
  const id = props.id ?? "id not defined";
  const title = props.title ?? "Title Not Defined!";
  const description = props.description ?? "Description Not Defined!";
  const image = props.image;


  // set initial values of states
  const [viewDescription, setViewDescription] = useState(false);
  const [viewComments, setViewComments] = useState(false);
  const [descriptionBtnText, setDescriptionBtnText] = useState("View Description");
  const [vote, setVote] = useState(props.vote ?? 0);
  const [viewFeedBack, setViewFeedBack] = useState(false);

  const disabledColor = "btn-secondary";
  const upColor = "btn-outline-success";
  const upSelectedColor = "btn-success";
  const downColor = "btn-outline-danger";
  const downSelectedColor = "btn-danger";
  const [upVoteBtnClass, setUpVoteBtnClass] = useState(disabledColor);
  const [downVoteBtnClass, setDownVoteBtnClass] = useState(disabledColor);
  const [feedback, setFeedback] = useState("");

  // used to toggle the description Btn and data
  async function toggleFeedback() {
    setViewFeedBack(!viewFeedBack);
    if (!viewFeedBack) {
      try {
        const feedback = await getFeedback(id);
        setFeedback(feedback);
      } catch (error) {
        console.log(error);
      }
    }
  }

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

  //TODO: view feedback not working still
  
  // Render the feedback block only if a feedback exists
  function FeedbackBlock() {
    if (feedback) {
      return (
        <>
          <hr />
          <div className="complaintFeedback">
            <b>{feedback}</b>
          </div>
          <hr />
        </>
      );
    }
  };

  // Fill in some data as the page loads using following function
  async function checkVotes() {
    try {
      const res = await axios.get(`http://localhost:8070/vote/checkVote/${id}`);
      setVote(res.data.totalVotes);
      if (res.data.userVote == null) {
        setUpVoteBtnClass(upColor);
        setDownVoteBtnClass(downColor);
      } else if (res.data.userVote == "+") {
        setUpVoteBtnClass(upSelectedColor);
        setDownVoteBtnClass(disabledColor);
      } else if (res.data.userVote == "-") {
        setDownVoteBtnClass(downSelectedColor);
        setUpVoteBtnClass(disabledColor);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function changeVote(type) {
    const data = {
      complaintId: id,
      type: type
    };
    const res = await axios.post("http://localhost:8070/vote/add", data);
    if (res.data.message.split(',')[1] == "added") {
      if (res.data.message.split(',')[0] == "+")
        setVote(vote + 1);
      else
        setVote(vote - 1);
    } else {
      if (res.data.message.split(',')[0] == "+")
        setVote(vote - 1);
      else
        setVote(vote + 1);
    }
  }

  // Change Description Btn label
  useEffect(() => {
    if (!viewDescription)
      setDescriptionBtnText("View Description ...");
    else
      setDescriptionBtnText("Hide Description");
  }, [viewDescription]);

  useEffect(() => {
    checkVotes();
  }, [vote]);


  async function getFeedback(id) {
    try {
      const response = await axios.get(`http://localhost:8070/feedback/getComplaint/${id}`);
      if (response.data.feedback.length > 0) {
        return response.data.feedback[0].feedback;
      }
      return "";
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  return (
    <>
      <div className="card complaintCard mx-auto mb-4" >
        <div className="complaintBody">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <span className="complaintDate">{date} | Ref. ID: {id}</span>
              <h4 className="complaintTitle" >{title}</h4>
            </div>
          </div>

          {/**Renders the Description and image depending on if image exists */}
          <DescriptionBlock />

          {/**Renders the Feedback if feedback is available */}
          {viewFeedBack ? <FeedbackBlock /> : ""}

          <div className="d-flex justify-content-between my-2">
            <div className="d-flex align-items-center">
              <button type="button" id="+Vote" className={`btn ${upVoteBtnClass} me-2`} onClick={() => { changeVote("+") }} >▲</button>
              <button type="button" id="-Vote" className={`btn ${downVoteBtnClass} me-2`} onClick={() => { changeVote("-") }} >▼</button>
              <div id="complaintVote" className="me-2">
                <b>{vote} votes</b>
              </div>
            </div>

            <div>
              <button type="button" className="btn btn-outline-dark me-2" onClick={toggleFeedback}>Feedback</button>
              <button type="button" className="btn btn-outline-dark" onClick={toggleComments}>Comments</button>
            </div>
          </div>
        </div>

        {viewComments ? <CommentsBlock complaintID={id} /> : ""}

      </div>
    </>
  );
}