// import Complaint from "../components/Complaint";
// import { complaintsStore } from "../stores/complaintsStore";
// import sampleImage from "../assets/images/placeholder.jpg";
// import { useEffect, useState } from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router";

// export default function Complaints() {
//   const store = complaintsStore();

//   const navigate = useNavigate()
//   // const [userId, setUserId] = useState("");

//   // //TODO: find a way to pass user ID to lower components

//   // const getLoggedUserId = async () => {
//   //   try {
//   //     const res = await axios.get("http://localhost:8070/User/profile", { withCredentials: true });

//   //     const user_Id = res.data.user._id;
//   //     setUserId(user_Id);
//   //     console.log(user_Id);
//   //     config.setCurrentUser(user_Id);
//   //   } catch (err) {
//   //     console.log(err)
//   //   }
//   // };

//   // useEffect(() => {
//   //   getLoggedUserId();
//   // }, [])

//   useEffect(() => {
//     store.fetchComplaints();

//   }, []);

//   function dateTimeString(unixTime) {
//     const date = new Date(unixTime * 1);
//     const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
//     const dateTimeString = date.toLocaleString('en-GB', options);
//     return dateTimeString;
//   }

//   return (
//     <>

//       <button onClick={() => navigate('/create-complaint')}>ADD Complaint</button>

//       <h1><center>COMPLAINTS</center></h1>

//       {store.complaints && store.complaints.map((complaint) => {
//           const formatDate = dateTimeString(complaint.date)

//           return <Complaint
//             key={complaint._id}
//             complaint={complaint}
//             date={formatDate}
//             id={complaint._id}
//             title={complaint.title}
//             description={complaint.description}
//             image={complaint.image}
//             status={complaint.status}
//             feedback="safasf" />
//             ;
//         })}
//       {/* <Complaint
//         date="05/04/2023"
//         id="a65s4dfs65854fd"
//         title="This is a title"
//         description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla pretium dolor sed interdum. Cras id ultricies felis, a rhoncus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In tincidunt ex eget mollis sagittis. Nulla sollicitudin nisi id interdum rutrum. Nunc in ultrices ex. Proin feugiat eros pharetra urna ornare luctus."
//         image={sampleImage}
//         vote={5}
//         status="completed"
//         feedback="This is a sample feedback This is a sample feedback This is a sample feedback This is a sample feedback This is a sample feedback This is a sample feedbackThis is a sample feedback"
//       />
//       <Complaint
//         description=" This is a complaint without an image or video .Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla pretium dolor sed interdum. Cras id ultricies felis, a rhoncus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In tincidunt ex eget mollis sagittis. Nulla sollicitudin nisi id interdum rutrum. Nunc in ultrices ex. Proin feugiat eros pharetra urna ornare luctus."
//       />
//       <Complaint /> */}
//     </>
//   );
// }

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
    <>
      <button style={buttonStyle} onClick={() => navigate("/create-complaint")}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="plus-circle"><rect width="256" height="256" fill="none"></rect><path d="M128,23.99805a104,104,0,1,0,104,104A104.12041,104.12041,0,0,0,128,23.99805Zm40,112H136v32a8,8,0,1,1-16,0v-32H88a8,8,0,0,1,0-16h32v-32a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z"></path></svg>
      </button>
      <br />
      <h1 style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 'bold' }}>
        <center>Complaint List</center>
      </h1>
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search Complaint..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            marginLeft: "225px",
            padding: "10px",
            fontSize: "15px",
            borderRadius: "10px",
          
            width: "300px",
            background: "#e6e6e6",
          }}
        />
      </div>
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
    </>
  );
}
