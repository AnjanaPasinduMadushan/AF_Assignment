import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
        <form onSubmit={addFeedback}>
            <label>Feedback</label>
            <div>
            <input 
            name ="feedback"
            type ="text"
            title = "Enter the Feedback here"
            required
            onChange={(value)=>handleChangeText("feedback",value)}
             />
            </div>
           

        <button  type="submit">
          Submit
        </button>
        </form>
         
      );
    }