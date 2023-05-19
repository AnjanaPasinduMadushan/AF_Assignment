
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Complaint from "../components/Complaint";
import { complaintsStore } from "../stores/complaintsStore";
import sampleImage from "../assets/images/placeholder.jpg";

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
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredComplaints = store.complaints.filter((complaint) =>
    complaint.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button
        style={buttonStyle}
        onClick={() => navigate("/create-complaint")}
      >
        +
      </button><br></br>
      <h1>
        <center>Complaint List</center>
      </h1>
      <div style={{ marginTop: "20px" }}>
  <input
    type="text"
    placeholder="Search Complaint..."
    value={searchTerm}
    onChange={handleSearch}
    style={{
      marginLeft:"250px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      width: "300px",
    }}
  />
</div><br></br>

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
    </>
  );
}
