import complaintsStore from "../stores/complaintsStore";
import "../asset/Complaint.css";
import React, { useState } from "react";

export default function Complaint({ complaint }) {
  // State for the number of likes and whether the post has been upvoted
  const [likes, setLikes] = useState(0);

  const handleUpVote = () => {
    setLikes(likes + 1);
  };

  const handleDownVote = () => {
    setLikes(likes - 1);
  };

  const [showPopup, setShowPopup] = useState(false);

  const showEditDeletePopup = () => {
    setShowPopup(true);
  };

  const hideEditDeletePopup = () => {
    setShowPopup(false);
  };

  const store = complaintsStore((store) => {
    return {
      deleteComplaint: store.deleteComplaint,
      toggleUpdate: store.toggleUpdate,
    };
  });

  return (
    <div className="div2" key={complaint._id}>
      <h2>Title</h2>
      <h3>{complaint.title}</h3>
      <h2>Description</h2>
      <h3>{complaint.body}</h3>

      <div className="post-buttons">
        <button className="post-button post-button-like" onClick={handleUpVote}>
          {likes} {likes === 1 ? "Upvote" : "Upvote"}
        </button>

        <button
          className="post-button post-button-like"
          onClick={handleDownVote}
        >
          {likes === 1 ? "" : "Downvote"}
        </button>

        <button
          className="post-button post-button-more"
          onClick={showEditDeletePopup}
        >
          More
        </button>
      </div>

      {showPopup && (
        <div className="edit-delete-popup">
          <button
            className="popup-button"
            onClick={() => store.deleteComplaint(complaint._id)}
          >
            Delete Complaint
          </button>
          <button
            className="popup-button"
            onClick={() => store.toggleUpdate(complaint)}
          >
            Update Complaint
          </button>
          <button className="popup-button" onClick={hideEditDeletePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
