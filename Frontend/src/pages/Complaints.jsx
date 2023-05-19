import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Complaint from "../components/Complaint";
import { complaintsStore } from "../stores/complaintsStore";

export default function Complaints() {
  const store = complaintsStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    store.fetchComplaints();
  }, []);

  function dateTimeString(unixTime) {
    const date = new Date(unixTime * 1);
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const dateTimeString = date.toLocaleString("en-GB", options);
    return dateTimeString;
  }

  const buttonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "red",
    color: "white",
    border: "none",
    outline: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    animation: "pulse 1s infinite", // Add animation property
  };

  // CSS keyframes for the animation
  const keyframes = `@keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }`;

  // Add the keyframes to the document's style element
  const styleElement = document.createElement("style");
  styleElement.appendChild(document.createTextNode(keyframes));
  document.head.appendChild(styleElement);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Add a conditional check to prevent filtering when store.complaints is null
  const filteredComplaints = store.complaints
    ? store.complaints.filter((complaint) =>
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  return (
    <><div>
      <button style={buttonStyle} onClick={() => navigate("/create-complaint")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="plus-circle"><rect width="256" height="256" fill="none"></rect><path d="M128,23.99805a104,104,0,1,0,104,104A104.12041,104.12041,0,0,0,128,23.99805Zm40,112H136v32a8,8,0,1,1-16,0v-32H88a8,8,0,0,1,0-16h32v-32a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z"></path></svg>
      </button>
      <br />
      <h1 style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 'bold' }}>
        <center>Complaint List</center>
      </h1>
      {/* <div style={{ marginTop: "20px", padding: "auto" }}> */}
      <div className="px-5 my-2 input-group w-100">
        <center>
        <input
          type="text"
          placeholder="Search Complaint..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control w-100"
        // style={{
        //   marginLeft: "20px",
        //   marginRight: "20px",
        //   padding: "10px",
        //   fontSize: "15px",
        //   borderRadius: "10px",

        //   width: "80%",
        //   background: "#e6e6e6",
        // }}
        /></center>
      </div>
      {/* </div> */}
      <br />
      {filteredComplaints.map((complaint) => {
        const formatDate = dateTimeString(complaint.date);
        return (
          <Complaint
            key={complaint._id}
            complaint={complaint}
            date={formatDate}
            id={complaint._id}
            title={complaint.title}
            description={complaint.description}
            image={complaint.image}
            status={complaint.status}
            feedback="safasf"
          />
        );
      })}
    </div>
    </>
  );
}
