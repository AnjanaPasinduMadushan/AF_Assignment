import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import '../assets/feedBack.css'
import '../App.css'

export default function AddFeedback() {

  const {id} = useParams();

    const [feedback, setfeedback] = useState({
         feedback:""
    });
    const navigate = useNavigate();
    const handleChangeText = (name, value) => {
      setfeedback({ ...feedback, [name]: value.target.value });
    };
    const addFeedback = (e) => {
        e.preventDefault();
        console.log("submit");
        axios
          .post(`http://localhost:8070/feedback/addfeedback/${id}`, feedback)
          .then(() => {
           alert(`successfully added`);
            navigate("/profile");
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
      return (
        <form onSubmit={addFeedback} className="form-feedback">
          <h1><center>Add a Feedback</center></h1>
          <p><center>It will be a help to us to check measure the quality of the service</center></p>
        <label><h2>Complaint ID</h2></label>
        <input type="text"  value={id} disabled/>
        <br/>
        <label><h2>Feedback</h2></label>
        <div>
          <textarea 
            name="feedback"
            cols="100"
            rows="10"
            title="Enter the Feedback here"
            placeholder="Enter the Feedback here"
            required
            onChange={(value)=>handleChangeText("feedback",value)}
          ></textarea>
</div>

           

        <button  type="submit" className="brown-btn">
          Submit
        </button>
        </form>
         
      );
    }