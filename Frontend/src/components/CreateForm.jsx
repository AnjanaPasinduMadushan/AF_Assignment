import complaintsStore from "../stores/complaintsStore";
import "../asset/CreateForm.css";
import React, { useState, useEffect } from "react";

export default function CreateForm() {
  const [clickTime, setClickTime] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    const time = new Date();
    setClickTime(time.toLocaleTimeString());
    setShowForm(true);
  };

  const complaintStore = complaintsStore();

  useEffect(() => {
    let timer = null;
    if (showForm) {
      timer = setTimeout(() => {
        setShowForm(false);
      }, 6000); // hide form after 1 minute (60,000 milliseconds)
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showForm]);

  if (complaintStore.updateForm._id) return <></>;

  return (
    <div className="form">
      <h2>Create new Complaint</h2>
      {!showForm && (
        <button onClick={handleClick} type="button">
          Create Complaint
        </button>
      )}
      {showForm && (
        <form onSubmit={complaintStore.createComplaint}>
          <input
            onChange={complaintStore.updateCreateFormField}
            value={complaintStore.createForm.title}
            name="title"
          />
          <textarea
            onChange={complaintStore.updateCreateFormField}
            value={complaintStore.createForm.body}
            name="body"
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <div>
        {clickTime && <p>Last post created at {clickTime}</p>}
      </div>
    </div>
  );
}
