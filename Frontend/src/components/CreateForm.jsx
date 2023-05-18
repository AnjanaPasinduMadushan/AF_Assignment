import complaintsStore from "../stores/complaintsStore";
import "../asset/CreateForm.css";
import React, { useState, useEffect } from "react";

export default function CreateForm(props) {
  const [clickTime, setClickTime] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { uploadComponent } = props;
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
      }, 60000); // hide form after 1 minute (60,000 milliseconds)
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showForm]);

  if (complaintStore.updateForm._id) return <></>;

  return (
    <div className="form">
      {!showForm && (
        <button
          onClick={handleClick}
          type="button"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "red",
            borderRadius: "50%",
            color: "white",
            fontWeight: "bold",
            fontSize: "24px",
            width: "80px",
            height: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          +
        </button>
      )}
{showForm && (
  <form onSubmit={complaintStore.createComplaint}>
    <h2>Create new Complaint</h2>
    Your confidentiality will be ensured.
    <input
      onChange={complaintStore.updateCreateFormField}
      value={complaintStore.createForm.title}
      name="title"
      required // Add 'required' attribute to make the field mandatory
    />
    Report Corruption <br></br>
    Please describe the incident *
    <textarea
  onChange={complaintStore.updateCreateFormField}
  value={complaintStore.createForm.body}
  name="body"
  required // Add 'required' attribute to make the field mandatory
  style={{
    width: '580px',
    height: '200px',
  }}
/>

    {/* <button type="submit">Submit</button> */}
    <div>{clickTime && <p>Last post created at {clickTime}</p>}</div>

    <div>
      {/* other form fields */}
      {uploadComponent}
    </div>
  </form>
)}

    </div>
  );
}
